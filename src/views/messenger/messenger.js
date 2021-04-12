import MessengerContent from "../../components/MessengerContent/messenger-content.vue";
import BaseContextMenu from "../../components/Base/BaseContextMenu.vue"
import ModalCreateFolder from "../../components/Modals/ModalCreateFolder.vue"
import ModalCreateChat from "../../components/Modals/ModalCreateChat.vue"
import ModalAddToFolder from "../../components/Modals/ModalAddToFolder.vue"
import ModalEditFolders from "../../components/Modals/ModalEditFolders.vue"
import ModalMoveChat from "../../components/Modals/ModalMoveChat.vue"

import { provide, onUnmounted, onMounted } from "vue"

import { useUser } from "../../composition/useUser";
import { useFolder } from "../../composition/useFolder";
import { useContextMenu } from "../../composition/useContextMenu";
import { useSocket } from "../../composition/useSocket";
import { useDialogs } from "../../composition/useDialogs";
import { useMessages } from "../../composition/useMessages";
import { useModals } from "../../composition/useModals";
export default {
    components: {
        MessengerContent,
        BaseContextMenu,
        ModalCreateFolder,
        ModalCreateChat,
        ModalAddToFolder,
        ModalEditFolders,
        ModalMoveChat
    },
    setup() {
        const { user, getUser } = useUser();
        const { getAllFolders, selectFolder, folders } = useFolder();
        const { isContextOpened } = useContextMenu();
        const { socket } = useSocket();
        const { selectDialog, getDialogs, toggleAllSelectedGroupDialogs } = useDialogs();
        const { getMessagesFromDialog } = useMessages();

        const {
            openedModalCreateFolder,
            openedModalCreateChat,
            openedModalAddToFolder,
            openedModalEditFolders,
            openedModalMoveChat
        } = useModals()

        getUser();
        getAllFolders();
        provide('user', user);

        const setFirst = () => {
            if (!folders.value.length) {
                setTimeout(() => {
                    setFirst()
                }, 100)
            } else {
                selectFolder(+folders.value[0].folder_id);
                getDialogs(+folders.value[0].folder_id);
            }
        }

        let folder_id = localStorage.getItem('folder_id');
        if (folder_id) {
            selectFolder(+folder_id);
            getDialogs(+folder_id);
        } else {
            setFirst();
        }
        let dialog_id = localStorage.getItem('dialog_id');
        if (dialog_id) {
            selectDialog(+dialog_id);
            getMessagesFromDialog(+dialog_id);
        }

        onMounted(() => {
            document.addEventListener('keyup', close);
        })
        onUnmounted(() => {
            document.removeEventListener('keyup', close);
        })

        const close = (e) => {
            if (e.keyCode === 27) {
                toggleAllSelectedGroupDialogs(false)
            }
        }

        return {
            isContextOpened,

            openedModalCreateFolder,
            openedModalCreateChat,
            openedModalAddToFolder,
            openedModalEditFolders,
            openedModalMoveChat,
        }
    },
}