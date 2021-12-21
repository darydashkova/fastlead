<template>
    <div class="settings-finance__rates">
    <div class="settings-finance__rates_title">Срок подписки</div>
        <div class="settings-finance__payment">
            <div class="settings-finance__type-payment">
            <div class="settings-finance__type-payment_mounth"
            v-for="(mounths, index) in mounth" :key="index" :id = "mounths.id" :class="{'tariff_active-payment' : mounths.active}" @click="searchMounth(mounths)"
            >{{mounths.count + mounths.name}}
                <div class="settings-finance__type-payment_mounth-seil">Скидка - {{mounths.seil}}%</div>
            </div>
            </div>
        </div>
        <div class="settings-finance__rates_title">Каналы</div>
        <table class="settings-finance__info_wrapper settings-finance__calculator">
            <tr class="settings-finance__calculator_titles">
            <td v-for="(calculatorTitle, index) in calculatorTitles" :key="calculatorTitle.name">{{calculatorTitle.name}}</td>
            </tr>
            <tr class="settings-finance__calculator_values" v-for="(cannalInfo, index) in cannalsInfo" :key="index">
                <td class="settings-finance__calculator_values-cell">
                <img src="../../../../assets/logos_whatsapp.svg" v-if="cannalInfo.name == 'WhatsApp'">
                <img class="img-instagram" src="../../../../assets/free-icon-instagram.svg" v-else>
                {{cannalInfo.name}}</td>
                <td class="settings-finance__calculator_values-cell">{{cannalInfo.onePriceWithSail.toLocaleString('ru')}} ₽/канал</td>
                <td class="settings-finance__calculator_values-cell settings-finance__btn">
                    <button class="settings-finance__btn_minus" @click="`${cannalInfo.count--}`" v-if="cannalInfo.count > 0">
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.25 9.25H6.75C6.33579 9.25 6 9.58579 6 10C6 10.4142 6.33579 10.75 6.75 10.75H14.25C14.6642 10.75 15 10.4142 15 10C15 9.58579 14.6642 9.25 14.25 9.25Z" fill="#CFCFE4"/>
                            <rect x="1" y="0.5" width="19" height="19" rx="2.5" stroke="#CFCFE4"/>
                        </svg>
                    </button>
                    <button class="settings-finance__btn_minus" v-else>
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.25 9.25H6.75C6.33579 9.25 6 9.58579 6 10C6 10.4142 6.33579 10.75 6.75 10.75H14.25C14.6642 10.75 15 10.4142 15 10C15 9.58579 14.6642 9.25 14.25 9.25Z" fill="#CFCFE4"/>
                            <rect x="1" y="0.5" width="19" height="19" rx="2.5" stroke="#CFCFE4"/>
                        </svg>
                    </button>
                    <span>{{cannalInfo.count}}</span>
                    <button class="settings-finance__btn_plus" @click="`${cannalInfo.count++}`">
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0)">
                                <path d="M14.25 9.25H11.25V6.25C11.25 6.05109 11.171 5.86032 11.0303 5.71967C10.8897 5.57902 10.6989 5.5 10.5 5.5C10.3011 5.5 10.1103 5.57902 9.96967 5.71967C9.82902 5.86032 9.75 6.05109 9.75 6.25V9.25H6.75C6.55109 9.25 6.36032 9.32902 6.21967 9.46967C6.07902 9.61032 6 9.80109 6 10C6 10.1989 6.07902 10.3897 6.21967 10.5303C6.36032 10.671 6.55109 10.75 6.75 10.75H9.75V13.75C9.75 13.9489 9.82902 14.1397 9.96967 14.2803C10.1103 14.421 10.3011 14.5 10.5 14.5C10.6989 14.5 10.8897 14.421 11.0303 14.2803C11.171 14.1397 11.25 13.9489 11.25 13.75V10.75H14.25C14.4489 10.75 14.6397 10.671 14.7803 10.5303C14.921 10.3897 15 10.1989 15 10C15 9.80109 14.921 9.61032 14.7803 9.46967C14.6397 9.32902 14.4489 9.25 14.25 9.25Z" fill="#CFCFE4"/>
                            </g>
                            <rect x="1" y="0.5" width="19" height="19" rx="2.5" stroke="#CFCFE4"/>
                            <defs>
                                <clipPath id="clip0">
                                    <rect width="18" height="18" fill="white" transform="translate(1.5 1)"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                </td>
                <!--<td class="settings-finance__calculator_values-cell">
                    <button class="settings-finance__btn_reset" @click="resetWhatsNumber()">Очистить</button>
                </td>-->
                <td class="settings-finance__calculator_values-cell">{{cannalInfo.totalPrice.toLocaleString('ru')}}₽</td>
            </tr>
        </table>
        <div class="settings-finance__total">
            <h2>Итого к оплате</h2>
            <h2>{{initialValues.priceWithSeil.toLocaleString('ru')}} ₽</h2>
        </div>
        <div class="settings-finance__total settings-finance__total_without-discount" v-if="!mounth[0].active && initialValues.priceWithSeil > 0">
            <h2>Цена без скидки</h2>
            <h2>{{initialValues.totalPrice.toLocaleString('ru')}} ₽</h2>
        </div>
        <hr class="settings-finance__total_hr">
        <div class="settings-finance__pay">
            <button type="button" class="settings-finance__pay-button" @click="createSubscription()">Оплатить</button>
             
        </div>
    </div> 
    
    <Payment v-if="isModalOpen" @closePay="closePay()"></Payment>
</template>
<script>
import { ref, onMounted, onUpdated, watch } from 'vue'
import Payment from '@/components/SettingsContainer/SettingsFinanse/settings-finance-payment.vue'
import { useFinance } from "@/composition/useFinance";
export default {
    components: {
        Payment,
    },
    setup() {

        const {/* createFinance, getSingleFinance, returnFinance, updateFinance, returnFinanceHistory, paymentFinance, linkPayment,  */routerTrue, returnSale, initialData} = useFinance();

        routerTrue.value.link = "/settings/finance/rates"

        const mounth = ref([
            {id:1, name: " месяц", active:true, seil: 0, count: 1},
            {id:2, name: " месяца", active:false, seil: 10, count: 3},
            {id:3, name: " месяцев", active:false, seil: 15, count: 6},
            {id:4, name: " месяцев", active:false, seil: 20, count: 12},
        ])
    
        const calculatorTitles = ref([
            {name: "НАИМЕНОВАНИЕ КАНАЛА"},
            {name: "СТОИМОСТЬ"},
            {name: "КОЛ-ВО"},
            /* {name: "ОПЦИИ"}, */
            {name: "ИТОГО"},
        ])

        const cannalsInfo = ref([
            {name: "WhatsApp", onePrice: 1500, onePriceWithSail: 0, count: 0, totalPrice: 0},
            {name: "Instagram", onePrice: 1500,  onePriceWithSail: 0, count: 0, totalPrice: 0},
        ])

        const initialValues = ref({
            sale_id: 1,

            totalPrice: 0,
            priceWithSeil: 0,
        })

        const searchMounth = (seil, index) => {
            for (let i = 0; i<mounth.value.length; i++) {
                mounth.value[i].active = false;
            }
            mounth.value[seil.id - 1].active=true;

            assignmentMounthValues()
        } 

        const assignmentMounthValues = () => {
            for(let i = 0; i < Object.keys(mounth.value).length; i++){
                if(mounth.value[i].active){
                    initialData.value.sale_id = mounth.value[i].id
                }
            }
        }

        const calculation = () => {
            let priceWhats = 0;
            let priceInst = 0;
            let total = 0;
            priceWhats = (cannalsInfo.value[0].onePrice * cannalsInfo.value[0].count)
            priceInst = (cannalsInfo.value[1].onePrice * cannalsInfo.value[1].count)
                for(let i = 0; i < Object.keys(mounth.value).length; i++){
                    if(mounth.value[i].active){
                        cannalsInfo.value[0].totalPrice = (priceWhats * mounth.value[i].count) - (priceWhats * mounth.value[i].count * mounth.value[i].seil)/100
                        cannalsInfo.value[1].totalPrice = (priceInst * mounth.value[i].count) -(priceInst * mounth.value[i].count * mounth.value[i].seil)/100

                        cannalsInfo.value[0].onePriceWithSail = (cannalsInfo.value[0].onePrice * mounth.value[i].count) -  ((cannalsInfo.value[0].onePrice * mounth.value[i].count) * mounth.value[i].seil)/100
                        cannalsInfo.value[1].onePriceWithSail = (cannalsInfo.value[1].onePrice * mounth.value[i].count) -  ((cannalsInfo.value[1].onePrice * mounth.value[i].count) * mounth.value[i].seil)/100

                        initialValues.value.totalPrice = (priceWhats * mounth.value[i].count) + (priceInst *  mounth.value[i].count)
                        initialValues.value.priceWithSeil = cannalsInfo.value[0].totalPrice + cannalsInfo.value[1].totalPrice
                    }
                }
            
            initialData.value.parameters[0].whatsapp = cannalsInfo.value[0].count
            initialData.value.parameters[0].instagram = cannalsInfo.value[1].count

        }
        const isModalOpen = ref(false)

        const createSubscription = () => {
            isModalOpen.value = true
        }

        const closePay = () => {
            isModalOpen.value = false
        }

        watch(() => {
            calculation()
        })

        

        return {
            calculatorTitles,
            mounth,
            initialValues,
            cannalsInfo,

            searchMounth,
            assignmentMounthValues,

            calculation,
            initialData,
            createSubscription,
            isModalOpen,
            closePay,
        }
    }
}
</script>

<style lang="scss" src="./rates.scss"></style>