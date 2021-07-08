import {ref} from "vue";

const openedModalChoiceFolder = ref(false);
const selectedFolders = ref([]);
let onSaveCallbackModalChoiceFolder = () => null;


export function useModalChoiceFolder() {
    const toggleModalChoiceFolder = (value) => {
        openedModalChoiceFolder.value = value;
    }
    const setSaveCallbackModalChoiceFolder = (callback) => {
        onSaveCallbackModalChoiceFolder = callback;
    }
    return {
        toggleModalChoiceFolder,
        openedModalChoiceFolder,
        selectedFolders,

        onSaveCallbackModalChoiceFolder,
        setSaveCallbackModalChoiceFolder,
    }
}