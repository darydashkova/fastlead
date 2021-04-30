<template>
    <div class="modal-choice-activation-method" @mousedown.self="close">
        <div class="modal-choice-activation-method__body">
            <BaseModalHeader>
                Выбор способа активации
            </BaseModalHeader>
            <div class="modal-choice-activation-method__choice pointer modal-choice-activation-method__choice_mt-47"
                 :class="{'modal-choice-activation-method__choice_active': choice === 1}"
                 @click="choice = 1">
                Оставить WhatsApp аккаунт у себя
            </div>
            <div class="modal-choice-activation-method__choice pointer"
                 :class="{'modal-choice-activation-method__choice_active': choice === 2}"
                 @click="choice = 2">
                Перенести WhatsApp аккаунт к нам
            </div>
            <div class="modal-choice-activation-method__buttons">
                <BaseButton
                        class="base-button_enter"
                        @click="save"
                >
                    Далее
                </BaseButton>
                <BaseButton
                        class="base-button_cancel"
                        @click.self="close"
                >
                    Отмена
                </BaseButton>
            </div>
        </div>
    </div>
</template>

<script>
    import BaseButton from '../Base/BaseButton.vue'
    import BaseModalText from '../Base/BaseModalText.vue'
    import BaseModalHeader from '../Base/BaseModalHeader.vue'

    import { onMounted, ref, reactive, computed } from "vue";
    import {useModalsWhatsapps} from "../../composition/useModalsWhatsapps";

    export default {
        components: { BaseButton, BaseModalText, BaseModalHeader },
        setup() {
            const { toggleModalChoiceActivationMethod, toggleModalChoiceActivationMethodMyself, toggleModalChoiceActivationMethodNotMyself } = useModalsWhatsapps()
            const close = () => {
                toggleModalChoiceActivationMethod(false);
            }
            const save = () => {
                if (choice.value) {
                    (choice.value === 1) && toggleModalChoiceActivationMethodMyself(true);
                    (choice.value === 2) && toggleModalChoiceActivationMethodNotMyself(true);
                }
            }
            const choice = ref(null);
            return {
                save,
                close,
                choice,
            }
        }
    }
</script>

<style lang="scss">
    .modal-choice-activation-method {
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.34);
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1300;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: left;
        &.z-index {
            z-index: 1400;
        }
    }
    .modal-choice-activation-method__body {
        width: 364px;
        background: var(--create-folder-color);
        border-radius: 9px;
        padding: 20px 0;
        text-align: left;
    }
    .modal-choice-activation-method__choice {
        padding: 12px 23px;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;

        color: var(--create-folder-header-color);
        &.modal-choice-activation-method__choice_active {
            background: var(--create-chat-border-color);
        }
        &.modal-choice-activation-method__choice_mt-47 {
            margin-top: 47px;
        }
    }
    .modal-choice-activation-method__buttons {
        padding: 0 20px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 80px;
    }
</style>