<template>
    <div class="base-folder"
    :class="{
        'base-folder_default': isDefault
    }">
        <svg v-if="isDefault" class="base-folder__icon" width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M26.2285 4.07533C24.5378 2.66972 22.574 1.6292 20.4608 1.01933C18.3476 0.409466 16.1309 0.243468 13.9503 0.531801C9.9164 1.05536 6.2331 3.09302 3.64834 6.23105C1.06357 9.36908 -0.22891 13.3722 0.0333352 17.4277C0.295581 21.4832 2.09289 25.2869 5.06033 28.0666C8.02776 30.8463 11.9429 32.3936 16.0107 32.3942H25.3278C27.0967 32.3921 28.7926 31.6891 30.0434 30.4395C31.2942 29.1899 31.9979 27.4957 32 25.7284V15.4751V15.3912C31.8588 13.212 31.2741 11.0846 30.2817 9.13894C29.2894 7.19328 27.9102 5.47029 26.2285 4.07533ZM10.6489 9.73058H15.9867C16.3406 9.73058 16.68 9.87103 16.9303 10.121C17.1805 10.3711 17.3211 10.7102 17.3211 11.0637C17.3211 11.4173 17.1805 11.7564 16.9303 12.0064C16.68 12.2564 16.3406 12.3969 15.9867 12.3969H10.6489C10.295 12.3969 9.95559 12.2564 9.70533 12.0064C9.45508 11.7564 9.31448 11.4173 9.31448 11.0637C9.31448 10.7102 9.45508 10.3711 9.70533 10.121C9.95559 9.87103 10.295 9.73058 10.6489 9.73058ZM21.3245 23.0621H10.6489C10.295 23.0621 9.95559 22.9217 9.70533 22.6717C9.45508 22.4216 9.31448 22.0826 9.31448 21.729C9.31448 21.3754 9.45508 21.0363 9.70533 20.7863C9.95559 20.5363 10.295 20.3958 10.6489 20.3958H21.3245C21.6784 20.3958 22.0178 20.5363 22.2681 20.7863C22.5183 21.0363 22.6589 21.3754 22.6589 21.729C22.6589 22.0826 22.5183 22.4216 22.2681 22.6717C22.0178 22.9217 21.6784 23.0621 21.3245 23.0621ZM21.3245 17.7295H10.6489C10.295 17.7295 9.95559 17.5891 9.70533 17.339C9.45508 17.089 9.31448 16.7499 9.31448 16.3964C9.31448 16.0428 9.45508 15.7037 9.70533 15.4537C9.95559 15.2037 10.295 15.0632 10.6489 15.0632H21.3245C21.6784 15.0632 22.0178 15.2037 22.2681 15.4537C22.5183 15.7037 22.6589 16.0428 22.6589 16.3964C22.6589 16.7499 22.5183 17.089 22.2681 17.339C22.0178 17.5891 21.6784 17.7295 21.3245 17.7295Z" fill="url(#paint0_linear)"/>
            <defs>
                <linearGradient id="paint0_linear" x1="-13.2346" y1="45.0362" x2="38.716" y2="-5.72923" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#22A595"/>
                    <stop offset="1" stop-color="#84D160"/>
                </linearGradient>
            </defs>
        </svg>
        <svg v-else-if="isEdit" class="base-folder__icon" width="34" height="26" viewBox="0 0 34 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M28.7073 3.86039H32.5834C33.3657 3.86039 34 4.48837 34 5.26304C34 6.03771 33.3657 6.66569 32.5834 6.66569H28.7073C28.2165 8.45712 26.8031 9.85648 24.9939 10.3424C22.1796 11.0983 19.2793 9.45218 18.5158 6.66569H1.41665C0.634247 6.66569 0 6.03771 0 5.26304C0 4.48837 0.634247 3.86039 1.41665 3.86039H18.5158C19.0066 2.06896 20.42 0.6696 22.2293 0.18364C25.0436 -0.572224 27.9439 1.0739 28.7073 3.86039ZM15.4856 19.3357H32.5834C33.3657 19.3357 34 19.9637 34 20.7383C34 21.513 33.3657 22.141 32.5834 22.141H15.4856C14.9942 23.9309 13.582 25.3292 11.7742 25.8156C8.95955 26.5731 6.05766 24.9279 5.29265 22.141H1.41665C0.634247 22.141 0 21.513 0 20.7383C0 19.9637 0.634247 19.3357 1.41665 19.3357H5.29265C5.784 17.5458 7.19619 16.1475 9.00397 15.661C11.8187 14.9036 14.7206 16.5488 15.4856 19.3357Z"
                  fill="#575773"/>
        </svg>
        <svg v-else class="base-folder__icon" width="34" height="26" viewBox="0 0 34 26" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            isDefault: Boolean,
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
        &.base-folder_default {
            padding: 12px 8px 8.5px;
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

        position: absolute;
        top: 24px;
        right: 28px;
        span {
            background: #FFFFFF;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    }
    .base-folder_active {
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
        .base-folder__unread-count {
            background: #FFFFFF;
            span {
                background:  var(--green-color);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
        }
    }
</style>