import {reactive, ref} from 'vue'
import authActions from '../api/authActions'
import { useRouter } from 'vue-router'

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

    return {
        authData: authData,
        tryAuth,
        getCsrf,
        error,
        loading,
    }
}