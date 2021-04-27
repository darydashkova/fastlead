<template>
    <div class="settings">
        <teleport to="body">
            <ModalEditFolders v-if="openedModalEditFolders"></ModalEditFolders>
            <ModalMoveChat v-if="openedModalMoveChat"
                           :withCallback="true"
            ></ModalMoveChat>
            <ModalCreateFolder v-if="openedModalCreateFolder"></ModalCreateFolder>
            <ModalCreateChat v-if="openedModalCreateChat"
                 :fromSettings="true"
            ></ModalCreateChat>
            <ModalAddToFolder v-if="openedModalAddToFolder"></ModalAddToFolder>
            <ModalCreateWhatsapp v-if="openedModalCreateWhatsapp"></ModalCreateWhatsapp>
            <ModalSyncWhatsapp v-if="openedModalSyncWhatsapp"></ModalSyncWhatsapp>
            <ModalChangeAva v-if="openedModalChangeAva"></ModalChangeAva>
            <ModalNewMessage v-if="openedModalNewMessage"></ModalNewMessage>
        </teleport>
        <SettingsContainer></SettingsContainer>
    </div>
</template>

<script src="./settings.js"></script>
<style lang="scss" src="./settings.scss"></style>