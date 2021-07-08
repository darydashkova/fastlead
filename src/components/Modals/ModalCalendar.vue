<template>
    <div class="modal-calendar" @mousedown.self="close">
        <div class="modal-calendar__body">
            <BaseCalendar
            :time="time"
            @selectDate="selectDate"
            ></BaseCalendar>
            <div class="modal-calendar__buttons" v-if="time">
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
        <teleport to="body">
            <ModalTimepicker
                    v-if="openedTimepicker"
                    :time="time"
                    @acceptDate="acceptDate"
                    @close="openedTimepicker = false"
            ></ModalTimepicker>
        </teleport>
    </div>
</template>

<script>
    import BaseButton from '../Base/BaseButton.vue'
    import BaseModalText from '../Base/BaseModalText.vue'
    import BaseModalHeader from '../Base/BaseModalHeader.vue'
    import BaseCalendar from '../Base/BaseCalendar.vue'
    import ModalTimepicker from '../Modals/ModalTimepicker.vue'
    import {useModalCalendar} from "../../composition/useModalCalendar";
    import { ref, onMounted } from 'vue';
    export default {
        components: { BaseButton, BaseModalText, BaseModalHeader, BaseCalendar, ModalTimepicker },
        props: {
          time: [Number, String],
        },
        setup(props, {emit}) {
            const { toggleModalCalendar } = useModalCalendar()
            const close = () => {
                toggleModalCalendar(false);
            }
            const openedTimepicker = ref(false);
            const time = ref(null);
            const selectDate = date => {
                time.value = Math.floor(date / 1000);
            }
            const acceptDate = date => {
                emit('selectDate', date);
                openedTimepicker.value = false;
                toggleModalCalendar(false);
            }

            const save = () => {
                if (time.value) {
                    openedTimepicker.value = true;
                }
            }
            onMounted(() => {
                if (props.time) {
                    time.value = props.time;
                }
            })

            return {
                save,
                close,
                time,

                openedTimepicker,
                selectDate,
                acceptDate,
            }
        }
    }
</script>

<style lang="scss">
    .modal-calendar {
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
    .modal-calendar__body {
        width: 364px;
        height: 543px;
        background: var(--modal-bg-color);
        border-radius: 9px;
        padding: 20px 0;
        text-align: left;

        display: flex;
        flex-direction: column;
    }
    .modal-calendar__buttons {
        padding: 0 20px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: auto;
    }

</style>