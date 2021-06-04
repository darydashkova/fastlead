<template>
    <button class="base-context-menu"
            :style="contextPosition"
            @blur="unsetContext"
    >
        <ul class="base-context-menu__list">
            <template v-if="context.itemName === 'dialog'">
                <li class="base-context-menu__element" @click="delDialog()">
                    Удалить
                </li>
                <li class="base-context-menu__element" @click="moveChat()">
                    Переместить в папку
                </li>
            </template>
            <template v-if="context.itemName === 'folder'">
                <li class="base-context-menu__element" @click="editFolder()">
                    Редактировать папку
                </li>
                <li class="base-context-menu__element" @click="delFolder()">
                    Удалить
                </li>
            </template>
        </ul>
    </button>
</template>

<script>
    import {useContextMenu} from "../composition/useContextMenu";
    import {onMounted} from 'vue';
    import {useDialogs} from "../composition/useDialogs";
    import {useFolder} from "../composition/useFolder";
    import {useModals} from "../composition/useModals";
    import {useModalConfirmDelete} from "../composition/useModalConfirmDelete";
    export default {
        setup() {
            const { contextPosition, isContextOpened, unsetContext, context } = useContextMenu();
            const { selectedFolder, deleteFolder, selectFolder, getAllFolders, selectedParentFolder, getAllFoldersInFolder } = useFolder();
            const { deleteDialog, getDialogs, selectDialog } = useDialogs();
            const { toggleModalCreateFolder, toggleModalMoveChat, setSelectedDialogsToMove } = useModals();
            const { setTextModalConfirmDelete, setSaveCallbackModalConfirmDelete, toggleModalConfirmDelete } = useModalConfirmDelete()

            onMounted(() => {
                document.querySelector('.base-context-menu').focus()
            })

            const delDialog = () => {
                let callback = () => deleteDialog([context.value.id])
                    .then(() => {
                        selectDialog(null);
                        getDialogs(selectedFolder.value);
                    })
                setTextModalConfirmDelete(`Вы точно хотите удалить чат с ${context.value.item}?`)
                setSaveCallbackModalConfirmDelete(callback);
                unsetContext();

                toggleModalConfirmDelete(true);
            }

            const delFolder = () => {
                let callback = () => deleteFolder([context.value.id])
                    .then(() => {
                        if (selectedParentFolder.value) {
                            getAllFoldersInFolder(selectedParentFolder.value, true);
                        } else {
                            getAllFolders();
                        }
                        selectFolder(null);
                    })
                setTextModalConfirmDelete(`Вы точно хотите удалить папку "${context.value.item}"?`)
                setSaveCallbackModalConfirmDelete(callback);
                unsetContext();

                toggleModalConfirmDelete(true);
            }

            const moveChat = () => {
                setSelectedDialogsToMove([context.value.id]);
                toggleModalMoveChat(true);
                unsetContext();
            }

            const editFolder = () => {
                toggleModalCreateFolder(true, context.value.id);
                unsetContext();
            }


            return {
                contextPosition,
                isContextOpened,
                context,
                delDialog,
                delFolder,
                moveChat,
                editFolder,

                unsetContext,
                toggleModalCreateFolder,
                toggleModalMoveChat,
            }
        }
    }
</script>

<style lang="scss">
    .base-context-menu {
        -webkit-appearance: none;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        outline: none;
        padding: 0;

        border-radius: 8px;
        position: absolute;
        z-index: 1200;
        border: 1px solid var(--context-background-color);
        background: var(--context-background-color);
        overflow: hidden;

    }
    .base-context-menu__list {
        padding: 0;
        margin: 0;
        text-align: left;
    }
    .base-context-menu__element {
        list-style-type: none;
        padding: 10px 12px;
        cursor: pointer;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        transition: .3s ease;
        color: var(--user-info-settings-default-svg-fill);
        &:hover {
            background: var(--user-info-settings-hover-setting-bg);
            color: var(--font-color);
        }
    }
</style>