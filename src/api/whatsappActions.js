import {api} from './api'

export default {
    getWhatsapps: () => {
        return api.fetch('GET', 'get/whatsapp/all')
    },
    createWhatsapp: (data) => {
        let lData = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf')
        }
        return api.fetch('POST', 'create/whatsapp', lData)
    },
    deleteWhatsapps: (ids) => {
        let lData = {
            whatsapp_ids: ids,
            csrf_token: localStorage.getItem('x-csrf')
        }
        return api.fetch('POST', 'delete/whatsapp', lData)
    },
    updateWhatsapp: (data) => {
        let lData = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf')
        }
        return api.fetch('POST', 'update/whatsapp', lData)
    },
    syncWhatsapp: (id) => {
        let lData = {
            whatsapp_id: id,
            csrf_token: localStorage.getItem('x-csrf')
        }
        return api.fetch('POST', 'whatsapp/synchronization', lData)
    },
    activateWhatsapp: (id) => {
        let lData = {
            whatsapp_id: id,
            csrf_token: localStorage.getItem('x-csrf')
        }
        return api.fetch('POST', 'activate/whatsapp', lData)
    },
    getWhatsappQr: (id) => {
        return api.fetch('GET', `get/whatsapp/qr?whatsapp_id=${id}`)
    }
}