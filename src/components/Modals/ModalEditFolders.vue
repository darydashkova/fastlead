<template>
    <div class="modal-edit-folders" @mousedown.self="closeModal">
        <div class="modal-edit-folders__body">
            <BaseModalHeader>
                Редактировать папки
            </BaseModalHeader>
            <BaseModalText class="base-modal-text_padding-20 base-modal-text_mt-29">
                Мои папки
            </BaseModalText>
            <div class="modal-edit-folders__folders-list"
                 :class="{'modal-edit-folders__folders-list_scroll': folders.length > 6}"
            >
                <div v-show="folders.length > 6" class="scroll" ref="container" @click.self="scrollTo">
                    <div class="scroll__bar" ref="scrollbar"></div>
                </div>
                <div class="modal-edit-folders__container" ref="content">
                    <div class="modal-edit-folders__folder" v-for="folder in folders" @click="!folder.is_default && toggleModalCreateFolder(true, folder.folder_id)"
                        :class="{'pointer': !folder.is_default}"
                    >
                        <div class="modal-edit-folders__folder-container">
                            <div class="modal-edit-folders__name">
                                {{folder.name}}
                            </div>
                            <div class="modal-edit-folders__count">
                                {{folder.dialogues_count}}
                            </div>
                        </div>
                        <template v-if="!folder.is_default">
                            <button
                                    v-if="deletingIds.find(i => i === folder.folder_id)"
                                    @click.stop="removeFromDel(folder.folder_id)"
                                    class="modal-edit_folders__cancel-delete pointer"
                            >
                                <span class="modal-edit_folders__btn-text">
                                    Отмена
                                </span>
                            </button>
                            <svg v-else @click.stop="addToDel(folder.folder_id)" class="modal-edit-folders__delete pointer" width="17" height="22" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.6735 2.24491H11.0818V1.34698C11.0818 0.604243 10.4775 0 9.7348 0H7.04103C6.29829 0 5.69405 0.604243 5.69405 1.34698V2.24491H2.10216C1.35942 2.24491 0.755371 2.84915 0.755371 3.59189V5.8366H1.6533V20.653C1.6533 21.3958 2.25735 22 3.00009 22H13.7756C14.5183 22 15.1225 21.3958 15.1225 20.653V5.8366H16.0205V3.59189C16.0205 2.84915 15.4162 2.24491 14.6735 2.24491ZM6.59197 1.34698C6.59197 1.09934 6.79319 0.897924 7.04103 0.897924H9.7348C9.98264 0.897924 10.1839 1.09934 10.1839 1.34698V2.24491H6.59197V1.34698ZM14.2246 20.653C14.2246 20.9009 14.0234 21.1021 13.7756 21.1021H3.00009C2.75244 21.1021 2.55122 20.9009 2.55122 20.653V5.8366H14.2246V20.653ZM15.1225 4.93868H1.6533V3.59189C1.6533 3.34424 1.85452 3.14283 2.10216 3.14283H14.6735C14.9213 3.14283 15.1225 3.34424 15.1225 3.59189V4.93868Z"
                                      fill="var(--default-svg-fill)"/>
                            </svg>
                        </template>
                    </div>
                </div>
            </div>
            <BaseModalText class="base-modal-text_padding-20 base-modal-text_mt-29 base-modal-text_uppercase pointer"
                @click="toggleModalCreateFolder(true)"
            >
                Создать новую папку
            </BaseModalText>
            <BaseModalHint class="base-modal-hint_padding-20">
                Вы можете создать папки с нужными <br> чатами и переключаться между ними
            </BaseModalHint>
        </div>
    </div>
</template>

<script>
    import BaseModalText from '../Base/BaseModalText.vue'
    import BaseModalHint from '../Base/BaseModalHint.vue'
    import BaseModalHeader from '../Base/BaseModalHeader.vue'

    import {useFolder} from "../../composition/useFolder";
    import {useModals} from "../../composition/useModals";
    import {useDialogs} from "../../composition/useDialogs";

    import { reactive, computed, onMounted } from 'vue';
    import {useCustomScroll} from "../../composition/useCustomScroll";

    export default {
        components: {
            BaseModalText,
            BaseModalHint,
            BaseModalHeader,
        },
        setup() {
            const { folders, deleteFolder, getAllFolders } = useFolder();
            const { toggleModalEditFolders, toggleModalCreateFolder } = useModals();
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

            const closeModal = () => {
                if (deletingIds.data.length) {
                    deleteFolder(deletingIds.data)
                        .then(() => {
                            toggleModalEditFolders(false);
                            getAllFolders()
                        })
                } else {
                    toggleModalEditFolders(false);
                }
            }

            onMounted(() => {
                init();
            })

            return {
                container,
                content,
                scrollbar,
                scrollTo,
                
                folders,
                toggleModalEditFolders,

                addToDel,
                removeFromDel,
                deletingIds: computed(() => deletingIds.data),

                closeModal,
                toggleModalCreateFolder,
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
        background: var(--create-folder-color);
        border-radius: 9px;
        padding: 20px 0 56px;
        text-align: left;
    }
    .modal-edit-folders__folders-list {
        margin-top: 10px;
        position: relative;
        &.modal-edit-folders__folders-list_scroll {
            height: calc(53px * 6);
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
        &:hover {
            background: var(--create-chat-border-color);
            .modal-edit-folders__delete {
                path {
                    fill: var(--hover-svg-fill);
                }
            }
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
        color: var(--create-folder-font-color);
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
        color: var(--create-folder-border-color);
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;

        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        max-width: 235px;
    }

</style>