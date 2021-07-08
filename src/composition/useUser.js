import { reactive, computed } from 'vue'
import userActions from '../api/userActions'
import { useRouter } from 'vue-router'
import {useAuth} from "./useAuth";

const user = reactive({
    data: {
        'avatar': '/img/icon_inactive.png'
    },
})

export function useUser() {
    const router = useRouter();

    const getUser = (again = false) => {
        userActions.tryGetUser()
            .then(r => {
                if (r.error) {
                    router.push('/login');
                    return;
                }
                user.data = {...r.user}
                localStorage.setItem('UserId', r.user.user_id);
                user.data.avatar = user.data.avatar + (again? `?anti-cash=${new Date().getTime()}`: '')
            })
            .catch(err => {
                router.push('/login')
            })
    }

    return {
        user: computed(() => user.data),
        getUser,
    }
}