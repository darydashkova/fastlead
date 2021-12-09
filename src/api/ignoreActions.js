import { api } from './api'

export default {
    getAllIgnoreNumbers: () => {
        return api.fetch('GET', 'get/all/phone/ignore', null, true)
    },
    addIgnoreNumber: (data) => {
        return api.fetch('POST', 'add/phone/ignore', data, true)
    },
    getOneNumber: (phone) => {
        return api.fetch('GET', `get/phone/ignore?phone=${phone}`, null, true)
    },
    deleteIgnoreNumber: (data) => {
        let lData = {
           phone:data,
        }
        return api.fetch('POST', 'delete/phone/ignore', lData, true)
    },
    updateIgnoreNumber: (data) => {
        return api.fetch('POST', 'update/phone/ignore', data, true)
    },
}