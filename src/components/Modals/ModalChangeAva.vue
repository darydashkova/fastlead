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
                <label v-if="isDeleting" for="add-photo-ava" class="modal-change-ava__file">
                    <svg width="78" height="63" viewBox="0 0 78 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.262695 19.1167V53.0774C0.262695 58.2611 4.47245 62.4708 9.65609 62.4708H67.8386C73.0223 62.4708 77.232 58.2611 77.232 53.0774V19.1167C77.232 14.1843 73.2265 10.1788 68.2941 10.1788H55.7906L55.4921 8.87503C54.2826 3.64426 49.6801 0 44.308 0H33.171C27.8146 0 23.2121 3.64426 21.9869 8.87503L21.6884 10.1788H9.20056C4.26824 10.1788 0.262695 14.2001 0.262695 19.1167ZM23.2278 14.0273C24.1232 14.0273 24.8929 13.4146 25.0971 12.535L25.7411 9.73897C26.5579 6.2675 29.6053 3.84847 33.171 3.84847H44.308C47.8737 3.84847 50.9211 6.2675 51.7379 9.73897L52.3819 12.535C52.5861 13.3989 53.3558 14.0273 54.2512 14.0273H68.2784C71.0902 14.0273 73.3678 16.3049 73.3678 19.1167V53.0774C73.3678 56.1405 70.886 58.6223 67.8229 58.6223H9.65609C6.59303 58.6223 4.11116 56.1405 4.11116 53.0774V19.1167C4.11116 16.3049 6.38882 14.0273 9.20056 14.0273H23.2278Z" fill="#EDEDEF"/>
                        <path d="M13.2849 24.8182C14.7076 24.8182 15.861 23.6649 15.861 22.2421C15.861 20.8194 14.7076 19.666 13.2849 19.666C11.8621 19.666 10.7087 20.8194 10.7087 22.2421C10.7087 23.6649 11.8621 24.8182 13.2849 24.8182Z" fill="#EDEDEF"/>
                        <path d="M38.7475 52.5908C47.654 52.5908 54.9111 45.3337 54.9111 36.4272C54.9111 27.5208 47.654 20.2637 38.7475 20.2637C29.8411 20.2637 22.584 27.5051 22.584 36.4272C22.584 45.3494 29.8411 52.5908 38.7475 52.5908ZM38.7475 24.1121C45.5334 24.1121 51.0626 29.6414 51.0626 36.4272C51.0626 43.2131 45.5334 48.7423 38.7475 48.7423C31.9617 48.7423 26.4324 43.2131 26.4324 36.4272C26.4324 29.6414 31.9617 24.1121 38.7475 24.1121Z" fill="#EDEDEF"/>
                    </svg>
                    <span>ЗАГРУЗИТЬ</span>
                </label>
                <input @change="changePhoto" type="file" id="add-photo-ava" style="display: none">
            </div>
            <div class="modal-change-ava__delete pointer" @click="isDeleting = true">
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

    export default {
        components: { BaseButton, BaseModalText, BaseModalHeader },
        setup() {
            const { toggleModalChangeAva } = useModals();
            const { user, getUser } = useUser();
            const { changeAva } = useAccount();

            const close = () => {
                toggleModalChangeAva(false);
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
                if (photoUrl.value === user.value.avatar) {
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
                photoUrl.value = user.value.avatar;
            })

            return {
                save,
                close,
                isDeleting,
                photoUrl,
                changePhoto,
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
        background: var(--create-folder-color);
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
    }
    .modal-change-ava__delete {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        color: #EB5757;
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
        span {
            margin-top: 16px;
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 21px;
            text-transform: uppercase;
            color: #EDEDEF;
        }

    }
</style>