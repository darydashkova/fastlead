import { computed, reactive, ref } from 'vue';
import messagesActions from "../api/messagesActions";
import {useDialogs} from "./useDialogs";

const messages = reactive({
    data: {}
})

const isActiveDialog = ref(false);
const local = ref();
const listRef = ref(null);
const preloaderActive = ref(true);

export function useMessages() {
    const { setRead, selectDialog } = useDialogs()
    const getMessagesFromDialog = async (dialog_id) => {
        await messagesActions.getDialog(dialog_id)
            .then(r => {
                if (r.error) {
                    selectDialog(null);
                    return;
                }
                messages.data = {...r};
                goBottom();
               
                if(messages.data.type === 'LocalDialog'){
                    isActiveDialog.value = messages.data.is_active;
                    local.value=true;
                    }
                     if(messages.data.type === 'WhatsappDialog'){
                         if(messages.data.is_active&&messages.data.whatsapp.is_active){
                            isActiveDialog.value = true;  
                         }
                         else{
                            isActiveDialog.value = false; 
                         }
                    }
                     if(messages.data.type === 'InstagramDialog'){
                        if(messages.data.is_active&&messages.data.instagram.is_active){
                            isActiveDialog.value = true;  
                         }
                         else{
                            isActiveDialog.value = false; 
                         }
                    } 
            })
    }
    const setListRef = (value) => {
        listRef.value = value;
    }
    const getRandomInRange = () => {
        let result       = '';
        const words        = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
        const max_position = words.length - 1;
            for( let i = 0; i < 10; ++i ) {
               let position = Math.floor ( Math.random() * max_position );
                result = result + words.substring(position, position + 1);
            }
        return result;
        }
        const addMessage = (message) => {
            let messageId=null;
            const uid = message.message_uid;
            let findeUid = messages.data.messages.findIndex(message => message.message_uid == uid);
            if(findeUid != -1){
                messageId=findeUid;
                messages.data.messages[messageId]=message;
            }
           else{
              messages.data.messages.push(message);  
           }
           preloaderActive.value = false
            goBottom();
        }
        const addSendedMessage = (message) => {
            if(!local.value){
              messages.data.messages.push(message);   
              preloaderActive.value = true;
            goBottom(); 
            }
            
        }
    const goBottom = () => {
        setTimeout(() => {
            setRead()
            listRef.value.scrollTop = listRef.value.scrollHeight;
        }, 100)
    }
 
    return {
        messages: computed(() => messages.data),
        getMessagesFromDialog,
        addMessage,
        addSendedMessage,
        setListRef,
        listRef,
        goBottom,
        isActiveDialog,
        getRandomInRange,
        local,
        preloaderActive
    }
}