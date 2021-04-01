<template>
    <div class="modal-create-chat" @click.self="toggleModalCreateChat(false)">
        <div class="modal-create-chat__body">
            <div class="modal-create-chat__header modal-create-chat__header_padding-20">
                Создать чат
            </div>
            <div class="modal-create-chat__input-group modal-create-chat__input-group_padding-20">
                <label class="modal-create-chat__label" for="modal-create-chat__input">
                    Номер телефона
                </label>
                <input id="modal-create-chat__input" type="text" class="modal-create-chat__input">
            </div>
            <div class="modal-create-chat__hint modal-create-chat__hint_padding-20">
                Выберите или создайте папки, в которых нужно показывать этот чат
            </div>
            <div class="modal-create-chat__label modal-create-chat__label_padding-20 modal-create-chat__label_mb-6 modal-create-chat__label_mt-29">
                Мои папки
            </div>
            <div class="modal-create-chat__my-folders">
                <div class="modal-create-chat__folder" v-for="folder in folders">
                    <div class="modal-create-chat__folder-container">
                        <div class="modal-create-chat__folder-name">
                            {{folder.name}}
                        </div>
                        <div class="modal-create-chat__chats-count">
                            2 чата
                        </div>
                    </div>
                    <svg class="modal-create-chat__icon" width="33" height="35" viewBox="0 0 33 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M31.6195 17.4898H29.7V14.1639C29.7 13.3643 29.0257 12.7143 28.1974 12.7143H14.5832L11.8333 9H1.5026C0.6743 9 0 9.65053 0 10.4496V33.6305H0.0033C0.00055 33.9292 0.0968 34.2216 0.2904 34.4662C0.5599 34.8058 0.968 35 1.41075 35H26.0282C26.664 35 27.2239 34.5867 27.3757 34.038L33 19.1607V19.0668C33 18.1531 32.4192 17.4898 31.6195 17.4898ZM1.1 10.4496C1.1 10.2353 1.28095 10.0612 1.5026 10.0612H11.2668L14.0168 13.7755H28.1968C28.4191 13.7755 28.5994 13.9496 28.5994 14.1639V17.4898H7.00205C6.92285 17.4898 6.8442 17.4962 6.76775 17.5089C6.2326 17.5954 5.78765 17.9721 5.6551 18.4513L1.1 30.4362V10.4496ZM26.3279 33.7175C26.2916 33.8475 26.1679 33.9388 26.0282 33.9388H1.41075C1.2771 33.9388 1.199 33.865 1.16435 33.821C1.1297 33.7775 1.07635 33.6851 1.0967 33.6045L6.70175 18.7723C6.73805 18.6423 6.8618 18.551 7.0015 18.551H29.7H31.6195C31.8285 18.551 31.8819 18.8407 31.8956 18.9856L26.3279 33.7175Z" fill="#757589"/>
                        <path d="M14.03 4.32265L18.621 4.32176L18.0842 6.17725C18.0481 6.30197 18.0907 6.43551 18.1913 6.51589C18.2926 6.59637 18.4309 6.60922 18.5454 6.54733L23.9932 3.57428C24.0954 3.51798 24.1598 3.41018 24.1598 3.29361C24.1598 3.1761 24.0954 3.06908 23.9932 3.01278L18.5455 0.0389996C18.432 -0.0229423 18.2927 -0.0100943 18.1913 0.0703883C18.0907 0.15155 18.0481 0.285148 18.0842 0.409084L18.6202 2.26212L14.03 2.2629C13.462 2.2629 13 2.72386 13 3.29283C13.0001 3.86153 13.462 4.32265 14.03 4.32265Z" fill="#757589"/>
                    </svg>
                </div>
                <!--                ToDo папки со скроллом-->
            </div>
            <div class="modal-create-chat__label modal-create-chat__label_padding-20 modal-create-chat__label_mt-26 modal-create-chat__label_uppercase pointer">
                Создать новую папку
            </div>
            <div class="modal-create-chat__buttons">
                <BaseButton
                        class="base-button_enter"
                >
                    Сохранить
                </BaseButton>
                <BaseButton
                        class="base-button_cancel"
                        @click.self="toggleModalCreateChat(false)"
                >
                    Отмена
                </BaseButton>
            </div>
        </div>
    </div>
</template>

<script>
    import BaseButton from '../Base/BaseButton.vue'
    import {useFolder} from "../../composition/useFolder";
    import {useModals} from "../../composition/useModals";

    export default {
        components: { BaseButton },
        setup() {
            const { folders } = useFolder();

            const { toggleModalCreateChat } = useModals();
            return {
                folders,

                toggleModalCreateChat
            }
        }
    }
</script>

<style lang="scss">
    .modal-create-chat {
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
    .modal-create-chat__body {
        width: 364px;
        background: #1D1D35;
        border-radius: 9px;
        padding: 20px 0;
        text-align: left;
    }
    .modal-create-chat__header {
        font-weight: 600;
        font-size: 22px;
        line-height: 29px;
        color: var(--create-folder-header-color);
        &.modal-create-chat__header_padding-20 {
            padding: 0 20px;
        }
    }
    .modal-create-chat__input-group {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 31px 0 29px;
        &.modal-create-chat__input-group_padding-20 {
            padding: 0 20px;
        }
    }
    .modal-create-chat__label {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        background: var(--green-color);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        &.modal-create-chat__label_mb-6 {
            margin-bottom: 6px;
        }
        &.modal-create-chat__label_mt-26 {
            margin-top: 26px;
        }
        &.modal-create-chat__label_mt-29 {
            margin-top: 29px;
        }
        &.modal-create-chat__label_uppercase {
            text-transform: uppercase;
        }
        &.modal-create-chat__label_padding-20 {
            padding: 0 20px;
        }
    }
    .modal-create-chat__input {
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
    .modal-create-chat__hint {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;

        color: #404054;
        margin-top: 26px;
        &.modal-create-chat__hint_padding-20 {
            padding: 0 20px;
        }
    }

    .modal-create-chat__my-folders {
        //4 - количество отображаемых папок
        max-height: calc(53px * 4);
    }
    .modal-create-chat__folder {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        padding: 8px 20px;
        &:hover {
            background: var(--create-chat-border-color);
        }
    }
    .modal-create-chat__buttons {
        padding: 0 20px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 44px;
    }
    .modal-create-chat__folder-name {
        color: var(--create-folder-font-button);
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
    }
    .modal-create-chat__chats-count {
        color: var(--create-folder-border-color);
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;
    }
</style>