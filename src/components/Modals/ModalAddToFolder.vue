<template>
    <div class="modal-add-to-folder" @mousedown.self="toggleModalAddToFolder(false)">
        <div class="modal-add-to-folder__body">
            <BaseModalHeader>
                Добавить в папку
            </BaseModalHeader>
            <BaseModalText class="base-modal-text_padding-20 base-modal-text_mt-10 base-modal-text_white">
                "Новая папка"
            </BaseModalText>
            <BaseSearchInput
                    class="base-search-input_m"
                    @toggleSearch="() => null"
                    @handler="searchHandler"
                    placeholder=""
            ></BaseSearchInput>
            <div class="modal-add-to-folder__dialogs">
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
    import {useSearch} from "../../composition/useSearch";


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
            const { toggleModalAddToFolder, selectedDialogsToFolder, setSelectedDialogs } = useModals();
            const { search, selectParameter } = useSearch();

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

            onMounted(() => {
                selectParameter('name');
                search('')
                    .then(r => {
                        allDialogs.data = [...r.dialogues];
                    })
                selectedDialogs.data = [...selectedDialogsToFolder.value]
            })
            return {
                selectedDialogsToFolder,
                toggleModalAddToFolder,

                dialogs: computed(() => allDialogs.data),
                selectedDialogs: computed(() => selectedDialogs.data),

                toggleSelectedDialogs,
                searchHandler,
                save,
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
    }
    .modal-add-to-folder__body {
        width: 364px;
        background: var(--create-folder-color);
        border-radius: 9px;
        padding: 20px 0;
        text-align: left;
    }
    .modal-add-to-folder__dialogs {
    }
    .modal-add-to-folder__dialog {
        display: flex;
        align-items: center;
        margin-bottom: 14px;
        position: relative;
        padding: 5px 20px;
        cursor: pointer;
        &:last-of-type {
            margin-bottom: 0;
        }
        &:hover {
            background: var(--messages-color);
        }
    }
    .modal-add-to-folder__name {
        margin-left: 10px;

        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 24px;
        color: var(--font-color);
    }
    .modal-add-to-folder__inner-checkbox {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: var(--create-folder-color);
        display: flex;
        align-items: center;
        justify-content: center;

    }
    .modal-add-to-folder__checkbox {
        width: 20px;
        height: 20px;
        position: absolute;
        right: 20px;
        border-radius: 50%;
        background: var(--font-color);
        display: flex;
        align-items: center;
        justify-content: center;
        &.modal-add-to-folder__checkbox_active {
            background: var(--green-color);
        }
    }

    .modal-add-to-folder__buttons {
        padding: 0 20px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 40px;
    }

</style>