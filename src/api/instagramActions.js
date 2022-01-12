import {api} from './api'

export default {
    getInstagrams: () => {
        return api.fetch('GET', 'get/instagram/all', null, true)
    },
    createInstagram: (data) => {
        let lData = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf')
        }
        return api.fetch('POST', 'create/instagram', lData, true)
    },
    deleteInstagrams: (ids) => {
        let lData = {
            instagram_ids: ids,
            csrf_token: localStorage.getItem('x-csrf')
        }
        return api.fetch('POST', 'delete/instagram', lData, true)
    },
    updateInstagram: (data) => {
        let lData = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf')
        }
        return api.fetch('POST', 'update/instagram', lData, true)
    },
    
    twoFactorInstagram: (data) =>{
       let lData = {
           ...data,
           csrf_token: localStorage.getItem('x-csrf')
       }
        return api.fetch('POST', 'two-factor/instagram', data, true)
    },

    activateInstagram: (data) => {
        let ldata = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'activate/instagram', data, true)
    },
}