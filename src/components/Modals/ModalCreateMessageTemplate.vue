<template>
    <div class="modal-create-message-template" @mousedown.self="close">
        <div class="modal-create-message-template__body">
            <BaseModalHeader>
                {{messageTemplateToEdit? 'Редактировать сообщение' : 'Создать сообщение'}}
            </BaseModalHeader>
            <div class="modal-create-message-template__input-group modal-create-message-template__input-group_padding-20">
                <BaseModalLabel for-id="modal-create-message-template__input" :class="{'base-modal-label_error': errors.name}">Название сообщения</BaseModalLabel>
                <input id="modal-create-message-template__input" type="text" class="modal-create-message-template__input" v-model="name">
            </div>
            <div class="modal-create-message-template__input-group modal-create-message-template__input-group_padding-20">
                <BaseModalLabel
                        class="base-modal-label_relative"
                        for-id="modal-create-message-template__text"
                        :class="{'base-modal-label_error': errors.text}"
                >
                    Сообщение
                    <svg class="modal-create-message-template__icon modal-create-message-template__icon_attachments" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.1356 20.2933L21.782 8.85861C22.0724 8.57304 22.0729 8.11058 21.782 7.82369C21.4908 7.53856 21.0184 7.53856 20.7276 7.82369L9.08158 19.2593C7.34777 20.9626 4.52544 20.9626 2.79163 19.2593C1.05781 17.5568 1.05781 14.7865 2.79208 13.0832L13.7435 2.32966C14.9194 1.17506 16.8342 1.17506 18.0097 2.32966C19.1856 3.48338 19.1851 5.36401 18.0092 6.51861L8.54427 15.8122C7.95633 16.3886 7.00136 16.3895 6.41297 15.8113C5.82592 15.2362 5.82636 14.2985 6.41431 13.7212L14.6971 5.58666C14.9875 5.30065 14.9879 4.83819 14.6967 4.55174C14.4058 4.26617 13.9339 4.26617 13.6427 4.55174L5.35896 12.6854C4.19024 13.8325 4.1889 15.7009 5.35717 16.848C6.52724 17.9955 8.42955 17.9955 9.59917 16.848L19.0646 7.55484C20.8226 5.82866 20.8221 3.01961 19.0646 1.29387C17.3066 -0.431435 14.4461 -0.431435 12.6886 1.29475L1.73718 12.047C-0.57876 14.3214 -0.579209 18.0206 1.73673 20.2951C4.05267 22.569 7.8192 22.5682 10.1356 20.2933Z"
                              fill="var(--default-svg-fill)"/>
                    </svg>
                    <svg @click="openedEmojiPicker = !openedEmojiPicker" class="modal-create-message-template__icon modal-create-message-template__icon_emoji pointer" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 22C8.0618 22 5.29947 20.8558 3.2218 18.7782C1.14421 16.7005 0 13.9382 0 11C0 8.0618 1.14421 5.29947 3.2218 3.2218C5.29947 1.14421 8.0618 0 11 0C13.9382 0 16.7005 1.14421 18.7782 3.2218C20.8558 5.29947 22 8.0618 22 11C22 13.9382 20.8558 16.7005 18.7782 18.7782C16.7005 20.8558 13.9382 22 11 22ZM11 1.71875C5.88229 1.71875 1.71875 5.88229 1.71875 11C1.71875 16.1177 5.88229 20.2812 11 20.2812C16.1177 20.2812 20.2812 16.1177 20.2812 11C20.2812 5.88229 16.1177 1.71875 11 1.71875ZM15.0278 12.8987C14.6273 12.6439 14.0962 12.7619 13.8414 13.1624C13.8308 13.179 12.7613 14.8268 10.957 14.8268C9.15277 14.8268 8.08328 13.179 8.07267 13.1624C7.81786 12.7619 7.28673 12.6439 6.8863 12.8987C6.48588 13.1535 6.36784 13.6847 6.62264 14.0851C6.68658 14.1855 8.21988 16.5456 10.957 16.5456C13.6942 16.5456 15.2275 14.1856 15.2914 14.0851C15.5462 13.6846 15.4282 13.1535 15.0278 12.8987ZM7.00391 7.08984C7.59718 7.08984 8.07812 7.57079 8.07812 8.16406C8.07812 8.75733 7.59718 9.23828 7.00391 9.23828C6.41064 9.23828 5.92969 8.75733 5.92969 8.16406C5.92969 7.57079 6.41064 7.08984 7.00391 7.08984ZM13.9219 8.16406C13.9219 8.75733 14.4028 9.23828 14.9961 9.23828C15.5894 9.23828 16.0703 8.75733 16.0703 8.16406C16.0703 7.57079 15.5894 7.08984 14.9961 7.08984C14.4028 7.08984 13.9219 7.57079 13.9219 8.16406Z"
                              fill="var(--default-svg-fill)"/>
                    </svg>
                </BaseModalLabel>
                <div class="modal-create-message-template__message-container">
                    <div class="modal-create-message-template__message"
                         :class="{'modal-create-message-template__message_small-height': openedEmojiPicker}"
                         contenteditable="true"
                         placeholder="Введите ваше сообщение..."
                         ref="textarea"
                         @paste="paste"
                    ></div>

                    <Picker
                            v-show="openedEmojiPicker"
                            :data="emojiIndex"
                            :showPreview="false"
                            style="width: 100%; position: absolute; left: 0; bottom: -15px;"
                            set="apple"

                            @select="addEmoji"
                    ></Picker>
                </div>
            </div>

            <div class="modal-create-message-template__buttons">
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
    import BaseModalText from '../Base/BaseModalText.vue'
    import BaseModalHint from '../Base/BaseModalHint.vue'
    import BaseModalHeader from '../Base/BaseModalHeader.vue'
    import { Picker } from "../emoji-component/src";
    import { ref, onMounted } from 'vue'
    import {useModalMessageTemplate} from "../../composition/useModalMessageTemplate";
    import {useEmoji} from "../../composition/useEmoji";

    export default {
        components: { BaseButton, BaseModalLabel, BaseModalText, BaseModalHint, BaseModalHeader, Picker },
        setup() {

            const { toggleModalCreateMessageTemplate, messageTemplateToEdit } = useModalMessageTemplate()
            const { emojiIndex, emojiToHtml, wrapEmoji } = useEmoji()

            const name = ref('');
            const textarea = ref(null);
            const errors = ref({
                name: false,
                text: false,
            })
            const openedEmojiPicker = ref(false);

            const paste = ($event) => {
                let paste = ($event.clipboardData || window.clipboardData).getData('text');
                pasteHtmlAtCaret(wrapEmoji(wrapTab(paste)));
                $event.preventDefault();
            }
            const addEmoji = (emoji) => {
                if (!textarea.value.innerHTML.length
                    || !window.getSelection()
                    || !window.getSelection().anchorNode.classList
                    || (!window.getSelection().anchorNode.classList.contains('modal-create-message-template__message')
                        && !window.getSelection().anchorNode.parentElement.classList.contains('modal-create-message-template__message'))) {
                    if (!textarea.value.innerHTML.length) {
                        textarea.value.innerHTML = emojiToHtml(emoji);
                        textarea.value.focus();
                        setCaretToPos(textarea.value, textarea.value.childNodes.length)
                    } else {
                        textarea.value.focus();
                        setCaretToPos(textarea.value, textarea.value.childNodes.length);
                    }
                } else {
                    pasteHtmlAtCaret(emojiToHtml(emoji))
                }
            }
            const wrapTab = (text) => {
                return text.replace(/\n/g, '<br>')
            }
            const setCaretToPos = (elem, pos) => {
                let range = document.createRange();
                let sel = window.getSelection();
                range.setStart(elem, pos);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
            const pasteHtmlAtCaret = (html) => {
                let sel, range;
                if (window.getSelection) {
                    // IE9 and non-IE
                    sel = window.getSelection();
                    if (sel.getRangeAt && sel.rangeCount) {
                        range = sel.getRangeAt(0);
                        range.deleteContents();

                        let el = document.createElement("div");
                        el.innerHTML = html;
                        let frag = document.createDocumentFragment(), node, lastNode;
                        while ( (node = el.firstChild) ) {
                            lastNode = frag.appendChild(node);
                        }
                        range.insertNode(frag);

                        // Preserve the selection
                        if (lastNode) {
                            range = range.cloneRange();
                            range.setStartAfter(lastNode);
                            range.collapse(true);
                            sel.removeAllRanges();
                            sel.addRange(range);
                        }
                    }
                } else if (document.selection && document.selection.type != "Control") {
                    // IE < 9
                    document.selection.createRange().pasteHTML(html);
                }
            }

            const close = () => {
                toggleModalCreateMessageTemplate(false);
            }

            const save = () => {
                errors.value.name = false;
                errors.value.text = false;
                if (!name.value) {
                    errors.value.name = true;
                    return;
                }
            }

            onMounted(() => {
                if (messageTemplateToEdit.value) {
                    textarea.value.innerHTML = wrapEmoji(wrapTab(messageTemplateToEdit.value.message))
                    name.value = messageTemplateToEdit.value.name
                }
            })

            return {
                save,
                close,


                paste,
                name,
                textarea,
                openedEmojiPicker,

                errors,
                emojiIndex,
                addEmoji,
                messageTemplateToEdit,
            }
        }
    }
</script>

<style lang="scss">
    .modal-create-message-template {
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
    .modal-create-message-template__body {
        width: 364px;
        background: var(--modal-bg-color);
        border-radius: 9px;
        padding: 20px 0;
        text-align: left;
    }
    .modal-create-message-template__input-group {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 31px 0 29px;
        &.modal-create-message-template__input-group_padding-20 {
            padding: 0 20px;
        }
    }
    .modal-create-message-template__input {
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
    .modal-create-message-template__message-container {
        width: 100%;
        height: 376px;
        color: var(--modal-font-color);
        background: var(--modal-element-hover-bg-color);
        border: 0.7px solid var(--modal-input-border-color);
        border-radius: 3px;
        position: relative;
        overflow: hidden;


        padding: 15px;
        margin-top: 8px;
    }
    .modal-create-message-template__message {
        width: 100%;
        height: 100%;
        font-family: Segoe UI;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;

        outline: none;
        overflow-y: auto;
        overflow-x: hidden;
        word-wrap: break-word;

        &::-webkit-scrollbar {
            display: none;
        }
        &.modal-create-message-template__message_small-height {
            height: calc(100% - 200px);
        }
        &[contentEditable=true]:empty:not(:focus):before{
            content:attr(placeholder);
            color: var(--placeholder-color);

            pointer-events: none;
        }
    }

    .modal-create-message-template__icon {
        position: absolute;
        &.modal-create-message-template__icon_attachments {
            right: 32px;
        }
        &.modal-create-message-template__icon_emoji {
            right: 0;
        }
    }

    .modal-create-message-template__buttons {
        padding: 0 20px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }
</style>