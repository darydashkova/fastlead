<template>
    <label class="base-switcher" for="switcher">
        <input type="checkbox"
               class="base-switcher__checkbox"
               id="switcher"

               :checked="value"
               @change="change"
        >
        <span class="base-switcher__label">
            <slot></slot>
        </span>
        <span class="base-switcher__wrapper">
            <span class="base-switcher__slider base-switcher__slider_round"
                :class="value === true? 'base-switcher__slider_checked' : ''"
            >
                <span class="base-switcher__slider-circle"></span>
            </span>
        </span>
    </label>
</template>

<script>
    import { computed } from 'vue';
    export default {
        props: {
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
    .base-switcher {
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        width: 100%;
    }
    .base-switcher__wrapper {
        position: relative;
        width: 32px;
        height: 15px;
    }
    .base-switcher__checkbox {
        display:none;
    }
    .base-switcher__slider {
        position: absolute;
        z-index: 100;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--user-info-settings-default-setting-name);
        -webkit-transition: .4s;
        transition: .4s;
        .base-switcher__slider-circle {
            position: absolute;
            height: 18px;
            width: 18px;
            left: 0;
            bottom: -1.5px;
            background: var(--user-info-settings-default-setting-name);
            -webkit-transition: .4s;
            transition: .4s;
            display: flex;
            align-items: center;
            justify-content: center;
            &:before {
                border-radius: 50%;
                content: '';
                width: 14px;
                height: 14px;
                background: var(--messenger-middle-bar-bg);
            }
        }
    }
    .base-switcher__slider_checked {
        .base-switcher__slider-circle {
            -webkit-transform: translateX(15px);
            -ms-transform: translateX(15px);
            transform: translateX(15px);
        }
    }
    .base-switcher__slider_round {
        border-radius: 8.5px;
        .base-switcher__slider-circle {
            border-radius: 50%;
        }
    }
</style>