<template>
    <div class="base-modal-header">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    .base-modal-header {
        font-style: normal;
        font-weight: 600;
        font-size: 22px;
        line-height: 29px;
        color: var(--modal-font-color);
        padding: 0 20px;
        &.base-modal-header__pd-0 {
            padding: 0;
        }
    }
</style>