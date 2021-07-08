<template>
    <div class="base-calendar">
            <div class="base-calendar__month">
                <div class="base-calendar__button" @click="gotoPrev">
                    <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 1L2 8.20831L9 15" stroke="#FBFBFE" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </div>
                <span>
                    {{months[calendar.currentMonth]}} {{calendar.currentYear}}
                </span>
                <div class="base-calendar__button" @click="gotoNext">
                    <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 15L8 7.79169L0.999999 1" stroke="#FBFBFE" stroke-width="2" stroke-linecap="round"/>
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
                            'base-calendar__day_active': isSameMon && (day === new Date(+time * 1000).getDate())
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
    import {reactive, computed, ref, onMounted} from 'vue';

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
                emit('selectDate', new Date(calendar.currentYear, calendar.currentMonth, +day).getTime())
            }

            onMounted(() => {
                if (!props.time) {
                    createCalendar(new Date().getFullYear(), new Date().getMonth() + 1)
                } else {
                    createCalendar(new Date(+props.time * 1000).getFullYear(), new Date(+props.time * 1000).getMonth() + 1)
                }
            })

            return {
                calendar,
                months,

                gotoNext,
                gotoPrev,
                isSameMon,
                selectDate,
                time: computed(() => props.time),
            }
        }
    }
</script>

<style lang="scss">
    .base-calendar {
        width: 100%;
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
        font-style: normal;
        font-weight: 600;
        font-size: 22px;
        line-height: 29px;

        color: var(--modal-font-color);

        display: flex;
        align-items: center;
        padding: 0 20px;
        justify-content: space-between;
        margin-bottom: 20px;
        span {
            margin: 0 14px;
        }
    }
    .base-calendar__table {
        width: 100%;
        border-spacing: 0 10px;
        background: var(--calendar-bg);

        th, td {
            text-align: center;
            font-weight: normal;
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 21px;
            color: var(--search-input-placeholder-color);
        }

        th {
            border-bottom: 1px solid var(--calendar-border-color);
            padding: 16px 0 15px;
        }
        .base-calendar__day {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            transition: .2s ease;
            &:hover {
                background: var(--modal-bg-color);
            }
            &.base-calendar__day_active {
                background: var(--green-color);
                color: white;
            }
        }
    }
    .base-calendar__button {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        background: transparent;
        border-radius: 6px;
        transition: .2s ease;
        padding: 12px;
        &:hover {
            background: var(--calendar-bg)
        }
    }
</style>