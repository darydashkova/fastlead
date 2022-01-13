import {reactive, computed} from 'vue'
import instagramActions from "../api/instagramActions";
import {useIntegrations} from "../composition/useIntegrations"

const instagrams = reactive({
    data: [],
})
export function useInstagram() {
    const {allChanels} = useIntegrations()
    const getInstagrams = async () => {
        return await instagramActions.getInstagrams()
            .then(r => {
                instagrams.data = [...r.instagrams]
                if(allChanels.value&& allChanels.value[0]){
                    
                    allChanels.value=allChanels.value.filter(i => i.hasOwnProperty('whatsapp_id'));
                    console.log(  allChanels.value)
                }
                for(let i = 0; i<r.instagrams.length;i++ ){
                     allChanels.value.push(r.instagrams[i])
                }
                
                return r;
            })
    }
    const createInstagram = async (data) => {
        return await instagramActions.createInstagram(data);
    }
    const deleteInstagrams = async (ids) => {
        return await instagramActions.deleteInstagrams(ids);
    }
    const updateInstagram = async (data) => {
        return await instagramActions.updateInstagram(data);
    }
const twoFactorInstagram = async (data) => {
    return await instagramActions.twoFactorInstagram(data);
}
    return {
        instagrams: computed(() => instagrams.data),
        getInstagrams,
        deleteInstagrams,
        createInstagram,
        updateInstagram,
        twoFactorInstagram,
        allChanels

    }
}