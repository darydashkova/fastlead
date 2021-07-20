<template>
    <div class="modal-integration-bitrix" @mousedown.self="close">
        <div class="modal-integration-bitrix__body">
            <BaseModalHeader>
                Подключение к Битрикс24
            </BaseModalHeader>
            <div class="modal-integration-bitrix__step modal-integration-bitrix__step_mt-22">
                <BaseModalHint class="base-modal-hint_modal-font base-modal-hint_m-0">Шаг 1</BaseModalHint>
                <BaseModalHint class="base-modal-hint_mt-5">Установите приложение в маркетплейсе Битрикс24.</BaseModalHint>
            </div>
            <div class="modal-integration-bitrix__step">
                <BaseModalHint class="base-modal-hint_modal-font base-modal-hint_m-0">Шаг 2</BaseModalHint>
                <BaseModalHint class="base-modal-hint_mt-5">Вставьте ссылку на аккаунт Битрикс24 в поле ниже.</BaseModalHint>
            </div>
            <div class="modal-integration-bitrix__input-group modal-integration-bitrix__input-group_padding-20">
                <BaseModalLabel for-id="modal-integration-bitrix__input" :class="{'base-modal-label_error': error}">Ссылка на аккаунт Битрикс24</BaseModalLabel>
                <input id="modal-integration-bitrix__input" type="text" class="modal-integration-bitrix__input" v-model="link">
                <BaseModalHint class="base-modal-hint_small base-modal-hint_m-0">
                    Например https://myaccount.bitrix24.ru
                </BaseModalHint>
            </div>
            <BaseModalText class="base-modal-text_padding-20 base-modal-text_small base-modal-text_underline base-modal-text_mt-69 pointer">Как подключить интеграцию с Битрикс24 ?</BaseModalText>
            <div class="modal-integration-bitrix__buttons">
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
    import BaseButton from '../../Base/BaseButton.vue'
    import BaseModalLabel from '../../Base/BaseModalLabel.vue'
    import BaseModalText from '../../Base/BaseModalText.vue'
    import BaseModalHint from '../../Base/BaseModalHint.vue'
    import BaseModalHeader from '../../Base/BaseModalHeader.vue'

    import { onMounted, ref, reactive } from "vue";

    export default {
        components: { BaseButton, BaseModalLabel, BaseModalText, BaseModalHint, BaseModalHeader },
        setup(props, {emit}) {
            const link = ref('');
            const error = ref(false);

            const close = () => {
                emit('close')
            }

            const save = () => {
                emit('save', link.value);
            }

            return {
                link,
                error,
                save,
                close,
            }
        }
    }
</script>

<style lang="scss">
    .modal-integration-bitrix {
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
    .modal-integration-bitrix__body {
        width: 364px;
        background: var(--modal-bg-color);
        border-radius: 9px;
        padding: 20px 0;
        text-align: left;
    }
    .modal-integration-bitrix__step {
        padding: 0 20px;
        margin-bottom: 38px;
        &.modal-integration-bitrix__step_mt-22 {
            margin-top: 22px;
        }
    }
    .modal-integration-bitrix__input-group {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 41px 0 0;
        &.modal-integration-bitrix__input-group_padding-20 {
            padding: 0 20px;
        }
    }
    .modal-integration-bitrix__input {
        font-family: Segoe UI;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        margin: 8px 0 6px;
        width: 100%;
        padding: 6px 10px;

        color: var(--modal-font-color);
        background: var(--modal-element-hover-bg-color);
        border: 0.7px solid var(--modal-input-border-color);
        box-sizing: border-box;
        border-radius: 3px;
        &.chat__input_placeholder {
            color: var(--search-input-placeholder-color);
        }
    }
    .modal-integration-bitrix__buttons {
        padding: 0 20px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 47px;
    }
</style>