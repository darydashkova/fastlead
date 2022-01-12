<template>
    <div class="connect-accaunt-folder__shadows">
        <div class="connect-accaunt-folder__content">
            <div class="connect-accaunt-folder__content_header">
                <div class="connect-accaunt-folder__content_header-cup">
                    <div class="connect-accaunt-folder__content_header-cup_title">
                        Активация аккаунта
                    </div>
                    <div class="connect-accaunt-folder__content_header-cup_close"  @click="closeAllModals">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#9797BB"/>
                        </svg>
                    </div>
                </div>
                <div class="connect-accaunt-folder__content_header-cup_subtitle">{{instagramsApiId.user_name}}</div>
            </div>
            <div class="connect-accaunt-folder__content_main">
                <div class="connect-accaunt-folder__content_main-title">Выберите папку для привязки аккаунта</div>
                <div class="connect-accaunt-folder__content_main-frame">
                    <div class="content__list">
                        <div class="content__folder" v-for="(folder, index) in folders" :key="index" @click="searchFolderActive(index)">
                            <div class="content__folder_info">
                                <div class="content__folder_info-title">{{folder.name}}</div>
                                <div class="content__folder_info-subtitle">{{folder.unread}}</div>
                            </div>
                            <div class="content__folder_info">
                                <div class="content__folder_info-select" :class="{'select-active' : folderActive[index]}">
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5574 1.22258C11.8184 0.900918 11.7692 0.428598 11.4475 0.167618C11.1259 -0.093362 10.6536 -0.044182 10.3926 0.277478L3.94026 8.22982L1.20833 6.12092C0.880452 5.86781 0.409462 5.92843 0.156352 6.25631C-0.0967581 6.58422 -0.036148 7.05522 0.291732 7.30832L3.60314 9.86452L4.18261 10.3118L4.64384 9.74342L11.5574 1.22258Z" fill="#1D1D35"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="connect-accaunt-folder__content_more">
                <div class="connect-accaunt-folder__content_more-text">
                    Используйте одну папку для одого канала,<br/>чтобы улучшить их работу
                </div>
                <div class="connect-accaunt-folder__content_more-comments">
                    <div class="connect-accaunt-folder__content_more-comments_title">
                        Отслеживать
                    </div>
                    <div class="connect-accaunt-folder__content_more-comments_select">
                        <div class="connect-accaunt-folder__content_more-comments_selected">

                        </div>
                        Коментарии
                    </div>
                </div>
            </div>
            <div class="connect-accaunt-folder__content_bottom">
                <div class="connect-accaunt-folder__content_bottom-buttons">
                    <button class="connect-accaunt-folder__content_bottom-buttons_connect" @click="sellDataAccaunt()">Готово</button>
                    <button class="connect-accaunt-folder__content_bottom-buttons_cancel" @click="closeModalConnectFolder">Отмена</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { ref, watch, onUpdated } from 'vue'
    import { useInstagramApi } from "@/composition/useInstagramApi";
    export default {

        setup(props, {emit}){
            const {folders, getFolder, instagramsApiId, initialCreateElement,createNewAccaunt, getInstagramsApi} = useInstagramApi()
    
            const folderActive = ref([])

            const closeModalConnectFolder = () => {
                emit('closeModalConnectFolder')
            }

            const closeAllModals = () => {
                emit('closeModalConnectFolder')
                emit('closeAllModals')
                getInstagramsApi()
                
            }

            watch(() => {
                getFolder()
            })
            
            const searchFolderActive = (index) => {
                for(let i = 0; i < Object.keys(folders.value).length; i++){
                    folderActive.value[i] = false 
                    initialCreateElement.value.default_folder = folders.value[index].folder_id
                }
                folderActive.value[index] = !folderActive.value[index]
            }

            const sellDataAccaunt = () => {
      
                createNewAccaunt(initialCreateElement.value)
                closeAllModals()
                getInstagramsApi()
            }


            
            return {

                closeModalConnectFolder,
                closeAllModals,

                folders,
                instagramsApiId,

                searchFolderActive,
                folderActive,

                initialCreateElement,

                sellDataAccaunt,
            }
        }
    }
</script>

<style lang="scss" src="./ModalConnectAccauntFolder.scss"></style>