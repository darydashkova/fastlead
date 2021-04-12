<template>
    <div class="modal-create-chat" @mousedown.self="close"
    :class="{'z-index': fromModals.fromAddToFolderToCreateChat}">
        <div class="modal-create-chat__body">
            <BaseModalHeader>
                Создать чат
            </BaseModalHeader>
            <div class="modal-create-chat__input-group modal-create-chat__input-group_padding-20">
                <BaseModalLabel for-id="modal-create-chat__input" :class="{'base-modal-label_error': errors.phone}">Номер телефона</BaseModalLabel>
                <input id="modal-create-chat__input" type="text" class="modal-create-chat__input" v-model="name">
            </div>
            <div class="modal-create-chat__height-container">
                <BaseModalText class="base-modal-text_padding-20 pointer"
                               :class="{'base-modal-text_error': errors.whatsapp}"
                               @click="toggleOpenedWhatsApps"
                >
                    <span>{{selectedWhatsapp === null? 'Выберите WhatsApp ' : selectedWhatsapp.phone+' '}}</span>
                    <svg class="modal-create-chat__select-whatsapp" :class="{'modal-create-chat__select-whatsapp_reverse': openedWhatsApps}" width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L6 6L11 1" :stroke="errors.whatsapp? '#EB5757' : '#46CB52'"/>
                    </svg>
                </BaseModalText>
                <transition name="height-transition">
                    <div class="modal-create-chat__whatsapp-list" v-show="openedWhatsApps">
                        <div class="modal-create-chat__whatsapp"
                             v-for="whatsapp in whatsapps"
                             :key="whatsapp.whatsapp_id+'whatsappId'"
                             @click="selectWhatsapp(whatsapp)"
                        >
                            {{whatsapp.phone}}
                        </div>
                    </div>
                </transition>
                <BaseModalHint class="base-modal-hint_padding-20">
                    Выберите или создайте папки, в которых нужно показывать этот чат
                </BaseModalHint>
                <BaseModalText class="base-modal-text_padding-20 base-modal-text_mb-6 base-modal-text_mt-29">
                    Мои папки
                </BaseModalText>
                <div class="modal-create-chat__my-folders"
                     :class="{'modal-create-chat__my-folders_scroll': folders.length > 3}"
                >
                    <div v-show="folders.length > 3" class="scroll" ref="container" @click.self="scrollTo">
                        <div class="scroll__bar" ref="scrollbar"></div>
                    </div>
                    <div class="modal-create-chat__folder-content" ref="content">
                        <div class="modal-create-chat__folder pointer"
                             v-for="folder in folders"
                             :key="folder.folder_id + 'ModalCreateChat'"
                             :class="{'modal-create-chat__folder_active': selectedFolder === folder.folder_id}"
                             @click="selectLocalFolder(folder.folder_id)"
                        >
                            <div class="modal-create-chat__folder-container">
                                <div class="modal-create-chat__folder-name">
                                    {{folder.name}}
                                </div>
                                <div class="modal-create-chat__chats-count">
                                    {{folder.dialogues_count}}
                                </div>
                            </div>
                            <svg class="modal-create-chat__icon"
                                 :class="{'modal-create-chat__icon_default': selectedFolder !== folder.folder_id}"
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
                <div class="modal-create-chat__label modal-create-chat__label_padding-20 modal-create-chat__label_mt-26 modal-create-chat__label_uppercase pointer">
                </div>
                <BaseModalText
                        class="base-modal-text_padding-20 base-modal-text_mt-26 base-modal-text_uppercase pointer"
                        v-if="!fromModals.fromAddToFolderToCreateChat"
                        @click="createFolder"
                >Создать новую папку</BaseModalText>
            </div>

            <div class="modal-create-chat__buttons">
                <BaseButton
                        class="base-button_enter"
                        @click="save"
                >
                    Сохранить
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
    import BaseButton from '../Base/BaseButton.vue'
    import BaseModalLabel from '../Base/BaseModalLabel.vue'
    import BaseModalText from '../Base/BaseModalText.vue'
    import BaseModalHint from '../Base/BaseModalHint.vue'
    import BaseModalHeader from '../Base/BaseModalHeader.vue'

    import { useFolder } from "../../composition/useFolder";
    import { useModals } from "../../composition/useModals";
    import { useCustomScroll } from "../../composition/useCustomScroll";
    import { onMounted, ref, reactive } from "vue";
    import { useWhatsapp } from "../../composition/useWhatsapp";
    import {useDialogs} from "../../composition/useDialogs";

    export default {
        components: { BaseButton, BaseModalLabel, BaseModalText, BaseModalHint, BaseModalHeader },
        setup() {
            const { folders, selectFolder, getAllFolders } = useFolder();
            const { container, content, scrollbar, scrollTo, init } = useCustomScroll()
            const { toggleModalCreateChat, toggleModalCreateFolder, fromModals, setCloseCallback, onCloseCallback } = useModals();
            const { getWhatsapps, whatsapps } = useWhatsapp()
            const { createDialog, getDialogs, selectDialog } = useDialogs();


            const openedWhatsApps = ref(false);
            const toggleOpenedWhatsApps = () => {
                openedWhatsApps.value = !openedWhatsApps.value;
            }

            const selectedFolder = ref(null);

            const selectLocalFolder = (folder) => {
                selectedFolder.value = folder;
            }
            const selectedWhatsapp = ref(null);
            const selectWhatsapp = (wp) => {
                selectedWhatsapp.value = wp;
                toggleOpenedWhatsApps();
            }

            const name = ref('');
            const errors = reactive({
                whatsapp: false,
                phone: false,
            })

            const close = () => {
                fromModals.fromAddToFolderToCreateChat = false;
                setCloseCallback(() => null);
                toggleModalCreateChat(false);
            }

            const createFolder = () => {
                fromModals.fromCreateChatToCreateFolder = true;
                toggleModalCreateFolder(true);
            }

            const save = () => {
                errors.whatsapp = false;
                errors.phone = false;
                if (!selectedWhatsapp.value) {
                    errors.whatsapp = true;
                    return;
                }
                if (!name.value) {
                    errors.phone = true;
                    return;
                }
                createDialog({
                    phone: name.value,
                    whatsapp_id: selectedWhatsapp.value.whatsapp_id,
                    folder_id: selectedFolder.value,
                }).then(r => {
                    if (r.error) {
                        errors.phone = true;
                        return;
                    }
                    selectFolder(selectedFolder.value);
                    getDialogs(selectedFolder.value);
                    getAllFolders();

                    onCloseCallback();
                    fromModals.fromAddToFolderToCreateChat = false;
                    setCloseCallback(() => null);

                    toggleModalCreateChat(false);
                })
            }

            onMounted( () => {
                init();
                getWhatsapps();
                selectLocalFolder(folders.value.find(i => i.is_default).folder_id);
            })

            return {
                container,
                content,
                scrollbar,
                scrollTo,

                name,

                folders,
                selectLocalFolder,
                selectedFolder,

                toggleModalCreateChat,

                whatsapps,
                selectWhatsapp,
                selectedWhatsapp,
                openedWhatsApps,
                toggleOpenedWhatsApps,

                save,

                errors,

                fromModals,
                close,
                createFolder,
            }
        }
    }
</script>

<style lang="scss">
    .modal-create-chat {
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
        &.z-index {
            z-index: 1400;
        }
    }
    .modal-create-chat__body {
        width: 364px;
        background: var(--create-folder-color);
        border-radius: 9px;
        padding: 20px 0;
        text-align: left;
    }
    .modal-create-chat__input-group {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 31px 0 29px;
        &.modal-create-chat__input-group_padding-20 {
            padding: 0 20px;
        }
    }
    .modal-create-chat__input {
        font-family: Segoe UI;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        margin-top: 6px;
        color: var(--create-folder-header-color);
        width: 100%;
        border-bottom: 1px solid var(--separator-color);
        padding: 2px;
        background: transparent;
    }
    .modal-create-chat__my-folders {
        position: relative;
    }
    .modal-create-chat__my-folders_scroll {
        height: calc(53px * 3);
        ::-webkit-scrollbar {
            display: none;
        }
    }
    .modal-create-chat__folder-content {
        overflow-y: auto;
        height: 100%;
    }
    .modal-create-chat__icon_default {
        path {
            fill: var(--default-svg-fill);
        }
    }
    .modal-create-chat__folder {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        padding: 8px 20px;
        &:hover {
            background: var(--create-chat-border-color);
            .modal-create-chat__icon {
                &.modal-create-chat__icon_default {
                    path {
                        fill: var(--hover-svg-fill);
                    }
                }
            }
        }
        &.modal-create-chat__folder_active {
            background: var(--create-chat-border-color);
        }
    }
    .modal-create-chat__buttons {
        padding: 0 20px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 44px;
    }
    .modal-create-chat__folder-name {
        color: var(--create-folder-font-color);
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
    }
    .modal-create-chat__chats-count {
        color: var(--create-folder-border-color);
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;
    }
    .modal-create-chat__select-whatsapp {
        transition: .3s ease;
    }
    .modal-create-chat__select-whatsapp_reverse {
        transform: rotate(180deg);
    }
    .modal-create-chat__whatsapp-list {
        background: var(--create-chat-border-color);
        padding: 0 20px;
        margin-top: 7px;
        text-align: left;
        overflow: hidden;
        height: 127px;
    }
    .height-transition-enter-active, .height-transition-leave-active {
        transition: height .3s ease;
    }
    .height-transition-enter-from, .height-transition-leave-to {
        height: 0;
    }
    .modal-create-chat__whatsapp {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        color: var(--font-color);
        padding: 9px 0;
        cursor: pointer;
    }

    .modal-create-chat__height-container {
        max-height: 351px;
        overflow: hidden;
    }
</style>