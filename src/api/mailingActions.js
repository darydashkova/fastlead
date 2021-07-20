import {api} from './api';

export default {
    getMailings: () => {
        return api.fetch('GET', 'get/mass-sending/all', null, true);
    },
    createMailing: (data) => {
        let body = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'create/mass-sending', body, true)
    },

    deleteMailings: (data) => {
        let body = {
            mass_sending_ids: data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'delete/mass-sending', body, true)
    },

    stopMailings: (data) => {
        let body = {
            mass_sending_ids: data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'mass-sending/stop', body, true)
    },
    restoreMailings: (data) => {
        let body = {
            mass_sending_ids: data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'mass-sending/start', body, true)
    },
    getSingleMailing: (id) => {
        return api.fetch('GET', `get/mass-sending?mass_sending_id=${id}`, null, true)
    },
    updateMailing: (data) => {
        let body = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'update/mass-sending', body, true)
    },



    getDynamicMailings: () => {
        return api.fetch('GET', 'get/dynamic-mass-sending/all', null, true);
    },
    createDynamicMailing: (data) => {
        let body = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'create/dynamic-mass-sending', body, true)
    },

    deleteDynamicMailings: (data) => {
        let body = {
            dynamic_mass_sending_ids: data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'delete/dynamic-mass-sending', body, true)
    },

    stopDynamicMailings: (data) => {
        let body = {
            dynamic_mass_sending_ids: data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'dynamic-mass-sending/stop', body, true)
    },
    restoreDynamicMailings: (data) => {
        let body = {
            dynamic_mass_sending_ids: data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'dynamic-mass-sending/start', body, true)
    },
    getSingleDynamicMailing: (id) => {
        return api.fetch('GET', `get/dynamic-mass-sending?dynamic_mass_sending_id=${id}`, null, true)
    },
    updateDynamicMailing: (data) => {
        let body = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'update/dynamic-mass-sending', body, true)
    }

}