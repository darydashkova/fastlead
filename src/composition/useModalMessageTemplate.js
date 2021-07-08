import { ref } from 'vue';
const openedModalCreateMessageTemplate = ref(false);
const messageTemplateToEdit = ref(null);

export function useModalMessageTemplate() {
    const toggleModalCreateMessageTemplate = (boolean) => {
        openedModalCreateMessageTemplate.value = boolean;
    }
    const setMessageTemplateToEdit = (template) => {
        messageTemplateToEdit.value = template;
    }

    return {
        openedModalCreateMessageTemplate,
        toggleModalCreateMessageTemplate,

        setMessageTemplateToEdit,
        messageTemplateToEdit
    }
}