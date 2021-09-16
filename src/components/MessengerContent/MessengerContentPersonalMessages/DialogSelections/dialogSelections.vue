<template>
    <div class="dialogs-selections">
        <div class="dialogs-selections__actions-container">
            <div class="dialogs-selections__checkbox">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 4.79564L3.10726 6.42235L7.50682 1" stroke="var(--left-bar-color)" stroke-width="0.954545" stroke-linecap="round"/>
                </svg>
            </div>
            <div class="dialogs-selections__container">
                <div class="dialogs-selections__number">
                    {{length}}
                </div>
                <div v-if="isFullLength" class="dialogs-selections__button"
                     @click="toggleAllSelectedGroupDialogs(false)">
                    Снять выделение
                </div>
                <div v-else class="dialogs-selections__button"
                     @click="toggleAllSelectedGroupDialogs(true)">
                    Выделить все
                </div>

            </div>
        </div>
        <div class="dialogs-selections__actions-container dialogs-selections__actions-container_long">
            <div class="dialogs-selections__button dialogs-selections__button_mr" @click="del">
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.4 2.33333H9.54C9.40074 1.67499 9.03229 1.08345 8.49675 0.658419C7.96121 0.233386 7.29132 0.000848473 6.6 0L5.4 0C4.70868 0.000848473 4.03879 0.233386 3.50325 0.658419C2.96771 1.08345 2.59926 1.67499 2.46 2.33333H0.6C0.44087 2.33333 0.288258 2.39479 0.175736 2.50419C0.0632141 2.61358 0 2.76196 0 2.91667C0 3.07138 0.0632141 3.21975 0.175736 3.32915C0.288258 3.43854 0.44087 3.5 0.6 3.5H1.2V11.0833C1.20095 11.8566 1.51733 12.5979 2.07973 13.1447C2.64213 13.6915 3.40464 13.9991 4.2 14H7.8C8.59536 13.9991 9.35787 13.6915 9.92027 13.1447C10.4827 12.5979 10.799 11.8566 10.8 11.0833V3.5H11.4C11.5591 3.5 11.7117 3.43854 11.8243 3.32915C11.9368 3.21975 12 3.07138 12 2.91667C12 2.76196 11.9368 2.61358 11.8243 2.50419C11.7117 2.39479 11.5591 2.33333 11.4 2.33333ZM5.4 9.91667C5.4 10.0714 5.33679 10.2197 5.22426 10.3291C5.11174 10.4385 4.95913 10.5 4.8 10.5C4.64087 10.5 4.48826 10.4385 4.37574 10.3291C4.26321 10.2197 4.2 10.0714 4.2 9.91667V6.41667C4.2 6.26196 4.26321 6.11358 4.37574 6.00419C4.48826 5.89479 4.64087 5.83333 4.8 5.83333C4.95913 5.83333 5.11174 5.89479 5.22426 6.00419C5.33679 6.11358 5.4 6.26196 5.4 6.41667V9.91667ZM7.8 9.91667C7.8 10.0714 7.73679 10.2197 7.62426 10.3291C7.51174 10.4385 7.35913 10.5 7.2 10.5C7.04087 10.5 6.88826 10.4385 6.77574 10.3291C6.66321 10.2197 6.6 10.0714 6.6 9.91667V6.41667C6.6 6.26196 6.66321 6.11358 6.77574 6.00419C6.88826 5.89479 7.04087 5.83333 7.2 5.83333C7.35913 5.83333 7.51174 5.89479 7.62426 6.00419C7.73679 6.11358 7.8 6.26196 7.8 6.41667V9.91667ZM3.7026 2.33333C3.82715 1.99237 4.05714 1.69721 4.36103 1.48834C4.66492 1.27947 5.02784 1.16711 5.4 1.16667H6.6C6.97216 1.16711 7.33508 1.27947 7.63897 1.48834C7.94286 1.69721 8.17285 1.99237 8.2974 2.33333H3.7026Z"
                          fill="var(--font-color)"/>
                </svg>
                Удалить
            </div>
            <div class="dialogs-selections__button dialogs-selections__button_mr" @click="move">
                <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.27533 1.18182H11.0833C11.7423 1.18315 12.3815 1.4105 12.8966 1.82684C13.4117 2.24318 13.7725 2.82396 13.9201 3.47455L0 3.54014V2.95455C0.00092625 2.17124 0.308514 1.42028 0.855295 0.866403C1.40208 0.312521 2.1434 0.00093828 2.91667 0H4.39133C4.66282 0.000228293 4.93056 0.0641403 5.17358 0.186727L7.01458 1.12273C7.09595 1.16221 7.18512 1.18242 7.27533 1.18182ZM0 10.0455V4.72199L14 4.6564V10.0455C13.9991 10.8288 13.6915 11.5798 13.1447 12.1336C12.5979 12.6875 11.8566 12.9991 11.0833 13H2.91667C2.1434 12.9991 1.40208 12.6875 0.855295 12.1336C0.308514 11.5798 0.00092625 10.8288 0 10.0455Z"
                          fill="var(--font-color)"/>
                </svg>

                В папку
            </div>
            <!-- <div class="dialogs-selections__button dialogs-selections__button_mr">
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 4.18661V11.0834C0.000952715 11.8566 0.317329 12.598 0.879732 13.1447C1.44213 13.6915 2.20464 13.9991 3 14H9C9.79536 13.9991 10.5579 13.6915 11.1203 13.1447C11.6827 12.598 11.999 11.8566 12 11.0834V4.18661C12 3.87457 11.9141 3.56822 11.7513 3.2993C11.5885 3.03037 11.3548 2.80865 11.0742 2.65711L6.2916 0.073524C6.20241 0.0253056 6.10205 0 6 0C5.89795 0 5.79759 0.0253056 5.7084 0.073524L0.9258 2.65711C0.645243 2.80865 0.411465 3.03037 0.248686 3.2993C0.0859064 3.56822 4.62475e-05 3.87457 0 4.18661ZM6 3.20836C6.178 3.20836 6.35201 3.25968 6.50001 3.35582C6.64802 3.45197 6.76337 3.58862 6.83149 3.74851C6.89961 3.9084 6.91743 4.08433 6.88271 4.25406C6.84798 4.4238 6.76226 4.57971 6.6364 4.70208C6.51053 4.82445 6.35016 4.90778 6.17558 4.94155C6.001 4.97531 5.82004 4.95798 5.65559 4.89175C5.49113 4.82553 5.35057 4.71338 5.25168 4.56948C5.15278 4.42559 5.1 4.25642 5.1 4.08336C5.1 3.85129 5.19482 3.62873 5.3636 3.46464C5.53239 3.30054 5.76131 3.20836 6 3.20836Z"
                          fill="var(--font-color)"/>
                </svg>

                Добавить тег
            </div>
            <div class="dialogs-selections__button">
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.2 4.914V4.08333C10.2 3.00037 9.7575 1.96175 8.96985 1.19598C8.1822 0.430207 7.11391 0 6 0C4.88609 0 3.8178 0.430207 3.03015 1.19598C2.2425 1.96175 1.8 3.00037 1.8 4.08333V4.914C1.26562 5.14074 0.810776 5.51397 0.491099 5.98804C0.171423 6.46211 0.000767025 7.01647 0 7.58333V11.0833C0.000952715 11.8566 0.317329 12.5979 0.879732 13.1447C1.44213 13.6915 2.20464 13.9991 3 14H9C9.79536 13.9991 10.5579 13.6915 11.1203 13.1447C11.6827 12.5979 11.999 11.8566 12 11.0833V7.58333C11.9992 7.01647 11.8286 6.46211 11.5089 5.98804C11.1892 5.51397 10.7344 5.14074 10.2 4.914ZM6.6 9.91667C6.6 10.0714 6.53679 10.2197 6.42426 10.3291C6.31174 10.4385 6.15913 10.5 6 10.5C5.84087 10.5 5.68826 10.4385 5.57574 10.3291C5.46321 10.2197 5.4 10.0714 5.4 9.91667V8.75C5.4 8.59529 5.46321 8.44692 5.57574 8.33752C5.68826 8.22812 5.84087 8.16667 6 8.16667C6.15913 8.16667 6.31174 8.22812 6.42426 8.33752C6.53679 8.44692 6.6 8.59529 6.6 8.75V9.91667ZM9 4.66667H3V4.08333C3 3.30979 3.31607 2.56792 3.87868 2.02094C4.44129 1.47396 5.20435 1.16667 6 1.16667C6.79565 1.16667 7.55871 1.47396 8.12132 2.02094C8.68393 2.56792 9 3.30979 9 4.08333V4.66667Z"
                          fill="var(--font-color)"/>
                </svg>

                Заблокировать
            </div>-->
        </div> 
        <div class="dialogs-selections__actions-container dialogs-selections__actions-container_short">
            <div class="dialogs-selections__button dialogs-selections__button_mr" @click="del">
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.4 2.33333H9.54C9.40074 1.67499 9.03229 1.08345 8.49675 0.658419C7.96121 0.233386 7.29132 0.000848473 6.6 0L5.4 0C4.70868 0.000848473 4.03879 0.233386 3.50325 0.658419C2.96771 1.08345 2.59926 1.67499 2.46 2.33333H0.6C0.44087 2.33333 0.288258 2.39479 0.175736 2.50419C0.0632141 2.61358 0 2.76196 0 2.91667C0 3.07138 0.0632141 3.21975 0.175736 3.32915C0.288258 3.43854 0.44087 3.5 0.6 3.5H1.2V11.0833C1.20095 11.8566 1.51733 12.5979 2.07973 13.1447C2.64213 13.6915 3.40464 13.9991 4.2 14H7.8C8.59536 13.9991 9.35787 13.6915 9.92027 13.1447C10.4827 12.5979 10.799 11.8566 10.8 11.0833V3.5H11.4C11.5591 3.5 11.7117 3.43854 11.8243 3.32915C11.9368 3.21975 12 3.07138 12 2.91667C12 2.76196 11.9368 2.61358 11.8243 2.50419C11.7117 2.39479 11.5591 2.33333 11.4 2.33333ZM5.4 9.91667C5.4 10.0714 5.33679 10.2197 5.22426 10.3291C5.11174 10.4385 4.95913 10.5 4.8 10.5C4.64087 10.5 4.48826 10.4385 4.37574 10.3291C4.26321 10.2197 4.2 10.0714 4.2 9.91667V6.41667C4.2 6.26196 4.26321 6.11358 4.37574 6.00419C4.48826 5.89479 4.64087 5.83333 4.8 5.83333C4.95913 5.83333 5.11174 5.89479 5.22426 6.00419C5.33679 6.11358 5.4 6.26196 5.4 6.41667V9.91667ZM7.8 9.91667C7.8 10.0714 7.73679 10.2197 7.62426 10.3291C7.51174 10.4385 7.35913 10.5 7.2 10.5C7.04087 10.5 6.88826 10.4385 6.77574 10.3291C6.66321 10.2197 6.6 10.0714 6.6 9.91667V6.41667C6.6 6.26196 6.66321 6.11358 6.77574 6.00419C6.88826 5.89479 7.04087 5.83333 7.2 5.83333C7.35913 5.83333 7.51174 5.89479 7.62426 6.00419C7.73679 6.11358 7.8 6.26196 7.8 6.41667V9.91667ZM3.7026 2.33333C3.82715 1.99237 4.05714 1.69721 4.36103 1.48834C4.66492 1.27947 5.02784 1.16711 5.4 1.16667H6.6C6.97216 1.16711 7.33508 1.27947 7.63897 1.48834C7.94286 1.69721 8.17285 1.99237 8.2974 2.33333H3.7026Z"
                          fill="var(--font-color)"/>
                </svg>
                Удалить
            </div>
            <button class="dialogs-selections__button dialogs-selections__button_more"
                    @click="toggleOpenedColumn(true)"
                    @blur="toggleOpenedColumn(false)"
            >
                <svg style="margin-right: 0" width="14" height="2" viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1C12 1.55228 12.4477 2 13 2C13.5523 2 14 1.55228 14 1C14 0.447715 13.5523 -1.95703e-08 13 -4.37114e-08C12.4477 -6.78525e-08 12 0.447715 12 1ZM6 1C6 1.55228 6.44772 2 7 2C7.55228 2 8 1.55228 8 1C8 0.447715 7.55228 -2.81839e-07 7 -3.0598e-07C6.44772 -3.30121e-07 6 0.447715 6 1ZM1 2C0.447716 2 -6.78525e-08 1.55228 -4.37114e-08 1C-1.95703e-08 0.447715 0.447716 -5.92389e-07 1 -5.68248e-07C1.55229 -5.44107e-07 2 0.447715 2 1C2 1.55228 1.55229 2 1 2Z"
                          fill="var(--font-color)"/>
                </svg>
                <div class="dialogs-selections__column" v-if="openedColumn">
                    <div class="dialog-selections__column-element" @click="move">
                        В папку
                    </div>
                    <!-- <div class="dialog-selections__column-element">
                        Добавить тег
                    </div>
                    <div class="dialog-selections__column-element">
                        Заблокировать
                    </div> -->
                </div>
            </button>

        </div>
    </div>
</template>

<script>
    import {useDialogs} from "../../../../composition/useDialogs";
    import { computed, ref } from 'vue'
    export default {
        props: {
            length: String,
            isFullLength: Boolean,
        },
        setup(props, {emit}) {
            const { toggleAllSelectedGroupDialogs } = useDialogs()

            const openedColumn = ref(false);
            const toggleOpenedColumn = (boolean) => {
                openedColumn.value = boolean;
            }

            return {
                toggleOpenedColumn,
                openedColumn,

                length: computed(() => props.length),
                isFullLength: computed(() => props.isFullLength),
                toggleAllSelectedGroupDialogs,

                del: () => emit('del'),
                move: () => emit('move'),
            }
        }
    }
</script>

<style lang="scss">

    .dialogs-selections {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 19px;
        width: 100%;
        height: 100%;

        color: var(--font-color);
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
    }

    .dialogs-selections__checkbox {
        background: var(--font-color);
        border-radius: 3.18182px;
        width: 14px;
        height: 14px;

        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
    }
    .dialogs-selections__container {
        width: 175px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .dialogs-selections__button {
        padding: 8px 10px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: .2s ease;
        svg {
            margin-right: 10px;
        }

        &.dialogs-selections__button_mr {
            margin-right: 20px;
        }
        &.dialogs-selections__button_more {
            width: 35px;
            height: 35px;
            padding: 0;
            justify-content: center;
            background: transparent;
        }

        &:hover {
            background: var(--messages-color);
        }
    }
    .dialogs-selections__actions-container {
        display: flex;
        align-items: center;
        &.dialogs-selections__actions-container_long {
            @media(max-width: 1400px) {
                display: none;
            }
        }
        &.dialogs-selections__actions-container_short {
            display: none;
            @media(max-width: 1400px) {
                display: flex;
            }
        }
    }
    .dialogs-selections__column {
        border-radius: 8px;
        z-index: 1200;
        border: 1px solid var(--context-background-color);
        background: var(--context-background-color);

        position: absolute;
        width: 191px;
        right: 0;
        top: calc(100% - 11px);
        text-align: left;
        overflow: hidden;
    }
    .dialog-selections__column-element {
        list-style-type: none;
        padding: 10px 12px;
        cursor: pointer;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        transition: .3s ease;
        color: var(--user-info-settings-default-svg-fill);
        &:hover {
            background: var(--user-info-settings-hover-setting-bg);
            color: var(--font-color);
        }
    }
</style>