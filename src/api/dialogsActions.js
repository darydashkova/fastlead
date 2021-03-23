import {api} from './api';

export default {
    getDialogsFromFolder: (folder_id, offset) => {
        return api.fetch('GET', `get/folder/dialogues?folder_id=${folder_id}&offset=${offset}&limit=20`)
    },

    deleteDialog: (dialog_id) => {
        let body = {
            dialog_id: dialog_id,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'delete/dialog', body)
    }

}