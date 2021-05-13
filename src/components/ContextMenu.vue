<template>
    <button class="base-context-menu"
            :style="contextPosition"
            @blur="unsetContext"
    >
        <ul class="base-context-menu__list">
            <template v-if="context.item === 'dialog'">
                <li class="base-context-menu__element" @click="delDialog(context.id)">
                    Удалить
                </li>
                <li class="base-context-menu__element" @click="moveChat(context.id)">
                    Переместить в папку
                </li>
            </template>
            <template v-if="context.item === 'folder'">
                <li class="base-context-menu__element" @click="toggleModalCreateFolder(true, context.id)">
                    Редактировать папку
                </li>
                <li class="base-context-menu__element" @click="delFolder(context.id)">
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
    export default {
        setup() {
            const { contextPosition, isContextOpened, unsetContext, context } = useContextMenu();
            const { selectedFolder, deleteFolder, selectFolder, getAllFolders } = useFolder();
            const { deleteDialog, getDialogs, selectDialog } = useDialogs();
            const { toggleModalCreateFolder, toggleModalMoveChat, setSelectedDialogsToMove } = useModals();

            onMounted(() => {
                document.querySelector('.base-context-menu').focus()
            })

            const delDialog = (id) => {
                deleteDialog([id])
                    .then(() => {
                        selectDialog(null);
                        getDialogs(selectedFolder.value);
                        document.querySelector('.base-context-menu').blur()
                    })
            }

            const delFolder = (id) => {
                deleteFolder([id])
                    .then(() => {
                        selectFolder(null);
                        getAllFolders();
                        document.querySelector('.base-context-menu').blur()
                    })
            }

            const moveChat = (id) => {
                setSelectedDialogsToMove([id]);
                toggleModalMoveChat(true);
                document.querySelector('.base-context-menu').blur()
            }


            return {
                contextPosition,
                isContextOpened,
                context,
                delDialog,
                delFolder,
                moveChat,

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
        color: var(--user-info-settings-default-svg-fill);
    }
    .base-context-menu__list {
        margin: 0;
        padding: 6px 12px;
        text-align: left;
    }
    .base-context-menu__element {
        list-style-type: none;
        margin: 10px 0;
        cursor: pointer;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        transition: .3s ease;
        &:hover {
            background: var(--user-info-settings-hover-svg-fill);
            color: var(--messenger-search-input-bg);
        }
    }
</style>