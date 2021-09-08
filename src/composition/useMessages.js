import { computed, reactive, ref } from 'vue';
import messagesActions from "../api/messagesActions";
import {useDialogs} from "./useDialogs";

const messages = reactive({
    data: {}
})

const is_active = ref(false);
const local = ref();
const listRef = ref(null);

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
                    is_active.value = messages.data.is_active;
                    local.value=true;
                    }
                     if(messages.data.type === 'WhatsappDialog'){
                         if(messages.data.is_active&&messages.data.whatsapp.is_active){
                            is_active.value = true;  
                         }
                         else{
                            is_active.value = false; 
                         }
                    }
                     if(messages.data.type === 'InstagramDialog'){
                        if(messages.data.is_active&&messages.data.instagram.is_active){
                            is_active.value = true;  
                         }
                         else{
                            is_active.value = false; 
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
            let findeUid = messages.data.message.findIndex(message => message.message_uid == uid);
         
            if(findeUid!=-1){
                messageId=findeUid;
                messages.data.message[messageId]=message;
            }
           else{
            console.log('push')
              messages.data.message.push(message);  
           }

            goBottom();
        }
        const addSendedMessage = (message) => {
            if(!local.value){
              messages.data.message.push(message);   
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
        is_active,
        getRandomInRange,
        local,
    }
}