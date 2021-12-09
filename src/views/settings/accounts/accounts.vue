<template>
    <div class="settings-partners">
        <div class="settings-partners__header">
            <div>
                Аккаунты
            </div>
            <div class="settings-partners__navigation">
                <router-link class="navigation-link" v-for="(routerLink, index) in routerLinks" :key="index" :to="routerLink.link"
                :class="{'navigation-link_active' :  routerActiveLink.link == routerLink.link}"
                >{{routerLink.name}}</router-link>
            </div>        
        </div>
        <div class="settings-partners__table">
             <router-view />
        </div> 
    </div>
</template>

<script>
import { ref } from 'vue'
import { useInstagramApi } from "@/composition/useInstagramApi";

export default {
    setup() {
        const {routerActiveLink} = useInstagramApi()

        const routerLinks = ref([
            {name: "WhatsApp", link: "/settings/whatsapps"},
            {name: "Instagram", link: "/settings/instagrams"},
           /*  {name: "InstagramsApi", link: "/settings/instagrams-api"}, */
        ])


        return{
            routerLinks,
            routerActiveLink,
        }
    }
}

</script>

<style lang="scss" src="./accounts.scss"></style>