<template>
    <div class="base-folder-name">
        <slot></slot>
    </div>
</template>


<style lang="scss">
    .base-folder-name {
        font-style: normal;
        font-weight: normal;
        font-size: 22px;
        line-height: 29px;
        text-transform: uppercase;

        background: var(--green-color);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
</style>