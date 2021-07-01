<template>
    <div class="modal-new-message" @mousedown.self="close">
        <div class="modal-new-message__body">
            <BaseModalHeader>
                Новое сообщение
            </BaseModalHeader>
            <BaseModalText class="base-modal-text_padding-20 base-modal-text_mt-29 base-modal-text_default">
                Создать сообщение
            </BaseModalText>
            <div class="base-new-message__container">
                <textarea class="base-new-message__textarea" v-model="text"></textarea>
            </div>
            <div class="modal-new-message__buttons">
                <BaseButton
                        class="base-button_enter"
                        @click="save"
                >
                    Добавить
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
    import { useModals } from "../../composition/useModals";
    import { ref } from 'vue';
    export default {
        components: { BaseButton, BaseModalText, BaseModalHeader },
        setup() {
            const { toggleModalNewMessage, setCloseCallbackNewMessage, onCloseCallbackNewMessage } = useModals();
            const close = () => {
                toggleModalNewMessage(false);
            }

            const text = ref('');

            const save = async () => {
                onCloseCallbackNewMessage(text.value);
                setCloseCallbackNewMessage(() => null);
                toggleModalNewMessage(false);
            }


            return {
                save,
                close,
                text,
            }
        }
    }
</script>

<style lang="scss">
    .modal-new-message {
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
    .modal-new-message__body {
        width: 364px;
        background: var(--modal-bg-color);
        border-radius: 9px;
        padding: 20px 0;
        text-align: left;
    }
    .modal-new-message__buttons {
        padding: 0 20px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 22px;
    }
    .base-new-message__textarea {
        background: transparent;
        border: 0.7px solid var(--modal-input-border-color);
        box-sizing: border-box;
        border-radius: 5px;
        width: 100%;
        height: 453px;
        padding: 15px;
        font-family: Segoe UI;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        color: var(--modal-font-color);
    }
    .base-new-message__container {
        padding: 0 20px;
        margin-top: 4px;
    }

</style>