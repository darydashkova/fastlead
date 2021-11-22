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
    deleteAmocrm: () => {
        return api.fetch('POST', `delete/amocrm`, null, true)
    },
    getAllTasksAmo: () => {
        return api.fetch('GET', `get/id/amocrm`, null, true)
    },
    deleteIdAmocrm: (data) => {
        let lData = {
            ...data,
        }
         return api.fetch('POST', `delete/id/amocrm`, lData, true)
    },
    testMessage: (data) => {
        let lData = {
            ...data,
        }
         return api.fetch('POST', `send/test/message`, lData, true)
    },
    getTaskById: (data) => {
        let lData = {
            ...data,
        }
         return api.fetch('POST', `get/amocrm/channel?id=${lData.id}&type=${lData.type}`, lData, true)
    },

}