import autoresponderActions from "../api/autoresponderActions";
import { reactive, computed } from 'vue';


const autoresponders = reactive({
    data: [],
})

const autorespondersActions = reactive({
    data: [],
    idInc: 0,
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
                    id: autorespondersActions.idInc,
                })
                autorespondersActions.actions.setIdsCount(autorespondersActions.idInc + 1)
            }
        },
        setIdsCount(count) {
            autorespondersActions.idInc = count;
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

            autorespondersActions.data.sort((a, b) => {
                if (a.start_condition[0].type && !b.start_condition[0].type) {
                    return -1;
                } else if (b.start_condition[0].type && !a.start_condition[0].type) {
                    return 1;
                } else {
                    return 0;
                }
            })
        },
        setNewActions(data) {
            autorespondersActions.data = [...data];
            autorespondersActions.data.sort((a, b) => {
                if (a.start_condition[0].type && !b.start_condition[0].type) {
                    return -1;
                } else if (b.start_condition[0].type && !a.start_condition[0].type) {
                    return 1;
                } else {
                    return 0;
                }
            })
        },
        del(id) {
            autorespondersActions.data = autorespondersActions.data.filter(item => item.id !== id)
        },
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