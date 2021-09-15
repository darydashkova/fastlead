import { ref } from 'vue';
const openedModalSendFiles = ref(false);

export function useModalsFiles() {
    const toggleModalSendFiles = (value) => {
        openedModalSendFiles.value = value;
    }
    return {
        toggleModalSendFiles,
        openedModalSendFiles,
    }
}