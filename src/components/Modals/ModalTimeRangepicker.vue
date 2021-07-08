<template>
    <div class="modal-timepicker" @mousedown.self="close">
        <div class="modal-timepicker__body">
            <BaseModalHeader>
                Диапазон
            </BaseModalHeader>
            <div class="modal-timepicker__container">
                <input type="text" class="modal-timepicker__time"
                       v-model="h_start"
                       v-maska="'##'"
                       @blur="checkValid"
                >
                <span class="modal-timepicker__blank">:</span>
                <input type="text" class="modal-timepicker__time"
                       v-model="m_start"
                       v-maska="'##'"
                       @blur="checkValid"
                >
                <span class="modal-timepicker__blank">-</span>
                <input type="text" class="modal-timepicker__time"
                       v-model="h_end"
                       v-maska="'##'"
                       @blur="checkValid"
                >
                <span class="modal-timepicker__blank">:</span>
                <input type="text" class="modal-timepicker__time"
                       v-model="m_end"
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
    import { computed, ref, onMounted, watch } from 'vue'
    import {useModalTimeRangepicker} from "../../composition/useModalTimeRangepicker";

    export default {
        components: { BaseButton, BaseModalText, BaseModalHeader, BaseCalendar },
        props: {
            range_work: {
                start: {h: [String, Number], m: [String, Number]},
                stop: {h: [String, Number], m: [String, Number]},
            },
        },
        setup(props, {emit}) {
            const { toggleModalTimeRangepicker } = useModalTimeRangepicker()
            const close = () => {
                toggleModalTimeRangepicker(false)
            }
            const h_start = ref('');
            const h_end = ref('');
            const m_start = ref('');
            const m_end = ref('');
            const checkValid = () => {
                if (+h_start.value > 23) {
                    h_start.value = '23';
                }
                if (+h_start.value < 10) {
                    h_start.value = `0${+h_start.value}`
                }
                if (+h_end.value > 23) {
                    h_end.value = '23';
                }
                if (+h_end.value < 10) {
                    h_end.value = `0${+h_end.value}`
                }
                if (+m_start.value > 59) {
                    m_start.value = '59';
                }
                if (+m_start.value < 10) {
                    m_start.value = `0${+m_start.value}`
                }
                if (+m_end.value > 59) {
                    m_end.value = '59';
                }
                if (+m_end.value < 10) {
                    m_end.value = `0${+m_end.value}`
                }
            }

            const save = () => {
                let obj = {
                    start: {
                        h: h_start.value,
                        m: m_start.value,
                    },
                    stop: {
                        h: h_end.value,
                        m: m_end.value,
                    }
                }
                emit('selectRangeWork', obj);
                toggleModalTimeRangepicker(false);
            }
            onMounted(() => {
                h_start.value = props.range_work.start.h;
                h_end.value = props.range_work.stop.h;
                m_start.value = props.range_work.start.m;
                m_end.value = props.range_work.stop.m;
                checkValid()
            })

            return {
                save,
                close,
                checkValid,
                h_start,
                h_end,
                m_end,
                m_start,
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
        padding: 24px 20px;
        margin-top: 25px;
        display: flex;
        justify-content: space-between;
    }
    .modal-timepicker__time, .modal-timepicker__blank {
        background: transparent;
        padding: 10px 8px;
        font-family: Segoe UI;
        font-style: normal;
        font-weight: normal;
        font-size: 38px;
        line-height: 51px;
        color: var(--search-input-placeholder-color);
        transition: .2s ease;
        width: 58px;
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
        margin-top: 39px;
    }


</style>