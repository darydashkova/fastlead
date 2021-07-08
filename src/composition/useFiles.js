import filesActions from "../api/filesActions";

export function useFiles() {
    const createFile = async (file) => {
        return await filesActions.addFile(file)
    }

    return {
        createFile,
    }
}