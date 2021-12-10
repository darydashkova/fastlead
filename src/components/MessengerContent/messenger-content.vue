<template>
    <div class="messenger-content">
        <!-- <MessengerContentNav
        ></MessengerContentNav> -->
        <SettingsNavNew></SettingsNavNew>
        <MessengerContentSidebar
                v-if="!openedUserInfo"
                class="messenger-content__middle-bar"
        ></MessengerContentSidebar>
        <UserInfo
                v-else
                class="messenger-content__middle-bar"
        ></UserInfo>
        <MessengerContentPersonalMessages
        ></MessengerContentPersonalMessages>
    </div>
</template>

<script src="./messenger-content.js"></script>
<style lang="scss" src="./messenger-content.scss"></style>
<style lang="scss" src="../../components/SettingsContainer/SettingsNavNew/settings-nav.scss"></style>