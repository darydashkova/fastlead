import {api} from './api';

export default {
    getAmocrm: () => {
        return api.fetch('GET', `get/amocrm`, null, true)
    },
    connectAmocrm: (data) => {
        let lData = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', `connection/amocrm`, lData, true)
    },
    getFunnelsAmocrm: () => {
        return api.fetch('GET', `get/amocrm/funnels`, null, true)
    },

    updateAmocrm: (data) => {
        let lData = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', `update/amocrm/${data.amocrm_integration_id}`, lData, true)
    },
}