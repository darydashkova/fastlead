import { ref } from 'vue';

const isLoadingDialogs = ref(false);

const isLoadingMessages = ref(false);



export function useLoader() {


    return {
        isLoadingDialogs,

        isLoadingMessages,
    }
}