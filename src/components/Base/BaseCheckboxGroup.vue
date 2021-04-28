<template>
    <div class="base-checkbox-group">
        <input :value="value" type="checkbox" @change="$emit('changeChecked', $event.target.checked)" class="display: none" :id="dynamicId">
        <label :for="dynamicId" class="base-checkbox-group__container">
            <span class="base-checkbox-group__label">
                Выполнять один раз
            </span>
            <span class="base-checkbox-group__checkbox">
                <template v-if="value">&#10004;</template>
            </span>
        </label>
    </div>
</template>

<script>
    export default {
        props: {
            dynamicId: String,
            value: [String, Boolean],
        },
        setup(props) {
            return {
                id: props.dynamicId,
            }
        }
    }
</script>

<style lang="scss">
    .base-checkbox-group {
        width: 100%;
        &.base-checkbox-group__mt-47 {
            margin-top: 47px;
        }
    }
    .base-checkbox-group__container {
        display: flex;
        align-items: center;
    }
    .base-checkbox-group__checkbox {
        background: var(--settings-autoresponders-actions-input-bg-color);
        border: 0.7px solid var(--ranged-buttons-color);
        box-sizing: border-box;
        border-radius: 3px;

        width: 21px;
        min-width: 21px;
        height: 21px;
        min-height: 21px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--base-checkbox-group-font-color);
    }
    .base-checkbox-group__label {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        color: var(--base-checkbox-group-font-color);
        margin-right: 24px;

    }
</style>