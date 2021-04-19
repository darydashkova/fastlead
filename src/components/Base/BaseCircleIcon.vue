<template>
    <div class="base-circle-icon"
        :class="{'base-circle-icon_active': isActive,}"
         @mouseleave="moveOut"
    >
        <div v-if="isSelector || isSelected" class="base-circle-icon__selector"
             :class="{'base-circle-icon__selector_active': isSelected}"
            @click.stop="toggleSelecting"
        >
            <div class="base-circle-icon__inside-selector">
                <svg v-if="isSelected" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 7.44359L4.3114 9.99983L11.225 1.479" stroke="url(#paint0_linear)" stroke-width="1.5" stroke-linecap="round"/>
                    <defs>
                        <linearGradient id="paint0_linear" x1="-3.22886" y1="13.3661" x2="10.4344" y2="-2.65579" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#00BF6D"/>
                            <stop offset="1" stop-color="#98D730"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
        <img v-else class="base-circle-icon__image" :src="src" alt=""
             @mouseover="moveIn"
        >
    </div>
</template>

<script>
    import { computed, ref } from "vue";
    export default {
        props: {
            isActive: Boolean,
            src: String,
            isNeedSelecting: Boolean,
            isSelected: Boolean,
        },
        setup(props, {emit}) {
            const isSelector = ref(false);
            const moveIn = () => {
                if (props.isNeedSelecting) {
                    isSelector.value = true;
                }
            }
            const moveOut = () => {
                if (props.isNeedSelecting) {
                    isSelector.value = false;
                }
            }

            const toggleSelecting = () => {
                emit('toggleSelecting')
            }

            return {
                isActive: props.isActive,
                src: computed(() => props.src),

                isSelector,
                moveIn,
                moveOut,
                toggleSelecting,
                isSelected: computed(() => props.isSelected),
            }
        }
    }
</script>

<style lang="scss">
    .base-circle-icon {
        $diagonal: 46px;
        /*diagonal === диагональ круга(картинки)*/
        width: $diagonal;
        height: $diagonal;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        &.base-circle-icon_active {
            height: calc(#{$diagonal} + 7px);
            /*7px === падение активного круга вниз от картинки*/
            &:after {
                /*активный круг*/
                content: '';
                position: absolute;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: var(--green-color);
                left: calc(#{$diagonal} / 2 - 9.5px);
                bottom: 0;
                border: 1.5px solid var(--left-bar-color);
            }
        }
        .base-circle-icon__image{
            width: $diagonal;
            height: $diagonal;
            border-radius: 50%;
        }
        &.base-circle-icon_little {
            $diagonal: 21px;
            /*diagonal === диагональ круга(картинки)*/
            width: $diagonal;
            height: $diagonal;
            display: inline-block;
            .base-circle-icon__image{
                width: $diagonal;
                height: $diagonal;
            }
        }
        &.base-circle-icon_ml-negative {
            margin-left: -4px;
            &:first-of-type {
                margin-left: 0;
            }
        }
    }
    .base-circle-icon__selector {
        width: 22px;
        height: 22px;
        background: #B7B7BE;
        border-radius: 5px;
        padding: 1.5px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .base-circle-icon__inside-selector {
        background: #FFFFFF;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 18.5px;
        height: 18.5px;
    }
    .base-circle-icon__selector_active {
        background: var(--green-color);
        .base-circle-icon__inside-selector {
            background: var(--messages-color);
        }
    }
</style>