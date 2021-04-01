import { ref } from 'vue'

const openedSettings = ref(false);

export function useSettings() {
    const toggleSettings = (boolean) => {
        openedSettings.value = boolean;
    }


    return {
        openedSettings,
        toggleSettings,
    }
}