<template>
    <div class="messenger-content-nav">
        <div class="messenger-content-nav__ava-container pointer"
             @click="selectedParentFolder? selectParentFolder(null) : !selectedGroupDialogs.length? toggleOpenedUserInfo(!openedUserInfo) : null"
             :class="openedUserInfo? 'messenger-content-nav__ava-container_active': ''"
        >
            <template v-if="selectedParentFolder">
                <svg
                        class="messenger-content-nav__hamburger " width="9" height="18" viewBox="0 0 9 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.20278 18C8.09847 18.0006 7.99506 17.9816 7.89849 17.9443C7.80192 17.907 7.71408 17.852 7.64002 17.7825L1.16431 11.6561C0.795241 11.3078 0.502424 10.894 0.302633 10.4385C0.102841 9.98302 0 9.4947 0 9.00153C0 8.50836 0.102841 8.02003 0.302633 7.56452C0.502424 7.10901 0.795241 6.69526 1.16431 6.34698L7.64002 0.220531C7.71392 0.150614 7.80166 0.0951529 7.89822 0.0573141C7.99478 0.0194754 8.09827 7.36695e-10 8.20278 0C8.3073 -7.36694e-10 8.41079 0.0194754 8.50735 0.0573141C8.60391 0.0951529 8.69164 0.150614 8.76554 0.220531C8.83945 0.290448 8.89807 0.373451 8.93807 0.464802C8.97806 0.556153 8.99865 0.654062 8.99865 0.75294C8.99865 0.851817 8.97806 0.949727 8.93807 1.04108C8.89807 1.13243 8.83945 1.21543 8.76554 1.28535L2.28983 7.4118C1.84454 7.8336 1.59442 8.40538 1.59442 9.00153C1.59442 9.59768 1.84454 10.1695 2.28983 10.5913L8.76554 16.7177C8.83983 16.7874 8.8988 16.8704 8.93904 16.9617C8.97928 17.0531 9 17.1511 9 17.2501C9 17.3491 8.97928 17.4471 8.93904 17.5385C8.8988 17.6299 8.83983 17.7128 8.76554 17.7825C8.69148 17.852 8.60365 17.907 8.50708 17.9443C8.41051 17.9816 8.3071 18.0006 8.20278 18Z" fill="#9797BB"/>
                </svg>
            </template>
            <template v-else-if="!selectedGroupDialogs.length">
                <svg
                        class="messenger-content-nav__hamburger "
                        width="26" height="14" viewBox="0 0 26 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.9167 6.125L1.08333 6.125C0.485025 6.125 0 6.51675 0 7C0 7.48325 0.485025 7.875 1.08333 7.875L24.9167 7.875C25.515 7.875 26 7.48325 26 7C26 6.51675 25.515 6.125 24.9167 6.125Z"
                          fill="var(--default-svg-fill)"/>
                    <path d="M24.9167 0L1.08333 0C0.485025 0 0 0.391751 0 0.875001C0 1.35825 0.485025 1.75 1.08333 1.75L24.9167 1.75C25.515 1.75 26 1.35825 26 0.875001C26 0.391751 25.515 0 24.9167 0Z"
                          fill="var(--default-svg-fill)"/>
                    <path d="M24.9167 12.2501L1.08333 12.2501C0.485025 12.2501 0 12.6418 0 13.1251C0 13.6083 0.485025 14.0001 1.08333 14.0001L24.9167 14.0001C25.515 14.0001 26 13.6083 26 13.1251C26 12.6418 25.515 12.2501 24.9167 12.2501Z"
                          fill="var(--default-svg-fill)"/>
                </svg>
            </template>

        </div>
        <div class="messenger-content-nav__folder-container">
            <div class="scroll" ref="container" @click.self="scrollTo">
                <div class="scroll__bar" ref="scrollbar"></div>
            </div>
            <div class="messenger-content-nav__folder-content" ref="content">
                <transition name="base-folder-transition" >
                    <div v-if="selectedParentFolder">
                        <div class="messenger-content-nav__parent-folder pointer" @click="choseFolder(selectedParentFolder)" >
                            <span>
                                {{parentFolderName}}
                            </span>
                        </div>
                        <BaseFolder
                                v-for="(folder, index) in foldersInSelectedFolder"
                                :key="`${folder.folder_id}withandwithoutSelectedParent`"
                                :class="{
                                'base-folder_active': selectedFolder === folder.folder_id,
                            }"
                                :is-default="folder.is_default"
                                @click="choseFolder(folder.folder_id)"
                                @contextmenu.prevent="(folder.is_default || !folder.editing_possible)? null : openContextMenu($event, {id: folder.folder_id, itemName: 'folder', item: folder.name,})"
                        >
                            <div class="base-folder__text">
                                {{folder.name}}
                            </div>
                            <div class="base-folder__unread-count" v-if="folder.unread">
                        <span>
                            {{folder.unread}}
                        </span>
                            </div>
                        </BaseFolder>
                        <BaseFolder
                                @click="toggleModalEditFolders(true, null)"
                                :is-edit="true"
                                :key="`folder_edit`"
                        >
                            <div class="base-folder__text">
                                Ред.
                            </div>
                        </BaseFolder>
                    </div>
                </transition>
                <transition name="base-folder-transition" >
                    <div v-if="!selectedParentFolder">
                        <BaseFolder
                                v-for="(folder, index) in folders"
                                :key="`${folder.folder_id}withandwithoutSelectedParent`"
                                :class="{
                                'base-folder_active': selectedFolder === folder.folder_id,
                            }"
                                :is-default="folder.is_default"
                                @click="choseFolder(folder.folder_id)"
                                @contextmenu.prevent="(folder.is_default || !folder.editing_possible)? null : openContextMenu($event, {id: folder.folder_id, itemName: 'folder', item: folder.name,})"
                        >
                            <div class="base-folder__text">
                                {{folder.name}}
                            </div>
                            <div class="base-folder__unread-count" v-if="folder.unread">
                        <span>
                            {{folder.unread}}
                        </span>
                            </div>
                        </BaseFolder>
                        <BaseFolder
                                @click="toggleModalEditFolders(true, null)"
                                :is-edit="true"
                                :key="`folder_edit`"
                        >
                            <div class="base-folder__text">
                                Ред.
                            </div>
                        </BaseFolder>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import BaseCircleIcon from "../../Base/BaseCircleIcon";
    import BaseFolder from "../../Base/BaseFolder";
    import {inject, computed, onMounted} from "vue";
    import {useCustomScroll} from "../../../composition/useCustomScroll";
    import {useDialogs} from "../../../composition/useDialogs";
    import {useFolder} from "../../../composition/useFolder";
    import {useContextMenu} from "../../../composition/useContextMenu";
    import {useUserInfo} from "../../../composition/useUserInfo";
    import {useModals} from "../../../composition/useModals";
    import {useLoader} from "../../../composition/useLoader";
    import {useUser} from "../../../composition/useUser";
    import {MessengerContentInput} from "./messenger-content-nav.js";

    export default {
        components: {BaseCircleIcon, BaseFolder},
        setup() {
            const { container, content, scrollbar, scrollTo, init } = useCustomScroll()
            const { getFolder, activeFolder } = MessengerContentInput()
            const { getDialogs, selectedGroupDialogs, toggleAllSelectedGroupDialogs } = useDialogs()

            const { selectedFolder, folders, selectFolder, getAllFoldersInFolder, selectedParentFolder, foldersInSelectedFolder, selectParentFolder } = useFolder()

            const { toggleModalEditFolders } = useModals()

            const { setContext } = useContextMenu()

            const { toggleOpenedUserInfo, openedUserInfo } = useUserInfo()

            const { isLoadingDialogs } = useLoader()

            const { user } = useUser()

            const openContextMenu = ($event, context) => {
                setContext({
                    top: $event.clientY,
                    left: $event.clientX,
                }, context)
            }

            const choseFolder = (id) => {
                if (selectedFolder.value !== id) {
                    selectFolder(id);
                    isLoadingDialogs.value = true;
                    getAllFoldersInFolder(id, true);
                    getDialogs(id)
                        .then(() => {
                            isLoadingDialogs.value = false;
                        })
                }
                toggleAllSelectedGroupDialogs(false);
                toggleOpenedUserInfo(false);
                getFolder(selectedFolder.value)
            }

            const parentFolderName = computed(() => {
                return folders.value.find(i => i.folder_id === selectedParentFolder.value).name
            })


            onMounted( () => {
                init()
            })

            return {
                container,
                content,
                scrollbar,
                scrollTo,

                choseFolder,
                toggleModalEditFolders,
                openContextMenu,

                toggleOpenedUserInfo,
                openedUserInfo,


                image: computed(() => user.value.avatar),
                userName: computed(() => user.value.login),
                folders,
                foldersInSelectedFolder,
                parentFolderName,
                selectedFolder,

                selectParentFolder,
                selectedParentFolder,

                selectedGroupDialogs,
            }
        }
    }
</script>

<style lang="scss" src="./messenger-content-nav.scss"></style>