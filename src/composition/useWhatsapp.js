import {reactive, computed} from 'vue'
import whatsappActions from "../api/whatsappActions";

export function useWhatsapp() {
    const whatsapps = reactive({
        data: [],
    })

    const getWhatsapps = () => {
        whatsappActions.getWhatsapps()
            .then(r => {
                whatsapps.data = [...r.whatsapps]
            })
    }

    return {
        whatsapps: computed(() => whatsapps.data),
        getWhatsapps,
    }
}