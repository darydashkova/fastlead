<template>
    <div class="connect-accaunt__shadows">
        <div class="connect-accaunt__content">
            <div class="connect-accaunt__content_header">
                <div class="connect-accaunt__content_header-cup">
                    <div class="connect-accaunt__content_header-cup_title">
                        Активация аккаунта
                    </div>
                    <div class="connect-accaunt__content_header-cup_close"  @click="closeAllModals()">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#9797BB"/>
                        </svg>
                    </div>
                </div>
                <div class="connect-accaunt__content_header-cup_subtitle">Instagram API</div>
            </div>
            <div class="connect-accaunt__content_main">
                <div class="connect-accaunt__content_main-title">Выберите instagram аккаунт для активации</div>
                <div class="connect-accaunt__content_main-frame">
                    <div class="connect-accaunt__content_main-frame_error" v-if="!returnInstagrams[0]">instagram аккаунты<br/>не подключены</div>
                    <div class="content__list" v-else>
                        <div class="content__element" @click="openModalConnectFolder()" v-for="(returnInstagram, index) in returnInstagrams" :key="index">
                            <div class="content__element_info">
                                <img class="content__element_info-image" alt="" :src="returnInstagram.picture_url">
                                <div class="content__element_info-user">{{returnInstagram.user_name}}</div>
                            </div>
                            <div class="content__element_info">
                                <div class="content__element_info-select">
                                    <svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.841163 0.919556C0.763056 0.997025 0.701061 1.08919 0.658754 1.19074C0.616447 1.29229 0.594665 1.40121 0.594665 1.51122C0.594665 1.62123 0.616447 1.73015 0.658754 1.8317C0.701061 1.93325 0.763056 2.02542 0.841163 2.10289L4.65782 5.91955C4.73592 5.99702 4.79792 6.08919 4.84023 6.19074C4.88253 6.29229 4.90432 6.40121 4.90432 6.51122C4.90432 6.62123 4.88253 6.73015 4.84023 6.8317C4.79792 6.93325 4.73592 7.02542 4.65782 7.10289L0.841163 10.9196C0.763056 10.997 0.701061 11.0892 0.658754 11.1907C0.616447 11.2923 0.594665 11.4012 0.594665 11.5112C0.594665 11.6212 0.616447 11.7302 0.658754 11.8317C0.701061 11.9333 0.763057 12.0254 0.841163 12.1029C0.997298 12.2581 1.20851 12.3452 1.42866 12.3452C1.64882 12.3452 1.86002 12.2581 2.01616 12.1029L5.84115 8.27789C6.30931 7.80914 6.57228 7.17372 6.57228 6.51122C6.57228 5.84872 6.30931 5.21331 5.84115 4.74456L2.01616 0.919556C1.86002 0.764347 1.64881 0.677228 1.42866 0.677228C1.20851 0.677228 0.997298 0.764347 0.841163 0.919556V0.919556Z" fill="#40406B"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="connect-accaunt__content_bottom">
                <div class="connect-accaunt__content_bottom-buttons">
                    <!--<button class="connect-accaunt__content_bottom-buttons_connect">Готово</button>-->
                    <button class="connect-accaunt__content_bottom-buttons_cancel" @click="closeModalConnect">Отмена</button>
                </div>
            </div>
        </div>
    </div>
    <ModalConnectAccauntFolder v-if="showModalConnectFolder" @closeModalConnectFolder="closeModalConnectFolder()" @closeAllModals="closeAllModals()"></ModalConnectAccauntFolder>
</template>

<script>
    import { ref, onUpdated } from 'vue'
    import ModalConnectAccauntFolder from '@/components/Modals/instagrams-api/ModalConnectAccauntFolder.vue'
    import { useInstagramApi } from "@/composition/useInstagramApi";
    import Loader from '@/components/FullScreenLoader.vue'
    export default {
        components: {
            ModalConnectAccauntFolder,
            Loader,
        },
        setup(props, {emit}){

            const {returnInstagrams, getInstagramsFacebook, instagramsApiId, initialCreateElement} = useInstagramApi()

            const closeModalConnect = () => {
                emit('closeModalConnect')
            }

            const closeAllModals = () => {
                emit('closeModalConnect')
                emit('closeModalFacebook')
            }

            const instagramAccaunts = ref([
                {id: 0, active: true},
            ])

            const showModalConnectFolder = ref(false)

            const closeModalConnectFolder = () => {
                showModalConnectFolder.value = false
            }

            const openModalConnectFolder = () => {
                for(i = 0; i < returnInstagrams.value.length; i++){
                    instagramsApiId.value.id = returnInstagrams.value[i].instagram_api_id
                    instagramsApiId.value.user_name = returnInstagrams.value[i].user_name
                    initialCreateElement.value.instagram_api_id = returnInstagrams.value[i].instagram_api_id
                }
                
                showModalConnectFolder.value = true
            }
            
            return {
                closeModalConnect,
                instagramAccaunts,
            
                closeAllModals,

                showModalConnectFolder,
                closeModalConnectFolder,
                openModalConnectFolder,

                returnInstagrams,
                instagramsApiId,

                initialCreateElement,
            }
        }
    }
</script>

<style lang="scss" src="./ModalConnectAccaunt.scss"></style>