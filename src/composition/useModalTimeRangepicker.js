import {ref} from "vue";

const openedModalTimeRangepicker = ref(false);

export function useModalTimeRangepicker() {
    const toggleModalTimeRangepicker = (value) => {
        openedModalTimeRangepicker.value = value;
    }
    return {
        toggleModalTimeRangepicker,
        openedModalTimeRangepicker,
    }
}