<template>
    <div class="modal-move-chat-dynamic-mailings" @mousedown.self="close">
        <div class="modal-move-chat-dynamic-mailings__body">
            <BaseModalHeader>
                Переместить в папку
            </BaseModalHeader>
            <BaseModalText class="base-modal-text_padding-20 base-modal-text_mt-29">
                Мои папки
            </BaseModalText>
            <div class="modal-move-chat-dynamic-mailings__folders-list"
                 :class="{'modal-move-chat-dynamic-mailings__folders-list_scroll': folders.length > 6}"
            >
                <div v-show="folders.length > 6" class="scroll" ref="container" @click.self="scrollTo">
                    <div class="scroll__bar" ref="scrollbar"></div>
                </div>
                <div class="modal-move-chat-dynamic-mailings__container" ref="content">
                    <div class="modal-move-chat-dynamic-mailings__folder pointer"
                         v-for="folder in folders"
                         :key="folder.folder_id + 'ModalMoveChat'"
                         :class="{'modal-move-chat-dynamic-mailings__folder_active': selectedLocalFolder.id === folder.folder_id}"
                         @click="selectLocalFolder(folder)"
                    >
                        <div class="modal-move-chat-dynamic-mailings__folder-container">
                            <div class="modal-move-chat-dynamic-mailings__name">
                                {{folder.name}}
                            </div>
                            <div class="modal-move-chat-dynamic-mailings__count">
                                {{folder.dialogues_count}}
                            </div>
                        </div>
                        <svg class="modal-move-chat-dynamic-mailings__icon"
                             :class="{'modal-move-chat-dynamic-mailings__icon_default': selectedLocalFolder.id !== folder.folder_id}"
                             width="34" height="36" viewBox="0 0 34 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5406 4.59323L13.0153 4.59417C12.4553 4.59417 12.0001 4.10409 12 3.49966C12 2.89496 12.4553 2.40504 13.0153 2.40504L17.5397 2.40421L17.0115 0.43478C16.9758 0.303059 17.0178 0.161069 17.117 0.0748097C17.2169 -0.0107284 17.3542 -0.0243834 17.4661 0.0414493L22.8358 3.20203C22.9366 3.26186 23 3.3756 23 3.50049C23 3.62439 22.9366 3.73896 22.8358 3.79879L17.466 6.9586C17.3532 7.02437 17.2169 7.01072 17.1169 6.92518C17.0178 6.83975 16.9758 6.69782 17.0114 6.56526L17.5406 4.59323ZM17.6687 11.697H26.9167C28.7946 11.6989 30.595 12.3221 31.9229 13.4298C33.2508 14.5376 33.9977 16.0395 34 17.6061V29.4243C33.9977 30.9909 33.2508 32.4928 31.9229 33.6006C30.595 34.7083 28.7946 35.3315 26.9167 35.3334H7.08333C5.20541 35.3315 3.40504 34.7083 2.07714 33.6006C0.749249 32.4928 0.00224946 30.9909 0 29.4243V15.2425C0.00224946 13.6759 0.749249 12.1739 2.07714 11.0662C3.40504 9.95842 5.20541 9.33525 7.08333 9.33337H10.6647C11.324 9.33383 11.9742 9.46165 12.5644 9.70683L17.0354 11.5788C17.233 11.6578 17.4496 11.6982 17.6687 11.697ZM10.6647 11.697H7.08333C5.95616 11.697 4.87516 12.0705 4.07813 12.7354C3.2811 13.4004 2.83333 14.3022 2.83333 15.2425V16.4172L30.8536 16.2848C30.5379 15.629 29.9944 15.0668 29.2929 14.6705C28.5914 14.2742 27.7639 14.0618 26.9167 14.0606H17.6687C17.0088 14.0584 16.3585 13.9285 15.7689 13.6813L11.2979 11.8152C11.1003 11.7362 10.8838 11.6958 10.6647 11.697ZM7.08333 32.9697H26.9167C28.0438 32.9697 29.1248 32.5962 29.9219 31.9313C30.7189 31.2664 31.1667 30.3646 31.1667 29.4243V18.6473L2.83333 18.7808V29.4243C2.83333 30.3646 3.2811 31.2664 4.07813 31.9313C4.87516 32.5962 5.95616 32.9697 7.08333 32.9697Z"
                                  fill="url(#paint0_linear)"/>
                            <defs>
                                <linearGradient id="paint0_linear" x1="-14.0617" y1="49.2922" x2="43.2073" y2="-4.55837" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#22A595"/>
                                    <stop offset="1" stop-color="#84D160"/>
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
            </div>
            <BaseModalText class="base-modal-text_padding-20 base-modal-text_mt-29 base-modal-text_uppercase base-modal-text_hovered pointer"
                           @click="openCreate"
            >
                +Создать новую папку
            </BaseModalText>
            <BaseModalHint class="base-modal-hint_padding-20">
                Вы можете создать папки с нужными <br> чатами и переключаться между ними
            </BaseModalHint>
            <div class="modal-move-chat-dynamic-mailings__buttons">
                <BaseButton
                        class="base-button_enter"
                        @click="save"
                >
                    Переместить
                </BaseButton>
                <BaseButton
                        class="base-button_cancel"
                        @click.self="close"
                >
                    Отмена
                </BaseButton>
            </div>
        </div>
    </div>
</template>

<script>
    import BaseButton from '../../Base/BaseButton.vue'
    import BaseModalText from '../../Base/BaseModalText.vue'
    import BaseModalHint from '../../Base/BaseModalHint.vue'
    import BaseModalHeader from '../../Base/BaseModalHeader.vue'


    import {onMounted, ref, computed} from 'vue';
    import {useCustomScroll} from "../../../composition/useCustomScroll";
    import {useModals} from "../../../composition/useModals";

    export default {
        components: {
            BaseModalText,
            BaseModalHint,
            BaseModalHeader,
            BaseButton,
        },
        props: {
            selectedFolder: Object,
            folders: Array,
            parentId: [Number, String],
        },
        setup(props, { emit }) {
            const { container, content, scrollbar, scrollTo, init } = useCustomScroll();
            const { toggleModalCreateFolder, createFolderParentId, setCloseCallbackCreateFolder } = useModals()

            const selectedLocalFolder = ref(null);
            const selectLocalFolder = (folder) => {
                selectedLocalFolder.value = {
                    name: folder.name,
                };
                folder.id && (selectedLocalFolder.value.id = folder.id);
                folder.folder_id && (selectedLocalFolder.value.id = folder.folder_id);
            }

            const close = () => {
                emit('close')
            }
            const save = () => {
                emit('save', selectedLocalFolder.value);
            }
            const openCreate = () => {
                setCloseCallbackCreateFolder(() => emit('getFolders', props.parentId))
                createFolderParentId.value = props.parentId;
                toggleModalCreateFolder(true);
            }
            selectLocalFolder(props.selectedFolder);
            onMounted(() => {
                init();
            })

            return {
                container,
                content,
                scrollbar,
                scrollTo,

                folders: computed(() => props.folders),

                selectedLocalFolder,
                selectLocalFolder,
                close,
                save,
                openCreate,
            }
        }
    }
</script>

<style lang="scss">
    .modal-move-chat-dynamic-mailings {
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.34);
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: left;
    }
    .modal-move-chat-dynamic-mailings__body {
        width: 364px;
        background: var(--modal-bg-color);
        border-radius: 9px;
        padding: 20px 0;
        text-align: left;
    }
    .modal-move-chat-dynamic-mailings__folders-list {
        margin-top: 10px;
        position: relative;
        &.modal-move-chat-dynamic-mailings__folders-list_scroll {
            height: calc(53px * 6);
            ::-webkit-scrollbar {
                display: none;
            }
        }
    }
    .modal-move-chat-dynamic-mailings__container {
        overflow-y: auto;
        height: 100%;
    }
    .modal-move-chat-dynamic-mailings__icon_default {
        path {
            transition: .2s ease;
            fill: var(--default-svg-fill);
        }
    }
    .modal-move-chat-dynamic-mailings__folder {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        padding: 8px 20px;
        margin-bottom: 4px;
        transition: .2s ease;
        &:last-of-type {
            margin-bottom: 0;
        }
        &:hover {
            background:  var(--modal-element-hover-bg-color);
            .modal-move-chat-dynamic-mailings__icon {
                &.modal-move-chat-dynamic-mailings__icon_default {
                    path {
                        fill: var(--hover-svg-fill);
                    }
                }
            }
        }
        &.modal-move-chat-dynamic-mailings__folder_active {
            background:  var(--modal-element-hover-bg-color);
        }
    }
    .modal-move-chat-dynamic-mailings__folder-icon {
        position: absolute;
        right: 20px;
    }
    .modal-move-chat-dynamic-mailings__name {
        color: var(--modal-font-color);
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
    }
    .modal-move-chat-dynamic-mailings__count {
        color: var(--modal-sub-font-color);
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;
    }
    .modal-move-chat-dynamic-mailings__buttons {
        padding: 0 20px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 24px;
    }
    .modal-move-chat-dynamic-mailings__buttons {
        padding: 0 20px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 44px;
    }
</style>