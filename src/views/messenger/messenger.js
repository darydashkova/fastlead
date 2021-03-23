import MessengerContent from "../../components/MessengerContent/messenger-content.vue";
import BaseContextMenu from "../../components/Base/BaseContextMenu.vue"

import { useUser } from "../../composition/useUser";
import { provide, ref } from "vue"
import { useFolder } from "../../composition/useFolder";
import {useContextMenu} from "../../composition/useContextMenu";
export default {
    components: { MessengerContent, BaseContextMenu },
    setup() {
        const { user, getUser } = useUser();
        const { getAllFolders } = useFolder()
        const { isContextOpened } = useContextMenu()

        getUser();
        getAllFolders();
        provide('user', user);

        return {
            isContextOpened
        }
    },
}