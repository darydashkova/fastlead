<template>
    <div class="modal-sync-whatsapp" @mousedown.self="close">
        <div class="modal-sync-whatsapp__body">
            <BaseModalHeader>
                Синхронизировать
            </BaseModalHeader>
            <BaseModalHint class="base-modal-hint_padding-20 base-modal-hint_mt">
                Все диалоги из WhatsApp аккаунта будут загружены, вы хотите продолжить?
            </BaseModalHint>
            <div class="modal-sync-whatsapp__buttons">
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
    </div>
</template>

<script>
    import BaseButton from '../Base/BaseButton.vue'
    import BaseModalHint from '../Base/BaseModalHint.vue'
    import BaseModalHeader from '../Base/BaseModalHeader.vue'

    import { useModals } from "../../composition/useModals";
    import {useWhatsapp} from "../../composition/useWhatsapp";

    export default {
        components: { BaseButton, BaseModalHint, BaseModalHeader },
        setup() {
            const { toggleModalSyncWhatsapp, selectedWhatsappToAction } = useModals();

            const { syncWhatsapp, getWhatsapps } = useWhatsapp();

            const close = () => {
                toggleModalSyncWhatsapp(false);
            }

            const save = () => {
                syncWhatsapp(selectedWhatsappToAction.value.whatsapp_id)
                    .then((r) => {
                        if (r.error) {

                            return;
                        }
                        getWhatsapps();
                        toggleModalSyncWhatsapp(false);
                    })

            }
            return {
                save,
                close,
            }
        }
    }
</script>

<style lang="scss">
    .modal-sync-whatsapp {
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
    .modal-sync-whatsapp__body {
        width: 364px;
        background: var(--create-folder-color);
        border-radius: 9px;
        padding: 20px 0;
        text-align: left;
    }
    .modal-sync-whatsapp__buttons {
        padding: 0 20px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 58px;
    }
</style>