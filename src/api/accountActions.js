import {api} from './api';

export default {
    changePassword: (new_password) => {
        let body = {
            ...new_password,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'set/user/password', body, true)
    },
    changeAva: (uid) => {
        let body = {
            img_uid: uid,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', 'set/user/avatar', body, true)
    }
}