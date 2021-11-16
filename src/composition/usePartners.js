import partnersActions from "../api/partnersActions";
import { reactive, computed, ref } from 'vue';

const routerActiveLink = ref({link: ""})
const returnPartners = ref({})

const returnRegPartners = ref({
/*     userPartner: [] */
})
const returnInfoPartner = reactive({
    profit: [],
})

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

    const getSinglePartners = async (id) => {
        
        return await partnersActions.getSinglePartners(id)
            .then(r => {
            returnPartners.value = {...r};
            return r;
        })
    }

    const updatePartners = async (data) => {
        return await partnersActions.updatePartners(data)
    }

    const  getInfoRefferals = async () => {
        return await partnersActions.getInfoRefferals()
            .then(r => {
                returnInfoPartner.profit = {...r.partner};
                return r.partner;
            })
    }

    const  getRegRefferals = async () => {
        return await partnersActions.getInfoRefferals()
        .then(r => {
            returnRegPartners.value = {...r.registration_users};
            return r.registration_users
        })
    }

    return {
        createPartners,
        getPartners,
        deletePartners,
        getSinglePartners,
        updatePartners,
        getInfoRefferals,
        getRegRefferals,

        returnPartners,
        routerActiveLink,
        partners,
        returnInfoPartner,
        returnRegPartners,
        partners: computed(() => partners.data),
        returnInfoPartner: computed(() => returnInfoPartner.profit),
    }
}