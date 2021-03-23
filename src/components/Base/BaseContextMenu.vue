<template>
    <button class="base-context-menu"
            :style="contextPosition"
            @blur="unsetContext"
    >
        <ul class="base-context-menu__list">
            <li class="base-context-menu__element" @click="del(dialogId)">
                Удалить диалог
            </li>
            <li class="base-context-menu__element">
                Переместить диалог
            </li>
        </ul>
    </button>
</template>

<script>
    import {useContextMenu} from "../../composition/useContextMenu";
    import {onMounted} from 'vue';
    import {useDialogs} from "../../composition/useDialogs";
    import {useFolder} from "../../composition/useFolder";
    export default {
        setup() {
            const { contextPosition, isContextOpened, unsetContext, dialogId } = useContextMenu()
            const { selectedFolder } = useFolder()
            const { deleteDialog, getDialogs, selectDialog } = useDialogs()

            onMounted(() => {
                document.querySelector('.base-context-menu').focus()
            })

            const del = (id) => {
                deleteDialog(id)
                    .then(() => {
                        selectDialog(null);
                        getDialogs(selectedFolder.value);
                        document.querySelector('.base-context-menu').blur()
                    })
            }


            return {
                contextPosition,
                isContextOpened,
                dialogId,
                del,

                unsetContext,
                deleteDialog,
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
        border: none;
        padding: 0;

        border-radius: 8px;
        position: absolute;
        z-index: 1200;
        background: var(--header-color);
        color: var(--font-color)
    }
    .base-context-menu__list {
        margin: 0;
        padding: 4px 0;
        text-align: left;
    }
    .base-context-menu__element {
        list-style-type: none;
        padding: 3px 14px;
        cursor: pointer;
        &:hover {
            background: var(--main-color);
        }
    }
</style>