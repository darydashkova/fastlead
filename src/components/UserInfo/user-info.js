import UserInfoSettings from './UserInfoSettings/UserInfoSettings'

import {useUser} from "../../composition/useUser";
import {useSettings} from "../../composition/useSettings";

export default {
    components: { UserInfoSettings },
    setup() {
        const { user } = useUser();

        const { toggleSettings } = useSettings()

        return {
            user,
            toggleSettings
        }
    }
}