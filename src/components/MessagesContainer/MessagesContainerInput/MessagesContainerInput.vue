<template>
    <div class="messages-container-input">
        <Picker
                v-if="smiles.isOpened"
                :data="emojiIndex"
                :showPreview="false"
                style="width: 100%"
                set="apple"

                @select="smiles.addEmoji"
        />
        <div class="messages-container-input__container">
            <div class="messages-container-input__input"
                 contenteditable="true"
                 placeholder="Введите ваше сообщение..."
                 ref="textarea"
                 @input="input"
                 @keypress="isEnter"
                 @paste="smiles.paste"
            ></div>
            <button class="messages-container-input__icon messages-container-input__icon_smile pointer"
                @click="smiles.toggle()"
            >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 22C8.0618 22 5.29947 20.8558 3.2218 18.7782C1.14421 16.7005 0 13.9382 0 11C0 8.0618 1.14421 5.29947 3.2218 3.2218C5.29947 1.14421 8.0618 0 11 0C13.9382 0 16.7005 1.14421 18.7782 3.2218C20.8558 5.29947 22 8.0618 22 11C22 13.9382 20.8558 16.7005 18.7782 18.7782C16.7005 20.8558 13.9382 22 11 22ZM11 1.71875C5.88229 1.71875 1.71875 5.88229 1.71875 11C1.71875 16.1177 5.88229 20.2812 11 20.2812C16.1177 20.2812 20.2812 16.1177 20.2812 11C20.2812 5.88229 16.1177 1.71875 11 1.71875ZM15.0278 12.8987C14.6273 12.6439 14.0962 12.7619 13.8414 13.1624C13.8308 13.179 12.7613 14.8268 10.957 14.8268C9.15277 14.8268 8.08328 13.179 8.07267 13.1624C7.81786 12.7619 7.28673 12.6439 6.8863 12.8987C6.48588 13.1535 6.36784 13.6847 6.62264 14.0851C6.68658 14.1855 8.21988 16.5456 10.957 16.5456C13.6942 16.5456 15.2275 14.1856 15.2914 14.0851C15.5462 13.6846 15.4282 13.1535 15.0278 12.8987ZM7.00391 7.08984C7.59718 7.08984 8.07812 7.57079 8.07812 8.16406C8.07812 8.75733 7.59718 9.23828 7.00391 9.23828C6.41064 9.23828 5.92969 8.75733 5.92969 8.16406C5.92969 7.57079 6.41064 7.08984 7.00391 7.08984ZM13.9219 8.16406C13.9219 8.75733 14.4028 9.23828 14.9961 9.23828C15.5894 9.23828 16.0703 8.75733 16.0703 8.16406C16.0703 7.57079 15.5894 7.08984 14.9961 7.08984C14.4028 7.08984 13.9219 7.57079 13.9219 8.16406Z"
                          fill="#B7B7BE"/>
                </svg>
            </button>
            <button class="messages-container-input__icon messages-container-input__icon_include"
                    @blur="attachment.open(false)"
            >
                <svg class="pointer" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"
                     @click="attachment.toggle"
                >
                    <path d="M1.70671 11.8644L13.1414 0.217959C13.427 -0.072429 13.8894 -0.0728771 14.1763 0.217959C14.4614 0.509244 14.4614 0.981573 14.1763 1.27241L2.74075 12.9184C1.03745 14.6522 1.03745 17.4746 2.74075 19.2084C4.44316 20.9422 7.2135 20.9422 8.9168 19.2079L19.6703 8.25652C20.8249 7.08063 20.8249 5.16577 19.6703 3.99032C18.5166 2.81443 16.636 2.81487 15.4814 3.99077L6.18783 13.4557C5.61141 14.0437 5.61053 14.9986 6.18871 15.587C6.76381 16.1741 7.70148 16.1736 8.27878 15.5857L16.4133 7.3029C16.6994 7.01251 17.1618 7.01206 17.4483 7.30335C17.7338 7.59418 17.7338 8.06606 17.4483 8.35735L9.31458 16.641C8.16746 17.8098 6.29915 17.8111 5.15203 16.6428C4.00447 15.4728 4.00447 13.5704 5.15203 12.4008L14.4452 2.93542C16.1713 1.17741 18.9804 1.17785 20.7061 2.93542C22.4314 4.69344 22.4314 7.55385 20.7053 9.31142L9.95304 20.2628C7.6786 22.5788 3.97939 22.5792 1.70495 20.2633C-0.56905 17.9473 -0.568171 14.1808 1.70671 11.8644Z"
                          fill="#B7B7BE"/>
                </svg>
                <div class="messages-container-input__attachments" v-if="attachment.isOpened">
                    <div class="messages-container-input__attachment">
                        <div class="messages-container-input__attachment-icon">
                            <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.99996 8.88892C10.4514 8.88892 12.4444 6.895 12.4444 4.4445C12.4444 1.994 10.4514 0 7.99996 0C5.54854 0 3.55554 1.99392 3.55554 4.44442C3.55554 6.89492 5.54854 8.88892 7.99996 8.88892ZM7.99996 1.77775C9.47046 1.77775 10.6666 2.97392 10.6666 4.44442C10.6666 5.91492 9.47046 7.11108 7.99996 7.11108C6.52946 7.11108 5.33329 5.91492 5.33329 4.44442C5.33329 2.974 6.52946 1.77775 7.99996 1.77775Z"
                                      fill="#B7B7BE"/>
                                <path d="M14.0798 11.6115C12.6597 10.7747 10.4513 9.77734 8 9.77734C5.54867 9.77734 3.34025 10.7748 1.92017 11.6115C0.736084 12.3103 0 13.667 0 15.1523V15.7217C0 16.8553 0.854167 17.7773 1.9045 17.7773H14.0955C15.1458 17.7773 16 16.8553 16 15.7217V15.1523C16 13.667 15.2639 12.3103 14.0798 11.6115ZM14.2222 15.7218C14.2222 15.9067 14.1163 15.9995 14.0955 15.9995H1.9045C1.88367 15.9995 1.77775 15.9066 1.77775 15.7218V15.1523C1.77775 14.306 2.1875 13.5178 2.82292 13.1428C4.05208 12.4188 5.94792 11.5551 8 11.5551C10.0521 11.5551 11.9479 12.4188 13.1771 13.1428C13.8125 13.5178 14.2222 14.3059 14.2222 15.1523V15.7218Z"
                                      fill="#B7B7BE"/>
                            </svg>
                        </div>
                        <div>
                            Контакт
                        </div>
                    </div>
                    <div class="messages-container-input__attachment">
                        <div class="messages-container-input__attachment-icon">
                            <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.6843 0.666435C11.3048 0.242375 10.7628 0 10.1938 0H2.69138C1.20739 0 0 1.20739 0 2.69138V16.3086C0 17.7926 1.20739 19 2.69138 19H13.3448C14.8286 19 16.036 17.7929 16.036 16.3086V6.2944C16.036 5.80233 15.8546 5.32754 15.5265 4.96083L11.6843 0.666435ZM11.48 2.56584L13.7404 5.0922H12.48C11.9277 5.0922 11.48 4.64449 11.48 4.0922V2.56584ZM13.3444 17.5815H2.69138C1.98946 17.5815 1.41851 17.0105 1.41851 16.3086V2.69138C1.41851 1.98946 1.98946 1.41851 2.69138 1.41851H10.0617V4.51047C10.0617 5.61504 10.9571 6.51047 12.0617 6.51047H14.6175V16.3086C14.6172 17.0105 14.0463 17.5815 13.3444 17.5815Z" fill="white"/>
                                <path d="M12.5948 14H3.44141C3.16526 14 2.94141 14.2239 2.94141 14.5V14.9185C2.94141 15.1947 3.16526 15.4185 3.44141 15.4185H12.5948C12.871 15.4185 13.0948 15.1946 13.0948 14.9185V14.5C13.0948 14.2239 12.871 14 12.5948 14Z" fill="white"/>
                                <path d="M12.5948 10H3.44141C3.16526 10 2.94141 10.2239 2.94141 10.5V10.9185C2.94141 11.1946 3.16526 11.4185 3.44141 11.4185H12.5948C12.871 11.4185 13.0948 11.1946 13.0948 10.9185V10.5C13.0948 10.2239 12.871 10 12.5948 10Z" fill="white"/>
                            </svg>
                        </div>
                        <div>
                            Документ
                        </div>
                    </div>
                    <div class="messages-container-input__attachment"
                         @click.stop="attachment.addPhoto"
                    >
                        <div class="messages-container-input__attachment-icon">
                            <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.6795 0H3.0888C1.38559 0 0 1.30497 0 2.90909V13.0909C0 14.695 1.38559 16 3.0888 16H10.4633C10.7579 16 11.0268 15.8422 11.1566 15.593C11.2863 15.344 11.2544 15.047 11.074 14.8277L9.01558 12.3692L14.6137 5.66278L18.2239 9.71903V13.1636C18.2239 13.1636 18.5696 13.1636 18.9961 13.1636C19.4226 13.1636 19.7683 13.1636 19.7683 13.1636V2.90909C19.7683 1.30497 18.3827 0 16.6795 0ZM15.1864 4.0419C15.0369 3.87401 14.8154 3.77812 14.5825 3.78196C14.3498 3.78537 14.1312 3.88736 13.9875 4.05966L8.04098 11.1831L6.01607 8.71861C5.86977 8.54048 5.64429 8.43636 5.4054 8.43636C5.40509 8.43636 5.40464 8.43636 5.40434 8.43636C5.16499 8.43665 4.93921 8.54148 4.79337 8.72017L0.661497 13.9645C0.401483 14.283 0.464677 14.7395 0.802665 14.9844C1.1408 15.2294 1.62554 15.1697 1.88555 14.8514L5.40721 10.3543L8.85073 14.5455H3.0888C2.23727 14.5455 1.5444 13.8929 1.5444 13.0909V2.90909C1.5444 2.1071 2.23727 1.45455 3.0888 1.45455H16.6795C17.531 1.45455 18.2239 2.1071 18.2239 2.90909V7.45483L15.1864 4.0419ZM5.4054 2.61818C4.12795 2.61818 3.0888 3.59687 3.0888 4.8C3.0888 6.00312 4.12795 6.98182 5.4054 6.98182C6.68284 6.98182 7.72199 6.00312 7.72199 4.8C7.72199 3.59687 6.68284 2.61818 5.4054 2.61818ZM5.4054 5.52727C4.97963 5.52727 4.6332 5.20099 4.6332 4.8C4.6332 4.399 4.97963 4.07273 5.4054 4.07273C5.83116 4.07273 6.17759 4.399 6.17759 4.8C6.17759 5.20099 5.83116 5.52727 5.4054 5.52727Z" fill="#B7B7BE"/>
                                <path d="M16.6795 16L3.0888 16C1.38559 16 7.75053e-06 14.695 7.89943e-06 13.0909L1.54441 13.0909C1.54441 13.8929 2.23727 14.5455 3.0888 14.5455L16.6795 14.5455C17.531 14.5455 18.2239 13.8929 18.2239 13.0909L19.7683 13.0909C19.7683 14.695 18.3827 16 16.6795 16Z" fill="#B7B7BE"/>
                                <rect x="5.7915" y="14.5449" width="10.9652" height="1.45455" fill="#B7B7BE"/>
                            </svg>
                        </div>
                        <div>
                            Фото
                        </div>
                    </div>
                    <div class="messages-container-input__attachment">
                        <div class="messages-container-input__attachment-icon">
                            <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.6665 5.59961C16.2065 5.59961 15.8331 5.958 15.8331 6.3996C15.8331 6.8412 16.2065 7.19959 16.6665 7.19959C17.1265 7.19959 17.4998 6.8412 17.4998 6.3996C17.4998 5.958 17.1265 5.59961 16.6665 5.59961Z" fill="#B7B7BE"/>
                                <path d="M10 5C7.79381 5 6 6.79381 6 9C6 11.2062 7.79381 13 10 13C12.2062 13 14 11.2062 14 9C14 6.79381 12.2062 5 10 5ZM10 11.6667C8.53019 11.6667 7.33334 10.4698 7.33334 9C7.33334 7.53019 8.53019 6.33334 10 6.33334C11.4698 6.33334 12.6667 7.53019 12.6667 9C12.6667 10.4698 11.4698 11.6667 10 11.6667Z" fill="#B7B7BE"/>
                                <path d="M17.56 3.19999H16.6575C16.5558 3.19999 16.4666 3.13309 16.4418 3.03795L16.0085 1.37325C15.7982 0.565876 15.0425 0 14.1758 0H5.82418C4.95758 0 4.2018 0.565876 3.99156 1.37318L3.5582 3.03807C3.53344 3.13309 3.44422 3.19999 3.3425 3.19999H2.44C1.09227 3.19999 0 4.24857 0 5.5424V13.6568C0 14.9507 1.0923 16 2.44 16H17.56C18.9077 16 20 14.9506 20 13.6568V5.5424C20 4.24857 18.9077 3.19999 17.56 3.19999ZM18.3333 13.6568C18.3333 14.0672 17.987 14.4 17.56 14.4H2.44C2.01305 14.4 1.66668 14.0673 1.66668 13.6568V5.5424C1.66668 5.13222 2.01273 4.80001 2.44 4.80001H3.3425C4.20914 4.80001 4.96488 4.23331 5.17512 3.42604L5.60848 1.76115C5.63313 1.66654 5.72199 1.60001 5.82418 1.60001H14.1759C14.278 1.60001 14.3669 1.66654 14.3916 1.76123L14.8249 3.42593C15.0351 4.23327 15.7909 4.80001 16.6575 4.80001H17.56C17.9873 4.80001 18.3334 5.13222 18.3334 5.5424L18.3333 13.6568Z" fill="#B7B7BE"/>
                            </svg>
                        </div>
                        <div>
                            Камера
                        </div>
                    </div>
                </div>
            </button>

            <svg v-if="value"
                 @click="send"
                 class="messages-container-input__icon messages-container-input__icon_airplane" width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.6302 8.76042L3.07326 0.353783C2.29149 -0.000412822 1.40828 0.1554 0.768364 0.760211C0.128451 1.36512 -0.139194 2.29715 0.0699624 3.19255L1.7217 10.2643H9.80881C10.1809 10.2643 10.4827 10.5937 10.4827 11C10.4827 11.4063 10.181 11.7357 9.80881 11.7357H1.7217L0.0699624 18.8074C-0.139194 19.7029 0.128406 20.6349 0.768364 21.2398C1.40958 21.8458 2.29288 21.9997 3.07331 21.6462L21.6303 13.2396C22.4752 12.8569 23 11.9987 23 11C23 10.0013 22.4752 9.14311 21.6302 8.76042Z"
                      fill="url(#paint0_linear)"/>
                <defs>
                    <linearGradient id="paint0_linear" x1="-9.51235" y1="30.393" x2="25.6483" y2="-6.07989" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#00BF6D"/>
                        <stop offset="1" stop-color="#98D730"/>
                    </linearGradient>
                </defs>
            </svg>
            <svg v-else class="messages-container-input__icon messages-container-input__icon_micro" width="15" height="22" viewBox="0 0 15 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.2666 11.8182C14.2666 11.4559 13.9728 11.1621 13.6104 11.1621C13.2479 11.1621 12.9542 11.4559 12.9542 11.8182C12.9542 15.028 10.343 17.6391 7.13323 17.6391C3.9236 17.6391 1.31246 15.028 1.31246 11.8182C1.31246 11.4559 1.01867 11.1621 0.656228 11.1621C0.293783 11.1621 0 11.4559 0 11.8182C0 15.5304 2.8502 18.5886 6.477 18.921V20.6876H4.04179C3.67934 20.6876 3.38556 20.9813 3.38556 21.3438C3.38556 21.7062 3.67934 22 4.04179 22H10.2248C10.5871 22 10.8809 21.7062 10.8809 21.3438C10.8809 20.9813 10.5871 20.6876 10.2248 20.6876H7.78946V18.921C11.4164 18.5888 14.2666 15.5304 14.2666 11.8182Z"
                      fill="#B7B7BE"/>
                <path d="M7.13325 16.0238C9.4501 16.0238 11.335 14.1389 11.335 11.822V4.20161C11.335 1.88491 9.4501 0 7.13325 0C4.81655 0 2.93164 1.88491 2.93164 4.20161V11.822C2.93164 14.1389 4.81655 16.0238 7.13325 16.0238ZM4.24393 4.20161C4.24393 2.60846 5.5401 1.31246 7.13325 1.31246C8.72639 1.31246 10.0226 2.60846 10.0226 4.20161V11.822C10.0226 13.4152 8.72639 14.7113 7.13325 14.7113C5.5401 14.7113 4.24393 13.4152 4.24393 11.822V4.20161Z"
                      fill="#B7B7BE"/>
            </svg>

            <input type="file" style="display: none;" id="messages-container-input__attachment">
        </div>

    </div>
</template>

<script>
    import { ref, reactive, computed } from 'vue'
    import { useDialogs } from "../../../composition/useDialogs";
    import { useSocket } from "../../../composition/useSocket";

    import data from "../../emoji-component/data/apple.json";
    import "../../emoji-component/css/emoji-mart.css";
    import { Picker, EmojiIndex } from "../../emoji-component/src";
    import emojiRegex from 'emoji-regex'

    let emojiIndex = new EmojiIndex(data);

    export default {
        components: {
            Picker
        },
        data() {
            return {
                emojiIndex: emojiIndex,
                emojisOutput: ""
            }
        },
        setup() {
            const { selectedDialog } = useDialogs();
            const { socketSend } = useSocket();

            const value = ref('');
            const textarea = ref(null);
            const isEnter = ($event) => {
                if ($event.keyCode === 13 && !$event.shiftKey) {
                    $event.preventDefault();
                    send();
                    return false;
                }
            }

            const send = () => {
                if (value.value) {
                    socketSend('send_message', {type: 'text', data: value.value, dialog_id: selectedDialog.value})
                    value.value = '';
                }
            }
            const input = ($event) => {
                value.value = $event.target.innerHTML
            }
            const unicodeEmojiRegex = emojiRegex()

            const wrapEmoji = (text) => {
                return text.replace(unicodeEmojiRegex, function(match, offset) {
                    const before = text.substring(0, offset)
                    if (before.endsWith('alt="') || before.endsWith('data-text="')) {
                        // Emoji inside the replaced <img>
                        return match
                    }
                    // Find emoji object by native emoji.
                    let emoji = emojiIndex.nativeEmoji(match)
                    if (!emoji) {
                        // Can't find unicode emoji in our index
                        return match
                    }
                    // See `emojiToHtml` function above.
                    return emojiToHtml(emoji)
                })
            }
            const emojiToHtml = (emoji) => {
                let style = `background-position: ${emoji.getPosition()}; width: 24px; height: 24px; display: inline-block`
                return `<img data-text="${emoji.native}" alt="${emoji.colons}"
                        src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                        class="emoji-set-apple emoji-type-image" style="${style}">`
            }

            const smiles = reactive({
                isOpened: false,
                toggle: () => {
                    smiles.isOpened = !smiles.isOpened;
                },
                open: (boolean) => {
                    smiles.isOpened = boolean;
                },
                addEmoji: (emoji) => {
                    if (textarea.value.innerHTML) {
                        pasteHtmlAtCaret(emojiToHtml(emoji))
                    } else {
                        textarea.value.innerHTML = emojiToHtml(emoji)
                    }
                },
                paste: ($event) => {
                    let paste = ($event.clipboardData || window.clipboardData).getData('text');
                    console.log(wrapEmoji(paste));
                    pasteHtmlAtCaret(wrapEmoji(paste))

                    $event.preventDefault();
                }
            })
            const pasteHtmlAtCaret = (html) => {
                let sel, range;
                if (window.getSelection) {
                    // IE9 and non-IE
                    sel = window.getSelection();
                    if (sel.getRangeAt && sel.rangeCount) {
                        range = sel.getRangeAt(0);
                        range.deleteContents();

                        // Range.createContextualFragment() would be useful here but is
                        // only relatively recently standardized and is not supported in
                        // some browsers (IE9, for one)
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

            const attachment = reactive({
                isOpened: false,
                toggle: () => {
                    attachment.isOpened = !attachment.isOpened;
                },
                open: (boolean) => {
                    attachment.isOpened = boolean;
                },
                addPhoto: () => {
                    document.getElementById('messages-container-input__attachment').click()
                }
            })

            return {
                value,
                textarea,

                isEnter,
                send,
                input,

                smiles,
                attachment,

            }
        }

    }
</script>

<style lang="scss">
    .messages-container-input {
        position: relative;
        width: 100%;
    }
    .messages-container-input__container {
        position: relative;
        display: flex;
        align-items: flex-end;
        width: 100%;
    }
    .messages-container-input__input {
        -webkit-appearance: none;
        -webkit-box-shadow: none;
        -moz-appearance: none;
        -moz-box-shadow: none;
        box-shadow: none;
        outline: none;
        resize: none;
        border: none;

        display: flex;
        align-items: center;

        font-family: Segoe UI;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;

        min-height: 50px;
        max-height: 150px;

        width: 100%;

        padding: 13px 50px 16px 63px;
        border-radius: 31px;
        overflow-y: auto;

        background: var(--main-color);
        color: var(--font-color);
        text-align: left;
        &::placeholder {
        }
        &::-webkit-scrollbar {
            display: none;
        }
        &[contentEditable=true]:empty:not(:focus):before{
            content:attr(placeholder);
            color: var(--placeholder-color);
        }
    }
    .messages-container-input__icon {
        background: transparent;
        padding: 0;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .messages-container-input__icon_include {
        position: absolute;
        left: 17px;
        bottom: 14px;
    }

    .messages-container-input__icon_smile {
        position: relative;
        bottom: 14px;
        margin-left: 21px;
        min-width: 22px;
        min-height: 22px;
        path {
            fill: var(--message-action-icon-color);
        }
    }

    .messages-container-input__icon_micro {
        position: relative;
        bottom: 14px;
        margin-left: 20px;
        margin-right: 4px;
        min-width: 15px;
        min-height: 22px;
        path {
            fill: var(--message-action-icon-color);
        }
    }

    .messages-container-input__icon_airplane {
        position: relative;
        bottom: 14px;
        margin-left: 16px;
        min-width: 23px;
        min-height: 22px;
        cursor: pointer;
        path {
            fill: var(--message-action-icon-color);
        }
    }
    .messages-container-input__attachments {
        position: absolute;
        bottom: 200%;
        left: -17px;
        background: black;
        width: 192px;
        border-radius: 9px;
        background: var(--messages-color);
    }
    .messages-container-input__attachment {
        display: flex;
        align-items: center;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;

        color: var(--sub-text-color);
        padding: 8px 16px;
        cursor: pointer;
        svg path {
            fill: var(--sub-text-color);
        }
        &:hover {
            color: var(--font-color);
            background: var(--search-input-color);
            svg path {
                fill: var(--font-color);
            }
        }
        &:first-of-type {
            border-radius: 9px 9px 0 0;
        }
        &:last-of-type {
            border-radius: 0 0 9px 9px;
        }
    }
    .messages-container-input__attachment-icon {
        width: 20px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 13px;
    }
</style>