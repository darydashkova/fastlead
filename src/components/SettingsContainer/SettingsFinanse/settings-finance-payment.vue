<template>
    <div class="settings-finance-payment-shadow">
        <div class="settings-finance-payment">
            <div class="settings-finance-payment__header">
                    <span class="settings-finance-payment__header_title">Подлючение подписки</span>
                    <svg class="settings-finance-payment__header_close" @click="closePay" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#9797BB"/>
                    </svg>
            </div>
            <div class="settings-finance-payment__info">
                <table class="settings-finance-payment__info-main">
                    <tr class="settings-finance-payment__info_row">
                        <td class="settings-finance-payment__info-main_title settings-finance-payment__info_cell">Подписка:</td>
                    </tr>
                    <tr class="settings-finance-payment__info_row settings-finance-payment__info-main_subtitle">
                        <td>Тариф 
                        <template v-for="(tariffName, index) in tariffNames" :key="index"><span v-if="returnFinanceHistory.tariff_id == index+1">{{tariffName.name}}</span></template>
                             на 
                             <template v-for="(mounthCount, index) in mounthCounts" :key="index"><span v-if="returnFinanceHistory.sale_id == index+1">{{mounthCount.value}}</span></template>
                             меся<span v-if="returnFinanceHistory.sale_id == 1">ц</span>
                            <span v-if="returnFinanceHistory.sale_id == 2 || returnFinanceHistory.sale_id == 5">ца</span>
                            <span v-if="returnFinanceHistory.sale_id == 3 || returnFinanceHistory.sale_id == 4">цев</span>
                         </td>
                        <td class="settings-finance-payment__info_cell settings-finance-payment__info-main_title">{{initialData.price}}₽</td>
                    </tr>
                </table>
                <table class="settings-finance-payment__info-main">
                    <tr class="settings-finance-payment__info_row">
                        <td class="settings-finance-payment__info-main_title settings-finance-payment__info_cell">Каналы:</td>
                    </tr>
                    <tr class="settings-finance-payment__info_row settings-finance-payment__info-main_subtitle">
                        <td>WhatsApp -  
                             <span>{{initialData.whatsapp}}</span>
                         </td>
                        <td class="settings-finance-payment__info_cell settings-finance-payment__info-main_title">{{initialData.whatsappPrice}}₽</td>
                    </tr>
                    <tr class="settings-finance-payment__info_row settings-finance-payment__info-main_subtitle">
                        <td>Instagram -  
                            <span>{{initialData.instagram}}</span>
                        </td>
                        <td class="settings-finance-payment__info_cell settings-finance-payment__info-main_title">{{initialData.instagramPrice}}₽</td>
                    </tr>
                </table>
                <table class="settings-finance-payment__info-total">
                    <tr class="settings-finance-payment__info_row">
                        <td class="settings-finance-payment__info-total_title settings-finance-payment__info_cell">Итого к оплате</td>
                        <td class="settings-finance-payment__info-total_subtitle settings-finance-payment__info_cell">{{initialData.price}}₽</td>
                    </tr>
                </table>
            </div>
            <div class="settings-finance-payment__method">
                <div class="settings-finance-payment__method_title">Способ оплаты</div>
                <div class="settings-finance-payment__method_type">
                    <div :id = "type[0].id" class="settings-finance-payment__method_type-card" :class="{'settings-finance-payment__method_type-active' : type[0].active}" @click="searchType(type[0])">
                        Банковской картой 
                        <span>
                            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.8777 0.790585C12.0272 0.633889 12.1991 0.555542 12.3935 0.555542C12.5878 0.555542 12.7598 0.633889 12.9093 0.790585C13.0438 0.931611 13.1111 1.10789 13.1111 1.31943C13.1111 1.53097 13.0438 1.70725 12.9093 1.84828L5.75535 9.39315C5.7404 9.40882 5.72545 9.42449 5.7105 9.44016C5.69555 9.45583 5.6806 9.4715 5.66565 9.48717C5.53109 9.64386 5.3629 9.72221 5.16106 9.72221C4.95922 9.72221 4.79103 9.64386 4.65647 9.48717L1.09072 5.77349C0.956167 5.63246 0.888889 5.45618 0.888889 5.24464C0.888889 5.03311 0.956167 4.85683 1.09072 4.7158C1.24023 4.5591 1.41216 4.48076 1.60652 4.48076C1.80088 4.48076 1.97282 4.5591 2.12232 4.7158L5.14985 7.88888L11.8777 0.790585Z" fill="#40406B"/>
                            </svg>
                        </span>
                    </div>
                    <div style="display:none;" :id = "type[1].id" class="settings-finance-payment__method_type-cash" :class="{'settings-finance-payment__method_type-active' : type[1].active}" @click="searchType(type[1])">
                        Безналичный расчет
                        <span>
                            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.8777 0.790585C12.0272 0.633889 12.1991 0.555542 12.3935 0.555542C12.5878 0.555542 12.7598 0.633889 12.9093 0.790585C13.0438 0.931611 13.1111 1.10789 13.1111 1.31943C13.1111 1.53097 13.0438 1.70725 12.9093 1.84828L5.75535 9.39315C5.7404 9.40882 5.72545 9.42449 5.7105 9.44016C5.69555 9.45583 5.6806 9.4715 5.66565 9.48717C5.53109 9.64386 5.3629 9.72221 5.16106 9.72221C4.95922 9.72221 4.79103 9.64386 4.65647 9.48717L1.09072 5.77349C0.956167 5.63246 0.888889 5.45618 0.888889 5.24464C0.888889 5.03311 0.956167 4.85683 1.09072 4.7158C1.24023 4.5591 1.41216 4.48076 1.60652 4.48076C1.80088 4.48076 1.97282 4.5591 2.12232 4.7158L5.14985 7.88888L11.8777 0.790585Z" fill="#40406B"/>
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
            <div class="settings-finance-payment__buttons">
                <button class="settings-finance-payment__buttons_cancel" @click="closePay">Отмена</button>
                <a :href="linkPayment.link"><button class="settings-finance-payment__buttons_payment" @click="payment()">Оплатить</button></a>
            </div>
        </div>
    </div>
</template>

<script>
    import { ref, onUpdated } from 'vue'
    import { useFinance } from "@/composition/useFinance";
    export default {
    props: {
        modalPayment: Object,
        payment: Object,
    },
    setup(props, {emit}){
        
        const {returnFinance, finance, getFinance, getSingleFinance, returnFinanceHistory, paymentFinance, linkPayment} = useFinance()

        const tariffNames = ref([
            {name: "Base"},
            {name: "Start"},
            {name: "Pro"},
        ])

        const mounthCounts = ref([
            {value: 1},
            {value: 3},
            {value: 6},
            {value: 12},
            {value: 24},
        ])
        const modalPay = ref({
            show: false
        })
        const closePay = () => {
            emit('closePay');
        }
        const type = ref([   //initial type tariff block
            {id:0, active:true},
            {id:1, active:false},
        ])
        const searchType = (element) => { //assigning an active class to a block
            for (let i = 0; i<type.value.length; i++) {
                type.value[i].active = false;
            }
            type.value[element.id].active=true;
        }

        const initialData = ref({
            price: 0,
            countNum: 0,
            whatsapp: 0,
            instagram: 0,
            whatsappPrice: 0,
            instagramPrice: 0,
            priceCanals: 0,
        })

        

        const updateData = () => {
            initialData.value.price = returnFinanceHistory.value.price
            initialData.value.countNum = returnFinanceHistory.value.parameters[0].whatsapp + returnFinanceHistory.value.parameters[0].instagram
            initialData.value.whatsapp = returnFinanceHistory.value.parameters[0].whatsapp
            initialData.value.instagram = returnFinanceHistory.value.parameters[0].instagram
            if (returnFinanceHistory.value.tariff_id == 2){
                initialData.value.priceCanals = 950 
            } else {
                initialData.value.priceCanals = 2100
            }
            console.log(mounthCounts.value)
            initialData.value.whatsappPrice = returnFinanceHistory.value.parameters[0].whatsapp * initialData.value.priceCanals;
            initialData.value.instagramPrice = returnFinanceHistory.value.parameters[0].instagram * initialData.value.priceCanals;
        }

        onUpdated(() => {
            updateData()
        })

        return {
            tariffNames,
            mounthCounts,

            searchType,
            type,
            modalPay,
            closePay,

            initialData,
            updateData,

            finance,
            returnFinance,
            returnFinanceHistory,

            linkPayment,
        }
    }
}
</script>

<style lang="scss" src="./settings-finance-payment.scss"></style>