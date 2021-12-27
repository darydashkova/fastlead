<template>
    <div class="modal-confirm-delete" @mousedown.self="close">
        <div class="modal-confirm-delete__body">
            <BaseModalHeader>
                Подтверждение действия
            </BaseModalHeader>
            <BaseModalText class="base-modal-text_padding-20 base-modal-text_default base-modal-text_mt-10">
                {{textCallbackModalConfirmDelete}}
            </BaseModalText>
            <div class="modal-confirm-delete__buttons">
                <BaseButton
                        class="base-button_enter"
                        @click="save"
                >
                    Удалить
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

    import {useModalConfirmDelete} from "../../composition/useModalConfirmDelete";

    import {useFolder} from "@/composition/useFolder";

    export default {
        components: { BaseButton, BaseModalText, BaseModalHeader },
        setup() {
            const { toggleModalConfirmDelete, textCallbackModalConfirmDelete, onSaveCallbackModalConfirmDelete } = useModalConfirmDelete()

            const {getAllFolders} = useFolder();


            const close = () => {
                getAllFolders()
                toggleModalConfirmDelete(false);
            }
            const save = () => {
                getAllFolders()
                toggleModalConfirmDelete(false);
                onSaveCallbackModalConfirmDelete();
            }
            return {
                close,
                save,

                textCallbackModalConfirmDelete,
            }
        }
    }
</script>

<style lang="scss">
    .modal-confirm-delete {
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
    .modal-confirm-delete__body {
        width: 364px;
        background: var(--modal-bg-color);
        border-radius: 9px;
        padding: 20px 0;
        text-align: left;
    }
    .modal-confirm-delete__input-group {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 31px 0 29px;
        &.modal-confirm-delete__input-group_padding-20 {
            padding: 0 20px;
        }
    }
    .modal-confirm-delete__input {
        font-family: Segoe UI;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        margin-top: 6px;
        width: 100%;
        padding: 6px 10px;

        color: var(--modal-font-color);
        background: var(--modal-element-hover-bg-color);
        border: 0.7px solid var(--modal-input-border-color);
        box-sizing: border-box;
        border-radius: 3px;
    }
    .modal-confirm-delete__buttons {
        padding: 0 20px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 44px;
    }
</style>