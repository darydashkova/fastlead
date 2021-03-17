import {reactive, ref} from 'vue'
import {auth} from '@/api/actions'
export function useAuth() {
    const authData = reactive({
        login: '',
        password: '',
    })

    const tryAuth = () => {
        auth.tryAuth({
            login: authData.login,
            password: authData.password
        })
    }

    const getCsrf = async () => {
        await auth.getCsrf();
    }

    return {
        authData: authData,
        tryAuth,
        getCsrf,
    }
}