<template>
    <div class="base-folder">
        <svg class="base-folder__icon"
             width="45" height="35" viewBox="0 0 45 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M43.1175 11.6157H40.5V7.26649C40.5 6.22081 39.5805 5.37081 38.451 5.37081H19.8862L16.1362 0.513672H2.049C0.9195 0.513672 0 1.36437 0 2.40935V32.7228H0.0045C0.00075 33.1134 0.132 33.4958 0.396 33.8156C0.7635 34.2597 1.32 34.5137 1.92375 34.5137H35.493C36.36 34.5137 37.1235 33.9731 37.3305 33.2557L45 13.8007V13.6779C45 12.4831 44.208 11.6157 43.1175 11.6157ZM1.5 2.40935C1.5 2.12902 1.74675 1.90143 2.049 1.90143H15.3638L19.1138 6.75857H38.4502C38.7532 6.75857 38.9993 6.98616 38.9993 7.26649V11.6157H9.54825C9.44025 11.6157 9.333 11.624 9.22875 11.6407C8.499 11.7538 7.89225 12.2464 7.7115 12.873L1.5 28.5456V2.40935ZM35.9017 32.8366C35.8522 33.0066 35.6835 33.1259 35.493 33.1259H1.92375C1.7415 33.1259 1.635 33.0295 1.58775 32.9719C1.5405 32.915 1.46775 32.7942 1.4955 32.6888L9.13875 13.2928C9.18825 13.1228 9.357 13.0035 9.5475 13.0035H40.5H43.1175C43.4025 13.0035 43.4752 13.3823 43.494 13.5718L35.9017 32.8366Z"
                  fill="#757589"/>
        </svg>
        <slot></slot>
    </div>
</template>

<style lang="scss">
    .base-folder{
        text-align: center;
        cursor: pointer;
        position: relative;
        .base-folder__icon {
            path {
                fill: var(--folder-color);
            }
        }
        .base-folder__text {
            white-space: pre-wrap;
            word-wrap: break-word;
            color: var(--folder-color);
        }
        &.base-folder_active {
            .base-folder__icon {
                path {
                    fill: var(--active-folder-color);
                }
            }
            .base-folder__text {
                color: var(--active-folder-color);
            }
        }
        &.base-folder_margin-bottom {
            margin-bottom: 42px;
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