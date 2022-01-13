import {reactive, computed} from 'vue'
import whatsappActions from "../api/whatsappActions";
import {useIntegrations} from "../composition/useIntegrations"

const whatsapps = reactive({
    data: [],
})
export function useWhatsapp() {
    const {allChanels} = useIntegrations()
    const getWhatsapps = async () => {
        return await whatsappActions.getWhatsapps()
            .then(r => {
                whatsapps.data = [...r.whatsapps]
                if(allChanels.value&& allChanels.value[0]){
                    
                    allChanels.value=allChanels.value.filter(i => i.hasOwnProperty('instagram_id'));
                    console.log(  allChanels.value)
                }
                for(let i = 0; i<r.whatsapps.length;i++ ){
                     allChanels.value.push(r.whatsapps[i])
                }
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
        return await whatsappActions.syncWhatsapp(id);
    }
    const activateWhatsapp = async (id) => {
        return await whatsappActions.activateWhatsapp(id);
    }
    const getWhatsappQr = async (id) => {
        return await whatsappActions.getWhatsappQr(id);
    }
    const getWhatsappActivities = async () => {
        return await whatsappActions.getWhatsappActivities();
    }

    return {
        whatsapps: computed(() => whatsapps.data),
        getWhatsapps,
        deleteWhatsapps,
        createWhatsapp,
        updateWhatsapp,
        syncWhatsapp,
        activateWhatsapp,
        getWhatsappQr,
        getWhatsappActivities,
    }
}