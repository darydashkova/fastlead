<template>
        <tr class="settings-partners-history__table_row" v-for="(payment, index) in payments" :key="index">
            <td class="settings-partners-history__table_row-cell">{{(new Date(payment.created_at * 1000).toLocaleString()).replace(',',' ')}}</td>
            <td class="settings-partners-history__table_row-cell" v-if="payment.pay_date == 0">——————————</td>
            <td class="settings-partners-history__table_row-cell" v-else>{{(new Date(payment.created_at * 1000).toLocaleString()).replace(',',' ')}}</td>
            <td class="settings-partners-history__table_row-cell">{{payment.sum.toLocaleString('ru')}} ₽</td>
            <td class="settings-partners-history__table_row-cell">{{payment.card_number}}</td>
            <td class="settings-partners-history__table_row-cell row-cell-error" v-if="!payment.is_paid">Не выплачено</td>
            <td class="settings-partners-history__table_row-cell row-cell-accept" v-else>Выплачено</td>
        </tr>
</template>

<script>
    import { ref, onUpdated } from 'vue'
    import { usePartners } from "@/composition/usePartners";
    export default {

        setup(){
            const {getPayment, createPayment, payments} = usePartners()

            return{
               payments,
            }
        }
    }
</script>

<style lang="scss" src="./settings-partners-history.scss"></style>