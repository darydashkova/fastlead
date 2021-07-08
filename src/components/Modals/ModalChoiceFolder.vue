<template>
    <div class="modal-choice-folder" @mousedown.self="close">
        <div class="modal-choice-folder__body">
            <BaseModalHeader>
                Выбрать папки
            </BaseModalHeader>
            <BaseModalText class="base-modal-text_padding-20 base-modal-text_mt-29">
                Мои папки
            </BaseModalText>
            <div class="modal-choice-folder__folders-list"
                 :class="{'modal-choice-folder__folders-list_scroll': folders.length > 5}"
            >
                <div v-show="folders.length > 5" class="scroll" ref="container" @click.self="scrollTo">
                    <div class="scroll__bar" ref="scrollbar"></div>
                </div>
                <div class="modal-choice-folder__container" ref="content">
                    <template v-for="folder in folders">
                        <div class="modal-choice-folder__folder" @click="choice(folder.folder_id)">
                            <div class="modal-choice-folder__folder-container">
                                <div class="modal-choice-folder__name">
                                    {{folder.name}}
                                </div>
                                <div class="modal-choice-folder__count">
                                    {{folder.dialogues_count}}
                                </div>
                            </div>
                            <div class="modal-choice-folder__checkbox"
                                 :class="{'modal-choice-folder__checkbox_active': selectedFolders.find(i => i === folder.folder_id)}"
                            >
                                <div class="modal-choice-folder__inner-checkbox" >
                                    <svg v-if="selectedFolders.find(i => i === folder.folder_id)" width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.5 5.08281L3.98355 7L9.16875 0.609375" stroke="url(#paint0_linear)" stroke-width="1.125" stroke-linecap="round"/>
                                        <defs>
                                            <linearGradient id="paint0_linear" x1="-1.67164" y1="9.52469" x2="8.57582" y2="-2.49172" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#00BF6D"/>
                                                <stop offset="1" stop-color="#98D730"/>
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </template>

                </div>
            </div>
            <BaseModalText class="base-modal-text_padding-20 base-modal-text_mt-29 base-modal-text_uppercase base-modal-text_hovered pointer"
                           @click="toggleModalCreateFolder(true)"
            >
                +Создать новую папку
            </BaseModalText>
            <BaseModalHint class="base-modal-hint_padding-20">
                Вы можете создать папки с нужными <br> чатами и переключаться между ними
            </BaseModalHint>
            <div class="modal-choice-folder__buttons">
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
    import BaseModalText from '../Base/BaseModalText.vue'
    import BaseModalHint from '../Base/BaseModalHint.vue'
    import BaseModalHeader from '../Base/BaseModalHeader.vue'
    import BaseButton from '../Base/BaseButton.vue'
    import ModalConfirmDelete from '../Modals/ModalConfirmDelete.vue'

    import {useFolder} from "../../composition/useFolder";
    import {useModals} from "../../composition/useModals";

    import {  onMounted } from 'vue';
    import {useCustomScroll} from "../../composition/useCustomScroll";
    import {useModalChoiceFolder} from "../../composition/useModalChoiceFolder";

    export default {
        components: {
            BaseModalText,
            BaseModalHint,
            BaseModalHeader,
            BaseButton,

            ModalConfirmDelete,
        },
        setup() {
            const { folders, getAllFolders } = useFolder();
            const { toggleModalChoiceFolder, onSaveCallbackModalChoiceFolder, selectedFolders } = useModalChoiceFolder();
            const { toggleModalCreateFolder} = useModals();
            const { container, content, scrollbar, scrollTo, init } = useCustomScroll();

            const choice = id => {
                selectedFolders.value.find(i => i === id)
                    ? selectedFolders.value = selectedFolders.value.filter(i => i !== id)
                    : selectedFolders.value.push(id)
            }

            const close = () => {
                toggleModalChoiceFolder(false);
            }
            const save = () => {
                onSaveCallbackModalChoiceFolder(selectedFolders.value);
                toggleModalChoiceFolder(false);
            }

            onMounted(() => {
                init();
                getAllFolders();
            })

            return {
                container,
                content,
                scrollbar,
                scrollTo,

                choice,
                selectedFolders,

                folders,
                close,
                save,
                toggleModalCreateFolder,
            }
        }
    }
</script>

<style lang="scss">
    .modal-choice-folder {
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
    }
    .modal-choice-folder__body {
        width: 364px;
        background: var(--modal-bg-color);
        border-radius: 9px;
        padding: 20px 0;
        text-align: left;
    }
    .modal-choice-folder__folders-list {
        margin-top: 10px;
        position: relative;
        &.modal-choice-folder__folders-list_scroll {
            height: calc(53px * 4);
            ::-webkit-scrollbar {
                display: none;
            }
        }
    }

    .modal-choice-folder__container {
        overflow-y: auto;
        height: 100%;
    }
    .modal-choice-folder__checkbox {
        width: 20px;
        height: 20px;
        position: absolute;
        right: 20px;
        border-radius: 50%;
        background: var(--user-info-settings-default-svg-fill);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: .2s ease;
    }
    .modal-choice-folder__folder {
        padding: 8px 20px;
        position: relative;
        display: flex;
        align-items: center;
        transition: .2s ease;
        cursor: pointer;
        &:hover {
            background: var(--modal-element-hover-bg-color);
            .modal-choice-folder__checkbox {
                background: var(--user-info-settings-hover-svg-fill);
            }
        }
    }
    .modal-choice-folder__checkbox_active {
        background: var(--green-color)!important;
    }
    .modal-choice-folder__inner-checkbox {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: var(--modal-bg-color);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .modal-choice-folder__name {
        color: var(--modal-font-color);
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;

        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        max-width: 235px;

    }
    .modal-choice-folder__count {
        color: var(--modal-sub-font-color);
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;

        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        max-width: 235px;
    }

    .modal-choice-folder__buttons {
        padding: 0 20px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 44px;
    }

</style>