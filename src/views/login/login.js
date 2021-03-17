import {useAuth} from "../../composition/useAuth";
import {user} from '@/api/actions'
export default {
    setup() {
        const {authData, tryAuth} = useAuth()
        const getUser = () => {
            user.tryGetUser()
        }
        return {
            authData,
            tryAuth,
            getUser

        }
    }
}