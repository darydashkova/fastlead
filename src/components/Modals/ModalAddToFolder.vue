я<template>
    <div class="modal-add-to-folder" @mousedown.self="toggleModalAddToFolder(false)"
         :class="{'z-index': fromModals.fromCreateChatToCreateFolder}">
        <div class="modal-add-to-folder__body">
            <BaseModalHeader>
                Добавить в папку
            </BaseModalHeader>
            <BaseModalText class="base-modal-text_padding-20 base-modal-text_mt-10 base-modal-text_default">
                "Новая папка"
            </BaseModalText>
            <BaseSearchInput
                    class="base-search-input_m"
                    @toggleSearch="() => null"
                    @handler="searchHandler"
                    placeholder=""
            ></BaseSearchInput>
            <div class="modal-add-to-folder__dialogs"
                 :class="{'modal-add-to-folder__dialogs_scroll': fromModals.fromCreateChatToCreateFolder? dialogs.length > 4 : dialogs.length > 3}"
            >
                <div v-show="fromModals.fromCreateChatToCreateFolder? dialogs.length > 4 : dialogs.length > 3" class="scroll" ref="container" @click.self="scrollTo">
                    <div class="scroll__bar" ref="scrollbar"></div>
                </div>
                <div class="modal-add-to-folder__container" ref="content">
                    <div class="modal-add-to-folder__dialog modal-add-to-folder__dialog_non-hover" @click="createChat"
                        v-if="!fromModals.fromCreateChatToCreateFolder"
                    >
                        <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="23" cy="23" r="23" fill="#46CB52"/>
                            <path d="M24 35H15C13.346 35 12 33.654 12 32V31C12 25.486 16.486 21 22 21C22.552 21 23 21.448 23 22C23 22.552 22.552 23 22 23C17.589 23 14 26.589 14 31V32C14 32.552 14.449 33 15 33H24C24.552 33 24.9999 33.447 24.9999 33.9999C25 34.553 24.552 35 24 35Z" fill="#EDEDEF"/>
                            <path d="M22 12C24.761 12 27 14.239 27 17V19C27 21.761 24.761 24 22 24C19.239 24 17 21.7611 17 19V17C17 14.239 19.239 12 22 12Z" fill="#46CB52"/>
                            <path d="M21.9999 25C18.6909 25 15.9999 22.309 15.9999 19V17C15.9999 13.691 18.6909 11 21.9999 11C25.3089 11 27.9999 13.691 27.9999 17V19C27.9999 22.309 25.3089 25 21.9999 25ZM21.9999 13C19.7939 13 17.9999 14.794 17.9999 17V19C17.9999 21.206 19.7939 23 21.9999 23C24.2059 23 25.9999 21.206 25.9999 19V17C25.9999 14.794 24.2059 13 21.9999 13Z" fill="#EDEDEF"/>
                            <path d="M34.9999 30H24.9999C24.4479 30 23.9999 29.553 23.9999 29C23.9999 28.447 24.4479 28 24.9999 28H34.9998C35.5528 28 35.9998 28.447 35.9998 29C35.9999 29.553 35.5529 30 34.9999 30Z" fill="#EDEDEF"/>
                            <path d="M29.9999 35C29.4469 35 28.9999 34.553 28.9999 34V24C28.9999 23.447 29.4469 23 29.9999 23C30.5528 23 30.9998 23.447 30.9998 24V34C30.9998 34.553 30.5528 35 29.9999 35Z" fill="#EDEDEF"/>
                        </svg>
                        <div class="modal-add-to-folder__name">
                            Создать чат
                        </div>
                    </div>
                    <div class="modal-add-to-folder__dialog" v-for="dialog in dialogs"
                         @click="toggleSelectedDialogs(dialog)"
                         :key="dialog.dialog_id + 'modalAddToFolder'">
                        <BaseCircleIcon :src="dialog.avatar"></BaseCircleIcon>
                        <div class="modal-add-to-folder__name">
                            {{dialog.name}}
                        </div>
                        <div class="modal-add-to-folder__checkbox"
                             :class="{'modal-add-to-folder__checkbox_active': selectedDialogs.find(i => i.dialog_id === dialog.dialog_id)}"
                        >
                            <div class="modal-add-to-folder__inner-checkbox" >
                                <svg v-if="selectedDialogs.find(i => i.dialog_id === dialog.dialog_id)" width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                </div>
            </div>
            <div class="modal-add-to-folder__buttons">
                <BaseButton
                        class="base-button_enter"
                        @click="save"
                >
                    Сохранить
                </BaseButton>
                <BaseButton
                        class="base-button_cancel"
                        @click="toggleModalAddToFolder(false)"
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
    import BaseModalText from '../Base/BaseModalText.vue'
    import BaseModalHint from '../Base/BaseModalHint.vue'
    import BaseModalHeader from '../Base/BaseModalHeader.vue'
    import BaseSearchInput from '../Base/BaseSearchInput.vue'
    import BaseCircleIcon from '../Base/BaseCircleIcon.vue'

    import { useModals } from "../../composition/useModals";
    import { onMounted, reactive, computed } from 'vue';
    import { useSearch } from "../../composition/useSearch";
    import {useCustomScroll} from "../../composition/useCustomScroll";


    export default {
        components: {
            BaseButton,
            BaseModalLabel,
            BaseModalText,
            BaseModalHint,
            BaseModalHeader,
            BaseSearchInput,
            BaseCircleIcon,
        },
        setup() {
            const { toggleModalAddToFolder, toggleModalCreateChat ,selectedDialogsToFolder, setSelectedDialogs, fromModals, setCloseCallbackCreateChat } = useModals();
            const { search, selectParameter } = useSearch();
            const { container, content, scrollbar, scrollTo, init } = useCustomScroll()

            const allDialogs = reactive({
                data: [],
            })

            const selectedDialogs = reactive({
                data: [],
            })

            const toggleSelectedDialogs = (dialog) => {
                let inc = selectedDialogs.data.find(i => i.dialog_id === dialog.dialog_id);
                inc
                    ? (selectedDialogs.data = selectedDialogs.data.filter(i => i.dialog_id !== dialog.dialog_id))
                    : selectedDialogs.data = [...selectedDialogs.data, dialog]
            }

            let time = new Date().getTime();
            const searchHandler = (value) => {
                let newTime = new Date().getTime();
                time = newTime;
                setTimeout(() => {
                    if (newTime === time) {
                        search(value)
                            .then(r => {
                                allDialogs.data = [...r.dialogues];
                            })
                    }
                }, 500)
            }

            const save = () => {
                setSelectedDialogs(selectedDialogs.data);
                toggleModalAddToFolder(false);
            }

            const createChat = () => {
                fromModals.fromAddToFolderToCreateChat = true;
                setCloseCallbackCreateChat(() => {
                    selectParameter('name');
                    search('')
                        .then(r => {
                            allDialogs.data = [...r.dialogues];
                        })
                });
                toggleModalCreateChat(true);
            }

            onMounted(() => {
                selectParameter('name');
                search('')
                    .then(r => {
                        allDialogs.data = [...r.dialogues];
                    })
                selectedDialogs.data = [...selectedDialogsToFolder.value]
                init();
            })
            return {
                container,
                content,
                scrollbar,
                scrollTo,

                selectedDialogsToFolder,
                toggleModalAddToFolder,

                dialogs: computed(() => allDialogs.data),
                selectedDialogs: computed(() => selectedDialogs.data),

                toggleSelectedDialogs,
                searchHandler,
                save,

                createChat,
                fromModals,
            }
        }
    }
</script>

<style lang="scss">
    .modal-add-to-folder {
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
    .modal-add-to-folder__body {
        width: 364px;
        background: var(--modal-bg-color);
        border-radius: 9px;
        padding: 20px 0;
        text-align: left;
    }
    .modal-add-to-folder__dialogs {
        position: relative;
        &.modal-add-to-folder__dialogs_scroll {
            height: calc(60px * 5);
            ::-webkit-scrollbar {
                display: none;
            }
        }
    }
    .modal-add-to-folder__container {
        overflow-y: auto;
        height: 100%;
    }
    .modal-add-to-folder__checkbox {
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
    .modal-add-to-folder__dialog {
        display: flex;
        align-items: center;
        margin-bottom: 4px;
        position: relative;
        padding: 5px 20px;
        cursor: pointer;
        transition: .2s ease;
        &:last-of-type {
            margin-bottom: 0;
        }
        &:hover {
            background: var(--messages-color);
            .modal-add-to-folder__checkbox {
                background: var(--user-info-settings-hover-svg-fill);
            }
        }
        &.modal-add-to-folder__dialog_non-hover {
            &:hover {
                background: transparent;
            }
        }
    }
    .modal-add-to-folder__checkbox_active {
        background: var(--green-color);
    }


    .modal-add-to-folder__name {
        margin-left: 10px;

        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 24px;
        color: var(--modal-font-color);
    }
    .modal-add-to-folder__inner-checkbox {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: var(--modal-bg-color);
        display: flex;
        align-items: center;
        justify-content: center;
    }


    .modal-add-to-folder__buttons {
        padding: 0 20px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 40px;
    }

</style>