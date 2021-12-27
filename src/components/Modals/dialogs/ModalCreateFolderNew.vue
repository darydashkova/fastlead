<template>
    <div class="modal-create-folder-new" @mousedown.self="close"
         :class="{'z-index': fromModals.fromCreateChatToCreateFolder}">
        <div class="modal-create-folder-new__body">
            <div class="modal-create-folder-new__header">
                <div class="modal-create-folder-new__header_title">
                    {{editingFolder.name? editingFolder.name : 'Новая папка'}}
                </div>
                <div class="modal-create-folder-new__header_close pointer" @click="closeCreateNewFolder">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.6278 0.372219C15.3894 0.133887 15.0661 0 14.729 0C14.3919 0 14.0686 0.133887 13.8302 0.372219L8 6.20239L2.16983 0.372219C1.93143 0.133887 1.60813 0 1.27103 0C0.933923 0 0.610622 0.133887 0.372219 0.372219C0.133887 0.610622 0 0.933923 0 1.27103C0 1.60813 0.133887 1.93143 0.372219 2.16983L6.20239 8L0.372219 13.8302C0.133887 14.0686 0 14.3919 0 14.729C0 15.0661 0.133887 15.3894 0.372219 15.6278C0.610622 15.8661 0.933923 16 1.27103 16C1.60813 16 1.93143 15.8661 2.16983 15.6278L8 9.79761L13.8302 15.6278C14.0686 15.8661 14.3919 16 14.729 16C15.0661 16 15.3894 15.8661 15.6278 15.6278C15.8661 15.3894 16 15.0661 16 14.729C16 14.3919 15.8661 14.0686 15.6278 13.8302L9.79761 8L15.6278 2.16983C15.8661 1.93143 16 1.60813 16 1.27103C16 0.933923 15.8661 0.610622 15.6278 0.372219Z" fill="#9797BB"/>
                    </svg>
                </div>
            </div>
            <div class="modal-create-folder-new__main">
                <div class="modal-create-folder-new__main_title" for-id="modal-create-folder-new__input" :class="{'base-modal-label_error': error}">Название папки</div>
                <input class="modal-create-folder-new__main_name" id="modal-create-folder-new__input" type="text" v-model="name" maxlength="19" placeholder="Ввести">
            </div>
            <div class="modal-create-folder-new__type-folder" v-if="!parentFolderId">
                <div class="modal-create-folder-new__type-folder_title">Класс папки</div>
                <div class="modal-create-folder-new__type-folder_select pointer" v-for="(nameTypeFolder, index) in nameTypeFolders" :key="index" @click="selectTypeFolder(nameTypeFolder.id)">
                    <svg :class="{'type-folder-active': nameTypeFolder.isActive}" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="17" height="17" rx="8.5" fill="none"/>
                            <rect x="5" y="5" width="8" height="8" rx="4" fill="#1D1D35"/>
                            <rect x="0.5" y="0.5" width="17" height="17" rx="8.5" stroke="#9797BB"/>
                        </svg>
                    {{nameTypeFolder.name}}
                </div>
            </div>
            <div class="modal-create-folder-new__select-parent" v-if="nameTypeFolders[1].isActive == true && !parentFolderId">
                <div class="modal-create-folder-new__select-parent_title">Основная папка</div>
                    <div class="modal-edit-select-folder__main-folder-info" v-if="foldersId != null && newArraySearchFolder != []">
                        <div class="modal-edit-select-folder__main-folder-info-title">{{newArraySearchFolder.name}}</div>
                        <div class="modal-edit-select-folder__main-folder-info-subtitle">{{newArraySearchFolder.dialogues_count}} чатов</div>
                    </div>
                <div class="modal-create-folder-new__select-parent_button pointer" @click="openParentFolder()">ВЫБРАТЬ ОСНОВНУЮ ПАПКУ</div>
                <div class="modal-create-folder-new__select-parent_subtitle">Выберите папку, в которую хотите поместить "Новую папку"</div>
            </div>
                <div class="modal-create-folder-new__buttons">
                    <div @click="createNewFolders()" class="modal-create-folder-new__buttons_enter pointer"> {{editingFolder.name? 'Сохранить' : 'Добавить'}} </div>
                    <div @click="closeCreateNewFolder" class="modal-create-folder-new__buttons_cancel pointer"> Отмена </div>
                </div>
        </div>
    </div>
    <ModalSelectParentFolder v-if="parentFolderSelect" @closeParentFolder="closeParentFolder" @searchSelectFolderId="searchSelectFolderId"></ModalSelectParentFolder>
</template>

<script>
    import { useFolder } from "@/composition/useFolder";
    import { ref, computed, onMounted, watch, onUpdated } from 'vue';
    import { useModals } from "@/composition/useModals";
    import { useDialogs } from "@/composition/useDialogs";

    import ModalSelectParentFolder from "@/components/Modals/dialogs/ModalSelectParentFolder.vue" // выбор родительской папки
    export default {
        components: {
            ModalSelectParentFolder,
        },
        props: {
            ids: Number,
        },
        setup(props, {emit}) {
            const { createFolder, getAllFolders, folders, selectFolder, updateFolder, foldersInSelectedFolder, createpdateFolder, foldersId } = useFolder();
            const {
                toggleModalCreateFolder,
                toggleModalAddToFolder,
                selectedFolderToEdit,
                selectedDialogsToFolder,
                setSelectedDialogs,
                fromModals,
                selectedDialogsInEdit,
                createFolderParentId,
                setSelectedDialogsInEdit,
                setCloseCallbackCreateFolder,
                onCloseCallbackCreateFolder

            } = useModals();

            const { getDialogs, dischargeDialog, moveDialog } = useDialogs();

            const name = ref('');

            const error = ref(false);

            const nameTypeFolders = ref([
                {id: 0, name: "Основная", isActive: true},
                {id: 1, name: "Дочерняя", isActive: false},
            ])

            const selectTypeFolder = (id) => {
                for(i=0; i < nameTypeFolders.value.length; i++){
                    nameTypeFolders.value[i].isActive = false
                }
                nameTypeFolders.value[id].isActive = true
            }

            const delDialog = (dialog) => {
                setSelectedDialogs(selectedDialogsToFolder.value.filter(i => i.dialog_id !== dialog.dialog_id))
            }

            const editingFolder = computed(() => {
                if (selectedFolderToEdit.value) {
                    let f = folders.value.find(i => i.folder_id === selectedFolderToEdit.value);
                    if (!f) {
                        f = foldersInSelectedFolder.value.find(i => i.folder_id === selectedFolderToEdit.value);
                    }
                    name.value = f.name;
                    getDialogs(selectedFolderToEdit.value)
                        .then(r => {
                            setSelectedDialogs(r.dialogues);
                            setSelectedDialogsInEdit(r.dialogues);
                        })
                    return f;
                } else return {};
            })

            const close = () => {
                fromModals.fromCreateChatToCreateFolder = false;

                toggleModalCreateFolder(false);
            }
            
            const parentFolderId = ref()

            const createNewFolders = () => {
                if(foldersId.value == null){
                    createFolder({name: name.value,
                            dialog_ids: dialogNewId.value,
                            /* parent_folder_id: parentFolderId.value */})
                } else {
                    createFolder({name: name.value,
                            dialog_ids: dialogNewId.value,
                            parent_folder_id: foldersId.value})
                }
                /* parentFolderId.value = null */
                foldersId.value = null
                emit('updateFolders')
                closeCreateNewFolder()
            }

            const dialogNewId = ref()

            const lCreateFolder = () => {
                error.value = false;
                const closeModalAfterFetch = (isParent) => {
                    if (isParent) {
                        onCloseCallbackCreateFolder();
                        setCloseCallbackCreateFolder(() => null);
                        toggleModalCreateFolder(false);
                        createFolderParentId.value = null;

                        return;
                    }
                    getAllFolders()
                        .then(r => {
                            let id = r.find(i => i.name === name.value).folder_id
                            selectFolder(id);
                            getDialogs(id);

                            fromModals.fromCreateChatToCreateFolder = false;

                            toggleModalCreateFolder(false);
                        })
                }
                if (!name.value) {
                    error.value = true;
                    return;
                }
                if (editingFolder.value.name) {
                    let toDischarge = selectedDialogsInEdit.value.filter(item => {
                        return selectedDialogsToFolder.value.find(i => i.dialog_id !== item.dialog_id);
                    })
                    let toMoveIn = selectedDialogsToFolder.value.filter(item => {
                        return selectedDialogsInEdit.value.find(i => i.dialog_id !== item.dialog_id);
                    })
                    const afterUpdateName = async () => {
                        toDischarge.length && await dischargeDialog({dialog_ids: toDischarge.map(i => i.dialog_id)})
                        toMoveIn.length && await moveDialog({dialog_ids: toMoveIn.map(i => i.dialog_id), folder_id: editingFolder.value.folder_id})
                        closeModalAfterFetch();
                    }
                    (editingFolder.value.name !== name.value)
                        && updateFolder({name: name.value, folder_id: editingFolder.value.folder_id})
                    afterUpdateName();
                } else {
                    let obj = {
                        name: name.value,
                        dialog_ids: selectedDialogsToFolder.value.map(i => i.dialog_id),
                    }
                    if (createFolderParentId.value) {
                        obj.parent_folder_id = createFolderParentId.value;
                    }
                    dialogNewId.value = obj.dialog_ids
                    foldersId.value = props.ids

                    /* createFolder(obj)
                        .then(r => {
                        if (r.error) {
                            error.value = true;
                            return;
                        }
                        createpdateFolder.value = true;
                        closeModalAfterFetch(createFolderParentId.value);
                    }) */
                }
            }

            const updateParentFolderId = () => {
                parentFolderId.value = props.ids
                foldersId.value = props.ids
            }

            const newArraySearchFolder = ref([])

            const searchSelectFolderId = () => {
                for(i = 0; i < folders.value.length; i++){
                    if(folders.value[i].folder_id == foldersId.value){
                        newArraySearchFolder.value = folders.value[i]
                    }
                }
            }

            watch(() => {
                updateParentFolderId()
            })

            const closeCreateNewFolder = () => {
                parentFolderId.value = null
                foldersId.value = null
                emit('closeCreateNewFolder')
            }

            const parentFolderSelect = ref(false)

            const openParentFolder = () => {
                parentFolderSelect.value = true
            }

            const closeParentFolder = () => {
                parentFolderSelect.value = false
            }

            return {
                parentFolderSelect,
                openParentFolder,
                closeParentFolder,

                parentFolderId,

                name,
                error,
                lCreateFolder,
                toggleModalCreateFolder,
                toggleModalAddToFolder,

                editingFolder,
                selectedDialogs: computed(() => selectedDialogs.data),
                selectedDialogsToFolder,

                delDialog,
                close,
                fromModals,
                createpdateFolder,

                nameTypeFolders,
                selectTypeFolder,

                createNewFolders,
                dialogNewId,
                foldersId,

                closeCreateNewFolder,
                ids: computed(() => props.ids),
                updateParentFolderId,

                newArraySearchFolder,
                searchSelectFolderId,
            }
        }
    }
</script>

<style lang="scss">
    .modal-create-folder-new {
        width: 100%;
        height: 100%;
          z-index:1100;
        background: rgba(0, 0, 0, 0.34);
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: left;
        &.z-index {
            z-index: 1400;
        }
        &__select-parent{
            border-top: 1px solid #1D1D35;
        }
        &__body{
            width: 520px;
            border-radius: 9px;
            display: flex;
            flex-direction: column;
            background: #252544;
            color: #F0F0FA;
            font-size: 24px;
            font-weight: 700;
        }
        &__header{
            display: flex;
            justify-content: space-between;
            padding: 27px 24px;
            border-bottom: 1px solid #1D1D35;
        }
        &__main{
            padding: 23px 24px 0px;
            &_title{
                font-size: 14px;
                font-weight: 400;
                color: #CFCFE4;
            }
            &_name{
                width: 100%;
                margin-top: 6px;
                margin-bottom: 12px;
                background: #1D1D35;
                color: #CFCFE4;
                font-size: 16px;
                padding: 12px 10px;
                border-radius: 4px;
                &::placeholder{
                    color: #40406B;
                }
            }
        }
        &__type-folder{
            padding: 18px 24px 16px;
            &_title{
                font-size: 14px;
                font-weight: 400;
                color: #CFCFE4;
            }
            &_select{
                display: flex;
                margin-top: 10px;

                font-size: 16px;
                font-weight: 400;
                color: #CFCFE4;
                align-items: center;
                background: #1D1D35;
                border-radius: 4px 4px 0px 0px;
                padding: 15px 11px;
                &:hover{
                    background: #40406B;
                    transition: all 0.3s;
                    & svg{
                        & rect:nth-child(2){
                            fill: #CFCFE4;
                            transition: all 0.3s;
                        }
                        & rect:nth-child(3){
                            stroke: #CFCFE4;
                            transition: all 0.3s;
                        }
                    }
                }
                &:last-child{
                    margin-top: 0px;
                    border-radius: 0px 0px 4px 4px;
                }
                & svg{
                    margin-right: 17px; 
                }
            }
        }
        &__select-parent{
            padding: 20px 24px;
            &_title{
                font-size: 14px;
                font-weight: 400;
                color: #CFCFE4;
            }
            &_button{
                color: #5EC075;
                font-size: 16px;
                font-weight: 400;
                margin-top: 26px;
            }
            &_subtitle{
                font-size: 14px;
                font-weight: 400;
                color: #9797BB;
                margin-top: 20px;
                width: 300px;
            }
        }
        &__buttons{
            padding: 19px 24px 20px;
            display: flex;
            border-top: 1px solid #1D1D35;
            &_enter{
                background: linear-gradient(45.66deg, #22A595 -40.44%, #84D160 120.07%);
                color: #252544;
                border-radius: 4px;
                font-size: 16px;
                padding: 8px 26px;
                font-weight: 400;
            }
            &_cancel{
                background: none;
                color: #5EC075;
                border: 1px solid #5EC075;
                border-radius: 4px;
                font-size: 16px;
                padding: 8px 26px;
                font-weight: 400;
                margin-left: 22px;
            }
        }
    }
    .type-folder-active{
        & rect:nth-child(2){
            fill: #5EC075;
            transition: all 0.3s;
        }
        & rect:nth-child(3){
            stroke: #5EC075;
            transition: all 0.3s;
        }
    }
</style>