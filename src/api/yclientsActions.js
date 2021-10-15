import {api} from './api';

export default {
    getYclients: () => {
        return api.fetch('GET', `get/yclients`, null, true)
    },
    connectYclients: (date) => {
        let lData = {
            // yclients_url: url,
            // csrf_token: localStorage.getItem('x-csrf'),
             login:date.log,
             password:date.password,

        }
         return api.fetch('POST', `connection/yclients`, lData, true)

    },
    getFunnelsYclients: () => {
        return api.fetch('GET', `get/yclients/funnels`, null, true)
    },

    updateYclients: (data) => {
        let lData = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', `update/yclients/${data.yclients_integration_id}`, lData, true)
    },
    postBirthdayTask: (data) => {
        let lData = {
            ...data
        }
        return api.fetch('POST', `create/yclients/task`, lData, true)
    },
    getAllTask: () => {
        return api.fetch('GET', `get/all/yclients/task`, null, true)
    },
    deleteTask: (data) => {
        let lData = {
            ...data
        }
        return api.fetch('POST', `delete/yclients/task`, lData, true)
    },
    updateTask: (data) => {
        let lData = {
            ...data
        }
        return api.fetch('POST', `update/yclients/task`, lData, true)
    },
     delYclient : () => {
        return api.fetch('POST', `delete/yclients`, null, true)
    }
}