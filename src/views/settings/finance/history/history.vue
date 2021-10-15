<template>
    <!--<div class="settings-finance__history">
        <div class="settings-finance__title">
                <h2>История платежей</h2>
        </div>
        <div class="scroll">
        <table class="settings-finance__list">
            <tr class="settings-finance__list_titles">
                <td>ТАРИФ</td>
                <td>КОЛ-ВО КАНАЛОВ</td>
                <td>СТАТУС</td>
                <td>ДАТА ОКОНЧАНИЯ</td>
                <td>ОСТАВШИЕСЯ КОЛ-ВО ДИАЛОГОВ</td>
                <td>ОПЦИИ</td>
            </tr>-->
            <createAmenities></createAmenities>
        <!--</table>
        </div>
    </div>-->
</template>

<script>
import createAmenities from '@/components/SettingsContainer/SettingsFinanse/settings-finance-createAmenities.vue'
import { ref } from 'vue'
import { useFinance } from "@/composition/useFinance";
import {onMounted} from 'vue';

export default {
    components: {
        createAmenities,
    },
    setup(){

        const {getFinance, finances, routerTrue} = useFinance();

        routerTrue.value.link = "/settings/finance/history"

        onMounted(() => {
                getFinance();
            })

        return {
            finances,
            routerTrue,
        }

        
    },
}
</script>>

<style lang="scss" src="./history.scss"></style>