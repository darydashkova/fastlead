<template>
    <div class="settings-autoresponder-create-parameters">
        <h3 class="settings-autoresponder-create-parameters__header">
            №{{index}}
        </h3>
        <div class="settings-autoresponder-create-parameters__flex-container settings-autoresponder-create-parameters__flex-container_pd-13"
             v-for="(startCond, index) in startCondition.data"
        >
            <template v-if="startCond === '&&' || startCond === '||' || startCond === ''">
                <div class="settings-autoresponder-create-parameters__input-group settings-autoresponder-create-parameters__input-group_mt-92 settings-autoresponder-create-parameters__input-group_mb-42">
                    <label class="settings-autoresponder-create-parameters__label"
                           :class="{'settings-autoresponder-create-parameters__label_error': !!errors.find(item => item.name === 'start_condition') && !!(errors.find(item => item.name === 'start_condition').data.find(item => item === index) || index === errors.find(item => item.name === 'start_condition').data.find(item => item === index))}"
                    >
                        Оператор
                    </label>
                    <div class="settings-autoresponder-create-parameters__iconed-input settings-autoresponder-create-parameters__iconed-input_w-200">
                        <button class="settings-autoresponder-create-parameters__input settings-autoresponder-create-parameters__input_selector pointer"
                                @click="toggleOpenedSelectStartCondition(index, true)"
                                @blur="toggleOpenedSelectStartCondition(index, false)"
                        >
                            <div class="settings-autoresponder-create-parameters__select-item">
                                <template v-if="startCond === ''">
                                    <span>Выбрать</span>
                                </template>
                                <template v-else-if="startCond === '&&'">
                                    <span>И</span>
                                </template>
                                <template v-else-if="startCond === '||'">
                                    <span>Или</span>
                                </template>
                            </div>
                            <div class="settings-autoresponder-create-parameters__select-list" v-if="openedSelectStartCondition && openedSelectStartConditionIndex === index">
                                <div @click.stop="selectStartCondition(index, '&&', true)" class="settings-autoresponder-create-parameters__select-item">
                                    <span>И</span>
                                </div>
                                <div @click.stop="selectStartCondition(index, '||', true)" class="settings-autoresponder-create-parameters__select-item settings-autoresponder-create-parameters__select-item_arrow">
                                    <span>Или</span>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="settings-autoresponder-create-parameters__column">
                    <div class="settings-autoresponder-create-parameters__input-group">
                        <label class="settings-autoresponder-create-parameters__label"
                               :class="{'settings-autoresponder-create-parameters__label_error': !!errors.find(item => item.name === 'start_condition') && !!(errors.find(item => item.name === 'start_condition').data.find(item => item === index) || index === errors.find(item => item.name === 'start_condition').data.find(item => item === index))}"
                        >
                            Условия запуска
                        </label>
                        <div class="settings-autoresponder-create-parameters__iconed-input">
                            <button class="settings-autoresponder-create-parameters__input settings-autoresponder-create-parameters__input_selector pointer"
                                    @click="toggleOpenedSelectStartCondition(index, true)"
                                    @blur="toggleOpenedSelectStartCondition(index, false)"
                            >
                                <div class="settings-autoresponder-create-parameters__select-item">
                                    <template v-if="startCond.type === null">
                                        <span>Выбрать</span>
                                    </template>
                                    <template v-else-if="startCond.type === 'WordExists'">
                                        <span>В тексте есть слово</span>
                                    </template>
                                    <template v-else-if="startCond.type === 'WordNotExists'">
                                        <span>В тексте нет слова</span>
                                    </template>
                                </div>
                                <div class="settings-autoresponder-create-parameters__select-list" v-if="openedSelectStartCondition && openedSelectStartConditionIndex === index">
                                    <div @click.stop="selectStartCondition(index, 'WordExists')" class="settings-autoresponder-create-parameters__select-item">
                                        <span>В тексте есть слово</span>
                                    </div>
                                    <div @click.stop="selectStartCondition(index, 'WordNotExists')" class="settings-autoresponder-create-parameters__select-item settings-autoresponder-create-parameters__select-item_arrow">
                                        <span>В тексте нет слова</span>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div class="settings-autoresponder-create-parameters__hint" v-if="startCond.type === null && index === 0">
                        Если нет условий запуска, действие будет выполняться<br>в любом случае в соответствии с порядком
                    </div>
                    <div v-else class="settings-autoresponder-create-parameters__buttons">
                        <div class="settings-autoresponder-create-parameters__action
                                settings-autoresponder-create-parameters__action_del"
                             :class="{'settings-autoresponder-create-parameters__action_disabled': index === 0}"
                             @click="index > 0? delStartCondition(index) : null"
                        >
                            <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.6902 1.70525H10.3163V0.554359C10.3163 0.248227 10.0405 0 9.7003 0H5.18866C4.84852 0 4.57271 0.248193 4.57271 0.554359V1.70525H1.19872C0.858571 1.70525 0.582764 1.95344 0.582764 2.25961V3.96482C0.582764 4.27095 0.858534 4.51918 1.19872 4.51918H1.38584L1.94881 16.4692C1.96276 16.7659 2.23418 17 2.56418 17H12.3247C12.6548 17 12.9261 16.7659 12.9401 16.4691L13.503 4.51914H13.6902C14.0303 4.51914 14.3061 4.27095 14.3061 3.96479V2.25961C14.3062 1.95341 14.0304 1.70525 13.6902 1.70525ZM5.80462 1.10869H9.08435V1.70525H5.80462V1.10869ZM11.7344 15.8913H3.15457L2.61882 4.51918H12.2701L11.7344 15.8913ZM13.0743 3.41046C12.5146 3.41046 2.14995 3.41046 1.81467 3.41046V2.81393H13.0743V3.41046Z"
                                      :fill="index === 0? 'var(--base-checkbox-group-font-color)' : '#EDEDEF'"/>
                            </svg>
                        </div>
                        <div class="settings-autoresponder-create-parameters__action
                                settings-autoresponder-create-parameters__action_add"
                             v-if="(index === startCondition.data.length - 1) && (index > 1? startCondition.data[index - 1] !== '' : true)"
                             @click="addStartCondition"
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.07462 4.63529C8.87574 4.63532 8.68502 4.71527 8.5444 4.85757C8.40377 4.99987 8.32476 5.19285 8.32473 5.39409L8.32473 8.16956L5.58186 8.16956C5.38524 8.17301 5.19782 8.25448 5.05998 8.3964C4.92214 8.53833 4.8449 8.72936 4.8449 8.92835C4.8449 9.12735 4.92213 9.31838 5.05998 9.4603C5.19782 9.60223 5.38524 9.6837 5.58186 9.68715L8.32473 9.68715L8.32473 12.4626C8.32815 12.6616 8.40865 12.8512 8.54891 12.9907C8.68917 13.1302 8.87796 13.2083 9.07461 13.2083C9.27127 13.2083 9.46006 13.1302 9.60032 12.9907C9.74058 12.8512 9.82108 12.6616 9.8245 12.4626L9.8245 9.68715H12.5674C12.764 9.6837 12.9514 9.60223 13.0893 9.4603C13.2271 9.31838 13.3043 9.12735 13.3043 8.92835C13.3043 8.72936 13.2271 8.53833 13.0893 8.3964C12.9514 8.25448 12.764 8.17301 12.5674 8.16956L9.8245 8.16956L9.8245 5.39409C9.82447 5.19285 9.74546 4.99987 9.60483 4.85757C9.46421 4.71527 9.27349 4.63532 9.07462 4.63529Z"
                                      fill="#EDEDEF"/>
                                <path d="M-3.88782e-07 9C-3.11888e-07 10.78 0.52784 12.5201 1.51677 14.0001C2.50571 15.4802 3.91131 16.6337 5.55585 17.3149C7.20038 17.9961 9.00998 18.1743 10.7558 17.8271C12.5016 17.4798 14.1053 16.6226 15.364 15.364C16.6226 14.1053 17.4798 12.5016 17.8271 10.7558C18.1743 9.00998 17.9961 7.20038 17.3149 5.55585C16.6337 3.91131 15.4802 2.50571 14.0001 1.51677C12.5201 0.527843 10.78 1.43054e-06 9 1.50927e-06C6.61384 0.00258226 4.32616 0.951622 2.63889 2.63889C0.95162 4.32616 0.00258032 6.61384 -3.88782e-07 9H-3.88782e-07ZM16.5 9C16.5 10.4834 16.0601 11.9334 15.236 13.1668C14.4119 14.4001 13.2406 15.3614 11.8701 15.9291C10.4997 16.4967 8.99168 16.6453 7.53682 16.3559C6.08196 16.0665 4.74559 15.3522 3.6967 14.3033C2.6478 13.2544 1.9335 11.918 1.64411 10.4632C1.35472 9.00832 1.50325 7.50032 2.0709 6.12987C2.63856 4.75943 3.59985 3.58809 4.83322 2.76398C6.06659 1.93987 7.51664 1.5 9 1.5C10.9885 1.50218 12.8948 2.29306 14.3009 3.69911C15.7069 5.10516 16.4978 7.01155 16.5 9Z"
                                      fill="#EDEDEF"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="settings-autoresponder-create-parameters__column">
                    <div class="settings-autoresponder-create-parameters__flex-container">
                        <BaseInputGroup
                                class="base-input-group_w-53 base-input-group_another-color"
                                :dynamic-id="`settings-autoresponder-create-parameters__word${index}`"
                                :placeholder="'Нет'"
                                :value="startCond.data.text"
                                :error="!!errors.find(item => item.name === 'start_condition_word') && (index === errors.find(item => item.name === 'start_condition_word').data.find(item => item === index))"
                                @inputValue="inputStartConditionText($event, index)"
                        >
                            Слово
                        </BaseInputGroup>
                        <BaseRangeInputGroup
                                class="base-range-input-group_w-37 base-range-input-group_another-color"
                                :value="startCond.data.count"
                                :dynamic-id="`settings-autoresponder-create-parameters__count${index}`"
                                :placeholder="'0'"
                                :disabledDown="+startCond.data.count === 0"

                                @up="startCond.data.count++"
                                @down="startCond.data.count > 0? startCond.data.count-- : null"
                                @inputValue="inputStartConditionCount($event, index)"
                        >
                            Кол-во совпадений
                        </BaseRangeInputGroup>
                    </div>
                </div>
            </template>
        </div>
        <div class="settings-autoresponder-create-parameters__flex-container settings-autoresponder-create-parameters__flex-container_pd-13">
            <div class="settings-autoresponder-create-parameters__column settings-autoresponder-create-parameters__column_mt-92">
                <div class="settings-autoresponder-create-parameters__input-group ">
                    <label class="settings-autoresponder-create-parameters__label"
                        :class="{'settings-autoresponder-create-parameters__label_error': error || errors.find(i => i === 'action_type')}"
                    >
                        Действие(тогда)
                    </label>
                    <div class="settings-autoresponder-create-parameters__iconed-input">
                        <button class="settings-autoresponder-create-parameters__input settings-autoresponder-create-parameters__input_selector pointer"
                                @click="toggleOpenedIfAction(true)"
                                @blur="toggleOpenedIfAction(false)"
                        >
                            <div class="settings-autoresponder-create-parameters__select-item">
                                <template v-if="ifAction.choice === null">
                                    <span>Выбрать</span>
                                </template>
                                <template v-else-if="ifAction.choice === 'MoveToFolder'">
                                    <span>Переместить в папку "{{ifAction.selectedFolderName}}"</span>
                                </template>
                                <template v-else-if="ifAction.choice === 'SendMessage'">
                                    <span>Отправить сообщение "{{ifAction.data.data}}"</span>
                                </template>
                            </div>
                            <div class="settings-autoresponder-create-parameters__select-list" v-if="isOpenedIfAction">
                                <div @click.stop="moveFolderIf" class="settings-autoresponder-create-parameters__select-item settings-autoresponder-create-parameters__select-item_arrow">
                                    <span>Переместить в папку</span>
                                    <svg class="settings-autoresponder-create-parameters__select-pseudo-icon" width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.999838 10L5.66651 5.29253L0.999841 0.857141"
                                              stroke="var(--settings-autoresponders-actions-dropdown-font-color)" stroke-linecap="round"/>
                                    </svg>
                                </div>
                                <div @click.stop="messageIf" class="settings-autoresponder-create-parameters__select-item">
                                    <span>Отправить сообщение</span>
                                    <svg class="settings-autoresponder-create-parameters__select-pseudo-icon" width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.999838 10L5.66651 5.29253L0.999841 0.857141"
                                              stroke="var(--settings-autoresponders-actions-dropdown-font-color)" stroke-linecap="round"/>
                                    </svg>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div class="settings-autoresponder-create-parameters__column settings-autoresponder-create-parameters__column_mt-92">
                <div class="settings-autoresponder-create-parameters__input-group ">
                    <label class="settings-autoresponder-create-parameters__label">
                        Действие(иначе)
                    </label>
                    <div class="settings-autoresponder-create-parameters__iconed-input">
                        <button class="settings-autoresponder-create-parameters__input settings-autoresponder-create-parameters__input_selector pointer"
                                @click="toggleOpenedElseAction(true)"
                                @blur="toggleOpenedElseAction(false)"
                        >
                            <div class="settings-autoresponder-create-parameters__select-item">
                                <template v-if="elseAction.choice === null">
                                    <span>Выбрать</span>
                                </template>
                                <template v-else-if="elseAction.choice === 'MoveToFolder'">
                                    <span>Переместить в папку "{{elseAction.selectedFolderName}}"</span>
                                </template>
                                <template v-else-if="elseAction.choice === 'SendMessage'">
                                    <span>Отправить сообщение "{{elseAction.data.data}}"</span>
                                </template>
                            </div>
                            <div class="settings-autoresponder-create-parameters__select-list" v-if="isOpenedElseAction">
                                <div @click.stop="moveFolderElse" class="settings-autoresponder-create-parameters__select-item settings-autoresponder-create-parameters__select-item_arrow">
                                    <span>Переместить в папку</span>
                                    <svg class="settings-autoresponder-create-parameters__select-pseudo-icon" width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.999838 10L5.66651 5.29253L0.999841 0.857141"
                                              stroke="var(--settings-autoresponders-actions-dropdown-font-color)" stroke-linecap="round"/>
                                    </svg>
                                </div>
                                <div @click.stop="messageElse" class="settings-autoresponder-create-parameters__select-item">
                                    <span>Отправить сообщение</span>
                                    <svg class="settings-autoresponder-create-parameters__select-pseudo-icon" width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.999838 10L5.66651 5.29253L0.999841 0.857141"
                                              stroke="var(--settings-autoresponders-actions-dropdown-font-color)" stroke-linecap="round"/>
                                    </svg>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="settings-autoresponder-create-parameters__pd-cont">
            <BaseCheckboxGroup
                    class="base-checkbox-group__mt-47"
                    :dynamic-id="`settings-autoresponder-create-parameters__checkbox${index}`"
                    :value="isOnlyOne"
                    @changeChecked="changeIsOnlyOne"
            ></BaseCheckboxGroup>
            <div class="settings-autoresponder-create-parameters__hint settings-autoresponder-create-parameters__hint_classic">
                Действие выполняется один<br>раз для каждого клиента
            </div>
        </div>
    </div>
</template>

<script>
    import BaseInputGroup from "../../../Base/BaseInputGroup";
    import BaseRangeInputGroup from "../../../Base/BaseRangeInputGroup";
    import BaseCheckboxGroup from "../../../Base/BaseCheckboxGroup";
    import BaseButton from "../../../Base/BaseButton";
    import {ref, reactive, onUnmounted, onMounted, computed} from "vue"
    import { useModals } from "../../../../composition/useModals";
    import { useAutoresponders } from "../../../../composition/useAutoresponder";
    import {useFolder} from "../../../../composition/useFolder";
    export default {
        props: {
            index: Number,
            action: Object,
            error: Boolean,
        },
        components: {BaseInputGroup, BaseRangeInputGroup, BaseCheckboxGroup, BaseButton},
        setup(props, {emit}) {
            const { setCloseCallbackMoveModal, toggleModalMoveChat, setCloseCallbackNewMessage, toggleModalNewMessage } = useModals()
            const { autorespondersActions } = useAutoresponders()
            const { folders } = useFolder();

            const errors = ref([]);

            const inputStartConditionCount = ($event, index) => {
                startCondition.data[index].data.count = $event;
            }
            const inputStartConditionText = ($event, index) => {
                startCondition.data[index].data.text = $event;
            }
            const openedSelectStartCondition = ref(false);
            const openedSelectStartConditionIndex = ref(null);
            const toggleOpenedSelectStartCondition = (index, boolean) => {
                openedSelectStartCondition.value = boolean;
                openedSelectStartConditionIndex.value = index;
            }
            const startCondition = reactive({
                data: [
                    {
                        type: null,
                        data: {
                            count: 0,
                            text: '',
                        }
                    }
                ]
            });
            const selectStartCondition = (index, value, isOperator = false) => {
                if (isOperator) {
                    startCondition.data[index] = value;
                } else {
                    startCondition.data[index].type = value;
                }
                toggleOpenedSelectStartCondition(false);
            }
            const addStartCondition = () => {
                startCondition.data.push('');
                startCondition.data.push({
                    type: null,
                    data: {
                        count: 0,
                        text: '',
                    }
                });
            }
            const delStartCondition = (index) => {
                startCondition.data = startCondition.data.filter((item, i) => {
                    return i !== index && i !== (index - 1)
                })
            }

            const isOnlyOne = ref(false);
            const changeIsOnlyOne = (boolean) => {
                isOnlyOne.value = boolean;
            }

            const isOpenedIfAction = ref(false);
            const toggleOpenedIfAction = (boolean) => {
                isOpenedIfAction.value = boolean
            }
            const ifAction = reactive({
                choice: null,
                data: null,
                selectedFolderName: '',
            })
            const moveFolderIf = () => {
                setCloseCallbackMoveModal(selectFolderIf);
                toggleModalMoveChat(true);
            }
            const messageIf = () => {
                setCloseCallbackNewMessage((text) => {
                    ifAction.data = {
                        type: 'text',
                        data: text,
                    };
                    ifAction.choice = 'SendMessage';
                });
                toggleModalNewMessage(true);
            }
            const selectFolderIf = (folder) => {
                ifAction.selectedFolderName = folder.name;
                ifAction.data = folder.id;
                ifAction.choice = 'MoveToFolder';
            }


            const isOpenedElseAction = ref(false);
            const toggleOpenedElseAction = (boolean) => {
                isOpenedElseAction.value = boolean
            }
            const elseAction = reactive({
                choice: null,
                data: null,
                selectedFolderName: '',
            })
            const moveFolderElse = () => {
                setCloseCallbackMoveModal(selectFolderElse);
                toggleModalMoveChat(true);
            }
            const messageElse = () => {
                setCloseCallbackNewMessage((text) => {
                    elseAction.data = {
                        type: 'text',
                        data: text,
                    };
                    elseAction.choice = 'SendMessage';
                });
                toggleModalNewMessage(true);
            }
            const selectFolderElse = (folder) => {
                elseAction.selectedFolderName = folder.name;
                elseAction.data = folder.id;
                elseAction.choice = 'MoveToFolder';
            }

            const save = () => {
                let obj = {
                    start_condition: [...startCondition.data],
                    disable_dialog: isOnlyOne.value,
                    action_type: ifAction.choice,
                    action_data: ifAction.data,
                    else_action_type: elseAction.choice,
                    else_action_data: elseAction.data,
                };
                errors.value = [];
                (!obj.action_type) && errors.value.push('action_type');

                if (obj.start_condition.length < 2) {
                    if (obj.start_condition[0].type && !obj.start_condition[0].data.text.length) {
                        console.log(obj.start_condition[0].type)
                        console.log(!obj.start_condition[0].data.text.length)
                        errors.value.push({
                            name: 'start_condition_word',
                            data: [0],
                        })
                        console.log(errors.value);
                    }
                } else {
                    obj.start_condition.forEach((item, index) => {
                        if ((typeof item === "string" && item === '') || (typeof item !== "string" && (item.type === null || item.type === undefined))) {
                            let k = errors.value.find(i => i.name === 'start_condition')
                            if (!k) {
                                errors.value.push({
                                    name: 'start_condition',
                                    data: [index],
                                })
                            } else {
                                k.data.push(index);
                            }
                        }

                        if (typeof item !== "string" && !item.data.text.length) {
                            let k = errors.value.find(i => i.name === 'start_condition_word')
                            if (!k) {
                                errors.value.push({
                                    name: 'start_condition_word',
                                    data: [index],
                                })
                            } else {
                                k.data.push(index);
                            }
                        }
                    })
                }

                if (errors.value.length) {

                    return;
                }
                obj.id = props.action.id;
                let index = autorespondersActions.indexToEdit - 1;
                autorespondersActions.actions.changeAutoresponder(index, obj);
                autorespondersActions.actions.cancelEdit();
            }
            const cancel = () => {
                autorespondersActions.actions.cancelEdit();
            }
            onMounted(() => {
                startCondition.data = [...props.action.start_condition];
                isOnlyOne.value = props.action.disable_dialog;
                ifAction.choice = props.action.action_type;
                ifAction.data = props.action.action_data;
                ifAction.selectedFolderName = folders.value.find(i => i.folder_id === props.action.action_data)? folders.value.find(i => i.folder_id === props.action.action_data).name : '';
                elseAction.choice = props.action.else_action_type;
                elseAction.data = props.action.else_action_data;
                elseAction.selectedFolderName = folders.value.find(i => i.folder_id === props.action.else_action_data)? folders.value.find(i => i.folder_id === props.action.else_action_data).name : '';
            })


            return {
                toggleModalMoveChat,

                index: props.index,
                inputStartConditionCount,
                inputStartConditionText,
                openedSelectStartCondition,
                openedSelectStartConditionIndex,
                toggleOpenedSelectStartCondition,
                startCondition,
                selectStartCondition,
                addStartCondition,
                delStartCondition,

                isOnlyOne,
                changeIsOnlyOne,

                save,
                cancel,



                isOpenedIfAction,
                toggleOpenedIfAction,
                ifAction,
                moveFolderIf,
                messageIf,

                isOpenedElseAction,
                toggleOpenedElseAction,
                elseAction,
                moveFolderElse,
                messageElse,



                error: computed(() => props.error),
                errors,
            }
        }

    }
</script>

<style lang="scss">
    .settings-autoresponder-create-parameters {
        background: var(--settings-whatsapp-color);
        border-radius: 9px;
        min-height: 100%;
        margin-bottom: 10px;
        padding: 40px;
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    .settings-autoresponder-create-parameters__header {
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 24px;
        color: var(--folder-color);
        margin: 0 0 22px;
    }
    .settings-autoresponder-create-parameters__flex-container {
        width: 100%;
        display: flex;
        justify-content: space-between;
        &.settings-autoresponder-create-parameters__flex-container_pd-13 {
            padding: 0 13px;
        }
    }
    .settings-autoresponder-create-parameters__column {
        position: relative;
        width: calc(50% - 20px);
        &.settings-autoresponder-create-parameters__column_mt-92 {
            margin-top: 92px;
        }
    }
    .settings-autoresponder-create-parameters__hint {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 19px;
        color: var(--settings-dropdown-border-color);
        margin-top: 12px;
        position: absolute;
        &.settings-autoresponder-create-parameters__hint_classic {
            position: relative;
        }
    }
    .settings-autoresponder-create-parameters__add-text {
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 24px;
        text-transform: uppercase;
        background: var(--green-color);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-top: 12px;

        position: absolute;
    }

    .settings-autoresponder-create-parameters__input-group {
        text-align: left;
        width: 100%;
        &.settings-autoresponder-create-parameters__input-group_mb-42 {
            margin-bottom: 42px;
        }
        &.settings-autoresponder-create-parameters__input-group_mt-92 {
            margin-top: 92px;
        }
    }
    .settings-autoresponder-create-parameters__iconed-input {
        width: 100%;
        position: relative;
        &.settings-autoresponder-create-parameters__iconed-input_w-200 {
            width: 200px;
        }
    }
    .settings-autoresponder-create-parameters__input {
        padding: 6px 10px;
        background: var(--settings-autoresponders-actions-input-bg-color);
        font-family: Segoe UI;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        color: var(--font-color);
        border: 0.7px solid var(--separator-color);
        border-radius: 3px;
        width: 100%;
        text-align: left;
        &.settings-autoresponder-create-parameters__input_selector {
            position: relative;
        }
    }
    .settings-autoresponder-create-parameters__select-item {
        display: flex;
        align-items: center;
        position: relative;
        span {
            overflow: hidden;
        }
    }
    .settings-autoresponder-create-parameters__select-list {
        position: absolute;
        width: 100%;
        left: 0;
        top: calc(100% + 5px);
        background: var(--ranged-buttons-color);
        padding: 6px 12px;
        border-radius: 3px;
        z-index: 50;
        .settings-autoresponder-create-parameters__select-item {
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 21px;
            color: var(--settings-autoresponders-actions-dropdown-font-color);
            margin-bottom: 15px;
            &:last-of-type {
                margin-bottom: 0;
            }
            &.settings-autoresponder-create-parameters__select-item_active {
                color: var(--settings-active-font-color);
                background: var(--settings-active-background-color);

                .settings-autoresponder-create-parameters_svg-path_need-fill {
                    fill: var(--settings-active-font-color);
                }
                .settings-autoresponder-create-parameters_svg-path_need-stroke {
                    stroke: var(--settings-active-font-color);
                }
            }
        }
    }
    .settings-autoresponder-create-parameters__select-pseudo-icon {
        position: absolute;
        right: 0;
    }
    .settings-autoresponder-create-parameters__label {
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 24px;
        color: var(--font-color);
        display: block;
        margin-bottom: 8px;
        &.settings-autoresponder-create-parameters__label_error {
            color: var(--red-color);
        }
    }
    .settings-autoresponder-create-parameters__pd-cont {
        width: 100%;
        padding: 0 13px;
    }
    .settings-autoresponder-create-parameters__buttons {
        display: flex;
        position: absolute;
        margin-top: 12px;
    }
    .settings-autoresponder-create-parameters__action {
        border-radius: 3px;
        width: 29px;
        height: 29px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 9px;
        cursor: pointer;
        &:last-of-type {
            margin-right: 0;
        }
        &.settings-autoresponder-create-parameters__action_add {
            background: var(--green-color);
        }
        &.settings-autoresponder-create-parameters__action_del {
            background: var(--red-color);
        }
        &.settings-autoresponder-create-parameters__action_disabled {
            background: var(--mailings-cancel-button-color);
            cursor: not-allowed;
        }
    }
</style>