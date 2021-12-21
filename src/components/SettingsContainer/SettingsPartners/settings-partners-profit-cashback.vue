<template>
    <div class="settings-partners-profit-cashback">
        <div class="settings-partners-profit-cashback__block">
            <div class="settings-partners-profit-cashback__block_header">
                <h2 class="settings-partners-profit-cashback__block_header-title">Вывести</h2>
                <button class="settings-partners-profit-cashback__block_header-close" type="button" @click="closeModalCashback">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#9797BB"/>
                    </svg>
                </button>
            </div>
            <div class="settings-partners-profit-cashback__block_option">
                <button class="settings-partners-profit-cashback__block_option-button"
                v-for="(buttonName, index) in buttonNames" :key="index"
                :id = "option[index].id" :class="{'option-active' : option[index].active}" @click="searchOption(option[index])"
                >{{buttonName.name}}</button>
            </div>
            <div class="settings-partners-profit-cashback__block_main">
                <p class="settings-partners-profit-cashback__block_main-title">Сумма</p>
                <input v-model="sumPayment" type="number" placeholder="Ввести (Минимум 3 000 ₽)" class="settings-partners-profit-cashback__block_main-input">
            </div>
            <div class="settings-partners-profit-cashback__block_main main-card">
                <p class="settings-partners-profit-cashback__block_main-title">Номер карты</p>
                <input v-model="cardNumber" v-maska="'#### #### #### ####'" type="text" maxlength="19" placeholder="Ввести" class="settings-partners-profit-cashback__block_main-input">
            </div>
            <div class="settings-partners-profit-cashback__block_buttons">
                <button type="button" class="settings-partners-profit-cashback__block_buttons-access" @click="createNewPayment()">Готово</button>
                <button type="button" class="settings-partners-profit-cashback__block_buttons-cansel" @click="closeModalCashback">Отмена</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onUpdated } from 'vue'
import { usePartners } from "@/composition/usePartners";
export default {
    setup(props, {emit}){
        const {getPayment, createPayment, payments} = usePartners()

        const closeModalCashback = () => {
            emit('closeModalCashback');
        }

        const buttonNames = ref([
            {name: "Вывести на карту"},
            {name: "На рачетный счет"},
        ])

        const option = ref([
            {id:0, active:true},
            {id:1, active:false},
        ])

        const searchOption = (element) => {
            for (let i = 0; i<option.value.length; i++) {
                option.value[i].active = false;
            }
            option.value[element.id].active=true;
        }

        const sumPayment = ref("")
        const cardNumber = ref("")

        const createNewPayment = () => {
            createPayment({card_number: cardNumber.value,
                            sum: Number(sumPayment.value)})
            getPayment()
        }

        return {
           closeModalCashback,
           buttonNames,
           option,
           searchOption,
           createNewPayment,
           sumPayment,
           cardNumber,
           payments,
        }
    }
}
</script>

<style lang="scss" src="./settings-partners-profit-cashback.scss"></style>