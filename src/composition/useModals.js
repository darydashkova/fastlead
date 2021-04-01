import { ref } from 'vue';

const openedModalCreateFolder = ref(false);
const openedModalCreateChat = ref(false);


export function useModals() {
    const toggleModalCreateFolder = (value) => {
        openedModalCreateFolder.value = value;
    }
    const toggleModalCreateChat = (value) => {
        openedModalCreateChat.value = value;
    }

    return {
        toggleModalCreateFolder,
        openedModalCreateFolder,

        toggleModalCreateChat,
        openedModalCreateChat

    }
}