import {reactive, computed} from 'vue';
import integrationActions from "../api/integrationActions";

const amocrm_client_id = `${process.env.VUE_APP_AMOCRM_ID}`

export function useIntegrations() {
    const getBitrix = async () => {
        return await integrationActions.bitrixActions.getBitrix();
    }
    const getAmocrm = async () => {
        return await integrationActions.amocrmActions.getAmocrm();
    }
    const getAllTasksAmo = async () => {
           return await integrationActions.amocrmActions.getAllTasksAmo();
    }
    const getYclients = async () => {
        return await integrationActions.yclientsActions.getYclients();
    }
    const connectBitrix = async (url) => {
        return await integrationActions.bitrixActions.connectBitrix(url);
    }
    const connectYclients = async (url) => {
        return await integrationActions.yclientsActions.connectYclients(url);
    }
    const deleteAmocrm = async () => {
        return await integrationActions.amocrmActions.deleteAmocrm();
    }
    const delYclient = async () => {
        return await integrationActions.yclientsActions.delYclient();
    }
    const deleteIdAmocrm = async (id) => {
        return await integrationActions.amocrmActions.deleteIdAmocrm(id);
    }
    const getTaskById = async (data) => {
        return await integrationActions.amocrmActions.getTaskById(data);
    }
    const connectAmocrm = async () => {
        let client_id = amocrm_client_id,
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
     const getFunnelsYclients = async () => {
        return await integrationActions.yclientsActions.getFunnelsYclients()
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
    const updateYclients = async (data) => {
        return await integrationActions.yclientsActions.updateYclients(data);
    }
    const postBirthdayTask = async (data) => {
        return await integrationActions.yclientsActions.postBirthdayTask(data)
    }
    const getAllTask = async () => {
        return await integrationActions.yclientsActions.getAllTask()
    }
    const deleteTask = async (data) => {
        return await integrationActions.yclientsActions.deleteTask(data)
    }
    const updateTask = async (data) => {
        return await integrationActions.yclientsActions.updateTask(data)
    }
    const testMessage = async (data) => {
        return await integrationActions.amocrmActions.testMessage(data);
    }
    return {
        getBitrix,
        getAmocrm,
        getYclients,
        connectAmocrmAfterLogin,
        connectYclients,
        connectBitrix,
        connectAmocrm,

        getFunnelsBitrix,
        getFunnelsAmocrm,
        getFunnelsYclients,

        getColumnFromFunnelBitrix,
        getColumnFromFunnelAmocrm,

        updateBitrix,
        updateAmocrm,
        updateYclients,
        deleteAmocrm,
        postBirthdayTask,
        getAllTask,
        deleteTask,
        updateTask,
        delYclient,
        getAllTasksAmo,
        deleteIdAmocrm,
        testMessage,
        getTaskById
    }
}