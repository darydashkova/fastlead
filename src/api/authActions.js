import {api} from './api';

export default {
    getCsrf: () => {
        api.fetch('GET', 'get/csrf')
            .then(r => {
                localStorage.setItem('x-csrf', r.csrf_token)
            })
    },
    tryAuth: (data) => {
        return api.fetch('POST', 'get/user/token', data)
    },
    tryRegistr: (data) => {
        let localData = data;
        localData.csrf_token = localStorage.getItem('x-csrf');
        return api.fetch('POST', 'create/user', localData)
    },
}