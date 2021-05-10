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
                    <div class="base-timepicker__button" @click.stop="shiftSlide(-1, null, 'h_start')" >
                        <svg  width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5L4.88097 1L1 5" stroke="#1D1D35" stroke-linecap="round"/>
                        </svg>
                    </div>
                    <div class="base-timepicker__slider">
                        <div class="base-timepicker__slider-wrapper" ref="h_start"
                            style="transform: translate3d(0, 0, 0)"
                        >
                            <div class="base-timepicker__element" v-for="hour in timepicker.times.h_start"
                                :class="{'base-timepicker__element_active': hour === modifiedPropsRangeWork.h_start}"
                            >
                                {{hour}}
                            </div>
                        </div>
                    </div>
                    <div class="base-timepicker__button" @click.stop="shiftSlide(1, null, 'h_start')" >
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L5.11903 5L9 1" stroke="#1D1D35" stroke-linecap="round"/>
                        </svg>
                    </div>
                </div>
                <div class="base-timepicker__column">
                    <div class="base-timepicker__button" @click.stop="shiftSlide(-1, null, 'm_start')" >
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5L4.88097 1L1 5" stroke="#1D1D35" stroke-linecap="round"/>
                        </svg>
                    </div>
                    <div class="base-timepicker__slider">
                        <div class="base-timepicker__slider-wrapper" ref="m_start"
                             style="transform: translate3d(0, 0, 0)"
                        >
                            <div class="base-timepicker__element" v-for="minute in timepicker.times.m_start"
                                 :class="{'base-timepicker__element_active': minute === modifiedPropsRangeWork.m_start}"
                            >
                                {{minute}}
                            </div>
                        </div>
                    </div>
                    <div class="base-timepicker__button" @click.stop="shiftSlide(1, null, 'm_start')" >
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L5.11903 5L9 1" stroke="#1D1D35" stroke-linecap="round"/>
                        </svg>
                    </div>

                </div>
            </div>
            <div class="base-timepicker__container-column">
                <div class="base-timepicker__column">
                    <div class="base-timepicker__button" @click.stop="shiftSlide(-1, null, 'h_end')" >
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5L4.88097 1L1 5" stroke="#1D1D35" stroke-linecap="round"/>
                        </svg>
                    </div>
                    <div class="base-timepicker__slider">
                        <div class="base-timepicker__slider-wrapper" ref="h_end"
                             style="transform: translate3d(0, 0, 0)"
                        >
                            <div class="base-timepicker__element" v-for="hour in timepicker.times.h_end"
                                 :class="{'base-timepicker__element_active': hour === modifiedPropsRangeWork.h_end}"
                            >
                                {{hour}}
                            </div>
                        </div>
                    </div>
                    <div class="base-timepicker__button" @click.stop="shiftSlide(1, null, 'h_end')" >
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L5.11903 5L9 1" stroke="#1D1D35" stroke-linecap="round"/>
                        </svg>
                    </div>
                </div>
                <div class="base-timepicker__column">
                    <div class="base-timepicker__button" @click.stop="shiftSlide(-1, null, 'm_end')" >
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5L4.88097 1L1 5" stroke="#1D1D35" stroke-linecap="round"/>
                        </svg>
                    </div>
                    <div class="base-timepicker__slider">
                        <div class="base-timepicker__slider-wrapper" ref="m_end"
                             style="transform: translate3d(0, 0, 0)"
                        >
                            <div class="base-timepicker__element" v-for="minute in timepicker.times.m_end"
                                 :class="{'base-timepicker__element_active': minute === modifiedPropsRangeWork.m_end}"
                            >
                                {{minute}}
                            </div>
                        </div>
                    </div>
                    <div class="base-timepicker__button" @click.stop="shiftSlide(1, null, 'm_end')" >
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
    import { reactive, ref, computed, onMounted } from 'vue';
    import WheelIndicator from 'wheel-indicator'

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
                times: {
                    h_start: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
                    h_end: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
                    m_start: ['00', '10', '20', '30', '40', '50'],
                    m_end: ['00', '10', '20', '30', '40', '50'],
                },
                current: {
                    h_start: 0,
                    m_start: 0,
                    h_end: 0,
                    m_end: 0,
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
                        let index = timepicker.times[prop].findIndex(i => i == modifiedPropsRangeWork.value[prop]);
                        timepicker.current[prop] = index - 2;
                        refs[prop].value.style.transform = `translate3d(0px, ${ - slideSize * timepicker.current[prop]}px, 0px)`;
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
                emit('selectRangeWork', newRangeWork);
            }

            onMounted(() => {
                firstInit();
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
            })

            return {
                timepicker: computed(() => timepicker),

                h_start: refs.h_start,
                m_start: refs.m_start,
                h_end: refs.h_end,
                m_end: refs.m_end,

                shiftSlide,

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

        user-select: none;
        touch-action: pan-y;
    }
    .base-timepicker__slider {
        height: 200px;
        margin: 10px 0;
        overflow: hidden;
        position: relative;
    }
    .base-timepicker__slider-wrapper {
        transition: .2s;
        position: relative;
        transform: translate3d(0, 0px, 0);
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

        cursor: pointer;
        position: relative;
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