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
                        <td class="settings-finance-payment__info-main_title settings-finance-payment__info_cell">Срок подписки:</td>
                    </tr>
                    <div class="mounth__list">
                        <div class="mounth__element" v-for="(mounth, index) in mounths" :key="index" :class="{'mounth-active' : mounth.active}"  @click="searchMounth(mounth.id)">
                            <div class="mounth__element_mounth">{{mounth.name}}</div>
                            <div class="mounth__element_seil">{{mounth.seil}}</div>
                        </div>
                    </div>
                </table>
                <table class="settings-finance-payment__info-main">
                    <tr class="settings-finance-payment__info_row">
                        <td class="settings-finance-payment__info-main_title settings-finance-payment__info_cell">Каналы:</td>
                    </tr>
                    <tr class="settings-finance-payment__info_row settings-finance-payment__info-main_subtitle" v-if="initialValues.parameters[0].whatsapp != 0">
                        <td>WhatsApp -  
                             <span>{{initialValues.parameters[0].whatsapp}}</span>
                         </td>
                        
                        <td class="settings-finance-payment__info_cell settings-finance-payment__info-main_title">
                            <span>{{totalPriceCannals.totalWhatsapp.toLocaleString('ru')}}₽</span>
                        </td>
                    </tr>
                    <tr class="settings-finance-payment__info_row settings-finance-payment__info-main_subtitle" v-if="initialValues.parameters[0].instagram != 0">
                        <td>Instagram -  
                            <span>{{initialValues.parameters[0].instagram}}</span>
                        </td>
                        <td class="settings-finance-payment__info_cell settings-finance-payment__info-main_title">
                            <span>{{totalPriceCannals.totalInstagram.toLocaleString('ru')}}₽</span>
                        </td>
                    </tr>
                </table>
                
                <div class="settings-finance-payment__method_title">Способ оплаты:</div>
                <div class="settings-finance-payment__method_type">
                    <div :id = "type[0].id" class="settings-finance-payment__method_type-card" :class="{'settings-finance-payment__method_type-active' : type[0].active}" @click="searchType(type[0])">
                        Банковской картой 
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
            <table class="settings-finance-payment__info-total">
                    <tr class="settings-finance-payment__info_row">
                        <td class="settings-finance-payment__info-total_title settings-finance-payment__info_cell">Итого к оплате:</td>
                        <td class="settings-finance-payment__info-total_subtitle settings-finance-payment__info_cell">{{defaultPrice.price.toLocaleString('ru')}}₽</td>
                    </tr>
                </table>
            <div class="settings-finance-payment__buttons">
                <div class="settings-finance-payment__buttons_cancel" @click="closePay">Отмена</div>
                <a><div class="settings-finance-payment__buttons_payment" @click="payment()">Оплатить</div></a>
            </div>
        </div>
    </div>
</template>

<script>
    import { ref, watch, onUpdated } from 'vue'
    import { useFinance } from "@/composition/useFinance";
    export default {
    props: {
        modalPayment: Object,
        payment: Object,
    },
    setup(props, {emit}){
        
        const {initialData, createFinance, paymentFinance} = useFinance()

        const mounths = ref([
            {name: "1 месяц", seil: "", active: false, id: 1, value: 0, count: 1,},
            {name: "3 месяца", seil: "Скидка - 10%", active: false, id: 2, value: 10, count: 3,},
            {name: "6 месяцев", seil: "Скидка - 15%", active: false, id: 3, value: 15, count: 6,},
            {name: "1 год", seil: "Скидка - 20%", active: false, id: 4, value: 20, count: 12,},
        ])

        const defaultPrice = ref({
            price: 0,
            priceOneWhats: 1500,
            priceOneInst: 1500,
            })

        const initialValues = ref({
           /*  user_tariff_id: 0,
            whatsapp_tariff_id: 0,
            instagram_tariff_id: 0, */
            sale_id: 1,
            parameters: [
                {
                    whatsapp: 0,
                    instagram: 0,
                }
            ]
        })

        const openUpdate = () => {
            initialValues.value.sale_id = initialData.value.sale_id
            initialValues.value.parameters[0].whatsapp = initialData.value.parameters[0].whatsapp
            initialValues.value.parameters[0].instagram = initialData.value.parameters[0].instagram

            for(i = 0; i< Object.keys(mounths.value).length; i++){
                if(initialValues.value.sale_id == mounths.value[i].id){
                    mounths.value[i].active = true
                }
            }
        }

        const totalPriceCannals = ref({
            totalWhatsapp: 0,
            totalInstagram: 0,
        })

        const updateValues = () => {
            for(i = 0; i< Object.keys(mounths.value).length; i++){
                if(mounths.value[i].active){
                    let priceWithoutSeil = 0

                    priceWithoutSeil = (initialValues.value.parameters[0].whatsapp * defaultPrice.value.priceOneWhats * mounths.value[i].count) + (initialValues.value.parameters[0].instagram * defaultPrice.value.priceOneInst * mounths.value[i].count)
                    defaultPrice.value.price = priceWithoutSeil - ((priceWithoutSeil * mounths.value[i].value)/100)

                    totalPriceCannals.value.totalWhatsapp = (initialValues.value.parameters[0].whatsapp * defaultPrice.value.priceOneWhats * mounths.value[i].count) - (((initialValues.value.parameters[0].whatsapp * defaultPrice.value.priceOneWhats * mounths.value[i].count) * mounths.value[i].value)/100)
                    totalPriceCannals.value.totalInstagram = (initialValues.value.parameters[0].instagram * defaultPrice.value.priceOneInst * mounths.value[i].count) - (((initialValues.value.parameters[0].instagram * defaultPrice.value.priceOneInst * mounths.value[i].count) * mounths.value[i].value)/100)
                }            
            }
        }

        openUpdate()

        const modalPay = ref({
            show: false
        })
        const closePay = () => {
            emit('closePay');
        }
        const type = ref([
            {id:0, active:true},
            {id:1, active:false},
        ])
        const searchType = (element) => {
            for (let i = 0; i<type.value.length; i++) {
                type.value[i].active = false;
            }
            type.value[element.id].active=true;
        }

        const searchMounth = (id) => {
            for (let i = 0; i < Object.keys(mounths.value).length; i++){
                mounths.value[i].active = false;
                
            }
            mounths.value[id-1].active = true
            initialValues.value.sale_id = mounths.value[id-1].id
            
        }
        
        const payment = () => {
            createFinance(initialValues.value)
            .then( r => {
                initialValues.value.user_tariff_id = r.user_tariff_id
                paymentFinance({user_tariff_id: initialValues.value.user_tariff_id})
                .then( r => {
                    document.location.href = r.link
                    return r;
                })
                
                return r;
            })
        }

        watch(() => {
          updateValues()  
        })
        

        return {
            type,
            mounths,

            modalPay,
            closePay,

            searchType,
            searchMounth,

            defaultPrice,
            initialValues,

            updateValues,
            openUpdate,

            payment,
            paymentFinance,

            totalPriceCannals,
        }
    }
}
</script>

<style lang="scss" src="./settings-finance-payment.scss"></style>