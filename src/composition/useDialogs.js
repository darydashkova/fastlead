import {computed, reactive, ref} from 'vue';
import dialogsActions from "../api/dialogsActions";
import {useMessages} from "./useMessages";
import {useFolder} from "./useFolder";

const dialogs = reactive({
    data: [],
})

const selectedDialog = ref(null);

export function useDialogs() {
    const { getAllFolders } = useFolder();

    const getDialogs = async (folder_id, offset = 0) => {
        await dialogsActions.getDialogsFromFolder(folder_id, offset)
            .then(r => {
                if (offset > 0) {
                    dialogs.data = dialogs.data.concat(r.dialogues);
                } else {
                    dialogs.data = [...r.dialogues];
                }
            })
    }

    const deleteDialog = async (dialog_id) => {
        await dialogsActions.deleteDialog(dialog_id);
    }

    const setRead = () => {
        dialogsActions.readDialog(selectedDialog.value)
            .then(() => {
                let dialog = dialogs.data.find(i => i.dialog_id === selectedDialog.value);
                if (dialog) {
                    getAllFolders();
                    dialog.is_read = true;
                    dialog.unread = 0;
                }
            })
    }

    const selectDialog = (dialog_id) => {
        selectedDialog.value = dialog_id;
        localStorage.setItem('dialog_id', dialog_id);
    }

    const setDialogs = (newDialogs) => {
        dialogs.data = [...newDialogs];
    }

    return {
        dialogs: computed(() => dialogs.data),
        selectedDialog,

        setRead,
        selectDialog,
        getDialogs,
        setDialogs,
        deleteDialog,
    }
}