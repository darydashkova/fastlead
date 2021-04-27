<template>
    <div class="messenger-content-nav">
        <div class="messenger-content-nav__ava-container"
            :class="{'messenger-content-nav__ava-container_header': selectedGroupDialogs.length}"
        >
            <template v-if="!selectedGroupDialogs.length">
                <BaseCircleIcon
                        v-if="!openedUserInfo"
                        @click="toggleOpenedUserInfo(true)"
                        class="pointer"
                        :src="image"
                        :isActive="true"
                ></BaseCircleIcon>
                <svg
                        v-else
                        @click="toggleOpenedUserInfo(false)"
                        class="messenger-content-nav__pseudo-ava pointer"
                        width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="22" cy="22" r="22" fill="var(--folder-create-button-color)"/>
                    <path d="M12 15H32" stroke="var(--stripe-instead-ava)" stroke-width="2" stroke-linecap="round"/>
                    <path d="M12 22H32" stroke="var(--stripe-instead-ava)" stroke-width="2" stroke-linecap="round"/>
                    <path d="M12 29H32" stroke="var(--stripe-instead-ava)" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <div class="messenger-content-nav__login">
                    {{userName}}
                </div>
            </template>
        </div>
        <hr class="separator"
        />
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
                            'base-folder_margin-bottom': index !== folders.length - 1
                        }"

                        @click="choseFolder(folder.folder_id)"
                        @contextmenu.prevent="folder.is_default? null : openContextMenu($event, {id: folder.folder_id, item: 'folder'})"
                >
                    <div class="base-folder__text">
                        {{folder.name}}
                    </div>
                    <div class="base-folder__unread-count" v-if="folder.unread">
                        {{folder.unread}}
                    </div>
                </BaseFolder>


            </div>
        </div>
        <BaseFolder
                class="base-folder_create"
                :isCreate="true"
                @click="toggleModalCreateFolder(true, null)"
        >
            <svg
                    width="46" height="40" viewBox="0 0 46 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M41.2828 11.116H38.7767V6.76128C38.7767 5.7143 37.8963 4.86323 36.8149 4.86323H19.0401L15.4496 0H1.96181C0.880374 0 0 0.851761 0 1.89805V32.2495H0.00430852C0.000718087 32.6406 0.126383 33.0234 0.37915 33.3437C0.731012 33.7883 1.26383 34.0426 1.84189 34.0426H33.9827C34.8128 34.0426 35.5438 33.5014 35.742 32.783L43.0852 13.3037V13.1807C43.0852 11.9844 42.3269 11.116 41.2828 11.116ZM1.43617 1.89805C1.43617 1.61737 1.67242 1.38949 1.96181 1.38949H14.71L18.3004 6.25273H36.8141C37.1042 6.25273 37.3398 6.4806 37.3398 6.76128V11.116H9.14196C9.03855 11.116 8.93587 11.1243 8.83605 11.141C8.13736 11.2542 7.55642 11.7475 7.38336 12.3748L1.43617 28.0671V1.89805ZM34.3741 32.3634C34.3267 32.5336 34.1651 32.6531 33.9827 32.6531H1.84189C1.6674 32.6531 1.56543 32.5566 1.52019 32.4989C1.47495 32.4419 1.4053 32.321 1.43186 32.2154L8.74988 12.7952C8.79728 12.6249 8.95885 12.5055 9.14124 12.5055H38.7767H41.2828C41.5557 12.5055 41.6253 12.8848 41.6433 13.0745L34.3741 32.3634Z"
                      fill="var(--folder-create-button-color)"/>
                <circle cx="36" cy="30" r="10" fill="var(--folder-create-button-color)"/>
                <path d="M36.1699 26V34.3404" stroke="var(--folder-create-plus-color)"/>
                <path d="M32 30.1702L40.3404 30.1702" stroke="var(--folder-create-plus-color)"/>
            </svg>
            <div class="base-folder__text">
                Создать папку
            </div>
        </BaseFolder>
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
    export default {
        components: {BaseCircleIcon, BaseFolder},
        setup() {
            const { container, content, scrollbar, scrollTo, init } = useCustomScroll()

            const { getDialogs, selectedGroupDialogs, toggleAllSelectedGroupDialogs } = useDialogs()

            const { selectedFolder, folders, selectFolder } = useFolder()

            const { toggleModalCreateFolder } = useModals()

            const { setContext } = useContextMenu()

            const { toggleOpenedUserInfo, openedUserInfo } = useUserInfo()

            const { isLoadingDialogs } = useLoader()

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
                toggleSettings(false);
            }


            onMounted( () => {
                init()
            })


            const user = inject('user');
            return {
                container,
                content,
                scrollbar,
                scrollTo,

                choseFolder,
                toggleModalCreateFolder,
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