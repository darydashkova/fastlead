<template>
    <div class="modal-edit-select-folder"  @click="closeModalEditSelectChildBlock">
        <div class="modal-edit-select-folder__body">
            <div class="modal-edit-select-folder__header">
                <div class="modal-edit-select-folder__header_title">Редактировать папку</div>
                <div class="modal-edit-select-folder__header_close pointer" @click="closeModalEditSelectChild">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.6278 0.372219C15.3894 0.133887 15.0661 0 14.729 0C14.3919 0 14.0686 0.133887 13.8302 0.372219L8 6.20239L2.16983 0.372219C1.93143 0.133887 1.60813 0 1.27103 0C0.933923 0 0.610622 0.133887 0.372219 0.372219C0.133887 0.610622 0 0.933923 0 1.27103C0 1.60813 0.133887 1.93143 0.372219 2.16983L6.20239 8L0.372219 13.8302C0.133887 14.0686 0 14.3919 0 14.729C0 15.0661 0.133887 15.3894 0.372219 15.6278C0.610622 15.8661 0.933923 16 1.27103 16C1.60813 16 1.93143 15.8661 2.16983 15.6278L8 9.79761L13.8302 15.6278C14.0686 15.8661 14.3919 16 14.729 16C15.0661 16 15.3894 15.8661 15.6278 15.6278C15.8661 15.3894 16 15.0661 16 14.729C16 14.3919 15.8661 14.0686 15.6278 13.8302L9.79761 8L15.6278 2.16983C15.8661 1.93143 16 1.60813 16 1.27103C16 0.933923 15.8661 0.610622 15.6278 0.372219Z" fill="#9797BB"/>
                    </svg>
                </div>
            </div>
            <div class="modal-edit-select-folder__parent-folder">
                <div class="modal-edit-select-folder__parent-folder_title">Название папки</div>
                <input v-model="newChildName" class="modal-edit-select-folder__parent-folder_name-folder">
            </div>
            <div class="modal-edit-select-folder__main-folder">
                <div class="modal-edit-select-folder__main-folder_title">Основная папка</div>
                <div class="modal-edit-select-folder__main-folder-info">
                    <div class="modal-edit-select-folder__main-folder-info-title">{{newArrayFolders.name}}</div>
                    <div class="modal-edit-select-folder__main-folder-info-subtitle">{{newArrayFolders.unread}} чатов</div>
                </div>
            </div>
            <div class="modal-edit-select-folder__buttons">
                <div class="modal-edit-select-folder__buttons_save pointer" @click="save">Сохранить</div>
                <div class="modal-edit-select-folder__buttons_cancel pointer" @click="closeModalEditSelectChild">Отмена</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {ref, watch, computed, reactive, onMounted} from 'vue'
    import {useFolder} from "@/composition/useFolder";

    import {useModals} from "@/composition/useModals";

    import {useModalConfirmDelete} from "@/composition/useModalConfirmDelete";

    import ModalCreateFolderNew from "@/components/Modals/dialogs/ModalCreateFolderNew.vue" 
    export default {
        props: {
            id: Number,
            child: Number,
        },
        setup(props, {emit}){
            const { folders, deleteFolder, getAllFolders, selectedParentFolder, foldersInSelectedFolder, getAllFoldersInFolder, selectParentFolder, updateFolder} = useFolder();
            const { toggleModalEditFolders, toggleModalCreateFolder, setCloseCallbackCreateFolder, createFolderParentId } = useModals();
            const { toggleModalConfirmDelete, openedModalConfirmDelete, setSaveCallbackModalConfirmDelete, setTextModalConfirmDelete } = useModalConfirmDelete()

            const newArrayFolders = ref([])

            const newChildName = ref()

            const childId = ref()

            const updateNewName = () => {
                for(i = 0; i < newArrayFolders.value.folders.length; i++){
                    if(newArrayFolders.value.folders[i].folder_id == props.child){
                        newChildName.value = newArrayFolders.value.folders[i].name
                    }
                }
            }

            const updateNewArrayFolders = () => {
                for(i=0; i < folders.value.length; i++){
                    if(folders.value[i].folder_id == props.id){
                        newArrayFolders.value = folders.value[i]
                    }
                }
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

            const closeModalEditSelectChild = (e) => {
                emit('closeModalEditSelectChild')
            }
              const closeModalEditSelectChildBlock = (e) => {
                if(e.target.className=='modal-edit-select-folder'){
                    emit('closeModalEditSelectChild')
                }
               
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

            getAllFolders()

            const updateFolderName = () => {
                updateFolder({
                    name: newChildName.value,
                    folder_id: props.child
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

                closeModalEditSelectChild,

                deletingIds: computed(() => deletingIds.data),
                addToDel,
                removeFromDel,
                save,

                saveCallback,
                openedModalConfirmDelete,

                updateNewName,
                childId,
                newChildName,
                updateFolderName,
                closeModalEditSelectChildBlock
            }
        }
    }
</script>

<style lang="scss">
    .modal-edit-select-folder{
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.34);
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        z-index:1100;
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
                font-size:16px;
                color: #CFCFE4;
                padding: 12px 12px;
                border-radius: 4px;
                width: 100%
            }
        }
        &__main-folder{
            padding: 20px 24px 26px;
            border-top: 1px solid #1D1D35;
            &_title{
                color: #CFCFE4;
            font-size: 14px;
            font-weight: 400;
            }
                &-info{
                    background: #1D1D35;
                    width: 100%;
                    border-radius: 6px;
                    padding: 12px 12px;
                    margin-top: 8px;
                    &-title{
                        color: #CFCFE4;
                        font-size: 16px;
                        font-weight: 400;
                    }
                    &-subtitle{
                        color: #9797BB;
                        font-size: 12px;
                        font-weight: 400;
                        margin-top: 6px;
                }
            }
        }
        &__main-folder-info{
            
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
            padding: 12px 0px ;
            border-bottom: 1px solid #252544;
            width: calc(100% - 23px - 12px) ;
            margin: 0 23px 0 12px;
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