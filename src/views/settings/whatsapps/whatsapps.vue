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
                        Whatsapp {{whatsapp.whatsapp_id}}
                    </div>
                    <div class="settings-whatsapps__phone">
                        {{whatsapp.phone}}
                    </div>
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
                        <div class="settings-whatsapps__action settings-whatsapps__action_default pointer"
                             @click="sync(whatsapp)"
                        >
                            <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.5982 3.53311C12.366 3.34888 12.0339 3.3861 11.8308 3.60205L11.7351 3.70385C11.4783 3.97685 11.5336 4.41494 11.8232 4.65275C13.4722 6.00679 14.3811 8.15499 14.024 10.3901C13.7623 12.0284 12.8678 13.4684 11.5059 14.4447C10.3309 15.287 8.9288 15.6973 7.49693 15.6279C7.47714 15.627 7.46778 15.6032 7.48156 15.5889L7.69013 15.3735C7.69213 15.3714 7.69075 15.3681 7.68787 15.3682V15.3682C7.68499 15.3684 7.6836 15.3651 7.68561 15.363L8.32695 14.7007C8.48991 14.5324 8.48354 14.2632 8.3128 14.1028L8.18148 13.9794C7.9436 13.756 7.57037 13.7649 7.34341 13.9994L5.88281 15.5089L5.49954 15.9045C5.26645 16.1451 5.27554 16.53 5.51973 16.7593L5.94584 17.1595L7.49194 18.6094C7.72311 18.8262 8.08544 18.8175 8.30588 18.5898V18.5898C8.53135 18.3569 8.52237 17.9845 8.28595 17.7628L7.64295 17.1597C7.57517 17.0961 7.62329 16.9811 7.71622 16.9822C9.36061 17.0021 10.9599 16.5046 12.3127 15.5349C13.9708 14.3467 15.0594 12.5937 15.3782 10.5994C15.8193 7.83324 14.6692 5.17597 12.5982 3.53311Z"
                                      fill="var(--settings-whatsapp-default-icon-fill)"/>
                                <path d="M1.81306 8.60993C2.06573 6.97166 2.92935 5.53165 4.24429 4.55538C5.37851 3.71329 6.7319 3.30296 8.11404 3.37209C8.13379 3.37308 8.14329 3.39668 8.12979 3.41112L7.92832 3.62671C7.92639 3.62877 7.92776 3.63196 7.93059 3.63183V3.63183C7.93341 3.6317 7.93479 3.63489 7.93286 3.63696L7.31166 4.30143C7.15376 4.47035 7.16001 4.73455 7.32573 4.8958L7.43927 5.00628C7.67468 5.23534 8.05231 5.22634 8.27654 4.98633L9.67337 3.49122L10.0509 3.08762C10.2741 2.84896 10.2653 2.47554 10.031 2.24768L9.61251 1.84059L8.13479 0.40531C7.90563 0.182727 7.5384 0.191587 7.32023 0.424963V0.424963C7.10789 0.65211 7.11646 1.00744 7.33949 1.22409L7.97506 1.84146C8.04116 1.90567 7.9925 2.01895 7.90036 2.01784C6.31371 1.99864 4.77068 2.49612 3.46533 3.46515C1.86443 4.65339 0.813409 6.40631 0.50562 8.40065C0.0807094 11.1564 1.18124 13.804 3.16632 15.4483C3.4006 15.6423 3.74312 15.6038 3.94762 15.3786L4.03098 15.2868C4.27736 15.0155 4.22314 14.5897 3.94369 14.3526C2.34811 12.9986 1.46783 10.8479 1.81306 8.60993Z"
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
            </div>
        </div>
    </div>
</template>
<script>
    import BaseButton from '../../../components/Base/BaseButton.vue'
    import { useWhatsapp } from "../../../composition/useWhatsapp";
    import {useModals} from "../../../composition/useModals";
    import {useCustomScroll} from "../../../composition/useCustomScroll";
    import {onMounted} from "vue";
    export default {
        components: { BaseButton },
        setup() {
            const { whatsapps, getWhatsapps, deleteWhatsapps } = useWhatsapp()
            const { toggleModalCreateWhatsapp, selectedWhatsappToAction, toggleModalSyncWhatsapp } = useModals()
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

                container,
                content,
                scrollbar,
                scrollTo,
            }
        }
    }
</script>

<style lang="scss" src="./whatsapps.scss"></style>