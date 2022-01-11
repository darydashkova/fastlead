import {reactive, computed} from 'vue'
import instagramActions from "../api/instagramActions";

const instagrams = reactive({
    data: [],
})
export function useInstagram() {
    const getInstagrams = async () => {
        return await instagramActions.getInstagrams()
            .then(r => {
                instagrams.data = [...r.instagrams]

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
    const activateInstagram = async (data) => {
        return await instagramActions.activateInstagram(data);
    }
    return {
        instagrams: computed(() => instagrams.data),
        getInstagrams,
        deleteInstagrams,
        createInstagram,
        updateInstagram,
        twoFactorInstagram,
        activateInstagram,
    }
}