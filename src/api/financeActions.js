import {api} from './api';

export default {
    createFinance: (data) => {
        let body = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'create/user-tariff', body, true)
    },
    getFinance: () => {
        return api.fetch('GET', 'get/all/user-tariff', null, true);
    },

    getSingleFinance: (id) => {
        return api.fetch('GET', `get/user-tariff?user_tariff_id=${id}`, null, true)
    },

    updateFinance: (data) => {
        let body = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'update/user-tariff', body, true)
    },

    paymentFinance: (data) => {
        let body = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf')
        }
        return api.fetch('POST', 'link/robokassa', body, true)
    },

   /*  restoreFinances: (data) => {
        let body = {
            mass_sending_ids: data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'mass-sending/start', body, true)
    }, */
}