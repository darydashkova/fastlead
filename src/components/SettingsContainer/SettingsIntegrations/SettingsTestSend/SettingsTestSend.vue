<template>
    <div class="settings-test-send">
        <div class="settings-test-send__title">Тестовая отправка </div>
        <svg class="settings-test-send__close pointer" @click='close' width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.5002 7.49989C22.2658 7.26556 21.9479 7.13391 21.6164 7.13391C21.285 7.13391 20.9671 7.26556 20.7327 7.49989L15.0002 13.2324L9.26767 7.49989C9.03326 7.26556 8.71537 7.13391 8.38392 7.13391C8.05246 7.13391 7.73458 7.26556 7.50017 7.49989C7.26583 7.7343 7.13419 8.05219 7.13419 8.38364C7.13419 8.7151 7.26583 9.03298 7.50017 9.26739L13.2327 14.9999L7.50017 20.7324C7.26583 20.9668 7.13419 21.2847 7.13419 21.6161C7.13419 21.9476 7.26583 22.2655 7.50017 22.4999C7.73458 22.7342 8.05246 22.8659 8.38392 22.8659C8.71537 22.8659 9.03326 22.7342 9.26767 22.4999L15.0002 16.7674L20.7327 22.4999C20.9671 22.7342 21.285 22.8659 21.6164 22.8659C21.9479 22.8659 22.2658 22.7342 22.5002 22.4999C22.7345 22.2655 22.8662 21.9476 22.8662 21.6161C22.8662 21.2847 22.7345 20.9668 22.5002 20.7324L16.7677 14.9999L22.5002 9.26739C22.7345 9.03298 22.8662 8.7151 22.8662 8.38364C22.8662 8.05219 22.7345 7.7343 22.5002 7.49989Z" fill="#9797BB"/>
        </svg>
        <div class="settings-test-send__number">
            <div class="settings-test-send__number-title">Отправить на номер</div>
            <div class="settings-test-send__number_padding">
            <input class="settings-test-send__number-input" placeholder="7 (XXX) XXX-XX-XX" v-maska="'7 (###) ###-##-##'"  v-model="number">
            </div>
        </div>
        <div class="settings-test-send__buttons">
            <div class="base-button base-button_enter base-button_p5-15" @click="save">Отправить</div>
            <div class="base-button base-button_border-green" @click='close'>Отмена</div>
        </div>
    </div>
</template>
<script>
 import {ref} from "vue";
export default {
    props: {
        index: Number,
    },
    emits: ["test"],
    setup(props, {emit}) {
        const number = ref();
        const save = () => {
            emit('test', number.value, props.index);
            emit('close')
        }
        const close = () =>{
            emit('close')
        }
        return {
            number,
            save,
            close
        }
    },
}
</script>
<style lang="scss">
.settings-test-send{
    position:absolute;
    width:530px;
    background-color: #252544;
    -webkit-box-shadow: -2px 2px 12px 18px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: -2px 2px 12px 18px rgba(34, 60, 80, 0.2);
    box-shadow: -2px 2px 12px 18px rgba(34, 60, 80, 0.2);
    border-radius: 6px;
    z-index: 99;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -20%);
    &__title{
        font-style: normal;
        font-weight: bold;
        font-size: 24px;
        line-height: 24px;
        color: #F0F0FA;
        padding: 22px 24px 31px;
        text-align: left;
    }
    &__close{
    position: absolute;
    top: 19px;
    right: 21px;
    }
    &__number{
        border-top: 1px solid #1D1D35;
        border-bottom: 1px solid #1D1D35;
        &-input{
            font-family: Segoe UI;
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 19px;
            width: 100%;
            padding: 8px 10px;
            color: var(--modal-font-color);
            background:#1D1D35;
            border: 0.7 px solid var(--modal-input-border-color);
            border-radius: 3px;
            text-align: left;
            &::placeholder{
                color: #40406B;
            }
        }
        &-title{
            font-size: 14px;
            line-height: 140%;
            color: #CFCFE4;
            text-align: left;
            padding: 24px 24px 6px;
        }
        &_padding{
            padding: 0px 24px 22px;
        }
      
    }  
    &__buttons{
        display: flex;
        padding: 20px 24px;
        .base-button_enter{
            margin-right: 22px;
            font-weight: 500;
            font-size: 16px;
            line-height: 140%;
            text-align: center;
            color: #252544;
        }
    }
}
</style>