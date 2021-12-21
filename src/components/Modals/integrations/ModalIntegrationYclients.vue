<template>
    <div class="modal-integration-yclients" @mousedown.self="close">
        <div class="modal-integration-yclients__body">
            <BaseModalHeader>
                Подключение к YCLIENTS
            </BaseModalHeader>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="modal-integration-yclients__close pointer"  @click.self="close">
            <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#9797BB"/>
            </svg>
            <div class="modal-integration-yclients__input-group modal-integration-yclients__input-group_padding-20">
                <div class="modal-integration-yclients__input-group-title">Логин</div>
                <input id="modal-integration-yclients__input-login" type="text" class="modal-integration-yclients__input" required placeholder="Ввести">
                <div class="modal-integration-yclients__input-group-title">Пароль</div>
                <input id="modal-integration-yclients__input-pass" type="text" class="modal-integration-yclients__input" required placeholder="Ввести" >
            </div>
            <BaseModalText class=" base-modal-text_small base-modal-text_underline base-modal-text_mt-40 "><router-link to="#">Как подключить интеграцию с YCLIENTS ?</router-link></BaseModalText>
            <div class="modal-integration-yclients__buttons">
                <BaseButton
                        class="base-button_enter"
                        @click="save"
                >
                    Подключить
         
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
            emits: ['connectYclient'],
        setup(props, {emit}) {
            const link = ref('');
            const error = ref(false);

            const close = () => {
                emit('close')
            }

            const save = () => {
                checkValidate();
            emit('connectYclient', login, pass)  

            }
            const login = ref();
            const pass= ref();
            const checkValidate = (text) => {
               login.value =  (document.getElementById('modal-integration-yclients__input-login')).value;
                // const loginResult = login.match(/(?=^.{5,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/);
               pass.value = (document.getElementById('modal-integration-yclients__input-pass')).value;
                // const passResult = pass.match(/(?=^.{5,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/);
        
            }
            return {
                link,
                error,
                save,
                close,
                checkValidate,
                login,
                pass
            }
        }
    }
</script>

<style lang="scss">
    .modal-integration-yclients {
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
        &__close{
            position: absolute;
                right: 9px;
                position: absolute;
                top: 9px;
        }
    }
    .modal-integration-yclients__body {
        width: 364px;
        position: relative;
        background:#252544;
        border-radius: 9px;
        padding: 20px 0;
        text-align: left;
    }
    .modal-integration-yclients__step {
        padding: 0 20px;
        margin-bottom: 38px;
        &.modal-integration-yclients__step_mt-22 {
            margin-top: 22px;
        }
    }
    .modal-integration-yclients__input-group {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 41px 0 0;
        &.modal-integration-yclients__input-group_padding-20 {
            padding: 0 20px;
        }
        &-title{
            color: #CFCFE4;
            font-size: 14px;
            line-height: 130%;
        }
    }
    .modal-integration-yclients__input {
        font-family: Segoe UI;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        margin: 8px 0 6px;
        width: 100%;
        padding: 6px 10px;
        margin-bottom: 20px;
        color: var(--modal-font-color);
        background:#1D1D35;
        border: 0.7px solid #1D1D35;
        box-sizing: border-box;
        border-radius: 3px;
        &.chat__input_placeholder {
            color: var(--search-input-placeholder-color);
        }
       &::-webkit-input-placeholder {color: #40406B;}
        &::-moz-placeholder {color: #40406B;}
        &:-moz-placeholder {color: #40406B;}
        &:-ms-input-placeholder {color: #40406B;}
    }
    .modal-integration-yclients__buttons {
        padding: 0 20px;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        .base-button_enter{
            color: black;
            margin-right:11px;
        }
    }

</style>