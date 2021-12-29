import { reactive, computed, ref } from 'vue'
import folderActions from "../api/folderActions";
import {useDialogs} from "./useDialogs";

const selectedFolder = ref(null);
const folders = reactive({
    data: [],
})

const createpdateFolder = ref(false); 

const selectedParentFolder = ref(null);
const foldersInSelectedFolder = reactive({
    data: [],
})

const offsetFolderDialogsPosition = ref(0);

const foldersId = ref(null)

export function useFolder() {
    const selectFolder = (id) => {
        setOffsetFolderDialogsPosition(0)
        selectedFolder.value = id;
        localStorage.setItem('folder_id', id);
    }

    const setOffsetFolderDialogsPosition = (offset) => {
        offsetFolderDialogsPosition.value = offset;
    }
    const getAllFoldersInFolder = async (id, isNeedGlobal) => {
        return await folderActions.getAllFoldersInFolder(id)
            .then(r => {
                if (r.error) {
                    foldersInSelectedFolder.data = [];
                    return;
                }

                if (r.folders.length && isNeedGlobal) {
                    foldersInSelectedFolder.data = [...r.folders];
                    selectParentFolder(id);
                }
                return r.folders
            })
    }
    const selectParentFolder = (id) => {
        selectedParentFolder.value = id;
        if (!id) {
            selectFolder(id);
        }
    }
    const getAllFolders = async () => {
        return await folderActions.getAllFolders()
            .then(r => {
                if (r.error) {
                    folders.data = []
                    return [];
                }

                folders.data = [...r.folders]
                return r.folders
            })
    }
    const createFolder = async (data) => {
        return await folderActions.createFolder(data)
    }
    const deleteFolder = async (ids) => {
        await folderActions.deleteFolder(ids)
    }

    const updateFolder = async (data) => {
        await folderActions.updateFolder(data);
    }


    return {
        folders: computed(() => folders.data),
        foldersInSelectedFolder: computed(() => foldersInSelectedFolder.data),

        getAllFolders,
        createFolder,
        deleteFolder,
        selectedFolder,
        selectedParentFolder,
        selectFolder,
        offsetFolderDialogsPosition,
        setOffsetFolderDialogsPosition,

        updateFolder,

        selectParentFolder,
        createpdateFolder,
        getAllFoldersInFolder,
        foldersId,

    }
}