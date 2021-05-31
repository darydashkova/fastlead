import {api} from './api';

export default {
    getMailings: () => {
        return api.fetch('GET', 'get/mass-sending/all');
    },
    createMailing: (data) => {
        let body = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'create/mass-sending', body)
    },

    deleteMailings: (data) => {
        let body = {
            mass_sending_ids: data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'delete/mass-sending', body)
    },

    stopMailings: (data) => {
        let body = {
            mass_sending_ids: data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'mass-sending/stop', body)
    },
    restoreMailings: (data) => {
        let body = {
            mass_sending_ids: data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'mass-sending/start', body)
    },
    getSingleMailing: (id) => {
        return api.fetch('GET', `get/mass-sending?mass_sending_id=${id}`)
    },
    updateMailing: (data) => {
        let body = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'update/mass-sending', body)
    },



    getDynamicMailings: () => {
        return api.fetch('GET', 'get/dynamic-mass-sending/all');
    },
    createDynamicMailing: (data) => {
        let body = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'create/dynamic-mass-sending', body)
    },

    deleteDynamicMailings: (data) => {
        let body = {
            dynamic_mass_sending_ids: data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'delete/dynamic-mass-sending', body)
    },

    stopDynamicMailings: (data) => {
        let body = {
            dynamic_mass_sending_ids: data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'dynamic-mass-sending/stop', body)
    },
    restoreDynamicMailings: (data) => {
        let body = {
            dynamic_mass_sending_ids: data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'dynamic-mass-sending/start', body)
    },
    getSingleDynamicMailing: (id) => {
        return api.fetch('GET', `get/dynamic-mass-sending?mass_sending_id=${id}`)
    },
    updateDynamicMailing: (data) => {
        let body = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'update/dynamic-mass-sending', body)
    }

}