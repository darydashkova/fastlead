<template>
    <div class="modal-send-images" @mousedown.self="close">
        <div class="modal-send-images__body">
            <BaseModalHeader v-if="imagesToSend.length > 1" class="base-modal-header__pd-0">
                Выбрано {{imagesToSend.length}} изображения
            </BaseModalHeader>
            <div class="modal-send-images__single-image" v-if="imagesToSend.length === 1"
                 :style="{
                    'background': `url(${imagesToSend[0].src}) no-repeat`,
                    'background-size': 'cover',
                    'background-position': 'center center',
                }"
            >
                <div class="modal-send-images__actions-container">
                    <svg class="pointer" style="margin-right: 14px;" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.8131 0.646414C17.0463 0.743075 17.2582 0.884749 17.4366 1.06334C17.6152 1.24174 17.7569 1.45359 17.8535 1.68678C17.9502 1.91996 17.9999 2.16992 17.9999 2.42235C17.9999 2.67478 17.9502 2.92473 17.8535 3.15792C17.7569 3.39111 17.6152 3.60296 17.4366 3.78136L14.8673 6.34993L12.15 3.63264L14.7185 1.06334C14.8969 0.884749 15.1088 0.743075 15.342 0.646414C15.5752 0.549753 15.8251 0.5 16.0776 0.5C16.33 0.5 16.58 0.549753 16.8131 0.646414ZM0 16.9286C0.000173417 16.1166 0.322878 15.338 0.897133 14.7639L11.1108 4.55031L13.95 7.38941L3.73627 17.603C3.16218 18.1773 2.38351 18.5 1.57151 18.5001H0V16.9286Z" fill="#EDEDEF"/>
                    </svg>
                    <svg @click="del(imagesToSend[0].id)" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M21 10.5C21 16.299 16.299 21 10.5 21C4.70101 21 0 16.299 0 10.5C0 4.70101 4.70101 0 10.5 0C16.299 0 21 4.70101 21 10.5ZM10.6788 9.97131L13.4217 7.2284L14.1288 7.9355L11.3859 10.6784L14.1289 13.4214L13.4218 14.1285L10.6788 11.3855L7.93638 14.1279L7.22928 13.4208L9.9717 10.6784L7.22935 7.93607L7.93646 7.22897L10.6788 9.97131Z" fill="#EDEDEF"/>
                    </svg>
                </div>

            </div>
            <div class="modal-send-images__container" v-else>
                <div class="scroll" ref="container" @click.self="scrollTo">
                    <div class="scroll__bar" ref="scrollbar"></div>
                </div>
                <div class="modal-send-images__content" ref="content">
                    <div class="modal-send-images__image-container" v-for="image in imagesToSend" :key="image.id">
                        <div class="modal-send-images__image"
                             :style="{
                            'background': `url(${image.src}) no-repeat`,
                            'background-size': 'cover',
                            'background-position': 'center center',
                        }"
                        ></div>
                        <div class="modal-send-images__info">
                            <div class="modal-send-images__name">
                                {{image.name}}
                            </div>
                            <div class="modal-send-images__size">
                                {{conv_size(image.size)}}
                            </div>
                        </div>
                        <div class="modal-send-images__actions">
                            <svg class="pointer" style="margin-right: 14px;" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.8131 0.646414C17.0463 0.743075 17.2582 0.884749 17.4366 1.06334C17.6152 1.24174 17.7569 1.45359 17.8535 1.68678C17.9502 1.91996 17.9999 2.16992 17.9999 2.42235C17.9999 2.67478 17.9502 2.92473 17.8535 3.15792C17.7569 3.39111 17.6152 3.60296 17.4366 3.78136L14.8673 6.34993L12.15 3.63264L14.7185 1.06334C14.8969 0.884749 15.1088 0.743075 15.342 0.646414C15.5752 0.549753 15.8251 0.5 16.0776 0.5C16.33 0.5 16.58 0.549753 16.8131 0.646414ZM0 16.9286C0.000173417 16.1166 0.322878 15.338 0.897133 14.7639L11.1108 4.55031L13.95 7.38941L3.73627 17.603C3.16218 18.1773 2.38351 18.5 1.57151 18.5001H0V16.9286Z"
                                      fill="#9797BB"/>
                            </svg>
                            <svg @click="del(image.id)" class="pointer" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M21 10.5C21 16.299 16.299 21 10.5 21C4.70101 21 0 16.299 0 10.5C0 4.70101 4.70101 0 10.5 0C16.299 0 21 4.70101 21 10.5ZM10.6788 9.97131L13.4217 7.2284L14.1288 7.9355L11.3859 10.6784L14.1289 13.4214L13.4218 14.1285L10.6788 11.3855L7.93638 14.1279L7.22928 13.4208L9.9717 10.6784L7.22935 7.93607L7.93646 7.22897L10.6788 9.97131Z"
                                      fill="#9797BB"/>
                            </svg>

                        </div>
                    </div>
                </div>

            </div>
            <BaseModalText @click="add" class="base-modal-text_mt-29 base-modal-text_uppercase base-modal-text_hovered pointer">
                +Добавить фото
            </BaseModalText>
            <input type="file" style="display: none;" id="modal-send-images__input-file" @change="change">

            <div class="modal-send-images__buttons">
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
    import {useImages} from "../../composition/useImages";
    import {useModalsImages} from "../../composition/useModalsImages";
    import {useSocket} from "../../composition/useSocket";
    import {useDialogs} from "../../composition/useDialogs";
    import { useMessages } from "../../composition/useMessages";
    import {useCustomScroll} from "../../composition/useCustomScroll";
    import {onMounted} from "vue";

    export default {
        components: { BaseButton, BaseModalText, BaseModalHeader },
        setup() {
            const { toggleModalSendImages } = useModalsImages()
            const { socketSend } = useSocket()
            const { selectedDialog } = useDialogs()
            const { container, content, scrollbar, scrollTo, init } = useCustomScroll()
            const { imagesToSend, createImage, addImage, deleteImage } = useImages()
            const { addSendedMessage, getRandomInRange } = useMessages();
            const close = () => {
                toggleModalSendImages(false);
            }
            const add = () => {
                document.getElementById('modal-send-images__input-file').click();
            }
            const change = ($event) => {
                if ($event.target.files[0]) {
                    $event.target.files.forEach(item => {
                        let fr = new FileReader();
                        fr.addEventListener("load", function () {
                            createImage(item)
                                .then((r) => {
                                    if (r.status === 'ok') {
                                        addImage({
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
                deleteImage(id);
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
                        type: 'img',
                        is_sending:true,
                        request_uid:uidRandom,
                        img: imagesToSend.value[0]
                    });
                imagesToSend.value.forEach(image => {
                    socketSend('send_message', {
                        type: 'img',
                        data: image.id,
                        dialog_id: selectedDialog.value,
                        request_uid:uidRandom, 
                        message_uid : null
                    })
                })
                 toggleModalSendImages(false); 
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
                change,
                del,
                imagesToSend,
                conv_size,
            }
        }
    }
</script>

<style lang="scss">
    .modal-send-images {
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
    .modal-send-images__body {
        width: 364px;
        background: var(--modal-bg-color);
        border-radius: 9px;
        padding: 20px;
        text-align: left;
    }
    .modal-send-images__buttons {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 58px;
    }
    .modal-send-images__single-image {
        width: 100%;
        height: 191px;
        position: relative;
    }
    .modal-send-images__container {
        margin-top: 26px;
        height: 203px;
        width: 100%;
        position: relative;
        ::-webkit-scrollbar {
            display: none;
        }
    }
    .modal-send-images__content {
        height: 100%;
        width: 100%;
        overflow-y: auto;
    }
    .modal-send-images__image-container {
        width: 100%;
        display: flex;
        margin-bottom: 23px;
        &:last-of-type {
            margin-bottom: 0;
        }
    }
    .modal-send-images__image {
        border-radius: 7px;
        width: 90px;
        height: 90px;
    }
    .modal-send-images__info {
        margin-left: 14px;
    }
    .modal-send-images__name {
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
    .modal-send-images__size {
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
    .modal-send-images__actions {
        margin-left: auto;
    }

    .modal-send-images__actions-container {
        position: absolute;
        top: 9px;
        right: 16px;
        background: rgba(46, 46, 78, 0.45);
        border-radius: 15px;
        padding: 5.5px 10px;
    }
</style>