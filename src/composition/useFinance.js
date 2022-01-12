import financeActions from "../api/financeActions";
import { reactive, computed, ref } from 'vue';

const returnFinance = ref({})

const returnFinanceHistory = ref({})

const linkPayment = ref({})

const routerTrue = ref({link: ""})

const finances = reactive({
    data: [],
})

const initialData = ref({
    sale_id: 1,
    parameters: [
        {
            whatsapp: 0,
            instagram: 0,
        }
    ]
})

export function useFinance() {

    const createFinance = async (data) => {
        return await financeActions.createFinance(data);
    }
    
    const  getFinance = async () => {

        return await financeActions.getFinance()
            .then(r => {
                finances.data = {...r.user_tariff}
                return r.user_tariff;
            })
    }
    
    const getSingleFinance = async (tariff_name,id) => {
        
        return await financeActions.getSingleFinance(tariff_name,id)
            .then(r => {
            returnFinance.value = {...r};
            returnFinanceHistory.value = {...r};
            return r;
        })
    }

    const updateFinance = async (data) => {
        return await financeActions.updateFinance(data);
    }

    const paymentFinance = async (data) => {
        return await financeActions.paymentFinance(data)
    }

    const returnSale = async (data) => {
        return await financeActions.returnSale(data)
    }

    const updateSuccessTariff = async (data) => {
        return await financeActions.updateSuccessTariff(data)
    }

    const extentionTariff = async (data) => {
        return await financeActions.extentionTariff(data)
    }

    const deleteFinance = async (data) => {
        return await financeActions.deleteFinance(data)
    }

    return {
        getFinance,
        createFinance,
        getSingleFinance,
        updateFinance,
        paymentFinance,
        
        returnSale,

        updateSuccessTariff,

        extentionTariff,
        deleteFinance,

        linkPayment,
        initialData,
        finances: computed(() => finances.data),
        returnFinance,
        returnFinanceHistory,
        routerTrue,
    }
}