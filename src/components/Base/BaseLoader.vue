<template>
    <div class="base-loader">
        <div></div>
        <div></div>
    </div>
</template>

<style lang="scss">
    .base-loader {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
    }
    .base-loader div {
        position: absolute;
        border: 4px solid var(--stripe-instead-ava);
        opacity: 1;
        border-radius: 50%;
        animation: base-loader 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }
    .base-loader div:nth-child(2) {
        animation-delay: -0.5s;
    }
    @keyframes base-loader {
        0% {
            top: 36px;
            left: 36px;
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            top: 0px;
            left: 0px;
            width: 72px;
            height: 72px;
            opacity: 0;
        }
    }
    .base-loader_black {
        div {
            border: 4px solid var(--folder-color);
        }
    }
</style>