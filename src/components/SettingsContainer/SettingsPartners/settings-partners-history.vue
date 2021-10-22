<template>
        <tr class="settings-partners-history__table_row" v-for="(tableCell, index) in tableCells" :key="index">
            <td class="settings-partners-history__table_row-cell"></td>
            <td class="settings-partners-history__table_row-cell"></td>
            <td class="settings-partners-history__table_row-cell"></td>
            <td class="settings-partners-history__table_row-cell"></td>
            <td class="settings-partners-history__table_row-cell"></td>
        </tr>
</template>

<script>
    import { ref, onUpdated } from 'vue'
    export default {

        setup(){
            /* const tableCells = ref([
                {period: "Счет с 29.09.22 по 29.12.22", date: "29.09.22 21:20", price:"2350", numberOfCard: "4567 3000 5679 8909", status: "Оплачено"},
            ]) */

            return{
               /*  tableCells, */
            }
        }
    }
</script>

<style lang="scss" src="./settings-partners-history.scss"></style>