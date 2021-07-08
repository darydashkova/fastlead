import {api} from './api'

export default {
    tryGetUser: () => {
        return api.fetch('GET', 'get/user', null, true)
    }
}