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
        <SettingsAutoresponderDiagram v-show="isSecondStep"
            ref="diag"
            :blocks="blocks"
        ></SettingsAutoresponderDiagram>

        <div class="settings-autoresponder-create__footer">
            <BaseSteps
                    :isSecondStep="isSecondStep"
                    @gotoStep="gotoStep"
            ></BaseSteps>
            <BaseButton v-if="!isSecondStep" class="base-button_enter base-button_p5-15" @click="gotoStep(true)">Продолжить</BaseButton>
            <BaseButton v-else-if="isEdit" class="base-button_enter base-button_p5-15" @click="create">Сохранить изменения</BaseButton>
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

            const { createAutoresponder, updateAutoresponder } = useAutoresponders();

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
            const blocks = ref([]);

            const errors = ref([]);

            const convertDiagramToData = (diagram) => {
                let blocks = diagram
                    .filter(item => {
                        return !!(item.value.messageSettings || item.value.isStart)
                    })
                let firstStateDiagramData = blocks
                    .map(item => {
                        return {
                            pos: {
                                x: item.geometry.x,
                                y: item.geometry.y,
                            },
                            self_id: item.id,
                            value: item.value,
                            outputsFirstState: item.children.filter(i => i.value.isOutput)?.map((i, index) => {
                                return {
                                    id: i.id,
                                    name: item.value.isStart?
                                        item.value.condition.linksOutput[index] :
                                        item.value.messageSettings.linksOutput[index],
                                    type: item.value.isStart?
                                        item.value.condition.linksOutputTypes[index] :
                                        item.value.messageSettings.linksOutputTypes[index],
                                }
                            }),
                            inputsFirstState: item.children.filter(i => !i.value.isOutput)?.map(i => i.id),
                        }
                })
                let connectors =
                    diagram.filter(item => item.value.isConnect);
                let links =
                    diagram.filter(item => !item.value && item.source.id && item.target.id);

                links.forEach(item => {
                    let findedStart = firstStateDiagramData
                        .find(block => block.outputsFirstState
                            .find(i => i.id === item.source.id)
                        );
                    let superStart = findedStart.outputsFirstState.find(i => i.id === item.source.id);
                    let findedEnd = firstStateDiagramData
                        .find(block => block.inputsFirstState
                            .find(i => i === item.target.id)
                        );
                    let superEnd = findedEnd.inputsFirstState.find(i => i === item.target.id);

                    if (superStart && superEnd) {
                        if (Array.isArray(superStart.linkTo)) {
                            superStart.linkTo.push(item.target.id)
                        } else {
                            superStart.linkTo = [item.target.id]
                        }
                    }
                })


                return firstStateDiagramData.map(item => {
                    let returnObject = {
                        pos: {
                            x: item.pos.x,
                            y: item.pos.y,
                        },

                    }
                    if (item.outputsFirstState && item.outputsFirstState.length) {
                        returnObject.outputs = {}
                        item.outputsFirstState.forEach(i => {
                            returnObject.outputs[i.type] = i.linkTo && i.linkTo.map(i => {
                                    return firstStateDiagramData.findIndex(link => {
                                        if (link.inputsFirstState.length) {
                                           return link.inputsFirstState[0] === i
                                        }
                                        return false;
                                    })
                                }) || [];
                        })
                    }

                    if (item.value.isStart) {
                        returnObject.type = 'AStartBlock';
                        returnObject.start_type = "StartMessage";
                        returnObject.processing_type = item.value.condition.processing_type;
                        returnObject.keywords = item.value.condition.processing_text.split(' ');
                    } else {
                        returnObject.type = 'AMessagesBlock';
                        returnObject.message = item.value.messageSettings.message;
                        returnObject.processing_type = item.value.messageSettings.processing_type;
                        returnObject.keywords = item.value.messageSettings.processing_text.split(' ');
                    }
                    return returnObject
                })
            }

            const create = () => {
                let body = {
                    name: infoToSend.name,
                }
                infoToSend.time_start && (body.time_start = +infoToSend.time_start);

                errors.value = [];
                body.folder_ids = [...recipients.folder_ids]
                if (!body.folder_ids.length) {
                    errors.value.push('recipients')
                }
                (!body.name.length) && errors.value.push('name');


                body.blocks = convertDiagramToData(diag.value.getJsonModel().graph)
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



            const initProps = () => {
                if (props.selectedAutoresponderToEdit) {
                    let toEdit = props.selectedAutoresponderToEdit;
                    infoToSend.name = toEdit.name;
                    toEdit.time_start && (infoToSend.time_start = toEdit.time_start);
                    if (toEdit.blocks.length) {
                        blocks.value = toEdit.blocks;
                    }

                    getAllFolders()

                    if (toEdit.folder_ids) {
                        recipients.folder_ids = [...toEdit.folder_ids];
                    }


                }
            }
            initProps();



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

                isEdit: computed(() => !!props.selectedAutoresponderToEdit),


                toggleModalCalendar,
                openedModalCalendar,


                diag,
                blocks,


            }
        }
    }
</script>

<style lang="scss" src="./settings-autoresponder-create.scss"></style>