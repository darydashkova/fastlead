import { api } from './api';

export default {
    uploadBaseFromFile: (data) => {
        return api.fetch('POST', 'import/dialog/file', data, true)
    }
}
