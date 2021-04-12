import {reactive, ref} from 'vue'
import authActions from '../api/authActions'
import { useRouter } from 'vue-router'

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
    const router = useRouter();

    const authData = reactive({
        login: '',
        password: '',
    })

    const error = ref(false);
    const loading = ref(false);

    const tryAuth = () => {
        loading.value = true;
        error.value = false;
        authActions.tryAuth({
            login: authData.login,
            password: authData.password
        })
            .then(r => {
                loading.value = false;
                if (r.error) {
                    error.value = true;
                } else {
                    router.push('/messenger')
                }
            })
    }

    const getCsrf = async () => {
        await authActions.getCsrf();
    }

    const outAuth = () => {
        deleteAllCookies();
        window.location.reload(true);
    }

    return {
        authData: authData,
        tryAuth,
        getCsrf,
        error,
        loading,

        outAuth,
    }
}