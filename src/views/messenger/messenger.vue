<template>
    <div class="messenger">
        <BaseContextMenu v-if="isContextOpened"></BaseContextMenu>
        <MessengerContent
        ></MessengerContent>
    </div>
</template>

<script src="./messenger.js"></script>
<style lang="scss" src="./messenger.scss"></style>
