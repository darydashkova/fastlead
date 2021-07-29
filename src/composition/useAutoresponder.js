import autoresponderActions from "../api/autoresponderActions";
import { reactive, computed } from 'vue';


const autoresponders = reactive({
    data: [],
})

export function useAutoresponders() {

    const createAutoresponder = async (data) => {
        return await autoresponderActions.createAutoresponder(data);
    }

    const getAutoresponders = async () => {
        return await autoresponderActions.getAutoresponders()
            .then(r => {
                autoresponders.data = [...r.autoresponders];
                return r.autoresponders;
            })
    }

    const deleteAutoresponder = async (ids) => {
        return await autoresponderActions.deleteAutoresponders(ids)
    }

    const stopAutoresponder = async (ids) => {
        return await autoresponderActions.stopAutoresponders(ids)
    }

    const restoreAutoresponder = async (ids) => {
        return await autoresponderActions.restoreAutoresponders(ids)
    }
    const getSingleAutoresponder = async (id) => {
        return await autoresponderActions.getSingleAutoresponder(id);
    }
    const updateAutoresponder = async (data) => {
        return await autoresponderActions.updateAutoresponder(data);
    }

    return {
        createAutoresponder,
        getAutoresponders,
        deleteAutoresponder,
        restoreAutoresponder,
        stopAutoresponder,
        getSingleAutoresponder,
        updateAutoresponder,

        autoresponders: computed(() => autoresponders.data),
    }
}