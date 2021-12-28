<template>
<div class="settings-finance__history">
        <div class="settings-finance__title">
                <h2>История платежей</h2>
        </div>
            <table class="settings-finance__list" v-if="!finances[0]">
                <tr class="settings-finance__list_titles">
                    <td class="settings-finance__list_titles-items"
                    v-for="(listTitle, index) in listTitles" :key="index"
                    >{{listTitle.title}}</td>
                </tr>
            </table> 
            <div class="settings-finance-createAmenities row-data-none" v-if="!finances[0]">У вас еще нет подключенных тарифов
            <router-link to="/settings/finance/rates" class="row-data-none__link"><div class="row-data-none__button pointer">Подключить</div></router-link>
            </div>
                <table class="settings-finance__list" style="border-radius: 6px;" v-else>
                    <tr class="settings-finance__list_titles">
                        <td class="settings-finance__list_titles-items"
                        v-for="(listTitle, index) in listTitles" :key="index"
                        >{{listTitle.title}}</td>
                    </tr>
                </table>
                <div class="scroll-block scroll-poiner" v-if="finances[0]">
                <table class="settings-finance__list" style="border-radius: 6px;">
                    <tr class="settings-finance-createAmenities" v-for="(finance, index) in finances" :key="index">
                    <td class="settings-finance-createAmenities__cell" v-if="finance.instagram_tariff_id">
                    <img src="../../../assets/free-icon-instagram.svg" class="img-instagram">
                    Instagram</td>
                    <td class="settings-finance-createAmenities__cell" v-else>
                    <img src="../../../assets/logos_whatsapp.svg">
                    WhatsApp</td>
                    <td class="settings-finance-createAmenities__cell">
                        <div class="settings-finance-createAmenities__instagram">
                            <span class="settings-finance-createAmenities__instagram_text">
                                {{finance.count}}
                            </span>
                        </div>
                    </td>
                    <td class="settings-finance-createAmenities__cell" v-if="finance.status == 'waiting'">{{finance.price.toLocaleString('ru')}}₽</td>
                    <td class="settings-finance-createAmenities__cell" v-else-if="finance.all_price == 0">{{finance.old_price.toLocaleString('ru')}}₽</td>
                    <td class="settings-finance-createAmenities__cell" v-else>{{(finance.all_price + finance.old_price).toLocaleString('ru')}}₽</td>
                    <template v-for="(statusCount, status) in statusCounts" :key="status">
                    <td class="settings-finance-createAmenities__cell settings-finance-createAmenities__status" v-if="finance.status == statusCount.status">
                        <div class="name" v-if="finance.status != 'waiting'" :class="{
                            'settings-finance-createAmenities__status_name-completed' : finance.status == 'completed',
                            'settings-finance-createAmenities__status_name-successful': finance.status == 'success'}">
                            {{statusCount.name + new Date(finance.end_date * 1000).toLocaleDateString()}}
                        </div>
                        <div class="name" v-else :class="{
                            'settings-finance-createAmenities__status_name-error' : finance.status == 'waiting'}">
                            {{statusCount.name}}
                        </div>
                    </td>
                    </template>
                    <td class="settings-finance-createAmenities__button settings-finance-createAmenities__cell">
                        <div class="settings-finance-createAmenities__button_delete" v-if="finance.status == 'waiting'" @click="deleteTariff(finance.whatsapp_tariff_id, finance.instagram_tariff_id)" >Удалить</div>
                        <div class="settings-finance-createAmenities__button_payment" v-if="finance.status == 'waiting'" @click="payFromHistory(finance.whatsapp_tariff_id, finance.instagram_tariff_id)">Оплатить</div>
                        <div class="settings-finance-createAmenities__button_payment" v-else @click="changeFromTariff(finance.whatsapp_tariff_id, finance.instagram_tariff_id)">Продлить</div> <!--finance.user_tariff_id-->
                    </td>
                    </tr>
                   
                </table>
                 </div>
    </div>
    <FinanceExtension v-if="isModalChange" @closeChange="closeChange()"></FinanceExtension>
    <PaymentHistory v-if="isModalHistory" @closeHistory="closeHistory()"></PaymentHistory>
</template>

<script>
import { ref, onUpdated } from 'vue'
import { useFinance } from "@/composition/useFinance";
import { onMounted, onBeforeMount, watch } from 'vue';
import Payment from '@/components/SettingsContainer/SettingsFinanse/settings-finance-payment.vue'
import FinanceExtension from '@/components/SettingsContainer/SettingsFinanse/settings-finance-extension.vue'
import PaymentHistory from '@/components/SettingsContainer/SettingsFinanse/settings-finance-pay-history.vue'
export default {
    components: {
        Payment,
        FinanceExtension,
        PaymentHistory,
    },

    setup(props, {emit}){

        const {getFinance, getSingleFinance, returnFinance, getFinanceHistory, returnFinanceHistory, paymentFinance, linkPayment, finances, deleteFinance} = useFinance()
        
        const falseUpdated = ref(true)

        const mouthCounts = ref([
            {id:1, mounth: 1, name: " месяц"},
            {id:2, mounth: 3, name: " месяца"},
            {id:3, mounth: 6, name: " месяцев"},
            {id:4, mounth: 12, name: " месяцев"},
        ])

        const statusCounts = ref([
            {status: "waiting", name: "Ожидает оплаты"},
            {status: "success", name: "Оплачен до "},
            {status: "completed", name: "Завершен "},
        ])

        falseUpdated.value = true

        const listTitles = ref([
            {title: "КАНАЛ"},
            {title: "КОЛ-ВО"},
            {title: "СУММА"},
            {title: "ДАТА ОКОНЧАНИЯ"},
            {title: "ОПЦИИ"},
        ])

        const restore = (id) => {
            getSingleFinance(id)
        }

        const initialPaymentData = ref({
            user_tariff_id: 0,
            whatsapp_tariff_id : 0,
            instagram_tariff_id: 0,
        })

        const updatePaymentData = () => {
            initialPaymentData.value.user_tariff_id = returnFinance.value.user_tariff_id
        }

        onUpdated(()=> {
            updatePaymentData()
        })


        const payFromHistory = (whatsapp_id, instagram_id) => {
            let tariff_name = ""
            if(whatsapp_id){
                tariff_name = "whatsapp_tariff_id"
                getSingleFinance(tariff_name ,whatsapp_id)
                initialPaymentData.value.whatsapp_tariff_id = whatsapp_id
            }else{
                tariff_name = "instagram_tariff_id"
                getSingleFinance(tariff_name, instagram_id)
                initialPaymentData.value.instagram_tariff_id = instagram_id
            }
            paymentFinance(initialPaymentData.value)
                .then(r => {
                    linkPayment.value = r
                    if (r.error) {
                    
                    return;
                    }
                })
    
            isModalHistory.value = true
        }

        const deleteTariff = (whatsapp_id, instagram_id) => {
            if(whatsapp_id){
                deleteFinance({whatsapp_tariff_id: whatsapp_id})
            } else {
                deleteFinance({instagram_tariff_id: instagram_id})
            }
            getFinance()
        }

        const changeFromTariff = (whatsapp_id, instagram_id) => {
            let tariff_name = ""
            if(whatsapp_id){
                tariff_name = "whatsapp_tariff_id"
                getSingleFinance(tariff_name ,whatsapp_id)
                initialPaymentData.value.whatsapp_tariff_id = whatsapp_id
            }else{
                tariff_name = "instagram_tariff_id"
                getSingleFinance(tariff_name, instagram_id)
                initialPaymentData.value.instagram_tariff_id = instagram_id
            }
            
            isModalChange.value = true
        }

        const isModalOpen = ref(false)
        const isModalChange = ref(false)
        const isModalHistory = ref(false)

        const closeHistory = () =>{
            isModalHistory.value = false 
        }

        const closeChange = () => {
            isModalChange.value = false
        }

        const closePay = () => {
            isModalOpen.value = false
        }

        onBeforeMount(() => {
            getFinance()
            .then(r => {
  

                return r;
            })
        })
         
        return {
            listTitles,
            finances,
            restore,
            returnFinance,
            returnFinanceHistory,
            payFromHistory,
            isModalOpen,
            closePay,
            initialPaymentData,
            linkPayment,
            changeFromTariff,
            isModalChange,
            closeChange,
            falseUpdated,
            mouthCounts,
            statusCounts,
            isModalHistory,
            closeHistory,
            deleteTariff,
        }
    }
}
</script>

<style lang="scss" src="./settings-finance-createAmenities.scss"></style>