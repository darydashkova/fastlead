<template>
    <div class="modal-create-whatsapp" @mousedown.self="close">
        <div class="modal-create-whatsapp__body">
            <BaseModalHeader>
                {{header}}
            </BaseModalHeader>
            <div class="modal-create-whatsapp__input-group modal-create-whatsapp__input-group_padding-20">
                <BaseModalLabel for-id="modal-create-whatsapp__input" :class="{'base-modal-label_error': errors.name}">Имя</BaseModalLabel>
                <input id="modal-create-whatsapp__input" type="text" class="modal-create-whatsapp__input" v-model="name">
            </div>
            <div class="modal-create-whatsapp__input-group modal-create-whatsapp__input-group_padding-20">
                <BaseModalLabel for-id="modal-create-whatsapp__input-phone" :class="{'base-modal-label_error': errors.phone}">Номер телефона</BaseModalLabel>
                <input id="modal-create-whatsapp__input-phone"
                       type="text"
                       class="modal-create-whatsapp__input"
                       v-model="phone"
                       v-maska="'+7##########'"
                >
            </div>
            <div class="modal-create-whatsapp__buttons">
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
    import BaseModalLabel from '../Base/BaseModalLabel.vue'
    import BaseModalHeader from '../Base/BaseModalHeader.vue'

    import { onMounted, ref, reactive, computed } from "vue";
    import {useWhatsapp} from "../../composition/useWhatsapp";
    import {useModalsWhatsapps} from "../../composition/useModalsWhatsapps";

    export default {
        components: { BaseButton, BaseModalLabel, BaseModalHeader },
        setup() {
            const { toggleModalCreateWhatsapp, selectedWhatsappToAction } = useModalsWhatsapps()

            const { createWhatsapp, getWhatsapps, updateWhatsapp } = useWhatsapp();


            const phone = ref('');
            const name = ref('');
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
                }
            })

            const save = () => {
                errors.name = false;
                errors.phone = false;
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
                } else {
                    createWhatsapp(infoToSend)
                        .then((r) => {
                            if (r.error) {

                                return;
                            }
                            getWhatsapps();
                            toggleModalCreateWhatsapp(false);
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
    .modal-create-whatsapp__body {
        width: 364px;
        background: var(--create-folder-color);
        border-radius: 9px;
        padding: 20px 0;
        text-align: left;
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
        color: var(--create-folder-header-color);
        width: 100%;
        border-bottom: 1px solid var(--separator-color);
        padding: 2px;
        background: transparent;
    }
    .modal-create-whatsapp__buttons {
        padding: 0 20px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 44px;
    }
</style>