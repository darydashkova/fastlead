import { ref, reactive, computed } from 'vue';

const openedModalCreateFolder = ref(false);
const openedModalCreateChat = ref(false);
const openedModalAddToFolder = ref(false);
const openedModalEditFolders = ref(true);
const openedModalMoveChat = ref(false);

const selectedFolderToEdit = ref(null);
const selectedDialogsToFolder = reactive({data: []})

export function useModals() {
    const toggleModalCreateFolder = (value, folder) => {
        openedModalCreateFolder.value = value;
        if (value) {
            selectedFolderToEdit.value = folder;
            selectedDialogsToFolder.data = [];
        }
    }
    const toggleModalCreateChat = (value) => {
        openedModalCreateChat.value = value;
    }
    const toggleModalAddToFolder = (value) => {
        openedModalAddToFolder.value = value;
    }
    const toggleModalEditFolders = (value) => {
        openedModalEditFolders.value = value;
    }
    const toggleModalMoveChat = (value) => {
        openedModalMoveChat.value = value;
    }

    const setSelectedDialogs = (dialogs) => {
        selectedDialogsToFolder.data = [...dialogs];
    }

    return {
        toggleModalCreateFolder,
        openedModalCreateFolder,

        toggleModalCreateChat,
        openedModalCreateChat,

        toggleModalAddToFolder,
        openedModalAddToFolder,

        toggleModalEditFolders,
        openedModalEditFolders,

        toggleModalMoveChat,
        openedModalMoveChat,

        selectedFolderToEdit,
        selectedDialogsToFolder: computed(() => selectedDialogsToFolder.data),
        setSelectedDialogs,

    }
}