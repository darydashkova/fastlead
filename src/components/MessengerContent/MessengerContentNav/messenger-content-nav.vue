<template>
    <div class="messenger-content-nav">
        <div class="messenger-content-nav__ava-container">
            <BaseCircleIcon
                    :src="image"
                    :isActive="true"
            ></BaseCircleIcon>
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

                        @click="choseFolder(folder.folder_id)"
                        :key="folder.id"
                        :class="{
                            'base-folder_active': selectedFolder === folder.folder_id,
                            'base-folder_margin-bottom': index !== folders.length - 1
                        }"
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


    </div>
</template>

<script>
    import BaseCircleIcon from "../../Base/BaseCircleIcon";
    import BaseFolder from "../../Base/BaseFolder";
    import {inject, computed, onMounted} from "vue";
    import {useCustomScroll} from "../../../composition/useCustomScroll";
    import {useDialogs} from "../../../composition/useDialogs";
    import {useFolder} from "../../../composition/useFolder";
    export default {
        components: {BaseCircleIcon, BaseFolder},
        setup() {
            const { container, content, scrollbar, scrollTo, init } = useCustomScroll()

            const { getDialogs } = useDialogs()

            const { selectedFolder, folders, selectFolder } = useFolder()

            const choseFolder = (id) => {
                if (selectedFolder.value !== id) {
                    selectFolder(id);
                    getDialogs(id)
                }
            }


            onMounted( () => {
                init()
            })


            const userImage = inject('user');
            return {
                container,
                content,
                scrollbar,
                scrollTo,

                choseFolder,


                image: computed(() => userImage.value.avatar),
                folders: computed(() => folders.value),
                selectedFolder: computed( () => selectedFolder.value)
            }
        }
    }
</script>

<style lang="scss" src="./messenger-content-nav.scss"></style>