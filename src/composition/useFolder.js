import { reactive, computed, ref } from 'vue'
import folderActions from "../api/folderActions";
import {useDialogs} from "./useDialogs";

const selectedFolder = ref(null);
const folders = reactive({
    data: [],
})
const offsetFolderDialogsPosition = ref(0);

export function useFolder() {
    const selectFolder = (id) => {
        setOffsetFolderDialogsPosition(0)
        selectedFolder.value = id;
        localStorage.setItem('folder_id', id);
    }

    const setOffsetFolderDialogsPosition = (offset) => {
        offsetFolderDialogsPosition.value = offset;
    }
    const getAllFolders = () => {
        folderActions.getAllFolders()
            .then(r => {
                folders.data = [...r.folders]
            })
    }
    const createFolder = async (data) => {
        return await folderActions.createFolder(data)
    }
    const deleteFolder = async (id) => {
        await folderActions.deleteFolder(id)
    }


    return {
        folders: computed(() => folders.data),
        getAllFolders,
        createFolder,
        deleteFolder,
        selectedFolder: computed(() => selectedFolder.value),
        selectFolder,
        offsetFolderDialogsPosition,
        setOffsetFolderDialogsPosition,

    }
}