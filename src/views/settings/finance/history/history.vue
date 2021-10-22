<template>
    <createAmenities></createAmenities>
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