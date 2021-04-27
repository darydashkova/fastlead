<template>
    <div class="settings-autoresponder-create-parameters">
        <h3 class="settings-autoresponder-create-parameters__header">
            №{{index}}
        </h3>
        <div class="settings-autoresponder-create-parameters__flex-container"
             v-for="(startCond, index) in startCondition.data"
        >
            <template v-if="startCond === '&&' || startCond === '||' || startCond === ''">
                <div class="settings-autoresponder-create-parameters__input-group settings-autoresponder-create-parameters__input-group_mt-92 settings-autoresponder-create-parameters__input-group_mb-92">
                    <label class="settings-autoresponder-create-parameters__label">
                        Оператор
                    </label>
                    <div class="settings-autoresponder-create-parameters__iconed-input">
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
                        <label class="settings-autoresponder-create-parameters__label">
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
                    <div class="settings-autoresponder-create-parameters__hint" v-if="startCond.type === null">
                        Если нет условий запуска, действие будет выполняться<br>в любом случае в соответствии с порядком
                    </div>
                    <div @click="addStartCondition" class="settings-autoresponder-create-parameters__add-text pointer"
                         v-else-if="(index === startCondition.data.length - 1) && (index > 1? startCondition.data[index - 1] !== '' : true)"
                    >
                        + Добавить условие
                    </div>
                </div>
                <div class="settings-autoresponder-create-parameters__column">
                    <div class="settings-autoresponder-create-parameters__flex-container">
                        <BaseInputGroup
                                class="base-input-group_w-45 base-input-group_another-color"
                                :dynamic-id="`settings-autoresponder-create-parameters__word${index}`"
                                :placeholder="'Нет'"
                                :value="startCond.data.text"
                                @inputValue="inputStartConditionText($event, index)"
                        >
                            Слово
                        </BaseInputGroup>
                        <BaseRangeInputGroup
                                class="base-range-input-group_w-45 base-range-input-group_another-color"
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
        <div class="settings-autoresponder-create-parameters__flex-container">
            <div class="settings-autoresponder-create-parameters__column settings-autoresponder-create-parameters__column_mt-92">
                <div class="settings-autoresponder-create-parameters__input-group ">
                    <label class="settings-autoresponder-create-parameters__label"
                        :class="{'settings-autoresponder-create-parameters__label_error': error}"
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
        <BaseCheckboxGroup
                class="base-checkbox-group__mt-47"
                :dynamic-id="`settings-autoresponder-create-parameters__checkbox${index}`"
                :value="isOnlyOne"
                @changeChecked="changeIsOnlyOne"
        ></BaseCheckboxGroup>
        <div class="settings-autoresponder-create-parameters__hint settings-autoresponder-create-parameters__hint_classic">
            Действие выполняется один раз для каждого клиента
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
                }
                if (!obj.action_type) {
                    errors.value.push('action_type');
                    return;
                }
                obj.start_condition.forEach((item, index) => {
                    let k = errors.value.find(i => i.name === 'start_condition')
                    !k && (errors.value.push({
                        name: 'start_condition',
                        data: [],
                    }))
                    if (typeof item === "string") {
                        (item === '') && k.data.push(index);
                    } else {
                        
                    }
                })
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
                ifAction.selectedFolderName = folders.value.find(i => i.folder_id === props.action.action_data);
                elseAction.choice = props.action.else_action_type;
                elseAction.data = props.action.else_action_data;
                elseAction.selectedFolderName = folders.value.find(i => i.folder_id === props.action.else_action_data);
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
        &.settings-autoresponder-create-parameters__input-group_mb-92 {
            margin-bottom: 92px;
        }
        &.settings-autoresponder-create-parameters__input-group_mt-92 {
            margin-top: 92px;
        }
    }
    .settings-autoresponder-create-parameters__iconed-input {
        width: 100%;
        position: relative;
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
</style>