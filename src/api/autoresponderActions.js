import {api} from './api';

export default {
    getAutoresponders: () => {
        return api.fetch('GET', 'get/autoresponder/all', null, true);
    },
    createAutoresponder: (data) => {
        let body = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'create/autoresponder', body, true)
    },

    deleteAutoresponders: (data) => {
        let body = {
            autoresponder_ids: data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'delete/autoresponder', body, true)
    },

    stopAutoresponders: (data) => {
        let body = {
            autoresponder_ids: data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'autoresponder/stop', body, true)
    },
    restoreAutoresponders: (data) => {
        let body = {
            autoresponder_ids: data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'autoresponder/start', body, true)
    },
    getSingleAutoresponder: (id) => {
        return api.fetch('GET', `get/autoresponder?autoresponder_id=${id}`, null, true)
    },
    updateAutoresponder: (data) => {
        let body = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'update/autoresponder', body, true)
    }

}