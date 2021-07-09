<template>
    <div class="modal-change-ava" @mousedown.self="close">
        <div class="modal-change-ava__body">
            <BaseModalHeader>
                Портрет профиля
            </BaseModalHeader>
            <BaseModalText class="base-modal-text_padding-20 base-modal-text_mt-45">
                Портрет
            </BaseModalText>
            <div class="modal-change-ava__container"
                :style="{
                    'background': `url(${photoUrl}) no-repeat`,
                    'background-size': 'contain',
                    'background-position': 'center center',
                }"
            >
                <label for="add-photo-ava" class="modal-change-ava__file">
                    <svg width="78" height="63" viewBox="0 0 78 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.262695 19.1167V53.0774C0.262695 58.2611 4.47245 62.4708 9.65609 62.4708H67.8386C73.0223 62.4708 77.232 58.2611 77.232 53.0774V19.1167C77.232 14.1843 73.2265 10.1788 68.2941 10.1788H55.7906L55.4921 8.87503C54.2826 3.64426 49.6801 0 44.308 0H33.171C27.8146 0 23.2121 3.64426 21.9869 8.87503L21.6884 10.1788H9.20056C4.26824 10.1788 0.262695 14.2001 0.262695 19.1167ZM23.2278 14.0273C24.1232 14.0273 24.8929 13.4146 25.0971 12.535L25.7411 9.73897C26.5579 6.2675 29.6053 3.84847 33.171 3.84847H44.308C47.8737 3.84847 50.9211 6.2675 51.7379 9.73897L52.3819 12.535C52.5861 13.3989 53.3558 14.0273 54.2512 14.0273H68.2784C71.0902 14.0273 73.3678 16.3049 73.3678 19.1167V53.0774C73.3678 56.1405 70.886 58.6223 67.8229 58.6223H9.65609C6.59303 58.6223 4.11116 56.1405 4.11116 53.0774V19.1167C4.11116 16.3049 6.38882 14.0273 9.20056 14.0273H23.2278ZM13.2849 24.8185C14.7077 24.8185 15.861 23.6651 15.861 22.2424C15.861 20.8196 14.7077 19.6663 13.2849 19.6663C11.8622 19.6663 10.7088 20.8196 10.7088 22.2424C10.7088 23.6651 11.8622 24.8185 13.2849 24.8185ZM54.9112 36.4265C54.9112 45.3329 47.6541 52.5901 38.7476 52.5901C29.8412 52.5901 22.5841 45.3487 22.5841 36.4265C22.5841 27.5043 29.8412 20.2629 38.7476 20.2629C47.6541 20.2629 54.9112 27.52 54.9112 36.4265ZM51.0627 36.4265C51.0627 29.6406 45.5335 24.1114 38.7476 24.1114C31.9618 24.1114 26.4326 29.6406 26.4326 36.4265C26.4326 43.2124 31.9618 48.7416 38.7476 48.7416C45.5335 48.7416 51.0627 43.2124 51.0627 36.4265Z" fill="#F0F0FA"/>
                    </svg>
                    <span>ЗАГРУЗИТЬ</span>
                </label>
                <input @change="changePhoto"
                       type="file"
                       id="add-photo-ava"
                       style="display: none"
                       accept="image/*"
                >
            </div>
            <div class="modal-change-ava__delete pointer" @click="del">
                Удалить
            </div>
            <div class="modal-change-ava__buttons">
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
    import BaseModalText from '../Base/BaseModalText.vue'
    import BaseModalHeader from '../Base/BaseModalHeader.vue'
    import { ref, onMounted } from 'vue';
    import { useModals } from "../../composition/useModals";
    import { useUser } from "../../composition/useUser";
    import {useAccount} from "../../composition/useAccount";
    import {useImages} from "../../composition/useImages";

    export default {
        components: { BaseButton, BaseModalText, BaseModalHeader },
        setup() {
            const { toggleModalChangeAva } = useModals();
            const { user, getUser } = useUser();
            const { changeAva } = useAccount();
            const { getImage } = useImages()

            const close = () => {
                toggleModalChangeAva(false);
            }
            const del = () => {
                photoUrl.value = '/img/icon_inactive.png';
            }

            const isDeleting = ref(false);

            const changePhoto = ($event) => {
                if ($event.target.files[0]) {
                    photo.value = $event.target.files[0]
                    let fr = new FileReader();
                    fr.addEventListener("load",  () => {
                        photoUrl.value = fr.result;
                        isDeleting.value = false;
                    }, false);
                    fr.readAsDataURL($event.target.files[0]);
                }
            }
            const photoUrl = ref(null);
            const photo = ref(null);

            const save = async () => {
                let afterSave = () => {
                    close();
                }
                if (photoUrl.value === user.value.avatar || photoUrl.value === '/img/icon_inactive.png') {
                    afterSave()
                } else {
                    changeAva(photo.value)
                        .then(() => {
                            getUser(true);
                            afterSave();
                        })
                }
            }

            onMounted(() => {
                getImage(user.value.avatar)
                    .then(r => {
                        let url = URL.createObjectURL(r);
                        photoUrl.value = `${url}`;
                    })
            })

            return {
                save,
                close,
                isDeleting,
                photoUrl,
                changePhoto,
                del,
            }
        }
    }
</script>

<style lang="scss">
    .modal-change-ava {
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
    .modal-change-ava__body {
        width: 364px;
        background: var(--modal-bg-color);
        border-radius: 9px;
        padding: 20px 0;
        text-align: left;
    }
    .modal-change-ava__buttons {
        padding: 0 20px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 58px;
    }
    .modal-change-ava__container {
        margin: 9px auto 16px;
        width: 317px;
        height: 317px;
        border-radius: 6px;
        background: black;

        &:hover {
            .modal-change-ava__file {
                opacity: 1;
            }
        }
    }
    .modal-change-ava__delete {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        color: var(--red-color);
        text-decoration: underline;
        padding: 0 20px;
    }
    .modal-change-ava__file {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        border-radius: 6px;
        background: var(--empty-photo-bg);
        cursor: pointer;
        opacity: 0;
        transition: .2s ease;
        span {
            margin-top: 16px;
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 21px;
            text-transform: uppercase;
            color: #F0F0FA;
        }

    }
</style>