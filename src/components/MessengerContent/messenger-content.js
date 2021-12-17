import MessengerContentNav from './MessengerContentNav/messenger-content-nav.vue'
import SettingsNavNew from '../../components/SettingsContainer/SettingsNavNew/settings-nav.vue'

import MessengerContentSidebar from './MessengerContentDialogs/messenger-content-dialogs'
import MessengerContentPersonalMessages from './MessengerContentPersonalMessages/messenger-content-personal-messages'
import MessengerContentHeader from './MessangerContentHeader/messanger-content-header'
import UserInfo from '../UserInfo/user-info.vue'
import { useUserInfo } from "../../composition/useUserInfo";
import { useDialogs } from "../../composition/useDialogs";
import {ref} from 'vue'

export default {
    components: { 
        MessengerContentNav, 
        MessengerContentSidebar, 
        MessengerContentPersonalMessages, 
        UserInfo, 
        SettingsNavNew,
        MessengerContentHeader
    },
    setup() {
        const { openedUserInfo } = useUserInfo()
        const { selectedDialog } = useDialogs();
        const addParentFolder = ()=>{
       
        }
        const isId = ref()
        const getId = (id) => {
            isId.value = id
        }
        
        return {
            openedUserInfo,
            addParentFolder,
            getId,
            isId,
            selectedDialog
        }
    }
}