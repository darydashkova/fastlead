<template>
    <div class="modal-integration-amo-crm" @mousedown.self="close">
        <div class="modal-integration-amo-crm__body">
            <BaseModalHeader>
                Подключение к amoCRM
            </BaseModalHeader>
            <BaseModalText class="base-modal-text_padding-20 base-modal-text_small base-modal-text_underline base-modal-text_mt-96 pointer">Как подключить интеграцию с amoCRM ?</BaseModalText>
            <div class="modal-integration-amo-crm__buttons">
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
            const close = () => {
                emit('close')
            }

            const save = () => {
                emit('save');
            }


            return {
                save,
                close,
            }
        }
    }
</script>

<style lang="scss">
    .modal-integration-amo-crm {
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
    .modal-integration-amo-crm__body {
        width: 364px;
        background: var(--modal-bg-color);
        border-radius: 9px;
        padding: 20px 0;
        text-align: left;
    }
    .modal-integration-amo-crm__input-group {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 41px 0 0;
        &.modal-integration-amo-crm__input-group_padding-20 {
            padding: 0 20px;
        }
    }
    .modal-integration-amo-crm__input {
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
    .modal-integration-amo-crm__buttons {
        padding: 0 20px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 40px;
    }
</style>