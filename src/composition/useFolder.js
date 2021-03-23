import { reactive, computed, ref } from 'vue'
import folderActions from "../api/folderActions";

const selectedFolder = ref(null);
const folders = reactive({
    data: [],
})
const offsetFolderDialogsPosition = ref(0);

export function useFolder() {
    const selectFolder = (id) => {
        setOffsetFolderDialogsPosition(0)
        selectedFolder.value = id;
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

    return {
        folders: computed(() => folders.data),
        getAllFolders,
        selectedFolder: computed(() => selectedFolder.value),
        selectFolder,
        offsetFolderDialogsPosition,
        setOffsetFolderDialogsPosition,
    }
}