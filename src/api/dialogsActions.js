import {api} from './api';

export default {
    getDialogsFromFolder: (folder_id, offset) => {
        return api.fetch('GET', `get/folder/dialogues?folder_id=${folder_id}&offset=${offset}&limit=20`)
    },

    deleteDialog: (dialog_ids) => {
        let body = {
            dialog_ids: dialog_ids,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'delete/dialog', body)
    },

    readDialog: (dialog_ids) => {
        let body = {
            dialog_ids: dialog_ids,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'set/dialog/read', body)
    },

    createDialog: (data) => {
        let body = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'create/dialog', body)
    },

    moveDialog: (data) => {
        let body = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'update/dialog/move', body)
    },
    dischargeDialog: (data) => {
        let body = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'update/dialog/discharge/folder', body)
    }
}