<template>
    <div class="settings-autoresponder-diagram-edit-form">
        <h2 class="settings-autoresponder-diagram-edit-form__header">
            {{isStart? 'Условие' : 'Заголовок'}}
        </h2>
        <div class="settings-autoresponder-diagram-edit-form__row-cont" v-if="isStart && cellValues.condition">
            <div class="settings-autoresponder-diagram-edit-form__choice" @click="startProp.isOpenedMessageChoice = !startProp.isOpenedMessageChoice">
                Сообщение
                <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg"
                     :style="{'transition' : '.2s ease', transform: startProp.isOpenedMessageChoice && 'rotate(180deg)'}"
                >
                    <path d="M3.8112 1.53942C3.83597 1.51662 3.8654 1.49853 3.8978 1.48619C3.93019 1.47385 3.96492 1.4675 4 1.4675C4.03508 1.4675 4.06981 1.47385 4.1022 1.48619C4.1346 1.49853 4.16403 1.51662 4.1888 1.53942L6.63409 3.78475C6.78409 3.92253 6.98757 3.99995 7.19976 4C7.41195 4.00005 7.61546 3.92271 7.76554 3.785C7.91561 3.64729 7.99995 3.46049 8 3.2657C8.00005 3.07091 7.91581 2.88407 7.7658 2.7463L5.31998 0.50096C4.96956 0.180153 4.49488 4.17982e-08 4 4.76996e-08C3.50512 5.3601e-08 3.03044 0.180153 2.68002 0.50096L0.234197 2.7463C0.0841933 2.88407 -5.05081e-05 3.07091 3.89431e-08 3.2657C4.96323e-05 3.46049 0.0843902 3.64729 0.234465 3.785C0.384539 3.92271 0.588055 4.00005 0.800242 4C1.01243 3.99995 1.21591 3.92253 1.36591 3.78475L3.8112 1.53942Z"
                          fill="var(--user-info-settings-default-svg-fill)"
                    />
                </svg>
            </div>
            <div class="settings-autoresponder-diagram-edit-form__dropdown-cont" v-if="startProp.isOpenedMessageChoice">
                <div class="settings-autoresponder-diagram-edit-form__dropdown-element"
                     @click="selectConditionMessage('All')"
                     :class="{'settings-autoresponder-diagram-edit-form__dropdown-element_active': cellValues.condition.processing_type === 'All'}"
                >
                    Любое
                </div>
                <div class="settings-autoresponder-diagram-edit-form__dropdown-element"
                     @click="selectConditionMessage('Keywords')"
                     :class="{'settings-autoresponder-diagram-edit-form__dropdown-element_active': cellValues.condition.processing_type === 'Keywords'}"
                >
                    Определенное
                </div>
            </div>
            <template v-if="startProp.isOpenedMessageChoice && startProp.isOpenedMessageDefinite">
                <div class="settings-autoresponder-diagram-edit-form__choice" @click="startProp.isOpenedMessageDefiniteTextArea = !startProp.isOpenedMessageDefiniteTextArea">
                    Определенное
                    <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg"
                         :style="{'transition' : '.2s ease', transform: startProp.isOpenedMessageDefiniteTextArea && 'rotate(180deg)'}"

                    >
                        <path d="M3.8112 1.53942C3.83597 1.51662 3.8654 1.49853 3.8978 1.48619C3.93019 1.47385 3.96492 1.4675 4 1.4675C4.03508 1.4675 4.06981 1.47385 4.1022 1.48619C4.1346 1.49853 4.16403 1.51662 4.1888 1.53942L6.63409 3.78475C6.78409 3.92253 6.98757 3.99995 7.19976 4C7.41195 4.00005 7.61546 3.92271 7.76554 3.785C7.91561 3.64729 7.99995 3.46049 8 3.2657C8.00005 3.07091 7.91581 2.88407 7.7658 2.7463L5.31998 0.50096C4.96956 0.180153 4.49488 4.17982e-08 4 4.76996e-08C3.50512 5.3601e-08 3.03044 0.180153 2.68002 0.50096L0.234197 2.7463C0.0841933 2.88407 -5.05081e-05 3.07091 3.89431e-08 3.2657C4.96323e-05 3.46049 0.0843902 3.64729 0.234465 3.785C0.384539 3.92271 0.588055 4.00005 0.800242 4C1.01243 3.99995 1.21591 3.92253 1.36591 3.78475L3.8112 1.53942Z"
                              fill="var(--user-info-settings-default-svg-fill)"
                        />
                    </svg>
                </div>
                <div class="settings-autoresponder-diagram-edit-form__dropdown-cont" v-if="startProp.isOpenedMessageDefiniteTextArea">
                    <textarea class="settings-autoresponder-diagram-edit-form__textarea"
                              v-model="cellValues.condition.processing_text"></textarea>
                </div>
            </template>

            <div class="settings-autoresponder-diagram-edit-form__choice" @click="startProp.isOpenedForm = !startProp.isOpenedForm">
                Форма
                <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg"
                     :style="{'transition' : '.2s ease', transform: startProp.isOpenedForm && 'rotate(180deg)'}"
                >
                    <path d="M3.8112 1.53942C3.83597 1.51662 3.8654 1.49853 3.8978 1.48619C3.93019 1.47385 3.96492 1.4675 4 1.4675C4.03508 1.4675 4.06981 1.47385 4.1022 1.48619C4.1346 1.49853 4.16403 1.51662 4.1888 1.53942L6.63409 3.78475C6.78409 3.92253 6.98757 3.99995 7.19976 4C7.41195 4.00005 7.61546 3.92271 7.76554 3.785C7.91561 3.64729 7.99995 3.46049 8 3.2657C8.00005 3.07091 7.91581 2.88407 7.7658 2.7463L5.31998 0.50096C4.96956 0.180153 4.49488 4.17982e-08 4 4.76996e-08C3.50512 5.3601e-08 3.03044 0.180153 2.68002 0.50096L0.234197 2.7463C0.0841933 2.88407 -5.05081e-05 3.07091 3.89431e-08 3.2657C4.96323e-05 3.46049 0.0843902 3.64729 0.234465 3.785C0.384539 3.92271 0.588055 4.00005 0.800242 4C1.01243 3.99995 1.21591 3.92253 1.36591 3.78475L3.8112 1.53942Z"
                          fill="var(--user-info-settings-default-svg-fill)"
                    />
                </svg>
            </div>
            <template v-if="startProp.isOpenedForm">
                <div class="settings-autoresponder-diagram-edit-form__choice">
                    ID
                </div>
                <div class="settings-autoresponder-diagram-edit-form__dropdown-cont">
                    <div class="settings-autoresponder-diagram-edit-form__dropdown-element">
                        Выбор
                    </div>
                    <div class="settings-autoresponder-diagram-edit-form__dropdown-element">
                        Выбор
                    </div>
                    <div class="settings-autoresponder-diagram-edit-form__dropdown-element">
                        Выбор
                    </div>
                    <div class="settings-autoresponder-diagram-edit-form__dropdown-element">
                        Выбор
                    </div>
                </div>
            </template>
        </div>
        <div class="settings-autoresponder-diagram-edit-form__row-cont" v-if="isMessage && cellValues.messageSettings">
            <div class="settings-autoresponder-diagram-edit-form__choice"
                 @click="selectMessageSettingsProcessingType('All')"
                 :class="{'settings-autoresponder-diagram-edit-form__choice_active': cellValues.messageSettings.processing_type === 'All'}"
            >
                Любое сообщение
            </div>
            <div class="settings-autoresponder-diagram-edit-form__choice"
                 @click="selectMessageSettingsProcessingType('Keywords')"
                 :class="{'settings-autoresponder-diagram-edit-form__choice_active': cellValues.messageSettings.processing_type === 'Keywords'}"
            >
                По ключевым словам
                <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg"
                     :style="{'transition' : '.2s ease', transform: messageProp.isOpenedKeyWords && 'rotate(180deg)'}"
                >
                    <path d="M3.8112 1.53942C3.83597 1.51662 3.8654 1.49853 3.8978 1.48619C3.93019 1.47385 3.96492 1.4675 4 1.4675C4.03508 1.4675 4.06981 1.47385 4.1022 1.48619C4.1346 1.49853 4.16403 1.51662 4.1888 1.53942L6.63409 3.78475C6.78409 3.92253 6.98757 3.99995 7.19976 4C7.41195 4.00005 7.61546 3.92271 7.76554 3.785C7.91561 3.64729 7.99995 3.46049 8 3.2657C8.00005 3.07091 7.91581 2.88407 7.7658 2.7463L5.31998 0.50096C4.96956 0.180153 4.49488 4.17982e-08 4 4.76996e-08C3.50512 5.3601e-08 3.03044 0.180153 2.68002 0.50096L0.234197 2.7463C0.0841933 2.88407 -5.05081e-05 3.07091 3.89431e-08 3.2657C4.96323e-05 3.46049 0.0843902 3.64729 0.234465 3.785C0.384539 3.92271 0.588055 4.00005 0.800242 4C1.01243 3.99995 1.21591 3.92253 1.36591 3.78475L3.8112 1.53942Z"
                          fill="var(--user-info-settings-default-svg-fill)"
                    />
                </svg>
            </div>
            <template v-if="messageProp.isOpenedKeyWords">
                <div class="settings-autoresponder-diagram-edit-form__choice">
                    Ввести
                </div>
                <div class="settings-autoresponder-diagram-edit-form__dropdown-cont">
                    <textarea class="settings-autoresponder-diagram-edit-form__textarea"
                              v-model="cellValues.messageSettings.processing_text"></textarea>
                </div>
            </template>
            <template v-if="messageProp.isOpenedDelay">
                <div class="settings-autoresponder-diagram-edit-form__choice">
                    Поставить задержку
                </div>
                <div class="settings-autoresponder-diagram-edit-form__choice">
                    Введите задержку
                </div>
                <div class="settings-autoresponder-diagram-edit-form__dropdown-cont settings-autoresponder-diagram-edit-form__dropdown-cont_w-auto">
                    <div contenteditable="true" class="settings-autoresponder-diagram-edit-form__textarea" type="text"></div>
                </div>
                <div class="settings-autoresponder-diagram-edit-form__hint">
                    Задержка после выполнения действий
                </div>
            </template>
        </div>
        <div class="settings-autoresponder-diagram-edit-form__row-cont" v-if="isTextarea && cellValues.messageSettings">
            <div class="settings-autoresponder-diagram-edit-form__choice" @click="textareaProp.isOpenedMessage = !textareaProp.isOpenedMessage">
                Сообщение
                <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg"
                     :style="{'transition' : '.2s ease', transform: textareaProp.isOpenedMessage && 'rotate(180deg)'}"
                >
                    <path d="M3.8112 1.53942C3.83597 1.51662 3.8654 1.49853 3.8978 1.48619C3.93019 1.47385 3.96492 1.4675 4 1.4675C4.03508 1.4675 4.06981 1.47385 4.1022 1.48619C4.1346 1.49853 4.16403 1.51662 4.1888 1.53942L6.63409 3.78475C6.78409 3.92253 6.98757 3.99995 7.19976 4C7.41195 4.00005 7.61546 3.92271 7.76554 3.785C7.91561 3.64729 7.99995 3.46049 8 3.2657C8.00005 3.07091 7.91581 2.88407 7.7658 2.7463L5.31998 0.50096C4.96956 0.180153 4.49488 4.17982e-08 4 4.76996e-08C3.50512 5.3601e-08 3.03044 0.180153 2.68002 0.50096L0.234197 2.7463C0.0841933 2.88407 -5.05081e-05 3.07091 3.89431e-08 3.2657C4.96323e-05 3.46049 0.0843902 3.64729 0.234465 3.785C0.384539 3.92271 0.588055 4.00005 0.800242 4C1.01243 3.99995 1.21591 3.92253 1.36591 3.78475L3.8112 1.53942Z"
                          fill="var(--user-info-settings-default-svg-fill)"
                    />
                </svg>
            </div>
            <template v-if="textareaProp.isOpenedMessage">
                <div class="settings-autoresponder-diagram-edit-form__choice">
                    Ввести сообщение
                </div>
                <div class="settings-autoresponder-diagram-edit-form__dropdown-cont">
                    <textarea class="settings-autoresponder-diagram-edit-form__textarea"
                              v-model="cellValues.messageSettings.message.data"></textarea>
                </div>
            </template>
            <div class="settings-autoresponder-diagram-edit-form__choice" @click="textareaProp.isOpenedAnswerList = !textareaProp.isOpenedAnswerList">
                Список ответов
                <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg"
                     :style="{'transition' : '.2s ease', transform: textareaProp.isOpenedAnswerList && 'rotate(180deg)'}"
                >
                    <path d="M3.8112 1.53942C3.83597 1.51662 3.8654 1.49853 3.8978 1.48619C3.93019 1.47385 3.96492 1.4675 4 1.4675C4.03508 1.4675 4.06981 1.47385 4.1022 1.48619C4.1346 1.49853 4.16403 1.51662 4.1888 1.53942L6.63409 3.78475C6.78409 3.92253 6.98757 3.99995 7.19976 4C7.41195 4.00005 7.61546 3.92271 7.76554 3.785C7.91561 3.64729 7.99995 3.46049 8 3.2657C8.00005 3.07091 7.91581 2.88407 7.7658 2.7463L5.31998 0.50096C4.96956 0.180153 4.49488 4.17982e-08 4 4.76996e-08C3.50512 5.3601e-08 3.03044 0.180153 2.68002 0.50096L0.234197 2.7463C0.0841933 2.88407 -5.05081e-05 3.07091 3.89431e-08 3.2657C4.96323e-05 3.46049 0.0843902 3.64729 0.234465 3.785C0.384539 3.92271 0.588055 4.00005 0.800242 4C1.01243 3.99995 1.21591 3.92253 1.36591 3.78475L3.8112 1.53942Z"
                          fill="var(--user-info-settings-default-svg-fill)"
                    />
                </svg>
            </div>
            <template v-if="textareaProp.isOpenedAnswerList">
                <div class="settings-autoresponder-diagram-edit-form__row" v-for="(linkName, index) in cellValues.messageSettings.linksOutput">
                    {{index + 1}}
                    <div class="settings-autoresponder-diagram-edit-form__dropdown-cont settings-autoresponder-diagram-edit-form__dropdown-cont_w-auto">
                        <div  class="settings-autoresponder-diagram-edit-form__textarea"
                             type="text" @input="inputMessageSettingsLinks($event.target.innerHTML, index)">{{linkName}}</div>
                    </div>
                </div>
            </template>
        </div>

        <div class="settings-autoresponder-diagram-edit-form__bottom">
            <template v-if="isMessage">
                <div class="settings-autoresponder-diagram-edit-form__choice settings-autoresponder-diagram-edit-form__choice_mt-auto"
                    @click="messageProp.isOpenedDelay = !messageProp.isOpenedDelay"
                >
                    Поставить задержку
                </div>
                <div class="settings-autoresponder-diagram-edit-form__choice settings-autoresponder-diagram-edit-form__choice_mt-auto">
                    Перенести в папку
                </div>
                <div class="settings-autoresponder-diagram-edit-form__choice settings-autoresponder-diagram-edit-form__choice_mt-auto">
                    Оповестить менеджера
                </div>
            </template>
            <div class="settings-autoresponder-diagram-edit-form__buttons-cont">
                <BaseButton class="base-button_enter base-button_p5-10" @click="save">Сохранить</BaseButton>
                <BaseButton class="base-button_cancel base-button_p5-10">Отмена</BaseButton>
            </div>
        </div>

    </div>
</template>

<script>
    import debounce from '../../../../helpers/debounce'
    import BaseButton from "../../../Base/BaseButton";

    export default {
        name: 'EditForm',
        components: {BaseButton},
        props: {
            cellData: {
                type: Object,
            },
            selectedType: String,
        },
        data() {
          return {
              startProp: {
                  isOpenedMessageChoice: false,
                  isOpenedMessageDefinite: false,
                  isOpenedMessageDefiniteTextArea: false,
                  isOpenedForm: false,

              },
              messageProp: {
                  isOpenedKeyWords: false,
                  isOpenedDelay: false,
              },
              textareaProp: {
                  isOpenedMessage: false,
                  isOpenedAnswerList: false
              },

              cellValues: {},
          }
        },
        methods: {
            save() {
                this.$emit('changeForced', this.cellValues);
            },
            inputMessageSettingsLinks($event, index) {
                this.cellValues.messageSettings.linksOutput[index] = $event;
            },
            updateValues() {
                if (this.cellData) {
                    this.cellValues = JSON.parse(JSON.stringify(this.cellData.value));
                }
            },
            selectConditionMessage(type) {
                this.cellValues.condition.processing_type = type;
                if (type !== 'All') {
                    this.startProp.isOpenedMessageDefinite = !this.startProp.isOpenedMessageDefinite
                }
            },
            selectMessageSettingsProcessingType(type) {
                this.cellValues.messageSettings.processing_type = type;
                if (type !== 'All') {
                    this.messageProp.isOpenedKeyWords = !this.messageProp.isOpenedKeyWords
                }
            }
        },
        computed: {
            isStart() {
                return this.selectedType === 'start'
            },
            isMessage() {
                return this.selectedType === 'messageSettings'
            },
            isTextarea() {
                return this.selectedType === 'textarea'
            }
        },
    }
</script>

<style lang="scss">
    .settings-autoresponder-diagram-edit-form {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

        text-align: left;
        align-items: flex-start;
    }
    .settings-autoresponder-diagram-edit-form__header {
        padding: 18px 15px;

        font-style: normal;
        font-weight: normal;
        font-size: 20px;
        line-height: 27px;

        color: var(--font-color);

        margin: 0;
    }
    .settings-autoresponder-diagram-edit-form__row-cont {
        width: 100%;
        margin-top: 7px;
    }
    .settings-autoresponder-diagram-edit-form__choice {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        cursor: pointer;
        transition: .2s ease;

        padding: 8px 18px;
        display: flex;
        align-items: center;
        justify-content: space-between;


        color: var(--user-info-settings-default-svg-fill);
        &:hover {
            background: var(--user-info-settings-hover-setting-bg);
            color: var(--font-color);
            svg path {
                fill: var(--font-color);
            }
        }
        &.settings-autoresponder-diagram-edit-form__choice_active {
            background: var(--user-info-settings-hover-setting-bg);
            color: var(--font-color);
            svg path {
                fill: var(--font-color);
            }
        }

    }
    .settings-autoresponder-diagram-edit-form__dropdown-cont {
        border-radius: 6px;

        background: var(--modal-bg-color);
        width: 198px;
        height: 74px;
        overflow: hidden;
        margin: 10px auto;
        &.settings-autoresponder-diagram-edit-form__dropdown-cont_w-auto {
            height: auto;
        }
    }
    .settings-autoresponder-diagram-edit-form__textarea {
        font-family: Segoe UI;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 19px;

        width: 100%;
        height: 100%;
        padding: 9px 15px;
        color: var(--font-color);
        background: transparent;
    }
    .settings-autoresponder-diagram-edit-form__dropdown-element {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 19px;
        padding: 9px 14px;
        color: var(--user-info-settings-default-svg-fill);
        transition: .2s ease;
        cursor: pointer;

        &:hover {
            background: var(--modal-element-hover-bg-color);
            color: var(--font-color);
        }
        &.settings-autoresponder-diagram-edit-form__dropdown-element_active {
            background: var(--modal-element-hover-bg-color);
            color: var(--font-color);
        }
    }
    .settings-autoresponder-diagram-edit-form__bottom {
        width: 100%;
        margin-top: auto;
    }
    .settings-autoresponder-diagram-edit-form__buttons-cont {
        width: 100%;
        padding: 13px 18px;
        display: flex;
        justify-content: space-between;
    }
    .settings-autoresponder-diagram-edit-form__hint {
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;

        color: var(--sub-text-font-color);

        padding: 14px 18px;
    }
    .settings-autoresponder-diagram-edit-form__row {
        display: flex;
        align-items: center;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;

        color: var(--font-color);
        padding: 0 20px;
    }
</style>
