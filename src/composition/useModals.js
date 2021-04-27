import { ref, reactive, computed } from 'vue';

const openedModalCreateFolder = ref(false);
const openedModalCreateChat = ref(false);
const openedModalAddToFolder = ref(false);
const openedModalEditFolders = ref(false);
const openedModalMoveChat = ref(false);
const openedModalCreateWhatsapp = ref(false);
const openedModalSyncWhatsapp = ref(false);
const openedModalChangeAva = ref(false);
const openedModalNewMessage = ref(false);

const selectedFolderToEdit = ref(null);
const selectedDialogsToFolder = reactive({data: []});

const fromModals = reactive({
    fromAddToFolderToCreateChat: false,
    fromCreateChatToCreateFolder: false,
})

let onCloseCallback = () => null;
let onCloseCallbackMoveModal = () => null;
let onCloseCallbackNewMessage = () => null;

const setCloseCallback = (cb) => {
    onCloseCallback = cb;
}
const setCloseCallbackMoveModal = (cb) => {
    onCloseCallbackMoveModal = cb;
}
const setCloseCallbackNewMessage = (cb) => {
    onCloseCallbackNewMessage = cb;
}

const selectedDialogsToMove = reactive({
    data: [],
});

const selectedWhatsappToAction = ref(null);

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
    const toggleModalCreateWhatsapp = (value) => {
        openedModalCreateWhatsapp.value = value;
    }
    const toggleModalSyncWhatsapp = (value) => {
        openedModalSyncWhatsapp.value = value;
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

        toggleModalCreateChat,
        openedModalCreateChat,

        toggleModalAddToFolder,
        openedModalAddToFolder,

        toggleModalEditFolders,
        openedModalEditFolders,

        toggleModalMoveChat,
        openedModalMoveChat,

        toggleModalCreateWhatsapp,
        openedModalCreateWhatsapp,
        selectedWhatsappToAction,

        toggleModalSyncWhatsapp,
        openedModalSyncWhatsapp,

        toggleModalChangeAva,
        openedModalChangeAva,

        toggleModalNewMessage,
        openedModalNewMessage,


        selectedFolderToEdit,
        selectedDialogsToFolder: computed(() => selectedDialogsToFolder.data),
        setSelectedDialogs,

        fromModals,
        onCloseCallback,
        setCloseCallback,

        selectedDialogsToMove: computed(() => selectedDialogsToMove.data),
        setSelectedDialogsToMove,

        setSelectedDialogsInEdit,
        selectedDialogsInEdit: computed(() => selectedDialogsInEdit.data),

        setCloseCallbackMoveModal,
        onCloseCallbackMoveModal,

        setCloseCallbackNewMessage,
        onCloseCallbackNewMessage,

    }
}