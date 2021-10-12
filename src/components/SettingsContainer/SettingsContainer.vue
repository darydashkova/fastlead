<template>
    <div class="settings-container">
        <SettingsNav></SettingsNav>
        <router-view class="settings-content"></router-view>
    </div>
</template>

<script>
    import SettingsNav from './SettingsNav/settings-nav.vue';

    export default {
        components: { SettingsNav },
    }
</script>

<style lang="scss">
    .settings-container {
        height: 100%;
        display: flex;
        position: relative;
    }
    .settings-content {
        height: 100%;
        background: var(--settings-main-color);
        width: calc(100% - 90px);
        position: absolute;
        left: 90px;
        top: 0;
        overflow-y: scroll;
    }
</style>