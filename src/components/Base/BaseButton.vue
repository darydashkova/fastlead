<template>
    <button class="base-button">
        <slot></slot>
    </button>
</template>

<style lang="scss">
    .base-button {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        color: #F0F0FA;
        padding: 11px 36px;
        border-radius: 5px;
        cursor: pointer;
    }
    .base-button_enter {
        background: var(--green-color);
    }
    .base-button_cancel {
        background: var(--modal-button-cancel-color);
    }
    .base-button_delete {
        background: var(--red-color);
    }
    .base-button_p5-15 {
        padding: 6px 20px;
    }
    .base-button_w-100 {
        width: 100%;
    }
</style>