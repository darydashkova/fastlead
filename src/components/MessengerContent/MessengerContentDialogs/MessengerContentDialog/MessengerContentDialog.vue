<template>
    <div class="messenger-content-dialog">
        <div class="scroll" ref="container" @click.self="scrollTo">
            <div class="scroll__bar" ref="scrollbar"></div>
        </div>
        <div class="messenger-content-dialog__content" ref="content">
            <slot></slot>
        </div>
        <div></div>
    </div>
</template>

<script>
    import { useCustomScroll } from "../../../../composition/useCustomScroll";
    import { onMounted, ref } from "vue";
    import { useFolder } from "../../../../composition/useFolder";
    import { useDialogs } from "../../../../composition/useDialogs";

    export default {
        props: {
          needLoadingMore: Boolean,
        },
        setup(props) {
            const { container, content, scrollbar, scrollTo, init } = useCustomScroll()
            const { dialogs, getDialogs} = useDialogs()

            const { setOffsetFolderDialogsPosition, offsetFolderDialogsPosition, selectedFolder } = useFolder()

            const loadingNextDialogs = ref(false)
            const loadNextDialogs = async () => {
                if (!loadingNextDialogs.value && selectedFolder.value) {
                    loadingNextDialogs.value = true;
                    dialogs.value.length < offsetFolderDialogsPosition.value
                        ? setOffsetFolderDialogsPosition(dialogs.value.length+1)
                        : setOffsetFolderDialogsPosition(offsetFolderDialogsPosition.value + 20)
                    await getDialogs(selectedFolder.value, offsetFolderDialogsPosition.value)
                    loadingNextDialogs.value = false;
                }
            }

            onMounted( () => {
                props.needLoadingMore? init(loadNextDialogs) : init();
            })

            return {
                container,
                content,
                scrollbar,
                scrollTo,
            }
        }

    }
</script>

<style lang="scss">
    .messenger-content-dialog{
        margin-top: 18px;
        //34px - поиск, 9 - margin, 29 - название папки, 22 - margin названия
        height: calc(100% - 110px - 18px);
        position: relative;
        ::-webkit-scrollbar {
            display: none;
        }
    }
    .messenger-content-dialog_searching {
        margin-top: 0;
        height: calc(100% - 180px);
    }

    .messenger-content-dialog__content {
        height: calc(100% - 15px);
        width: 100%;
        overflow-y: auto;
    }
</style>