<template>
    <div class="messenger-content-nav">
        <div class="messenger-content-nav__ava-container">
            <template v-if="!selectedGroupDialogs.length">
                <svg
                        @click="toggleOpenedUserInfo(!openedUserInfo)"
                        class="messenger-content-nav__hamburger pointer"
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
                <BaseFolder
                        v-for="(folder, index) in folders"
                        :key="folder.id"
                        :class="{
                            'base-folder_active': selectedFolder === folder.folder_id,
                        }"
                        @click="choseFolder(folder.folder_id)"
                >
                    <div class="base-folder__text">
                        {{folder.name}}
                    </div>
                    <div class="base-folder__unread-count" v-if="folder.unread">
                        {{folder.unread}}
                    </div>
                </BaseFolder>
                <BaseFolder
                        @click="toggleModalEditFolders(true, null)"
                        :is-edit="true"
                >
                    <div class="base-folder__text">
                        Ред.
                    </div>
                </BaseFolder>

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
    export default {
        components: {BaseCircleIcon, BaseFolder},
        setup() {
            const { container, content, scrollbar, scrollTo, init } = useCustomScroll()

            const { getDialogs, selectedGroupDialogs, toggleAllSelectedGroupDialogs } = useDialogs()

            const { selectedFolder, folders, selectFolder } = useFolder()

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
                    getDialogs(id)
                        .then(() => {
                            isLoadingDialogs.value = false;
                        })
                }
                toggleAllSelectedGroupDialogs(false);
                toggleOpenedUserInfo(false);
            }


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
                folders: computed(() => folders.value),
                selectedFolder: computed( () => selectedFolder.value),

                selectedGroupDialogs,
            }
        }
    }
</script>

<style lang="scss" src="./messenger-content-nav.scss"></style>