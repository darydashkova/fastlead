<template>
    <div class="base-timepicker">
        <div class="base-timepicker__header">
            <div class="base-timepicker__header-item">
                Начало
            </div>
            <div class="base-timepicker__header-item">
                Конец
            </div>
        </div>
        <div class="base-timepicker__container">
            <div class="base-timepicker__container-column">
                <div class="base-timepicker__column">
                    <div class="base-timepicker__button" @click.stop="prev('h_start')" :disabled="timepicker.disabled.h_start">
                        <svg  width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5L4.88097 1L1 5" stroke="#1D1D35" stroke-linecap="round"/>
                        </svg>
                    </div>
                    <div class="base-timepicker__slider">
                        <div class="base-timepicker__slider-wrapper" ref="h_start">
                            <div class="base-timepicker__element" v-for="hour in timepicker.times.h_start"
                                :class="{'base-timepicker__element_active': hour === modifiedPropsRangeWork.h_start}"
                            >
                                {{hour}}
                            </div>
                        </div>
                    </div>
                    <div class="base-timepicker__button" @click.stop="next('h_start')" :disabled="timepicker.disabled.h_start">
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L5.11903 5L9 1" stroke="#1D1D35" stroke-linecap="round"/>
                        </svg>
                    </div>
                </div>
                <div class="base-timepicker__column">
                    <div class="base-timepicker__button" @click.stop="prev('m_start')" :disabled="timepicker.disabled.m_start">
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5L4.88097 1L1 5" stroke="#1D1D35" stroke-linecap="round"/>
                        </svg>
                    </div>
                    <div class="base-timepicker__slider">
                        <div class="base-timepicker__slider-wrapper" ref="m_start">
                            <div class="base-timepicker__element" v-for="minute in timepicker.times.m_start"
                                 :class="{'base-timepicker__element_active': minute === modifiedPropsRangeWork.m_start}"
                            >
                                {{minute}}
                            </div>
                        </div>
                    </div>
                    <div class="base-timepicker__button" @click.stop="next('m_start')" :disabled="timepicker.disabled.m_start">
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L5.11903 5L9 1" stroke="#1D1D35" stroke-linecap="round"/>
                        </svg>
                    </div>

                </div>
            </div>
            <div class="base-timepicker__container-column">
                <div class="base-timepicker__column">
                    <div class="base-timepicker__button" @click.stop="prev('h_end')" :disabled="timepicker.disabled.h_end">
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5L4.88097 1L1 5" stroke="#1D1D35" stroke-linecap="round"/>
                        </svg>
                    </div>
                    <div class="base-timepicker__slider">
                        <div class="base-timepicker__slider-wrapper" ref="h_end">
                            <div class="base-timepicker__element" v-for="hour in timepicker.times.h_end"
                                 :class="{'base-timepicker__element_active': hour === modifiedPropsRangeWork.h_end}"
                            >
                                {{hour}}
                            </div>
                        </div>
                    </div>
                    <div class="base-timepicker__button" @click.stop="next('h_end')" :disabled="timepicker.disabled.h_end">
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L5.11903 5L9 1" stroke="#1D1D35" stroke-linecap="round"/>
                        </svg>
                    </div>
                </div>
                <div class="base-timepicker__column">
                    <div class="base-timepicker__button" @click.stop="prev('m_end')" :disabled="timepicker.disabled.m_end">
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5L4.88097 1L1 5" stroke="#1D1D35" stroke-linecap="round"/>
                        </svg>
                    </div>
                    <div class="base-timepicker__slider">
                        <div class="base-timepicker__slider-wrapper" ref="m_end">
                            <div class="base-timepicker__element" v-for="minute in timepicker.times.m_end"
                                 :class="{'base-timepicker__element_active': minute === modifiedPropsRangeWork.m_end}"
                            >
                                {{minute}}
                            </div>
                        </div>
                    </div>
                    <div class="base-timepicker__button" @click.stop="next('m_end')" :disabled="timepicker.disabled.m_end">
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L5.11903 5L9 1" stroke="#1D1D35" stroke-linecap="round"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="base-timepicker__selector">
                <div class="base-timepicker__double-dot">
                    :
                </div>
                <div class="base-timepicker__hyphen">
                    —
                </div>
                <div class="base-timepicker__double-dot">
                    :
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { reactive, ref, computed } from 'vue';

    export default {
        props: {
            range_work: {
                start: {
                    h: String,
                    m: String,
                },
                stop: {
                    h: String,
                    m: String,
                }
            }
        },
        setup(props, {emit}) {
            const timepicker = reactive({
                hours: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
                minutes: ['00', '10', '20', '30', '40', '50'],
                lasts: {
                    h_start: '23',
                    h_end: '23',
                    m_start: '50',
                    m_end: '50',
                },
                start: '00',
                times: {
                    h_start: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
                    h_end: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
                    m_start: ['00', '10', '20', '30', '40', '50'],
                    m_end: ['00', '10', '20', '30', '40', '50'],
                },
                current: {
                    h_start: '00',
                    m_start: '00',
                    h_end: '00',
                    m_end: '00',
                },
                disabled: {
                    h_start: false,
                    h_end: false,
                    m_start: false,
                    m_end: false,
                },
            })
            const refs = {
                h_start: ref(null),
                m_start: ref(null),
                h_end: ref(null),
                m_end: ref(null),
            }

            const modifiedPropsRangeWork = computed(() => {
                if (props.range_work.start.h && props.range_work.stop.h && props.range_work.start.m && props.range_work.stop.m) {
                    return {
                        h_start: props.range_work.start.h,
                        h_end: props.range_work.stop.h,
                        m_start: props.range_work.start.m,
                        m_end: props.range_work.stop.m,
                    }
                } else return false;

            })

            const firstInit = () => {
                if (modifiedPropsRangeWork.value !== false) {
                    for (let prop in timepicker.current) {
                        while (timepicker.times[prop][2] !== modifiedPropsRangeWork.value[prop]) {
                            timepicker.times[prop].push(timepicker.current[prop]);
                            let afterChangeCurrent = () => {
                                timepicker.times[prop].shift();
                                timepicker.disabled[prop] = false;
                            }
                            if (timepicker.current[prop] === timepicker.lasts[prop]) {
                                timepicker.current[prop] = timepicker.start;
                                afterChangeCurrent();
                            } else {
                                let ind = timepicker.times[prop].findIndex(i => i === timepicker.current[prop])
                                timepicker.current[prop] = timepicker.times[prop][ind + 1];
                                afterChangeCurrent();
                            }
                        }
                    }
                } else {
                    emit('selectRangeWork', {
                        h_start: '02',
                        m_start: '20',
                        h_end: '02',
                        m_end: '20',
                    });
                }
            }

            const next = (property) => {
                if (!timepicker.disabled[property]) {
                    timepicker.disabled[property] = true;
                    timepicker.times[property].push(timepicker.current[property]);
                    refs[property].value.classList.add('base-timepicker__slider-wrapper_next');
                    let afterChangeCurrent = () => {
                        timepicker.times[property].shift();
                        refs[property].value.classList.remove('base-timepicker__slider-wrapper_next');
                        timepicker.disabled[property] = false;

                        let newRangeWork = {}
                        for (let prop in timepicker.current) {
                            newRangeWork[prop] = timepicker.times[prop][2];
                        }
                        emit('selectRangeWork', newRangeWork);
                    }
                    if (timepicker.current[property] === timepicker.lasts[property]) {
                        setTimeout(() => {
                            timepicker.current[property] = timepicker.start;
                            afterChangeCurrent();
                        }, 300)
                    } else {
                        setTimeout(() => {
                            let ind = timepicker.times[property].findIndex(i => i === timepicker.current[property])
                            timepicker.current[property] = timepicker.times[property][ind + 1];
                            afterChangeCurrent();
                        }, 300)
                    }
                }
            }

            const prev = (property) => {
                if (!timepicker.disabled[property]) {
                    let afterChangeCurrent = () => {
                        refs[property].value.classList.remove('base-timepicker__slider-wrapper_prev');
                        timepicker.disabled[property] = false;

                        let newRangeWork = {}
                        for (let prop in timepicker.current) {
                            newRangeWork[prop] = timepicker.times[prop][2];
                        }
                        emit('selectRangeWork', newRangeWork);
                    }

                    timepicker.disabled[property] = true;
                    if (timepicker.current[property] !== timepicker.start) {
                        let newCurrent = timepicker.times[property][timepicker.times[property].length - 1]
                        timepicker.times[property].unshift(newCurrent);
                        refs[property].value.classList.add('base-timepicker__slider-wrapper_prev');

                        setTimeout(() => {
                            timepicker.times[property].pop();
                            timepicker.current[property] = newCurrent

                            afterChangeCurrent()
                        }, 300)
                    } else {
                        timepicker.times[property].unshift(timepicker.lasts[property]);
                        refs[property].value.classList.add('base-timepicker__slider-wrapper_prev');
                        setTimeout(() => {
                            timepicker.times[property].pop();
                            timepicker.current[property] = timepicker.lasts[property];

                            afterChangeCurrent()
                        }, 300)
                    }
                }
            }

            firstInit();

            return {
                timepicker: computed(() => timepicker),

                h_start: refs.h_start,
                m_start: refs.m_start,
                h_end: refs.h_end,
                m_end: refs.m_end,

                next,
                prev,

                modifiedPropsRangeWork,
            }
        }
    }
</script>


<style lang="scss">
    .base-timepicker {
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
    .base-timepicker__header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 16px;
    }
    .base-timepicker__header-item {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        margin: 0 20px;
        background: var(--green-color);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .base-timepicker__container {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: transparent;
    }
    .base-timepicker__container-column {
        display: flex;
        justify-content: space-between;
        width: 75px;
        margin: 0 10px;
        position: relative;
        z-indeX: 101;
    }
    .base-timepicker__column {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .base-timepicker__slider {
        height: 200px;
        margin: 10px 0;
        overflow: hidden;
    }
    .base-timepicker__slider-wrapper {
        transition: .2s;
        height: 100%;
    }
    .base-timepicker__element {
        margin-bottom: 24px;

        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        text-align: center;
        color: var(--calendar-font-color);
        &.base-timepicker__element_active {
            color: var(--calendar-active-font-color);
        }
    }
    .base-timepicker__button {
        cursor: pointer;
        width: 8px;
        height: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    @keyframes next {
        from {
            transform: translateY(0);
        }
        to {
            transform: translateY(-45px)
        }
    }

    @keyframes prev {
        from {
            transform: translateY(-45px);
        }
        to {
            transform: translateY(0)
        }
    }

    .base-timepicker__slider-wrapper_next {
        animation: .3s next forwards;
    }

    .base-timepicker__slider-wrapper_prev {
        animation: .3s prev forwards;
    }
    .base-timepicker__selector {
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
    .base-timepicker__double-dot {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 20px;
        color: var(--calendar-font-color);
    }
</style>