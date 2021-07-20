import {api} from './api';

export default {
    getBitrix: () => {
        return api.fetch('GET', `get/bitrix`, null, true)
    },
    connectBitrix: (url) => {
        let lData = {
            bitrix_url: url,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', `connection/bitrix`, lData, true)
    },
    getFunnelsBitrix: () => {
        return api.fetch('GET', `get/bitrix/funnels`, null, true)
    },

    updateBitrix: (data) => {
        let lData = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf'),
        }
        return api.fetch('POST', `update/bitrix/${data.bitrix_integration_id}`, lData, true)
    },
}