import {reactive, computed} from 'vue';
import filesActions from "../api/filesActions";
import fileBaseActions from "../api/fileBaseActions";

const filesToSend = reactive({
    data: [],
});

export function useFiles() {
    const createFile = async (file) => {
        return await filesActions.addFile(file)
    }
    const uploadBaseFromFile = async (data) => {
        return await fileBaseActions.uploadBaseFromFile(data);
    }
    const deleteFile  = (id) => {
        filesToSend.data = filesToSend.data.filter(item => item.id !== id);
    }
    const addFiles = (file) => {
        filesToSend.data.push(file);
    }
    const replaceFile  = (array) => {
        filesToSend.data = [...array]
    }

    return {
        filesToSend: computed(() => filesToSend.data),
        createFile,
        uploadBaseFromFile,
        deleteFile,
        addFiles,
        replaceFile,
        
    }
}