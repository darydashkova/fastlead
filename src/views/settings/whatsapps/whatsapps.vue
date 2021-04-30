<template>
    <div class="settings-whatsapss">
        <div class="settings-whatsapps__header">
            <div>
                WhatsApp аккаунты
            </div>
            <BaseButton class="base-button_enter base-button_p5-15" @click="create">Добавить новый</BaseButton>
        </div>
        <div class="settings-whatsapps__scroll-container">
            <div class="scroll" ref="container" @click.self="scrollTo">
                <div class="scroll__bar" ref="scrollbar"></div>
            </div>
            <div class="settings-whatsapps__content" ref="content">
                <div class="settings-whatsapps__element" v-for="whatsapp in whatsapps"
                     :key="whatsapp.whatsapp_id+'SettingsWhatsapp'">

                    <div class="settings-whatsapps__name">
                        <span>
                            Whatsapp {{whatsapp.whatsapp_id}}
                        </span>
                        <div class="settings-whatsapps__action-container">
                            <div class="settings-whatsapps__action settings-whatsapps__action_default pointer"
                                 @click="edit(whatsapp)"
                            >
                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.8324 10.0358C15.474 10.0358 15.1835 10.3263 15.1835 10.6846V15.7023H1.29774V1.81721H6.31566C6.67406 1.81721 6.96452 1.52676 6.96452 1.16837C6.96452 0.809985 6.67406 0.519531 6.31566 0.519531H0.648868C0.290467 0.519531 0 0.809985 0 1.16837V16.3512C0 16.7096 0.2905 17 0.648868 17H15.8324C16.1908 17 16.4812 16.7096 16.4812 16.3512V10.6846C16.4813 10.3263 16.1908 10.0358 15.8324 10.0358Z"
                                          fill="var(--settings-whatsapp-default-icon-fill)"/>
                                    <path d="M16.81 2.50431L14.496 0.190116C14.3744 0.0683303 14.2094 0 14.0372 0C13.8651 0 13.7002 0.0683303 13.5785 0.190116L5.92183 7.84639C5.8431 7.92492 5.78622 8.02223 5.75594 8.12908L4.84752 11.3517C4.78393 11.5777 4.84732 11.8203 5.01341 11.9865C5.13669 12.1097 5.30238 12.1766 5.47215 12.1766C5.53075 12.1766 5.59002 12.1686 5.648 12.1523L8.87072 11.2439C8.97777 11.2137 9.07512 11.1566 9.15362 11.0781L16.81 3.42179C17.0635 3.16849 17.0635 2.75755 16.81 2.50431ZM8.35593 10.0408L6.41085 10.5888L6.95915 8.64425L14.0372 1.56652L15.4338 2.96304L8.35593 10.0408Z"
                                          fill="var(--settings-whatsapp-default-icon-fill)"/>
                                    <path d="M6.86001 7.8246L5.94238 8.74219L8.25632 11.056L9.17395 10.1384L6.86001 7.8246Z"
                                          fill="var(--settings-whatsapp-default-icon-fill)"/>
                                </svg>
                            </div>
                            <div class="settings-whatsapps__action settings-whatsapps__action_del pointer"
                                 @click="del(whatsapp.whatsapp_id)"
                            >
                                <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.6902 1.70525H10.3163V0.554359C10.3163 0.248227 10.0405 0 9.7003 0H5.18866C4.84852 0 4.57271 0.248193 4.57271 0.554359V1.70525H1.19872C0.858571 1.70525 0.582764 1.95344 0.582764 2.25961V3.96482C0.582764 4.27095 0.858534 4.51918 1.19872 4.51918H1.38584L1.94881 16.4692C1.96276 16.7659 2.23418 17 2.56418 17H12.3247C12.6548 17 12.9261 16.7659 12.9401 16.4691L13.503 4.51914H13.6902C14.0303 4.51914 14.3061 4.27095 14.3061 3.96479V2.25961C14.3062 1.95341 14.0304 1.70525 13.6902 1.70525ZM5.80462 1.10869H9.08435V1.70525H5.80462V1.10869ZM11.7344 15.8913H3.15457L2.61882 4.51918H12.2701L11.7344 15.8913ZM13.0743 3.41046C12.5146 3.41046 2.14995 3.41046 1.81467 3.41046V2.81393H13.0743V3.41046Z"
                                          fill="var(--settings-whatsapp-del-icon-fill)"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="settings-whatsapps__phone">
                        {{whatsapp.phone}}
                    </div>
                    <div class="settings-whatsapps__phone"
                        :class="{
                            'settings-whatsapps__phone_active': whatsapp.status_id === 1,
                            'settings-whatsapps__phone_warning': whatsapp.status_id === 2,
                            'settings-whatsapps__phone_error': whatsapp.status_id === 3,
                        }"
                    >
                        {{whatsapp.status}}
                    </div>
                    <BaseButton
                            @click="sync(whatsapp)"
                            class="base-button_cancel base-button_p5-15 base-button_w-100"
                            v-if="whatsapp.is_active">Синхронизировать</BaseButton>
                    <BaseButton
                            @click="activate(whatsapp)"
                            class="base-button_cancel base-button_p5-15 base-button_w-100"
                            v-else>Активировать</BaseButton>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import BaseButton from '../../../components/Base/BaseButton.vue'
    import { useWhatsapp } from "../../../composition/useWhatsapp";
    import {useCustomScroll} from "../../../composition/useCustomScroll";
    import {onMounted} from "vue";
    import {useModalsWhatsapps} from "../../../composition/useModalsWhatsapps";
    export default {
        components: { BaseButton },
        setup() {
            const { whatsapps, getWhatsapps, deleteWhatsapps } = useWhatsapp()
            const { toggleModalCreateWhatsapp, selectedWhatsappToAction, toggleModalSyncWhatsapp, toggleModalChoiceActivationMethod } = useModalsWhatsapps()
            const { container, content, scrollbar, scrollTo, init } = useCustomScroll()
            onMounted( () => {
                init();
            })
            getWhatsapps();

            const del = (id) => {
                deleteWhatsapps([id])
                    .then(() => {
                        getWhatsapps();
                    })
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
                toggleModalChoiceActivationMethod(true);
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
            }
        }
    }
</script>

<style lang="scss" src="./whatsapps.scss"></style>