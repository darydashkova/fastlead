<template>
    <div class="history">
        <table class="history__table">
            <tr class="history__table_row">
                <td class="history__table_cell" v-for="(nameCell, index) in nameCells" :key="index">{{nameCell.name}}</td>
            </tr>
            <tr class="settings-partners-links__table_row row-data-none">Отсутсвуют данные</tr>
            <PartnersHistory/>
        </table>
    </div>
</template>

<script>
import { ref } from 'vue'
import PartnersHistory from '@/components/SettingsContainer/SettingsPartners/settings-partners-history.vue'
import { usePartners } from "@/composition/usePartners";
export default {
     components: {
        PartnersHistory,
    },
    setup() {
        const {routerActiveLink} = usePartners()

        
        routerActiveLink.value.link = "/settings/partners/history"

        const nameCells = ref([
            {name: "ПЕРИОД ВЫПЛАТЫ"},
            {name: "ДАТА ВЫПЛАТЫ"},
            {name: "СУММА"},
            {name: "НОМЕР КАРТЫ"},
            {name: "СТАТУС"},
        ])

        /* const modalChangeLinks = ref(false) */

        return{
            nameCells,

            routerActiveLink,
        }
    }
}
</script>

<style lang="scss" src="./history.scss"></style>