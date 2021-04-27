import {api} from './api';

export default {
    getAutoresponders: () => {
        return api.fetch('GET', 'get/autoresponder/all');
    },
    createAutoresponder: (data) => {
        let body = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'create/autoresponder', body)
    },

    deleteAutoresponders: (data) => {
        let body = {
            autoresponder_ids: data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'delete/autoresponder', body)
    },

    stopAutoresponders: (data) => {
        let body = {
            autoresponder_ids: data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'autoresponder/stop', body)
    },
    restoreAutoresponders: (data) => {
        let body = {
            autoresponder_ids: data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'autoresponder/start', body)
    },
    getSingleAutoresponder: (id) => {
        return api.fetch('GET', `get/autoresponder?autoresponder_id=${id}`)
    },
    updateAutoresponder: (data) => {
        let body = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'update/autoresponder', body)
    }

}