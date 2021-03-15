<template>
    <div class="base-nav-message"
        :class="{
            'base-nav-message_dark': isDark,
            'base-nav-message_light': !isDark,
            'base-nav-message_active': isActive,
        }"
    >
        <BaseCircleIcon
            :isDark="isDark"
            :src="chatInfo.src"
            :isActive="false"
        ></BaseCircleIcon>
        <div class="base-nav-message__container">
            <div class="base-nav-message__row">
                <div class="base-nav-message__name">
                    {{chatInfo.name}}
                </div>
                <div class="base-nav-message__date">
                    {{chatInfo.message.date}}
                </div>
            </div>
            <div class="base-nav-message__row">
                <div class="base-nav-message__text">
                    {{chatInfo.message.text}}
                </div>
                <!--            нет сообщений-->
                <div v-if="chatInfo.status === 0" class="base-nav-message__status base-nav-message__status_none"></div>
                <!--            собеседник не прочитал-->
                <div v-if="chatInfo.status === 1" class="base-nav-message__status base-nav-message__status_unreadable">
                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.87103 12.0154L6.18244 14.5716L13.096 6.05078" stroke="url(#paint0_linear)" stroke-width="1.5" stroke-linecap="round"/>
                        <defs>
                            <linearGradient id="paint0_linear" x1="-1.35783" y1="17.9379" x2="12.3055" y2="1.91598" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#00BF6D"/>
                                <stop offset="1" stop-color="#98D730"/>
                            </linearGradient>
                        </defs>
                    </svg>

                </div>
                <!--            собеседник прочитал-->
                <div v-if="chatInfo.status === 2" class="base-nav-message__status base-nav-message__status_readable">
                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.71429 12.0154L6.0257 14.5716L12.9393 6.05078" stroke="url(#paint0_linear)" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M11.0085 14.5716L10.5731 15.1823L11.1469 15.5914L11.5909 15.0442L11.0085 14.5716ZM18.5045 6.52333C18.7655 6.20168 18.7163 5.72936 18.3946 5.46838C18.073 5.20739 17.6007 5.25658 17.3397 5.57823L18.5045 6.52333ZM9.03791 14.0877L10.5731 15.1823L11.4439 13.9609L9.90874 12.8663L9.03791 14.0877ZM11.5909 15.0442L18.5045 6.52333L17.3397 5.57823L10.4261 14.0991L11.5909 15.0442Z" fill="url(#paint1_linear)"/>
                        <defs>
                            <linearGradient id="paint0_linear" x1="-1.51456" y1="17.9379" x2="12.1487" y2="1.91598" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#00BF6D"/>
                                <stop offset="1" stop-color="#98D730"/>
                            </linearGradient>
                            <linearGradient id="paint1_linear" x1="5.97909" y1="17.9379" x2="19.8091" y2="4.5377" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#00BF6D"/>
                                <stop offset="1" stop-color="#98D730"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <!--            количество непрочитанных сообщений-->
                <div v-if="chatInfo.status === 3" class="base-nav-message__status base-nav-message__status_count">
                    {{chatInfo.unreadableCount}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BaseCircleIcon from './base-circle-icon'
    export default {
        components: { BaseCircleIcon },
        props: {
            isDark: Boolean,
            chatInfo: {
                src: String,
                name: String,
                message: {
                    text: String,
                    date: String,
                },
                status: [Number, String],
                unreadableCount: [String, Number],
            },
            isActive: Boolean,
        },
        setup(props) {
            return {
                isDark: props.isDark,
                chatInfo: props.chatInfo,
                isActive: props.isActive
            }
        }
    }
</script>

<style lang="scss">
    @import "@/variables.scss";
    .base-nav-message{
        cursor: pointer;
        width: 100%;
        height: 70px;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        padding: 0 16px;
        &.base-nav-message_active {
            &.base-nav-message_dark {
                background: $search-input-color__dark;
            }
            &.base-nav-message_light {
                background: $search-input-color__light;
            }
            &:after {
                content: '';
                position: absolute;
                height: 46px;
                width: 3px;
                background: $green;
                left: 0;
            }
        }
    }
    .base-nav-message__container{
        width: 100%;
        margin-left: 10px;
    }
    .base-nav-message__row {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        &:last-of-type {
            margin-top: 2px;
            align-items: flex-end;
        }
    }
    .base-nav-message__name {
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 24px;
    }
    .base-nav-message__text {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 19px;
    }
    .base-nav-message__date {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 19px;
    }
    .base-nav-message__status_readable, .base-nav-message__status_unreadable {
        display: flex;
        align-items: flex-end;
    }
    .base-nav-message__status_count{
        background: $green;
        border-radius: 5px;
        width: 17px;
        height: 17px;
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        color: #FFFFFF;
    }
    .base-nav-message_dark {
        .base-nav-message__name {
            color: $font-color__dark;
        }
        .base-nav-message__text {
            color: $sub-text-color_dark;
        }
        .base-nav-message__date {
            color: $sub-text-color_dark;
        }
    }
    .base-nav-message_light {
        .base-nav-message__name {
            color: $font-color__light;
        }
        .base-nav-message__text {
            color: $sub-text-color_light;
        }
        .base-nav-message__date {
            color: $sub-text-color_light;
        }
    }

</style>