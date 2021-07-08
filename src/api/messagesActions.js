import {api} from './api';

export default {
    getDialog: (dialog_id) => {
        return api.fetch('GET', `get/dialog?dialog_id=${dialog_id}`, null, true)
    }
}