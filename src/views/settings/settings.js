import SettingsContainer from '../../components/SettingsContainer/SettingsContainer.vue'
import ModalCreateFolder from "../../components/Modals/ModalCreateFolder.vue"
import ModalCreateChat from "../../components/Modals/ModalCreateChat.vue"
import ModalAddToFolder from "../../components/Modals/ModalAddToFolder.vue"
import ModalEditFolders from "../../components/Modals/ModalEditFolders.vue"
import ModalMoveChat from "../../components/Modals/ModalMoveChat.vue"
import ModalCreateWhatsapp from "../../components/Modals/ModalCreateWhatsapp.vue"
import ModalSyncWhatsapp from "../../components/Modals/ModalSyncWhatsapp.vue"
import ModalChangeAva from "../../components/Modals/ModalChangeAva.vue"
import ModalNewMessage from "../../components/Modals/ModalNewMessage.vue"
import {useModals} from "../../composition/useModals";

export default {
    components: {
        SettingsContainer,
        ModalCreateFolder,
        ModalCreateChat,
        ModalAddToFolder,
        ModalEditFolders,
        ModalMoveChat,
        ModalCreateWhatsapp,
        ModalSyncWhatsapp,
        ModalChangeAva,
        ModalNewMessage
    },
    setup() {
        const {
            openedModalCreateFolder,
            openedModalCreateChat,
            openedModalAddToFolder,
            openedModalEditFolders,
            openedModalMoveChat,
            openedModalCreateWhatsapp,
            openedModalSyncWhatsapp,
            openedModalChangeAva,
            openedModalNewMessage
        } = useModals()

        return {
            openedModalCreateFolder,
            openedModalCreateChat,
            openedModalAddToFolder,
            openedModalEditFolders,
            openedModalMoveChat,
            openedModalCreateWhatsapp,
            openedModalSyncWhatsapp,
            openedModalChangeAva,
            openedModalNewMessage
        }
    }
}