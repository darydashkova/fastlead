import authActions from '../api/authActions'
import router from '../router';

function deleteAllCookies() {
    let cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

export function useAuth() {

    const tryAuth = async (data) => {
        return await authActions.tryAuth(data)
    }

    const tryRegistr = async (data) => {
        return await authActions.tryRegistr(data)
    }

    const getCsrf = async () => {
        await authActions.getCsrf();
    }

    const outAuth = () => {
        deleteAllCookies();
        const style = localStorage.getItem('style');
        const csrf = localStorage.getItem('csrf');
        localStorage.clear();
        localStorage.setItem('style', style);
        localStorage.setItem('csrf', csrf);
        router.push('/login');
    }

    return {
        tryAuth,
        tryRegistr,
        getCsrf,
        outAuth,
    }
}