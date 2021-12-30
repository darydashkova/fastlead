<template>
    <div class="modal-select-parent-folder">
        <div class="modal-select-parent-folder__body">
            <div class="modal-select-parent-folder__header">
                <div class="modal-select-parent-folder__header_title">Выбрать основную папку</div>
                <div class="modal-select-parent-folder__header_close pointer" >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" @click="closeParentFolder">
                        <path d="M15.6278 0.372219C15.3894 0.133887 15.0661 0 14.729 0C14.3919 0 14.0686 0.133887 13.8302 0.372219L8 6.20239L2.16983 0.372219C1.93143 0.133887 1.60813 0 1.27103 0C0.933923 0 0.610622 0.133887 0.372219 0.372219C0.133887 0.610622 0 0.933923 0 1.27103C0 1.60813 0.133887 1.93143 0.372219 2.16983L6.20239 8L0.372219 13.8302C0.133887 14.0686 0 14.3919 0 14.729C0 15.0661 0.133887 15.3894 0.372219 15.6278C0.610622 15.8661 0.933923 16 1.27103 16C1.60813 16 1.93143 15.8661 2.16983 15.6278L8 9.79761L13.8302 15.6278C14.0686 15.8661 14.3919 16 14.729 16C15.0661 16 15.3894 15.8661 15.6278 15.6278C15.8661 15.3894 16 15.0661 16 14.729C16 14.3919 15.8661 14.0686 15.6278 13.8302L9.79761 8L15.6278 2.16983C15.8661 1.93143 16 1.60813 16 1.27103C16 0.933923 15.8661 0.610622 15.6278 0.372219Z" fill="#9797BB"/>
                    </svg>
                </div>
            </div>
            <div class="modal-select-parent-folder__search">
                <BaseSearchInput @handler="getValueSearch" :placeholder="'Поиск'"></BaseSearchInput>
            </div>
            <div class="modal-select-parent-folder__folders-list scroll-poiner">
            <template v-for="(folder, index) in newFoldersArray" :key="index">
                <div class="modal-select-parent-folder__element pointer" v-if="!folder.is_default" @click="isActiveParentFolder(index, folder.folder_id)">
                    <div class="modal-select-parent-folder__select">
                        <svg class="modal-select-parent-folder__select_svg" :class="{'folder-active': countArrayFolder[index].isFolderActive}" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="17" height="17" rx="8.5" fill="none"/>
                            <rect x="5" y="5" width="8" height="8" rx="4" fill="#1D1D35"/>
                            <rect x="0.5" y="0.5" width="17" height="17" rx="8.5" stroke="#9797BB"/>
                        </svg>
                    </div>
                    <div class="modal-select-parent-folder__info">
                        <div class="modal-select-parent-folder__info_name">{{folder.name}}</div>
                        <div class="modal-select-parent-folder__info_subname" v-if="!folder.folders">0 папок</div>
                        <div class="modal-select-parent-folder__info_subname" v-else-if="folder.folders.length > 4">{{folder.folders.length}} папок</div>
                        <div class="modal-select-parent-folder__info_subname" v-else>{{folder.folders.length}} папки</div>
                    </div>
                </div>
            </template>
            </div>
            <div class="modal-select-parent-folder__buttons">
                <div class="modal-select-parent-folder__buttons_connect pointer" @click="initialFolderId()">Подключить</div>
                <div class="modal-select-parent-folder__buttons_cancel pointer" @click="closeParentFolder">Отмена</div>
            </div>
        </div>
    </div>
</template>

<script>
    import BaseSearchInput from '@/components/Base/BaseSearchInput.vue'
    import {useFolder} from "@/composition/useFolder";
    import {ref, watch, onMounted} from 'vue'

    export default {
        components: {
            BaseSearchInput,
        },
        props:{},
        setup(props, {emit}) {
            const { folders, deleteFolder, getAllFolders, selectedParentFolder, foldersInSelectedFolder, getAllFoldersInFolder, foldersId} = useFolder();

            const isGetFolders = ref(false)

            const foldersValue = ref(true)

            const newFoldersArray = ref()

            const countArrayFolder = ref([])

            const foldersSelectId = ref()

            const isActiveParentFolder = (index, folder_id) => {
                for(i=0; i < countArrayFolder.value.length; i++){
                    countArrayFolder.value[i].isFolderActive = false;
                }
                countArrayFolder.value[index].isFolderActive = true;
                foldersSelectId.value = folder_id
            }

            const getValueSearch = (value) => {
                if(value){
                    newFoldersArray.value = newFoldersArray.value.filter(item => item.name.includes(value))
                    newFolderChildArray.value = newFolderChildArray.value.filter(item => item.name.includes(value))
                } else{
                    newFoldersArray.value = folders.value
                }
            }

            const initialFolderId = () => {
                foldersId.value = foldersSelectId.value
                emit('searchSelectFolderId')
                closeParentFolder()
            }

            watch(() => {
                if(folders.value && foldersValue.value){
                    newFoldersArray.value = folders.value
                    for(i=0; i < folders.value.length; i++){
                            countArrayFolder.value.push({isFolderActive: false})
                    }
                    foldersValue.value = false 
                }
                if(isGetFolders.value){
                    getAllFolders()
                    .then((r)=> {
                        newFoldersArray.value = folders.value
                        isGetFolders.value = false

                        for(i=0; i < folders.value.length; i++){
                            countArrayFolder.value.push({isFolderActive: false})
                        }
                    })
                }
                
            })

            const closeParentFolder = () => {
                emit('closeParentFolder')
            }

            return {
                newFoldersArray,
                getValueSearch,
                isGetFolders,

                countArrayFolder,
                isActiveParentFolder,

                folders,

                closeParentFolder,

                foldersId,
                foldersSelectId,
                initialFolderId,
                foldersValue,
            }
        }
    }
</script>

<style lang="scss">
    .modal-select-parent-folder{
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.34);
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: left;
        z-index:1100;
        &__body{
            width: 520px;
            background: #252544;
            border-radius: 6px;
        }
        &__header{
            display: flex;
            justify-content: space-between;
            padding: 27px 24px;
            align-items: center;
            &_title{
                color: #F0F0FA;
                font-size: 24px;
                font-weight: 700;
            }
            &_close{

            }
        }
        &__search{
            padding: 16px 24px;
            background: #1D1D35;
        }
        &__folders-list{
            height: 276px;
            background: #1D1D35;
            overflow: auto;
        }
        &__element{
            display: flex;
            padding: 12px 24px 0px;
            align-items: center;
            &:hover{
                background: #40406B;
                transition: all 0.3s;
                & .modal-select-parent-folder__select_svg{
                    & rect:nth-child(2){
                        fill: #CFCFE4;
                        transition: all 0.3s;
                    }
                    & rect:nth-child(3){
                        stroke: #CFCFE4;
                        transition: all 0.3s;
                    }
                }
                & .modal-select-parent-folder__info{
                    border-bottom: 1px solid #40406B;
                }
            }
        }
        &__select{
            
        }
        &__info{
            margin-left: 21px;
            width: 100%;
            padding-bottom: 12px;
            border-bottom: 1px solid #252544;
            &_name{
                color: #CFCFE4;
                font-size: 16px;
                font-weight: 400;
            }
            &_subname{
                color: #9797BB;
                font-size: 12px;
                font-weight: 400;
                padding-top: 6px;
            }
        }   
        &__buttons{
            display: flex;
            padding: 19px 24px;
            align-items: center;
            &_connect{
                background: linear-gradient(45.66deg, #22A595 -40.44%, #84D160 120.07%);
                font-size: 16px;
                font-weight: 500;
                color: #252544;
                padding: 8px 26px;
                border-radius: 4px;
            }
            &_cancel{
                background: none;
                font-size: 16px;
                font-weight: 400;
                color: #5EC075;
                padding: 7px 26px;   
                border: 1px solid #5EC075;
                border-radius: 6px;
                margin-left: 22px;
            }
        }
    }

    .folder-active{
        & rect:nth-child(2){
            fill: #5EC075;
        }
        & rect:nth-child(3){
            stroke: #5EC075;
        }
    }
</style>