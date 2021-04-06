<template>
    <div class="modal-create-folder" @mousedown.self="toggleModalCreateFolder(false)">
        <div class="modal-create-folder__body">
            <BaseModalHeader>
                {{editingFolder.name? editingFolder.name : 'Новая папка'}}
            </BaseModalHeader>
            <div class="modal-create-folder__input-group modal-create-folder__input-group_padding-20">
                <BaseModalLabel for-id="modal-create-folder__input" :class="{'base-modal-label_error': error}">Название папки</BaseModalLabel>
                <input id="modal-create-folder__input" type="text" class="modal-create-folder__input" v-model="name">
            </div>
            <div class="modal-create-folder__selected">
                <BaseModalText>Выбранные чаты</BaseModalText>
                <div class="modal-create-folder__number">
                    {{selectedDialogsToFolder.length}}
                </div>
            </div>
            <div class="modal-create-folder__add-chat">
                <BaseModalText class="base-modal-text_uppercase pointer"
                    @click="toggleModalAddToFolder(true)"
                >Добавить чат</BaseModalText>
            </div>

            <div class="modal-create-folder__dialogs">
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

            <BaseModalHint class="base-modal-hint_padding-20 base-modal-hint_mt">
                Выберите чаты, которые нужно <br> показывать в этой папке
            </BaseModalHint>

            <div class="modal-create-folder__footer">
                <BaseButton
                        @click="lCreateFolder"
                        class="base-button_enter"
                >
                    Добавить
                </BaseButton>
                <BaseButton
                        @click="toggleModalCreateFolder(false)"
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
    import { ref, computed, reactive } from 'vue';
    import { useModals } from "../../composition/useModals";
    import { useDialogs } from "../../composition/useDialogs";
    export default {
        components: { BaseButton, BaseModalLabel, BaseModalText, BaseModalHint, BaseCircleIcon, BaseModalHeader },
        setup() {
            const { createFolder, getAllFolders, folders, selectFolder } = useFolder();

            const { toggleModalCreateFolder, toggleModalAddToFolder, selectedFolderToEdit, selectedDialogsToFolder, setSelectedDialogs } = useModals();

            const { getDialogs } = useDialogs();

            const name = ref('');


            const error = ref(false);

            const delDialog = (dialog) => {
                setSelectedDialogs(selectedDialogsToFolder.value.filter(i => i.dialog_id !== dialog.dialog_id))
            }

            const editingFolder = computed(() => {
                if (selectedFolderToEdit.value) {
                    let f = folders.value.find(i => i.folder_id === selectedFolderToEdit.value);
                    name.value = f.name;
                    getDialogs(selectedFolderToEdit.value)
                        .then(r => {
                            setSelectedDialogs(r.dialogues)
                        })
                    return f;
                } else return {};
            })

            const lCreateFolder = () => {
                error.value = false;
                if (name.value) {
                    createFolder({
                        name: name.value,
                        dialog_ids: selectedDialogsToFolder.value.map(i => i.dialog_id),
                    }).then(r => {
                        if (r.error) {
                            error.value = true;
                        } else {
                            getAllFolders()
                                .then(r => {
                                    let id = r.find(i => i.name === name.value).folder_id
                                    selectFolder(id);
                                    getDialogs(id);
                                    toggleModalCreateFolder(false);
                                })
                        }
                    })
                } else {
                    error.value = true;
                }
            }

            return {
                name,
                error,
                lCreateFolder,
                toggleModalCreateFolder,
                toggleModalAddToFolder,

                editingFolder,
                selectedDialogs: computed(() => selectedDialogs.data),
                selectedDialogsToFolder,

                delDialog,


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
    }
    .modal-create-folder__body {
        width: 364px;
        border-radius: 9px;
        position: relative;
        padding: 20px 0;

        background: var(--create-folder-color);
        color: var(--create-folder-font-color);
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
    .modal-create-folder__label {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        background: var(--green-color);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        &.modal-create-folder__label_uppercase {
            text-transform: uppercase;
            cursor: pointer;
        }
    }
    .modal-create-folder__input {
        font-family: Segoe UI;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        margin-top: 6px;
        color: var(--create-folder-header-color);
        width: 100%;
        border-bottom: 1px solid var(--create-chat-border-color);
        padding: 2px;
        background: transparent;
    }

    .modal-create-folder__footer {
        padding: 28px 20px 0;
        display: flex;
        justify-content: space-between;
    }
    .modal-create-folder__selected {
        margin-top: 27px;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
    }
    .modal-create-folder__number {
        font-family: Segoe UI;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;

        color: var(--search-input-color);
    }
    .modal-create-folder__add-chat {
        margin: 14px 0 33px;
        padding: 0 20px;
    }
    .modal-create-folder__dialogs {
        padding: 0 20px;
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
        color: var(--font-color);
    }
    .modal-create-folder__dialog-delete {
        position: absolute;
        right: 0;
    }
</style>