<template>
    <div class="modal-edit-select-folder" @click="closeModalEditSelectBlock" >
        <div class="modal-edit-select-folder__body">
            <div class="modal-edit-select-folder__header">
                <div class="modal-edit-select-folder__header_title">Редактировать папку</div>
                <div class="modal-edit-select-folder__header_close pointer" @click="closeModalEditSelect">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.6278 0.372219C15.3894 0.133887 15.0661 0 14.729 0C14.3919 0 14.0686 0.133887 13.8302 0.372219L8 6.20239L2.16983 0.372219C1.93143 0.133887 1.60813 0 1.27103 0C0.933923 0 0.610622 0.133887 0.372219 0.372219C0.133887 0.610622 0 0.933923 0 1.27103C0 1.60813 0.133887 1.93143 0.372219 2.16983L6.20239 8L0.372219 13.8302C0.133887 14.0686 0 14.3919 0 14.729C0 15.0661 0.133887 15.3894 0.372219 15.6278C0.610622 15.8661 0.933923 16 1.27103 16C1.60813 16 1.93143 15.8661 2.16983 15.6278L8 9.79761L13.8302 15.6278C14.0686 15.8661 14.3919 16 14.729 16C15.0661 16 15.3894 15.8661 15.6278 15.6278C15.8661 15.3894 16 15.0661 16 14.729C16 14.3919 15.8661 14.0686 15.6278 13.8302L9.79761 8L15.6278 2.16983C15.8661 1.93143 16 1.60813 16 1.27103C16 0.933923 15.8661 0.610622 15.6278 0.372219Z" fill="#9797BB"/>
                    </svg>
                </div>
            </div>
            <div class="modal-edit-select-folder__parent-folder">
                <div class="modal-edit-select-folder__parent-folder_title">Название папки</div>
                <input v-model="newName" class="modal-edit-select-folder__parent-folder_name-folder">
            </div>
            <div class="modal-edit-select-folder__child-folder">
                <div class="modal-edit-select-folder__child-folder_title">Дочерние папки</div>
                <div class="modal-edit-select-folder__child-folder-list">
                    <div class="modal-edit-select-folder__child-element" v-for="(childFolder, index) in newArrayFolders.folders" :key="index">
                        <div class="modal-edit-select-folder__child-element-info">
                            <div class="modal-edit-select-folder__child-element-info_name-folder">{{childFolder.name}}</div>
                            <div class="modal-edit-select-folder__child-element-info_dialogs">{{childFolder.unread}} чатов</div>
                        </div>
                        <div v-if="deletingIds.find(i => i === childFolder.folder_id)" @click.stop="removeFromDel(childFolder.folder_id)" class="modal-edit-select-folder__child-element-info_cancel pointer">
                            Отмена
                        </div>
                        <svg v-else @click.stop="addToDel(childFolder.folder_id)" class="pointer" width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.4167 3.66667H14.575C14.3622 2.63213 13.7993 1.70257 12.9812 1.03466C12.163 0.366749 11.1395 0.00133331 10.0833 0L8.25 0C7.19381 0.00133331 6.17038 0.366749 5.35219 1.03466C4.534 1.70257 3.97109 2.63213 3.75833 3.66667H0.916667C0.673552 3.66667 0.440394 3.76324 0.268485 3.93515C0.0965771 4.10706 0 4.34022 0 4.58333C0 4.82645 0.0965771 5.05961 0.268485 5.23151C0.440394 5.40342 0.673552 5.5 0.916667 5.5H1.83333V17.4167C1.83479 18.6318 2.31814 19.7967 3.17737 20.656C4.0366 21.5152 5.20154 21.9985 6.41667 22H11.9167C13.1318 21.9985 14.2967 21.5152 15.156 20.656C16.0152 19.7967 16.4986 18.6318 16.5 17.4167V5.5H17.4167C17.6598 5.5 17.8929 5.40342 18.0649 5.23151C18.2368 5.05961 18.3333 4.82645 18.3333 4.58333C18.3333 4.34022 18.2368 4.10706 18.0649 3.93515C17.8929 3.76324 17.6598 3.66667 17.4167 3.66667ZM8.25 1.83333H10.0833C10.6519 1.83403 11.2064 2.01059 11.6706 2.33882C12.1349 2.66705 12.4863 3.13087 12.6766 3.66667H5.65675C5.84704 3.13087 6.19841 2.66705 6.66269 2.33882C7.12697 2.01059 7.68142 1.83403 8.25 1.83333ZM14.6667 17.4167C14.6667 18.146 14.3769 18.8455 13.8612 19.3612C13.3455 19.8769 12.646 20.1667 11.9167 20.1667H6.41667C5.68732 20.1667 4.98785 19.8769 4.47212 19.3612C3.9564 18.8455 3.66667 18.146 3.66667 17.4167V5.5H14.6667V17.4167Z" fill="#EB5757"/>
                            <path d="M7.33329 16.4998C7.57641 16.4998 7.80956 16.4032 7.98147 16.2313C8.15338 16.0594 8.24996 15.8263 8.24996 15.5832V10.0832C8.24996 9.84005 8.15338 9.6069 7.98147 9.43499C7.80956 9.26308 7.57641 9.1665 7.33329 9.1665C7.09018 9.1665 6.85702 9.26308 6.68511 9.43499C6.5132 9.6069 6.41663 9.84005 6.41663 10.0832V15.5832C6.41663 15.8263 6.5132 16.0594 6.68511 16.2313C6.85702 16.4032 7.09018 16.4998 7.33329 16.4998Z" fill="#EB5757"/>
                            <path d="M10.9999 16.4998C11.243 16.4998 11.4762 16.4032 11.6481 16.2313C11.82 16.0594 11.9166 15.8263 11.9166 15.5832V10.0832C11.9166 9.84005 11.82 9.6069 11.6481 9.43499C11.4762 9.26308 11.243 9.1665 10.9999 9.1665C10.7568 9.1665 10.5236 9.26308 10.3517 9.43499C10.1798 9.6069 10.0833 9.84005 10.0833 10.0832V15.5832C10.0833 15.8263 10.1798 16.0594 10.3517 16.2313C10.5236 16.4032 10.7568 16.4998 10.9999 16.4998Z" fill="#EB5757"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="modal-edit-select-folder__create-folder">
                <div class="modal-edit-select-folder__create-folder_title pointer" @click="openCreateNewFolder()">ДОБАВИТЬ ПАПКУ</div>
                <div class="modal-edit-select-folder__create-folder_subtitle">Создайте папку, которую хотите поместить в "Новую папку"</div>
            </div>
            <div class="modal-edit-select-folder__buttons">
                <div class="modal-edit-select-folder__buttons_save pointer" @click="save">Сохранить</div>
                <div class="modal-edit-select-folder__buttons_cancel pointer" @click="closeModalEditSelect">Отмена</div>
            </div>
        </div>
    </div>
    <ModalCreateFolderNew v-if="toggleModalCreateNewFolder" :ids="newArrayFolders.folder_id" @closeCreateNewFolder="closeCreateNewFolder()" @updateFolders="updateChildFolders"></ModalCreateFolderNew>
</template>

<script>
    import {ref, watch, computed, reactive, onMounted} from 'vue'
    import {useFolder} from "@/composition/useFolder";

    import {useModals} from "@/composition/useModals";

    import {useModalConfirmDelete} from "@/composition/useModalConfirmDelete";

    import ModalCreateFolderNew from "@/components/Modals/dialogs/ModalCreateFolderNew.vue" 
    export default {
        components: {
            ModalCreateFolderNew,
        },
        props: {
            id: Number,
            child: Number,
        },
        setup(props, {emit}){
            const { folders, deleteFolder, getAllFolders, selectedParentFolder, foldersInSelectedFolder, getAllFoldersInFolder, selectParentFolder, updateFolder} = useFolder();
            const { toggleModalEditFolders, toggleModalCreateFolder, setCloseCallbackCreateFolder, createFolderParentId } = useModals();
            const { toggleModalConfirmDelete, openedModalConfirmDelete, setSaveCallbackModalConfirmDelete, setTextModalConfirmDelete } = useModalConfirmDelete()

            const newArrayFolders = ref([])

            const toggleModalCreateNewFolder = ref(false)

            const newName = ref()

            const updateNewName = () => {
                newName.value = newArrayFolders.value.name
            }

            const childId = ref()

            const closeCreateNewFolder = () => {
                toggleModalCreateNewFolder.value = false
            }

            const openCreateNewFolder = () => {
                toggleModalCreateNewFolder.value = true
            }

            const updateNewArrayFolders = () => {
                for(i=0; i < folders.value.length; i++){
                    if(folders.value[i].folder_id == props.id){
                        newArrayFolders.value = folders.value[i]
                    }
                }
            }
               const closeModalEditSelectBlock = (e) => {
                if(e.target.className=='modal-edit-select-folder'){
                    emit('closeModalEditSelect')
                }
               
            }
            const updateChildFolders = () => {
                getAllFolders()
                .then((r)=> {
                    updateNewArrayFolders()
                })
            }

            const save = () => {
                if (deletingIds.data.length) {
                    setSaveCallbackModalConfirmDelete(saveCallback);
                    setTextModalConfirmDelete(`Вы точно хотите удалить ${deletingIds.data.length} папок?`)
                    toggleModalConfirmDelete(true);
                } else {
                    toggleModalEditFolders(false);
                }
                updateFolderName()
                
                
            }

            const closeModalEditSelect = () => {
                emit('closeModalEditSelect')
            }

            const deletingIds = reactive({
                data: [],
            })

            const addToDel = (id) => {
                if (!deletingIds.data.find(i => i === id)) {
                    deletingIds.data.push(id);
                }
            }

            const removeFromDel = (id) => {
                deletingIds.data = deletingIds.data.filter(i => i !== id);
            }

            const saveCallback = () => {
                deleteFolder(deletingIds.data)
                    .then(() => {
                        toggleModalEditFolders(false);
                        if (selectedParentFolder.value) {
                            getAllFoldersInFolder(selectedParentFolder.value, true);
                        } else {
                            getAllFolders();
                        }
                    })
            }


            const updateFolderName = () => {
                updateFolder({
                    name: newName.value,
                    folder_id: props.id
                })
                .then((r)=>{
                   emit('updateFolderDialog') 
                })
            }

            watch(() => {
                updateNewArrayFolders() 
                updateNewName()
                
                childId.value = props.child   
            })
            return {
                folders,
                id: computed(() => props.id),
                child: computed(() => props.child),

                newArrayFolders,
                updateNewArrayFolders,

                closeModalEditSelect,

                deletingIds: computed(() => deletingIds.data),
                addToDel,
                removeFromDel,

                save,
                saveCallback,
                openedModalConfirmDelete,

                toggleModalCreateNewFolder,
                closeCreateNewFolder,
                openCreateNewFolder,

                newName,
                updateNewName,
                childId,
                updateFolderName,

                updateChildFolders,
                closeModalEditSelectBlock
            }
        }
    }
</script>

<style lang="scss">
    .modal-edit-select-folder{
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.34);
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: left;
        &__body{
            width: 520px;
            background: #252544;
            border-radius: 6px;
        }
        &__header{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 27px 24px;
            border-bottom: 1px solid #1D1D35;
            &_title{
                font-size: 24px;
                color: #F0F0FA;
                font-weight: 700;
            }
            &_close{

            }
        }
        &__parent-folder{
            padding: 22px 24px 0px;
            &_title{
                color: #CFCFE4;
                font-size: 14px;
                font-weight: 400;
            }
            &_name-folder{
                margin-top: 8px;
                margin-bottom: 12px;
                background: #1D1D35;
                color: #CFCFE4;
                padding: 12px 12px;
                border-radius: 4px;
                width: 100%
            }
        }
        &__child-folder{
            padding: 20px 24px 0px;
            &_title{
                color: #CFCFE4;
                font-size: 14px;
                font-weight: 400;
            }
        }
        &__child-folder-list{
            margin-top: 8px;
            background: #1D1D35;
            border-radius: 4px;
            height: 207px;
            overflow: auto;
        }
        &__child-element{
            display: flex;
            justify-content: space-between;
            padding: 12px 12px;
            border-bottom: 1px solid #252544;
            width: 96%;
            margin: 0 auto;
            align-items: center;
        }
        &__child-element-info{
            &_name-folder{
                color: #CFCFE4;
                font-size: 16px;
                font-weight: 400;
            }
            &_dialogs{
                color: #9797BB;
                font-size: 12px;
                font-weight: 400;
                margin-top: 6px;
            }
            &_cancel{
                padding: 6px 7px;
                background: var(--button-cancel-color);
                border-radius: 5px;
                color: #5EC075;
            }
        }
        &__delete-folder{
            padding-top: 6px;
        }
        &__create-folder{
            padding: 25px 24px 26px;
            &_title{
                color: #5EC075;
                font-size: 16px;
                font-weight: 400;
            }
            &_subtitle{
                margin-top: 20px;
                color: #9797BB;
                font-size: 14px;
                font-weight: 400;
                width: 300px;
            }
        }
        &__buttons{
            padding: 18px 24px 20px;
            border-top: 1px solid #1D1D35;
            display: flex;
            align-items: center;
            &_save{
                padding: 8px 26px;
                font-size: 16px;
                font-weight: 500;
                border-radius: 6px;
                color: #252544;
                background: linear-gradient(45.66deg, #22A595 -40.44%, #84D160 120.07%);
            }
            &_cancel{
                padding: 7px 26px;
                font-size: 16px;
                font-weight: 500;
                border-radius: 6px;
                color: #5EC075;
                border: 1px solid #5EC075;
                margin-left: 20px;
            }
        }
    }
</style>