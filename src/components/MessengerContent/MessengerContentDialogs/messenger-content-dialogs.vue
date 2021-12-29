<template>
    <div class="messenger-content-dialogs">
        <div class="messenger-content-dialogs__name">
            {{folderName}}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="pointer" @click="getFolderEdit()" v-if="folderName!='Основное'">
            <g clip-path="url(#clip0_2_2234)">
            <path d="M0.666667 3.16605H2.49067C2.63376 3.69253 2.94612 4.15731 3.37955 4.48867C3.81299 4.82002 4.34341 4.99955 4.889 4.99955C5.43459 4.99955 5.96501 4.82002 6.39845 4.48867C6.83188 4.15731 7.14424 3.69253 7.28733 3.16605H15.3333C15.5101 3.16605 15.6797 3.09581 15.8047 2.97078C15.9298 2.84576 16 2.67619 16 2.49938C16 2.32257 15.9298 2.153 15.8047 2.02797C15.6797 1.90295 15.5101 1.83271 15.3333 1.83271H7.28733C7.14424 1.30622 6.83188 0.84145 6.39845 0.510092C5.96501 0.178734 5.43459 -0.000793457 4.889 -0.000793457C4.34341 -0.000793457 3.81299 0.178734 3.37955 0.510092C2.94612 0.84145 2.63376 1.30622 2.49067 1.83271H0.666667C0.489856 1.83271 0.320286 1.90295 0.195262 2.02797C0.0702379 2.153 0 2.32257 0 2.49938C0 2.67619 0.0702379 2.84576 0.195262 2.97078C0.320286 3.09581 0.489856 3.16605 0.666667 3.16605ZM4.88867 1.33271C5.11941 1.33271 5.34497 1.40114 5.53683 1.52933C5.72869 1.65753 5.87822 1.83973 5.96653 2.05291C6.05483 2.2661 6.07793 2.50067 6.03292 2.72698C5.9879 2.9533 5.87679 3.16118 5.71362 3.32434C5.55046 3.4875 5.34258 3.59861 5.11627 3.64363C4.88996 3.68864 4.65538 3.66554 4.4422 3.57724C4.22902 3.48894 4.04681 3.3394 3.91862 3.14754C3.79042 2.95569 3.722 2.73012 3.722 2.49938C3.72235 2.19007 3.84538 1.89353 4.0641 1.67481C4.28281 1.45609 4.57936 1.33307 4.88867 1.33271Z" fill="#9797BB"/>
            <path d="M15.3333 7.3333H13.5093C13.3665 6.80669 13.0542 6.34175 12.6208 6.01025C12.1874 5.67876 11.657 5.49915 11.1113 5.49915C10.5657 5.49915 10.0352 5.67876 9.60182 6.01025C9.16842 6.34175 8.85619 6.80669 8.71333 7.3333H0.666667C0.489856 7.3333 0.320286 7.40354 0.195262 7.52856C0.0702379 7.65359 0 7.82315 0 7.99997C0 8.17678 0.0702379 8.34635 0.195262 8.47137C0.320286 8.59639 0.489856 8.66663 0.666667 8.66663H8.71333C8.85619 9.19324 9.16842 9.65818 9.60182 9.98968C10.0352 10.3212 10.5657 10.5008 11.1113 10.5008C11.657 10.5008 12.1874 10.3212 12.6208 9.98968C13.0542 9.65818 13.3665 9.19324 13.5093 8.66663H15.3333C15.5101 8.66663 15.6797 8.59639 15.8047 8.47137C15.9298 8.34635 16 8.17678 16 7.99997C16 7.82315 15.9298 7.65359 15.8047 7.52856C15.6797 7.40354 15.5101 7.3333 15.3333 7.3333ZM11.1113 9.16663C10.8806 9.16663 10.655 9.09821 10.4632 8.97001C10.2713 8.84182 10.1218 8.65961 10.0335 8.44643C9.94517 8.23325 9.92207 7.99867 9.96708 7.77236C10.0121 7.54605 10.1232 7.33817 10.2864 7.17501C10.4495 7.01185 10.6574 6.90073 10.8837 6.85572C11.11 6.8107 11.3446 6.83381 11.5578 6.92211C11.771 7.01041 11.9532 7.15994 12.0814 7.3518C12.2096 7.54366 12.278 7.76922 12.278 7.99997C12.2776 8.30928 12.1546 8.60582 11.9359 8.82453C11.7172 9.04325 11.4206 9.16628 11.1113 9.16663Z" fill="#9797BB"/>
            <path d="M15.3333 12.8333H7.28733C7.14424 12.3068 6.83188 11.8421 6.39845 11.5107C5.96501 11.1793 5.43459 10.9998 4.889 10.9998C4.34341 10.9998 3.81299 11.1793 3.37955 11.5107C2.94612 11.8421 2.63376 12.3068 2.49067 12.8333H0.666667C0.489856 12.8333 0.320286 12.9036 0.195262 13.0286C0.0702379 13.1536 0 13.3232 0 13.5C0 13.6768 0.0702379 13.8464 0.195262 13.9714C0.320286 14.0964 0.489856 14.1667 0.666667 14.1667H2.49067C2.63376 14.6931 2.94612 15.1579 3.37955 15.4893C3.81299 15.8206 4.34341 16.0002 4.889 16.0002C5.43459 16.0002 5.96501 15.8206 6.39845 15.4893C6.83188 15.1579 7.14424 14.6931 7.28733 14.1667H15.3333C15.5101 14.1667 15.6797 14.0964 15.8047 13.9714C15.9298 13.8464 16 13.6768 16 13.5C16 13.3232 15.9298 13.1536 15.8047 13.0286C15.6797 12.9036 15.5101 12.8333 15.3333 12.8333ZM4.88867 14.6667C4.65792 14.6667 4.43236 14.5982 4.2405 14.47C4.04864 14.3418 3.89911 14.1596 3.81081 13.9465C3.72251 13.7333 3.6994 13.4987 3.74442 13.2724C3.78943 13.0461 3.90055 12.8382 4.06371 12.675C4.22687 12.5119 4.43475 12.4008 4.66106 12.3557C4.88737 12.3107 5.12195 12.3338 5.33513 12.4221C5.54831 12.5104 5.73052 12.66 5.85871 12.8518C5.98691 13.0437 6.05533 13.2692 6.05533 13.5C6.0548 13.8092 5.93172 14.1057 5.71304 14.3244C5.49436 14.543 5.19792 14.6661 4.88867 14.6667Z" fill="#9797BB"/>
            </g>
            <defs>
            <clipPath id="clip0_2_2234">
            <rect width="16" height="16" fill="white"/>
            </clipPath>
            </defs>
            </svg>
            </div>
            <div class="messenger-content-dialogs__input">
                <BaseSearchInput
                        placeholder="Поиск чатов"
                        @toggleSearch="toggleSearch"
                        @handler="searchHandler"
                        :isWithAction="false"
                        @toggleModalCreateChat="toggleModalCreateChat"
                ></BaseSearchInput>
        </div>
        <template v-if="openedSearch">
            <div class="messenger-content-dialogs__parameters-container pointer" @click="toggleSearchParameters(!openedSearchParameters)">
                <span class="messenger-content-dialogs__parameters-button">
                    <template v-if="selectedParameter"> Искать по {{parameters.find(i => i.value === selectedParameter).name}}</template>
                    
                    <template v-else>  {{parameters.find(i => i.value === selectedParameter).name}} </template>
                   
                    
              
                </span>
                <svg class="messenger-content-dialogs__parameters-icon"
                     :class="{'messenger-content-dialogs__parameters-icon_reverse': openedSearchParameters}" 
                     width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.1405 6.1972C12.0786 6.13471 12.0048 6.08512 11.9236 6.05127C11.8423 6.01743 11.7552 
                6 11.6672 6C11.5792 6 11.4921 6.01743 11.4108 6.05127C11.3296 6.08512 11.2558 6.13471 11.1939 6.1972L8.14053
                 9.25052C8.07855 9.31301 8.00482 9.3626 7.92358 9.39645C7.84234 9.43029 7.7552 9.44772 7.6672 9.44772C7.57919 
                 9.44772 7.49205 9.43029 7.41081 9.39645C7.32957 9.3626 7.25584 9.31301 7.19386 9.25052L4.14053 6.1972C4.07855
                  6.13471 4.00482 6.08512 3.92358 6.05127C3.84234 6.01743 3.7552 6 3.6672 6C3.57919 6 3.49205 6.01743 3.41081 
                  6.05127C3.32957 6.08512 3.25584 6.13471 3.19386 6.1972C3.06969 6.32211 3 6.49107 3 6.6672C3 6.84332 3.06969 
                  7.01229 3.19386 7.1372L6.25386 10.1972C6.62886 10.5717 7.13719 10.7821 7.6672 10.7821C8.1972 10.7821 8.70553 
                  10.5717 9.08053 10.1972L12.1405 7.1372C12.2647 7.01229 12.3344 6.84332 12.3344 6.6672C12.3344 6.49107 12.2647
                   6.32211 12.1405 6.1972Z" fill="#9797BB"/>
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
                    <!-- <BaseFolderName>
                        {{folders.find(i => i.folder_id === folderGroup.folder_id).name}}
                    </BaseFolderName> -->
                    <div class="messenger-search-group__dialogs">
                        <div class="messenger-search-group__dialog"
                             v-for="(dialog, index) in folderGroup.dialogs"
                             :key="dialog.dialog_id*1000 + (dialog.last_message? dialog.last_message.message_id : index * 1321)" :class="{
                            'base-dialog_active': selectedDialog === dialog.dialog_id,
                        }"
                        >
                            <BaseDialog
                                    :chatInfo="dialog"
                                    class="base-dialog_not-padding"
                                    @click="select(dialog.dialog_id)"
                                    
                                    @contextmenu.prevent="openContextMenu($event, {id: dialog.dialog_id, itemName: 'dialog', item: dialog.name})"
                            ></BaseDialog>
                        </div>
                    </div>
                </div>
            </MessengerContentDialog>
        </template>
        <template v-else>
            <div class="messenger-content-dialogs__loader" v-if="isLoadingDialogs&&!loading">
                <BaseLoader></BaseLoader>
            </div>
            <MessengerContentDialog v-else :need-loading-more="true">
                <BaseDialog
                        v-for="(dialog, index) in dialogs"
                        :key="dialog.dialog_id*1000 + (dialog.last_message? dialog.last_message.message_id : index * 1321)"
                        :chatInfo="dialog"
                        :class="{
                            'base-dialog_active': selectedDialog === dialog.dialog_id,
                        }"
                        :isNeedSelecting="true"
                        :isSelected="selectedGroupDialogs.find(i => i === dialog.dialog_id)"
                       

                        @contextmenu.prevent="openContextMenu($event, {id: dialog.dialog_id, itemName: 'dialog', item: dialog.name})"
                        @toggleSelecting="toggleSelectedGroupDialogs(dialog.dialog_id)"
                        @click.ctrl.exact="toggleSelectedGroupDialogs(dialog.dialog_id)"
                        @click.exact="select(dialog.dialog_id)"
                ></BaseDialog>
            </MessengerContentDialog>
        </template>

        <!-- <ModalEditSelectFolder v-if="toggleModalEditSelectFolder" :id="folderId.folder_id" @closeModalEditSelect="toggleModalEditSelectFolder=false"></ModalEditSelectFolder>
        <ModalEditSelectFolderChild v-if="toggleModalEditSelectFolderChild" :id="folderId.folder_id" :child="foldersChildSendId" @closeModalEditSelectChild="toggleModalEditSelectFolderChild=false"></ModalEditSelectFolderChild> -->
   
     <div class="messenger-content-dialogs__add green-color pointer" @click="toggleModalCreateChat(true)">Добавить пользователей</div>
    </div>
</template>
<script>
    import BaseSearchInput from '../../Base/BaseSearchInput';
    import BaseDialog from '../../Base/BaseDialog';
    import BaseFolderName from '../../Base/BaseFolderName';
    import BaseLoader from '../../Base/BaseLoader';
    import MessengerContentDialog from './MessengerContentDialog/MessengerContentDialog.vue'
    import { useDialogs } from "../../../composition/useDialogs";
    import { useFolder } from "../../../composition/useFolder";
    import { useMessages } from "../../../composition/useMessages";
    import { useSearch } from "../../../composition/useSearch";
    import { reactive, computed, onUpdated, watch, ref } from 'vue';

    import {useLoader} from "../../../composition/useLoader";
    import {useModals} from "../../../composition/useModals";
    import {useContextMenu} from "../../../composition/useContextMenu";
    export default {
        components: { BaseSearchInput, BaseDialog, BaseFolderName, BaseLoader, MessengerContentDialog },
        props:{loading:Boolean},
        emits:['getId'],
        setup(props,{emit}) {
            const { dialogs, selectDialog, selectedDialog, toggleSelectedGroupDialogs, selectedGroupDialogs } = useDialogs();
            const { selectedFolder, folders } = useFolder();
            const { search, selectedParameter, selectParameter, openedSearch, openedSearchParameters, toggleSearchParameters, toggleSearch } = useSearch();
            const { toggleModalCreateChat } = useModals();
            const { setContext } = useContextMenu();
            const { isLoadingDialogs } = useLoader();
            const { getMessagesFromDialog } = useMessages();
            const folderName = ref();
            const folderId = ref([]);
            const parameters = [{
                name: 'имени',
                value: 'name'
            }, {
                name: 'телефону',
                value: 'phone'
            }, {
                name: 'сообщениям',
                value: 'messages'
            }, {
                name: 'логину',
                value: 'login'
            },
            {
                name: 'тегам',
                value: 'tags'
            },
             {
                name: 'Искать все',
                value: null
            },
            ]
            const toggleModalEditSelectFolder = ref(false);
            const toggleModalEditSelectFolderChild = ref(false)
            const getFolderName = () => {
                const name = ref()
                if(folders.value) {
                const parent = ref(null);
                parent.value =folders.value.filter(i => i.folder_id == selectedFolder.value);
                const children = ref()
                if(parent.value&&parent.value[0]){
                  folderName.value =  parent.value[0].name
        
                }
                else  {
                    for(let i = 0; i< folders.value.length; i++){
                        if(folders.value[i].folders){
                            children.value= folders.value[i].folders.filter(i => i.folder_id == selectedFolder.value)
                            if(children.value&&children.value[0]){
                                folderName.value=   children.value[0].name  
                               
                            }
                        }
                    }
                }
                }
            }
            const getFolderEdit = () => {
               emit('getFolderEdit')
            }
            watch(() => {
             
                getFolderName()
            })
            const selectParamName = ref(null);
            const selectParam = (param) => {
                if (param !== selectedParameter.value) {
                    selectParameter(param);
                    searchHandler(lastSearchValue);
                }
                toggleSearchParameters(false);
            
            }
            const select = (dialog_id) => {
                emit('loadTrue');
                selectDialog(dialog_id)
                // .then((r)=>{
                //     console.log('ghbikj')
                // })
               
                getMessagesFromDialog(dialog_id)
                .then((r) => {
                    emit('getId', dialog_id)
                      emit('loadFalse');
                });
                
            }
            const dialogsInFolders = reactive({
                data: [],
            })
            let time = new Date().getTime();
            let lastSearchValue = '';
            const searchHandler = (value) => {
                lastSearchValue = value;
                dialogsInFolders.data = [];
                let newTime = new Date().getTime();
                time = newTime;
                setTimeout(() => {
                    if (newTime === time) {
                        search(value)
                            .then(r => {
                                
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
            const openContextMenu = ($event, context) => {
                setContext({
                    top: $event.clientY,
                    left: $event.clientX,
                }, context)
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
                folderName,
                toggleModalCreateChat,
                getFolderName,
                selectParamName,
                getFolderEdit,
                folderId,
                toggleModalEditSelectFolder,
                toggleModalEditSelectFolderChild
            }
        }
    }
</script>

<style lang="scss" src="./messenger-content-dialogs.scss"></style>