<template>
    <div class="profit__header">
        <div class="profit__header-list">
            <div class="profit__header-list_item">
                <p class="profit__header-list_item-status">Ваш статус:</p>
                <p class="profit__header-list_item-value">{{infoPartner.status}}</p>
                <span class="profit__header-list_item-percent">{{infoPartner.sale}}%<span class="profit__header-list_item-status"> от суммы платежа</span></span>
            </div>
    
            <div class="profit__header-list_item" v-for="(infoBlock, index) in infoBlocks" :key="index">
                <p class="profit__header-list_item-status">{{infoBlock.name}}</p>
                <p class="profit__header-list_item-count">{{infoBlock.count}}</p>
            </div>
    
            <!--<div class="profit__header-list_withdrawal">
                <p class="profit__header-list_withdrawal-title">Минимум 30000 ₽</p>
                <input class="profit__header-list_withdrawal-input" placeholder="0 ₽">
                <button type="button" class="profit__header-list_withdrawal-button" @click="openModalCashback()">Вывести</button>
            </div>-->
        </div>
    </div>
    <div class="profit__bottom">
        <h2 class="profit__bottom_title">Рефералы</h2>
           <table class="profit__bottom_table">
               <tr class="profit__bottom_table-row">
                   <td class="profit__bottom_table-cell" v-for="(nameCell, index) in nameCells" :key="index">{{nameCell.name}}</td>
               </tr>
               <tr class="settings-partners-referal__table_row row-data-none" v-if="!returnRegPartners[0]">Отсутсвуют данные</tr>
               <PartnersReferal></PartnersReferal>
           </table>
    </div>
    <PartnersCashback v-if="modalCashback" @closeModalCashback="closeModalCashback()"></PartnersCashback>
</template>

<script>
import { ref, onUpdated, watch, onBeforeMount, onMounted, onBeforeUpdate, returnRegPartners } from 'vue'
import PartnersReferal from '@/components/SettingsContainer/SettingsPartners/settings-partners-referal.vue'
import PartnersCashback from '@/components/SettingsContainer/SettingsPartners/settings-partners-profit-cashback.vue'
import { usePartners } from "@/composition/usePartners";

export default {
    components: {
        PartnersReferal,
        PartnersCashback,
    },
    setup() {
        const {routerActiveLink, returnInfoPartner, getInfoRefferals, returnRegPartners} = usePartners()
        
        routerActiveLink.value.link = "/settings/partners/profit"

        const infoBlocks = ref([
            {name: "Рефералы:", count: 0},
            {name: "Доход за весь период:", count: 0},
            {name: "Выведено за весь период:", count: 0},
        ])

        const nameCells = ref([
            {name: "ДАТА РЕГ."},
            {name: "НОМЕР ТЕЛЕФОНА"},
            {name: "СТАТУС"},
            {name: "ВНЕСЕНО В СИСТЕМУ (₽)"},
        ])

        const modalCashback = ref(false)

        const openModalCashback = () => {
            modalCashback.value = true
        }

        const closeModalCashback = () => {
            modalCashback.value = false
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
        }
    }
}
</script>

<style lang="scss" src="./profit.scss"></style>