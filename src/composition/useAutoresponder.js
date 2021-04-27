import autoresponderActions from "../api/autoresponderActions";
import { reactive, computed } from 'vue';


const autoresponders = reactive({
    data: [],
})

const autorespondersActions = reactive({
    data: [],
    actions: {
        addAction(obj) {
            if (obj) {
                autorespondersActions.data.push(obj);
            } else {
                autorespondersActions.data.push({
                    action_type: null,
                    action_data: {
                        type: null,
                        data: null,
                    },
                    else_action_type: null,
                    else_action_data: {
                        type: null,
                        data: null,
                    },
                    start_condition: [
                        {
                            type: null,
                            data: {
                                count: 0,
                                text: ''
                            }
                        },
                    ],
                    disable_dialog: false,
                })
            }

        },
        changeProperty( value, index, property ) {
            autorespondersActions.data[index][property] = value;
        },
        edit(index) {
            autorespondersActions.indexToEdit = index;
            autorespondersActions.isOpenedEdit = true;
        },
        cancelEdit() {
            autorespondersActions.indexToEdit = null;
            autorespondersActions.isOpenedEdit = false;
        },
        changeAutoresponder(index, data) {
            autorespondersActions.data[index] = {...data};
        },
        setNewActions(data) {
            autorespondersActions.data = [...data];
        }
    },
    isOpenedEdit: false,
    indexToEdit: null,

})



export function useAutoresponders() {

    const createAutoresponder = async (data) => {
        return await autoresponderActions.createAutoresponder(data);
    }

    const getAutoresponders = async () => {
        return await autoresponderActions.getAutoresponders()
            .then(r => {
                autoresponders.data = [...r.autoresponders];
                return r.autoresponders;
            })
    }

    const deleteAutoresponder = async (ids) => {
        return await autoresponderActions.deleteAutoresponders(ids)
    }

    const stopAutoresponder = async (ids) => {
        return await autoresponderActions.stopAutoresponders(ids)
    }

    const restoreAutoresponder = async (ids) => {
        return await autoresponderActions.restoreAutoresponders(ids)
    }
    const getSingleAutoresponder = async (id) => {
        return await autoresponderActions.getSingleAutoresponder(id);
    }
    const updateAutoresponder = async (data) => {
        return await autoresponderActions.updateAutoresponder(data);
    }

    return {
        createAutoresponder,
        getAutoresponders,
        deleteAutoresponder,
        restoreAutoresponder,
        stopAutoresponder,
        getSingleAutoresponder,
        updateAutoresponder,

        autoresponders: computed(() => autoresponders.data),
        autorespondersActions,
    }
}