<template>
    <div class="base-calendar">
        <template v-if="pickedDate">
            <div class="base-calendar__month">
                <div class="base-calendar__button" @click="gotoPrev">
                    <svg class="pointer"  width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 1L1 5.11903L5 9" stroke="url(#paint0_linear)" stroke-linecap="round"/>
                        <defs>
                            <linearGradient id="paint0_linear" x1="-0.654321" y1="12.1605" x2="9.59392" y2="7.15327" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#00BF6D"/>
                                <stop offset="1" stop-color="#98D730"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <span>
                {{months[calendar.currentMonth]}} {{calendar.currentYear}}
            </span>
                <div class="base-calendar__button" @click="gotoNext">
                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 9L5 4.88097L1 1" stroke="url(#paint0_linear)" stroke-linecap="round"/>
                        <defs>
                            <linearGradient id="paint0_linear" x1="6.65432" y1="-2.16049" x2="-3.59392" y2="2.84673" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#00BF6D"/>
                                <stop offset="1" stop-color="#98D730"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </div>
            <table class="base-calendar__table">
                <tr>
                    <th v-for="item in calendar.header">
                        {{item}}
                    </th>
                </tr>
                <tr v-for="week in calendar.days">
                    <td v-for="(day, index) in week" :key="day + index*10000 + 'day'">
                        <div class="base-calendar__day pointer"
                             @click.stop="selectDate(day)"
                             :class="{
                            'base-calendar__day_active': isSameMon && (day === new Date(time * 1000).getDate())
                        }"
                        >
                            {{day}}
                        </div>
                    </td>
                </tr>
            </table>
        </template>
        <template v-else>
            <div class="base-calendar-timepicker__container">
                <div class="base-calendar-timepicker__container-column">
                    <div class="base-calendar-timepicker__column">
                        <div class="base-calendar-timepicker__button" @click.stop="shiftSlide(-1, null, 'h')" >
                            <svg  width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 5L4.88097 1L1 5" stroke="#1D1D35" stroke-linecap="round"/>
                            </svg>
                        </div>
                        <div class="base-calendar-timepicker__slider">
                            <div class="base-calendar-timepicker__slider-wrapper" ref="h"
                                 style="transform: translate3d(0, 0, 0)"
                            >
                                <div class="base-calendar-timepicker__element" v-for="hour in timepicker.times.h"
                                     :class="{'base-calendar-timepicker__element_active': hour === modifiedPropsRangeWork.h}"
                                >
                                    {{hour}}
                                </div>
                            </div>
                        </div>
                        <div class="base-calendar-timepicker__button" @click.stop="shiftSlide(1, null, 'h')" >
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L5.11903 5L9 1" stroke="#1D1D35" stroke-linecap="round"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="base-calendar-timepicker__container-column">
                    <div class="base-calendar-timepicker__column">
                        <div class="base-calendar-timepicker__button" @click.stop="shiftSlide(-1, null, 'm')" >
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 5L4.88097 1L1 5" stroke="#1D1D35" stroke-linecap="round"/>
                            </svg>
                        </div>
                        <div class="base-calendar-timepicker__slider">
                            <div class="base-calendar-timepicker__slider-wrapper" ref="m"
                                 style="transform: translate3d(0, 0, 0)"
                            >
                                <div class="base-calendar-timepicker__element" v-for="minute in timepicker.times.m"
                                     :class="{'base-calendar-timepicker__element_active': minute === modifiedPropsRangeWork.m}"
                                >
                                    {{minute}}
                                </div>
                            </div>
                        </div>
                        <div class="base-calendar-timepicker__button" @click.stop="shiftSlide(1, null, 'm')" >
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L5.11903 5L9 1" stroke="#1D1D35" stroke-linecap="round"/>
                            </svg>
                        </div>

                    </div>
                </div>

                <div class="base-calendar-timepicker__selector">
                    <div class="base-calendar-timepicker__hyphen">
                        —
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import {reactive, computed, ref, onMounted} from 'vue';
    import WheelIndicator from "wheel-indicator";

    export default {
        props: {
            time: [String, Number],
        },
        setup(props, {emit}) {

            const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']

            const calendar = reactive({
                header: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
                days: [],
                currentMonth: 0,
                currentYear: new Date().getFullYear(),
            })

            const createCalendar = (year, month) => {
                function getDay(date) { // получить номер дня недели, от 0 (пн) до 6 (вс)
                    let day = date.getDay();
                    if (day == 0) day = 7; // сделать воскресенье (0) последним днем
                    return day - 1;
                }

                let index = 0;
                let mon = month - 1;

                calendar.days = [[]];
                calendar.currentMonth = mon;
                calendar.currentYear = year;

                let d = new Date(year, mon);

                for (let i = 0; i < getDay(d); i++) {
                    calendar.days[index].push('');
                }
                while (d.getMonth() === mon) {
                    calendar.days[index].push(d.getDate());

                    if (getDay(d) % 7 === 6) { // вс, последний день - перевод строки
                        index++;
                        calendar.days[index] = [];
                    }
                    d.setDate(d.getDate() + 1);
                }
                if (getDay(d) != 0) {
                    for (let i = getDay(d); i < 7; i++) {
                        calendar.days[index].push('');
                    }
                }
            }

            const gotoNext = () => {
                let k = new Date(calendar.currentYear, calendar.currentMonth + 1);
                createCalendar(k.getFullYear(), k.getMonth() + 1)
            }

            const gotoPrev = () => {
                let k = new Date(calendar.currentYear, calendar.currentMonth - 1);
                createCalendar(k.getFullYear(), k.getMonth() + 1)
            }

            const isSameMon = computed(() => {
                return new Date(+props.time * 1000).getFullYear() === calendar.currentYear
                        && new Date(+props.time * 1000).getMonth() === calendar.currentMonth
            })

            const selectDate = (day) => {
                firstInit(day)
                pickedDate.value = false;
                setTimeout(() => {
                    for (let prop in refs) {
                        refs[prop].value.addEventListener('mousedown', (e) => dragStart(e, prop));
                        refs[prop].value.addEventListener('touchstart', (e) => dragStart(e, prop));
                        new WheelIndicator({
                            elem: refs[prop].value,
                            callback: (e) => {
                                let delta = e.deltaY || e.detail || e.wheelDelta;
                                if (delta > 0) {
                                    shiftSlide(1, null, prop)
                                } else if (delta <= 0) {
                                    shiftSlide(-1, null, prop)
                                }
                            },
                            preventMouse: false,
                        })
                    }
                }, 100)

            }

            const pickedDate = ref(true);

            const timepicker = reactive({
                times: {
                    h: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
                    m: ['00', '10', '20', '30', '40', '50'],
                },
                current: {
                    h: 0,
                    m: 0,
                },
            })
            const refs = {
                h: ref(null),
                m: ref(null),
            }

            const modifiedPropsRangeWork = computed(() => {
                if (props.time) {
                    return {
                        h: new Date(props.time * 1000).getHours() < 10? '0'+new Date(props.time * 1000).getHours() : new Date(props.time * 1000).getHours().toString(),
                        m: new Date(props.time * 1000).getMinutes() < 10? '0'+new Date(props.time * 1000).getMinutes() : new Date(props.time * 1000).getMinutes().toString(),
                    }
                } else return false;

            })
            //обработка слайдера
            let posY1 = 0,
                posY2 = 0,
                posInitial,
                posFinal,
                threshold = 22.5,
                slideSize = 45, //45 Высота
                trfRegExp = /[-0-9.]+(?=px)/g,
                dragging = false;


            function dragStart (e, prop) {
                e = e || window.event;
                e.preventDefault();
                let style = refs[prop].value.style.transform;
                posInitial = +style.match(trfRegExp)[1]

                if (e.type === 'touchstart') {
                    posY1 = e.touches[0].clientY;
                    document.ontouchend = (e) => dragEnd(e, prop);
                    document.ontouchmove = (e) => dragAction(e, prop);
                } else {
                    posY1 = e.clientY;
                    document.onmouseup = (e) => dragEnd(e, prop);
                    document.onmousemove = (e) => dragAction(e, prop);
                    dragging = true;
                }
            }
            function dragAction (e, prop) {
                e = e || window.event;
                if (e.type === 'touchmove') {
                    posY2 = posY1 - e.touches[0].clientY;
                    posY1 = e.touches[0].clientY;
                } else {
                    posY2 = posY1 - e.clientY;
                    posY1 = e.clientY;
                }
                if (dragging) {
                    let style = refs[prop].value.style.transform,
                        transform = +style.match(trfRegExp)[1];
                    refs[prop].value.style.transform = `translate3d(0px, ${transform - posY2}px, 0px)`;
                }
            }
            function dragEnd (e, prop) {
                dragging = false;
                let style = refs[prop].value.style.transform;
                posFinal = +style.match(trfRegExp)[1];
                let k = Math.abs(Math.trunc((posFinal - posInitial) / (threshold * 2)));
                if (posFinal - posInitial < -threshold) {
                    let rest = (posFinal - posInitial) % (-threshold * 2);
                    if (rest < -threshold) {
                        shiftSlide(1, 'drag', prop, k + 1);
                    } else {
                        shiftSlide(1, 'drag', prop, k);
                    }
                } else if (posFinal - posInitial > threshold) {
                    let rest = (posFinal - posInitial) % (threshold * 2);
                    if (rest > threshold) {
                        shiftSlide(-1, 'drag', prop, k + 1);
                    } else {
                        shiftSlide(-1, 'drag', prop, k);
                    }
                } else {
                    refs[prop].value.style.transform = `translate3d(0px, ${posInitial}px, 0px)`;
                }
                document.onmouseup = null;
                document.onmousemove = null;
                document.ontouchend = null;
                document.ontouchmove = null;
            }
            function shiftSlide(dir, action, prop, count = 1) {
                refs[prop].value.classList.add('base-timepicker__slider-wrapper_shifting');
                if (!action) {
                    let style = refs[prop].value.style.transform;
                    posInitial = +style.match(trfRegExp)[1];
                }
                if (dir === 1) {
                    let toChangeCurrent = timepicker.current[prop] + count,
                        toChangeDifference = toChangeCurrent - timepicker.times[prop].length - 1 + 4,
                        newCount = count;
                    if (toChangeDifference >= 0) {
                        newCount -= toChangeDifference;
                    }
                    refs[prop].value.style.transform = `translate3d(0px, ${posInitial - slideSize * newCount}px, 0px)`;
                    timepicker.current[prop] = timepicker.current[prop] + newCount;
                } else if (dir === -1) {
                    let toChangeCurrent = timepicker.current[prop] - count,
                        toChangeDifference = toChangeCurrent + 2,
                        newCount = count;
                    if (toChangeDifference < 0) {
                        newCount += toChangeDifference;
                    }
                    refs[prop].value.style.transform = `translate3d(0px, ${posInitial + slideSize * newCount}px, 0px)`;
                    timepicker.current[prop] = timepicker.current[prop] - newCount;
                }
                let newRangeWork = {}
                for (let property in timepicker.current) {
                    newRangeWork[property] = timepicker.times[property][timepicker.current[property] + 2];
                }
                let date = new Date(+props.time * 1000);
                emit('selectDate', new Date(calendar.currentYear, calendar.currentMonth, date.getDate(), newRangeWork.h, newRangeWork.m).getTime())

            }

            const firstInit = (day) => {
                if (modifiedPropsRangeWork.value !== false) {
                    for (let prop in timepicker.current) {
                        let index = timepicker.times[prop].findIndex(i => i === modifiedPropsRangeWork.value[prop]);
                        shiftSlide(1, null, prop, index - 2);
                    }
                } else {
                    if (modifiedPropsRangeWork.value) {
                        emit('selectDate', new Date(calendar.currentYear, calendar.currentMonth, +day, modifiedPropsRangeWork.value.h, modifiedPropsRangeWork.value.m).getTime())
                    } else {
                        emit('selectDate', new Date(calendar.currentYear, calendar.currentMonth, +day, 2, 20).getTime())

                    }
                }
            }
            if (!props.time) {
                createCalendar(new Date().getFullYear(), new Date().getMonth() + 1)
            } else {
                createCalendar(new Date(+props.time * 1000).getFullYear(), new Date(+props.time * 1000).getMonth() + 1)
            }
            firstInit();

            return {
                calendar,
                months,

                gotoNext,
                gotoPrev,
                time: computed(() => props.time),
                isSameMon,
                selectDate,
                pickedDate,

                timepicker,
                h: refs.h,
                m: refs.m,
                modifiedPropsRangeWork,
                shiftSlide,
            }
        }
    }
</script>

<style lang="scss">
    .base-calendar {
        position: absolute;
        width: 100%;
        left: 0;
        top: calc(100% + 5px);
        background: var(--calendar-bg);
        padding: 5px;
        border-radius: 3px;

        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        color: var(--calendar-font-color);
        z-index: 100;
    }
    .base-calendar__month {
        width: 100%;
        background: var(--green-color);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;

        display: flex;
        align-items: center;
        span {
            margin: 0 8px;
        }
    }
    .base-calendar__table {
        width: 100%;
        border-spacing: 0 10px;

        th, td {
            text-align: center;
        }

        th {
            border-top: 1px solid var(--calendar-border-color);
            border-bottom: 1px solid var(--calendar-border-color);
            padding: 2px 0;
            font-weight: normal;
        }
        .base-calendar__day {
            width: 29px;
            height: 29px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            &.base-calendar__day_active {
                background: var(--green-color);
                color: white;
            }
        }
    }
    .base-calendar__button {
        cursor: pointer;
        width: 8px;
        height: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .base-calendar-timepicker {
        position: absolute;
        width: 100%;
        left: 0;
        top: calc(100% + 5px);
        background: var(--calendar-bg);
        padding: 5px;
        border-radius: 3px;

        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        color: var(--calendar-font-color);
        z-index: 100;
    }
    .base-calendar-timepicker__header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 16px;
    }
    .base-calendar-timepicker__header-item {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        margin: 0 20px;
        background: var(--green-color);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .base-calendar-timepicker__container {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: transparent;
    }
    .base-calendar-timepicker__container-column {
        display: flex;
        justify-content: center;
        width: 40%;
        margin: 0 10px;
        position: relative;
        z-index: 101;
    }
    .base-calendar-timepicker__column {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .base-calendar-timepicker__slider {
        height: 200px;
        margin: 10px 0;
        overflow: hidden;
    }
    .base-calendar-timepicker__slider-wrapper {
        transition: .2s;
        height: 100%;
    }
    .base-calendar-timepicker__element {
        margin-bottom: 24px;

        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        text-align: center;
        color: var(--calendar-font-color);
        &.base-calendar-timepicker__element_active {
            color: var(--calendar-active-font-color);
        }
    }
    .base-calendar-timepicker__button {
        cursor: pointer;
        width: 8px;
        height: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .base-calendar-timepicker__selector {
        position: absolute;
        width: 100%;
        height: 31px;
        border-radius: 3px;
        background: var(--settings-main-color);
        z-index: 100;

        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .base-calendar-timepicker__double-dot {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 20px;
        color: var(--calendar-font-color);
    }
</style>