<template>
    <button class="base-button">
        <slot></slot>
    </button>
</template>

<style lang="scss">
    .base-button {
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 24px;
        color: var(--create-folder-font-button);
        padding: 11px 36px;
        border-radius: 5px;
        cursor: pointer;
    }
    .base-button_enter {
        background: var(--green-color);
    }
    .base-button_cancel {
        background: var(--cancel-button-color-in-modals);
    }
    .base-button_settings-cancel {
        background: var(--mailings-cancel-button-color);
    }
    .base-button_p5-15 {
        padding: 5.5px 15.5px;
    }
</style>