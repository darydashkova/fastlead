import {computed, reactive, ref} from 'vue';
import dialogsActions from "../api/dialogsActions";
import {useMessages} from "./useMessages";
import {useFolder} from "./useFolder";

const dialogs = reactive({
    data: [],
})

const selectedDialog = ref(null);

const selectedGroupDialogs = reactive({
    data: [],
})

export function useDialogs() {
    const { getAllFolders } = useFolder();

    const getDialogs = async (folder_id, offset = 0) => {
        return await dialogsActions.getDialogsFromFolder(folder_id, offset)
            .then(r => {
                if (r.error) {
                    return;
                }
                if (offset > 0) {
                    dialogs.data = dialogs.data.concat(r.dialogues);
                } else {
                    dialogs.data = [...r.dialogues];
                }
                return r;
            })
    }

    const deleteDialog = async (dialog_ids) => {
        await dialogsActions.deleteDialog(dialog_ids);
    }

    const setRead = () => {
        dialogsActions.readDialog([selectedDialog.value])
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

    const createDialog = async (data) => {
        return await dialogsActions.createDialog(data)
    }

    const moveDialog = async (data) => {
        return await dialogsActions.moveDialog(data)
    }

    const dischargeDialog = async (data) => {
        return await dialogsActions.dischargeDialog(data);
    }

    const toggleSelectedGroupDialogs = (id) => {
        selectedGroupDialogs.data.find(i => i === id)
            ? selectedGroupDialogs.data = selectedGroupDialogs.data.filter(i => i !== id)
            : selectedGroupDialogs.data.push(id);
    }

    const toggleAllSelectedGroupDialogs = (boolean) => {
        if (boolean) {
            selectedGroupDialogs.data = dialogs.data.map(i => i.dialog_id);
        } else {
            selectedGroupDialogs.data = [];
        }
    }
    return {
        dialogs: computed(() => dialogs.data),
        selectedDialog,
        setRead,
        selectDialog,
        getDialogs,
        setDialogs,
        deleteDialog,
        createDialog,
        moveDialog,
        dischargeDialog,

        selectedGroupDialogs: computed(() => selectedGroupDialogs.data),
        toggleSelectedGroupDialogs,
        toggleAllSelectedGroupDialogs,
    }
}