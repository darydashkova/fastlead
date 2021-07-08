import {api} from './api'

export default {
    getWhatsapps: () => {
        return api.fetch('GET', 'get/whatsapp/all', null, true)
    },
    createWhatsapp: (data) => {
        let lData = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf')
        }
        return api.fetch('POST', 'create/whatsapp', lData, true)
    },
    deleteWhatsapps: (ids) => {
        let lData = {
            whatsapp_ids: ids,
            csrf_token: localStorage.getItem('x-csrf')
        }
        return api.fetch('POST', 'delete/whatsapp', lData, true)
    },
    updateWhatsapp: (data) => {
        let lData = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf')
        }
        return api.fetch('POST', 'update/whatsapp', lData, true)
    },
    syncWhatsapp: (id) => {
        let lData = {
            whatsapp_id: id,
            csrf_token: localStorage.getItem('x-csrf')
        }
        return api.fetch('POST', 'whatsapp/synchronization', lData, true)
    },
    activateWhatsapp: (id) => {
        let lData = {
            whatsapp_id: id,
            csrf_token: localStorage.getItem('x-csrf')
        }
        return api.fetch('POST', 'activate/whatsapp', lData, true)
    },
    getWhatsappQr: (id) => {
        return api.fetch('GET', `get/whatsapp/qr?whatsapp_id=${id}`, null, true)
    },
    getWhatsappActivities: () => {
        return api.fetch('GET', `get/whatsapp-activities/all`, null, true)
    },
}