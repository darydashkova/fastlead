<template>
    <div class="messenger">
        <div class="messenger__bg">
            <teleport to="body">
                <ModalEditFolders v-if="openedModalEditFolders"></ModalEditFolders>
                <ModalMoveChat v-if="openedModalMoveChat"></ModalMoveChat>
                <ModalCreateFolder v-if="openedModalCreateFolder"></ModalCreateFolder>
                <ModalCreateChat v-if="openedModalCreateChat"></ModalCreateChat>
                <ModalAddToFolder v-if="openedModalAddToFolder"></ModalAddToFolder>
            </teleport>
            <ContextMenu v-if="isContextOpened"></ContextMenu>

            <MessengerContent></MessengerContent>
        </div>
    </div>
</template>

<script src="./messenger.js"></script>
<style lang="scss" src="./messenger.scss"></style>
