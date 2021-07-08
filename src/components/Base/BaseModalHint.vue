<template>
    <div class="base-modal-hint">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    .base-modal-hint {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;

        color: var(--modal-hint-font-color);
        margin-top: 26px;
        &.base-modal-hint_padding-20 {
            padding: 0 20px;
        }
        &.base-modal-hint_modal-font {
            color: var(--modal-font-color);
        }
        &.base-modal-hint_mt {
            margin-top: 31px;
        }
        &.base-modal-hint_mt-5 {
            margin-top: 5px;
        }
        &.base-modal-hint_small {
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 19px;
        }
        &.base-modal-hint_m-0 {
            margin: 0;
        }
    }
</style>