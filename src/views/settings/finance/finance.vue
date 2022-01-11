<template>
    <!--<div class="settings-finance">
        <div class="settings-finance__header">
            <div>
                Финансы
            </div>
            <div class="settings-finance__block">
                <div class="settings-finance__navigation">
                    <router-link class="navigation-link" to="/settings/finance/rates">
                    <p :id = "arr[0].id" @click="toggle(arr[0])" :class="{'navigation-link_active' :  routerTrue.link == arr[0].link}">Тарифы</p>
                    </router-link>
                    <router-link class="navigation-link" to="/settings/finance/history">
                    <p :id = "arr[1].id" @click="toggle(arr[1])" :class="{'navigation-link_active' :  routerTrue.link == arr[1].link}">История платежей</p>
                    </router-link>
                </div>
                <div class="finance-question pointer" style="display: none;">?</div>
            </div>        
        </div>
        <div class="settings-finance__table">
             <router-view />
        </div> 
    </div>-->
     <div class="settings-finance">
        <div class="settings-finance__wrapper">
            <div class="settings-finance__header">
                <div class="settings-finance__header-title">Финансы</div>
                <div class="settings-finance__navigation">
                    <router-link class="navigation-link" to="/settings/finance/rates" :id = "arr[0].id"  :class="{'navigation-link_active' :  routerTrue.link == arr[0].link}">
                        Тарифы
                    </router-link>
                    <router-link class="navigation-link" to="/settings/finance/history" :id = "arr[1].id" :class="{'navigation-link_active' :  routerTrue.link == arr[1].link}">
                        История платежей
                    </router-link>
                </div>       
            </div>
            <div class="settings-finance__main">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import {useFinance} from "@/composition/useFinance";

export default {
    setup() {

        const {routerTrue} = useFinance()

        const arr = ref([   //initial type tariff block
            {id:0, active:false, link: "/settings/finance/rates"},
            {id:1, active:false, link: "/settings/finance/history"},
        ])

        const toggle = (element) => {
             for (let i = 0; i<arr.value.length; i++) {
                arr.value[i].active = false;
            }
            arr.value[element.id].active=true;
        }

        return{
            arr,
            toggle,
            routerTrue,
        }
    }
}

</script>

<style lang="scss" src="./finance.scss"></style>