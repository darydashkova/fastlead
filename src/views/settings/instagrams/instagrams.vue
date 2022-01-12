<template>
    <div class="settings-instagrams">
        <div class="settings-instagrams__header">
            <div>
                Созданные каналы
            </div>
            <BaseButton class="settings-instagrams__header_enter" @click="create"><span class="settings-instagrams__header_enter-svg">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.33333 3.33333H4.66667V0.666667C4.66667 0.489856 4.59643 0.320287 4.4714 0.195262C4.34638 0.070238 4.17681 0 4 0C3.82319 0 3.65362 0.070238 3.5286 0.195262C3.40357 0.320287 3.33333 0.489856 3.33333 0.666667V3.33333H0.666667C0.489856 3.33333 0.320287 3.40357 0.195262 3.5286C0.070238 3.65362 0 3.82319 0 4C0 4.17681 0.070238 4.34638 0.195262 4.4714C0.320287 4.59643 0.489856 4.66667 0.666667 4.66667H3.33333V7.33333C3.33333 7.51014 3.40357 7.67971 3.5286 7.80474C3.65362 7.92976 3.82319 8 4 8C4.17681 8 4.34638 7.92976 4.4714 7.80474C4.59643 7.67971 4.66667 7.51014 4.66667 7.33333V4.66667H7.33333C7.51014 4.66667 7.67971 4.59643 7.80474 4.4714C7.92976 4.34638 8 4.17681 8 4C8 3.82319 7.92976 3.65362 7.80474 3.5286C7.67971 3.40357 7.51014 3.33333 7.33333 3.33333Z" fill="#1D1D35"/>
            </svg></span>
            Добавить новый</BaseButton>
        </div>
        <div class="settings-instagrams__scroll-container">
            <div class="scroll" ref="container" @click.self="scrollTo">
                <div class="scroll__bar" ref="scrollbar"></div>
            </div>
            <div class="settings-instagrams__content" ref="content">
                <div class="element-none" v-if="!instagrams[0]">У вас еще нет подключенных аккаунтов
                    <div class="element-none__button pointer" @click="create">Подключить</div>
                </div>
                <div class="settings-instagrams__element" v-for="instagram in instagrams"
                     :key="instagram.instagram_id+'SettingsWhatsapp'">
                    <div class="settings-instagrams__header-element">
                        <img src="@/assets/profile-img.png" class="settings-instagrams__header-element_img">
                        <div class="settings-instagrams__header-element_status" v-if="instagram.status_id == 1">Активный</div>
                        <div class="settings-instagrams__header-element_status-error" v-else-if="instagram.status_id == 4">Отключен</div>
                        <div class="settings-instagrams__header-element_status-error" v-else>Неактивный</div>
                    </div>
                    <div class="settings-instagrams__name">
                        <span>
                            {{instagram.login}}
                        </span>
                    </div>
                    <div class="settings-instagrams__folder">{{instagram.default_folder.name}}</div>
                    <div class="settings-instagram__buttons">
                        <div class="settings-instagram__buttons_del pointer" @click="del(instagram)">Удалить</div>
                        <div @click="edit(instagram)" class="settings-instagram__buttons_active pointer" v-if="instagram.status_id == 1">Редактировать</div>
                        <div class="settings-instagram__buttons_disable pointer" v-else-if="instagram.status_id == 4">Активировать</div>
                        <div @click="activateInstagramAccount(instagram.instagram_id, instagram)" class="settings-instagram__buttons_active pointer" v-else>Активировать</div>
                    </div>    
                </div>
            </div>
        </div>
        <teleport to="body">
            <ModalCreateInstagram
                    v-if="openedModal"
                    :selectedInstagram="selectedInstagram"
                    @close="toggleModal"
                    :succes="succes"
                    @twoFactorModal="twoFactorModal"
            ></ModalCreateInstagram>
            <ModalCreateInstagramCode
            v-if="modalFactorOpen"
                    @close="twoFactorModal"
                    :index="instagramIndex"
                    :instagramId="accountInstagramId"
                    @succesInstagram="succesInstagram"
                    >
                
            </ModalCreateInstagramCode>
        </teleport>
    </div>
</template>
<script>
    import BaseButton from '../../../components/Base/BaseButton.vue'
    import { useCustomScroll } from "../../../composition/useCustomScroll";
    import { onMounted, ref } from "vue";
    import { useModalConfirmDelete } from "../../../composition/useModalConfirmDelete";
    import ModalCreateInstagram from "../../../components/Modals/instagrams/ModalCreateInstagram";
    import ModalCreateInstagramCode from "../../../components/Modals/instagrams/ModalCreateInstagramCode";
    import { useInstagram } from "../../../composition/useInstagrams";
    import {useInstagramApi} from "@/composition/useInstagramApi"
    export default {
        components: {ModalCreateInstagram, BaseButton, ModalCreateInstagramCode },
        setup(props, {emit}) {
            const { instagrams, getInstagrams, deleteInstagrams, activateInstagram, twoFactorInstagram } = useInstagram()
            const {routerActiveLink} = useInstagramApi()
            const { container, content, scrollbar, scrollTo, init } = useCustomScroll()
            const { setSaveCallbackModalConfirmDelete, setTextModalConfirmDelete, toggleModalConfirmDelete } = useModalConfirmDelete()

            routerActiveLink.value.link = "/settings/instagrams"

            onMounted( () => {
                init();
            })
            getInstagrams();
            const openedModal = ref(false);
            const toggleModal = boolean => {
                openedModal.value = boolean
            }
            const selectedInstagram = ref(null);

            const del = (instagram) => {
                let callback = () => deleteInstagrams([instagram.instagram_id])
                    .then(() => {
                        getInstagrams();
                    })
                setTextModalConfirmDelete(`Вы точно хотите удалить instagram "${instagram.login}"?`)
                setSaveCallbackModalConfirmDelete(callback);

                toggleModalConfirmDelete(true);

            }
            const modalFactorOpen = ref(false)
            const instagramIndex = ref(null)
            const twoFactorModal = (item, index) => {
            modalFactorOpen.value = item;
            instagramIndex.value = index
            }
            const edit = (inst) => {
                selectedInstagram.value = inst;
                toggleModal(true);
            }
            const create = () => {
                selectedInstagram.value = null;
                toggleModal(true);
            }
            const succes = ref(false)
            const succesInstagram = (item) => {
                modalFactorOpen.value = false;
            succes.value = item
            }

            const accountInstagramId = ref(null)

            const activateInstagramAccount = (id, instagram) => {
                activateInstagram({instagram_id : id})
                .then((r) => {
                    if(r.two_factor == true){
                        modalFactorOpen.value = true
                        instagramIndex.value = id
                    } else {
                        edit(instagram)
                    }
                })
            }
            return {
                instagrams,

                routerActiveLink,
                modalFactorOpen,
                del,
                edit,
                create,
                selectedInstagram,
                openedModal,
                toggleModal,

                container,
                content,
                scrollbar,
                scrollTo,
                twoFactorModal,
                instagramIndex,
                succes,
                succesInstagram,
                activateInstagramAccount,

                accountInstagramId,
            }
        }
    }
</script>

<style lang="scss" src="./instagrams.scss"></style>