<template>
    <div class="settings-whatsapss">
        <div class="settings-whatsapps__header">
            <div>
                Созданные каналы
            </div>
            <BaseButton class="settings-whatsapps__header_enter" @click="create"><span class="settings-whatsapps__header_enter-svg">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.33333 3.33333H4.66667V0.666667C4.66667 0.489856 4.59643 0.320287 4.4714 0.195262C4.34638 0.070238 4.17681 0 4 0C3.82319 0 3.65362 0.070238 3.5286 0.195262C3.40357 0.320287 3.33333 0.489856 3.33333 0.666667V3.33333H0.666667C0.489856 3.33333 0.320287 3.40357 0.195262 3.5286C0.070238 3.65362 0 3.82319 0 4C0 4.17681 0.070238 4.34638 0.195262 4.4714C0.320287 4.59643 0.489856 4.66667 0.666667 4.66667H3.33333V7.33333C3.33333 7.51014 3.40357 7.67971 3.5286 7.80474C3.65362 7.92976 3.82319 8 4 8C4.17681 8 4.34638 7.92976 4.4714 7.80474C4.59643 7.67971 4.66667 7.51014 4.66667 7.33333V4.66667H7.33333C7.51014 4.66667 7.67971 4.59643 7.80474 4.4714C7.92976 4.34638 8 4.17681 8 4C8 3.82319 7.92976 3.65362 7.80474 3.5286C7.67971 3.40357 7.51014 3.33333 7.33333 3.33333Z" fill="#1D1D35"/>
            </svg></span>
            Добавить новый</BaseButton>
        </div>
        <div class="settings-whatsapps__scroll-container">
            <div class="scroll" ref="container" @click.self="scrollTo">
                <div class="scroll__bar" ref="scrollbar"></div>
            </div>
            <div class="settings-whatsapps__content" ref="content">
            <div class="element-noneWhats" v-if="!whatsapps[0]">У вас еще нет подключенных аккаунтов
                <div class="element-noneWhats__button pointer" @click="create">Подключить</div>
            </div>
                <div class="settings-whatsapps__element" v-for="whatsapp in whatsapps"
                     :key="whatsapp.whatsapp_id+'SettingsWhatsapp'">
                     
                    <div class="settings-whatsapp__element-header">
                        <img class="settings-whatsapp__profile_img" src="@/assets/profile-img.png">
                        <div class="settings-whatsapp__status_diactive" v-if="whatsapp.status_id != 1">Неактивный</div>
                        <div class="settings-whatsapp__status" v-else>Активный</div>
                    </div> 
                    <div class="settings-whatsapps__name">
                        <span>
                            {{whatsapp.name}}
                        </span>
                    </div>
                    <div class="settings-whatsapps__phone">
                        {{whatsapp.phone}}
                    </div>
                    <div class="settings-whatsapp__folder">{{whatsapp.default_folder.name}}</div>
                    <div class="settings-whatsapp__buttons-account">
                        <div class="settings-whatsapp__buttons-account_del pointer" @click="del(whatsapp)">
                            Удалить
                        </div>
                        <div    @click="edit(whatsapp)"
                                class="settings-whatsapp__buttons-account_eidt pointer"
                                v-if="whatsapp.status_id == 1 || whatsapp.is_active">Редактировать</div>

                        <div
                                @click="activate(whatsapp)"
                                class="settings-whatsapp__buttons-account_activate pointer"
                                v-else>Активировать</div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
    <FullScreenLoader v-if="fullScreenLoader"></FullScreenLoader>
</template>
<script>
    import BaseButton from '../../../components/Base/BaseButton.vue'
    import { useWhatsapp } from "../../../composition/useWhatsapp";
    import {useCustomScroll} from "../../../composition/useCustomScroll";
    import {onMounted} from "vue";
    import {useModalsWhatsapps} from "../../../composition/useModalsWhatsapps";
    import {useModalConfirmDelete} from "../../../composition/useModalConfirmDelete";
    import {useInstagramApi} from "@/composition/useInstagramApi"
    import FullScreenLoader from "@/components/FullScreenLoader.vue"
    import {ref} from 'vue'

    export default {
        components: { BaseButton, FullScreenLoader},
        setup() {
            const { whatsapps, getWhatsapps, deleteWhatsapps } = useWhatsapp()
            const { toggleModalCreateWhatsapp, selectedWhatsappToAction, toggleModalSyncWhatsapp, toggleModalChoiceActivationMethod,toggleModalChoiceActivationMethodMyself } = useModalsWhatsapps()
            const { container, content, scrollbar, scrollTo, init } = useCustomScroll()
            const { setSaveCallbackModalConfirmDelete, setTextModalConfirmDelete, toggleModalConfirmDelete } = useModalConfirmDelete()
            const {routerActiveLink} = useInstagramApi()

            routerActiveLink.value.link = "/settings/whatsapps"

            onMounted( () => {
                init();
            })
            getWhatsapps();
            const fullScreenLoader = ref(false)
            const del = (whatsapp) => {
                let callback = () => deleteWhatsapps([whatsapp.whatsapp_id])
                    .then(() => {
                        fullScreenLoader.value = true
                        getWhatsapps()
                        .then(() => {
                            fullScreenLoader.value = false
                        })
                    })
                setTextModalConfirmDelete(`Вы точно хотите удалить whatsapp "${whatsapp.name}"?`)
                setSaveCallbackModalConfirmDelete(callback);
                toggleModalConfirmDelete(true);
            }
            const edit = (whatsapp) => {
                selectedWhatsappToAction.value = whatsapp;
                toggleModalCreateWhatsapp(true);
            }
            const sync = (whatsapp) => {
                selectedWhatsappToAction.value = whatsapp;
                toggleModalSyncWhatsapp(true);
            }
            const activate = (whatsapp) => {
                selectedWhatsappToAction.value = whatsapp;
                toggleModalChoiceActivationMethodMyself(true);
            }
            const create = () => {
                selectedWhatsappToAction.value = null;
                toggleModalCreateWhatsapp(true);
              
            }
            return {
                whatsapps,
                toggleModalCreateWhatsapp,
                del,
                edit,
                sync,
                create,
                activate,

                container,
                content,
                scrollbar,
                scrollTo,

                routerActiveLink,
                fullScreenLoader,
            }
        }
    }
</script>

<style lang="scss" src="./whatsapps.scss"></style>