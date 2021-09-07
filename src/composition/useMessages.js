import { computed, reactive, ref } from 'vue';
import messagesActions from "../api/messagesActions";
import {useDialogs} from "./useDialogs";

const messages = reactive({
    data: {}
})

const activeperem = ref(false);

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
                    activeperem.value = messages.data.is_active;
                    }
                     if(messages.data.type === 'WhatsappDialog'){
                         if(messages.data.is_active&&messages.data.whatsapp.is_active){
                            activeperem.value = true;  
                         }
                         else{
                            activeperem.value = false; 
                         }
                    }
                     if(messages.data.type === 'InstagramDialog'){
                        if(messages.data.is_active&&messages.data.instagram.is_active){
                            activeperem.value = true;  
                         }
                         else{
                            activeperem.value = false; 
                         }
                    } 
            })
    }
    const setListRef = (value) => {
        listRef.value = value;
    }
    const getRandomInRange = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    const addMessage = (message) => {
        let isExists=false;
        let messageId=null;
        const uid = message.message_uid;
        let FindeUid = messages.data.message.findIndex(message => message.message_uid == uid);
        if(FindeUid){
            isExists=true;
            messageId=FindeUid;
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
        activeperem,
        getRandomInRange
    }
}