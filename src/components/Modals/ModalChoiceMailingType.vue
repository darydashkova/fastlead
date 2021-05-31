<template>
    <div class="modal-choice-mailing-type" @mousedown.self="close">
        <div class="modal-choice-mailing-type__body">
            <BaseModalHeader>
                Выбор рассылки
            </BaseModalHeader>
            <div class="modal-choice-mailing-type__choice pointer modal-choice-mailing-type__choice_mt-47"
                 @click="save(1)">
                Создать пользовательскую рассылку
                <div class="modal-choice-mailing-type__sub-title">
                    до 500 пользователей
                </div>
            </div>
            <div class="modal-choice-mailing-type__choice pointer"
                 @click="save(2)">
                Создать массовую рассылку
                <div class="modal-choice-mailing-type__sub-title">
                    свыше 500 пользователей
                </div>
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
            const save = (choice) => {
                emit('save', choice);
            }
            return {
                save,
                close,
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

        color: var(--font-color);
        transition: .2s ease;
        &:hover {
            background: var(--modal-element-hover-bg-color);

        }
        &.modal-choice-mailing-type__choice_mt-47 {
            margin-top: 47px;
        }
    }
    .modal-choice-mailing-type__sub-title {
        color: var(--modal-hint-font-color);
        margin-top: 5px;

        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 140%;
    }
    .modal-choice-mailing-type__buttons {
        padding: 0 20px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 172px;
    }
</style>