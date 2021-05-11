<template>
    <div class="messenger-content-dialogs">
        <BaseSearchInput
                placeholder="Поиск"
                @toggleSearch="toggleSearch"
                @handler="searchHandler"
        ></BaseSearchInput>
        <template v-if="openedSearch">
            <div class="messenger-content-dialogs__parameters-container" @click="toggleSearchParameters(!openedSearchParameters)">
                <span class="messenger-content-dialogs__parameters-button pointer">
                    {{parameters.find(i => i.value === selectedParameter).name}}
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
                        <div class="messenger-content-dialogs__parameter pointer" v-for="param in parameters"
                             @click="selectParam(param.value)"
                        >
                            {{param.name}}
                        </div>
                    </div>
                </transition>
                <div class="messenger-search-group" v-for="folderGroup in dialogsInFolders"
                :key="folderGroup.folder_id+'folder_group'">
                    <BaseFolderName>
                        {{folders.find(i => i.folder_id === folderGroup.folder_id).name}}
                    </BaseFolderName>
                    <div class="messenger-search-group__dialogs">
                        <div class="messenger-search-group__dialog"
                             v-for="dialog in folderGroup.dialogs"
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
            <div class="messenger-content-dialogs__loader" v-if="isLoadingDialogs">
                <BaseLoader></BaseLoader>
            </div>
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
                            :isNeedSelecting="true"
                            :isSelected="selectedGroupDialogs.find(i => i === dialog.dialog_id)"

                            @contextmenu.prevent="openContextMenu($event, {id: dialog.dialog_id, item: 'dialog'})"
                            @toggleSelecting="toggleSelectedGroupDialogs(dialog.dialog_id)"
                            @click.ctrl.exact="toggleSelectedGroupDialogs(dialog.dialog_id)"
                            @click.exact="select(dialog.dialog_id)"
                    ></BaseDialog>
                </MessengerContentDialog>
            </template>

        </template>
    </div>
</template>
<script>
    import BaseSearchInput from '../../Base/BaseSearchInput';
    import BaseDialog from '../../Base/BaseDialog';
    import BaseDialogsFolderTuning from '../../Base/BaseDialogsFolderTuning';
    import BaseFolderName from '../../Base/BaseFolderName';
    import BaseLoader from '../../Base/BaseLoader';
    import MessengerContentDialog from './MessengerContentDialog/MessengerContentDialog.vue'

    import { useDialogs } from "../../../composition/useDialogs";
    import { useFolder } from "../../../composition/useFolder";
    import { useContextMenu } from "../../../composition/useContextMenu";
    import { useMessages } from "../../../composition/useMessages";
    import { useSearch } from "../../../composition/useSearch";
    import { reactive, computed } from 'vue';
    import {useLoader} from "../../../composition/useLoader";
    export default {
        components: { BaseSearchInput, BaseDialog, BaseDialogsFolderTuning, BaseFolderName, BaseLoader, MessengerContentDialog },
        setup() {
            const { dialogs, selectDialog, selectedDialog, toggleSelectedGroupDialogs, selectedGroupDialogs } = useDialogs();
            const { selectedFolder, folders } = useFolder();
            const { search, selectedParameter, selectParameter, openedSearch, openedSearchParameters, toggleSearchParameters, toggleSearch } = useSearch();

            const { isLoadingDialogs } = useLoader();

            const { setContext } = useContextMenu();

            const { getMessagesFromDialog } = useMessages();

            const parameters = [{
                name: 'Название чата',
                value: 'name'
            }, {
                name: 'Номер телефона',
                value: 'phone'
            }, {
                name: 'Сообщения',
                value: 'messages'
            }, {
                name: 'Все',
                value: null
            },]

            const selectParam = (param) => {
                if (param !== selectedParameter.value) {
                    selectParameter(param);
                    searchHandler(lastSearchValue);
                }
                toggleSearchParameters(false);
            }


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

            const dialogsInFolders = reactive({
                data: [],
            })

            let time = new Date().getTime();
            let lastSearchValue = '';

            const searchHandler = (value) => {
                lastSearchValue = value;
                let newTime = new Date().getTime();
                time = newTime;
                setTimeout(() => {
                    if (newTime === time) {
                        search(value)
                            .then(r => {
                                dialogsInFolders.data = [];
                                r.dialogues.forEach(item => {
                                    let findingItem = dialogsInFolders.data.find(i => i.folder_id === item.folder_id)
                                    if (findingItem) {
                                        findingItem.dialogs.push(item);
                                    } else {
                                        dialogsInFolders.data.push({folder_id: item.folder_id, dialogs: [item]})
                                    }
                                })
                            })
                    }
                }, 500)
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

                searchHandler,
                selectedParameter,
                selectParam,
                parameters,

                dialogsInFolders: computed(() => dialogsInFolders.data),


                toggleSelectedGroupDialogs,
                selectedGroupDialogs,

                isLoadingDialogs,

            }
        }

    }
</script>

<style lang="scss" src="./messenger-content-dialogs.scss"></style>