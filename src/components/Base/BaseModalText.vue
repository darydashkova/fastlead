<template>
    <div class="base-modal-text">
        <span>
            <slot></slot>
        </span>
    </div>
</template>

<style lang="scss">
    .base-modal-text {
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 24px;
        span {
            background: var(--green-color);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        &.base-modal-text_mb-6 {
            margin-bottom: 6px;
        }
        &.base-modal-text_mt-26 {
            margin-top: 26px;
        }
        &.base-modal-text_mt-29 {
            margin-top: 29px;
        }
        &.base-modal-text_mt-45 {
            margin-top: 45px;
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
        &.base-modal-text_hovered {
            padding-top: 10px;
            padding-bottom: 10px;
            transition: .2s ease;
            &:hover {
                background: var(--modal-element-hover-bg-color);
            }
        }
        &.base-modal-text_default {
            span {
                background: var(--modal-base-text-default-color);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }

        }
        &.base-modal-text_error {
            span {
                background: var(--red-color);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }

        }
    }
</style>