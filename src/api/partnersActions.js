import {api} from './api';

export default {
    createPartners: (data) => {
        let body = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'create/affiliate/url', body, true)
    },
    getPartners: () => {
        return api.fetch('GET', 'get/all/affiliate', null, true);
    },

    deletePartners: (data) => {
        let body = {
            affiliate_id: data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'delete/affiliate', body, true)
    },

    getSinglePartners: (id) => {
        return api.fetch('GET', `get/affiliate?affiliate_id=${id}`, null, true)
    },

    updatePartners: (data) => {
        let body = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'update/affiliate', body, true)
    },

    getInfoRefferals: () => {
        return api.fetch('GET', `get/patrner/affiliate`, null, true)
    },
}