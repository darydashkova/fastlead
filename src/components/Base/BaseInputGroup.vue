<template>
    <div class="base-input-group">
        <label class="base-input-group__label"
               :for="id"
               :class="{
                   'base-input-group__label_error': error,
                   'base-input-group__label_disabled': disabled
               }"
        >
            <slot></slot>
        </label>
        <input class="base-input-group__input"
               type="text"
               :id="id"
               :placeholder="placeholder"
               :value="value"
               :disabled="disabled"
               @input="input"
        >
    </div>
</template>

<script>
    import { computed } from 'vue'
    export default {

        props: {
            value: [String, Number],
            dynamicId: [String, Number],
            placeholder: String,
            error: Boolean,
            disabled: Boolean,
        },

        setup(props, { emit }) {

            return {
                value: computed(() => props.value),
                input: ($event) => emit('inputValue', $event.target.value),
                id: props.dynamicId,
                placeholder: props.placeholder,
                error: computed(() => props.error),
                disabled: computed(() => props.disabled),
            }
        }
    }
</script>

<style lang="scss">
    .base-input-group {
        text-align: left;
        width: 100%;
        &.base-input-group_m-32 {
            margin-top: 32px;
        }
        &.base-input-group_m-48 {
            margin-top: 48px;
        }
        &.base-input-group_m-92 {
            margin-top: 92px;
        }
        &.base-input-group_w-45 {
            width: 45%;
        }
        &.base-input-group_w-53 {
            width: 53%;
        }
        &.base-input-group_full-height {
            height: 100%;
        }
        &.base-input-group_another-color {
            .base-input-group__input {
                background: var(--settings-autoresponders-actions-input-bg-color);
            }
        }
    }
    .base-input-group__label {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 21px;
        color: var(--font-color);
        display: block;
        margin-bottom: 5px;
        &.base-input-group__label_error {
            color: var(--red-color);
        }
        &.base-input-group__label_disabled {
            color: var(--modal-input-border-color);
        }
    }
    .base-input-group__input {
        font-family: Segoe UI;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 19px;
        width: 100%;
        color: var(--modal-font-color);
        background: var(--modal-element-hover-bg-color);
        border: .7px solid var(--modal-input-border-color);
        box-sizing: border-box;
        border-radius: 3px;
        text-align: left;

        padding: 6px 10px;
        &::placeholder {
            color: var(--default-svg-fill);
        }
        &:disabled {
            color: var(--modal-input-border-color);
            border: .7px solid var(--modal-input-border-color);
        }
    }
</style>