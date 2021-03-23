import {computed, reactive, ref} from 'vue';
import messagesActions from "../api/messagesActions";

const messages = reactive({
    data: {}
})


export function useMessages() {
    const getMessagesFromDialog = async (dialog_id) => {
        await messagesActions.getDialog(dialog_id)
            .then(r => {
                messages.data = {...r};
            })
    }

    const addMessage = (message) => {
        messages.data.message.push({
            is_me: true,
            is_read: false,
            message: message,
            message_id: message,
            time: new Date().getTime() / 1000,
            type: 'text',
        })
    }

    return {
        messages: computed(() => messages.data),
        getMessagesFromDialog,
        addMessage
    }
}