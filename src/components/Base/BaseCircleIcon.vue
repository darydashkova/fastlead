<template>
    <div class="base-circle-icon"
        :class="{
            'base-circle-icon_active': isActive,
            'base-circle-icon_need-selecting': isNeedSelecting,
            'base-circle-icon_selected': isSelected,
        }"
    >
        <div v-if="isNeedSelecting" class="base-circle-icon__selector"
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
        <div class="base-circle-icon__image"
            :style="isActive?iconStylesDisabled(src):iconStyles(src)"
        ></div>
    </div>
</template>

<script>
    import { computed, ref, watchEffect, toRefs } from "vue";
    import {useImages} from "../../composition/useImages";
    export default {
        props: {
            isActive: Boolean,
            src: String,
            isNeedSelecting: Boolean,
            isSelected: Boolean,
        },
        setup(props, {emit}) {
            const { getImage } = useImages()
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
            const src = ref(null);

            if (props.src) {
                getImage(props.src)
                    .then(r => {
                        let url = URL.createObjectURL(r);
                        src.value = `${url}`;
                    })
            }

            const iconStyles = src => {
                if (src === null) return;
                return {
                    'background': `url(${src}) no-repeat`,
                    'background-size': 'cover',
                    'background-position': 'center center',
                }
            }

  const iconStylesDisabled = src => {
                if (src === null) return;
                return {
                    'background': `url(${src}) no-repeat`,
                    'opacity' : ' 0.65',
                    'background-size': 'cover',
                    'background-position': 'center center',
                }
            }


            return {
                isActive: props.isActive,
                src,
                iconStyles,
                iconStylesDisabled,
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
        &.base-circle-icon_big {
            $diagonal: 75px;
            /*diagonal === диагональ круга(картинки)*/
            width: $diagonal;
            height: $diagonal;
            display: inline-block;
            .base-circle-icon__image{
                width: $diagonal;
                height: $diagonal;
            }
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
        &.base-circle-icon__52 {
            $diagonal: 52px;
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
        &.base-circle-icon_need-selecting {
            &:hover {
                .base-circle-icon__selector {
                    display: flex;
                }
                .base-circle-icon__image {
                    display: none;
                }
            }
        }
        &.base-circle-icon_selected {
            .base-circle-icon__selector {
                display: flex;
            }
            .base-circle-icon__image {
                display: none;
            }
        }
    }
    .base-circle-icon__selector {
        width: 22px;
        height: 22px;
        background: #9797BB;
        border-radius: 5px;
        padding: 1.6px;
        justify-content: center;
        align-items: center;
        display: none;
    }
    .base-circle-icon__inside-selector {
        background: #FBFBFE;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
    .base-circle-icon__selector_active {
        background: var(--green-color);
    }
</style>