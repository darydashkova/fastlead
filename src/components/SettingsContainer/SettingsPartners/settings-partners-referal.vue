<template>
        <tr class="settings-partners-referal__table_row" v-for="(tableCell, index) in tableCells" :key="index">
            <td class="settings-partners-referal__table_row-cell"></td>
            <td class="settings-partners-referal__table_row-cell"></td>
            <td class="settings-partners-referal__table_row-cell"></td>
            <td class="settings-partners-referal__table_row-cell"></td>
        </tr>
</template>

<script>
import { ref, onUpdated } from 'vue'
export default {

    setup(){
        /* const tableCells = ref([
            {date: "", phone: "", status:"", price: 0,},
            {date: "", phone: "", status:"", price: 0,},
        ]) */

        return{
            /* tableCells, */
        }
    }
}
</script>

<style lang="scss" src="./settings-partners-referal.scss"></style>