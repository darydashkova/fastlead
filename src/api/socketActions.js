import {api} from './api';

export default {
    connectSocket: () => {
        return api.socket('');
    },
}