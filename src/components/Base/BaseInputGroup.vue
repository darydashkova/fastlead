<template>
    <div class="base-input-group">
        <label class="base-input-group__label"
               :for="id"
               :class="{'base-input-group__label_error': error}"
        >
            <slot></slot>
        </label>
        <input class="base-input-group__input"
               type="text"
               :id="id"
               :placeholder="placeholder"
               :value="value"
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
        },

        setup(props, { emit }) {

            return {
                value: computed(() => props.value),
                input: ($event) => emit('inputValue', $event.target.value),
                id: props.dynamicId,
                placeholder: props.placeholder,
                error: computed(() => props.error),
            }
        }
    }
</script>

<style lang="scss">
    .base-input-group {
        text-align: left;
        width: 100%;
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
        font-weight: normal;
        font-size: 18px;
        line-height: 24px;
        color: var(--font-color);
        display: block;
        margin-bottom: 8px;
        &.base-input-group__label_error {
            color: var(--red-color);
        }
    }
    .base-input-group__input {
        padding: 6px 10px;
        background: transparent;
        font-family: Segoe UI;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        color: var(--font-color);
        border: 0.7px solid var(--separator-color);
        border-radius: 3px;
        width: 100%;
        text-align: left;
        &::placeholder {
            color: var(--default-svg-fill);
        }
        &.settings-autoresponder-create__input_selector {
            position: relative;
        }
    }
</style>