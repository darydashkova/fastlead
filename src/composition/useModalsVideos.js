import { ref } from 'vue';
const openedModalSendVideos = ref(false);

export function useModalsVideos() {
    const toggleModalSendVideos = (value) => {
        openedModalSendVideos.value = value;
    }
    return {
        toggleModalSendVideos,
        openedModalSendVideos,
    }
}