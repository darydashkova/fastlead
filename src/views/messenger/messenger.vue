<template>
    <div class="messenger">
        <BaseContextMenu v-if="isContextOpened"></BaseContextMenu>

        <ModalCreateFolder v-if="openedModalCreateFolder"></ModalCreateFolder>
        <ModalCreateChat v-if="openedModalCreateChat"></ModalCreateChat>
        <ModalAddToFolder v-if="openedModalAddToFolder"></ModalAddToFolder>
        <ModalEditFolders v-if="openedModalEditFolders"></ModalEditFolders>
        <ModalMoveChat v-if="openedModalMoveChat"></ModalMoveChat>

        <MessengerContent></MessengerContent>
    </div>
</template>

<script src="./messenger.js"></script>
<style lang="scss" src="./messenger.scss"></style>
