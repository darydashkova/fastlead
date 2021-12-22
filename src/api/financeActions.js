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

    getSingleFinance: (tariff_name, id) => {
        return api.fetch('GET', `get/user-tariff?${tariff_name}=${id}`, null, true)
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
        return api.fetch('POST', 'link/robokassa', data, true)
    },

    returnSale: (data) => {
        let body = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf')
        }
        return api.fetch('POST', 'get/sales', body, true)
    },

    updateSuccessTariff: (data) => {
        let body = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf')
        }
        return api.fetch('POST', 'add/channels/user-tariff', body, true)
    },

    extentionTariff: (data) => {
        let body = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf')
        }
        return api.fetch('POST', 'extention/user-tariff', body, true)
    },
    deleteFinance: (data) => {
        let body = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'delete/user-tariff', body, true)
    },
}