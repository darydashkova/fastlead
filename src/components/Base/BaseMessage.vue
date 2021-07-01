<template>
    <div class="base-message"
        :class="{
            'base-message_my' : message.is_me,
            'base-message_not-my' : !message.is_me,
        }"
    >
        <div v-if="message.type === 'text'" class="base-message__container">
            <div class="base-message__message"
                 v-html="fullTextMessage"></div>
        </div>
        <div v-if="message.type === 'img'" class="base-message__container base-message__container_full">
            <div class="base-message__message base-message__message_full">
                <div class="base-message__image"
                     :style="{'background': `url(${message.img}) no-repeat`, 'background-size': 'cover', 'background-position': 'center center' }"
                >
                    <div class="base-message__state base-message__state_image" style="color: white;">
                        {{validTime(message.time)}}
                        <svg v-if="message.is_read" class="base-message__is-read" width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.844971 7.64866L4.15637 10.2049L11.07 1.68408"
                                  :stroke="message.is_me? '#2A5F5F' : 'white'" stroke-width="1.5" stroke-linecap="round"/>
                            <path d="M9.13905 10.2049L8.70363 10.8156L9.27743 11.2247L9.72145 10.6775L9.13905 10.2049ZM16.635 2.15663C16.896 1.83498 16.8468 1.36266 16.5252 1.10168C16.2035 0.840694 15.7312 0.889878 15.4702 1.21153L16.635 2.15663ZM7.16847 9.72098L8.70363 10.8156L9.57446 9.59425L8.0393 8.49964L7.16847 9.72098ZM9.72145 10.6775L16.635 2.15663L15.4702 1.21153L8.55664 9.73236L9.72145 10.6775Z"
                                  :fill="message.is_me? '#2A5F5F' : 'white'"/>
                        </svg>
                        <svg v-else class="base-message__is-read" width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.71436 7.01536L5.02576 9.57161L11.9394 1.05078"
                                  :stroke="message.is_me? '#2A5F5F' : 'white'" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { useDate } from "../../composition/useDate";
    import { computed } from 'vue'
    import { useEmoji } from "../../composition/useEmoji";
    export default {
        props: {
            message: [{
                is_me: Boolean,
                is_read: Boolean,
                message: String,
                message_id: [Number, String],
                time: [Number],
                type: [String],
            }, Array],
        },
        setup(props) {
            const { validTime } = useDate()
            const { wrapEmoji } = useEmoji()

            const fullTextMessage = computed(() => {
                if (props.message.type === 'text') {
                    let str = wrapEmoji(props.message.message.replace(/\n/g, '<br>'));
                    str = str + ` <div class="base-message__state">
                        ${validTime(props.message.time)}`
                    let subst = props.message.is_me? (props.message.is_read? `
                            <svg class="base-message__is-read" width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.844971 7.64866L4.15637 10.2049L11.07 1.68408"
                                      stroke="#2A5F5F" stroke-width="1.5" stroke-linecap="round"/>
                                <path d="M9.13905 10.2049L8.70363 10.8156L9.27743 11.2247L9.72145 10.6775L9.13905 10.2049ZM16.635 2.15663C16.896 1.83498 16.8468 1.36266 16.5252 1.10168C16.2035 0.840694 15.7312 0.889878 15.4702 1.21153L16.635 2.15663ZM7.16847 9.72098L8.70363 10.8156L9.57446 9.59425L8.0393 8.49964L7.16847 9.72098ZM9.72145 10.6775L16.635 2.15663L15.4702 1.21153L8.55664 9.73236L9.72145 10.6775Z"
                                      fill="#2A5F5F"/>
                            </svg>
                            ` : `<svg class="base-message__is-read" width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.71436 7.01536L5.02576 9.57161L11.9394 1.05078"
                                      stroke="#2A5F5F" stroke-width="1.5" stroke-linecap="round"/>
                            </svg>`) : '';
                    return str + subst + `</div>`;
                }
            })

            return {
                message: computed(() => props.message),
                validTime,
                wrapEmoji,
                fullTextMessage,
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
        max-width: calc(50% - 10px);
        display: flex;
        justify-content: space-between;
        min-height: 30px;
        &.base-message__container_full {
            width: calc(50% - 10px);
        }
    }
    .base-message__message {
        /*white-space: pre-wrap;*/
        word-wrap: break-word;
        text-align: left;
        max-width: 100%;
        padding: 0 5px 5px;
        &.base-message__message_full {
            width: 100%;
            min-width: 100%;
            max-width: 100%;
            padding: 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }
    }
    .base-message__image {
        width: 100%;
        margin-bottom: 0;
        height: 280px;
        position: relative;
    }
    .base-message__state{
        display: inline-block;
        float: right;
        font-style: normal;
        font-weight: 300;
        font-size: 14px;
        line-height: 19px;
        min-width: 79px;
        transform: translateY(8px) translateX(5px);
        padding-left: 22px;
        text-align: right;
        &.base-message__state_image {
            display: flex;
            align-self: flex-end;
            align-items: center;
            justify-content: flex-end;

            position: absolute;
            right: 0;
            bottom: 0;
            padding: 0;
            transform: translate(0);
        }
    }
    .base-message__is-read {
        margin-left: 3px;
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
            color: var(--sub-text-color);
            &.base-message__state_image {
                color: white;
            }
        }
    }
    .base-message_my + .base-message_not-my {
        margin-top: 16px;
    }
    .base-message_not-my + .base-message_my {
        margin-top: 16px;
    }
</style>