<template>
    <div class="shadows">
        <div class="connect-accaunt-folder__body">
            <div class="connect-accaunt-folder__header">
                <div class="connect-accaunt-folder__cup">
                    <div class="connect-accaunt-folder__cup_title">
                        Выбрать папку
                    </div>
                    <div class="connect-accaunt-folder__cup_close pointer">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="closeModalConnectFolder">
                            <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#9797BB"/>
                        </svg>
                    </div>
                </div>
                <div class="connect-accaunt-folder__subtitle">{{instagramsApiId.user_name}}</div>
            </div>
            <div class="connect-accaunt-folder__main">
                <div class="connect-accaunt-folder__main_search">
                    <BaseSearchInput :placeholder="'Поиск'"></BaseSearchInput>
                </div>
                <div class="connect-accaunt-folder__list scroll-poiner">
                    <template v-for="(folder, index) in folders" :key="index">
                        <div class="pointer"  @click="clickParentFolder(index, folder.folder_id)" :class="{'connect-accaunt-folder__folder_folders': folder.folders, 'connect-accaunt-folder__folder': !folder.folders}">
                            <div v-if="!folder.folders" class="connect-accaunt-folder__select">
                                <svg :class="{'active-select': selectParent[index].parentActive}"  width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.5" y="0.5" width="21" height="21" rx="3.5" fill="#252544"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1131 6.84484C17.4002 6.49101 17.3461 5.97146 16.9922 5.68438C16.6384 5.3973 16.1189 5.4514 15.8318 5.80523L8.73419 14.5528L5.72907 12.233C5.3684 11.9546 4.85031 12.0213 4.57189 12.3819C4.29347 12.7426 4.36014 13.2607 4.72081 13.5392L8.36336 16.351L9.00078 16.843L9.50813 16.2178L17.1131 6.84484Z" fill="#252544"/>
                                    <rect x="0.5" y="0.5" width="21" height="21" rx="3.5" stroke="#40406B"/>
                                </svg>
                            </div>
                            <div class="connect-accaunt-folder__element">
                                <div class="connect-accaunt-folder__element_title">{{folder.name}}</div>
                                <div class="connect-accaunt-folder__element_subtitle">{{folder.unread}}</div>
                            </div>
                            <div class="connect-accaunt-folder__select">
                                <svg v-if="folder.folders" width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.7508 0.247421C11.6711 0.169022 11.5763 0.106794 11.4719 0.0643287C11.3674 0.0218632 11.2554 0 11.1423 0C11.0291 0 10.9171 0.0218632 10.8127 0.0643287C10.7082 0.106794 10.6134 0.169022 10.5338 0.247421L6.6085 4.07837C6.52883 4.15677 6.43404 4.219 6.3296 4.26146C6.22516 4.30393 6.11314 4.32579 6 4.32579C5.88686 4.32579 5.77484 4.30393 5.6704 4.26146C5.56596 4.219 5.47117 4.15677 5.3915 4.07837L1.46623 0.247421C1.38655 0.169022 1.29176 0.106794 1.18732 0.0643287C1.08289 0.0218632 0.970865 0 0.857725 0C0.744585 0 0.632564 0.0218632 0.528125 0.0643287C0.423686 0.106794 0.328896 0.169022 0.249222 0.247421C0.0895969 0.404141 0 0.616141 0 0.837119C0 1.0581 0.0895969 1.2701 0.249222 1.42682L4.18306 5.26613C4.66515 5.73605 5.31865 6 6 6C6.68135 6 7.33485 5.73605 7.81694 5.26613L11.7508 1.42682C11.9104 1.2701 12 1.0581 12 0.837119C12 0.616141 11.9104 0.404141 11.7508 0.247421Z" fill="#9797BB"/>
                                </svg>
                            </div>
                            
                        </div>
                        <template v-if="folder.folders && countArrayFolder[index].isFolderActive">
                            <div class="connect-accaunt-folder__folder folder-child pointer" @click="activeSelectParent(index, folder.folder_id)">
                            <div class="connect-accaunt-folder__select">
                                   <svg :class="{'active-select': selectParent[index].parentActive}" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.5" y="0.5" width="21" height="21" rx="3.5" fill="#252544"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1131 6.84484C17.4002 6.49101 17.3461 5.97146 16.9922 5.68438C16.6384 5.3973 16.1189 5.4514 15.8318 5.80523L8.73419 14.5528L5.72907 12.233C5.3684 11.9546 4.85031 12.0213 4.57189 12.3819C4.29347 12.7426 4.36014 13.2607 4.72081 13.5392L8.36336 16.351L9.00078 16.843L9.50813 16.2178L17.1131 6.84484Z" fill="#252544"/>
                                        <rect x="0.5" y="0.5" width="21" height="21" rx="3.5" stroke="#40406B"/>
                                    </svg>
                                </div>
                                <div class="connect-accaunt-folder__element">
                                    <div class="connect-accaunt-folder__element_title">{{folder.name}}</div>
                                    <div class="connect-accaunt-folder__element_subtitle">{{folder.unread}}</div>
                                </div>
                            </div>
                            <template v-for="(folderChild, jindex) in folder.folders" :key="jindex">
                                <div class="connect-accaunt-folder__folder folder-child pointer" @click="activeSelectChild(jindex, folderChild.folder_id)">
                                    <div class="connect-accaunt-folder__select">
                                        <svg :class="{'active-select': selectChild[jindex].childActive}"  width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="0.5" y="0.5" width="21" height="21" rx="3.5" fill="#252544"/>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1131 6.84484C17.4002 6.49101 17.3461 5.97146 16.9922 5.68438C16.6384 5.3973 16.1189 5.4514 15.8318 5.80523L8.73419 14.5528L5.72907 12.233C5.3684 11.9546 4.85031 12.0213 4.57189 12.3819C4.29347 12.7426 4.36014 13.2607 4.72081 13.5392L8.36336 16.351L9.00078 16.843L9.50813 16.2178L17.1131 6.84484Z" fill="#252544"/>
                                            <rect x="0.5" y="0.5" width="21" height="21" rx="3.5" stroke="#40406B"/>
                                        </svg>
                                    </div>
                                    <div class="connect-accaunt-folder__element">
                                        <div class="connect-accaunt-folder__element_title">{{folderChild.name}}</div>
                                        <div class="connect-accaunt-folder__element_subtitle">{{folderChild.unread}}</div>
                                    </div>
                                </div>
                            </template>
                        </template>
                    </template>
                </div>
            </div>
            <div class="connect-accaunt-folder__buttons">
                <div class="connect-accaunt-folder__buttons_accept pointer" @click="initialFolderId()">Сохранить изменения</div>
                <div class="connect-accaunt-folder__buttons_cancel pointer" @click="closeModalConnectFolder">Отмена</div>
            </div>
        </div>
    </div>
</template>

<script>
    import { ref, watch, onUpdated } from 'vue'
    import { useInstagramApi } from "@/composition/useInstagramApi";
    import BaseSearchInput from "@/components/Base/BaseSearchInput.vue"
    import {useAnswerphone} from "@/composition/useAnswerphone"

    export default {
        components:{
            BaseSearchInput,
        },
        setup(props, {emit}){
            const {folders, getFolder, instagramsApiId, initialCreateElement,createNewAccaunt, getInstagramsApi} = useInstagramApi()
            const {answerphone} = useAnswerphone()
            
            getFolder()

            const personalName = ref(instagramsApiId.value.user_name)

            const folderActive = ref(true)

            const countArrayFolder = ref([])

            const selectParent = ref([])
            const selectChild = ref([])

            const folderId = ref()
            const initialFolderId = () => {
                answerphone.value.folder_ids = [folderId.value]
                emit('closeModalConnectFolder')
            }

            const activeSelectParent = (index, folder_id) => {
                for(i=0; i < Object.keys(folders.value).length; i++){
                    selectParent.value[i].parentActive = false
                    if(folders.value[i].folders){
                        for(let j=0; j < Object.keys(folders.value[i].folders).length; j++){
                            selectChild.value[j].childActive = false
                        }
                    }
                }
                if(selectParent.value[index].parentActive){
                    selectParent.value[index].parentActive = false;
                } else{
                    selectParent.value[index].parentActive = true
                    
                    folderId.value = folder_id
                }
            }
            const activeSelectChild = (jindex, folder_id) => {
                for(i=0; i < Object.keys(folders.value).length; i++){
                    selectParent.value[i].parentActive = false
                    if(folders.value[i].folders){
                        for(let j=0; j < Object.keys(folders.value[i].folders).length; j++){
                            selectChild.value[j].childActive = false
                        }
                    }
                }
                if(selectChild.value[jindex].childActive){
                    selectChild.value[jindex].childActive = false;
                } else{
                    selectChild.value[jindex].childActive = true
                    folderId.value = folder_id
                }
            }

            const closeModalConnectFolder = () => {
                emit('closeModalConnectFolder')
            }

            const closeAllModals = () => {
                emit('closeModalConnectFolder')
                emit('closeAllModals')
                getInstagramsApi()
                
            }

            const clickParentFolder = (index, folder_id) => {
                if(folders.value[index].folders){
                    isActiveParentFolder(index)
                } else {
                    activeSelectParent(index, folder_id)
                }
            }

            const isActiveParentFolder = (index) => {
                if(!countArrayFolder.value[index].isFolderActive){
                    countArrayFolder.value[index].isFolderActive = true;
                } else{
                    countArrayFolder.value[index].isFolderActive = false
                }
            }

            watch(() => {
                /* if(folderActive.value){
                    getFolder()
                    .then((r)=> {
                        folderActive.value = false */
                        for(i=0; i < Object.keys(folders.value).length; i++){
                            countArrayFolder.value.push({isFolderActive: false})
                            selectParent.value.push({
                                                    parentActive: false})

                            if(folders.value[i].folders){
                                for(let j=0; j < Object.keys(folders.value[i].folders).length; j++){
                                    selectChild.value.push({
                                                            childActive: false})
                                }
                            }
                        }
                   /*  })
                }  */
                /* getFolder() */
            })
            
            const commentsActive = ref(false)

            const searchCommentsActive = () => {
                if(commentsActive.value){
                    commentsActive.value = false
                }else{
                    commentsActive.value = true
                }
            }
            
            return {
                answerphone,
                initialFolderId,
                folderId,
                
                personalName,
                folderActive,

                searchCommentsActive,

                closeModalConnectFolder,
                closeAllModals,

                folders,
                instagramsApiId,

                commentsActive,

                countArrayFolder,
                clickParentFolder,
                isActiveParentFolder,

                activeSelectChild,
                activeSelectParent,
                selectParent,
                selectChild,
            }
        }
    }
</script>
<style lang="scss" src="./settings-answerphone-folders.scss"></style>