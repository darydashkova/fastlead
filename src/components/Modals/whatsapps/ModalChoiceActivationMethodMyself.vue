<template>
    <div class="modal-choice-activation-method-myself" @mousedown.self="close">
        <div class="modal-choice-activation-method-myself__body">
            <div class="modal-choice-activation-method-myself__header">
                Активация WhatsApp аккаунта у себя
            </div>
            <div class="modal-choice-activation-method-myself__qr"
                 :class="{
                    'modal-choice-activation-method-myself__qr_flex': !wasLoadedQR
                 }"
                :style="qrStyle"
            >
                <div class="modal-choice-activation-method-myself__error" v-if="error">
                    {{error}}
                </div>
                <BaseLoader class="base-loader_black" v-if="!wasLoadedQR"></BaseLoader>
            </div>
            <div class="modal-choice-activation-method-myself__container">
                <ol class="modal-choice-activation-method-myself__rules">
                    <li class="modal-choice-activation-method-myself__rule">Откройте WhatsApp на телефоне</li>
                    <li class="modal-choice-activation-method-myself__rule">Нажмите <span>Меню</span> или <span>Настройки</span> и выберете <span>WhatsApp Web</span></li>
                    <li class="modal-choice-activation-method-myself__rule">Наведите свой телефон на этот экран, чтобы считать код</li>
                </ol>
            </div>

        </div>
    </div>
</template>

<script>
    import BaseButton from '../../Base/BaseButton.vue'
    import BaseModalText from '../../Base/BaseModalText.vue'
    import BaseModalHeader from '../../Base/BaseModalHeader.vue'
    import BaseLoader from '../../Base/BaseLoader.vue'

    import { ref } from "vue";
    import {useWhatsapp} from "../../../composition/useWhatsapp";
    import {useModalsWhatsapps} from "../../../composition/useModalsWhatsapps";

    export default {
        components: { BaseButton, BaseModalText, BaseModalHeader, BaseLoader },
        setup() {
            const { toggleModalChoiceActivationMethodMyself, selectedWhatsappToAction, openedModalActivationMethodMyself, toggleModalChoiceActivationMethod, toggleModalChoiceActivationMethodSuccess } = useModalsWhatsapps()
            const { activateWhatsapp, getWhatsappQr } = useWhatsapp()
            const close = () => {
                toggleModalChoiceActivationMethodMyself(false);
            }
            const error = ref(null);
            const qrStyle = ref({});
            const wasLoadedQR = ref(false);
            activateWhatsapp(selectedWhatsappToAction.value.whatsapp_id)
                .then((r) => {
                    if (r.error) {
                        error.value = r.error;

                        return;
                    }
                    toggleModalChoiceActivationMethod(false);
                    toggleModalChoiceActivationMethodMyself(false);
                    toggleModalChoiceActivationMethodSuccess(true);
                })
            const getQr = (id) => {
                if (openedModalActivationMethodMyself.value) {
                    getWhatsappQr(id)
                        .then((r) => {
                            setTimeout(() => getQr(id), 2000)
                            if (r.error) {
                                return;
                            }
                            qrStyle.value['background'] = `url(data:image/png;base64,${r.img}) no-repeat`;
                            qrStyle.value['background-size'] = 'contain';
                            wasLoadedQR.value = true;
                        })
                }
            }
            getQr(selectedWhatsappToAction.value.whatsapp_id);
            //ToDo: сделать success и закрытие модалок
            return {
                close,
                error,

                qrStyle,
                wasLoadedQR,
            }
        }
    }
</script>

<style lang="scss">
    .modal-choice-activation-method-myself {
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
    .modal-choice-activation-method-myself__body {
        width: 364px;
        background: #F0F0FA;
        border-radius: 9px;
        padding: 20px 0;
        text-align: left;
    }
    .modal-choice-activation-method-myself__header {
        font-style: normal;
        font-weight: 600;
        font-size: 22px;
        line-height: 29px;

        color: #414159;
        padding: 0 20px;
    }
    .modal-choice-activation-method-myself__qr {
        width: 318px;
        height: 318px;
        margin: 24px auto 33px;
        &.modal-choice-activation-method-myself__qr_flex {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    .modal-choice-activation-method-myself__container {
        padding: 0 20px;
    }
    .modal-choice-activation-method-myself__rules {
        padding: 0 0 0 20px;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 140%;
        color: #9797BB;
    }
    .modal-choice-activation-method-myself__rule {
        span {
            color: #575773;
            font-weight: 600;
        }
    }
    .modal-choice-activation-method-myself__error {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 140%;
        color: var(--red-color);
    }
</style>