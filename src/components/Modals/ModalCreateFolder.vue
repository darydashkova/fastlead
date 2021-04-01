<template>
    <div class="modal-create-folder" @click.self="toggleModalCreateFolder(false)">
        <div class="modal-create-folder__body">
            <div class="modal-create-folder__header">
                Новая папка
            </div>
            <div class="modal-create-folder__input-group modal-create-folder__input-group_padding-20">
                <label class="modal-create-folder__label" for="modal-create-folder__input">
                    Название папки
                </label>
                <input id="modal-create-folder__input" type="text" class="modal-create-folder__input" v-model="name">
            </div>



            <div class="modal-create-folder__footer">
                <BaseButton
                        @click="lCreateFolder"
                        class="base-button_enter"
                >
                    Добавить
                </BaseButton>
                <BaseButton
                        @click="toggleModalCreateFolder(false)"
                        class="base-button_cancel"
                >
                    Отмена
                </BaseButton>
            </div>
        </div>
    </div>
</template>

<script>
    import BaseButton from '../Base/BaseButton.vue'

    import { useFolder } from "../../composition/useFolder";
    import { ref } from 'vue';
    import {useModals} from "../../composition/useModals";
    export default {
        components: { BaseButton },
        setup() {
            const { createFolder, getAllFolders } = useFolder();

            const { toggleModalCreateFolder } = useModals()

            const name = ref('')

            const error = ref(false);

            const lCreateFolder = () => {
                error.value = false;
                if (name.value) {
                    createFolder({
                        name: name.value
                    }).then(r => {
                        if (r.error) {
                            error.value = true;
                        } else {
                            getAllFolders();
                            toggleModalCreateFolder(false);
                        }
                    })
                } else {
                    error.value = true;
                }


            }

            return {
                name,
                error,
                lCreateFolder,
                toggleModalCreateFolder
            }
        }
    }
</script>

<style lang="scss">
    .modal-create-folder {
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
    .modal-create-folder__body {
        width: 364px;
        border-radius: 9px;
        position: relative;
        padding: 20px 0;

        background: var(--create-folder-color);
        color: var(--create-folder-font-color);
    }
    .modal-create-folder__header {
        font-weight: 600;
        font-size: 22px;
        line-height: 29px;
        color: var(--create-folder-header-color);
        padding: 0 20px;
    }
    .modal-create-folder__input-group {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 31px 0 29px;
        &.modal-create-folder__input-group_padding-20 {
            padding: 0 20px;
        }
    }
    .modal-create-folder__label {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        background: var(--green-color);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        &.modal-create-folder__label_padding-20 {
            padding: 0 20px;
        }
    }
    .modal-create-folder__input {
        font-family: Segoe UI;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        margin-top: 6px;
        color: var(--create-folder-header-color);
        width: 100%;
        border-bottom: 1px solid var(--create-chat-border-color);
        padding: 2px;
        background: transparent;
    }

    .modal-create-folder__footer {
        padding: 28px 20px 0;
        display: flex;
        justify-content: space-between;
    }

</style>