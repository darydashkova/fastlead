<template>
    <div class="base-dialog">
        <BaseCircleIcon
            :src="chatInfo.avatar"
            :isNeedSelecting="isNeedSelecting"
            :isSelected="isSelected"
            :isActive="isActive"
            @toggleSelecting="toggleSelecting"
            :icon='chatInfo'
        ></BaseCircleIcon>
        <div class="base-dialog__container">
            <div class="base-dialog__row">
                    <div class="base-dialog__name" v-html="wrapEmoji(formatedPhone)"></div>
                <div class="base-dialog__date">
                    {{chatInfo.last_message? validDate(chatInfo.last_message.time) : ''}}
                </div>
            </div>
            <div class="base-dialog__row">
                    <div class="base-dialog__text" v-html="chatInfo.last_message? (chatInfo.last_message.type === 'text'? wrapEmoji(chatInfo.last_message.message) : 'Вложение') : ''"></div>
                <template v-if="chatInfo.last_message">
                    <template v-if="chatInfo.last_message.is_me">
                        <div v-if="!chatInfo.is_read" class="base-dialog__status base-dialog__status_unreadable">
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
                        <div v-else class="base-dialog__status base-dialog__status_readable">
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
                    </template>
                    <template v-else>
                        <div v-if="!chatInfo.is_read" class="base-dialog__status base-dialog__status_count">
                            {{chatInfo.unread}}
                        </div>
                        <div v-else class="base-dialog__status base-dialog__status_none"></div>
                    </template>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import BaseCircleIcon from './BaseCircleIcon'
    import {useDate} from "../../composition/useDate";
    import { computed } from 'vue';
    import {useEmoji} from "../../composition/useEmoji";
    export default {
        components: { BaseCircleIcon },
        props: {
            chatInfo: {
                avatar: String,
                name: String,
                is_read: Boolean,
                is_online: Boolean,
                last_message: {
                    message: String,
                    time: [String, Number],
                    is_me: Boolean,
                },
                unread: Number,
            },
            isNeedSelecting: Boolean,
            isSelected: Boolean,
        },
        setup(props, {emit}) {
            const { validDate } = useDate()
            const formatedPhone = computed(() => {
            let phone = props.chatInfo.name;
            if (phone.match(/^\d+$/)&&phone.length == 11){
                let match = phone.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
                const num = match[1] + ' (' + match[2]+ ') '+ match[3] + '-'+ match[4]+ '-'+match[5];
                phone =num;
            }
            return phone;
            })
            const toggleSelecting = () => {
                emit('toggleSelecting');
            }
            const { wrapEmoji } = useEmoji();
            return {
                wrapEmoji,
                chatInfo: props.chatInfo,
                validDate,
                isNeedSelecting: props.isNeedSelecting,
                toggleSelecting,
                isSelected: computed(() => props.isSelected),
                formatedPhone,
            }
        }
    }
</script>

<style lang="scss">
    .base-dialog{
        cursor: pointer;
        width: 100%;
        height: 70px;
        display: flex;
        align-items: center;
        padding: 0 16px;
        position: relative;
        transition: .2s ease;
        &:hover {
            background: var(--messenger-search-input-bg);
        }
        &.base-dialog_active {
            background: var(--messenger-search-input-bg-active);
            &:after {
                content: '';
                position: absolute;
                height: 46px;
                width: 3px;
                background: var(--green-color);
                left: 0;
                top: 50%;
                transform: translateY(-50%);
            }
        }
        &.base-dialog_not-padding {
            padding: 0;
            margin-bottom: 0;
        }
    }
    .base-dialog__container{
        margin-left: 10px;
        max-width: calc(100% - 46px - 10px);
        width: calc(100% - 46px - 10px);
        text-align: left;
    }
    .base-dialog__row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        &:last-of-type {
            margin-top: 2px;
            align-items: flex-end;
        }
    }
    .base-dialog__name {
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 24px;
        max-width: 75%;
        width: 75%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        display: flex;
        align-items: center;
    }
    .base-dialog__text {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 19px;
        max-width: 75%;
        width: 75%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        display: flex;
        align-items: center;
    }
    .base-dialog__date {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 19px;
    }
    .base-dialog__status_readable, .base-dialog__status_unreadable {
        display: flex;
        align-items: flex-end;
    }
    .base-dialog__status_count{
        background: var(--green-color);
        border-radius: 5px;
        padding: 2px 5px;
        height: 16px;
        font-style: normal;
        font-weight: 600;
        font-size: 10px;
        line-height: 130%;
        color: #1D1D35;
    }
    .base-dialog__name {
        color: var(--color-messanger-name);
    }
    .base-dialog__text {
        color: var(--search-input-placeholder-color);
    }
    .base-dialog__date {
        color: var(--search-input-placeholder-color);
    }

</style>