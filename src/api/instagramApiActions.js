import {api} from './api';

export default {
    createFacebook: (data) => {
        let body = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'create/facebook', data, true)
    },
    getFacebook: () => {
        return api.fetch('GET', 'get/facebook/all', null, true);
    },

    getInstagramsApi: () => {
        return api.fetch('GET', 'get/instagram-api/all', null, true);
    },

    getInstagramsFacebook: (id) => {
        return api.fetch('GET', `get/instagram-api/accounts?facebook_id=${id}`, null, true)
    },

    getFolder: () => {
        return api.fetch('GET', 'get/folder/all', null, true);
    },

    createNewAccaunt: (data) => {
        let body = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'connect/instagram-api', data, true)
    },

    deleteAccaunt: (data) => {
        let body = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'delete/instagram-api', data, true)
    },

    changeAccaunt: (data) => {
        let body = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'update/instagram-api', data, true)
    },
}