import UserInfoSettings from './UserInfoSettings/UserInfoSettings'

import {useUser} from "../../composition/useUser";
import {useUserInfo} from "../../composition/useUserInfo";

export default {
    components: { UserInfoSettings },
    setup() {
        const { user } = useUser();

        const { toggleOpenedUserInfo } = useUserInfo()

        return {
            user,
            toggleOpenedUserInfo
        }
    }
}