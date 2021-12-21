<template >
    <div class="folders">
        <div class="folders__window window" v-if="newFolder != true">
            <div class="window__header">
                <div class="window__header_title">Выбрать папку</div>
                <div class="window__header_close pointer">
                    <img src="@/assets/close.svg" @click="closeFolders">
                </div>
            </div>
            <div class="window__searchbar">
                <span class="window__searchbar_img"><img class="pointer" src="@/assets/searchbar.svg"></span>
                <input v-model="searchInput.name" class="window__searchbar_input" type="text" placeholder="Поиск папки" @input="searchInputFolder(searchInput.name)">
            </div>
            <div class="window__folder folder">
                <div class="window__folder_title">Выберите папку для привязки</div>
                <div class="folder__list">
                    <template v-for="(folder, index) in folders" :key="index">
                        <div class="folder__list_element element">
                            <div class="element__select" @click="searchFolderActive(index, folder.folder_id)" :class="{'select-folder' : folderActive[index]}">
                                <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.8323 1.22258C12.0933 0.900918 12.0441 0.428598 11.7224 0.167618C11.4008 -0.093362 10.9285 -0.044182 10.6675 0.277478L4.21516 8.22982L1.48323 6.12092C1.15535 5.86781 0.684364 5.92843 0.431254 6.25631C0.178144 6.58422 0.238754 7.05522 0.566634 7.30832L3.87804 9.86452L4.45751 10.3118L4.91874 9.74342L11.8323 1.22258Z" fill="#1D1D35"/>
                                </svg>
                            </div>
                            <div class="element__block-list" @click="openParentFolders()">
                            <div class="element__text">
                                <div class="element__text_title">{{folder.name}}</div>
                                <div class="element__text_subtitle">{{folder.unread}} чатов</div>
                            </div>
                            <div class="element__arrow" v-if="folder.folders != null ">        
                                <img src="@/assets/arrow_down.svg">
                            </div>
                            </div>
                        </div>
                        <template v-if="showParentFolders">
                            <template v-if="folder.folders != null">
                                <div class="folder__list_element element child-element" v-for="(childFolder, jindex) in folder.folders" :key="jindex" @click="searchFolderParentActive(index, jindex)"> 
                                    <div class="child-element__select" :class="{'select-folder' : folderParentActive[jindex]}">
                                        <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.8323 1.22258C12.0933 0.900918 12.0441 0.428598 11.7224 0.167618C11.4008 -0.093362 10.9285 -0.044182 10.6675 0.277478L4.21516 8.22982L1.48323 6.12092C1.15535 5.86781 0.684364 5.92843 0.431254 6.25631C0.178144 6.58422 0.238754 7.05522 0.566634 7.30832L3.87804 9.86452L4.45751 10.3118L4.91874 9.74342L11.8323 1.22258Z" fill="#252544"/>
                                        </svg>
                                    </div>
                                    <div class="child-element__block-list">
                                    <div class="child-element__text">
                                        <div class="child-element__text_title">{{childFolder.name}}</div>
                                        <div class="child-element__text_subtitle">{{childFolder.unread}} чатов</div>
                                    </div>
                                    </div>
                                </div>
                            </template>
                        </template>
                    </template>
                </div>
            </div>
            <div class="window__buttons">
                <div class="window__buttons_save pointer" @click="closeFolders">Сохранить</div>
                <div class="window__buttons_cancel pointer" @click="closeFolders">Отмена</div>
            </div>
        </div>
        <NewFolders v-if="newFolder" @closeNewFolder="closeNewFolder()"></NewFolders>
    </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue'
import NewFolders from '@/components/SettingsContainer/SettingsAnswerphone/settings-answerphone-create-folders.vue'
import {useFolder} from "@/composition/useFolder"
import { useAnswerphone } from "@/composition/useAnswerphone"
export default {
    components: {
        NewFolders,
    },
    setup(props, {emit}) {
        const {getAllFolders, folders} = useFolder()
        const {answerphone} = useAnswerphone()

        const newFolder = ref(false)

        const folderActive = ref([])
        const folderParentActive = ref([])

        const searchFolderActive = (index, id) => {
            folderActive.value[index] = !folderActive.value[index]

            /* for(i=0; i< folders.value[index].folders.length; i++){
                folderParentActive.value[i] = !folderParentActive.value[i]
                answerphone.folder_ids = id
            } */
        }

        const newFolders = ref([])

        const initialFolders = (item) => {
            console.log("hello")
            console.log(folders.value)

            newFolders.value = item

            for( i=0; i< item.length; i++){
                newFolders.value[i].isActive = false
            }
            console.log(newFolders.value)
        }

        onMounted(() => {
            initialFolders(folders.value)
        })
        
        const searchFolderParentActive = (index, jindex) => {
            folderParentActive.value[jindex] = !folderParentActive.value[jindex]
        }

        const closeNewFolder = () => {
            newFolder.value = false
        }
        const openNewFolder = () => {
            newFolder.value = true
        }

        const closeFolders = () => {
            emit('closeFolders')
        }

        const searchInput = ref({
            name: "",
        })

        const pre = ref()

        const childFolders = ref()

        const newInitial = () => {
            pre.value = folders.value
        }

        newInitial()

        const searchInputFolder = (modalValue) => {
            if(modalValue){
                pre.value = pre.value.filter(item => item.name.includes(modalValue))
            } else{
                pre.value = folders.value
            }
        }


        watch(() => {
            getAllFolders()
        })

        const showParentFolders = ref(false)
        const openParentFolders = () => {
            if (showParentFolders.value == false){
                showParentFolders.value = true
            } else {
                showParentFolders.value = false
            }
        }

        return {
            newFolder,
            folders,
            folderActive,
            searchInput,
            pre,
            childFolders,
            showParentFolders,
            folderParentActive,

            closeNewFolder,
            openNewFolder,
            closeFolders,
            searchFolderActive,
            searchInputFolder,
            newInitial,
            openParentFolders,
            searchFolderParentActive,

            answerphone,

            newFolders,
            initialFolders,
        }
    }
    
}
</script>

<style lang="scss" src="./settings-answerphone-folders.scss"></style>