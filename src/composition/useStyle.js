import {ref, computed} from 'vue'

const isDark = ref(true)

export function useStyle() {
    const setStyle = (type) => {
        isDark.value = type;
        localStorage.setItem('style', type)
    }

    return {
        isDark: computed(() => isDark),
        setStyle,
    }
}