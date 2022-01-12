<template>
    <div class="modal-create-whatsapp" @mousedown.self="close">
        <div class="modal-create-whatsapp__body">
            <div class="modal-create-whatsapp__header">
                <div class="modal-create-whatsapp__header_cup">
                    <div class="modal-create-whatsapp__header_title">
                        Активация канала
                    </div>
                    <div class="modal-create-whatsapp__header_close pointer">
                        <img src="@/assets/close.svg" @click.self="close">
                    </div>
                </div>
                <div class="modal-create-whatsapp__header_subtitle">WhatsApp</div>
            </div>
            <div class="modal-create-whatsapp__input-group modal-create-whatsapp__input-group_padding-20">
                <div for-id="modal-create-whatsapp__input" class="modal-create-whatsapp__phone_title"  :class="{'base-modal-label_error': errors.name}">Имя</div>
                <input id="modal-create-whatsapp__input" type="text" class="modal-create-whatsapp__input" v-model="name" placeholder="Введите имя">
            </div>
            <div class="modal-create-whatsapp__input-group modal-create-whatsapp__input-group_padding-20" v-if="selectedWhatsappToAction == null">
                <div for-id="modal-create-whatsapp__input-phone" class="modal-create-whatsapp__phone_title" :class="{'base-modal-label_error': errors.phone}">Номер телефона</div>
                <input id="modal-create-whatsapp__input-phone"
                       type="text"
                       class="modal-create-whatsapp__input"
                       v-model="phone"
                       placeholder="+7 (123) 456-78-90"
                       v-maska="'+7 (###) ###-##-##'"
                >
            </div>
            <div class="modal-create-whatsapp__buttons">
                <div class="modal-create-whatsapp__buttons_accept pointer" @click="save">
                    Готово
                </div>
                <div class="modal-create-whatsapp__buttons_cancel pointer" @click.self="close">
                    Отмена
                </div>
            </div>
        </div>
    </div>
    <FullScreenLoader v-if="fullScreenLoader"></FullScreenLoader>
</template>

<script>
    import BaseButton from '../../Base/BaseButton.vue'
    import BaseModalLabel from '../../Base/BaseModalLabel.vue'
    import BaseModalHeader from '../../Base/BaseModalHeader.vue'
    import { onMounted, ref, reactive, computed } from "vue";
    import {useWhatsapp} from "../../../composition/useWhatsapp";
    import {useModalsWhatsapps} from "../../../composition/useModalsWhatsapps";

    import FullScreenLoader from "@/components/FullScreenLoader.vue"

    export default {
        components: { BaseButton, BaseModalLabel, BaseModalHeader, FullScreenLoader},
         setup() {
            const { toggleModalCreateWhatsapp, selectedWhatsappToAction, toggleModalChoiceActivationMethodMyself } = useModalsWhatsapps()
            const { createWhatsapp, getWhatsapps, updateWhatsapp, getWhatsappQr, whatsapps } = useWhatsapp();
            const phone = ref('');
            const name = ref('');
            const fullScreenLoader = ref(false)

            const errors = reactive({
                name: false,
                phone: false,
            })
            const close = () => {
                toggleModalCreateWhatsapp(false);
            }
            const onlyNumber = ($event) => {
                let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
                if (keyCode < 48 || keyCode > 57) { // 46 is dot
                    $event.preventDefault();
                }
            }
            const header = computed(() => {
                return selectedWhatsappToAction.value? 'Редактировать WhatsApp аккаунт' : 'Новый WhatsApp аккаунт'
            })
            onMounted(() => {
                if (selectedWhatsappToAction.value) {
                    phone.value = selectedWhatsappToAction.value.phone;
                    name.value = selectedWhatsappToAction.value.name;
                }
            })
            const save = () => {
                errors.name = false;
                errors.phone = false;
                errors.text = '';
                if (!phone.value) {
                    errors.phone = true;
                    return;

                }
                if (!name.value) {
                    errors.name = true;
                    return;
                }
                let infoToSend = {
                    phone: phone.value,
                    name: name.value,
                }
                if (selectedWhatsappToAction.value) {
                    infoToSend.whatsapp_id = selectedWhatsappToAction.value.whatsapp_id;
                    updateWhatsapp(infoToSend)
                        .then((r) => {
                            if (r.error) {

                                return;
                            }
                            getWhatsapps();
                            toggleModalCreateWhatsapp(false);
                        })
                } 
                else {
                    fullScreenLoader.value = true
                    createWhatsapp(infoToSend)
                        .then((r) => {
                            if (r.error) {
                                errors.text=r.error;
                                errors.phone=true;
                                return;
                                
                            } else {
                                getWhatsapps()
                                .then((l) => {
                                    fullScreenLoader.value = false
                                    for(i = 0; i < whatsapps.value.length; i++){
                                        if(whatsapps.value[i].whatsapp_id == r.whatsapp_id){
                                            selectedWhatsappToAction.value = whatsapps.value[i]
                                            toggleModalChoiceActivationMethodMyself(true)
                                            toggleModalCreateWhatsapp(false);
                                        }
                                    }
                                })
                            }
                        })
                }
            }
            return {
                name,
                phone,
                save,
                errors,
                close,
                onlyNumber,
                header,
                selectedWhatsappToAction,
                fullScreenLoader,
            }
        }
    }
</script>

<style lang="scss">
    .modal-create-whatsapp {
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
    .modal-create-whatsapp__header_cup{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .modal-create-whatsapp__body {
        width: 520px;
        background: #252544;
        border-radius: 9px;
        text-align: left;
    }
    .modal-create-whatsapp__header{
        padding: 27px 24px;
        border-bottom: 1px solid #1D1D35;
        &_title{
            color: #F0F0FA;
            font-size: 24px;
            font-weight: 700;
        }
        &_subtitle{
            color: #9797BB;
            font-size: 16px;
            font-weight: 400;
            padding-top: 16px;
        }
    }
    .modal-create-whatsapp__input-group {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 31px 0 29px;
        &.modal-create-whatsapp__input-group_padding-20 {
            padding: 0 20px;
        }
    }
    .modal-create-whatsapp__input {
        font-family: Segoe UI;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        margin-top: 6px;
        width: 100%;
        padding: 12px 10px;
        color: #F0F0FA;
        background: #1D1D35;
        box-sizing: border-box;
        border-radius: 3px;
        &::placeholder{
            color:#40406B;
        }
    }
    .modal-create-whatsapp__buttons {
        padding: 18px 20px;
        width: 100%;
        display: flex;
        border-top: 1px solid #1D1D35;
        align-items: center;
        &_accept{
            color: #252544;
            font-size: 16px;
            font-weight: 500;
            background: linear-gradient(45.66deg, #22A595 -40.44%, #84D160 120.07%);
            border-radius: 6px;
            padding: 8px 26px;
        }
        &_cancel{
            color: #5EC075;
            font-size: 16px;
            font-weight: 400;
            border: 1px solid #5EC075;
            border-radius: 6px;
            padding: 7px 26px;
            margin-left: 22px;
        }
    }
    .modal-create-whatsapp__phone_title{
        color: #CFCFE4;
        font-size: 14px;
        font-weight: 400;
    }
    .modal-create-whatsapp__input-phone-error{
      background: var(--red-color);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 14px;
      padding-top: 10px;  
    }
</style>