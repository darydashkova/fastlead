import mailingActions from "../api/mailingActions";
import { reactive, computed } from 'vue';


const mailings = reactive({
    data: [],
})
const dynamicMailings = reactive({
    data: [],
})

export function useMailings() {
    const createMailing = async (data) => {
        return await mailingActions.createMailing(data);
    }
    const getMailings = async () => {
        return await mailingActions.getMailings()
            .then(r => {
                mailings.data = [...r.mass_sendings];
                return r.mass_sendings;
            })
    }
    const deleteMailing = async (ids) => {
        return await mailingActions.deleteMailings(ids)
    }

    const stopMailing = async (ids) => {
        return await mailingActions.stopMailings(ids)
    }

    const restoreMailing = async (ids) => {
        return await mailingActions.restoreMailings(ids)
    }
    const getSingleMailing = async (id) => {
        return await mailingActions.getSingleMailing(id);
    }
    const updateMailing = async (data) => {
        return await mailingActions.updateMailing(data);
    }

    const createDynamicMailing = async (data) => {
        return await mailingActions.createDynamicMailing(data);
    }



    const getDynamicMailings = async () => {
        return await mailingActions.getDynamicMailings()
            .then(r => {
                dynamicMailings.data = [...r.dynamic_mass_sendings];
                return r.dynamic_mass_sendings;
            })
    }
    const deleteDynamicMailing = async (ids) => {
        return await mailingActions.deleteDynamicMailings(ids)
    }

    const stopDynamicMailing = async (ids) => {
        return await mailingActions.stopDynamicMailings(ids)
    }

    const restoreDynamicMailing = async (ids) => {
        return await mailingActions.restoreDynamicMailings(ids)
    }
    const getSingleDynamicMailing = async (id) => {
        return await mailingActions.getSingleDynamicMailing(id);
    }
    const updateDynamicMailing = async (data) => {
        return await mailingActions.updateDynamicMailing(data);
    }

    return {
        createMailing,
        getMailings,
        deleteMailing,
        restoreMailing,
        stopMailing,
        getSingleMailing,
        updateMailing,

        createDynamicMailing,
        getDynamicMailings,
        deleteDynamicMailing,
        restoreDynamicMailing,
        stopDynamicMailing,
        getSingleDynamicMailing,
        updateDynamicMailing,

        mailings: computed(() => mailings.data),
        dynamicMailings: computed(() => dynamicMailings.data),
    }
}