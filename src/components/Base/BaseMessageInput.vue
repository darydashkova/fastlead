<template>
    <div class="base-message-input">
        <textarea class="base-message-input__input"
                  placeholder="Введите ваше сообщение..."
                  ref="textarea"
                  v-model="value"
                  @input="resize"
                  @keypress="isEnter"
        ></textarea>
        <div class="base-message-input__input base-message-input__input_hidden-div" tabindex="-1"></div>

        <svg class="base-message-input__smile-icon" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 22C8.0618 22 5.29947 20.8558 3.2218 18.7782C1.14421 16.7005 0 13.9382 0 11C0 8.0618 1.14421 5.29947 3.2218 3.2218C5.29947 1.14421 8.0618 0 11 0C13.9382 0 16.7005 1.14421 18.7782 3.2218C20.8558 5.29947 22 8.0618 22 11C22 13.9382 20.8558 16.7005 18.7782 18.7782C16.7005 20.8558 13.9382 22 11 22ZM11 1.71875C5.88229 1.71875 1.71875 5.88229 1.71875 11C1.71875 16.1177 5.88229 20.2812 11 20.2812C16.1177 20.2812 20.2812 16.1177 20.2812 11C20.2812 5.88229 16.1177 1.71875 11 1.71875ZM15.0278 12.8987C14.6273 12.6439 14.0962 12.7619 13.8414 13.1624C13.8308 13.179 12.7613 14.8268 10.957 14.8268C9.15277 14.8268 8.08328 13.179 8.07267 13.1624C7.81786 12.7619 7.28673 12.6439 6.8863 12.8987C6.48588 13.1535 6.36784 13.6847 6.62264 14.0851C6.68658 14.1855 8.21988 16.5456 10.957 16.5456C13.6942 16.5456 15.2275 14.1856 15.2914 14.0851C15.5462 13.6846 15.4282 13.1535 15.0278 12.8987ZM7.00391 7.08984C7.59718 7.08984 8.07812 7.57079 8.07812 8.16406C8.07812 8.75733 7.59718 9.23828 7.00391 9.23828C6.41064 9.23828 5.92969 8.75733 5.92969 8.16406C5.92969 7.57079 6.41064 7.08984 7.00391 7.08984ZM13.9219 8.16406C13.9219 8.75733 14.4028 9.23828 14.9961 9.23828C15.5894 9.23828 16.0703 8.75733 16.0703 8.16406C16.0703 7.57079 15.5894 7.08984 14.9961 7.08984C14.4028 7.08984 13.9219 7.57079 13.9219 8.16406Z" fill="#B7B7BE"/>
        </svg>
        <svg class="base-message-input__include-icon" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.70671 11.8644L13.1414 0.217959C13.427 -0.072429 13.8894 -0.0728771 14.1763 0.217959C14.4614 0.509244 14.4614 0.981573 14.1763 1.27241L2.74075 12.9184C1.03745 14.6522 1.03745 17.4746 2.74075 19.2084C4.44316 20.9422 7.2135 20.9422 8.9168 19.2079L19.6703 8.25652C20.8249 7.08063 20.8249 5.16577 19.6703 3.99032C18.5166 2.81443 16.636 2.81487 15.4814 3.99077L6.18783 13.4557C5.61141 14.0437 5.61053 14.9986 6.18871 15.587C6.76381 16.1741 7.70148 16.1736 8.27878 15.5857L16.4133 7.3029C16.6994 7.01251 17.1618 7.01206 17.4483 7.30335C17.7338 7.59418 17.7338 8.06606 17.4483 8.35735L9.31458 16.641C8.16746 17.8098 6.29915 17.8111 5.15203 16.6428C4.00447 15.4728 4.00447 13.5704 5.15203 12.4008L14.4452 2.93542C16.1713 1.17741 18.9804 1.17785 20.7061 2.93542C22.4314 4.69344 22.4314 7.55385 20.7053 9.31142L9.95304 20.2628C7.6786 22.5788 3.97939 22.5792 1.70495 20.2633C-0.56905 17.9473 -0.568171 14.1808 1.70671 11.8644Z" fill="#B7B7BE"/>
        </svg>
        <svg v-if="value"
             @click="send"
             class="base-message-input__airplane-icon" width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.6302 8.76042L3.07326 0.353783C2.29149 -0.000412822 1.40828 0.1554 0.768364 0.760211C0.128451 1.36512 -0.139194 2.29715 0.0699624 3.19255L1.7217 10.2643H9.80881C10.1809 10.2643 10.4827 10.5937 10.4827 11C10.4827 11.4063 10.181 11.7357 9.80881 11.7357H1.7217L0.0699624 18.8074C-0.139194 19.7029 0.128406 20.6349 0.768364 21.2398C1.40958 21.8458 2.29288 21.9997 3.07331 21.6462L21.6303 13.2396C22.4752 12.8569 23 11.9987 23 11C23 10.0013 22.4752 9.14311 21.6302 8.76042Z" fill="url(#paint0_linear)"/>
            <defs>
                <linearGradient id="paint0_linear" x1="-9.51235" y1="30.393" x2="25.6483" y2="-6.07989" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#00BF6D"/>
                    <stop offset="1" stop-color="#98D730"/>
                </linearGradient>
            </defs>
        </svg>
        <svg v-else class="base-message-input__micro-icon" width="15" height="22" viewBox="0 0 15 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.2666 11.8182C14.2666 11.4559 13.9728 11.1621 13.6104 11.1621C13.2479 11.1621 12.9542 11.4559 12.9542 11.8182C12.9542 15.028 10.343 17.6391 7.13323 17.6391C3.9236 17.6391 1.31246 15.028 1.31246 11.8182C1.31246 11.4559 1.01867 11.1621 0.656228 11.1621C0.293783 11.1621 0 11.4559 0 11.8182C0 15.5304 2.8502 18.5886 6.477 18.921V20.6876H4.04179C3.67934 20.6876 3.38556 20.9813 3.38556 21.3438C3.38556 21.7062 3.67934 22 4.04179 22H10.2248C10.5871 22 10.8809 21.7062 10.8809 21.3438C10.8809 20.9813 10.5871 20.6876 10.2248 20.6876H7.78946V18.921C11.4164 18.5888 14.2666 15.5304 14.2666 11.8182Z" fill="#B7B7BE"/>
            <path d="M7.13325 16.0238C9.4501 16.0238 11.335 14.1389 11.335 11.822V4.20161C11.335 1.88491 9.4501 0 7.13325 0C4.81655 0 2.93164 1.88491 2.93164 4.20161V11.822C2.93164 14.1389 4.81655 16.0238 7.13325 16.0238ZM4.24393 4.20161C4.24393 2.60846 5.5401 1.31246 7.13325 1.31246C8.72639 1.31246 10.0226 2.60846 10.0226 4.20161V11.822C10.0226 13.4152 8.72639 14.7113 7.13325 14.7113C5.5401 14.7113 4.24393 13.4152 4.24393 11.822V4.20161Z" fill="#B7B7BE"/>
        </svg>


    </div>
</template>

<script>
    import {ref} from 'vue'
    import {useMessages} from "../../composition/useMessages";
    import {useSocket} from "../../composition/useSocket";
    import {useDialogs} from "../../composition/useDialogs";
    export default {
        setup() {
            const value = ref('');
            const textarea = ref(null);
            const { selectedDialog } = useDialogs();

            const { socketSend } = useSocket()

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
                    resize();
                }
            }

            const resize = () => {
                let hiddenDiv = document.querySelector('.base-message-input__input_hidden-div');
                hiddenDiv.style.display = 'block';
                hiddenDiv.style.visibility = 'visible';

                hiddenDiv.innerHTML = value.value;
                textarea.value.style.height = hiddenDiv.offsetHeight + 'px';
                if (hiddenDiv.offsetHeight === 150) {
                    textarea.value.style['overflow-y'] = 'auto'
                } else {
                    textarea.value.style['overflow-y'] = 'hidden'
                }

                hiddenDiv.style.display = 'none';
                hiddenDiv.style.visibility = 'hidden';
            }
            return {
                value,
                textarea,

                isEnter,
                resize,
                send,
            }
        }

    }
</script>

<style lang="scss">
    .base-message-input {
        position: relative;
        display: flex;
        align-items: flex-end;
        width: 100%;
    }
    .base-message-input__input {
        -webkit-appearance: none;
        -webkit-box-shadow: none;
        -moz-appearance: none;
        -moz-box-shadow: none;
        box-shadow: none;
        outline: none;
        resize: none;
        border: none;

        font-family: Segoe UI;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;

        min-height: 50px;
        height: 50px;
        max-height: 150px;

        width: 100%;

        padding: 13px 50px 16px 63px;
        border-radius: 31px;
        overflow-y: hidden;

        background: var(--main-color);
        color: var(--font-color);
        &::placeholder {
            color: var(--placeholder-color);
        }
        &::-webkit-scrollbar {
            display: none;
        }
    }
    .base-message-input__input_hidden-div {
        position: absolute;
        display: none;
        visibility: hidden;
        white-space: pre-wrap;
        word-wrap: break-word;
        height: auto;
    }
    .base-message-input__include-icon {
        position: absolute;
        left: 17px;
        bottom: 14px;
    }

    .base-message-input__smile-icon {
        position: relative;
        bottom: 14px;
        margin-left: 21px;
        min-width: 22px;
        min-height: 22px;
    }

    .base-message-input__micro-icon {
        position: relative;
        bottom: 14px;
        margin-left: 20px;
        margin-right: 4px;
        min-width: 15px;
        min-height: 22px;
    }

    .base-message-input__airplane-icon {
        position: relative;
        bottom: 14px;
        margin-left: 16px;
        min-width: 23px;
        min-height: 22px;
        cursor: pointer;
    }
</style>