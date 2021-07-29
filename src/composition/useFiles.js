import filesActions from "../api/filesActions";
import fileBaseActions from "../api/fileBaseActions";

export function useFiles() {
    const createFile = async (file) => {
        return await filesActions.addFile(file)
    }

    const uploadBaseFromFile = async (data) => {
        return await fileBaseActions.uploadBaseFromFile(data);
    }

    return {
        createFile,
        uploadBaseFromFile,
    }
}