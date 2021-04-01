import { reactive, computed } from 'vue'
import userActions from '../api/userActions'
import { useRouter } from 'vue-router'

const user = reactive({
    data: {
        'avatar': '/img/icon_inactive.png'
    },
})

export function useUser() {
    const router = useRouter();

    const getUser = () => {
        userActions.tryGetUser()
            .then(r => {
                user.data = {...r.user}
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