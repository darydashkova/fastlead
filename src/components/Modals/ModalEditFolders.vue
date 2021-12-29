<template>
    <div class="modal-edit-folders" @mousedown.self="close">
        <div class="modal-edit-folders__body">
            <BaseModalHeader>
                Редактировать папки
            </BaseModalHeader>
            <BaseModalText class="base-modal-text_padding-20 base-modal-text_mt-29">
                Мои папки
            </BaseModalText>
            <div class="modal-edit-folders__folders-list"
                 :class="{'modal-edit-folders__folders-list_scroll': folders.length > 5}"
            >
                <div v-show="folders.length > 5" class="scroll" ref="container" @click.self="scrollTo">
                    <div class="scroll__bar" ref="scrollbar"></div>
                </div>
                <div class="modal-edit-folders__container" ref="content">
                    <template v-for="folder in folders">
                        <div v-if="!folder.is_default && folder.editing_possible" class="modal-edit-folders__folder"
                             @click="toggleModalCreateFolder(true, folder.folder_id)">
                            <div class="modal-edit-folders__folder-container">
                                <div class="modal-edit-folders__name">
                                    {{folder.name}}
                                </div>
                                <div class="modal-edit-folders__count">
                                    {{folder.dialogues_count}}
                                </div>
                            </div>
                            <button
                                    v-if="deletingIds.find(i => i === folder.folder_id)"
                                    @click.stop="removeFromDel(folder.folder_id)"
                                    class="modal-edit_folders__cancel-delete pointer"
                            >
                                <span class="modal-edit_folders__btn-text">
                                    Отмена
                                </span>
                            </button>
                            <svg v-else @click.stop="addToDel(folder.folder_id)" class="modal-edit-folders__delete pointer" width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.4167 3.66667H14.575C14.3622 2.63213 13.7993 1.70257 12.9812 1.03466C12.163 0.366749 11.1395 0.00133331 10.0833 0L8.25 0C7.19381 0.00133331 6.17038 0.366749 5.35219 1.03466C4.534 1.70257 3.97109 2.63213 3.75833 3.66667H0.916667C0.673552 3.66667 0.440394 3.76324 0.268485 3.93515C0.0965771 4.10706 0 4.34022 0 4.58333C0 4.82645 0.0965771 5.05961 0.268485 5.23151C0.440394 5.40342 0.673552 5.5 0.916667 5.5H1.83333V17.4167C1.83479 18.6318 2.31814 19.7967 3.17737 20.656C4.0366 21.5152 5.20154 21.9985 6.41667 22H11.9167C13.1318 21.9985 14.2967 21.5152 15.156 20.656C16.0152 19.7967 16.4986 18.6318 16.5 17.4167V5.5H17.4167C17.6598 5.5 17.8929 5.40342 18.0649 5.23151C18.2368 5.05961 18.3333 4.82645 18.3333 4.58333C18.3333 4.34022 18.2368 4.10706 18.0649 3.93515C17.8929 3.76324 17.6598 3.66667 17.4167 3.66667ZM8.25 1.83333H10.0833C10.6519 1.83403 11.2064 2.01059 11.6706 2.33882C12.1349 2.66705 12.4863 3.13087 12.6766 3.66667H5.65675C5.84704 3.13087 6.19841 2.66705 6.66269 2.33882C7.12697 2.01059 7.68142 1.83403 8.25 1.83333ZM14.6667 17.4167C14.6667 18.146 14.3769 18.8455 13.8612 19.3612C13.3455 19.8769 12.646 20.1667 11.9167 20.1667H6.41667C5.68732 20.1667 4.98785 19.8769 4.47212 19.3612C3.9564 18.8455 3.66667 18.146 3.66667 17.4167V5.5H14.6667V17.4167Z" fill="#9797BB"/>
                                <path d="M7.33329 16.4998C7.57641 16.4998 7.80956 16.4032 7.98147 16.2313C8.15338 16.0594 8.24996 15.8263 8.24996 15.5832V10.0832C8.24996 9.84005 8.15338 9.6069 7.98147 9.43499C7.80956 9.26308 7.57641 9.1665 7.33329 9.1665C7.09018 9.1665 6.85702 9.26308 6.68511 9.43499C6.5132 9.6069 6.41663 9.84005 6.41663 10.0832V15.5832C6.41663 15.8263 6.5132 16.0594 6.68511 16.2313C6.85702 16.4032 7.09018 16.4998 7.33329 16.4998Z" fill="#9797BB"/>
                                <path d="M10.9999 16.4998C11.243 16.4998 11.4762 16.4032 11.6481 16.2313C11.82 16.0594 11.9166 15.8263 11.9166 15.5832V10.0832C11.9166 9.84005 11.82 9.6069 11.6481 9.43499C11.4762 9.26308 11.243 9.1665 10.9999 9.1665C10.7568 9.1665 10.5236 9.26308 10.3517 9.43499C10.1798 9.6069 10.0833 9.84005 10.0833 10.0832V15.5832C10.0833 15.8263 10.1798 16.0594 10.3517 16.2313C10.5236 16.4032 10.7568 16.4998 10.9999 16.4998Z" fill="#9797BB"/>
                            </svg>
                        </div>
                    </template>
                </div>
            </div>
            <BaseModalText class="base-modal-text_padding-20 base-modal-text_mt-29 base-modal-text_uppercase base-modal-text_hovered pointer"
                @click="createNewFolder"
            >
                +Создать новую папку
            </BaseModalText>
            <BaseModalHint class="base-modal-hint_padding-20">
                Вы можете создать папки с нужными <br> чатами и переключаться между ними
            </BaseModalHint>
            <div class="modal-edit-folders__buttons">
                <BaseButton
                        class="base-button_enter"
                        @click="save"
                >
                    Сохранить
                </BaseButton>
                <BaseButton
                        class="base-button_cancel"
                        @click.self="close"
                >
                    Отмена
                </BaseButton>
            </div>
        </div>
    </div>
</template>

<script>
    import BaseModalText from '../Base/BaseModalText.vue'
    import BaseModalHint from '../Base/BaseModalHint.vue'
    import BaseModalHeader from '../Base/BaseModalHeader.vue'
    import BaseButton from '../Base/BaseButton.vue'
    import ModalConfirmDelete from '../Modals/ModalConfirmDelete.vue'

    import {useFolder} from "../../composition/useFolder";
    import {useModals} from "../../composition/useModals";
    import {useDialogs} from "../../composition/useDialogs";

    import { reactive, computed, onMounted } from 'vue';
    import {useCustomScroll} from "../../composition/useCustomScroll";
    import {useModalConfirmDelete} from "../../composition/useModalConfirmDelete";

    export default {
        components: {
            BaseModalText,
            BaseModalHint,
            BaseModalHeader,
            BaseButton,

            ModalConfirmDelete,
        },
        setup() {
            const { folders,
                deleteFolder,
                getAllFolders,
                selectedParentFolder,
                foldersInSelectedFolder ,
                getAllFoldersInFolder,
            } = useFolder();
            const { toggleModalEditFolders, toggleModalCreateFolder, setCloseCallbackCreateFolder, createFolderParentId } = useModals();
            const { toggleModalConfirmDelete, openedModalConfirmDelete, setSaveCallbackModalConfirmDelete, setTextModalConfirmDelete } = useModalConfirmDelete()
            const { container, content, scrollbar, scrollTo, init } = useCustomScroll();


            const deletingIds = reactive({
                data: [],
            })

            const addToDel = (id) => {
                if (!deletingIds.data.find(i => i === id)) {
                    deletingIds.data.push(id);
                }
            }

            const removeFromDel = (id) => {
                deletingIds.data = deletingIds.data.filter(i => i !== id);
            }

            const close = () => {
                toggleModalEditFolders(false);
            }
            const save = () => {
                if (deletingIds.data.length) {
                    setSaveCallbackModalConfirmDelete(saveCallback);
                    setTextModalConfirmDelete(`Вы точно хотите удалить ${deletingIds.data.length} папок?`)
                    toggleModalConfirmDelete(true);
                } else {
                    toggleModalEditFolders(false);
                }
            }
            const saveCallback = () => {
                deleteFolder(deletingIds.data)
                    .then(() => {
                        toggleModalEditFolders(false);
                        if (selectedParentFolder.value) {
                            getAllFoldersInFolder(selectedParentFolder.value, true);
                        } else {
                            getAllFolders();
                        }
                    })
            }
            const createNewFolder = () => {
                if (selectedParentFolder.value) {
                    setCloseCallbackCreateFolder(() => getAllFoldersInFolder(selectedParentFolder.value, true))
                    createFolderParentId.value = selectedParentFolder.value;
                }
                toggleModalCreateFolder(true);
            }

            onMounted(() => {
                init();
            })

            return {
                container,
                content,
                scrollbar,
                scrollTo,
                
                folders: selectedParentFolder.value? foldersInSelectedFolder : folders,
                toggleModalEditFolders,
                createNewFolder,

                addToDel,
                removeFromDel,
                deletingIds: computed(() => deletingIds.data),

                close,
                save,
                saveCallback,
                toggleModalCreateFolder,
                openedModalConfirmDelete,
            }
        }
    }
</script>

<style lang="scss">
    .modal-edit-folders {
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
    .modal-edit-folders__body {
        width: 364px;
        background: var(--modal-bg-color);
        border-radius: 9px;
        padding: 20px 0;
        text-align: left;
    }
    .modal-edit-folders__folders-list {
        margin-top: 10px;
        position: relative;
        &.modal-edit-folders__folders-list_scroll {
            height: calc(53px * 4);
            ::-webkit-scrollbar {
                display: none;
            }
        }
    }
    .modal-edit-folders__container {
        overflow-y: auto;
        height: 100%;
    }
    .modal-edit-folders__folder {
        padding: 8px 20px;
        position: relative;
        display: flex;
        align-items: center;
        transition: .2s ease;
        cursor: pointer;
        &:hover {
            background: var(--modal-element-hover-bg-color);
        }
    }
    .modal-edit-folders__delete {
        position: absolute;
        right: 20px;
    }
    .modal-edit_folders__cancel-delete {
        position: absolute;
        right: 20px;
        padding: 6px 7px;
        background: var(--button-cancel-color);
        border-radius: 5px;
    }
    .modal-edit_folders__btn-text {
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 24px;
        background: var(--green-color);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .modal-edit-folders__name {
        color: var(--modal-font-color);
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;

        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        max-width: 235px;

    }
    .modal-edit-folders__count {
        color: var(--modal-sub-font-color);
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;

        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        max-width: 235px;
    }

    .modal-edit-folders__buttons {
        padding: 0 20px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 44px;
    }

</style>