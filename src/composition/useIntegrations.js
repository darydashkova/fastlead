import {reactive, computed} from 'vue';
import integrationActions from "../api/integrationActions";

export function useIntegrations() {
    const getBitrix = async () => {
        return await integrationActions.bitrixActions.getBitrix();
    }
    const getAmocrm = async () => {
        return await integrationActions.amocrmActions.getAmocrm();
    }

    const connectBitrix = async (url) => {
        return await integrationActions.bitrixActions.connectBitrix(url);
    }

    const connectAmocrm = async () => {
        let client_id = 'adb03ea5-c2be-4347-9915-6118fa70e5a4',
            state = Math.random().toString(36).substring(2),
            mode = 'popup';

        let url_array = [
            'https://www.amocrm.ru/oauth/',
            '?state=', state,
            '&mode=', mode
        ];

        if (client_id) {
            url_array.push('&client_id=', client_id);
        }
        let centerAuthWindow = function (url, title) {
            let w = 750;
            let h = 580;
            let dual_screen_left = window.screenLeft !== undefined ? window.screenLeft : screen.left;
            let dual_screen_top = window.screenTop !== undefined ? window.screenTop : screen.top;

            let width = window.innerWidth
                ? window.innerWidth
                : (document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width);

            let height = window.innerHeight
                ? window.innerHeight
                : (document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height);

            let left = ((width / 2) - (w / 2)) + dual_screen_left;
            let top = ((height / 2) - (h / 2)) + dual_screen_top;

            let new_window =
                window.open(url, title, 'scrollbars, status, resizable, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

            if (window.focus) {
                new_window.focus();
            }
        };
        centerAuthWindow(
            url_array.join(''),
            'Предоставить доступ для интеграции'
        );
    }

    const connectAmocrmAfterLogin = async (data) => {
        return await integrationActions.amocrmActions.connectAmocrm(data);
    }


    const getFunnelsBitrix = async () => {
        return await integrationActions.bitrixActions.getFunnelsBitrix()
    }
    const getFunnelsAmocrm = async () => {
        return await integrationActions.amocrmActions.getFunnelsAmocrm()
    }

    const getColumnFromFunnelBitrix = async (id) => {
        return await  integrationActions.bitrixActions.getColumnsFromFunnelBitrix(id)
    }
    const getColumnFromFunnelAmocrm = async (id) => {
        return await  integrationActions.amocrmActions.getColumnsFromFunnelAmocrm(id)
    }

    const updateBitrix = async (data) => {
        return await integrationActions.bitrixActions.updateBitrix(data);
    }

    const updateAmocrm = async (data) => {
        return await integrationActions.amocrmActions.updateAmocrm(data);
    }



    return {
        getBitrix,
        getAmocrm,
        connectAmocrmAfterLogin,

        connectBitrix,
        connectAmocrm,


        getFunnelsBitrix,
        getFunnelsAmocrm,

        getColumnFromFunnelBitrix,
        getColumnFromFunnelAmocrm,

        updateBitrix,
        updateAmocrm,
    }
}