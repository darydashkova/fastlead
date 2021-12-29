import MessengerContentNav from './MessengerContentNav/messenger-content-nav.vue'
import SettingsNavNew from '../../components/SettingsContainer/SettingsNavNew/settings-nav.vue'

import MessengerContentSidebar from './MessengerContentDialogs/messenger-content-dialogs'
import MessengerContentPersonalMessages from './MessengerContentPersonalMessages/messenger-content-personal-messages'
import MessengerContentHeader from './MessangerContentHeader/messanger-content-header'
import UserInfo from '../UserInfo/user-info.vue'
import { useUserInfo } from "../../composition/useUserInfo";
import { useFolder } from "../../composition/useFolder";
import { useDialogs } from "../../composition/useDialogs";
import ModalEditSelectFolder from "../../components/Modals/dialogs/ModalEditSelectFolder.vue"
import FullScreenLoader from "../FullScreenLoader";
import ModalEditSelectFolderChild from '../../components/Modals/dialogs/ModalEditSelectFolderChild.vue'
import {ref} from 'vue'

export default {
    components: { 
        MessengerContentNav, 
        MessengerContentSidebar, 
        MessengerContentPersonalMessages, 
        UserInfo, 
        SettingsNavNew,
        MessengerContentHeader,
        ModalEditSelectFolder,
        ModalEditSelectFolderChild,
        FullScreenLoader
    },
    setup() {
        const { openedUserInfo } = useUserInfo()
        const { selectedDialog } = useDialogs();
        const addParentFolder = ()=>{
       
        }
        const loading = ref(false);
        const toggleModalEditSelectFolder = ref(false);
        const toggleModalEditSelectFolderChild = ref(false)
        const { selectedFolder, folders, getAllFolders } = useFolder();
        const folderId = ref()

        const getFolderEdit = () => {
            const name = ref()
           if(folders.value) {   
           const parent = ref(null);
           parent.value =folders.value.filter(i => i.folder_id == selectedFolder.value);
           const children = ref()
           if(parent.value&&parent.value[0]){
             folderId.value =  parent.value[0]
             toggleModalEditSelectFolder.value = true;
           }
           else  {
               for(let i = 0; i< folders.value.length; i++){
                   if(folders.value[i].folders){
                       children.value= folders.value[i].folders.filter(i => i.folder_id == selectedFolder.value)
                       if(children.value&&children.value[0]){
                           folderId.value = children.value[0]
                           toggleModalEditSelectFolderChild.value = true
                       }
                   }
               }
           }
           }
        
       }
       const newFolders = ref(false);
       const getFoldersForUpdate = () => {
        loading.value = true
        getAllFolders()
        .then((r)=>{
            toggleModalEditSelectFolder.value = false;
            toggleModalEditSelectFolderChild.value = false;
            newFolders.value=true;
            loading.value = false
        })
        newFolders.value=false;
       }
        const isId = ref()
        const getId = (id) => {
            isId.value = id
        }
         getFoldersForUpdate()
        return {
            openedUserInfo,
            addParentFolder,
            getId,
            isId,
            selectedDialog,
            toggleModalEditSelectFolderChild,
            toggleModalEditSelectFolder,
            folders,
            folderId,
            getFolderEdit,
            getFoldersForUpdate,
            newFolders,
            loading
        }
    }
}