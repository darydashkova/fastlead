import MessengerContentNav from './MessengerContentNav/messenger-content-nav.vue'
import SettingsNavNew from '../../components/SettingsContainer/SettingsNavNew/settings-nav.vue'

import MessengerContentSidebar from './MessengerContentDialogs/messenger-content-dialogs'
import MessengerContentPersonalMessages from './MessengerContentPersonalMessages/messenger-content-personal-messages'
import UserInfo from '../UserInfo/user-info.vue'
import { useUserInfo } from "../../composition/useUserInfo";

export default {
    components: { MessengerContentNav, MessengerContentSidebar, MessengerContentPersonalMessages, UserInfo, SettingsNavNew},
    setup() {
        const { openedUserInfo } = useUserInfo()
        return {
            openedUserInfo,
        }
    }
}