import { ref } from 'vue'

const openedUserInfo = ref(false);

export function useUserInfo() {
    const toggleOpenedUserInfo = (boolean) => {
        openedUserInfo.value = boolean;
    }


    return {
        openedUserInfo,
        toggleOpenedUserInfo,
    }
}