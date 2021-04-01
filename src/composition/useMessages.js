import { computed, reactive, ref } from 'vue';
import messagesActions from "../api/messagesActions";
import {useDialogs} from "./useDialogs";

const messages = reactive({
    data: {}
})

const listRef = ref(null);

export function useMessages() {
    const { setRead } = useDialogs()


    const getMessagesFromDialog = async (dialog_id) => {
        await messagesActions.getDialog(dialog_id)
            .then(r => {
                messages.data = {...r};
                goBottom();
            })
    }

    const setListRef = (value) => {
        listRef.value = value;
    }

    const addMessage = (message) => {
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

        setListRef,
        listRef,
        goBottom,
    }
}