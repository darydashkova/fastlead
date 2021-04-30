import { ref } from 'vue';
const openedModalCreateWhatsapp = ref(false);
const openedModalSyncWhatsapp = ref(false);
const openedModalActivationMethod = ref(false);
const openedModalActivationMethodSuccess = ref(false);
const openedModalActivationMethodMyself = ref(false);
const openedModalActivationMethodNotMyself = ref(false);
const selectedWhatsappToAction = ref(null);

export function useModalsWhatsapps() {
    const toggleModalCreateWhatsapp = (value) => {
        openedModalCreateWhatsapp.value = value;
    }
    const toggleModalSyncWhatsapp = (value) => {
        openedModalSyncWhatsapp.value = value;
    }
    const toggleModalChoiceActivationMethod = (value) => {
        openedModalActivationMethod.value = value;
    }
    const toggleModalChoiceActivationMethodMyself = (value) => {
        openedModalActivationMethodMyself.value = value;
    }
    const toggleModalChoiceActivationMethodSuccess = (value) => {
        openedModalActivationMethodSuccess.value = value;
    }
    const toggleModalChoiceActivationMethodNotMyself = (value) => {
        openedModalActivationMethodNotMyself.value = value;
    }


    return {
        toggleModalCreateWhatsapp,
        openedModalCreateWhatsapp,

        toggleModalSyncWhatsapp,
        openedModalSyncWhatsapp,

        openedModalActivationMethod,
        toggleModalChoiceActivationMethod,

        openedModalActivationMethodMyself,
        toggleModalChoiceActivationMethodMyself,

        openedModalActivationMethodSuccess,
        toggleModalChoiceActivationMethodSuccess,

        openedModalActivationMethodNotMyself,
        toggleModalChoiceActivationMethodNotMyself,

        selectedWhatsappToAction,

    }
}