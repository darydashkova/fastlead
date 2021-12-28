<template>
    <div class="profit__header">
        <div class="partners__header">
            <div class="partners__header_title">Ваша прибыль</div>
            <div class="partners__header_button-disable pointer" v-if="!user.rules.partners_rules || user.rules.partners_rules == null">Вывести</div>
            <div class="partners__header_button pointer" v-else @click="openModalCashback()">Вывести</div>
        </div>
        <div class="profit__header-list">
            <div class="profit__header-list_item">
                <p class="profit__header-list_item-status">Ваш статус:</p>
                <p class="profit__header-list_item-value">{{infoPartner.status}}</p>
                <span class="profit__header-list_item-percent">{{infoPartner.sale}}%<span class="profit__header-list_item-status"> от суммы платежа</span></span>
            </div>
    
            <div class="profit__header-list_item" v-for="(infoBlock, index) in infoBlocks" :key="index">
                <p class="profit__header-list_item-status">{{infoBlock.name}}</p>
                <p class="profit__header-list_item-count" v-if="index == 0">{{infoBlock.count}}</p>
                <p class="profit__header-list_item-count" v-else>{{infoBlock.count}} ₽</p>
            </div>
        </div>
    </div>
    <div class="profit__bottom">
        <h2 class="profit__bottom_title">История выплат</h2>
           <table v-if="!payments[0]" class="profit__bottom_table">
               <tr class="profit__bottom_table-row">
                   <td class="profit__bottom_table-cell" v-for="(nameCell, index) in nameCells" :key="index">{{nameCell.name}}</td>
               </tr>
               <tr class="settings-partners-referal__table_row row-data-none">Отсутсвуют данные</tr>
           </table>
           <div v-else class="scroll-poiner history">
                <table class="profit__bottom_table">
                <tr class="profit__bottom_table-row">
                    <td class="profit__bottom_table-cell" v-for="(nameCell, index) in nameCells" :key="index">{{nameCell.name}}</td>
                </tr>
                        <HistoryPayment></HistoryPayment>
                </table>
           </div>
           
    </div>
    <PartnersCashback :count="infoBlocks[1].count" v-if="modalCashback" @closeModalCashback="closeModalCashback()"></PartnersCashback>
</template>

<script>
import { ref, onUpdated, watch, onBeforeMount, onMounted, onBeforeUpdate, returnRegPartners } from 'vue'
import PartnersCashback from '@/components/SettingsContainer/SettingsPartners/settings-partners-profit-cashback.vue'
import { usePartners } from "@/composition/usePartners";
import HistoryPayment from '@/components/SettingsContainer/SettingsPartners/settings-partners-history.vue'
import { useUser} from "@/composition/useUser"

export default {
    components: {
        PartnersCashback,
        HistoryPayment,
    },
    setup(props) {
        const {routerActiveLink, returnInfoPartner, getInfoRefferals, returnRegPartners, getPayment, createPayment, payments} = usePartners()
        const {user} = useUser()
        
        routerActiveLink.value.link = "/settings/partners/profit"
        getPayment()
        const infoBlocks = ref([
            {name: "Рефералы:", count: 0},
            {name: "Доступно для вывода:", count: 0},
            {name: "Выведено за весь период:", count: 0},
        ])

        const nameCells = ref([
            {name: "ДАТА СОЗДАНИЯ"},
            {name: "ДАТА ВЫПЛАТЫ"},
            {name: "СУММА"},
            {name: "НОМЕР КАРТЫ"},
            {name: "СТАТУС"},
        ])

        const modalCashback = ref(false)

        const openModalCashback = () => {
            modalCashback.value = true
        }

        const closeModalCashback = () => {
            modalCashback.value = false
            getPayment()
            getInfoRefferals()
            updateInfoPartners()
        }

        const infoPartner = ref({
            status: "Клиент",
            sale: 0,
        })

        const updateInfoPartners = () => {
            infoPartner.value.status = returnInfoPartner.value.partner_name
            infoPartner.value.sale = returnInfoPartner.value.partner_sale
            infoBlocks.value[0].count = returnInfoPartner.value.referrals
            infoBlocks.value[1].count = returnInfoPartner.value.purse
            infoBlocks.value[2].count = returnInfoPartner.value.operations
        }

        onUpdated(() => {
            getInfoRefferals()
            updateInfoPartners()
        })

        watch(() => {
            getInfoRefferals()
               .then(r => {
             updateInfoPartners()
                return r;
            })
            
        
        })

        return{
            infoBlocks,
            nameCells,

            modalCashback,
            openModalCashback,
            closeModalCashback,

            routerActiveLink,

            infoPartner,
            updateInfoPartners,
            returnInfoPartner,

            returnRegPartners,
            payments,

            user,
        }
    }
}
</script>

<style lang="scss" src="./profit.scss"></style>