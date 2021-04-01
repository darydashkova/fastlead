import UserInfoSettings from './UserInfoSettings/UserInfoSettings'

import {useUser} from "../../composition/useUser";

export default {
    components: { UserInfoSettings },
    setup() {
        const { user } = useUser()

        return {
            user
        }
    }
}