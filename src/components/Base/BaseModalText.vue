<template>
    <div class="base-modal-text">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    .base-modal-text {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        background: var(--green-color);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        &.base-modal-text_mb-6 {
            margin-bottom: 6px;
        }
        &.base-modal-text_mt-26 {
            margin-top: 26px;
        }
        &.base-modal-text_mt-29 {
            margin-top: 29px;
        }
        &.base-modal-text_uppercase {
            text-transform: uppercase;
        }
        &.base-modal-text_padding-20 {
            padding: 0 20px;
        }
        &.base-modal-text_mt-10 {
            margin-top: 10px;
        }
        &.base-modal-text_white {
            background: var(--create-folder-header-color);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        &.base-modal-text_error {
            background: #EB5757;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    }
</style>