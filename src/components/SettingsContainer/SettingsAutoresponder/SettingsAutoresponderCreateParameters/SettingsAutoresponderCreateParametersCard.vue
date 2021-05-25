<template>
    <div class="settings-autoresponder-create-parameters-card"
         v-if="!isEmpty"
    >
        <h3 class="settings-autoresponder-create-parameters-card__header">
            №{{index}}
        </h3>
        <div class="settings-autoresponder-create-parameters-card__flex-container">
                    <div class="settings-autoresponder-create-parameters-card__column">
                        <div class="settings-autoresponder-create-parameters-card__input-group">
                            <label class="settings-autoresponder-create-parameters-card__label">
                                Условия запуска
                            </label>
                            <div class="settings-autoresponder-create-parameters-card__iconed-input">
                                <button class="settings-autoresponder-create-parameters-card__input settings-autoresponder-create-parameters-card__input_selector pointer"
                                        @click.stop="edit">
                                    <div class="settings-autoresponder-create-parameters-card__select-item">
                                        <template v-if="action.start_condition[0] && (action.start_condition[0].type === null)">
                                            <span>Нет</span>
                                        </template>
                                        <template v-else-if="action.start_condition[0] && (action.start_condition[0].type === 'WordExists')">
                                            <span>В тексте есть слово</span>
                                        </template>
                                        <template v-else-if="action.start_condition[0] && (action.start_condition[0].type === 'WordNotExists')">
                                            <span>В тексте нет слова</span>
                                        </template>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div class="settings-autoresponder-create-parameters-card__hint" v-if="action.start_condition[0] && (action.start_condition[0].type === null)">
                            Если нет условий запуска, действие будет выполняться<br>в любом случае в соответствии с порядком
                        </div>
                    </div>
            </div>
        <div class="settings-autoresponder-create-parameters-card__column settings-autoresponder-create-parameters-card__column_mt-92">
            <div class="settings-autoresponder-create-parameters-card__input-group ">
                <label class="settings-autoresponder-create-parameters-card__label"
                       :class="{'settings-autoresponder-create-parameters-card__label_error': error}"
                >
                    Действие
                </label>
                <div class="settings-autoresponder-create-parameters-card__iconed-input">
                    <button class="settings-autoresponder-create-parameters-card__input settings-autoresponder-create-parameters-card__input_selector pointer"
                            @click.stop="edit">
                        <div class="settings-autoresponder-create-parameters-card__select-item">
                            <template v-if="action.action_type === null">
                                <span>Не выбрано</span>
                            </template>
                            <template v-else-if="action.action_type === 'MoveToFolder'">
                                <span>Переместить в папку "{{folders.find(i => i.folder_id === action.action_data)? folders.find(i => i.folder_id === action.action_data).name : ''}}"</span>
                            </template>
                            <template v-else-if="action.action_type === 'SendMessage'">
                                <span>Отправить сообщение "{{action.action_data.data}}"</span>
                            </template>
                        </div>
                    </button>
                </div>
            </div>
        </div>
        <BaseCheckboxGroup
                class="base-checkbox-group__mt-47"
                :dynamic-id="`settings-autoresponder-create-parameters-card__checkbox${index}`"
                :value="action.disable_dialog"
                @changeChecked="changeIsOnlyOne"
        ></BaseCheckboxGroup>
        <div class="settings-autoresponder-create-parameters-card__hint settings-autoresponder-create-parameters-card__hint_classic">
            Действие выполняется один раз для каждого клиента
        </div>
        <div class="settings-autoresponder-create-parameters-card__button">
            <BaseButton class="base-button_cancel" @click.stop="edit">Редактировать</BaseButton>
            <BaseButton class="base-button_delete" @click.stop="del">Удалить</BaseButton>
        </div>
    </div>
    <div class="settings-autoresponder-create-parameters-card settings-autoresponder-create-parameters-card_empty"
         v-else
         @click.stop="add"
    >
        <svg width="101" height="101" viewBox="0 0 101 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50.5" cy="50.5" r="47.5" stroke="#757589" stroke-width="6"/>
            <rect x="46.8889" y="28" width="6.11111" height="45" rx="3.05556" fill="#757589"/>
            <rect x="73" y="47.4434" width="6.11111" height="45" rx="3.05556" transform="rotate(90 73 47.4434)" fill="#757589"/>
        </svg>
    </div>
</template>

<script>
    import BaseInputGroup from "../../../Base/BaseInputGroup";
    import BaseRangeInputGroup from "../../../Base/BaseRangeInputGroup";
    import BaseCheckboxGroup from "../../../Base/BaseCheckboxGroup";
    import BaseButton from "../../../Base/BaseButton";
    import {ref, computed, reactive} from "vue"
    import {useModals} from "../../../../composition/useModals";
    import {useFolder} from "../../../../composition/useFolder";
    export default {
        props: {
            index: Number,
            isEmpty: Boolean,
            action: Object,
            error: Boolean,
        },
        components: {BaseInputGroup, BaseRangeInputGroup, BaseCheckboxGroup, BaseButton},
        setup(props, {emit}) {
            const { folders } = useFolder();
            const changeIsOnlyOne = (boolean) => {
                emit('changeProperty', boolean, props.index - 1, 'disable_dialog');
            }

            return {
                index: computed(() => props.index),
                action: computed(() => props.action),

                changeIsOnlyOne,

                isEmpty: props.isEmpty,

                edit: () => emit('edit', props.index),
                del: () => emit('del', props.action.id),
                add: () => emit('add'),

                folders,
                error: computed(() => props.error),
            }
        }

    }
</script>

<style lang="scss">
    .settings-autoresponder-create-parameters-card {
        background: var(--settings-whatsapp-color);
        border-radius: 9px;
        width: calc(50% - 20px);
        height: 100%;
        margin-bottom: 10px;
        padding: 40px;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        &.settings-autoresponder-create-parameters-card_empty {
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }
        &.settings-autoresponder-create-parameters-card_opacity {
            opacity: .5;
        }
    }
    .settings-autoresponder-create-parameters-card__header {
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 24px;
        color: var(--folder-color);
        margin: 0 0 22px;
    }
    .settings-autoresponder-create-parameters-card__flex-container {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .settings-autoresponder-create-parameters-card__column {
        width: 100%;
        position: relative;
        &.settings-autoresponder-create-parameters-card__column_mt-92 {
            margin-top: 92px;
        }
    }
    .settings-autoresponder-create-parameters-card__hint {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 19px;
        color: var(--settings-dropdown-border-color);
        margin-top: 12px;
        position: absolute;
        &.settings-autoresponder-create-parameters-card__hint_classic {
            position: relative;
        }
    }
    .settings-autoresponder-create-parameters-card__button {
        width: 100%;
        padding-top: 20px;
        margin-top: auto;
        display: flex;
        justify-content: space-between;
    }
    .settings-autoresponder-create-parameters-card__add-text {
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




    .settings-autoresponder-create-parameters-card__input-group {
        text-align: left;
        width: 100%;
        &.settings-autoresponder-create-parameters-card__input-group_mb-92 {
            margin-bottom: 92px;
        }
        &.settings-autoresponder-create-parameters-card__input-group_mt-92 {
            margin-top: 92px;
        }
    }
    .settings-autoresponder-create-parameters-card__iconed-input {
        width: 100%;
        position: relative;
    }
    .settings-autoresponder-create-parameters-card__input {
        font-family: Segoe UI;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 21px;
        width: 100%;
        padding: 6px 10px;
        color: var(--modal-font-color);
        background: var(--modal-element-hover-bg-color);
        border: .7px solid var(--modal-input-border-color);
        box-sizing: border-box;
        border-radius: 3px;
        text-align: left;
        &.settings-autoresponder-create-parameters-card__input_selector {
            position: relative;
        }
    }
    .settings-autoresponder-create-parameters-card__select-item {
        display: flex;
        align-items: center;
        position: relative;
        span {
            overflow: hidden;
        }
    }
    .settings-autoresponder-create-parameters-card__select-list {
        position: absolute;
        width: 100%;
        left: 0;
        top: calc(100% + 5px);
        background: var(--ranged-buttons-color);
        padding: 6px 12px;
        border-radius: 3px;
        z-index: 50;
        .settings-autoresponder-create-parameters-card__select-item {
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 21px;
            color: var(--settings-autoresponders-actions-dropdown-font-color);
            margin-bottom: 15px;
            &:last-of-type {
                margin-bottom: 0;
            }
            &.settings-autoresponder-create-parameters-card__select-item_active {
                color: var(--settings-active-font-color);
                background: var(--settings-active-background-color);

                .settings-autoresponder-create-parameters-card_svg-path_need-fill {
                    fill: var(--settings-active-font-color);
                }
                .settings-autoresponder-create-parameters-card_svg-path_need-stroke {
                    stroke: var(--settings-active-font-color);
                }
            }
        }
    }
    .settings-autoresponder-create-parameters-card__select-pseudo-icon {
        position: absolute;
        right: 0;
    }
    .settings-autoresponder-create-parameters-card__label {
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 24px;
        color: var(--create-folder-font-color);
        display: block;
        margin-bottom: 8px;
        &.settings-autoresponder-create-parameters-card__label_error {
            color: var(--red-color);
        }
    }
</style>