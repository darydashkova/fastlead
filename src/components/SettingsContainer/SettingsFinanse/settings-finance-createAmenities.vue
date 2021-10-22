<template>
<div class="settings-finance__history">
        <div class="settings-finance__title">
                <h2>История платежей</h2>
        </div>
        <div class="scroll">
            <table class="settings-finance__list">
                <tr class="settings-finance__list_titles">
                    <td class="settings-finance__list_titles-items"
                    v-for="(listTitle, index) in listTitles" :key="index"
                    >{{listTitle.title}}</td>
                </tr>
            <tr class="settings-finance-createAmenities"
            v-for="finance in finances"
            :key="finance.user_tariff_id"
            >
                <td class="settings-finance-createAmenities__cell">{{finance.name}}</td>
                <td class="settings-finance-createAmenities__cell">
                    <div class="settings-finance-createAmenities__instagram">
                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0)">
                                <path d="M1.60039 1.08874C0.34306 2.39474 0.600393 
                                3.78207 0.600393 7.99674C0.600393 11.4967 -0.0102735 
                                15.0054 3.18573 15.8314C4.18373 16.0881 13.0264 16.0881 
                                14.0231 15.8301C15.3537 15.4867 16.4364 14.4074 16.5844 
                                12.5254C16.6051 12.2627 16.6051 3.73541 16.5837 3.46741C16.4264
                                 1.46274 15.1924 0.307405 13.5664 0.073405C13.1937 0.019405 
                                 13.1191 0.00340495 11.2071 7.16206e-05C4.42506 0.00340495 
                                 2.93839 -0.298595 1.60039 1.08874Z" fill="#FD6541"/>
                                <path d="M8.59823 2.09274C6.17757 2.09274 3.8789 1.8774 3.0009 4.13074C2.63823 5.0614 2.6909 6.27007 2.6909 8.00074C2.6909 9.5194 2.64223 10.9467 3.0009 11.8701C3.8769 14.1247 6.19423 13.9087 8.5969 13.9087C10.9149 13.9087 13.3049 14.1501 14.1936 11.8701C14.5569 10.9301 14.5036 9.73941 14.5036 8.00074C14.5036 5.69274 14.6309 4.20274 13.5116 3.08407C12.3782 1.95074 10.8456 2.09274 8.59557 2.09274H8.59823ZM8.0689 3.1574C13.1182 3.1494 13.7609 2.58807 13.4062 10.3861C13.2802 13.1441 11.1802 12.8414 8.5989 12.8414C3.89223 12.8414 3.7569 12.7067 3.7569 7.99807C3.7569 3.23474 4.13023 3.16007 8.0689 3.15607V3.1574ZM11.7516 4.13807C11.3602 4.13807 11.0429 4.4554 11.0429 4.84674C11.0429 5.23807 11.3602 5.5554 11.7516 5.5554C12.1429 5.5554 12.4602 5.23807 12.4602 4.84674C12.4602 4.4554 12.1429 4.13807 11.7516 4.13807ZM8.59823 4.96674C6.9229 4.96674 5.5649 6.32541 5.5649 8.00074C5.5649 9.67607 6.9229 11.0341 8.59823 11.0341C10.2736 11.0341 11.6309 9.67607 11.6309 8.00074C11.6309 6.32541 10.2736 4.96674 8.59823 4.96674ZM8.59823 6.0314C11.2016 6.0314 11.2049 9.97007 8.59823 9.97007C5.99557 9.97007 5.99157 6.0314 8.59823 6.0314Z" fill="white"/>
                            </g>
                            <defs>
                                <linearGradient id="paint0_linear" x1="1.63107" y1="14.9781" x2="16.5014" y2="2.10806" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#FFDD55"/>
                                    <stop offset="0.5" stop-color="#FF543E"/>
                                    <stop offset="1" stop-color="#C837AB"/>
                                </linearGradient>
                                <clipPath id="clip0">
                                    <rect width="16" height="16" fill="white" transform="translate(0.600098)"/>
                                </clipPath>
                            </defs>
                        </svg>
                        <span class="settings-finance-createAmenities__instagram_text">
                            Instagram {{finance.parameters[0].instagram}}
                    </span>
                    </div>

                    <div class="settings-finance-createAmenities__whatsapp">
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0)">
                                <path d="M4.82909 13.8639L5.09065 13.9947C6.18065 14.6487 7.40134 14.9539 8.62209 14.9539C12.4586 14.9539 15.5976 11.8149 15.5976 7.97831C15.5976 6.14724 14.8565 4.35974 13.5486 3.05181C12.2406 1.74387 10.4967 1.00274 8.62209 1.00274C4.78552 1.00274 1.64646 4.14174 1.69009 8.02193C1.69009 9.32981 2.08246 10.5942 2.7364 11.6841L2.91077 11.9457L2.21327 14.5179L4.82909 13.8639Z" fill="#18CA7F"/>
                                <path d="M14.2895 2.35425C12.8072 0.828375 10.7582 0 8.66548 0C4.2186 0 0.643601 3.61856 0.687163 8.02188C0.687163 9.417 1.07954 10.7686 1.73354 11.9893L0.599976 16.131L4.82891 15.0411C6.00604 15.6951 7.31391 16.0002 8.62191 16.0002C13.0252 16.0002 16.6002 12.3816 16.6002 7.97837C16.6002 5.84206 15.7718 3.83656 14.2895 2.35425ZM8.66548 14.6488C7.48835 14.6488 6.31123 14.3436 5.30848 13.7332L5.04691 13.6024L2.51829 14.2564L3.17223 11.7714L2.99785 11.5098C1.07954 8.41438 1.9951 4.31613 5.1341 2.39781C8.2731 0.479563 12.3277 1.39512 14.246 4.53412C16.1642 7.67312 15.2487 11.7277 12.1097 13.646C11.1069 14.2999 9.88623 14.6488 8.66548 14.6488ZM12.502 9.8095L12.0225 9.5915C12.0225 9.5915 11.325 9.28631 10.889 9.06831C10.8454 9.06831 10.8018 9.02469 10.7582 9.02469C10.6274 9.02469 10.5402 9.06831 10.453 9.11194C10.453 9.11194 10.4094 9.1555 9.79904 9.85306C9.75541 9.94025 9.66823 9.98388 9.58104 9.98388H9.53741C9.49385 9.98388 9.40666 9.94025 9.36304 9.89669L9.14504 9.8095C8.66548 9.5915 8.22954 9.32987 7.88073 8.98112C7.79354 8.89394 7.66273 8.80675 7.57554 8.71956C7.27035 8.41438 6.96516 8.06556 6.74723 7.67319L6.7036 7.586C6.66004 7.54237 6.66004 7.49881 6.61641 7.41162C6.61641 7.32444 6.61641 7.23725 6.66004 7.19362C6.66004 7.19362 6.83441 6.97562 6.96516 6.84487C7.05241 6.75762 7.09598 6.62688 7.18316 6.53969C7.27035 6.40888 7.31398 6.2345 7.27035 6.10369C7.22679 5.88569 6.7036 4.70856 6.57285 4.447C6.4856 4.31619 6.39848 4.27263 6.26766 4.229H5.7881C5.70085 4.229 5.61373 4.27262 5.52648 4.27262L5.48285 4.31619C5.39566 4.35981 5.30848 4.447 5.22129 4.49056C5.1341 4.57781 5.09048 4.66494 5.00329 4.75219C4.6981 5.14456 4.52373 5.62412 4.52373 6.10369C4.52373 6.45244 4.61091 6.80125 4.74173 7.10644L4.78535 7.23725C5.17773 8.06556 5.70085 8.80675 6.39848 9.46069L6.57285 9.63506C6.7036 9.76587 6.83441 9.85306 6.9216 9.98381C7.83716 10.7686 8.88348 11.3354 10.0606 11.6406C10.1914 11.6841 10.3658 11.6841 10.4966 11.7277H10.9325C11.1505 11.7277 11.4121 11.6406 11.5865 11.5534C11.7173 11.4662 11.8045 11.4662 11.8917 11.379L11.9789 11.2917C12.0661 11.2046 12.1533 11.161 12.2405 11.0738C12.3277 10.9866 12.4149 10.8994 12.4585 10.8122C12.5457 10.6378 12.5892 10.4198 12.6329 10.2019V9.89669C12.6329 9.89669 12.5892 9.85306 12.502 9.8095Z" fill="white"/>
                            </g>
                            <defs>
                                <clipPath id="clip0">
                                    <rect width="16" height="16.1875" fill="white" transform="translate(0.599976)"/>
                                </clipPath>
                            </defs>
                        </svg>
                        <span class="settings-finance-createAmenities__whatsapp_text">
                            WhatsApp {{finance.parameters[0].whatsapp}}
                        </span>
                    </div>
                </td>
                <td class="settings-finance-createAmenities__cell settings-finance-createAmenities__status">
                    <div class="name" :class="{
                        'settings-finance-createAmenities__status_name-error' : finance.status == 'waiting',
                        'settings-finance-createAmenities__status_name-successful': finance.status == 'success',
                        'settings-finance-createAmenities__status_name-completed': finance.status == 'finish'}">
                        <template v-if="finance.status==='success'">Оплачено</template>
                        <template  v-else="finance.status==='waiting'">Ждет оплаты</template>
                    </div>
                </td>
                <td class="settings-finance-createAmenities__cell">{{new Date(finance.parameters[0].end_date * 1000).toLocaleDateString()}}</td>
                <td class="settings-finance-createAmenities__cell">Осталось диалогов/Всего диалогов</td>
                <td class="settings-finance-createAmenities__button settings-finance-createAmenities__cell">
                <button v-if="finance.status ==='success'" class="settings-finance-createAmenities__button_disabled" @click="restore(finance.user_tariff_id)">Изменить</button>
                <router-link v-else to="/settings/finance/rates"><button class="settings-finance-createAmenities__button_change" @click="restore(finance.user_tariff_id)">Изменить</button></router-link>
                <button v-if="finance.status ==='success'" class="settings-finance-createAmenities__button_disabled">Оплатить</button>
                <button v-else class="settings-finance-createAmenities__button_payment" @click="payFromHistory(finance.user_tariff_id)">Оплатить</button>
                </td>
            </tr>
            </table>
        </div>
    </div>
    <Payment v-if="isModalOpen" @closePay="closePay()"></Payment>
</template>

<script>
import { ref, onUpdated } from 'vue'
import { useFinance } from "@/composition/useFinance";
import { onMounted, beforeMount } from 'vue';
import Payment from '@/components/SettingsContainer/SettingsFinanse/settings-finance-payment.vue'

export default {
    components: {
        Payment,
    },

    setup(props, {emit}){

        const {getFinance, finances, getSingleFinance, returnFinance, getFinanceHistory, returnFinanceHistory, paymentFinance, linkPayment} = useFinance()
        
        const listTitles = ref([
            {title: "ТАРИФ"},
            {title: "КОЛ-ВО КАНАЛОВ"},
            {title: "СТАТУС"},
            {title: "ДАТА ОКОНЧАНИЯ"},
            {title: "ОСТАВШИЕСЯ КОЛ-ВО ДИАЛОГОВ"},
            {title: "ОПЦИИ"},
        ])

        const restore = (id) => {
            getSingleFinance(id)
        }

        const initialPaymentData = ref({
            user_tariff_id: 0,
        })

        const updatePaymentData = () => {
            initialPaymentData.value.user_tariff_id = returnFinance.value.user_tariff_id
        }

        onUpdated(()=> {
            updatePaymentData()
        })


        const payFromHistory = (id) => {
        getSingleFinance(id)
        initialPaymentData.value.user_tariff_id = id

        paymentFinance(initialPaymentData.value)
            .then(r => {
                            linkPayment.value = r
                            if (r.error) {
                                return;
                            }
                        })

            isModalOpen.value = true
        }



        const isModalOpen = ref(false)

        const closePay = () => {
            isModalOpen.value = false
        }

        getFinance();

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
            
        }
    }
}
</script>

<style lang="scss" src="./settings-finance-createAmenities.scss"></style>

