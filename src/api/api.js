const url = '/api/';

export const api = {
    fetch : async (method, endpoint, body = null, token = false, withCredential = false) => {
        let fetchArgs = {
            method: method,
            headers: {},
        };
        withCredential && (fetchArgs.credentials = 'include')
        fetchArgs.headers['Content-Type'] = 'application/json'
        fetchArgs.headers['Accept'] = 'application/json'
        body && (fetchArgs.body = JSON.stringify(body))
        return await fetch(url+endpoint, fetchArgs)
            .then(res => res.json())
    },
    fetchImage : async (method, endpoint, body = null, token = false, withCredential = false) => {
        let fetchArgs = {
            method: method,
            headers: {},
        };
        withCredential && (fetchArgs.credentials = 'include')
        fetchArgs.headers['Content-Type'] = 'application/json'
        fetchArgs.headers['Accept'] = 'application/json'
        body && (fetchArgs.body = JSON.stringify(body))
        return await fetch(url+endpoint, fetchArgs)
            .then(res => res.blob())
    },
    fetchFormData: async (method, endpoint, body, token = false, withCredential = false) => {
        let fetchArgs = {
            method: method,
            headers: {},
        };
        withCredential && (fetchArgs.credentials = 'include')
        fetchArgs.headers['Accept'] = 'application/json'
        let formData = new FormData();
        formData.append('image', body);
        fetchArgs.body = formData;
        return await fetch(url+endpoint, fetchArgs)
            .then(res => res.json())
    }
}