<template>
    <div class="messenger-content-dialog">
        <BaseSearchInput
        ></BaseSearchInput>
            <div class="messenger-content-dialog__container">
                <div class="scroll" ref="container" @click.self="scrollTo">
                    <div class="scroll__bar" ref="scrollbar"></div>
                </div>
                <div class="messenger-content-dialog__content" ref="content">
                    <BaseDialog
                            v-for="(dialog, index) in dialogs"
                            :key="dialog.dialog_id*1000"
                            :chatInfo="dialog"
                            :class="{
                                'base-dialog_active': selectedDialog === dialog.dialog_id,
                            }"
                            @contextmenu.prevent="openContextMenu($event, dialog.dialog_id)"
                            @click="select(dialog.dialog_id)"
                    ></BaseDialog>
                </div>
            </div>
    </div>
</template>
<script>
    import BaseSearchInput from '../../Base/BaseSearchInput'
    import BaseDialog from '../../Base/BaseDialog'
    import {useCustomScroll} from "../../../composition/useCustomScroll";
    import { onMounted, computed, ref } from "vue";
    import {useDialogs} from "../../../composition/useDialogs";
    import {useFolder} from "../../../composition/useFolder";
    import {useContextMenu} from "../../../composition/useContextMenu";
    import {useMessages} from "../../../composition/useMessages";
    export default {
        components: { BaseSearchInput, BaseDialog },
        setup() {
            const { dialogs, getDialogs, selectDialog, selectedDialog } = useDialogs()
            const { selectedFolder, setOffsetFolderDialogsPosition, offsetFolderDialogsPosition } = useFolder()

            const { container, content, scrollbar, scrollTo, init } = useCustomScroll()

            const { setContext } = useContextMenu()

            const { getMessagesFromDialog } = useMessages()


            const loadingNextDialogs = ref(false)
            const loadNextDialogs = async () => {
                if (!loadingNextDialogs.value && selectedFolder.value) {
                    loadingNextDialogs.value = true;
                    dialogs.value.length < offsetFolderDialogsPosition.value
                        ? setOffsetFolderDialogsPosition(dialogs.value.length+1)
                        : setOffsetFolderDialogsPosition(offsetFolderDialogsPosition.value + 20)
                    await getDialogs(selectedFolder.value, offsetFolderDialogsPosition.value)
                    loadingNextDialogs.value = false;
                }
            }

            const openContextMenu = ($event, dialog_id) => {
                setContext({
                    top: $event.clientY,
                    left: $event.clientX,
                }, dialog_id)
            }

            const select = (dialog_id) => {
                selectDialog(dialog_id);
                getMessagesFromDialog(dialog_id);
            }


            onMounted( () => {
                init(loadNextDialogs)
            })
            return {
                container,
                content,
                scrollbar,
                scrollTo,

                openContextMenu,
                select,

                dialogs,
                selectedDialog,
            }
        }

    }
</script>

<style lang="scss" src="./messenger-content-dialogs.scss"></style>