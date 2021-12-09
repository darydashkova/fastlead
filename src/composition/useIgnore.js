import {reactive, computed} from 'vue';
import ignoreActions from "../api/ignoreActions";



export function useIgnore() {
    const getAllIgnoreNumbers = async () => {
        return await ignoreActions.getAllIgnoreNumbers();
    }
    const addIgnoreNumber = async (data) => {
        return await ignoreActions.addIgnoreNumber(data);
    }
    const getOneNumber = async (phone) => {
        return await ignoreActions.getOneNumber(phone);
    }
    const deleteIgnoreNumber = async (data) => {
        return await ignoreActions.deleteIgnoreNumber(data);
    }
    const updateIgnoreNumber = async (data) => {
        return await ignoreActions.updateIgnoreNumber(data);
    }
    return{
        getAllIgnoreNumbers,
        addIgnoreNumber,
        getOneNumber,
        deleteIgnoreNumber,
        updateIgnoreNumber
    }
}