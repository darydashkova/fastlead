import {api} from './api'

export default {
    getWhatsapps: () => {
        return api.fetch('GET', 'get/whatsapp/all')
    }
}