<template>
    <div class="settings-instagrams-api">
        <div class="settings-instagrams-api__scroll-container">
            <div class="settings-instagrams-api__cap">
                <div class="settings-instagrams-api__cap_title">Созданные аккаунты</div>
                    <div class="settings-instagrams-api__cap_button" @click="openModalFacebook()">+ Добавить новый</div>
            </div>
            <div class="scroll" ref="container" @click.self="scrollTo">
                <div class="scroll__bar" ref="scrollbar"></div>
            </div>
            <div class="settings-instagrams-api__content" ref="content">
                <div class="element-none" v-if="!instagrams[0]">У вас еще нет подключенных аккаунтов</div>
                <div class="settings-instagrams-api__element" v-for="(instagram, index) in instagrams" :key="index">
                    <div class="settings-instagrams-api__element_user-name">{{instagram.user_name}}</div>
                    <div class="settings-instagrams-api__element_status">{{instagram.status}}</div>
                    <div class="settings-instagrams-api__element_folder">{{instagram.folder.name}}</div>
                    <div class="settings-instagrams-api__element_buttons">
                        <button class="settings-instagrams-api__element_buttons-delete" @click="deleteElement(instagram.instagram_api_id)">Удалить</button>
                        <button class="settings-instagrams-api__element_buttons-change">Редактировать</button>
                    </div>
                </div>
            </div>
        </div>
        <ModalCreateAccaunt v-if="showModalFacebook" @closeModalFacebook="closeModalFacebook()"></ModalCreateAccaunt>
    </div>
</template>

<script>
import { ref, watch, onUpdated, onBeforeMount } from 'vue'
import ModalCreateAccaunt from '@/components/Modals/instagrams-api/ModalCreateAccaunt.vue'
import { useInstagramApi } from "@/composition/useInstagramApi";
export default {
    components: {
        ModalCreateAccaunt,
    },
    setup(props, {emit}){
        const {instagrams, getInstagramsApi, deleteAccaunt, returnInstagrams, routerActiveLink} = useInstagramApi()

        routerActiveLink.value.link = "/settings/instagrams-api"

        const showModalFacebook = ref(false)

        const openModalFacebook = () => {
            showModalFacebook.value = true
            for(i = 0; i< Object.keys(instagrams.value).length; i++) {
                if(returnInstagrams.value[i])
                    returnInstagrams.value[i] = NaN
                }
            getInstagramsApi()
        }
        const closeModalFacebook = () => {
            showModalFacebook.value = false
            getInstagramsApi()
        }
    
        const checkAutorizationUser = () => {
                FB.getLoginStatus(function(response) {
                    if (response.status === 'connected') {
                        var uid = response.authResponse.userID;
                        var accessToken = response.authResponse.accessToken;
                        /* logoutUser() */
               
                    } else if (response.status === 'authorization_expired') {
                     
                    } else if (response.status === 'not_authorized') {
                        
                    } else {
                         
                    }
                });
        }

        const logoutUser = () => {
                FB.logout(function(response) {
                });
        }

        const deleteElement = (id) => {
            deleteAccaunt({instagram_api_id: id})
            .then(r => {
                for(i = 0; i< Object.keys(instagrams.value).length; i++) {
                    returnInstagrams.value[i] = NaN
                }
                    getInstagramsApi()
                        return r;
                    })
        }

        onBeforeMount(() => {
            getInstagramsApi()
        })

        const changeElement = () => {

        }

        return {
            routerActiveLink,

            showModalFacebook,
            openModalFacebook,
            closeModalFacebook,

            checkAutorizationUser,
            logoutUser,

            instagrams,

            deleteElement,

            changeElement,
        }
    }
}
</script>

<style lang="scss" src="./instagrams-api.scss"></style>