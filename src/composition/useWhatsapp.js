import {reactive, computed} from 'vue'
import whatsappActions from "../api/whatsappActions";
const whatsapps = reactive({
    data: [],
})
export function useWhatsapp() {
    const getWhatsapps = async () => {
        return await whatsappActions.getWhatsapps()
            .then(r => {
                whatsapps.data = [...r.whatsapps]
                return r;
            })
    }
    const createWhatsapp = async (data) => {
        return await whatsappActions.createWhatsapp(data);
    }
    const deleteWhatsapps = async (ids) => {
        return await whatsappActions.deleteWhatsapps(ids);
    }
    const updateWhatsapp = async (data) => {
        return await whatsappActions.updateWhatsapp(data);
    }
    const syncWhatsapp = async (id) => {
        return await whatsappActions.syncWhatsapp(data);
    }

    return {
        whatsapps: computed(() => whatsapps.data),
        getWhatsapps,
        deleteWhatsapps,
        createWhatsapp,
        updateWhatsapp,
        syncWhatsapp
    }
}