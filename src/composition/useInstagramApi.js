import instagramApiActions from "../api/instagramApiActions";
import { reactive, computed, ref } from 'vue';

const facebookss = reactive({
    data: [],
})

const folders = reactive({
    data: [],
})

const returnInstagrams = reactive({
    data: [],
})

const instagramsApiId = ref({
    id: 0,
    user_name: "",
})

const instagrams = reactive({
    data: [],
})

const initialCreateElement = ref({
    facebook_id: 0,
    instagram_api_id: 0,
    default_folder: null,
    comment_tracking: false,
})

const routerActiveLink = ref({link: ""})

export function useInstagramApi() {

    const createFacebook = async (data) => {
        return await instagramApiActions.createFacebook(data);
    }
    const  getFacebook = async () => {
        return await instagramApiActions.getFacebook()
            .then(r => {
                facebookss.data = [...r.facebooks];
                return r.facebooks;
            })
    }

    const  getInstagramsApi = async () => {
        return await instagramApiActions.getInstagramsApi()
            .then(r => {
                instagrams.data = {...r.instagrams_api};
                return r.instagrams_api;
            })
    }

    const getInstagramsFacebook = async (id) => {
        return await instagramApiActions.getInstagramsFacebook(id)
        .then(r => {
            returnInstagrams.data = [...r.instagram_accounts];
            return r.instagram_accounts;
        })
    }

    const  getFolder = async () => {
        return await instagramApiActions.getFolder()
            .then(r => {
                folders.data = {...r.folders};
                return r.folders;
            })
    }

    const createNewAccaunt = async (data) => {
        return await instagramApiActions.createNewAccaunt(data);
    }

    const deleteAccaunt = async (id) => {
        return await instagramApiActions.deleteAccaunt(id);
    }

    const changeAccaunt = async (data) => {
        return await instagramApiActions.changeAccaunt(data);
    }


    return {
        createFacebook,
        getFacebook,

        getInstagramsApi,
        getInstagramsFacebook,
        createNewAccaunt,

        getFolder,

        deleteAccaunt,
        changeAccaunt,

        folders: computed(() => folders.data),
        returnInstagrams: computed(() => returnInstagrams.data),
        facebookss: computed(() => facebookss.data),
        instagrams: computed(() => instagrams.data),
        instagramsApiId,
        initialCreateElement,
        routerActiveLink,
    }
}