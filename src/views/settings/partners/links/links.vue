<template>
    <div class="links-header">
        <div class="links-header__block">
            <div class="links-header__block_question">
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.4987 0.083252C12.8711 0.083252 16.4154 3.62754 16.4154 7.99992C16.4154 12.3723 12.8711 15.9166 8.4987 15.9166C4.12632 15.9166 0.582031 12.3723 0.582031 7.99992C0.582031 3.62754 4.12632 0.083252 8.4987 0.083252ZM8.4987 1.07284C4.67297 1.07284 1.57161 4.17419 1.57161 7.99992C1.57161 11.8256 4.67297 14.927 8.4987 14.927C12.3244 14.927 15.4258 11.8256 15.4258 7.99992C15.4258 4.17419 12.3244 1.07284 8.4987 1.07284ZM8.59766 11.1666C8.75513 11.1666 8.90615 11.2291 9.0175 11.3405C9.12885 11.4518 9.19141 11.6029 9.19141 11.7603C9.19141 11.9178 9.12885 12.0688 9.0175 12.1802C8.90615 12.2915 8.75513 12.3541 8.59766 12.3541C8.44018 12.3541 8.28916 12.2915 8.17781 12.1802C8.06646 12.0688 8.00391 11.9178 8.00391 11.7603C8.00391 11.6029 8.06646 11.4518 8.17781 11.3405C8.28916 11.2291 8.44018 11.1666 8.59766 11.1666ZM8.59766 3.64575C9.92964 3.64575 11.0716 4.78654 11.0716 6.11931C11.0724 6.95848 10.7672 7.49286 10.0116 8.30748L9.6098 8.73775C9.20486 9.18861 9.04455 9.4744 9.02951 9.81244L9.02832 9.87656L9.02595 9.92723L9.01882 9.97631C8.99495 10.0965 8.92734 10.2035 8.82909 10.2767C8.73084 10.3499 8.60893 10.384 8.48696 10.3725C8.36499 10.361 8.25164 10.3046 8.16884 10.2143C8.08604 10.124 8.03968 10.0062 8.03874 9.88369C8.03359 9.17554 8.30672 8.69144 8.95232 7.98963L9.35884 7.555C9.89639 6.96442 10.0824 6.61569 10.082 6.11971C10.082 5.33319 9.38338 4.63533 8.59766 4.63533C7.83766 4.63533 7.15841 5.29004 7.11566 6.04411L7.11091 6.17038C7.09847 6.297 7.03773 6.41397 6.94131 6.49698C6.84489 6.57999 6.72019 6.62267 6.59312 6.61615C6.46606 6.60963 6.34639 6.55441 6.25897 6.46196C6.17155 6.36951 6.12311 6.24694 6.1237 6.11971C6.1237 4.78773 7.26607 3.64575 8.59766 3.64575Z" fill="#CFCFE4"/>
                </svg>
                <div class="settings-partners__message">
                    <div class="settings-partners__message-arrov">
                    </div>
                    <div class="settings-partners__message-text">
                        Это ваша реферальная ссылка. Вы можете указывать ее на ваших ресурсах для привлечения клиентов по партнерской программе.<br><br>
                        Когда клиент переходит по ссылке, ваш реферальный код сохраняется в cookies браузера. Если через какое-то время клиент решит зарегистрироваться в fastlead - 
                        он будет привязан к вашему партнерскому аккаунту, и вы будете получать вознаграждение от всех его платежей.<br><br>
                        Если у вас остались вопросы пишите на partner@fastlead.app.
                    </div>
                </div>
            </div>
            <h2 class="links-header__title">Ваша ссылка</h2>
        </div>
        <div class="links-header__generation-links">
            <p class="links-header__generation-links_title">Название реферальной ссылки:</p>
            <div class="links-header__generation-links-create" v-if="!user.rules.partners_rules || user.rules.partner_rules">
                <input v-model="newLink.url_name" placeholder="Ввести" class="links-header__generation-links-create_input">
                <button type="button" class="links-header__generation-links-create_button" @click="openPartnersRules()">Сгенирировать ссылку</button>
            </div>
            <div v-else class="links-header__generation-links-create" >
                <input v-model="newLink.url_name" placeholder="Ввести" class="links-header__generation-links-create_input">
                <button type="button" class="links-header__generation-links-create_button" @click="createPartnersLink()">Сгенирировать ссылку</button>
            </div>
        </div>
    </div>
    <div class="links__bottom scroll-poiner">
        <table class="links__bottom_table ">
            <tr class="links__bottom_table-row">
                <td class="links__bottom_table-cell" v-for="(nameCell, index) in nameCells" :key="index">{{nameCell.name}}</td>
            </tr>
            <tr class="settings-partners-links__table_row row-data-none" v-if="user.rules.partners_rules && !partners[0]">Отсутсвуют данные</tr>
            <tr class="settings-partners-links__table_row row-data-none" v-else-if="!user.rules.partners_rules">Для того чтобы стать нашим партнером,<br><a href="/rules-partner-program.pdf" download>примите правила пользования<br>партнерской программой</a>
                <div class="row-data-none__button pointer" @click="openPartnersRules()">Принять правила пользования</div>
            </tr>
            <PartnersLinks  @openModalChange="openModalChange()" @deleteLink="deleteLink" 
            v-for="(partner, index) in partners" :key="index" :partner="partner" v-if="user.rules.partners_rules"></PartnersLinks>
        </table>
    </div>
    <PartnersLinksChange v-if="modalChangeLinks" @closeModalChange="closeModalChange()"
    @sellUpdateLink="sellUpdateLink"
    ></PartnersLinksChange>

    <PartnersRules v-if="togglePartnersRules" @closePartnersRules="closePartnersRules"></PartnersRules>
</template>

<script>
import { ref, onMounted, onUpdated, watch } from 'vue'
import PartnersLinks from '@/components/SettingsContainer/SettingsPartners/settings-partners-links.vue'
import PartnersLinksChange from '@/components/SettingsContainer/SettingsPartners/settings-partners-links-change.vue'
import { usePartners } from "@/composition/usePartners";

import { useUser} from "@/composition/useUser"

import PartnersRules from '@/components/SettingsContainer/SettingsPartners/settings-partners-rules.vue'

export default {
     components: {
        PartnersLinks,
        PartnersLinksChange,
        PartnersRules,
    },
    setup(props, {emit}) {
        const {partners, returnPartners, routerActiveLink, createPartners, deletePartners, getPartners, updatePartners} = usePartners()
        const {user} = useUser()

        routerActiveLink.value.link = "/settings/partners/links"

        const nameCells = ref([
            {name: "НАЗВАНИЕ ССЫЛКИ"},
            {name: "ССЛЫКА"},
            {name: "КОЛ-ВО ПЕРЕХОДОВ"},
            {name: "ДЕЙСТВИЕ"},
        ])

        const togglePartnersRules = ref(false)
        const closePartnersRules = () => {
            togglePartnersRules.value = false
        }
        const openPartnersRules = () => {
            togglePartnersRules.value = true
        }

        const modalChangeLinks = ref(false)
        const openModalChange = () => {
            modalChangeLinks.value = true
        }
        const closeModalChange = () => {
            modalChangeLinks.value = false
            getPartners()
        }

        getPartners()
        const isClickGen = ref(false);
        
        watch(() => {
             if(isClickGen.value){ 
               getPartners() 
               isClickGen.value=false 
             }
        }) 

        const newLink = ref(
            {
                url_name: '',
            }
        )

        const createPartnersLink = () => {

            createPartners(newLink.value)
            .then(r => {
                if (r.error) {
                    return;
                }
            })
            isClickGen.value = true;
            getPartners() 
        } 

        const deleteLink = (id) => {
            deletePartners(id)
            .then(r => {
                if (r.error) {
                    return;
                }
            })
            isClickGen.value = true;
            getPartners() 
        }

        /* onUpdated(() => {
            getPartners() 
        }) */

        return{
            nameCells,
            isClickGen,
            modalChangeLinks,
            openModalChange,
            closeModalChange,
            deleteLink,

            newLink,
            createPartnersLink,

            partners,
            returnPartners,

            routerActiveLink,

            togglePartnersRules,
            closePartnersRules,
            openPartnersRules,

            user,
        }
    }
}
</script>

<style lang="scss" src="./links.scss"></style>