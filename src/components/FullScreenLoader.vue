<template>
    <div class="full-screen-loader">
        <BaseLoader></BaseLoader>
    </div>
</template>

<script>
    import BaseLoader from './Base/BaseLoader'
    export default {
        components: {
            BaseLoader
        }
    }
</script>

<style lang="scss">
    .full-screen-loader {
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.34);
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: left;
        z-index: 10000;
    }
</style>