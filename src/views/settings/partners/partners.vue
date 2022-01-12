<template>
    <div class="settings-partners">
        <div class="settings-partners__wrapper">
            <div class="settings-partners__header">
                <div class="settings-partners__header-title">Партнерская программа</div>
                 <div class="settings-partners__navigation">
                    <router-link class="navigation-link" v-for="(routerLink, index) in routerLinks" :key="index" :to="routerLink.link"
                    :class="{'navigation-link_active' :  routerActiveLink.link == routerLink.link}"
                    >{{routerLink.name}}</router-link>
                </div>       
            </div>
            <div class="settings-partners__main">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { usePartners } from "@/composition/usePartners";

export default {
    setup() {
        const {routerActiveLink} = usePartners()

        const routerLinks = ref([
            {name: "Прибыль", link: "/settings/partners/profit"},
            {name: "Ваша ссылка", link: "/settings/partners/links"},
            /* {name: "История", link: "/settings/partners/history"}, */
        ])


        return{
            routerLinks,
            routerActiveLink,
        }
    }
}

</script>

<style lang="scss" src="./partners.scss"></style>