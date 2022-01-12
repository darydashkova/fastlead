import { api } from './api'

export default {
    getAllAnswerphone: () => {
        return api.fetch('GET', 'get/autoresponder/all', null, true)
    },
    deleteAnswerphone: (data) => {
        let body = {
            autoresponder_ids: data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'delete/autoresponder', data, true)
    },
    stopAnswerphone: (data) => {
        let body = {
            autoresponder_id: data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'autoresponder/stop', data, true)
    },
    startAnswerphone: (data) => {
        let body = {
            autoresponder_id: data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'autoresponder/start', data, true)
    },

    createAnswerphone: (data) => {
        let body = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'create/autoresponder', data, true)
    },

    updateAnswerphone: (data) => {
        let body = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'update/autoresponder', data, true)
    },
}