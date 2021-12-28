<template>
    <div class="settings-finance-change__shadow">
        <div class ="settings-finance-change">
            <div class="settings-finance-change__header">
                <span class="settings-finance-change__header_title">Изменение подписки</span>
                <svg class="settings-finance-change__header_close" @click="closeChange" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#9797BB"/>
                </svg>
            </div>
            <div class="settings-finance-change__main">
                <h3 class="settings-finance-change__main-name">Выберите тариф:</h3>
                <div class="settings-finance-change__main_tariff">
                    <div class="settings-finance-change__main_tariff-select" v-for="(tariff, index) in tariffs" :key="index"
                    v-if="tariff_id == 2"
                    :id = "arr[index].id" 
                    :class="{'tariff-active' : arr[index].active}"
                    @click="searchElemnt(arr[index])">
                        {{tariff.name}}
                        <div class="settings-finance-change__main_tariff-select_price">{{tariff.price.toLocaleString('ru')}}₽/мес</div>
                    </div>

                    <div class="settings-finance-change__main_tariff-select-pro "
                    v-else
                    :id = "arr[1].id" 
                    :class="{'tariff-active' : arr[1].active}"
                    @click="searchElemnt(arr[1])">
                        {{tariffs[1].name}}
                        <div class="settings-finance-change__main_tariff-select_price">{{tariffs[1].price.toLocaleString('ru')}}₽/мес</div>
                    </div>
                </div>
            </div>
            <div class="settings-finance-change__mounth">
                <h3 class="settings-finance-change__main-name">Срок подписки:</h3>
                <div class="settings-finance-change__mounth-wrapper">
                    <span class="settings-finance-change__mounth-wrapper_name">Кол-во мессяцев</span>
                    <span class="settings-finance-change__mounth-wrapper_change">
                        <button class="settings-finance-change__mounth-wrapper_change-btn_minus settings-finance__btn_minus" @click="decrimentCountMounth()">
                            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.25 9.25H6.75C6.33579 9.25 6 9.58579 6 10C6 10.4142 6.33579 10.75 6.75 10.75H14.25C14.6642 10.75 15 10.4142 15 10C15 9.58579 14.6642 9.25 14.25 9.25Z" fill="#CFCFE4"/>
                                <rect x="1" y="0.5" width="19" height="19" rx="2.5" stroke="#CFCFE4"/>
                            </svg>
                        </button>
                        <span class="settings-finance-change__mounth-wrapper_change_count">{{initialValues.countMounth}}</span>
                        <button class="settings-finance-change__mounth-wrapper_change-btn_plus settings-finance__btn_plus" @click="incrementCountMounth()">
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
                    </span>
                </div>
            </div>
            <div class="settings-finance-change__cannals">
                <h3 class="settings-finance-change__main-name">Каналы:</h3>
                <div class="settings-finance-change__cannals-wrapper">
                     <span class="settings-finance-change__cannals-wrapper_name" v-if="arr[0].active">WhatsApp - {{tariffs[0].price.toLocaleString('ru')}} ₽/мес</span>
                     <span class="settings-finance-change__cannals-wrapper_name" v-else>WhatsApp - {{tariffs[1].price.toLocaleString('ru')}} ₽/мес</span>
                     <span class="settings-finance-change__cannals-wrapper_change">
                         <button class="settings-finance-change__mounth-wrapper_change-btn_minus settings-finance__btn_minus" @click="decrimentCountWhats()">
                             <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M14.25 9.25H6.75C6.33579 9.25 6 9.58579 6 10C6 10.4142 6.33579 10.75 6.75 10.75H14.25C14.6642 10.75 15 10.4142 15 10C15 9.58579 14.6642 9.25 14.25 9.25Z" fill="#CFCFE4"/>
                                 <rect x="1" y="0.5" width="19" height="19" rx="2.5" stroke="#CFCFE4"/>
                             </svg>
                         </button>
                         <span class="settings-finance-change__mounth-wrapper_change_count">{{initialValues.countWats}}</span>
                         <button class="settings-finance-change__mounth-wrapper_change-btn_plus settings-finance__btn_plus" @click="incrementCountWhats()">
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
                     </span>
                </div>   
                <div class="settings-finance-change__cannals-wrapper">
                     <span class="settings-finance-change__cannals-wrapper_name" v-if="arr[0].active">Instagram - {{tariffs[0].price.toLocaleString('ru')}} ₽/мес </span>
                     <span class="settings-finance-change__cannals-wrapper_name" v-else>Instagram - {{tariffs[1].price.toLocaleString('ru')}} ₽/мес </span>
                     <span class="settings-finance-change__cannals-wrapper_change">
                         <button class="settings-finance-change__mounth-wrapper_change-btn_minus settings-finance__btn_minus" @click="decrimentCountInst()">
                             <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M14.25 9.25H6.75C6.33579 9.25 6 9.58579 6 10C6 10.4142 6.33579 10.75 6.75 10.75H14.25C14.6642 10.75 15 10.4142 15 10C15 9.58579 14.6642 9.25 14.25 9.25Z" fill="#CFCFE4"/>
                                 <rect x="1" y="0.5" width="19" height="19" rx="2.5" stroke="#CFCFE4"/>
                             </svg>
                         </button>
                         <span class="settings-finance-change__mounth-wrapper_change_count">{{initialValues.countInst}}</span>
                         <button class="settings-finance-change__mounth-wrapper_change-btn_plus settings-finance__btn_plus" @click="incrementCountInst()">
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
                     </span>
                </div>      
            </div>
            <div class="settings-finance-change__bottom">
                <div class="settings-finance-change__bottom_total-price">
                    <h3>Итого к оплате</h3>
                    <h3>{{Math.ceil(initialValues.priceWithSeil)}}₽</h3>
                </div>
            </div>
            <div class="settings-finance-change__buttons">
                <button class="settings-finance-change__buttons-cancel">Отмена</button>
                <button class="settings-finance-change__buttons-done" @click="saveButton()">Изменить и оплатить</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { ref, onUpdated, watch, onMounted, onBeforeMount } from 'vue'
    import { useFinance } from "@/composition/useFinance";
    export default {
    setup(props, {emit}){

        const {returnFinance, returnSale, updateSuccessTariff} = useFinance()

        const tariffs = ref([
            {name: "Start", price: 950,},
            {name: "Pro", price: 2100,},
        ])

        const arr = ref([
            {id: 0, active: true},
            {id: 1, active: false}
        ])

        const searchElemnt = (element) => {
             for (let i = 0; i<arr.value.length; i++) {
                arr.value[i].active = false;
            }
            arr.value[element.id].active=true;

            if(arr.value[0].active == true){
                initialValues.value.tariff_id = 2
                initialValues.value.priceOneCannals = 950
            } else {
                initialValues.value.tariff_id = 3
                initialValues.value.priceOneCannals = 2100
            }
        }

        const initialValues = ref({
            tariff_id: 0,
            countWats: 0,
            countInst: 0,
            giftDays: 0,
            sale: 0,
            mounth: 0,
            priceWithSeil: 0,
            priceTotal: 0,
            countMounth: 0,
            priceOneCannals: 0,
            updateSale: 0,
        })

        const sale = ref({
            sale_id: 0
        })

        const tariff_id = ref(0)

        const initialSale = () => {
            sale.value.sale_id = returnFinance.value.sale_id

            returnSale(sale.value)
            .then(r => {
                initialValues.value.sale = r.Sale
                initialValues.value.mounth = r.Month
                initialValues.value.countMounth = r.Month
                return r;
            })

            initialValues.value.tariff_id = returnFinance.value.tariff_id

            if (initialValues.value.tariff_id == 2) {
                arr.value[0].active = true
                 arr.value[1].active = false
            } else {
                arr.value[1].active = true
                arr.value[0].active = false
            } 

        }

        const incrementCountWhats = () => {
            initialValues.value.countWats++
        }
        const incrementCountInst = () => {
            initialValues.value.countInst++
        }

        const incrementCountMounth = () => {
            if(initialValues.value.countMounth == 1) {
                initialValues.value.countMounth = 3
            } else if (initialValues.value.countMounth == 3) {
                initialValues.value.countMounth = 6
            } else if (initialValues.value.countMounth == 6) {
                initialValues.value.countMounth = 12
            }
        }

        const decrimentCountWhats = () => {
            if (initialValues.value.countWats > 0){
                initialValues.value.countWats--
            }
        }

        const decrimentCountInst = () => {
            if (initialValues.value.countInst > 0){
                initialValues.value.countInst--
            }
        }
        const decrimentCountMounth = () => {
            if (initialValues.value.countMounth > initialValues.value.mounth){
                if(initialValues.value.countMounth == 3) {
                    initialValues.value.countMounth = 1
                } else if (initialValues.value.countMounth == 6) {
                    initialValues.value.countMounth = 3
                } else if (initialValues.value.countMounth == 12) {
                    initialValues.value.countMounth = 6
                }
            }
        }

        const calculation = () => {

            let allCountNumbersOld = 0
            let oneDayOld = 0
            let remainingOldTariff = 0
            let newTariff = 2100
            let oneDayNew = 0 
            let oldPriceWithoutRemaining = 0
            let additionalPayment = 0

            if(initialValues.value.tariff_id == 2){
                initialValues.value.priceOneCannals = 950
            } else {
                initialValues.value.priceOneCannals = 2100
            }

            ///////////Пересчет за каналы по старому тарифу////////////

            allCountNumbersOld = returnFinance.value.parameters[0].whatsapp + returnFinance.value.parameters[0].instagram

            oneDayOld = ((allCountNumbersOld * initialValues.value.priceOneCannals * initialValues.value.countMounth) - 
            ((allCountNumbersOld * initialValues.value.priceOneCannals * initialValues.value.countMounth) * initialValues.value.updateSale)/100)/returnFinance.value.all_days

            let oneDayOldReturn = returnFinance.value.old_price/returnFinance.value.all_days

            remainingOldTariff = oneDayOldReturn * returnFinance.value.remainig_days

            oneDayNew = ((allCountNumbersOld * newTariff * initialValues.value.countMounth) - ((allCountNumbersOld * newTariff * initialValues.value.countMounth) * initialValues.value.updateSale)/100)/returnFinance.value.all_days

            oldPriceWithoutRemaining = oneDayNew * returnFinance.value.remainig_days

            let oldPriceWithoutRemainingStart = oneDayOld * returnFinance.value.remainig_days

            if (returnFinance.value.tariff_id == 2 && arr.value[1].active == true){
                additionalPayment = oldPriceWithoutRemaining - remainingOldTariff
            } else if ( returnFinance.value.tariff_id == 2 && arr.value[0].active  == true || returnFinance.value.tariff_id == 3 && arr.value[1].active == true) {
                additionalPayment = oldPriceWithoutRemainingStart - remainingOldTariff
            }

            //////////////Пересчет при увеличении месяцев////////////////////
            
            /////////////////////////Окончательная цена//////////////////////

            let allCountNumbersNew = initialValues.value.countWats + initialValues.value.countInst

            let priceForNewTariff = (allCountNumbersNew * initialValues.value.countMounth * initialValues.value.priceOneCannals) - (allCountNumbersNew * initialValues.value.countMounth * initialValues.value.priceOneCannals * initialValues.value.updateSale)/100

            let oneDayNewTariff = priceForNewTariff/returnFinance.value.all_days

            let additionalPaymentNew = oneDayNewTariff * returnFinance.value.remainig_days

            initialValues.value.priceWithSeil = additionalPayment + additionalPaymentNew
        }

        onUpdated(() => {
            changeUpdateData()
            calculation()
        })
        
        const checkProps = ref(true);
        
        watch(() => {
            if(checkProps.value){
                if(returnFinance.value.hasOwnProperty('status')){
                    initialSale()
                    checkProps.value=false
                }
            }
            tariff_id.value = returnFinance.value.tariff_id
        })

        const closeChange = () => {
            returnFinance.value={}
            initialSale()
            emit('closeChange')
        }

        const updateData = ref({
            user_tariff_id: 0,
            tariff_id: 1,
            sale_id: 0,
            parameters: 
            [
                {
                    whatsapp: 0,
                    instagram: 0,
                    base_validation: false,
                    virtual_numbers: false,
                    mass_sending: 0,
                }
            ] 
        })

        const changeUpdateData = () => {

            updateData.value.user_tariff_id = returnFinance.value.user_tariff_id
            updateData.value.tariff_id = initialValues.value.tariff_id
            
            if(initialValues.value.countMounth == 1){
                updateData.value.sale_id = 1
                initialValues.value.updateSale = 0
            } else if (initialValues.value.countMounth == 3) {
                updateData.value.sale_id = 2
                initialValues.value.updateSale = 10
            } else if (initialValues.value.countMounth == 6) {
                updateData.value.sale_id = 3
                initialValues.value.updateSale = 15
            } else {
                updateData.value.sale_id = 4
                initialValues.value.updateSale = 20
            }
            
            updateData.value.parameters[0].whatsapp = initialValues.value.countWats
            updateData.value.parameters[0].instagram = initialValues.value.countInst
        }

        const saveButton = () => {
            updateSuccessTariff(updateData.value)
            .then(r => {
                if (r.error) {
                    return;
                }
            })
            closeChange()
        }

        return {
            tariffs,
            arr,

            searchElemnt,

            closeChange,

            initialValues,
            initialSale,

            incrementCountWhats,
            incrementCountInst,
            incrementCountMounth,
            decrimentCountWhats,
            decrimentCountInst,
            decrimentCountMounth,

            calculation,

            saveButton,

            sale,
            checkProps,
            tariff_id,

            updateData,
            changeUpdateData,
        }
    }
}

</script>

<style lang="scss" src="./settings-finance-change.scss"></style>