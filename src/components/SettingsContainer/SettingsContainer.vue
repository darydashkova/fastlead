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
        setup() {

        }
    }
</script>

<style lang="scss">
    .settings-container {
        height: calc(100vh - 30px);
        display: flex;
    }
    .settings-content {
        height: 100%;
        background: var(--main-color);
        width: calc(100vw - 293px);
    }
</style>