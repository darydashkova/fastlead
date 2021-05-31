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
import ModalChoiceActivationMethod from "../../components/Modals/ModalChoiceActivationMethod.vue"
import ModalChoiceActivationMethodMyself from "../../components/Modals/ModalChoiceActivationMethodMyself.vue"
import ModalChoiceActivationMethodSuccess from "../../components/Modals/ModalChoiceActivationMethodSuccess.vue"
import ModalChoiceActivationMethodNotMyself from "../../components/Modals/ModalChoiceActivationMethodNotMyself.vue"
import ModalConfirmDelete from "../../components/Modals/ModalConfirmDelete.vue"
import ModalCreateMessageTemplate from "../../components/Modals/ModalCreateMessageTemplate.vue"

import {useModals} from "../../composition/useModals";
import {useModalsWhatsapps} from "../../composition/useModalsWhatsapps";
import {useModalConfirmDelete} from "../../composition/useModalConfirmDelete";
import {useModalMessageTemplate} from "../../composition/useModalMessageTemplate";

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
        ModalNewMessage,
        ModalChoiceActivationMethod,
        ModalChoiceActivationMethodMyself,
        ModalChoiceActivationMethodSuccess,
        ModalChoiceActivationMethodNotMyself,

        ModalConfirmDelete,
        ModalCreateMessageTemplate
    },
    setup() {
        const {
            openedModalCreateFolder,
            openedModalCreateChat,
            openedModalAddToFolder,
            openedModalEditFolders,
            openedModalMoveChat,
            openedModalNewMessage,
            openedModalChangeAva,
        } = useModals()
        const {
            openedModalActivationMethod,
            openedModalActivationMethodMyself,
            openedModalActivationMethodSuccess,
            openedModalActivationMethodNotMyself,
            openedModalCreateWhatsapp,
            openedModalSyncWhatsapp,
        } = useModalsWhatsapps()
        const { openedModalConfirmDelete } = useModalConfirmDelete()
        const { openedModalCreateMessageTemplate } = useModalMessageTemplate()

        return {
            openedModalCreateFolder,
            openedModalCreateChat,
            openedModalAddToFolder,
            openedModalEditFolders,
            openedModalMoveChat,
            openedModalChangeAva,
            openedModalNewMessage,

            openedModalActivationMethod,
            openedModalActivationMethodMyself,
            openedModalActivationMethodSuccess,
            openedModalActivationMethodNotMyself,
            openedModalCreateWhatsapp,
            openedModalSyncWhatsapp,

            openedModalConfirmDelete,
            openedModalCreateMessageTemplate,
        }
    }
}