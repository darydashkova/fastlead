<template>
    <div class="modal-select-whatsapp-activities" @mousedown.self="close">
        <div class="modal-select-whatsapp-activities__body">
            <BaseModalHeader>
                Выбор вида деятельности
            </BaseModalHeader>
            <div class="modal-select-whatsapp-activities__choice"
                 v-for="(activity, index) in activities"
                 :key="`modal-select-whatsapp-activities${index}`"
                 @click="save(index)">
                {{activity}}
            </div>
        </div>
    </div>
</template>

<script>
    import BaseButton from '../Base/BaseButton.vue'
    import BaseModalText from '../Base/BaseModalText.vue'
    import BaseModalHeader from '../Base/BaseModalHeader.vue'
    import {computed} from 'vue'

    export default {
        components: { BaseButton, BaseModalText, BaseModalHeader },
        props: {
            activities: Array,
        },
        setup(props, {emit}) {
            const close = () => {
                emit('close');
            }
            const save = (choice) => {
                emit('save', choice);
                close();
            }
            return {
                save,
                close,
                activities: computed(() => props.activities)


            }
        }
    }
</script>

<style lang="scss">
    .modal-select-whatsapp-activities {
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
    .modal-select-whatsapp-activities__body {
        width: 364px;
        background: var(--modal-bg-color);
        border-radius: 9px;
        padding: 20px 0;
        text-align: left;
    }
    .modal-select-whatsapp-activities__choice {
        padding: 12px 23px;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;

        color: var(--modal-base-text-default-color);

        transition: .2s ease;
        cursor: pointer;
        &:first-of-type {
            margin-top: 47px;
        }
        &:hover {
            background: var(--modal-element-hover-bg-color);
        }
    }
    .modal-select-whatsapp-activities__buttons {
        padding: 0 20px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 80px;
    }
</style>