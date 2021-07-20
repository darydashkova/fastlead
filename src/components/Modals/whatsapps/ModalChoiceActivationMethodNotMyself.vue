<template>
    <div class="modal-choice-activation-method-not-myself" @mousedown.self="close">
        <div class="modal-choice-activation-method-not-myself__body">
            <BaseModalHeader>
                Перенос WhatsApp аккаунта к нам
            </BaseModalHeader>
            <div class="modal-choice-activation-method-not-myself__input-group">
                <BaseModalLabel for-id="modal-choice-activation-method-not-myself__sms"
                                :class="{'base-modal-label_error': errors.sms}">{{errors.sms? 'Проверьте правильность ввода' : 'Введите код из SMS от WhatsApp'}}</BaseModalLabel>
                <input id="modal-choice-activation-method-not-myself__input-phone"
                       type="text"
                       class="modal-choice-activation-method-not-myself__input"
                       v-model="sms"
                       v-maska="'######'"
                >
            </div>
            <div class="modal-choice-activation-method-not-myself__buttons">
                <BaseButton
                        class="base-button_enter"
                        @click="save"
                >
                    Готово
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
    import BaseButton from '../../Base/BaseButton.vue'
    import BaseModalLabel from '../../Base/BaseModalLabel.vue'
    import BaseModalHeader from '../../Base/BaseModalHeader.vue'

    import { onMounted, ref, reactive, computed } from "vue";
    import {useModalsWhatsapps} from "../../../composition/useModalsWhatsapps";

    export default {
        components: { BaseButton, BaseModalLabel, BaseModalHeader },
        setup() {
            const { toggleModalChoiceActivationMethodNotMyself, selectedWhatsappToAction, toggleModalChoiceActivationMethod, toggleModalChoiceActivationMethodSuccess } = useModalsWhatsapps()
            const sms = ref('');
            const errors = reactive({
                sms: false,
            })
            const close = () => {
                toggleModalChoiceActivationMethodNotMyself(false);
            }

            const save = () => {
                if (!sms.value) {
                    errors.sms = true;
                    return;
                }
            }
            return {
                sms,
                save,
                errors,
                close,
            }
        }
    }
</script>

<style lang="scss">
    .modal-choice-activation-method-not-myself {
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
    .modal-choice-activation-method-not-myself__body {
        width: 364px;
        background: var(--modal-bg-color);
        border-radius: 9px;
        padding: 20px 0;
        text-align: left;
    }
    .modal-choice-activation-method-not-myself__input-group {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 77px 0;
        padding: 0 20px;
    }
    .modal-choice-activation-method-not-myself__input {
        font-family: Segoe UI;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        margin-top: 6px;
        width: 100%;
        padding: 2px;

        color: var(--modal-font-color);
        background: var(--modal-element-hover-bg-color);
        border: 0.7px solid var(--modal-input-border-color);
        box-sizing: border-box;
        border-radius: 3px;
    }
    .modal-choice-activation-method-not-myself__buttons {
        padding: 0 20px;
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
</style>