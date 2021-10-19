<template>
    <div class="base-range-input-group ">
        <label class="base-range-input-group__label"
               :for="id">
            <slot></slot>
        </label>
        <div class="base-range-input-group__ranged-input">
            <input
                   class="base-range-input-group__input"
                   type="text"
                   :id="id"
                   :placeholder="placeholder"
                   :value="value"
                   @keypress="onlyNumber"
                   @input="input"
            >
            <div class="base-range-input-group_buttons">
                <div class="base-range-input-group__button base-range-input-group__button_active" @click="up">
                    <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5713 5.66667L5.86382 1L1.42843 5.66667"
                              stroke="#EDEDEF" stroke-linecap="round"/>
                    </svg>
                </div>
                <div class="base-range-input-group__button" @click="down"
                     :class="{'base-range-input-group__button_active': !disabledDown}"
                >
                    <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.42847 1.33333L6.13593 6L10.5713 1.33333"
                              stroke="#1D1D35" stroke-linecap="round"/>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { computed } from 'vue';
    export default {
        props: {
            disabledDown: Boolean,
            value: [String, Number],
            dynamicId: [String, Number],
            placeholder: String,
            error: Boolean,
        },
        setup(props, {emit}) {

            const up = () => {
                emit('up');
            }
            const down = () => {
                emit('down');
            }
            const onlyNumber = ($event) => {
                let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
                if (keyCode < 48 || keyCode > 57) { // 46 is dot
                    $event.preventDefault();
                }
            }
            return {
                up,
                down,
                onlyNumber,
                disabledDown: computed(() => props.disabledDown),
                value: computed(() => props.value),
                input: ($event) => emit('inputValue', $event.target.value),
                id: props.dynamicId,
                placeholder: props.placeholder,
                error: props.error,
            }
        }
    }
</script>

<style lang="scss">
    .base-range-input-group {
        text-align: left;
        width: 100%;
        &.base-range-input-group_m-48 {
            margin-top: 48px;
        }
        &.base-range-input-group_full-height {
            height: 100%;
        }
        &.base-range-input-group_w-50 {
            width: 52%;
        }
        &.base-range-input-group_w-45 {
            width: 45%;
        }
        &.base-range-input-group_w-30 {
            width: 30%;
        }
        &.base-range-input-group_w-80 {
            width: 80%;
        }
        &.base-range-input-group_w-37 {
            width: 37%;
        }
        &.base-range-input-group_another-color {
            .base-range-input-group__input {
                background: var(--settings-autoresponders-actions-input-bg-color);
            }
        }
    }
    .base-range-input-group__ranged-input {
        display: flex;
        width: 100%;
        align-items: center;
        .base-range-input-group__input {
            margin-right: 8px;
        }
    }
    .base-range-input-group__label {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        color: var(--font-color);
        display: block;
        margin-bottom: 5px;
        &.base-range-input-group__label_error {
            color: var(--red-color);
        }
    }
    .base-range-input-group__input {
        font-family: Segoe UI;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 19px;
        width: 100%;
        padding: 2px;
        color: var(--modal-font-color);
        background: var(--modal-element-hover-bg-color);
        border: .7px solid var(--modal-input-border-color);
        box-sizing: border-box;
        border-radius: 3px;
        text-align: left;
        padding: 8px 10px;
        &::placeholder {
            color: var(--search-input-placeholder-color);
        }
        &.base-range-input-group__input_selector {
            position: relative;
        }
    }
    .base-range-input-group__button {
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
                stroke: var(--user-info-settings-default-svg-fill);
            }
        }
        &:first-of-type {
            margin-bottom: 2px;
        }
        &.base-range-input-group__button_active {
            background: var(--modal-element-hover-bg-color);
            svg {
                path{
                    stroke: var(--user-info-settings-default-svg-fill);
                }
            }
        }
    }
</style>