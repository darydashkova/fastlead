import { reactive, computed } from 'vue'
import userActions from '../api/userActions'
import { useRouter } from 'vue-router'
import {useAuth} from "./useAuth";

const user = reactive({
    data: {},
})

export function useUser() {
    const router = useRouter();
    const { outAuth } = useAuth()

    const getUser = async (again = false) => {
        return await userActions.tryGetUser()
            .then(r => {
                if (r.error) {
                    if (localStorage.getItem('token')) {
                        outAuth();
                    }
                    return;
                }
                user.data = {...r.user}
                localStorage.setItem('UserId', r.user.user_id);
                user.data.avatar = user.data.avatar + (again? `?anti-cash=${new Date().getTime()}`: '')
                return r;
            })
            .catch(err => {
                outAuth()
            })
    }

    return {
        user: computed(() => user.data),
        getUser,
    }
}