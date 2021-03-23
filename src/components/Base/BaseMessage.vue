<template>
    <div class="base-message"
        :class="{
            'base-message_my' : message.is_me,
            'base-message_not-my' : !message.is_me,
        }"
    >
        <div class="base-message__container">
            <div class="base-message__message">
                {{message.message}}
            </div>
            <div class="base-message__state">
                {{validTime(message.time)}}
                <template v-if="message.is_me">
                    <svg v-if="message.is_read" class="base-message__is-read" width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.844971 7.64866L4.15637 10.2049L11.07 1.68408" stroke="#2A5F5F" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M9.13905 10.2049L8.70363 10.8156L9.27743 11.2247L9.72145 10.6775L9.13905 10.2049ZM16.635 2.15663C16.896 1.83498 16.8468 1.36266 16.5252 1.10168C16.2035 0.840694 15.7312 0.889878 15.4702 1.21153L16.635 2.15663ZM7.16847 9.72098L8.70363 10.8156L9.57446 9.59425L8.0393 8.49964L7.16847 9.72098ZM9.72145 10.6775L16.635 2.15663L15.4702 1.21153L8.55664 9.73236L9.72145 10.6775Z"
                              fill="#2A5F5F"/>
                    </svg>
                    <svg v-else class="base-message__is-read" width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.71436 7.01536L5.02576 9.57161L11.9394 1.05078" stroke="#2A5F5F" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import {useDate} from "../../composition/useDate";
    import { computed } from 'vue'
    export default {
        props: {
            message: {
                is_me: Boolean,
                is_read: Boolean,
                message: String,
                message_id: [Number, String],
                time: [Number],
                type: [String],
            }
        },
        setup(props) {
            const { validTime } = useDate()
            return {
                message: computed(() => props.message),
                validTime,
            }
        }

    }
</script>

<style lang="scss">
    .base-message {
        width: 100%;
        display: flex;
        margin: 5px 0;
    }
    .base-message__container {
        padding: 8px 10px;
        border-radius: 0px 9px 9px 9px;
        position: relative;
        max-width: 50%;
        display: flex;
        justify-content: space-between;
        min-height: 30px;
        @media(max-width: 1366px) {
            max-width: 70%;
        }
    }
    .base-message__message {
        /*white-space: pre-wrap;*/
        word-wrap: break-word;
        text-align: left;
        max-width: calc(100% - 57px - 22px);
    }
    .base-message__state{
        align-self: flex-end;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 19px;
        display: flex;
        align-items: center;
        min-width: 79px;
        transform: translateY(3px);
        justify-content: flex-end;
        padding-left: 22px;
    }
    .base-message__is-read {
        margin-left: 5px;
        width: 17px;
    }
    .base-message_my {
        justify-content: flex-end;
        .base-message__container {
            border-radius: 9px 0px 9px 9px;
            background: var(--green-color);
            color: var(--font-my-message-color);
        }
    }
    .base-message_not-my {
        justify-content: flex-start;
        .base-message__container {
            border-radius: 0px 9px 9px 9px;
        }
        .base-message__container {
            background: var(--messages-color);
            color: var(--font-color);
        }
        .base-message__state{
            color: var(--sub-text-colo);
        }
    }
    .base-message_my + .base-message_not-my {
        margin-top: 16px;
    }
    .base-message_not-my + .base-message_my {
        margin-top: 16px;
    }
</style>