<template>
    <div class="messenger">
        <teleport to="body">
            <ModalEditFolders v-if="openedModalEditFolders" @closeModalEditFoldersNew="closeModalEditFoldersNew"></ModalEditFolders>
            <ModalMoveChat v-if="openedModalMoveChat"></ModalMoveChat>
            <ModalCreateFolder v-if="openedModalCreateFolder"></ModalCreateFolder>
            <ModalCreateChat v-if="openedModalCreateChat"></ModalCreateChat>
            <ModalAddToFolder v-if="openedModalAddToFolder"></ModalAddToFolder>
            <ModalConfirmDelete v-if="openedModalConfirmDelete"></ModalConfirmDelete>
        </teleport>
        <ContextMenu v-if="isContextOpened"></ContextMenu>
        <MessengerContent></MessengerContent>
    </div>
</template>

<script src="./messenger.js"></script>
<style lang="scss" src="./messenger.scss"></style>
