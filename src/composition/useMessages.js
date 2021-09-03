import { computed, reactive, ref } from 'vue';
import messagesActions from "../api/messagesActions";
import {useDialogs} from "./useDialogs";

const messages = reactive({
    data: {}
})

const activePerem = ref(false);

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
                    activePerem.value = messages.data.is_active;
                    }
                     if(messages.data.type === 'WhatsappDialog'){
                         if(messages.data.is_active&&messages.data.whatsapp.is_active){
                            activePerem.value = true;  
                         }
                         else{
                            activePerem.value = false; 
                         }
                    }
                     if(messages.data.type === 'InstagramDialog'){
                        if(messages.data.is_active&&messages.data.instagram.is_active){
                            activePerem.value = true;  
                         }
                         else{
                            activePerem.value = false; 
                         }
                    } 
            })
    }
    const setListRef = (value) => {
        listRef.value = value;
    }
    const addMessage = (message) => {
        let isExists=false;
        let messageId=null;
        for(let i =(messages.data.message).length-1; i>0;i--){
            if(message.message_uid==messages.data.message[i].message_uid){
                isExists=true;
                messageId=i;
                break;
            }
        }
       if(!isExists){
          messages.data.message.push(message);  
       }
       else{
        messages.data.message[messageId]=message;
       }
        goBottom();
    }
    const addSendedMessage = (message) => {
        messages.data.message.push(message);   
        goBottom();
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
        activePerem
    }
}