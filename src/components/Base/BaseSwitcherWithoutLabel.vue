<template>
    <div class="base-switcher-without-label">
        <label class="base-switcher-without-label__label" :for="dynamicId">
            <input type="checkbox"
                   class="base-switcher-without-label__checkbox"
                   :id="dynamicId"
                   @change="change"
            >
            <div class="base-switcher-without-label__wrapper">
                <span class="base-switcher-without-label__slider base-switcher-without-label__slider_round"
                    :class="{'base-switcher-without-label__slider_checked': value}"
                >
                    <span class="base-switcher-without-label__slider-circle"></span>
                </span>
            </div>
        </label>
    </div>
</template>

<script>
    import {computed} from "vue";

    export default {
        props: {
            dynamicId: String,
            value: Boolean,
        },
        setup(props, {emit}) {
            const change = ($event) => {
                emit('changeValue', $event.target.checked);
            }
            return {
                change,
                value: computed(() => props.value),
            }
        }
    }
</script>

<style lang="scss">
    .base-switcher-without-label {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 100%;
    }
    .base-switcher-without-label__label {
        cursor: pointer;
    }
    .base-switcher-without-label__wrapper {
        position: relative;
        width: 32px;
        height: 18px;
    }
    .base-switcher-without-label__checkbox {
        display:none;
    }
    .base-switcher-without-label__slider {
        position: absolute;
        z-index: 20;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #FFFFFF;
        border: 1px solid #9C9CBC;
        -webkit-transition: .4s;
        transition: .4s;
        &.base-switcher-without-label__slider_checked {
            background: #6854ED;
            border: 1px solid #6854ED;
            .base-switcher-without-label__slider-circle {
                -webkit-transform: translateX(14px);
                -ms-transform: translateX(14px);
                transform: translateX(14px);

                background: #FFFFFF;
            }
        }
    }
    .base-switcher-without-label__slider-circle {
        position: absolute;
        height: 14px;
        width: 14px;
        left: 1px;
        bottom: 1px;
        background: #9C9CBC;
        -webkit-transition: .4s;
        transition: .4s;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .base-switcher-without-label__slider_round {
        border-radius: 26px;
        .base-switcher-without-label__slider-circle {
            border-radius: 50%;
        }
    }
</style>