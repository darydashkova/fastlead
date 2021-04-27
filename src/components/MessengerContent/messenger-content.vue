<template>
    <div class="messenger-content">
        <MessengerContentNav
        ></MessengerContentNav>

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