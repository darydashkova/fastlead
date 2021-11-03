<template>
    <div class="modal-create-folder" @mousedown.self="close"
         :class="{'z-index': fromModals.fromCreateChatToCreateFolder}">
        <div class="modal-create-folder__body">
            <BaseModalHeader>
                {{editingFolder.name? editingFolder.name : 'Новая папка'}}
            </BaseModalHeader>
            <div class="modal-create-folder__input-group modal-create-folder__input-group_padding-20">
                <BaseModalLabel for-id="modal-create-folder__input" :class="{'base-modal-label_error': error}">Название папки</BaseModalLabel>
                <input id="modal-create-folder__input" type="text" class="modal-create-folder__input" v-model="name" maxlength="19">
            </div>
            <div class="modal-create-folder__input-group modal-create-folder__input-group_padding-20">
                <BaseModalLabel >Выбранные чаты</BaseModalLabel>
                <div class="modal-create-folder__input">
                    {{selectedDialogsToFolder.length}}
                </div>
            </div>
            <BaseModalText class="base-modal-text_uppercase base-modal-text_mt-10 base-modal-text_padding-20 base-modal-text_hovered pointer"
                @click="toggleModalAddToFolder(true)"
            >+Добавить чат</BaseModalText>

            <div v-show="selectedDialogsToFolder.length"
                    class="modal-create-folder__dialogs"
                 :class="{'modal-create-folder__dialogs_scroll': selectedDialogsToFolder.length > 4}"
            >
                <div v-show="selectedDialogsToFolder.length > 4" class="scroll" ref="container" @click.self="scrollTo">
                    <div class="scroll__bar" ref="scrollbar"></div>
                </div>
                <div class="modal-create-folder__container" ref="content">
                    <div class="modal-create-folder__dialog" v-for="dialog in selectedDialogsToFolder">
                        <BaseCircleIcon :src="dialog.avatar"></BaseCircleIcon>
                        <div class="modal-create-folder__name">
                            {{dialog.name}}
                        </div>
                        <svg @click="delDialog(dialog)" class="modal-create-folder__dialog-delete pointer" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L12.5 12.5M12.5 1L1 12.5" stroke="#757589" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </div>
                </div>
            </div>

            <BaseModalHint class="base-modal-hint_padding-20 base-modal-hint_mt">
                Выберите чаты, которые нужно <br> показывать в этой папке
            </BaseModalHint>

            <div class="modal-create-folder__footer">
                <BaseButton
                        @click="lCreateFolder"
                        class="base-button_enter"
                >
                    {{editingFolder.name? 'Сохранить' : 'Добавить'}}
                </BaseButton>
                <BaseButton
                        @click="close"
                        class="base-button_cancel"
                >
                    Отмена
                </BaseButton>
            </div>
        </div>
    </div>
</template>

<script>
    import BaseButton from '../Base/BaseButton.vue'
    import BaseModalLabel from '../Base/BaseModalLabel.vue'
    import BaseModalText from '../Base/BaseModalText.vue'
    import BaseModalHint from '../Base/BaseModalHint.vue'
    import BaseCircleIcon from '../Base/BaseCircleIcon.vue'
    import BaseModalHeader from '../Base/BaseModalHeader.vue'

    import { useFolder } from "../../composition/useFolder";
    import { ref, computed, onMounted } from 'vue';
    import { useModals } from "../../composition/useModals";
    import { useDialogs } from "../../composition/useDialogs";
    import {useCustomScroll} from "../../composition/useCustomScroll";
    export default {
        components: { BaseButton, BaseModalLabel, BaseModalText, BaseModalHint, BaseCircleIcon, BaseModalHeader },
        setup() {
            const { createFolder, getAllFolders, folders, selectFolder, updateFolder, foldersInSelectedFolder, createpdateFolder } = useFolder();
            const {
                toggleModalCreateFolder,
                toggleModalAddToFolder,
                selectedFolderToEdit,
                selectedDialogsToFolder,
                setSelectedDialogs,
                fromModals,
                selectedDialogsInEdit,
                createFolderParentId,
                setSelectedDialogsInEdit,
                setCloseCallbackCreateFolder,
                onCloseCallbackCreateFolder

            } = useModals();
            const { getDialogs, dischargeDialog, moveDialog } = useDialogs();
            const { container, content, scrollbar, scrollTo, init } = useCustomScroll()

            const name = ref('');


            const error = ref(false);

            const delDialog = (dialog) => {
                setSelectedDialogs(selectedDialogsToFolder.value.filter(i => i.dialog_id !== dialog.dialog_id))
            }

            const editingFolder = computed(() => {
                if (selectedFolderToEdit.value) {
                    let f = folders.value.find(i => i.folder_id === selectedFolderToEdit.value);
                    if (!f) {
                        f = foldersInSelectedFolder.value.find(i => i.folder_id === selectedFolderToEdit.value);
                    }
                    name.value = f.name;
                    getDialogs(selectedFolderToEdit.value)
                        .then(r => {
                            setSelectedDialogs(r.dialogues);
                            setSelectedDialogsInEdit(r.dialogues);
                        })
                    return f;
                } else return {};
            })

            const close = () => {
                fromModals.fromCreateChatToCreateFolder = false;

                toggleModalCreateFolder(false);
            }

            const lCreateFolder = () => {
                error.value = false;
                const closeModalAfterFetch = (isParent) => {
                    if (isParent) {
                        onCloseCallbackCreateFolder();
                        setCloseCallbackCreateFolder(() => null);
                        toggleModalCreateFolder(false);
                        createFolderParentId.value = null;

                        return;
                    }
                    getAllFolders()
                        .then(r => {
                            let id = r.find(i => i.name === name.value).folder_id
                            selectFolder(id);
                            getDialogs(id);

                            fromModals.fromCreateChatToCreateFolder = false;

                            toggleModalCreateFolder(false);
                        })
                }
                if (!name.value) {
                    error.value = true;
                    return;
                }
                if (editingFolder.value.name) {
                    let toDischarge = selectedDialogsInEdit.value.filter(item => {
                        return selectedDialogsToFolder.value.find(i => i.dialog_id !== item.dialog_id);
                    })
                    let toMoveIn = selectedDialogsToFolder.value.filter(item => {
                        return selectedDialogsInEdit.value.find(i => i.dialog_id !== item.dialog_id);
                    })
                    const afterUpdateName = async () => {
                        toDischarge.length && await dischargeDialog({dialog_ids: toDischarge.map(i => i.dialog_id)})
                        toMoveIn.length && await moveDialog({dialog_ids: toMoveIn.map(i => i.dialog_id), folder_id: editingFolder.value.folder_id})
                        closeModalAfterFetch();
                    }
                    (editingFolder.value.name !== name.value)
                        && updateFolder({name: name.value, folder_id: editingFolder.value.folder_id})
                    afterUpdateName();
                } else {
                    let obj = {
                        name: name.value,
                        dialog_ids: selectedDialogsToFolder.value.map(i => i.dialog_id),
                    }
                    if (createFolderParentId.value) {
                        obj.parent_folder_id = createFolderParentId.value;
                    }
                    createFolder(obj)
                        .then(r => {
                        if (r.error) {
                            error.value = true;
                            return;
                        }
                        createpdateFolder.value = true;
                        closeModalAfterFetch(createFolderParentId.value);
                    })
                }
            }

            onMounted(() => {
                init()
            })

            return {
                container,
                content,
                scrollbar,
                scrollTo,

                name,
                error,
                lCreateFolder,
                toggleModalCreateFolder,
                toggleModalAddToFolder,

                editingFolder,
                selectedDialogs: computed(() => selectedDialogs.data),
                selectedDialogsToFolder,

                delDialog,
                close,
                fromModals,
                createpdateFolder


            }
        }
    }
</script>

<style lang="scss">
    .modal-create-folder {
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.34);
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1300;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: left;
        &.z-index {
            z-index: 1400;
        }
    }
    .modal-create-folder__body {
        width: 364px;
        border-radius: 9px;
        position: relative;
        padding: 20px 0;

        background: var(--modal-bg-color);
        color: var(--modal-font-color);
    }
    .modal-create-folder__input-group {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 31px 0 29px;
        &.modal-create-folder__input-group_padding-20 {
            padding: 0 20px;
        }
    }
    .modal-create-folder__input {
        font-family: Segoe UI;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        margin-top: 6px;
        width: 100%;
        padding: 6px 10px;

        color: var(--modal-font-color);
        background: var(--modal-element-hover-bg-color);
        border: 0.7px solid var(--modal-input-border-color);
        box-sizing: border-box;
        border-radius: 3px;
    }

    .modal-create-folder__footer {
        padding: 28px 20px 0;
        display: flex;
        justify-content: space-between;
    }
    .modal-create-folder__dialogs {
        padding: 0 20px;
        position: relative;
        margin-top: 33px;
        &.modal-create-folder__dialogs_scroll {
            height: calc(56px * 4);
            ::-webkit-scrollbar {
                display: none;
            }
        }
    }
    .modal-create-folder__container {
        overflow-y: auto;
        height: 100%;
    }
    .modal-create-folder__dialog {
        display: flex;
        align-items: center;

        margin-bottom: 14px;
        position: relative;
        &:last-of-type {
            margin-bottom: 0;
        }
    }
    .modal-create-folder__name {
        margin-left: 10px;

        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 24px;
        color: var(--modal-font-color);
    }
    .modal-create-folder__dialog-delete {
        position: absolute;
        right: 0;
    }
</style>