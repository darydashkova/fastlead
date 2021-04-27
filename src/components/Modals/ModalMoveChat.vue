<template>
    <div class="modal-move-chat" @mousedown.self="toggleModalMoveChat(false)">
        <div class="modal-move-chat__body">
            <BaseModalHeader>
                Переместить в папку
            </BaseModalHeader>
            <BaseModalText class="base-modal-text_padding-20 base-modal-text_mt-29">
                Мои папки
            </BaseModalText>
            <div class="modal-move-chat__folders-list"
                 :class="{'modal-move-chat__folders-list_scroll': folders.length > 6}"
            >
                <div v-show="folders.length > 6" class="scroll" ref="container" @click.self="scrollTo">
                    <div class="scroll__bar" ref="scrollbar"></div>
                </div>
                <div class="modal-move-chat__container" ref="content">
                    <div class="modal-move-chat__folder pointer"
                         v-for="folder in folders"
                         :key="folder.folder_id + 'ModalMoveChat'"
                         :class="{'modal-move-chat__folder_active': selectedLocalFolder === folder.folder_id}"
                         @click="selectLocalFolder(folder.folder_id)"
                    >
                        <div class="modal-move-chat__folder-container">
                            <div class="modal-move-chat__name">
                                {{folder.name}}
                            </div>
                            <div class="modal-move-chat__count">
                                {{folder.dialogues_count}}
                            </div>
                        </div>
                        <svg class="modal-move-chat__icon"
                             :class="{'modal-move-chat__icon_default': selectedLocalFolder !== folder.folder_id}"
                             width="33" height="35" viewBox="0 0 33 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M31.6195 17.4898H29.7V14.1639C29.7 13.3643 29.0257 12.7143 28.1974 12.7143H14.5832L11.8333 9H1.5026C0.6743 9 0 9.65053 0 10.4496V33.6305H0.0033C0.00055 33.9292 0.0968 34.2216 0.2904 34.4662C0.5599 34.8058 0.968 35 1.41075 35H26.0282C26.664 35 27.2239 34.5867 27.3757 34.038L33 19.1607V19.0668C33 18.1531 32.4192 17.4898 31.6195 17.4898ZM1.1 10.4496C1.1 10.2353 1.28095 10.0612 1.5026 10.0612H11.2668L14.0168 13.7755H28.1968C28.4191 13.7755 28.5994 13.9496 28.5994 14.1639V17.4898H7.00205C6.92285 17.4898 6.8442 17.4962 6.76775 17.5089C6.2326 17.5954 5.78765 17.9721 5.6551 18.4513L1.1 30.4362V10.4496ZM26.3279 33.7175C26.2916 33.8475 26.1679 33.9388 26.0282 33.9388H1.41075C1.2771 33.9388 1.199 33.865 1.16435 33.821C1.1297 33.7775 1.07635 33.6851 1.0967 33.6045L6.70175 18.7723C6.73805 18.6423 6.8618 18.551 7.0015 18.551H29.7H31.6195C31.8285 18.551 31.8819 18.8407 31.8956 18.9856L26.3279 33.7175Z"
                                  fill="url(#paint0_linear)"/>
                            <path d="M14.03 4.32265L18.621 4.32176L18.0842 6.17725C18.0481 6.30197 18.0907 6.43551 18.1913 6.51589C18.2926 6.59637 18.4309 6.60922 18.5454 6.54733L23.9932 3.57428C24.0954 3.51798 24.1598 3.41018 24.1598 3.29361C24.1598 3.1761 24.0954 3.06908 23.9932 3.01278L18.5455 0.0389996C18.432 -0.0229423 18.2927 -0.0100943 18.1913 0.0703883C18.0907 0.15155 18.0481 0.285148 18.0842 0.409084L18.6202 2.26212L14.03 2.2629C13.462 2.2629 13 2.72386 13 3.29283C13.0001 3.86153 13.462 4.32265 14.03 4.32265Z"
                                  fill="url(#paint1_linear)"/>
                            <defs>
                                <linearGradient id="paint0_linear" x1="-13.6482" y1="45.2716" x2="27.6127" y2="-5.90315" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#00BF6D"/>
                                    <stop offset="1" stop-color="#98D730"/>
                                </linearGradient>
                                <linearGradient id="paint1_linear" x1="8.38454" y1="9.18828" x2="17.8508" y2="-6.48531" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#00BF6D"/>
                                    <stop offset="1" stop-color="#98D730"/>
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
            </div>
            <BaseModalText class="base-modal-text_padding-20 base-modal-text_mt-29 base-modal-text_uppercase pointer"
                @click="toggleModalCreateFolder(true)"
            >
                Создать новую папку
            </BaseModalText>
            <BaseModalHint class="base-modal-hint_padding-20">
                Вы можете создать папки с нужными <br> чатами и переключаться между ними
            </BaseModalHint>
            <div class="modal-move-chat__buttons">
                <BaseButton
                        class="base-button_enter"
                        @click="move"
                >
                    Переместить
                </BaseButton>
                <BaseButton
                        class="base-button_cancel"
                        @click.self="toggleModalMoveChat(false)"
                >
                    Отмена
                </BaseButton>
            </div>
        </div>
    </div>
</template>

<script>
    import BaseButton from '../Base/BaseButton.vue'
    import BaseModalText from '../Base/BaseModalText.vue'
    import BaseModalHint from '../Base/BaseModalHint.vue'
    import BaseModalHeader from '../Base/BaseModalHeader.vue'

    import {useFolder} from "../../composition/useFolder";
    import {useModals} from "../../composition/useModals";
    import {useDialogs} from "../../composition/useDialogs";

    import {onMounted, ref} from 'vue';
    import {useCustomScroll} from "../../composition/useCustomScroll";

    export default {
        components: {
            BaseModalText,
            BaseModalHint,
            BaseModalHeader,
            BaseButton,
        },
        props: {
            withCallback: Boolean,
        },
        setup(props) {
            const { folders, selectedFolder, getAllFolders } = useFolder();
            const { toggleModalMoveChat, selectedDialogsToMove, toggleModalCreateFolder, onCloseCallbackMoveModal, setCloseCallbackMoveModal} = useModals();
            const { moveDialog, getDialogs } = useDialogs();
            const { container, content, scrollbar, scrollTo, init } = useCustomScroll();


            const selectedLocalFolder = ref(null);
            const selectLocalFolder = (id) => {
                selectedLocalFolder.value = id;
            }

            if (props.withCallback) {
                getAllFolders();
            }

            const move = () => {
                if (selectedLocalFolder.value) {
                    if (props.withCallback) {
                        onCloseCallbackMoveModal({
                            id: selectedLocalFolder.value,
                            name: folders.value.find(i => i.folder_id === selectedLocalFolder.value).name,
                        })
                        setCloseCallbackMoveModal(() => null);
                        toggleModalMoveChat(false);
                        return;
                    }
                    moveDialog({
                        folder_id: selectedLocalFolder.value,
                        dialog_ids: selectedDialogsToMove.value
                    }).then(() => {
                        getDialogs(selectedFolder.value);
                        toggleModalMoveChat(false);
                        onCloseCallbackMoveModal();
                        setCloseCallbackMoveModal(() => null);
                    })
                }
            }

            onMounted(() => {
                init();
            })

            return {
                container,
                content,
                scrollbar,
                scrollTo,

                folders,
                toggleModalMoveChat,

                selectedLocalFolder,
                selectLocalFolder,
                toggleModalCreateFolder,

                move,
            }
        }
    }
</script>

<style lang="scss">
    .modal-move-chat {
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.34);
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1300;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: left;
    }
    .modal-move-chat__body {
        width: 364px;
        background: var(--create-folder-color);
        border-radius: 9px;
        padding: 20px 0;
        text-align: left;
    }
    .modal-move-chat__folders-list {
        margin-top: 10px;
        position: relative;
        &.modal-move-chat__folders-list_scroll {
            height: calc(53px * 6);
            ::-webkit-scrollbar {
                display: none;
            }
        }
    }
    .modal-move-chat__container {
        overflow-y: auto;
        height: 100%;
    }
    .modal-move-chat__icon_default {
        path {
            fill: var(--default-svg-fill);
        }
    }
    .modal-move-chat__folder {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        padding: 8px 20px;
        margin-bottom: 4px;
        &:last-of-type {
            margin-bottom: 0;
        }
        &:hover {
            background: var(--create-chat-border-color);
            .modal-move-chat__icon {
                &.modal-move-chat__icon_default {
                    path {
                        fill: var(--hover-svg-fill);
                    }
                }
            }
        }
        &.modal-move-chat__folder_active {
            background: var(--create-chat-border-color);
        }
    }
    .modal-move-chat__folder-icon {
        position: absolute;
        right: 20px;
    }
    .modal-move-chat__name {
        color: var(--create-folder-font-color);
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
    }
    .modal-move-chat__count {
        color: var(--create-folder-border-color);
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;
    }
    .modal-move-chat__buttons {
        padding: 0 20px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 24px;
    }
    .modal-move-chat__buttons {
        padding: 0 20px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 44px;
    }

</style>