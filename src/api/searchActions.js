import {api} from './api';

export default {
    searchDialogs: (value, parameters) => {
        let queryString = parameters.map(i => i+'=true').join('&');
        return api.fetch('GET', `get/dialog/search?offset=0&limit=30&${queryString}&search=${value}`, null, true)
    }
}