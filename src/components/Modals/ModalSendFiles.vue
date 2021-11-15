<template>
    <div class="modal-send-files" @mousedown.self="close">
        <div class="modal-send-files__body">
            <BaseModalHeader v-if="filesToSend.length > 1" class="base-modal-header__pd-0">
                Выбрано {{filesToSend.length}} документов
            </BaseModalHeader>
            <div class="modal-send-files__single-file" v-if="(filesToSend.length + 1) === 1 && filesToSend[0]"
            >
            <div class="modal-send-files__info">
                            <div class="modal-send-files__name">
                                {{filesToSend[0].name}}
                            </div>
                            <div class="modal-send-files__size">
                         {{conv_size(filesToSend[0].size)}}
                            </div>
                        </div>
                <div class="modal-send-files__actions-container">
                    <svg class="pointer" style="margin-right: 14px;" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.8131 0.646414C17.0463 0.743075 17.2582 0.884749 17.4366 1.06334C17.6152 1.24174 17.7569 1.45359 17.8535 1.68678C17.9502 1.91996 17.9999 2.16992 17.9999 2.42235C17.9999 2.67478 17.9502 2.92473 17.8535 3.15792C17.7569 3.39111 17.6152 3.60296 17.4366 3.78136L14.8673 6.34993L12.15 3.63264L14.7185 1.06334C14.8969 0.884749 15.1088 0.743075 15.342 0.646414C15.5752 0.549753 15.8251 0.5 16.0776 0.5C16.33 0.5 16.58 0.549753 16.8131 0.646414ZM0 16.9286C0.000173417 16.1166 0.322878 15.338 0.897133 14.7639L11.1108 4.55031L13.95 7.38941L3.73627 17.603C3.16218 18.1773 2.38351 18.5 1.57151 18.5001H0V16.9286Z" fill="#EDEDEF"/>
                    </svg>
                    <svg @click="del(filesToSend[0].id)" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M21 10.5C21 16.299 16.299 21 10.5 21C4.70101 21 0 16.299 0 10.5C0 4.70101 4.70101 0 10.5 0C16.299 0 21 4.70101 21 10.5ZM10.6788 9.97131L13.4217 7.2284L14.1288 7.9355L11.3859 10.6784L14.1289 13.4214L13.4218 14.1285L10.6788 11.3855L7.93638 14.1279L7.22928 13.4208L9.9717 10.6784L7.22935 7.93607L7.93646 7.22897L10.6788 9.97131Z" fill="#EDEDEF"/>
                    </svg>
                </div>

            </div>
            <div class="modal-send-files__container" v-else>
                <div class="scroll" ref="container" @click.self="scrollTo">
                    <div class="scroll__bar" ref="scrollbar"></div>
                </div>
                <div class="modal-send-files__content" ref="content">
                    <div class="modal-send-files__file-container" v-for="file in filesToSend" :key="file.id">
                        <div class=""
                        ><svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="48" height="48" rx="24" fill="#2E2E4E"/>
                            <path d="M26.4998 20.6666H31.9498C31.6589 19.8957 31.2069 19.1957 30.624 18.6133L27.7207 15.7083C27.1376 15.1261 26.4374 14.6744 25.6665 14.3833V19.8333C25.6665 20.2935 26.0396 20.6666 26.4998 20.6666Z" fill="#F0F0FA"/>
                            <path d="M32.3131 22.3333H26.4998C25.1191 22.3333 23.9998 21.214 23.9998 19.8333V14.02C23.8656 14.0108 23.7315 14 23.5956 14H19.8331C17.5331 14.0028 15.6692 15.8666 15.6665 18.1667V29.8334C15.6692 32.1334 17.5331 33.9973 19.8331 34H28.1665C30.4665 33.9973 32.3304 32.1334 32.3331 29.8333V22.7375C32.3331 22.6017 32.3223 22.4675 32.3131 22.3333Z" fill="#F0F0FA"/>
                        </svg>
                        </div>
                        <div class="modal-send-files__info">
                            <div class="modal-send-files__name">
                            {{file.name}} 
                            </div>
                            <div class="modal-send-files__size">
                               {{conv_size(file.size)}}
                            </div>
                        </div>
                        <div class="modal-send-files__actions">
                            <svg class="pointer" style="margin-right: 14px;" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.8131 0.646414C17.0463 0.743075 17.2582 0.884749 17.4366 1.06334C17.6152 1.24174 17.7569 1.45359 17.8535 1.68678C17.9502 1.91996 17.9999 2.16992 17.9999 2.42235C17.9999 2.67478 17.9502 2.92473 17.8535 3.15792C17.7569 3.39111 17.6152 3.60296 17.4366 3.78136L14.8673 6.34993L12.15 3.63264L14.7185 1.06334C14.8969 0.884749 15.1088 0.743075 15.342 0.646414C15.5752 0.549753 15.8251 0.5 16.0776 0.5C16.33 0.5 16.58 0.549753 16.8131 0.646414ZM0 16.9286C0.000173417 16.1166 0.322878 15.338 0.897133 14.7639L11.1108 4.55031L13.95 7.38941L3.73627 17.603C3.16218 18.1773 2.38351 18.5 1.57151 18.5001H0V16.9286Z"
                                      fill="#9797BB"/>
                            </svg>
                            <svg @click="del(file.id)" class="pointer" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M21 10.5C21 16.299 16.299 21 10.5 21C4.70101 21 0 16.299 0 10.5C0 4.70101 4.70101 0 10.5 0C16.299 0 21 4.70101 21 10.5ZM10.6788 9.97131L13.4217 7.2284L14.1288 7.9355L11.3859 10.6784L14.1289 13.4214L13.4218 14.1285L10.6788 11.3855L7.93638 14.1279L7.22928 13.4208L9.9717 10.6784L7.22935 7.93607L7.93646 7.22897L10.6788 9.97131Z"
                                      fill="#9797BB"/>
                            </svg>

                        </div>
                    </div>
                </div>

            </div>
            <BaseModalText @click="add" class="base-modal-text_mt-29 base-modal-text_uppercase base-modal-text_hovered pointer">
                +Добавить файл
            </BaseModalText>
            <input type="file" style="display: none;" id="modal-send-files__input-file" @change="changeDocs"  accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain">

            <div class="modal-send-files__buttons">
                <BaseButton
                        class="base-button_enter"
                        @click="save"
                >
                    Продолжить
                </BaseButton>
                <BaseButton
                        class="base-button_cancel"
                        @click.self="close"
                >
                    Отмена
                </BaseButton>
            </div>
        </div>
        <teleport>

        </teleport>
    </div>
</template>

<script>
    import BaseButton from '../Base/BaseButton.vue'
    import BaseModalText from '../Base/BaseModalText.vue'
    import BaseModalHeader from '../Base/BaseModalHeader.vue'
    import {useFiles} from "../../composition/useFiles";
    import {useModalsFiles} from "../../composition/useModalsFiles";
    import {useSocket} from "../../composition/useSocket";
    import {useDialogs} from "../../composition/useDialogs";
    import { useMessages } from "../../composition/useMessages";
    import {useCustomScroll} from "../../composition/useCustomScroll";
    import {onMounted} from "vue";

    export default {
        components: { BaseButton, BaseModalText, BaseModalHeader },
        setup() {
            const { toggleModalSendFiles } = useModalsFiles();
            const { socketSend } = useSocket();
            const { selectedDialog } = useDialogs();
            const { container, content, scrollbar, scrollTo, init } = useCustomScroll();
            const { filesToSend, createFile, addFiles, deleteFile } = useFiles();
            const { addSendedMessage, getRandomInRange } = useMessages();
            let NewFilesToSend =  filesToSend.value.length + 1;
            const close = () => {
                toggleModalSendFiles(false);
            }
            const add = () => {
                document.getElementById('modal-send-files__input-file').click();
            }
            const changeDocs = ($event) => {
                if ($event.target.files[0]) {
                    $event.target.files.forEach(item => {
                        let fr = new FileReader();
                        fr.addEventListener("load", function () {
                            createFile(item)
                                .then((r) => {
                                    if (r.status === 'ok') {
                                        addFiles({
                                            name: item.name,
                                            size: item.size,
                                            type: item.type,
                                            id: r.files[0],
                                            src: fr.result,
                                        })
                                    }
                                })
                        }, false);
                        fr.readAsDataURL(item);
                    })
                }
            }
            const del = (id) => {
                deleteFile(id);
            }

            function conv_size(b){
                let fsizekb = b / 1024,
                    fsizemb = fsizekb / 1024,
                    fsizegb = fsizemb / 1024,
                    fsizetb = fsizegb / 1024,
                    fsize
                if (fsizekb <= 1024) {
                    fsize = fsizekb.toFixed(2) + ' KB';
                } else if (fsizekb >= 1024 && fsizemb <= 1024) {
                    fsize = fsizemb.toFixed(2) + ' MB';
                } else if (fsizemb >= 1024 && fsizegb <= 1024) {
                    fsize = fsizegb.toFixed(2) + ' GB';
                } else {
                    fsize = fsizetb.toFixed(2) + ' TB';
                }
                return fsize;
            }

            const save = () => {
                const uidRandom = getRandomInRange();
                    addSendedMessage({
                        is_me: true,
                        is_read: false,
                        message_id:uidRandom+1,
                        time: Math.floor(Date.now() / 1000),
                        type: 'document',
                        is_sending:true,
                        request_uid:uidRandom,
                    });
                filesToSend.value.forEach(file => {
                    socketSend('send_message', {
                        type: 'document',
                        data: file.id,
                        dialog_id: selectedDialog.value,
                        file_name: file.name,
                        request_uid:uidRandom, 
                        message_uid : null
                    })
                })
            }
            onMounted( () => {
                init()
            })
            return {
                container,
                content,
                scrollbar,
                scrollTo,
                save,
                close,
                add,
                changeDocs,
                del,
                filesToSend,
                conv_size,
                NewFilesToSend,
            }
        }
    }
</script>

<style lang="scss">
    .modal-send-files {
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
    .modal-send-files__body {
        width: 364px;
        background: var(--modal-bg-color);
        border-radius: 9px;
        padding: 20px;
        text-align: left;
    }
    .modal-send-files__buttons {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 58px;
    }
    .modal-send-files__single-file {
        width: 100%;
        height: 191px;
        position: relative;
    }
    .modal-send-files__container {
        margin-top: 26px;
        height: 203px;
        width: 100%;
        position: relative;
        ::-webkit-scrollbar {
            display: none;
        }
    }
    .modal-send-files__content {
        height: 100%;
        width: 100%;
        overflow-y: auto;
    }
    .modal-send-files__file-container {
        width: 100%;
        display: flex;
        margin-bottom: 23px;
        &:last-of-type {
            margin-bottom: 0;
        }
    }
    .modal-send-files__file {
        border-radius: 7px;
        width: 90px;
        height: 90px;
    }
    .modal-send-files__info {
        margin-left: 14px;
    }
    .modal-send-files__name {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 19px;
        color: var(--modal-send-images-name-color);
        width: 150px;
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .modal-send-files__size {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 19px;
        color: var(--search-input-placeholder-color);
        margin-top: 7px;
        width: 150px;
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .modal-send-files__actions {
        margin-left: auto;
    }

    .modal-send-files__actions-container {
        position: absolute;
        top: 9px;
        right: 16px;
        background: rgba(46, 46, 78, 0.45);
        border-radius: 15px;
        padding: 5.5px 10px;
    }
</style>