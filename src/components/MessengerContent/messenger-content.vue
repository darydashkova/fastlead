<template>
    <div class="messenger-content">
        <!-- <MessengerContentNav
        ></MessengerContentNav> -->
        <SettingsNavNew @getDialogs="addParentFolder()"></SettingsNavNew>
        <div class="messenger-content_column">
            <MessengerContentHeader :update="newFolders"></MessengerContentHeader>
            <div class="messenger-content_column-dialogs">
                <MessengerContentSidebar @getId="getId" @getFolderEdit="getFolderEdit" @loadTrue ="loading = true" @loadFalse ="loading = false" :loading='loading'
                    v-if="!openedUserInfo"
                    class="messenger-content__middle-bar"
                ></MessengerContentSidebar>
                <UserInfo
                    v-else
                    class="messenger-content__middle-bar"
                ></UserInfo>
                <MessengerContentPersonalMessages :id='isId'>
                </MessengerContentPersonalMessages>
                  <ModalEditSelectFolder v-if="toggleModalEditSelectFolder" :id="folderId.folder_id" @closeModalEditSelect="toggleModalEditSelectFolder=false" @updateFolderDialog="getFoldersForUpdate()"></ModalEditSelectFolder>
                <ModalEditSelectFolderChild v-if="toggleModalEditSelectFolderChild" :id="folderId.parent_folder_id"  :child="folderId.folder_id"
                 @closeModalEditSelectChild="toggleModalEditSelectFolderChild=false" @updateFolderDialog="getFoldersForUpdate()"> 
                </ModalEditSelectFolderChild>
                 <teleport to="body" v-if="loading">
                    <FullScreenLoader ></FullScreenLoader>
                </teleport>
            </div>
        </div>
        
    </div>
</template>

<script src="./messenger-content.js"></script>
<style lang="scss" src="./messenger-content.scss"></style>
<style lang="scss" src="../../components/SettingsContainer/SettingsNavNew/settings-nav.scss"></style>