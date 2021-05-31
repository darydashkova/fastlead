<template>
    <div class="base-steps">
        <div class="base-steps__step pointer"
             :class="{'base-steps__step_active': !isSecondStep}"
             @click="gotoStep(false)">
            Шаг 1
        </div>
        <div class="base-steps__step pointer"
             :class="{'base-steps__step_active': isSecondStep}"
             @click="gotoStep(true)">
            Шаг 2
        </div>
    </div>
</template>

<script>
    import { computed } from 'vue';
    export default {
        props: {
            isSecondStep: Boolean,
        },
        setup(props, {emit}) {
            const gotoStep = boolean => {
                emit('gotoStep', boolean);
            }

            return {
                gotoStep,
                isSecondStep: computed(() => props.isSecondStep)
            }
        }
    }
</script>

<style lang="scss">
    .base-steps {
        background: var(--settings-nav-color);
        border: 0.74px solid var(--settings-nav-color);
        box-sizing: border-box;
        border-radius: 3px;

        display: flex;
        height: 34px;
        width: 191px;
    }
    .base-steps__step {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50%;
        position: relative;

        font-style: normal;
        font-weight: normal;
        font-size: 22px;
        line-height: 29px;
        color: var(--search-input-placeholder-color);
        background: var(--settings-nav-color);

        transition: .2s ease;

        &:last-of-type {
            &:before {
                content: '';
                border-left: 0px solid transparent;
                border-top: 17px solid transparent;
                border-bottom: 17px solid transparent;
                border-right: 9px solid var(--settings-nav-color);
                position: absolute;
                left: -9px;
            }
        }
        &.base-steps__step_active {
            color: var(--font-color);
            background: var(--settings-main-color);
            &:before {
                border-right: 9px solid var(--settings-main-color);
            }
        }
    }
</style>