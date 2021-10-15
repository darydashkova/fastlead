import financeActions from "../api/financeActions";
import { reactive, computed, ref } from 'vue';

const returnFinance = ref({})

const returnFinanceHistory = ref({})

const linkPayment = ref({})

const routerTrue = ref({link: ""})

const finances = reactive({
    data: [],
})
document.querySelector(".subscription-message")
export function useFinance() {

    const createFinance = async (data) => {
        return await financeActions.createFinance(data);
    }
    const  getFinance = async () => {
        return await financeActions.getFinance()
            .then(r => {
                finances.data = [...r.user_tariff];
                return r.user_tariff;
            })
    }
    const getSingleFinance = async (id) => {
        
        return await financeActions.getSingleFinance(id)
            .then(r => {
             returnFinance.value = {...r};
             returnFinanceHistory.value = {...r};
            /* console.log(returnFinance.value) */
            return r;
        })
    }
/* 
    const getFinanceHistory = async (id) => {
        
        return await financeActions.getSingleFinance(id)
            .then(r => { */
             /* returnFinanceHistory.value = {...r}; */
            /* console.log(returnFinance.value) */
/*             return r;
        })
    } */

    const updateFinance = async (data) => {
        return await financeActions.updateFinance(data);
    }

    const paymentFinance = async (data) => {
        return await financeActions.paymentFinance(data)
    }


    return {
        getFinance,
        createFinance,
        getSingleFinance,
        updateFinance,
       /*  getFinanceHistory, */
        paymentFinance,
        linkPayment,
        /* restoreFinance, */
        finances: computed(() => finances.data),
        returnFinance,
        returnFinanceHistory,
        routerTrue,
    }
}