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
}