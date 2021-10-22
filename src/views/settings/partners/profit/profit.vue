<template>
    <div class="profit__header">
        <div class="profit__header-list">
            <div class="profit__header-list_item">
                <p class="profit__header-list_item-status">Ваш статус:</p>
                <p class="profit__header-list_item-value">Партнер</p>
                <span class="profit__header-list_item-percent">15% <span class="profit__header-list_item-status"> от суммы платежа</span></span>
            </div>
    
            <div class="profit__header-list_item" v-for="(infoBlock, index) in infoBlocks" :key="index">
                <p class="profit__header-list_item-status">{{infoBlock.name}}</p>
                <p class="profit__header-list_item-count">0</p>
            </div>
    
            <div class="profit__header-list_withdrawal">
                <p class="profit__header-list_withdrawal-title">Минимум 3000 ₽</p>
                <input class="profit__header-list_withdrawal-input" placeholder="0 ₽">
                <button type="button" class="profit__header-list_withdrawal-button" @click="openModalCashback()">Вывести</button>
            </div>
        </div>
    </div>
    <div class="profit__bottom">
        <h2 class="profit__bottom_title">Рефералы</h2>
        <table class="profit__bottom_table">
            <tr class="profit__bottom_table-row">
                <td class="profit__bottom_table-cell" v-for="(nameCell, index) in nameCells" :key="index">{{nameCell.name}}</td>
            </tr>
            <PartnersReferal/>
        </table>
    </div>
    <PartnersCashback v-if="modalCashback" @closeModalCashback="closeModalCashback()"></PartnersCashback>
</template>

<script>
import { ref } from 'vue'
import PartnersReferal from '@/components/SettingsContainer/SettingsPartners/settings-partners-referal.vue'
import PartnersCashback from '@/components/SettingsContainer/SettingsPartners/settings-partners-profit-cashback.vue'
import { usePartners } from "@/composition/usePartners";

export default {
    components: {
        PartnersReferal,
        PartnersCashback,
    },
    setup() {
        const {routerActiveLink} = usePartners()

        routerActiveLink.value.link = "/settings/partners/profit"

        const infoBlocks = ref([
            {name: "Рефералы:"},
            {name: "Доход за весь день:"},
            {name: "Выведено за весь период:"},
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
        return{
            infoBlocks,
            nameCells,

            modalCashback,
            openModalCashback,
            closeModalCashback,

            routerActiveLink,
        }
    }
}
</script>

<style lang="scss" src="./profit.scss"></style>