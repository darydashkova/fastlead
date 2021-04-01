import MessengerContentNav from './MessengerContentNav/messenger-content-nav'
import MessengerContentSidebar from './MessengerContentDialogs/messenger-content-dialogs'
import MessengerContentPersonalMessages from './MessengerContentPersonalMessages/messenger-content-personal-messages'
import UserInfo from '../UserInfo/user-info.vue'
import { useSettings } from "../../composition/useSettings";
export default {
    components: { MessengerContentNav, MessengerContentSidebar, MessengerContentPersonalMessages, UserInfo},
    setup() {
        const { openedSettings } = useSettings()
        return {
            openedSettings
        }
    }
}