import {api} from './api';

export default {
    addFile: (file) => {
        return api.fetchFormData('POST', 'upload/file', file, true)
    },
}