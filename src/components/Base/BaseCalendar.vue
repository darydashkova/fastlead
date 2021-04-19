<template>
    <div class="base-calendar">
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
    </div>
</template>

<script>
    import { reactive, computed } from 'vue';

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
            if (!props.time) {
                createCalendar(new Date().getFullYear(), new Date().getMonth() + 1)
            } else {
                createCalendar(new Date(+props.time * 1000).getFullYear(), new Date(+props.time * 1000).getMonth() + 1)
            }

            const isSameMon = computed(() => {
                return new Date(+props.time * 1000).getFullYear() === calendar.currentYear
                        && new Date(+props.time * 1000).getMonth() === calendar.currentMonth
            })

            const selectDate = (day) => {
                emit('selectDate', new Date(calendar.currentYear, calendar.currentMonth, +day).getTime())
            }

            return {
                calendar,
                months,

                gotoNext,
                gotoPrev,
                time: computed(() => props.time),
                isSameMon,
                selectDate,
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
</style>