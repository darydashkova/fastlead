import MessengerContent from "../../components/MessengerContent/messenger-content.vue";
import ModalCreateFolder from "../../components/Modals/ModalCreateFolder.vue"
import ModalCreateChat from "../../components/Modals/ModalCreateChat.vue"
import ModalAddToFolder from "../../components/Modals/ModalAddToFolder.vue"
import ModalEditFolders from "../../components/Modals/dialogs/ModalFoldersEditNew.vue"
import ModalMoveChat from "../../components/Modals/ModalMoveChat.vue"
import ModalConfirmDelete from "../../components/Modals/ModalConfirmDelete.vue"

import ContextMenu from "../../components/ContextMenu.vue"


import { onUnmounted, onMounted } from "vue"

import { useUser } from "../../composition/useUser";
import { useFolder } from "../../composition/useFolder";
import { useContextMenu } from "../../composition/useContextMenu";
import { useSocket } from "../../composition/useSocket";
import { useDialogs } from "../../composition/useDialogs";
import { useMessages } from "../../composition/useMessages";
import { useModals } from "../../composition/useModals";


import {useModalConfirmDelete} from "../../composition/useModalConfirmDelete";

export default {
    components: {
        MessengerContent,
        ModalCreateFolder,
        ModalCreateChat,
        ModalAddToFolder,
        ModalEditFolders,
        ModalMoveChat,
        ModalConfirmDelete,

        ContextMenu,
    },
    setup() {
        const { user, getUser } = useUser();
        const { getAllFolders, selectFolder, folders, getAllFoldersInFolder } = useFolder();
        const { isContextOpened } = useContextMenu();
        const { socket, refreshSocket } = useSocket();
        const { selectDialog, getDialogs, toggleAllSelectedGroupDialogs } = useDialogs();
        const { getMessagesFromDialog } = useMessages();
        refreshSocket();
        const {
            openedModalCreateFolder,
            openedModalCreateChat,
            openedModalAddToFolder,
            openedModalEditFolders,
            openedModalMoveChat
        } = useModals();
        const { openedModalConfirmDelete } = useModalConfirmDelete();

        getUser();
        getAllFolders()
            .then(() => {
                let folder_id = localStorage.getItem('folder_id');
                if (folder_id) {
                    selectFolder(+folder_id);
                    getDialogs(+folder_id);
                    getAllFoldersInFolder(+folder_id, true);
                } else {
                    let def = +folders.value.find(i => i.is_default).folder_id;
                    selectFolder(def);
                    getDialogs(def);
                }
                let dialog_id = localStorage.getItem('dialog_id');
                if (dialog_id) {
                    selectDialog(+dialog_id);
                    getMessagesFromDialog(+dialog_id);
                }
            })


            const closeModalEditFoldersNew = () => {
                openedModalEditFolders.value = false;
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
            closeModalEditFoldersNew,
            openedModalConfirmDelete,
        }
    },
}