import { ref, reactive, computed } from 'vue';

const openedModalCreateFolder = ref(false);
const openedModalCreateChat = ref(false);
const openedModalAddToFolder = ref(false);
const openedModalEditFolders = ref(false);
const openedModalMoveChat = ref(false);

const openedModalChangeAva = ref(false);
const openedModalNewMessage = ref(false);


const selectedFolderToEdit = ref(null);
const selectedDialogsToFolder = reactive({data: []});

const fromModals = reactive({
    fromAddToFolderToCreateChat: false,
    fromCreateChatToCreateFolder: false,
})

let onCloseCallbackCreateFolder = () => null;
const setCloseCallbackCreateFolder = (cb) => {
    onCloseCallbackCreateFolder = cb;
}

let onCloseCallbackCreateChat = () => null;
const setCloseCallbackCreateChat = (cb) => {
    onCloseCallbackCreateChat = cb;
}

let onCloseCallbackMoveModal = () => null;
const setCloseCallbackMoveModal = (cb) => {
    onCloseCallbackMoveModal = cb;
}

let onCloseCallbackNewMessage = () => null;
const setCloseCallbackNewMessage = (cb) => {
    onCloseCallbackNewMessage = cb;
}

const selectedDialogsToMove = reactive({
    data: [],
});
const createFolderParentId = ref(null);

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
    const toggleModalChangeAva = (value) => {
        openedModalChangeAva.value = value;
    }
    const toggleModalNewMessage = (value) => {
        openedModalNewMessage.value = value;
    }


    const setSelectedDialogs = (dialogs) => {
        selectedDialogsToFolder.data = [...dialogs];
    }

    const selectedDialogsInEdit = reactive({
        data: [],
    })
    const setSelectedDialogsInEdit = (data) => {
        selectedDialogsInEdit.data = [...data];
    }

    const setSelectedDialogsToMove = (data) => {
        selectedDialogsToMove.data = [...data];
    }

    return {
        toggleModalCreateFolder,
        openedModalCreateFolder,
        createFolderParentId,

        toggleModalCreateChat,
        openedModalCreateChat,
        onCloseCallbackCreateChat,
        setCloseCallbackCreateChat,

        toggleModalAddToFolder,
        openedModalAddToFolder,

        toggleModalEditFolders,
        openedModalEditFolders,

        toggleModalMoveChat,
        openedModalMoveChat,

        toggleModalChangeAva,
        openedModalChangeAva,

        toggleModalNewMessage,
        openedModalNewMessage,


        selectedFolderToEdit,
        selectedDialogsToFolder: computed(() => selectedDialogsToFolder.data),
        setSelectedDialogs,

        fromModals,

        selectedDialogsToMove: computed(() => selectedDialogsToMove.data),
        setSelectedDialogsToMove,

        setSelectedDialogsInEdit,
        selectedDialogsInEdit: computed(() => selectedDialogsInEdit.data),

        setCloseCallbackMoveModal,
        onCloseCallbackMoveModal,

        setCloseCallbackNewMessage,
        onCloseCallbackNewMessage,

        setCloseCallbackCreateFolder,
        onCloseCallbackCreateFolder,

    }
}