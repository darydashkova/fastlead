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
            @click.stop="toggleSelecting">
            <div class="base-circle-icon__inside-selector">
                <svg width="12"  height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg" class="base-circle-icon__inside-selector-check">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5574 1.22258C11.8184 0.900918 11.7692 0.428598 11.4475 0.167618C11.1259 -0.093362 10.6536 -0.044182 10.3926 0.277478L3.94026 8.22982L1.20833 6.12092C0.880452 5.86781 0.409462 5.92843 0.156352 6.25631C-0.0967581 6.58422 -0.036148 7.05522 0.291732 7.30832L3.60314 9.86452L4.18261 10.3118L4.64384 9.74342L11.5574 1.22258Z" fill="#252544"/>
                </svg>
            </div>
        </div>

        <template v-if="icon">
            <div class="base-circle-icon__image" v-if="icon.hasOwnProperty('instagram_id')">
                <img src="../../assets/instagram-icon.svg">
            </div>
            <div class="base-circle-icon__image"  v-if="icon.hasOwnProperty('whatsapp_id')">
                 <img src="../../assets/whatsapp-icon.svg">
            </div>
        </template>
        <div class="base-circle-icon__image" v-else
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
            icon: Boolean,
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
            .base-circle-icon__selector {
                background: #252544 !important;
                .base-circle-icon__inside-selector{
                    background: #252544 !important;
                    &-check{
                        path {
                            fill: #40406B;
                        }
                    }
                }  
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
        background: var(--green-color);
        border-radius: 5px;
        padding: 1.6px;
        justify-content: center;
        align-items: center;
        display: none;
        
    }  
    .base-circle-icon__inside-selector {
       background: var(--green-color);
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