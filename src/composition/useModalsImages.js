import { ref } from 'vue';
const openedModalSendImages = ref(false);

export function useModalsImages() {
    const toggleModalSendImages = (value) => {
        openedModalSendImages.value = value;
    }
    return {
        toggleModalSendImages,
        openedModalSendImages,
    }
}