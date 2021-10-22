import partnersActions from "../api/partnersActions";
import { reactive, computed, ref } from 'vue';

const routerActiveLink = ref({link: ""})

const partners = reactive({
    data: [],
})

export function usePartners() {

    const createPartners = async (data) => {
        return await partnersActions.createPartners(data);
    }

    const  getPartners = async () => {
        return await partnersActions.getPartners()
            .then(r => {
                partners.data = [...r.affiliate];
                return r.affiliate;
            })
    }

    const deletePartners = async (id) => {
        return await partnersActions.deletePartners(id)
    }

    return {
        createPartners,
        getPartners,
        deletePartners,

        routerActiveLink,
        partners,
        partners: computed(() => partners.data),
    }
}