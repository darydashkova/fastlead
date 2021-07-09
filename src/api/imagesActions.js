import {api} from './api';

export default {
    getImage: (url) => {
        return api.fetchImage('GET', url, null, true)
    }
}