<template>
    <div class="base-ranged-buttons">
        <div class="base-ranged-buttons__button base-ranged-buttons__button_active" @click="up">
            <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5713 5.66667L5.86382 1L1.42843 5.66667"
                      stroke="#EDEDEF" stroke-linecap="round"/>
            </svg>
        </div>
        <div class="base-ranged-buttons__button" @click="down"
            :class="{'base-ranged-buttons__button_active': !disabledDown}"
        >
            <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.42847 1.33333L6.13593 6L10.5713 1.33333"
                      stroke="#1D1D35" stroke-linecap="round"/>
            </svg>
        </div>
    </div>
</template>

<script>
    import { computed } from 'vue';
    export default {
        props: {
            disabledDown: Boolean,
        },
        setup(props, {emit}) {

            const up = () => {
                emit('up');
            }
            const down = () => {
                emit('down');
            }

            return {
                up, down,
                disabledDown: computed(() => props.disabledDown),
            }
        }
    }
</script>

<style lang="scss">
    .base-ranged-buttons__button {
        background: #757589;
        border-radius: 2px;
        width: 16px;
        height: 16px;
        min-width: 16px;
        min-height: 16px;
        background: var(--ranged-buttons-color);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        svg {
            path {
                stroke: var(--date-in-message-color);
            }
        }
        &:first-of-type {
            margin-bottom: 2px;
        }
        &.base-ranged-buttons__button_active {
            background: var(--folder-color);
            svg {
                path{
                    stroke: var(--date-in-message-color);
                }
            }
        }
    }
</style>