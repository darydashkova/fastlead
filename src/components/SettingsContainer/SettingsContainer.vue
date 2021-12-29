<template>
    <div class="settings-container">
        <!-- <SettingsNav></SettingsNav> -->
         <SettingsNavNew></SettingsNavNew>
        <router-view class="settings-content"></router-view>
    </div>
</template>

<script>
    import SettingsNav from './SettingsNav/settings-nav.vue';
    import SettingsNavNew from './SettingsNavNew/settings-nav.vue';

    export default {
        components: { SettingsNav, SettingsNavNew },
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
        width: calc(100% - 48px);
        position: absolute;
        left: 48px;
        top: 0;
        //overflow-y: auto;

    }
</style>