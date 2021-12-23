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
            <!--<div class="settings-partners-profit-cashback__block_option">
                <button class="settings-partners-profit-cashback__block_option-button"
                v-for="(buttonName, index) in buttonNames" :key="index"
                :id = "option[index].id" :class="{'option-active' : option[index].active}" @click="searchOption(option[index])"
                >{{buttonName.name}}</button>
            </div>-->
            <div class="settings-partners-profit-cashback__block_main">
                <p class="settings-partners-profit-cashback__block_main-title">Сумма</p>
                <input v-if="!error.available" v-model="sumPayment" type="number" placeholder="Ввести (Минимум 10 000 ₽)" class="settings-partners-profit-cashback__block_main-input" :class="{'placeholder-error': error.introduced}">
                <input v-else v-model="sumPayment" type="number" placeholder="Недостаточно средств для вывода" class="settings-partners-profit-cashback__block_main-input" :class="{'placeholder-error': error.introduced}">
            </div>
            <div class="settings-partners-profit-cashback__block_main main-card">
                <p class="settings-partners-profit-cashback__block_main-title">Номер карты</p>
                <input v-if="!error.card" v-model="cardNumber" v-maska="'#### #### #### ####'" type="text" maxlength="19" placeholder="Ввести" class="settings-partners-profit-cashback__block_main-input">
                <input v-else v-model="cardNumber" v-maska="'#### #### #### ####'" type="text" maxlength="19" placeholder="Реквизиты карты введены неверно" class="settings-partners-profit-cashback__block_main-input" :class="{'placeholder-error': error.introduced}">
            </div>
            <div class="settings-partners-profit-cashback__block_buttons">
                <div type="button" class="settings-partners-profit-cashback__block_buttons-access" @click="createNewPayment()">Готово</div>
                <div type="button" class="settings-partners-profit-cashback__block_buttons-cansel" @click="closeModalCashback">Отмена</div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onUpdated } from 'vue'
import { usePartners } from "@/composition/usePartners";
export default {
    props: {
        count: Number,
    },
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

        const error = ref({
            available: false,
            introduced: false,
            card: false,
        })

        const createNewPayment = () => {
            if(sumPayment.value >= 10000 && props.count >= 10000 && props.count >= sumPayment.value && cardNumber.value.length == 19) {
                createPayment({card_number: cardNumber.value,
                                sum: Number(sumPayment.value)})
                closeModalCashback()
            } else if (sumPayment.value < 10000) {
                error.value.introduced = true
                sumPayment.value = ''
            } else if (cardNumber.value.length < 19){
                error.value.card = true
                error.value.introduced = true
                cardNumber.value = ''
            } else {
                error.value.introduced = true
                error.value.available = true
                sumPayment.value = ''
            }
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
           error,

           count: computed(() => props.count),
        }
    }
}
</script>

<style lang="scss" src="./settings-partners-profit-cashback.scss"></style>