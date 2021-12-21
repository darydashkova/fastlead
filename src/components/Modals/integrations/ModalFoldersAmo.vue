<template>
    <div class="modal-folders">
        <div class="modal-folders__title">
            Поместить в папку 
        </div>
        <svg @click="close()" class="modal-folders__close pointer" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#9797BB"/>
        </svg>
        <div class="modal-folders__search">
            <svg class="modal-folders__search-img pointer" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.8167 13.933L10.5511 9.66739C11.3774 8.64678 11.8749 7.34991 11.8749 5.93744C11.8749 2.66373 9.21113 0 5.93742 0C2.6637 0 0 2.6637 0 5.93741C0 9.21112 2.66373 11.8749 5.93745 11.8749C7.34992 11.8749 8.64679 11.3774 9.66739 10.5511L13.933 14.8167C14.0548 14.9386 14.2148 14.9998 14.3749 14.9998C14.5349 14.9998 14.6949 14.9386 14.8167 14.8167C15.0611 14.5723 15.0611 14.1773 14.8167 13.933ZM5.93745 10.6249C3.35246 10.6249 1.25 8.52239 1.25 5.93741C1.25 3.35243 3.35246 1.24997 5.93745 1.24997C8.52243 1.24997 10.6249 3.35243 10.6249 5.93741C10.6249 8.52239 8.5224 10.6249 5.93745 10.6249Z" fill="#9797BB"/>
            </svg>
            <input type="text" class="modal-folders__search-input" placeholder="Поиск папок" v-model="search" @input="searchFolder">
        </div>
        <div  class="modal-folders__choise">
            <div  class="modal-folders__choise-title">
                Мои папки ({{folders.length}})
            </div>{{styleActive.value}}
            <div class="modal-folders__choise-item" v-for="(folder, index) in allFolders" :key="index" @click="chooseFolder(index, folder.folder_id )" :class="{'modal-folders__choise-item_active': (styleActive[index]?true:false)}">
                <div class="modal-folders__choise-item-flex">
                    <div class="modal-folders__choise-item-flex-name">{{folder.name}}</div>
                    <div class="modal-folders__choise-item-flex-count">{{folder.dialogues_count}}</div>
                </div>
                <svg class="modal-create-chat__icon" width="34" height="36" viewBox="0 0 34 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5406 4.59323L13.0153 4.59417C12.4553 4.59417 12.0001 4.10409 12 3.49966C12 2.89496 
                12.4553 2.40504 13.0153 2.40504L17.5397 2.40421L17.0115 0.43478C16.9758 0.303059 17.0178 0.161069 17.117 0.0748097C17.2169 -0.0107284 17.3542
                -0.0243834 17.4661 0.0414493L22.8358 3.20203C22.9366 3.26186 23 3.3756 23 3.50049C23 3.62439 22.9366 3.73896 22.8358 3.79879L17.466 6.9586C17.3532 7.02437 
                17.2169 7.01072 17.1169 6.92518C17.0178 6.83975 16.9758 6.69782 17.0114 6.56526L17.5406 4.59323ZM17.6687 11.697H26.9167C28.7946 11.6989 30.595 12.3221 31.9229
                13.4298C33.2508 14.5376 33.9977 16.0395 34 17.6061V29.4243C33.9977 30.9909 33.2508 32.4928 31.9229 33.6006C30.595 34.7083 28.7946 35.3315 26.9167 35.3334H7.08333C5.20541 
                35.3315 3.40504 34.7083 2.07714 33.6006C0.749249 32.4928 0.00224946 30.9909 0 29.4243V15.2425C0.00224946 13.6759 0.749249 12.1739 2.07714 11.0662C3.40504 9.95842
                5.20541 9.33525 7.08333 9.33337H10.6647C11.324 9.33383 11.9742 9.46165 12.5644 9.70683L17.0354 11.5788C17.233 11.6578 17.4496 11.6982 17.6687 11.697ZM10.6647 
                11.697H7.08333C5.95616 11.697 4.87516 12.0705 4.07813 12.7354C3.2811 13.4004 2.83333 14.3022 2.83333 15.2425V16.4172L30.8536 16.2848C30.5379 15.629 29.9944 
                15.0668 29.2929 14.6705C28.5914 14.2742 27.7639 14.0618 26.9167 14.0606H17.6687C17.0088 14.0584 16.3585 13.9285 15.7689 13.6813L11.2979 11.8152C11.1003 
                11.7362 10.8838 11.6958 10.6647 11.697ZM7.08333 32.9697H26.9167C28.0438 32.9697 29.1248 32.5962 29.9219 31.9313C30.7189 31.2664 31.1667 30.3646 31.1667
                29.4243V18.6473L2.83333 18.7808V29.4243C2.83333 30.3646 3.2811 31.2664 4.07813 31.9313C4.87516 32.5962 5.95616 32.9697 7.08333 32.9697Z" 
                fill="url(#paint0_linear)"></path><defs><linearGradient id="paint0_linear" x1="-14.0617" y1="49.2922" x2="43.2073" y2="-4.55837"
                gradientUnits="userSpaceOnUse"><stop stop-color="#22A595"></stop><stop offset="1" stop-color="#84D160"></stop></linearGradient>
                </defs></svg>
            </div>
        </div>
        <div class="modal-folders__create pointer" @click="createNewFolder()">
            Создать новую папку 
        </div>
        <div class="modal-folders__buttons">
            <div class="base-button base-button_enter base-button_p5-15" @click="save">Сохранить</div>
            <div class="base-button base-button_border-green" @click="close()">Отмена</div>
        </div>
    </div>
</template>
<script>

import {useModals} from "../../../composition/useModals";
import { ref, onUpdated, computed } from 'vue';
import {useFolder} from "../../../composition/useFolder";
export default {
    props: {
     index: Number,
    },
    emits: ["closeModal", "folderSave"],
    setup(props, {emit}) {

        const { toggleModalEditFolders, toggleModalCreateFolder, setCloseCallbackCreateFolder, createFolderParentId } = useModals();
        const allFolders = ref({});
        const { folders,
                getAllFolders,
                selectedParentFolder,
                foldersInSelectedFolder ,
                getAllFoldersInFolder,
                createpdateFolder
            } = useFolder();
        getAllFolders()
        .then ( (r) => {
            allFolders.value = r
        })
        const search = ref();
        const searchFolder = () => {
        getAllFolders()
        .then ( (r) => {
            if(search.value.length!=0){
               allFolders.value = allFolders.value.filter(i => i.name.includes(search.value)) 
            }
            else{
                allFolders.value = r
            }   
        })
        }
        const styleActive = ref([]);
        const createNewFolder = () => {
                if (selectedParentFolder.value) {
                    setCloseCallbackCreateFolder(() => getAllFoldersInFolder(selectedParentFolder.value, true))
                    createFolderParentId.value = selectedParentFolder.value;
                }
                toggleModalCreateFolder(true);
            }

        const close = () => {
            emit('closeModal', props.index,  false)
        }
        const emitFolder = ref();
        const chooseFolder = (index, folder) => {
            for(let i = 0; i<styleActive.value.length; i++ ){
                styleActive.value[i] = false
            }
            styleActive.value[index] = true
            emitFolder.value = folder;
        }
        onUpdated (() => {
            if(createpdateFolder.value){
                 getAllFolders()
                    .then ( (r) => {
                        allFolders.value = r
                        for(let i = 0; i<allFolders.value;i++){
                            styleActive.value.push(false)
                        }
                    })
                createpdateFolder.value=false
            }

        })
        const save = () => {
            emit('folderSave', props.index, false, emitFolder.value )
        }
        return {
            allFolders,
            close,
            createNewFolder,
            folders: selectedParentFolder.value? foldersInSelectedFolder : folders,
            toggleModalCreateFolder,
            createpdateFolder,
            chooseFolder,
            styleActive,
            search,
            searchFolder,
            emitFolder,
            save
        }
    },
}
</script>
<style lang="scss">
.modal-folders{
    position: absolute;
    background: #252544;
    border-radius: 6px;
    z-index:9999;
    padding: 30px 0px;
    width: 520px;
    -webkit-box-shadow: -2px 2px 12px 18px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: -2px 2px 12px 18px rgba(34, 60, 80, 0.2);
    box-shadow: -2px 2px 12px 18px rgba(34, 60, 80, 0.2);
    top: 25%;
    left: 50%;
    transform: translate(-50%, -25%);
    &__title{
        padding: 0px 30px;
        font-weight: 600;
        font-size: 30px;
        line-height: 37px;
        letter-spacing: -0.35px;
        color: #F0F0FA;
        width: 100%;
        text-align: left;
    }
    &__close{
        position: absolute;
        top: 16px;
        right: 16px;
    }
    &__search{
        width: initial;
        display: flex;
        background-color: #1D1D35;
        height: 40px;
        align-items: center;
        padding:0px 10px;
         margin: 0px 30px;
        margin-top: 10px;
        &-img{
            width:15px;
            height:15px;
        }
        &-input{
            
            width:100%  ;
            height: 100%;
            background: transparent ;
            margin-left: 10px;
            color: #F0F0FA;
            &::placeholder{
                color:#40406B;
                font-weight: normal;
                font-size: 16px;
                line-height: 130%;
            }
        }
    }
    &__choise{
        padding-top: 26px;
        &-title{
            font-weight: normal;
            font-size: 14px;
            line-height: 140%;
            color: #CFCFE4;
            text-align: left;
            padding: 0px 30px 8px;
        }
        &-item{
            display:flex;
            justify-content: space-between;
            padding: 8px 30px;
            transition: .2s ease;
            &-flex{
                display: flex;
                flex-direction: column;
                text-align: left;
                &-name{
                    color: #CFCFE4;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 16px;
                    line-height: 21px;
                }
                &-count{
                    color: #CFCFE4;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 12px;
                    line-height: 16px;
                }
            }
         &:hover{
            background: var(--modal-element-hover-bg-color);
        }   
        } 
        &-item_active{
 background: var(--modal-element-hover-bg-color);
        }
    }
    &__create{
        text-transform: uppercase;
        text-align: left;
        padding: 35px 30px 58px;
        background: var(--green-color);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: 16px;
        line-height: 19px;
    }
    &__buttons{
        display:flex;
        justify-content: flex-start;
        padding: 0px 30px;
        .base-button_enter {
            color: #1D1D35;
            font-weight: 500;
            margin-right:26px;
        }
        .base-button{
            padding: 8px 32px;
        }
    }
}
</style>