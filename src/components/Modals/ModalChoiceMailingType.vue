<template>
    <div class="modal-choice-mailing-type" @mousedown.self="close">
        <div class="modal-choice-mailing-type__body">
            <BaseModalHeader>
                Выбор рассылки
            </BaseModalHeader>
            <div class="modal-choice-mailing-type__choice pointer modal-choice-mailing-type__choice_mt-47"
                 :class="{'modal-choice-mailing-type__choice_active': choice === 1}"
                 @click="choice = 1">
                Создать пользовательскую рассылку
                <div class="modal-choice-mailing-type__sub-title">
                    до 500 пользователей
                </div>
            </div>
            <div class="modal-choice-mailing-type__choice pointer"
                 :class="{'modal-choice-mailing-type__choice_active': choice === 2}"
                 @click="choice = 2">
                Создать массовую рассылку
                <div class="modal-choice-mailing-type__sub-title">
                    свыше 500 пользователей
                </div>
            </div>
            <div class="modal-choice-mailing-type__buttons">
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

    export default {
        components: { BaseButton, BaseModalText, BaseModalHeader },
        setup(props, {emit}) {
            const close = () => {
                emit('close')
            }
            const save = () => {
                if (choice.value) {
                    (choice.value === 1) && emit('save', 1);
                    (choice.value === 2) && emit('save', 2);
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
    .modal-choice-mailing-type {
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
    .modal-choice-mailing-type__body {
        width: 364px;
        background: var(--modal-bg-color);
        border-radius: 9px;
        padding: 20px 0;
        text-align: left;
    }
    .modal-choice-mailing-type__choice {
        padding: 12px 23px;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;

        color: var(--modal-base-text-default-color);

        transition: .2s ease;
        &.modal-choice-mailing-type__choice_active {
            background: var(--modal-element-hover-bg-color);
        }
        &.modal-choice-mailing-type__choice_mt-47 {
            margin-top: 47px;
        }
    }
    .modal-choice-mailing-type__sub-title {
        color: var(--modal-hint-font-color);
        margin-top: 5px;
    }
    .modal-choice-mailing-type__buttons {
        padding: 0 20px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 172px;
    }
</style>