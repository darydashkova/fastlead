<template>
    <div class="settings-autoresponder-create">
        <template v-if="!isSecondStep">
            <div class="settings-autoresponder-create__input-column">
                <BaseInputGroup
                    :error="!!errors.find(i => i === 'name')"
                    :value="infoToSend.name"
                    :placeholder="'Название автоответчика не отображается у получателей'"
                    :dynamic-id="'settings-autoresponder-create__name'"

                    @inputValue="inputName"
                >
                    Название
                </BaseInputGroup>
                <div class="settings-autoresponder-create__row">
                    <div class="settings-autoresponder-create__input-group">
                        <label class="settings-autoresponder-create__label">
                            Дата запуска
                        </label>
                        <div class="settings-autoresponder-create__iconed-input">
                            <button class="settings-autoresponder-create__input settings-autoresponder-create__input_selector"
                                    @click="toggleModalCalendar(true)"
                            >
                                <div class="settings-autoresponder-create__select-item pointer">
                                    {{time? `${validDate(time, true)} ${validTime(time)}` : 'Выбрать дату'}}
                                </div>
                            </button>
                        </div>
                    </div>
                    <div class="settings-autoresponder-create__input-group">
                        <label class="settings-autoresponder-create__label">
                            Активация автоответчика от:
                        </label>
                        <div class="settings-autoresponder-create__iconed-input">
                            <button class="settings-autoresponder-create__input settings-autoresponder-create__input_selector pointer"
                                    @click="openModalChoiceFolder"
                            >
                                <div class="settings-autoresponder-create__select-item">
                                    {{recipients.selectedMessage}}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <SettingsAutoresponderDiagram
                ref="diag"
            ></SettingsAutoresponderDiagram>
        </template>

        <div class="settings-autoresponder-create__footer">
            <BaseSteps
                    :isSecondStep="isSecondStep"
                    @gotoStep="gotoStep"
            ></BaseSteps>
            <BaseButton v-if="!isSecondStep" class="base-button_enter base-button_p5-15" @click="gotoStep(true)">Продолжить</BaseButton>
            <BaseButton v-else-if="actions.isOpenedEdit" class="base-button_enter base-button_p5-15" @click="saveChanges()">Сохранить изменения</BaseButton>
            <BaseButton v-else class="base-button_enter base-button_p5-15" @click="create">Создать</BaseButton>
        </div>
        <teleport to="body">
            <ModalChoiceFolder v-if="openedModalChoiceFolder" style="z-index: 500"></ModalChoiceFolder>
            <ModalCalendar
                    :time="time"
                    @selectDate="selectDate"
                    v-if="openedModalCalendar"
            ></ModalCalendar>
        </teleport>
    </div>
</template>

<script>
    import BaseButton from '../../Base/BaseButton.vue'
    import BaseCircleIcon from '../../Base/BaseCircleIcon.vue'
    import ModalCalendar from '../../Modals/ModalCalendar.vue'
    import BaseSteps from '../../Base/BaseSteps.vue'
    import BaseInputGroup from '../../Base/BaseInputGroup.vue'
    import ModalMoveChat from '../../Modals/ModalMoveChat.vue'
    import ModalCreateChat from '../../Modals/ModalCreateChat.vue'
    import ModalChoiceFolder from '../../Modals/ModalChoiceFolder.vue'
    import SettingsAutoresponderDiagram from './SettingsAutoresponderDiagram/settings-autoresponder-diagram.vue'

    import { ref, reactive, computed, onMounted } from 'vue'
    import { useModals } from "../../../composition/useModals";
    import { useFolder } from "../../../composition/useFolder";
    import { useDate } from "../../../composition/useDate";
    import { useAutoresponders } from "../../../composition/useAutoresponder";
    import {useModalCalendar} from "../../../composition/useModalCalendar";
    import {useModalChoiceFolder} from "../../../composition/useModalChoiceFolder";

    export default {
        props: {
            selectedAutoresponderToEdit: {
                name: String,
            }
        },
        components: {
            BaseButton,
            BaseCircleIcon,
            ModalCalendar,
            ModalChoiceFolder,
            BaseSteps,
            BaseInputGroup,
            ModalMoveChat,
            ModalCreateChat,
            SettingsAutoresponderDiagram,
        },
        setup(props, {emit}) {
            const { toggleModalMoveChat, toggleModalCreateChat } = useModals();
            const { toggleModalCalendar, openedModalCalendar } = useModalCalendar()
            const { setSaveCallbackModalChoiceFolder, selectedFolders, toggleModalChoiceFolder, openedModalChoiceFolder } = useModalChoiceFolder()
            const { getAllFolders, folders } = useFolder();

            const { validDate, validTime } = useDate();

            const { autorespondersActions, createAutoresponder, updateAutoresponder } = useAutoresponders();

            const autoresponderEdit = ref(null);

            const saveChanges = () => {
                autoresponderEdit.value.save();
            }
            const cancelEdit = () => {
                autoresponderEdit.value.cancel();
            }


            const isSecondStep = ref(false);

            const gotoStep = (boolean) => {
                isSecondStep.value = boolean;
            }
            const openModalChoiceFolder = () => {
                selectedFolders.value = [...recipients.folder_ids];
                setSaveCallbackModalChoiceFolder((ids) => {
                    recipients.folder_ids = [...ids];
                })
                toggleModalChoiceFolder(true)
            }
            const recipients = reactive({
                folder_ids: [],
                selectedMessage: computed(() => {
                    return recipients.folder_ids.length
                        ? `Выбрано ${recipients.folder_ids.length + ' папки'}`
                        : 'Выбрать папку'
                }),
            })
            const selectDate = (time) => {
                infoToSend.time_start = Math.floor(time / 1000);
            }
            const inputName = ($event) => {
                infoToSend.name = $event;
            }

            const infoToSend = reactive({
                name: '',
                time_start: null,
            })

            const addAction = () => {
                autorespondersActions.actions.addAction();
            }

            const errors = ref([]);

            const create = () => {
                let body = {
                    name: infoToSend.name,
                }
                infoToSend.time_start && (body.time_start = +infoToSend.time_start);

                errors.value = [];
                body.send = {
                    folder_ids: [...recipients.folder_ids]
                }
                if (!body.send.folder_ids.length) {
                    errors.value.push('recipients')
                }
                (!body.name.length) && errors.value.push('name');

                body.actions = autorespondersActions.data.map(i => {
                    let newObj = {
                        action_data: i.action_data,
                        action_type: i.action_type,
                        disable_dialog: i.disable_dialog,
                    }
                    i.else_action_type && (newObj.else_action_type = i.else_action_type);
                    if (i.start_condition.length < 2) {
                        if (i.start_condition[0].type) {
                            newObj.start_condition =  [...i.start_condition]
                        }
                    } else {
                        newObj.start_condition =  [...i.start_condition]
                    }

                    if (typeof i.else_action_data === "string" || i.else_action_data === "number") {
                        newObj.else_action_data = i.else_action_data
                    } else {
                        i.else_action_data.data && (newObj.else_action_data = i.else_action_data)
                    }
                    return newObj;
                });

                let errsActions = autorespondersActions.data
                    .filter(i => {
                        return !i.action_type && ((typeof i.action_data === "string") || (typeof i.action_data === "number")? !i.action_data : !i.action_data.data)
                    })
                    .map(i => i.id);

                (errsActions.length) && errors.value.push({
                    name: 'actions',
                    data: errsActions,
                })


                if (errors.value.length) {
                    if (errors.value.find(i => i === 'recipients') || errors.value.find(i => i === 'name')) {
                        gotoStep(false)
                    } else if (errors.value.find(i => i.name === 'actions')) {
                        gotoStep(true);
                    }
                    return;
                }
                if (props.selectedAutoresponderToEdit) {
                    body.autoresponder_id = props.selectedAutoresponderToEdit.autoresponder_id;
                    updateAutoresponder(body)
                        .then((r) => {
                            if (r.error) {
                                errors.value.push('name');
                                gotoStep(false)
                                return;
                            }
                            emit('gotoTable')
                        })
                } else {
                    createAutoresponder(body)
                        .then((r) => {
                            if (r.error) {
                                errors.value.push('name');
                                gotoStep(false)
                                return;
                            }
                            emit('gotoTable')
                        })
                }
            };




            onMounted(() => {
                if (props.selectedAutoresponderToEdit) {
                    let toEdit = props.selectedAutoresponderToEdit;
                    infoToSend.name = toEdit.name;
                    toEdit.time_start && (infoToSend.time_start = toEdit.time_start);

                    getAllFolders()

                    if (toEdit.send.folder_ids) {
                        recipients.folder_ids = [...toEdit.send.folder_ids];
                    }

                    if (toEdit.actions.length) {
                        let newArrActions = toEdit.actions.map((item, superIndex) => {
                            let actions = {
                                disable_dialog: item.disable_dialog,
                                action_type: item.action_type,
                                else_action_type: item.else_action_type,
                            }
                            if (item.start_condition.length) {
                                actions.start_condition = item.start_condition;
                            } else {
                                actions.start_condition = [
                                    {
                                        type: null,
                                        data: {
                                            count: 0,
                                            text: ''
                                        }
                                    },
                                ]
                            }
                            if (item.action_type === 'SendMessage') {
                                actions.action_data = {
                                    type: item.action_data.type,
                                    data: item.action_data.message,
                                }
                            } else {
                                actions.action_data = item.action_data
                            }
                            if (item.else_action_type === 'SendMessage') {
                                actions.else_action_data = {
                                    type: item.else_action_data.type,
                                    data: item.else_action_data.message,
                                }
                            } else {
                                (item.else_action_data === null)
                                    ? (actions.else_action_data = {
                                        type: null,
                                        data: null,
                                    })
                                    : (actions.else_action_data = item.else_action_data)
                            }

                            actions.id = superIndex;

                            return actions;
                        });

                        autorespondersActions.actions.setNewActions(newArrActions);
                        autorespondersActions.actions.setIdsCount(newArrActions.length);

                    } else {
                        autorespondersActions.actions.setNewActions([]);
                        autorespondersActions.actions.setIdsCount(0);
                    }

                } else {
                    autorespondersActions.actions.setNewActions([]);
                    autorespondersActions.actions.setIdsCount(0);
                }



            })



            const diag = ref(null);


            return {
                isSecondStep,
                gotoStep,

                openModalChoiceFolder,
                openedModalChoiceFolder,

                toggleModalMoveChat,
                toggleModalCreateChat,

                recipients,
                folders,

                infoToSend: infoToSend,

                time: computed(() => infoToSend.time_start),

                create,
                errors,

                selectDate,
                validDate,
                validTime,
                inputName,

                actions: computed(() =>  autorespondersActions),
                actionsData: computed({
                    get() {
                        return autorespondersActions.data;
                    },
                    set(newValue) {
                        autorespondersActions.actions.setNewActions(newValue)
                    }
                }),

                saveChanges,
                addAction,


                autoresponderEdit,
                cancelEdit,

                toggleModalCalendar,
                openedModalCalendar,


                diag,


            }
        }
    }
</script>

<style lang="scss" src="./settings-autoresponder-create.scss"></style>