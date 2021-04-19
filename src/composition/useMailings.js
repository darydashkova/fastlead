import mailingActions from "../api/mailingActions";
import { reactive, computed } from 'vue';


const mailings = reactive({
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

    return {
        createMailing,
        getMailings,
        deleteMailing,
        restoreMailing,
        stopMailing,
        getSingleMailing,
        updateMailing,

        mailings: computed(() => mailings.data),
    }
}