import {ref} from "vue";

const openedModalConfirmDelete = ref(false);
let onSaveCallbackModalConfirmDelete = () => null;
const textCallbackModalConfirmDelete = ref('');


export function useModalConfirmDelete() {

    const toggleModalConfirmDelete = (value) => {
        openedModalConfirmDelete.value = value;
    }
    const setSaveCallbackModalConfirmDelete = (callback) => {
        onSaveCallbackModalConfirmDelete = callback;
    }
    const setTextModalConfirmDelete = (text) => {
        textCallbackModalConfirmDelete.value = text;
    }
    return {
        toggleModalConfirmDelete,
        openedModalConfirmDelete,

        onSaveCallbackModalConfirmDelete,
        setSaveCallbackModalConfirmDelete,
        textCallbackModalConfirmDelete,
        setTextModalConfirmDelete,
    }
}