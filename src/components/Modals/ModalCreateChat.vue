<template>
    <div
            class="modal-create-chat"
            @mousedown.self="close"
            :class="{'z-index': fromModals.fromAddToFolderToCreateChat}"
    >
        <teleport to="body">
            <FullScreenLoader v-if="showBaseLoader"></FullScreenLoader>
        </teleport>
        <div class="modal-create-chat__body">
            <BaseModalHeader>
                Создать чат
            </BaseModalHeader>
            <div class="modal-create-chat__main-scroll-wrapper">
                <div class="scroll" ref="container" @click.self="scrollTo">
                    <div class="scroll__bar" ref="scrollbar"></div>
                </div>
                <div class="modal-create-chat__main-scroll" ref="content">
                    <div class="modal-create-chat__choice-buttons">
                        <div class="modal-create-chat__choice pointer" @click="choice = 1"
                             :class="{'modal-create-chat__choice_active': choice === 1}"
                        >
                            Добавить номер
                        </div>
                        <div class="modal-create-chat__choice pointer"
                             @click="(choice = 2)"
                             :class="{'modal-create-chat__choice_active': choice === 2}"
                        >
                            Залить базу
                        </div>
                    </div>
                    <div class="modal-create-chat__input-group-margin-container">
                        <div class="modal-create-chat__input-group modal-create-chat__input-group_padding-20 pointer"
                             @click="CRM.toggleOpenedCRM()">
                            <BaseModalLabel for-id="modal-create-chat__input">CRM</BaseModalLabel>
                            <div class="modal-create-chat__input">
                                {{CRM.selectedCRM === 1? 'WhatsApp ' : 'Instagram'}}
                            </div>
                        </div>
                    </div>
                    <transition name="height-transition">
                        <div class="modal-create-chat__whatsapp-container modal-create-chat__whatsapp-container_two-el"
                             v-show="CRM.openedCRM"
                        >
                            <div class="modal-create-chat__whatsapp-list">
                                <div class="modal-create-chat__whatsapp"
                                     @click="CRM.selectCRM(1)"
                                >
                                    WhatsApp
                                </div>
                                <div class="modal-create-chat__whatsapp"
                                     @click="CRM.selectCRM(2)"
                                >
                                    Instagram
                                </div>
                            </div>
                        </div>
                    </transition>
                    <template v-if="choice === 1">
                        <div v-if="CRM.selectedCRM === 1" class="modal-create-chat__input-group modal-create-chat__input-group_padding-20">
                            <BaseModalLabel for-id="modal-create-chat__input"
                                            :class="{'base-modal-label_error': errors.name}">Имя</BaseModalLabel>
                            <input id="modal-create-chat__input-phone" type="text" class="modal-create-chat__input"  v-model="namePerson"> 
                        </div>
                         <div v-if="CRM.selectedCRM === 1" class="modal-create-chat__input-group modal-create-chat__input-group_padding-20">
                            <BaseModalLabel for-id="modal-create-chat__input"
                                            :class="{'base-modal-label_error': errors.phone}">Номер телефона</BaseModalLabel>
                            <input id="modal-create-chat__input-phone" type="text" class="modal-create-chat__input" v-model="phone"   placeholder="7 (123) 456-78-90"
                 v-maska="'7 (###) ###-##-##'">
                        </div>
                        <div v-else class="modal-create-chat__input-group modal-create-chat__input-group_padding-20">
                            <BaseModalLabel for-id="modal-create-chat__input"
                                            :class="{'base-modal-label_error': errors.login}">Логин</BaseModalLabel>
                            <input id="modal-create-chat__input-login" type="text" class="modal-create-chat__input" v-model="login">
                        </div>
                    </template>
                    <div v-else-if="choice === 2" class="modal-create-chat__input-group modal-create-chat__input-group_padding-20">
                        <BaseModalLabel  :class="{'base-modal-label_error': errors.baseFile}">Файл с базой</BaseModalLabel>
                        <div class="modal-create-chat__input pointer"
                             :class="{
                                'modal-create-chat__input_placeholder': !uploadedFile,
                             }"
                        >
                            <label for="fileBase" class="pointer modal-create-chat__input-label">
                                {{
                                    uploadedFile ? uploadedFile.name : "Загрузить файл"
                                }}
                            </label>
                            <input
                                    class="modal-create-chat__input-file"
                                    id="fileBase"
                                    type="file"
                                    accept=".csv,text/plain"
                                    @change="selectFile"
                            />
                        </div>
                    </div>
                    <div v-show="CRM.selectedCRM === 1">
                        <div class="modal-create-chat__input-group-margin-container">
                            <div class="modal-create-chat__input-group modal-create-chat__input-group_padding-20 pointer" @click="toggleOpenedWhatsApps">
                                <BaseModalLabel for-id="modal-create-chat__input" :class="{'base-modal-label_error': errors.whatsapp}">WhatsApp</BaseModalLabel>
                                <div class="modal-create-chat__input">{{selectedWhatsapp === null? 'Выберите WhatsApp ' : selectedWhatsapp.phone+' '}}</div>
                            </div>
                        </div>
                        <transition name="height-transition">
                            <div class="modal-create-chat__whatsapp-container"
                                 v-show="openedWhatsApps"
                                 :class="{
                            'modal-create-chat__whatsapp-container_two-el': whatsapps.length === 2,
                            'modal-create-chat__whatsapp-container_scroll': whatsapps.length > 2
                         }"
                            >
                                <div v-show="whatsapps.length > 3" class="scroll" ref="containerWhatsapps" @click.self="scrollToWhatsapps">
                                    <div class="scroll__bar" ref="scrollbarWhatsapps"></div>
                                </div>
                                <div class="modal-create-chat__whatsapp-list" ref="contentWhatsapps">
                                    <div class="modal-create-chat__whatsapp"
                                         v-for="whatsapp in whatsapps"
                                         :key="whatsapp.whatsapp_id+'whatsappId'"
                                         @click="selectWhatsapp(whatsapp)"
                                    >
                                        {{whatsapp.phone}}
                                    </div>
                                </div>
                            </div>
                        </transition>
                    </div>
                    <div v-show="CRM.selectedCRM === 2">
                        <div class="modal-create-chat__input-group-margin-container">
                            <div class="modal-create-chat__input-group modal-create-chat__input-group_padding-20 pointer" @click="toggleOpenedInstagrams">
                                <BaseModalLabel for-id="modal-create-chat__input" :class="{'base-modal-label_error': errors.instagram}">Instagram</BaseModalLabel>
                                <div class="modal-create-chat__input">{{selectedInstagram === null? 'Выберите Instagram ' : selectedInstagram.login+' '}}</div>
                            </div>
                        </div>
                        <transition name="height-transition">
                            <div class="modal-create-chat__whatsapp-container"
                                 v-show="openedInstagrams"
                                 :class="{
                                'modal-create-chat__whatsapp-container_two-el': instagrams.length === 2,
                                'modal-create-chat__whatsapp-container_scroll': instagrams.length > 2
                             }"
                            >
                                <div v-show="instagrams.length > 3" class="scroll" ref="containerInstagrams" @click.self="scrollToInstagrams">
                                    <div class="scroll__bar" ref="scrollbarInstagrams"></div>
                                </div>
                                <div class="modal-create-chat__whatsapp-list" ref="contentInstagrams">
                                    <div class="modal-create-chat__whatsapp"
                                         v-for="instagram in instagrams"
                                         :key="instagram.instagram_id+'instagramId'"
                                         @click="selectInstagram(instagram)"
                                    >
                                        {{instagram.login}}
                                    </div>
                                </div>
                            </div>
                        </transition>
                    </div>
                    <BaseModalHint class="base-modal-hint_padding-20 base-modal-hint_mt">
                        Выберите или создайте папки, в которых нужно показывать этот чат
                    </BaseModalHint>
                    <BaseModalText class="base-modal-text_padding-20 base-modal-text_mb-6 base-modal-text_mt-29">
                        Мои папки
                    </BaseModalText>
                    <div class="modal-create-chat__my-folders"
                         :class="{'modal-create-chat__my-folders_scroll': folders.length > 2}"
                    >
                        <div v-show="folders.length > 2" class="scroll" ref="containerFolders" @click.self="scrollToFolders">
                            <div class="scroll__bar" ref="scrollbarFolders"></div>
                        </div>
                        <div class="modal-create-chat__folder-content" ref="contentFolders">
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
                    <div class="modal-create-chat__label modal-create-chat__label_padding-20 modal-create-chat__label_mt-26 modal-create-chat__label_uppercase pointer">
                    </div>
                    <BaseModalText
                            class="base-modal-text_padding-20 base-modal-text_mt-26 base-modal-text_uppercase pointer"
                            v-if="!fromModals.fromAddToFolderToCreateChat"
                            @click="createFolder"
                    >+Создать новую папку</BaseModalText>
                </div>

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
    import {useInstagram} from "../../composition/useInstagrams";
    import {useFiles} from "../../composition/useFiles";

    export default {
        props: {
          fromSettings: Boolean,
        },
        components: { BaseButton, BaseModalLabel, BaseModalText, BaseModalHint, BaseModalHeader },
        setup(props) {
            const { folders, selectFolder, getAllFolders } = useFolder();
            const { container, content, scrollbar, scrollTo, init } = useCustomScroll();
            const newCustomScrollWhatsApp = useCustomScroll()
            const newCustomScrollInstagram = useCustomScroll()
            const newCustomScrollFolder = useCustomScroll()
            const {
                toggleModalCreateChat,
                toggleModalCreateFolder,
                fromModals,
                setCloseCallbackCreateChat,
                onCloseCallbackCreateChat
            } = useModals();
            const { getWhatsapps, whatsapps } = useWhatsapp()
            const { getInstagrams, instagrams } = useInstagram()
            const { createDialog, getDialogs, selectDialog } = useDialogs();
            const { createFile, uploadBaseFromFile } = useFiles()

            const toggleUploaderBase = ref(false);
            const uploadedFile = ref(null);
            const selectFile = ($event) => {
                uploadedFile.value = $event.target.files[0];
            };
            const showBaseLoader = ref(false)

         

            const openedWhatsApps = ref(false);
            const toggleOpenedWhatsApps = () => {
                openedWhatsApps.value = !openedWhatsApps.value;
            }

            const openedInstagrams = ref(false);
            const toggleOpenedInstagrams = () => {
                openedInstagrams.value = !openedInstagrams.value;
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

            const selectedInstagram = ref(null);
            const selectInstagram = (wp) => {
                selectedInstagram.value = wp;
                toggleOpenedInstagrams();
            }

            const CRM = reactive({
                selectedCRM: 1,
                openedCRM: false,
                toggleOpenedCRM: () => {
                        CRM.openedCRM = !CRM.openedCRM
                },
                selectCRM: choice => {
                    CRM.selectedCRM = choice;
                    CRM.toggleOpenedCRM();
                }
            })
            const namePerson = ref('');
          
            const phone = ref('');
            const login = ref('');
            const errors = reactive({
                whatsapp: false,
                phone: false,
                login: false,
                instagram: false,
                baseFile: false,
                name: false, 
            })

            const choice = ref(1);

            const close = () => {
                fromModals.fromAddToFolderToCreateChat = false;
                setCloseCallbackCreateChat(() => null);
                toggleModalCreateChat(false);
            }

            const createFolder = () => {
                fromModals.fromCreateChatToCreateFolder = true;
                toggleModalCreateFolder(true);
            }

            const save = () => {
                errors.whatsapp = false;
                errors.phone = false;
                errors.login = false;
                errors.instagram = false;
                errors.name = false;
                errors.baseFile = false

                // загрузка файла
                if (choice.value === 2) {
                    if (!uploadedFile.value) {
                        errors.baseFile = true;
                        return;
                    }
                    if (CRM.selectedCRM === 1) {
                        if (!selectedWhatsapp.value) {
                            errors.whatsapp = true;
                            return;
                        }
                    }
                    if (CRM.selectedCRM === 2) {
                        if (!selectedInstagram.value) {
                            errors.instagram = true;
                            return;
                        }
                    }

                    // for del
                    // return uploadFileBase(uploadedFile.value);
                    const selectedSocialId = CRM.selectedCRM === 1
                        ? selectedWhatsapp.value.whatsapp_id
                        : selectedInstagram.value.instagram_id

                    uploadFileBase();
                     

                    return;
                }

                if (CRM.selectedCRM === 1) {
                    if (!phone.value) {
                        errors.phone = true;
                        return;
                    }
                    if (!selectedWhatsapp.value) {
                        errors.whatsapp = true;
                        return;
                    }

                }
                if (CRM.selectedCRM === 2) {
                    if (!login.value) {
                        errors.login = true;
                        return;
                    }
                    if (!selectedInstagram.value) {
                        errors.instagram = true;
                        return;
                    }

                }
                const dataToSend = {
                    folder_id: selectedFolder.value,
                }
               
                if (CRM.selectedCRM === 1) {
                  
                    dataToSend.phone = phone.value;
                    dataToSend.whatsapp_id = selectedWhatsapp.value.whatsapp_id;
                    dataToSend.type = 'WhatsappDialog';
                    dataToSend.name = namePerson.value;
                }
                if (CRM.selectedCRM === 2) {
                    dataToSend.login = login.value;
                    dataToSend.instagram_id = selectedInstagram.value.instagram_id;
                    dataToSend.type = 'InstagramDialog';
                }
                createDialog(dataToSend)
                    .then(r => {
                        if (r.error) {
                            errors.phone = true;
                            errors.login = true;
                            return;
                        }
                        selectFolder(selectedFolder.value);
                        getDialogs(selectedFolder.value);
                        getAllFolders();

                        onCloseCallbackCreateChat();
                        fromModals.fromAddToFolderToCreateChat = false;
                        setCloseCallbackCreateChat(() => null);

                        toggleModalCreateChat(false);
                    })
            }
   const uploadFileBase = () => {
        createFile(uploadedFile.value)
            .then( res => {
                if (res.status === "ok") {
                    const dialogType = CRM.selectedCRM;
                    const params = {
                        folder_id: !selectedFolder.value
                            ? 0
                            : selectedFolder.value,
                        file_uid: res.files[0],      
                    }; 
                    if (dialogType === 1) {
                        params.whatsapp_id = selectedWhatsapp.value.whatsapp_id;
                        params.type = "WhatsappDialog";
                    }
                    if (dialogType === 2) {
                        params.instagram_id = selectedInstagram.value.instagram_id;
                        params.type = "InstagramDialog";
                    }
                    showBaseLoader.value = true
                    uploadBaseFromFile(params)
                        .then(r => {
                            showBaseLoader.value = false;
                            if (r.error) {
                                return;
                            }
                            toggleModalCreateChat(false);
                        })
                }
            });
        };
            onMounted( () => {
                newCustomScrollWhatsApp.init();
                newCustomScrollInstagram.init();
                init();
                getWhatsapps();
                getInstagrams();

                if (props.fromSettings) {
                    getAllFolders()
                        .then(() => {
                            selectLocalFolder(folders.value.find(i => i.is_default).folder_id)
                        })
                } else {
                    selectLocalFolder(folders.value.find(i => i.is_default).folder_id)
                }
            })

            return {
                container,
                content,
                scrollbar,
                scrollTo,

                containerWhatsapps: newCustomScrollWhatsApp.container,
                contentWhatsapps: newCustomScrollWhatsApp.content,
                scrollbarWhatsapps: newCustomScrollWhatsApp.scrollbar,
                scrollToWhatsapps: newCustomScrollWhatsApp.scrollTo,

                containerInstagrams: newCustomScrollInstagram.container,
                contentInstagrams: newCustomScrollInstagram.content,
                scrollbarInstagrams: newCustomScrollInstagram.scrollbar,
                scrollToInstagrams: newCustomScrollInstagram.scrollTo,

                containerFolders: newCustomScrollFolder.container,
                contentFolders: newCustomScrollFolder.content,
                scrollbarFolders: newCustomScrollFolder.scrollbar,
                scrollToFolders: newCustomScrollFolder.scrollTo,

                CRM,

                phone,
                login,

                folders,
                selectLocalFolder,
                selectedFolder,

                choice,

                toggleModalCreateChat,

                whatsapps,
                selectWhatsapp,
                selectedWhatsapp,
                openedWhatsApps,
                toggleOpenedWhatsApps,

                instagrams,
                selectInstagram,
                selectedInstagram,
                openedInstagrams,
                toggleOpenedInstagrams,

                save,

                errors,

                fromModals,
                close,
                createFolder,

                toggleUploaderBase,
                uploadedFile,
                selectFile,
                showBaseLoader,
                namePerson,
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
        background: var(--modal-bg-color);
        border-radius: 9px;
        padding: 20px 0;
        text-align: left;
    }
    .modal-create-chat__input-group-margin-container {
        width: 100%;
        margin-bottom: 18px;
    }
    .modal-create-chat__input-group {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 41px 0 0;
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
        width: 100%;
        display: flex;
        padding: 6px 10px;
        color: var(--modal-font-color);
        background: var(--modal-element-hover-bg-color);
        border: 0.7px solid var(--modal-input-border-color);
        box-sizing: border-box;
        border-radius: 3px;
        &.chat__input_placeholder {
            color: var(--search-input-placeholder-color);
        }
        &-label{
            width: 100%;
        }
    }
    .modal-create-chat__my-folders {
        position: relative;
        &.modal-create-chat__my-folders_scroll {
            height: calc(53px * 3);
            ::-webkit-scrollbar {
                display: none;
            }
        }
    }

    .modal-create-chat__folder-content {
        overflow-y: auto;
        height: 100%;
    }
    .modal-create-chat__icon {
        path {
            transition: fill .2s ease;
        }
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
        transition: .2s ease;
        &:hover {
            background:  var(--modal-element-hover-bg-color);
            .modal-create-chat__icon {
                &.modal-create-chat__icon_default {
                    path {
                        fill: var(--hover-svg-fill);
                    }
                }
            }
        }
        &.modal-create-chat__folder_active {
            background: var(--modal-element-hover-bg-color);
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
        color: var(--modal-font-color);
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
    }
    .modal-create-chat__chats-count {
        color: var(--modal-sub-font-color);
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;
    }
    .modal-create-chat__whatsapp-container {
        position: relative;
        background: var(--context-background-color);
        color: var(--user-info-settings-default-svg-fill);
        margin: 0 20px;
        text-align: left;
        border-radius: 6px;
        height: 40px;
        ::-webkit-scrollbar {
            display: none;
        }
        &.modal-create-chat__whatsapp-container_two-el {
            height: calc(40px * 2);
        }
        &.modal-create-chat__whatsapp-container_scroll {
            height: calc(40px * 3);
        }

    }
    .modal-create-chat__whatsapp-list {
        overflow-y: auto;
        height: 100%;
    }
    .modal-create-chat__whatsapp {
        list-style-type: none;
        padding: 10px 12px;
        cursor: pointer;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        transition: .3s ease;
        &:hover {
            background: var(--user-info-settings-hover-setting-bg);
            color: var(--font-color);
        }
    }
    .modal-create-chat__choice-buttons {
        background: var(--modal-element-borders-color);
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 1px;
        padding-bottom: 1px;
        height: 51px;
        margin-top: 27px;
    }
    .modal-create-chat__choice {
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--left-bar-color);
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        color: var(--search-input-placeholder-color);
        transition: .2s ease;
        width: 100%;
        height: 100%;
        &:first-of-type {
            margin-right: 1px;
        }
        &:last-of-type {
            margin-left: 1px;
        }
        &.modal-create-chat__choice_active {
            background: var(--modal-element-hover-bg-color);
            color: var(--modal-font-color);
        }
    }

    .modal-create-chat__main-scroll-wrapper {
        height: 500px;
        overflow: hidden;
        position: relative;
        ::-webkit-scrollbar {
            display: none;
        }
    }
    .modal-create-chat__main-scroll {
        overflow-y: auto;
        height: 100%;
    }
    .modal-create-chat__input-file {
        display: none;
    }


    .height-transition-enter-active, .height-transition-leave-active {
        transition: height .3s ease!important;
    }
    .height-transition-enter-from, .height-transition-leave-to {
        height: 0!important;
    }
</style>