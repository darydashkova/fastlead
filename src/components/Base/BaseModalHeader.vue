<template>
    <div class="base-modal-header">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    .base-modal-header {
        font-weight: 600;
        font-size: 22px;
        line-height: 29px;
        color: var(--create-folder-header-color);
        padding: 0 20px;
    }
</style>