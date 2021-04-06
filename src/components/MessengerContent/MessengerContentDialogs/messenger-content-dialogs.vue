<template>
    <div class="messenger-content-dialogs">
        <BaseSearchInput
                placeholder="Поиск или новый чат"
                @toggleSearch="toggleSearch"
        ></BaseSearchInput>
        <template v-if="openedSearch">
            <div class="messenger-content-dialogs__parameters-container" @click="toggleSearchParameters(!openedSearchParameters)">
                <span class="messenger-content-dialogs__parameters-button pointer">
                    Параметры поиска
                </span>
                <svg class="messenger-content-dialogs__parameters-icon pointer"
                     :class="{'messenger-content-dialogs__parameters-icon_reverse': openedSearchParameters}"
                     width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6.12399 6L11 1" stroke="#EDEDEF" stroke-width="1.2" stroke-linecap="round"/>
                </svg>
            </div>
            <MessengerContentDialog :need-loading-more="false"
                class="messenger-content-dialog_searching"
            >
                <transition name="height-transition">
                    <div class="messenger-content-dialogs__parameters" v-show="openedSearchParameters">
                        <div class="messenger-content-dialogs__parameter pointer">
                            Название чата
                        </div>
                        <div class="messenger-content-dialogs__parameter pointer">
                            Номер телефона
                        </div>
                        <div class="messenger-content-dialogs__parameter pointer">
                            Сообщения
                        </div>
                        <div class="messenger-content-dialogs__parameter pointer">
                            Все
                        </div>
                    </div>
                </transition>
                <div class="messenger-search-group">
                    <BaseFolderName>
                        Повтор лекции
                    </BaseFolderName>
                    <div class="messenger-search-group__dialogs">
                        <div class="messenger-search-group__dialog"
                             v-for="dialog in dialogs"
                             :key="dialog.dialog_id*1000 + dialog.last_message.message_id"
                        >
                            <BaseDialog
                                    :chatInfo="dialog"
                                    class="base-dialog_not-padding"
                                    @contextmenu.prevent="openContextMenu($event, {id: dialog.dialog_id, item: 'dialog'})"
                                    @click="select(dialog.dialog_id)"
                            ></BaseDialog>
                        </div>
                    </div>

                </div>
            </MessengerContentDialog>
        </template>
        <template v-else>
            <BaseDialogsFolderTuning
                    :folder="folders.find(i => i.folder_id === selectedFolder)"
            ></BaseDialogsFolderTuning>
            <MessengerContentDialog :need-loading-more="true">
                <BaseDialog
                        v-for="dialog in dialogs"
                        :key="dialog.dialog_id*1000 + dialog.last_message.message_id"
                        :chatInfo="dialog"
                        :class="{
                            'base-dialog_active': selectedDialog === dialog.dialog_id,
                        }"
                        @contextmenu.prevent="openContextMenu($event, {id: dialog.dialog_id, item: 'dialog'})"
                        @click="select(dialog.dialog_id)"
                ></BaseDialog>
            </MessengerContentDialog>
        </template>
    </div>
</template>
<script>
    import BaseSearchInput from '../../Base/BaseSearchInput';
    import BaseDialog from '../../Base/BaseDialog';
    import BaseDialogsFolderTuning from '../../Base/BaseDialogsFolderTuning';
    import BaseFolderName from '../../Base/BaseFolderName';
    import MessengerContentDialog from './MessengerContentDialog/MessengerContentDialog.vue'

    import { useDialogs } from "../../../composition/useDialogs";
    import { useFolder } from "../../../composition/useFolder";
    import { useContextMenu } from "../../../composition/useContextMenu";
    import { useMessages } from "../../../composition/useMessages";
    import { useSearch } from "../../../composition/useSearch";
    export default {
        components: { BaseSearchInput, BaseDialog, BaseDialogsFolderTuning, BaseFolderName, MessengerContentDialog },
        setup() {
            const { dialogs, selectDialog, selectedDialog } = useDialogs()
            const { selectedFolder, folders } = useFolder()


            const { setContext } = useContextMenu()

            const { getMessagesFromDialog } = useMessages()

            const { openedSearch, openedSearchParameters, toggleSearchParameters, toggleSearch } = useSearch()



            const openContextMenu = ($event, context) => {
                setContext({
                    top: $event.clientY,
                    left: $event.clientX,
                }, context)
            }

            const select = (dialog_id) => {
                selectDialog(dialog_id);
                getMessagesFromDialog(dialog_id);
            }



            return {
                scrollTo,

                folders,
                selectedFolder,

                openContextMenu,
                select,

                dialogs,
                selectedDialog,

                openedSearch,
                openedSearchParameters,
                toggleSearchParameters,
                toggleSearch,

            }
        }

    }
</script>

<style lang="scss" src="./messenger-content-dialogs.scss"></style>