<template>
    <div class="modal-timepicker" @mousedown.self="close">
        <div class="modal-timepicker__body">
            <BaseModalHeader>
                Выберите время
            </BaseModalHeader>
            <div class="modal-timepicker__container">
                <input type="text" class="modal-timepicker__time"
                       v-model="hours"
                       v-maska="'##'"
                       @blur="checkValid"
                >
                <span class="modal-timepicker__blank">:</span>
                <input type="text" class="modal-timepicker__time"
                       v-model="minutes"
                       v-maska="'##'"
                       @blur="checkValid"
                >
            </div>
            <div class="modal-timepicker__buttons">
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
    import BaseButton from '../Base/BaseButton.vue'
    import BaseModalText from '../Base/BaseModalText.vue'
    import BaseModalHeader from '../Base/BaseModalHeader.vue'
    import BaseCalendar from '../Base/BaseCalendar.vue'
    import {useModalCalendar} from "../../composition/useModalCalendar";
    import { computed, ref, onMounted, watch } from 'vue'

    export default {
        components: { BaseButton, BaseModalText, BaseModalHeader, BaseCalendar },
        props: {
            time: [String, Number]
        },
        setup(props, {emit}) {
            const close = () => {
                emit('close')
            }
            const hours = ref('');
            const minutes = ref('');
            const checkValid = () => {
                if (+hours.value > 23) {
                    hours.value = '23';
                }
                if (+hours.value < 10) {
                    hours.value = `0${+hours.value}`
                }
                if (+minutes.value > 59) {
                    minutes.value = '59';
                }
                if (+minutes.value < 10) {
                    minutes.value = `0${+minutes.value}`
                }
            }

            const save = () => {
                let date = new Date(+props.time * 1000)
                let y = date.getFullYear()
                let m = date.getMonth()
                let d = date.getDate()
                emit('acceptDate', new Date(y, m, d, +hours.value, +minutes.value).getTime())
            }
            onMounted(() => {
                if (props.time) {
                    hours.value = new Date(+props.time * 1000).getHours();
                    minutes.value = new Date(+props.time * 1000).getMinutes();
                    checkValid();
                }
            })

            return {
                save,
                close,
                hours,
                minutes,
                checkValid,

                time: computed(() => props.time)
            }
        }
    }
</script>

<style lang="scss">
    .modal-timepicker {
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
    .modal-timepicker__body {
        width: 364px;
        background: var(--modal-bg-color);
        border-radius: 9px;
        padding: 20px 0;
        text-align: left;

        display: flex;
        flex-direction: column;
    }
    .modal-timepicker__container {
        width: 100%;
        background: var(--calendar-bg);
        padding: 12px 20px;
        margin-top: 25px;
        display: flex;
        justify-content: space-between;
    }
    .modal-timepicker__time, .modal-timepicker__blank {
        background: transparent;
        padding: 15px;
        font-family: Segoe UI;
        font-style: normal;
        font-weight: normal;
        font-size: 70.3448px;
        line-height: 94px;
        color: var(--search-input-placeholder-color);
        transition: .2s ease;
        width: 107px;
        border-radius: 8.7931px;
        &:focus {
            background: var(--modal-bg-color);
            color: var(--modal-font-color);
        }
    }
    .modal-timepicker__blank {
        display: flex;
        justify-content: center;
    }
    .modal-timepicker__time {
        &:hover {
            background: var(--modal-bg-color);
        }
    }
    .modal-timepicker__buttons {
        padding: 0 20px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 22px;
    }


</style>