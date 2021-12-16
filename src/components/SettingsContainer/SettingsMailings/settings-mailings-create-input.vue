<template>
    <div class="settings-mailings-create__input-group settings-mailings-create__input-group_full-height">
        <label class="settings-mailings-create__label settings-mailings-create__label_relative" for="settings-mailings-create__message"
               :class="{'settings-mailings-create__label_error': error}"
        >
            Сообщение
            <!-- <svg class="settings-mailings-create-input__icon settings-mailings-create-input__icon_attachment" width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.2458 4.61625C13.0375 4.61625 12.8492 4.6947 12.7016 4.82003L12.6939 4.81226L6.04702 11.4709C5.29377 12.2279 4.98493 12.9665 4.98098 14.0209C4.98098 14.8455 5.28409 15.5873 5.8343 16.1096C6.40257 16.6489 7.19178 16.9339 8.11699 16.9337H8.13641C9.09946 16.9294 10.0006 16.5485 10.6731 15.8621L18.3856 8.11103C20.339 6.1472 20.3903 3.34837 18.5075 1.45561C17.5737 0.516978 16.3304 0 15.0066 0C13.6829 0 12.4399 0.516978 11.5068 1.45568L1.84701 11.1647C-0.615669 13.6403 -0.615669 17.6685 1.84701 20.1441C3.03805 21.3411 4.62406 22.0001 6.31284 22.0001C8.00166 22.0001 9.58778 21.3411 10.7793 20.144L20.7796 10.0557C20.7796 10.0557 21 9.83798 21 9.47066C21 9.00003 20.6204 8.61839 20.1522 8.61839C19.9297 8.61839 19.7287 8.70653 19.5774 8.84758L19.5748 8.84498L9.57437 18.9334C8.70453 19.8073 7.54618 20.2886 6.31266 20.2886C5.07915 20.2886 3.92098 19.8073 3.05146 18.9334C1.25296 17.1248 1.25296 14.183 3.05146 12.3756L12.7112 2.66677C13.3233 2.05146 14.1385 1.71267 15.0066 1.71267C15.8748 1.71267 16.6905 2.05161 17.3031 2.66677C17.914 3.28088 18.221 4.01042 18.1913 4.77683C18.1619 5.5311 17.8127 6.26533 17.1811 6.90016L9.45242 14.6677C9.0991 15.0233 8.62934 15.22 8.13037 15.2212C7.18124 15.2212 6.68468 14.6201 6.68468 14.0271C6.68659 13.526 6.88208 13.054 7.2354 12.6983L13.8984 6.02335L13.8909 6.01576C14.0155 5.86743 14.0936 5.67819 14.0936 5.4687C14.0937 4.99771 13.714 4.61625 13.2458 4.61625Z" fill="#9797BB"/>
            </svg> -->
            <svg class="settings-mailings-create-input__icon settings-mailings-create-input__icon_emoji" style="cursor:pointer" @click="openedEmojiPicker = !openedEmojiPicker" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 22C8.0618 22 5.29947 20.8558 3.2218 18.7782C1.14422 16.7005 0 13.9382 0 11C0 8.0618 1.14422 5.29947 3.2218 3.2218C5.29947 1.14421 8.0618 0 11 0C13.9382 0 16.7005 1.14421 18.7782 3.2218C20.8558 5.29947 22 8.0618 22 11C22 13.9382 20.8558 16.7005 18.7782 18.7782C16.7005 20.8558 13.9382 22 11 22ZM11 1.71875C5.88229 1.71875 1.71875 5.88229 1.71875 11C1.71875 16.1177 5.88229 20.2812 11 20.2812C16.1177 20.2812 20.2812 16.1177 20.2812 11C20.2812 5.88229 16.1177 1.71875 11 1.71875ZM15.0278 12.8987C14.6273 12.6439 14.0962 12.7619 13.8414 13.1624C13.8308 13.179 12.7613 14.8268 10.957 14.8268C9.15277 14.8268 8.08328 13.179 8.07267 13.1624C7.81786 12.7619 7.28673 12.6439 6.8863 12.8987C6.48588 13.1535 6.36784 13.6847 6.62264 14.0851C6.68658 14.1855 8.21988 16.5456 10.957 16.5456C13.6942 16.5456 15.2275 14.1856 15.2914 14.0851C15.5462 13.6846 15.4282 13.1535 15.0278 12.8987ZM7.00391 7.08984C7.59718 7.08984 8.07812 7.57079 8.07812 8.16406C8.07812 8.75733 7.59718 9.23828 7.00391 9.23828C6.41064 9.23828 5.92969 8.75733 5.92969 8.16406C5.92969 7.57079 6.41064 7.08984 7.00391 7.08984ZM13.9219 8.16406C13.9219 8.75733 14.4028 9.23828 14.9961 9.23828C15.5894 9.23828 16.0703 8.75733 16.0703 8.16406C16.0703 7.57079 15.5894 7.08984 14.9961 7.08984C14.4028 7.08984 13.9219 7.57079 13.9219 8.16406Z" fill="#9797BB"/>
            </svg>
        </label>
        <div class="settings-mailings-create-input">
            <div
                    contenteditable="true"
                    ref="textarea"
                    @paste="paste"
                    @input="changeMessage"
                    class="settings-mailings-create-input__message"
                    :class="{'settings-mailings-create-input__message_little': openedEmojiPicker}"
                    id="settings-mailings-create__message"
                    placeholder="Введите ваше сообщение"
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
</template>

<script>
    import { onMounted, ref, computed, watch } from 'vue'
    import {useEmoji} from "../../../composition/useEmoji";
    import { Picker } from "../../emoji-component/src";
    export default {
        components: {
            Picker
        },
        props: {
            message: String,
            error: Boolean,

        },
        setup(props, {emit}) {
            const textarea = ref(null);
            const { emojiIndex, emojiToHtml, wrapEmoji } = useEmoji()

            const openedEmojiPicker = ref(false);
            const paste = ($event) => {
                let paste = ($event.clipboardData || window.clipboardData).getData('text');
                pasteHtmlAtCaret(wrapEmoji(wrapTab(paste)));
                changeMessage();
                $event.preventDefault();
            }
            const changeMessage = () => {
                let div = document.createElement('div');
                div.innerHTML = textarea.value.innerHTML;
                div.querySelectorAll('img').forEach(img => {
                    img.replaceWith(img.getAttribute('data-text'))
                })
                /* div.innerHTML = div.innerHTML.replace(/<br>/g, '\n'); */
                div.innerHTML = div.innerHTML.replace(/\n/g, ''); 
                /* div.innerHTML = div.innerHTML.replace(/\n\n/g, '\n'); */
                /* div.innerHTML = div.innerHTML.replace(/\&nbsp\;/gi, ' '); */
                emit('changeMessage', div.innerHTML);
                console.log(textarea.value.innerHTML)
            }

            const addEmoji = (emoji) => {
                if (!textarea.value.innerHTML.length
                    || !window.getSelection()
                    || !window.getSelection().anchorNode.classList
                    || (!window.getSelection().anchorNode.classList.contains('settings-mailings-create-input__message')
                        && !window.getSelection().anchorNode.parentElement.classList.contains('settings-mailings-create-input__message'))) {
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

            onMounted(() => {
                textarea.value.innerHTML = wrapEmoji(wrapTab(props.message));
            })

            return {
                textarea,
                paste,
                changeMessage,
                openedEmojiPicker,
                emojiIndex,
                addEmoji,

                error: computed(() => props.error),
            }

        }
    }
</script>
<style lang="scss">
    .settings-mailings-create-input {
        //30px отступ и 34px высота степов
        height: calc(100% - 30px - 34px);
        ::-webkit-scrollbar {
            display: none;
        }
        position: relative;
    }
    .settings-mailings-create-input__message {
        font-family: Segoe UI;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 19px;
        width: 100%;
        padding: 8px 10px;
        color: var(--modal-font-color);
        background: var(--modal-element-hover-bg-color);
        border: .7px solid var(--modal-input-border-color);
        box-sizing: border-box;
        border-radius: 3px;
        text-align: left;
        display:inline-block;
        outline: none;
        overflow-y: auto;
        overflow-x: hidden;
        word-wrap: break-word;

        &::placeholder {
            color: var(--search-input-placeholder-color);
        }
        &.settings-autoresponder-create__input_selector {
            position: relative;
        }
        &[contentEditable=true]:empty:not(:focus):before{
            content:attr(placeholder);
            color: var(--placeholder-color);

            pointer-events: none;
        }

        height: 100%;
        ::-webkit-scrollbar {
            display: none;
        }
        &.settings-mailings-create-input__message_little {
            height: calc(100% - 200px)
        }
    }
    .settings-mailings-create-input__icon {
        position: absolute;
        &.settings-mailings-create-input__icon_attachment {
            bottom: 0;
            right: 45px;
        }
        &.settings-mailings-create-input__icon_emoji {
            bottom: 0;
            right: 0;
        }
    }
</style>