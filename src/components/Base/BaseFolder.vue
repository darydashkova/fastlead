<template>
    <div class="base-folder">
        <svg class="base-folder__icon" width="34" height="26" viewBox="0 0 34 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 9.99719V20.1987C0.00224946 21.7367 0.749249 23.2113 2.07714 24.2988C3.40504 25.3864 5.20541 25.9982 7.08333 26H27C28.8779 25.9982 30.595 25.3864 31.9229 24.2988C33.2508 23.2113 33.9977 21.7367 34 20.1987V9.99719H0Z" fill="#575773"/>
            <path d="M27.0712 2.73461H17.7701C17.5497 2.73601 17.332 2.68925 17.1332 2.59788L12.6366 0.432068C12.043 0.148414 11.389 0.000528246 10.7259 0H7.124C5.23529 0.00217108 3.42459 0.723143 2.08907 2.00477C0.753551 3.2864 0.00226238 5.02403 0 6.83652L0 7.99772H34C33.6395 6.49232 32.7583 5.19048 31.5001 4.22712C30.2419 3.26376 28.6808 2.73768 27.0712 2.73461Z" fill="#575773"/>
            <defs>
                <linearGradient id="paint0_linear" x1="-14.0617" y1="32.3221" x2="6.25787" y2="-9.86443" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#22A595"/>
                    <stop offset="1" stop-color="#84D160"/>
                </linearGradient>
                <linearGradient id="paint1_linear" x1="-14.0617" y1="11.1573" x2="-8.15157" y2="-13.3948" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#22A595"/>
                    <stop offset="1" stop-color="#84D160"/>
                </linearGradient>
            </defs>
        </svg>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            isEdit: Boolean,
        }
    }
</script>

<style lang="scss">
    .base-folder{
        text-align: center;
        cursor: pointer;
        position: relative;
        padding: 14px 8px;
        transition: .2s ease;
        .base-folder__icon {
            path {
                fill: var(--default-svg-fill);
            }
        }
        .base-folder__text {
            white-space: pre-wrap;
            word-wrap: break-word;
            color: var(--default-svg-fill);
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 19px;
            margin-top: 5px;
        }
        &:hover {
            background: var(--hover-folder-bg);
        }
        &.base-folder_active {
            background: var(--hover-folder-bg);
            .base-folder__icon {
                path {
                    fill: url(#paint0_linear);
                }
            }
            .base-folder__text {
                background: var(--green-color);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
        }
        &.base-folder_create{
            background: var(--footer-color);
            margin-bottom: 0;
            padding-top: 12px;
            .base-folder__text {
                color: var(--folder-create-button-color);
            }
        }
    }
    .base-folder__unread-count {
        background: var(--green-color);
        border-radius: 5px;
        padding: 0 5px;
        height: 17px;
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        color: #FFFFFF;

        position: absolute;
        top: 24px;
        right: 28px;
    }
</style>