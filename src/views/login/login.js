import {useAuth} from "../../composition/useAuth";
export default {
    setup() {
        const {authData, tryAuth, loading, error} = useAuth()
        return {
            authData,
            tryAuth,
            loading,
            error
        }
    }
}