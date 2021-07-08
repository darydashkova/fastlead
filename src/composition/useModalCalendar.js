import {ref} from "vue";

const openedModalCalendar = ref(false);


export function useModalCalendar() {
    const toggleModalCalendar = (value) => {
        openedModalCalendar.value = value;
    }
    return {
        toggleModalCalendar,
        openedModalCalendar,
    }
}