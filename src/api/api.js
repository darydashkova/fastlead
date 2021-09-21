const url = `${process.env.VUE_APP_API_URL}/`;
export const api = {
    fetchDefaultArgs: (method, endpoint, body = null, token = false, withCredential = false) => {
        let fetchArgs = {
            method: method,
            headers: {},
        };
        withCredential && (fetchArgs.credentials = 'include')
        fetchArgs.headers['Content-Type'] = 'application/json'
        fetchArgs.headers['Accept'] = 'application/json'
        if (token && localStorage.getItem('token')) {
            fetchArgs.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        }
        body && (fetchArgs.body = JSON.stringify(body))
        return fetchArgs
    },
    fetch : async (method, endpoint, body = null, token = false, withCredential = false) => {
        let args = api.fetchDefaultArgs(method, endpoint, body, token, withCredential)
        return await fetch(url+endpoint, args)
            .then(res => res.json())
    },
    fetchImage : async (method, endpoint, body = null, token = false, withCredential = false) => {
        let args = api.fetchDefaultArgs(method, endpoint, body, token, withCredential)
        return await fetch(endpoint, args)
            .then(res => res.blob())
    },
    fetchFormData: async (method, endpoint, body, token = false, withCredential = false) => {
        let fetchArgs = {
            method: method,
            headers: {},
        };
        withCredential && (fetchArgs.credentials = 'include')
        fetchArgs.headers['Accept'] = 'application/json'
        if (token && localStorage.getItem('token')) {
            fetchArgs.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        }
        let formData = new FormData();
        formData.append('image', body);
        fetchArgs.body = formData;
        return await fetch(url+endpoint, fetchArgs)
            .then(res => res.json())
    }
}