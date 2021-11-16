<template>
        <tr class="settings-partners-referal__table_row" v-for="(returnRegPartner, id) in returnRegPartners" :key="id">
            <td class="settings-partners-referal__table_row-cell">{{new Date(returnRegPartner.date * 1000).toLocaleDateString()}}</td>
            <td class="settings-partners-referal__table_row-cell">+{{returnRegPartner.phone}}</td>
            <td class="settings-partners-referal__table_row-cell">{{returnRegPartner.user_tariffs}}</td>
            <td class="settings-partners-referal__table_row-cell">{{returnRegPartner.user_tariffs}}</td>
        </tr>
</template>

<script>
import { ref, onUpdated, watch, onBeforeMount } from 'vue'
import { usePartners } from "@/composition/usePartners";
export default {
    setup(props, {emit}){

        const {routerActiveLink, returnRegPartners, getRegRefferals} = usePartners()

        onUpdated(() => {
            /* getRegRefferals() */
        })

        getRegRefferals()

        return{
            returnRegPartners
        }
    }
}
</script>

<style lang="scss" src="./settings-partners-referal.scss"></style>