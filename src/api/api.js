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

    socket: (url) => {
        return new WebSocket(url)
    }
}