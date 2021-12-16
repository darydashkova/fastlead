<template>
    <div class="settings-mailings-create">
        <template v-if="!isSecondStep">
            <div class="settings-mailings-create__input-groups">
                <div class="settings-mailings-create__input-column">
                    <BaseInputGroup
                            :error="!!errors.find(i => i === 'name')"
                            :value="infoToSend.name"
                            :placeholder="'Название рассылки не отображается у получателей'"
                            :dynamic-id="'settings-mailings-create__name'"

                            @inputValue="inputName"
                    >
                        Название
                    </BaseInputGroup>
                    <div class="settings-mailings-create__row">
                        <div class="settings-mailings-create__input-group settings-mailings-create__input-group_w-45">
                            <label class="settings-mailings-create__label">
                                Дата запуска
                            </label>
                            <div class="settings-mailings-create__iconed-input">
                                <button class="settings-mailings-create__input settings-mailings-create__input_selector"
                                        @click="toggleModalCalendar(true)"
                                >
                                    <div class="settings-mailings-create__select-item pointer">
                                        {{time? `${validDate(time, true)} ${validTime(time)}` : 'Выбрать дату'}}
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div class="settings-mailings-create__input-group settings-mailings-create__input-group_w-45">
                            <label class="settings-mailings-create__label">
                                Диапазон
                            </label>
                            <div class="settings-mailings-create__iconed-input">
                                <button class="settings-mailings-create__input settings-mailings-create__input_selector"
                                        @click="toggleModalTimeRangepicker(true)"
                                >
                                    <div class="settings-mailings-create__select-item pointer">
                                        {{rangeWorkString}}
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="settings-mailings-create__input-column">
                    <div class="settings-mailings-create__input-group">
                        <label class="settings-mailings-create__label">
                            Настройка событий
                        </label>
                        <div class="settings-mailings-create__iconed-input">
                            <button class="settings-mailings-create__input settings-mailings-create__input_selector pointer"
                                    @click="toggleOpenedSelectEvents"
                                    @blur="toggleOpenedSelectEvents(false)"
                            >
                                <div class="settings-mailings-create__select-item">
                                    <template v-if="selectedEvent === 0">
                                        <svg class="settings-mailings-create__select-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.99987 1.51677C5.47991 0.527841 7.21997 0 9 0C11.3862 0.00258081 13.6738 0.951621 15.3611 2.63889C17.0484 4.32616 17.9974 6.61384 18 9C18 10.78 17.4722 12.5201 16.4832 14.0001C15.4943 15.4802 14.0887 16.6337 12.4442 17.3149C10.7996 17.9961 8.99002 18.1743 7.24419 17.8271C5.49836 17.4798 3.89471 16.6226 2.63604 15.364C1.37737 14.1053 0.520203 12.5016 0.172936 10.7558C-0.17433 9.00998 0.00389957 7.20038 0.685088 5.55585C1.36628 3.91131 2.51983 2.50571 3.99987 1.51677ZM4.83323 15.236C6.06659 16.0601 7.51664 16.5 9 16.5C10.9885 16.4978 12.8948 15.7069 14.3009 14.3009C15.7069 12.8948 16.4978 10.9885 16.5 9C16.5 7.51664 16.0601 6.06659 15.236 4.83322C14.4119 3.59985 13.2406 2.63856 11.8701 2.0709C10.4997 1.50325 8.99168 1.35472 7.53683 1.64411C6.08197 1.9335 4.7456 2.6478 3.6967 3.6967C2.64781 4.74559 1.9335 6.08196 1.64411 7.53682C1.35473 8.99168 1.50325 10.4997 2.07091 11.8701C2.63856 13.2406 3.59986 14.4119 4.83323 15.236ZM11.4699 5.78039C11.6688 5.78039 11.8595 5.85937 12.0002 5.99998C12.1408 6.14062 12.2198 6.33135 12.2198 6.53023C12.2198 6.7291 12.1408 6.91983 12.0002 7.06048L10.0607 8.99998L12.0002 10.9395C12.1368 11.0809 12.2124 11.2704 12.2107 11.467C12.209 11.6637 12.1301 11.8518 11.9911 11.9908C11.852 12.1299 11.6639 12.2088 11.4672 12.2105C11.2706 12.2122 11.0811 12.1366 10.9397 12L9.00019 10.0605L7.06069 12C6.91924 12.1366 6.72979 12.2122 6.53314 12.2105C6.33649 12.2088 6.14838 12.1299 6.00933 11.9908C5.87027 11.8518 5.79139 11.6637 5.78969 11.467C5.78798 11.2704 5.86357 11.0809 6.00019 10.9395L7.93969 8.99998L6.00019 7.06048C5.86357 6.91903 5.78798 6.72957 5.78969 6.53293C5.79139 6.33628 5.87027 6.14817 6.00933 6.00911C6.14838 5.87006 6.33649 5.79118 6.53314 5.78947C6.72979 5.78776 6.91924 5.86336 7.06069 5.99998L9.00019 7.93948L10.9397 5.99998C11.0803 5.85937 11.2711 5.78039 11.4699 5.78039Z" fill="#DEDEEE"/>
                                        </svg>
                                        <span>Ничего не делать</span>
                                    </template>
                                    <template v-else>
                                        <svg class="settings-mailings-create__select-icon" width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14.25 1.45455H9.354C9.23801 1.45529 9.12336 1.43042 9.01875 1.38182L6.65175 0.229818C6.33929 0.0789419 5.99505 0.000280976 5.646 0H3.75C2.7558 0.00115481 1.80267 0.384641 1.09966 1.06634C0.396661 1.74804 0.00119089 2.67229 0 3.63636L0 12.3636C0.00119089 13.3277 0.396661 14.252 1.09966 14.9337C1.80267 15.6154 2.7558 15.9988 3.75 16H14.25C15.2442 15.9988 16.1973 15.6154 16.9003 14.9337C17.6033 14.252 17.9988 13.3277 18 12.3636V5.09091C17.9988 4.12684 17.6033 3.20259 16.9003 2.52089C16.1973 1.83919 15.2442 1.4557 14.25 1.45455ZM3.75 1.45455H5.646C5.76199 1.4538 5.87664 1.47867 5.98125 1.52727L8.34825 2.67564C8.66039 2.82777 9.00465 2.90768 9.354 2.90909H14.25C14.6985 2.9098 15.1366 3.04049 15.508 3.28437C15.8794 3.52826 16.1671 3.87421 16.3342 4.27782L1.5 4.35927V3.63636C1.5 3.05771 1.73705 2.50276 2.15901 2.09359C2.58097 1.68442 3.15326 1.45455 3.75 1.45455ZM14.25 14.5455H3.75C3.15326 14.5455 2.58097 14.3156 2.15901 13.9064C1.73705 13.4972 1.5 12.9423 1.5 12.3636V5.81382L16.5 5.73164V12.3636C16.5 12.9423 16.2629 13.4972 15.841 13.9064C15.419 14.3156 14.8467 14.5455 14.25 14.5455Z" fill="#9797BB"/>
                                        </svg>
                                        <span>Переместить в "{{selectedFolder.name}}"</span>
                                    </template>
                                </div>
                                <div class="settings-mailings-create__select-list" v-if="isOpenedSelectEvents">
                                    <div @click.stop="selectEvent(0)" class="settings-mailings-create__select-item">
                                        <svg class="settings-mailings-create__select-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.99987 1.51677C5.47991 0.527841 7.21997 0 9 0C11.3862 0.00258081 13.6738 0.951621 15.3611 2.63889C17.0484 4.32616 17.9974 6.61384 18 9C18 10.78 17.4722 12.5201 16.4832 14.0001C15.4943 15.4802 14.0887 16.6337 12.4442 17.3149C10.7996 17.9961 8.99002 18.1743 7.24419 17.8271C5.49836 17.4798 3.89471 16.6226 2.63604 15.364C1.37737 14.1053 0.520203 12.5016 0.172936 10.7558C-0.17433 9.00998 0.00389957 7.20038 0.685088 5.55585C1.36628 3.91131 2.51983 2.50571 3.99987 1.51677ZM4.83323 15.236C6.06659 16.0601 7.51664 16.5 9 16.5C10.9885 16.4978 12.8948 15.7069 14.3009 14.3009C15.7069 12.8948 16.4978 10.9885 16.5 9C16.5 7.51664 16.0601 6.06659 15.236 4.83322C14.4119 3.59985 13.2406 2.63856 11.8701 2.0709C10.4997 1.50325 8.99168 1.35472 7.53683 1.64411C6.08197 1.9335 4.7456 2.6478 3.6967 3.6967C2.64781 4.74559 1.9335 6.08196 1.64411 7.53682C1.35473 8.99168 1.50325 10.4997 2.07091 11.8701C2.63856 13.2406 3.59986 14.4119 4.83323 15.236ZM11.4699 5.78039C11.6688 5.78039 11.8595 5.85937 12.0002 5.99998C12.1408 6.14062 12.2198 6.33135 12.2198 6.53023C12.2198 6.7291 12.1408 6.91983 12.0002 7.06048L10.0607 8.99998L12.0002 10.9395C12.1368 11.0809 12.2124 11.2704 12.2107 11.467C12.209 11.6637 12.1301 11.8518 11.9911 11.9908C11.852 12.1299 11.6639 12.2088 11.4672 12.2105C11.2706 12.2122 11.0811 12.1366 10.9397 12L9.00019 10.0605L7.06069 12C6.91924 12.1366 6.72979 12.2122 6.53314 12.2105C6.33649 12.2088 6.14838 12.1299 6.00933 11.9908C5.87027 11.8518 5.79139 11.6637 5.78969 11.467C5.78798 11.2704 5.86357 11.0809 6.00019 10.9395L7.93969 8.99998L6.00019 7.06048C5.86357 6.91903 5.78798 6.72957 5.78969 6.53293C5.79139 6.33628 5.87027 6.14817 6.00933 6.00911C6.14838 5.87006 6.33649 5.79118 6.53314 5.78947C6.72979 5.78776 6.91924 5.86336 7.06069 5.99998L9.00019 7.93948L10.9397 5.99998C11.0803 5.85937 11.2711 5.78039 11.4699 5.78039Z" fill="#DEDEEE"/>
                                        </svg>

                                        <span>Ничего не делать</span>
                                    </div>
                                    <div @click.stop="toggleModalMoveChat(true)" class="settings-mailings-create__select-item">
                                        <svg class="settings-mailings-create__select-icon" width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14.25 1.45455H9.354C9.23801 1.45529 9.12336 1.43042 9.01875 1.38182L6.65175 0.229818C6.33929 0.0789419 5.99505 0.000280976 5.646 0H3.75C2.7558 0.00115481 1.80267 0.384641 1.09966 1.06634C0.396661 1.74804 0.00119089 2.67229 0 3.63636L0 12.3636C0.00119089 13.3277 0.396661 14.252 1.09966 14.9337C1.80267 15.6154 2.7558 15.9988 3.75 16H14.25C15.2442 15.9988 16.1973 15.6154 16.9003 14.9337C17.6033 14.252 17.9988 13.3277 18 12.3636V5.09091C17.9988 4.12684 17.6033 3.20259 16.9003 2.52089C16.1973 1.83919 15.2442 1.4557 14.25 1.45455ZM3.75 1.45455H5.646C5.76199 1.4538 5.87664 1.47867 5.98125 1.52727L8.34825 2.67564C8.66039 2.82777 9.00465 2.90768 9.354 2.90909H14.25C14.6985 2.9098 15.1366 3.04049 15.508 3.28437C15.8794 3.52826 16.1671 3.87421 16.3342 4.27782L1.5 4.35927V3.63636C1.5 3.05771 1.73705 2.50276 2.15901 2.09359C2.58097 1.68442 3.15326 1.45455 3.75 1.45455ZM14.25 14.5455H3.75C3.15326 14.5455 2.58097 14.3156 2.15901 13.9064C1.73705 13.4972 1.5 12.9423 1.5 12.3636V5.81382L16.5 5.73164V12.3636C16.5 12.9423 16.2629 13.4972 15.841 13.9064C15.419 14.3156 14.8467 14.5455 14.25 14.5455Z" fill="#9797BB"/>
                                        </svg>

                                        <span>Переместить в папку</span>
                                        <svg class="settings-mailings-create__select-pseudo-icon" width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.999838 10L5.66651 5.29253L0.999841 0.857141" stroke="#B7B7BE" stroke-linecap="round"/>
                                        </svg>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div class="settings-mailings-create__row">
                        <BaseRangeInputGroup
                                class="base-range-input-group_w-50"
                                :value="infoToSend.send_day"
                                :dynamic-id="'settings-mailings-create__mails-count'"
                                :placeholder="'0'"
                                :disabledDown="+infoToSend.send_day === 0"

                                @up="infoToSend.send_day++"
                                @down="infoToSend.send_day > 0? infoToSend.send_day-- : null"
                                @inputValue="inputSendDay"
                        >
                            Кол-во писем в день
                        </BaseRangeInputGroup>
                        <BaseRangeInputGroup
                                class="base-range-input-group_w-30"
                                :value="infoToSend.interval"
                                :dynamic-id="'settings-mailings-create__interval'"
                                :placeholder="'0'"
                                :disabledDown="+infoToSend.interval === 0"

                                @up="infoToSend.interval++"
                                @down="infoToSend.interval > 0? infoToSend.interval-- : null"
                                @inputValue="inputInterval"
                        >
                            Интервал
                        </BaseRangeInputGroup>
                    </div>
                </div>
            </div>
            <div class="settings-mailings-create__input-group settings-mailings-create__input-group_m-32">
                <label class="settings-mailings-create__label"
                       :class="{'settings-mailings-create__label_error': errors.find(i => i === 'recipients')}"
                >
                    Получатели
                </label>
                <div class="settings-mailings-create__row settings-mailings-create__row_m-0">
                    <div class="settings-mailings-create__iconed-input settings-mailings-create__iconed-input_w-60 settings-mailings-create__input-column">
                        <button class="settings-mailings-create__input settings-mailings-create__input_selector pointer"
                                @click="openModalChoiceFolder"
                        >
                            <div class="settings-mailings-create__select-item">
                                {{recipients.selectedMessage}}
                            </div>
                        </button>
                    </div>
                    <div class="settings-mailings-create__button-container">
                        <div class="settings-mailings-create__button-add-new"
                             @click="toggleModalCreateChat(true)"
                        >Добавить новых</div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <SettingsMailingsCreateInput
                :message="infoToSend.message.data"
                :error="errors.find(i => i === 'message')"
                @changeMessage="infoToSend.message.data = $event.replace(/<br>/g, '\n')"
            ></SettingsMailingsCreateInput>
        </template>

        <div class="settings-mailings-create__footer">
            <BaseSteps
                :isSecondStep="isSecondStep"
                @gotoStep="gotoStep"
            ></BaseSteps>
            <BaseButton v-if="!isSecondStep" class="base-button_enter base-button_p5-15" @click="gotoStep(true)">Продолжить</BaseButton>
            <template v-else>
                <BaseButton v-if="!selectedMailingToEdit" class="base-button_enter base-button_p5-15" @click="create">Создать </BaseButton>
                <BaseButton v-else class="base-button_enter base-button_p5-15" @click="create">Редактировать </BaseButton>
            </template>
            
        </div>
        <teleport to="body">
            <ModalChoiceFolder v-if="openedModalChoiceFolder" style="z-index: 500"></ModalChoiceFolder>
            <ModalCalendar
                    :time="time"
                    @selectDate="selectDate"
                    v-if="openedModalCalendar"
            ></ModalCalendar>
            <ModalTimeRangepicker
                    :range_work="infoToSend.range_work"
                    @selectRangeWork="selectRangeWork"
                    v-if="openedModalTimeRangepicker"
            ></ModalTimeRangepicker>
        </teleport>
    </div>
</template>

<script>
    import BaseRangeInputGroup from '../../Base/BaseRangeInputGroup.vue'
    import BaseSteps from '../../Base/BaseSteps.vue'
    import BaseButton from '../../Base/BaseButton.vue'
    import BaseCircleIcon from '../../Base/BaseCircleIcon.vue'
    import BaseInputGroup from '../../Base/BaseInputGroup.vue'
    import ModalChoiceFolder from '../../Modals/ModalChoiceFolder.vue'
    import ModalCalendar from '../../Modals/ModalCalendar.vue'
    import ModalTimeRangepicker from '../../Modals/ModalTimeRangepicker.vue'
    import SettingsMailingsCreateInput from './settings-mailings-create-input'

    import { ref, reactive, computed, onMounted } from 'vue'
    import { useModals } from "../../../composition/useModals";
    import { useFolder } from "../../../composition/useFolder";
    import { useMailings } from "../../../composition/useMailings";
    import { useDate } from "../../../composition/useDate";
    import {useModalChoiceFolder} from "../../../composition/useModalChoiceFolder";
    import {useModalCalendar} from "../../../composition/useModalCalendar";
    import {useModalTimeRangepicker} from "../../../composition/useModalTimeRangepicker";

    export default {
        props: {
            selectedMailingToEdit: {
                name: String,
                interval: Number,
            }
        },
        components: {
            BaseRangeInputGroup,
            BaseSteps,
            BaseButton,
            BaseCircleIcon,
            BaseInputGroup,
            ModalChoiceFolder,
            ModalCalendar,
            ModalTimeRangepicker,
            SettingsMailingsCreateInput
        },
        setup(props, {emit}) {
            const { toggleModalMoveChat, toggleModalCreateChat, setCloseCallbackMoveModal } = useModals();

            const { setSaveCallbackModalChoiceFolder, selectedFolders, toggleModalChoiceFolder, openedModalChoiceFolder } = useModalChoiceFolder()
            const { toggleModalCalendar, openedModalCalendar } = useModalCalendar()
            const { toggleModalTimeRangepicker, openedModalTimeRangepicker } = useModalTimeRangepicker()

            const { getAllFolders, folders } = useFolder();

            const { createMailing, updateMailing } = useMailings();

            const { validDate, validTime } = useDate();

            const isSecondStep = ref(false);

            const gotoStep = (boolean) => {
                isSecondStep.value = boolean;
            }

            const selectedEvent = ref(0);
            const selectEvent = (number) => {
                selectedEvent.value = number;
                toggleOpenedSelectEvents(false);
            }
            const selectedFolder = ref(null);
            const selectFolder = (folder) => {
                selectedFolder.value = folder;
                selectEvent(1);
            }
            setCloseCallbackMoveModal(selectFolder);

            const isOpenedSelectEvents = ref(false);
            const toggleOpenedSelectEvents = (boolean) => {
                isOpenedSelectEvents.value = boolean;
            }

            const openModalChoiceFolder = () => {
                selectedFolders.value = [...recipients.folder_ids];
                setSaveCallbackModalChoiceFolder((ids) => {
                    recipients.folder_ids = [...ids];
                })
                toggleModalChoiceFolder(true)
            }

            const recipients = reactive({
                folder_ids: [],
                selectedMessage: computed(() => {
                    return recipients.folder_ids.length
                        ? `Выбрано ${recipients.folder_ids.length + ' папки'}`
                        : 'Выбрать папку'
                }),
            })

            const isOpenedDatepicker = ref(false);
            const toggleOpenedDatepicker = (boolean) => {
                isOpenedDatepicker.value = boolean;
            }
            const selectDate = (time) => {
                infoToSend.time_start = Math.floor(time / 1000);
            }

            const isOpenedRangeWork = ref(false);
            const toggleOpenedRangeWork = (boolean) => {
                isOpenedRangeWork.value = boolean;
            }
            const selectRangeWork = (obj) => {
                infoToSend.range_work = {...obj};
            }
            const rangeWorkString = computed(() => {
                if (infoToSend.range_work.start.h && infoToSend.range_work.stop.h && infoToSend.range_work.start.m && infoToSend.range_work.stop.m) {
                    return `${infoToSend.range_work.start.h}:${infoToSend.range_work.start.m} — ${infoToSend.range_work.stop.h}:${infoToSend.range_work.stop.m}`
                } else {
                    return `Выбрать`
                }
            })

            const inputName = ($event) => {
                infoToSend.name = $event;
            }
            const inputSendDay = ($event) => {
                infoToSend.send_day = $event;
            }
            const inputInterval = ($event) => {
                infoToSend.interval = $event;
            }



            const infoToSend = reactive({
                name: '',
                message: {
                    type: 'text',
                    data: '',
                },
                interval: 0,

                time_start: null,
                range_work: {
                    start: {h: null, m: null},
                    stop: {h: null, m: null},
                },
                send_day: 0,
            })

            const errors = ref([]);

            const create = () => {
                let body = {
                    name: infoToSend.name,
                    message: {...infoToSend.message},
                    interval: +infoToSend.interval,
                }

                infoToSend.time_start && (body.time_start = +infoToSend.time_start);
                if (rangeWorkString.value !== 'Выбрать') {
                    body.range_work = {
                        start: {
                            h: +infoToSend.range_work.start.h,
                            m: +infoToSend.range_work.start.m,
                        },
                        stop: {
                            h: +infoToSend.range_work.stop.h,
                            m: +infoToSend.range_work.stop.m,
                        }
                    };
                }
                infoToSend.send_day && (body.send_day = +infoToSend.send_day);

                errors.value = [];
                if (selectedEvent.value) {
                    body.on_message = {
                        action_type: 'MoveToFolder',
                        action_data: +selectedFolder.value.id,
                    }
                }

                body.send = {
                    folder_ids: [...recipients.folder_ids]
                }
                if (!body.send.folder_ids.length) {
                    errors.value.push('recipients')
                }

                (!body.name.length) && errors.value.push('name');
                (!body.message.data) && errors.value.push('message');

                if (errors.value.length) {
                    if (errors.value.length === 1 && errors.value[0] === 'message') {
                        gotoStep(true);
                    } else {
                        gotoStep(false);
                    }
                    return;
                }
                if (props.selectedMailingToEdit) {
                    body.mass_sending_id = props.selectedMailingToEdit.mass_sending_id
                    updateMailing(body)
                        .then(r => {
                            if (r.error) {
                                return;
                            }
                            emit('gotoTable');
                        })
                } else {
                    createMailing(body)
                        .then(r => {
                            if (r.error) {
                                return;
                            }
                            emit('gotoTable');
                        })
                }
            };

            onMounted(() => {
                if (props.selectedMailingToEdit) {
                    let toEdit = props.selectedMailingToEdit;
                    infoToSend.name = toEdit.name;
                    infoToSend.interval = toEdit.interval;
                    infoToSend.message = {
                        data: toEdit.message.message,
                        type: toEdit.message.type,
                    };
                    toEdit.time_start && (infoToSend.time_start = toEdit.time_start);
                    toEdit.send_day && (infoToSend.send_day = toEdit.send_day);

                    let toStringDate = (number) => {
                       let str = number < 10? `0${number}` : `${number}`
                        return str;
                    }
                    if (toEdit.event) {
                        getAllFolders()
                            .then(() => {
                                let f = folders.value.find( i => i.folder_id === toEdit.event.action_data);
                                if (f) {
                                    selectFolder({
                                        name: f.name,
                                        id: f.folder_id,
                                    });
                                }
                            })
                    }
                    if (toEdit.send.folder_ids) {
                        recipients.folder_ids = [...toEdit.send.folder_ids];
                    }

                    if (toEdit.range_work) {
                        if (Array.isArray(toEdit.range_work)) {
                            return;
                        }
                        infoToSend.range_work = {
                            start: {
                                h: toStringDate(toEdit.range_work.start.h),
                                m: toStringDate(toEdit.range_work.start.m),
                            },
                            stop: {
                                h: toStringDate(toEdit.range_work.stop.h),
                                m: toStringDate(toEdit.range_work.stop.m),
                            }
                        }
                    }
                }
            })

            return {
                isSecondStep,
                gotoStep,

                isOpenedSelectEvents,
                toggleOpenedSelectEvents,

                selectedEvent,
                selectEvent,

                toggleModalMoveChat,
                toggleModalCreateChat,

                selectFolder,
                selectedFolder,

                openModalChoiceFolder,
                openedModalChoiceFolder,


                recipients,
                folders,

                infoToSend: infoToSend,

                time: computed(() => infoToSend.time_start),

                create,
                errors,

                selectDate,
                validDate,
                validTime,
                toggleOpenedDatepicker,
                isOpenedDatepicker,

                selectRangeWork,
                isOpenedRangeWork,
                toggleOpenedRangeWork,
                rangeWorkString,

                inputName,
                inputSendDay,
                inputInterval,

                toggleModalCalendar,
                openedModalCalendar,
                toggleModalTimeRangepicker,
                openedModalTimeRangepicker,

            }
        }
    }
</script>

<style lang="scss" src="./settings-mailings-create.scss"></style>