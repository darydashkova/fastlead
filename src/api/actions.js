import {api} from './api'

export const auth = {
    getCsrf: () => {
        api.fetch('GET', 'get/csrf')
            .then(r => {
                localStorage.setItem('x-csrf', r.csrf_token)
            })
    },
    tryAuth: (data) => {
        let localData = data;
        localData.csrf_token = localStorage.getItem('x-csrf');
        api.fetch('POST', 'auth', localData)
            .then(r => {
                console.log(r);
            })
    },
}

export const user = {
    tryGetUser: () => {
        api.fetch('GET', 'get/user?csrf_token=' + localStorage.getItem('x-csrf'), null, false, true)
            .then(r => console.log(r))
    }
}