import {computed, reactive, ref} from 'vue';
import dialogsActions from "../api/dialogsActions";

const dialogs = reactive({
    data: [],
})

const selectedDialog = ref(null);

export function useDialogs() {
    const getDialogs = async (folder_id, offset = 0) => {
        await dialogsActions.getDialogsFromFolder(folder_id, offset)
            .then(r => {
                if (offset > 0) {
                    dialogs.data = dialogs.data.concat(r.dialogues);
                    if (!r.dialogues.length) {
                    }
                } else {
                    dialogs.data = [...r.dialogues]
                }
            })
    }

    const deleteDialog = async (dialog_id) => {
        await dialogsActions.deleteDialog(dialog_id);
    }

    const selectDialog = (dialog_id) => {
        selectedDialog.value = dialog_id;
    }

    const setDialogs = (newDialogs) => {
        dialogs.data = [newDialogs];
    }

    return {
        dialogs: computed(() => dialogs.data),
        selectedDialog,

        selectDialog,
        getDialogs,
        setDialogs,
        deleteDialog,
    }
}