<template>
    <div class="create-accaunt__shadows">
        <div class="create-accaunt__content">
            <div class="create-accaunt__content_header">
                <div class="create-accaunt__content_header-cup">
                    <div class="create-accaunt__content_header-cup_title">
                        Активация аккаунта
                    </div>
                    <div class="create-accaunt__content_header-cup_close"  @click="closeModalFacebook">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#9797BB"/>
                        </svg>
                    </div>
                </div>
                <div class="create-accaunt__content_header-cup_subtitle">Instagram API</div>
            </div>
            <div class="create-accaunt__content_main">
                <div class="create-accaunt__content_main-title">Выберите facebook аккаунт для активации</div>
                <div class="create-accaunt__content_main-frame">
                    <div class="create-accaunt__content_main-frame_error" v-if="!facebookss[0]">facebook аккаунты<br/>не подключены</div>
                    <div class="content__list">
                        <div class="content__element" @click="openModalConnect(facebook.facebook_id)" v-for="(facebook, index) in facebookss" :key="index"> 
                            <div class="content__element__info">
                                <img class="content__element__info_image" alt="user-image" :src="facebook.picture_url">
                                <div class="content__element__info_user">{{facebook.full_name}}</div>
                            </div>
                            <div class="content__element__info">
                                <svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.841163 0.919556C0.763056 0.997025 0.701061 1.08919 0.658754 1.19074C0.616447 1.29229 0.594665 1.40121 0.594665 1.51122C0.594665 1.62123 0.616447 1.73015 0.658754 1.8317C0.701061 1.93325 0.763056 2.02542 0.841163 2.10289L4.65782 5.91955C4.73592 5.99702 4.79792 6.08919 4.84023 6.19074C4.88253 6.29229 4.90432 6.40121 4.90432 6.51122C4.90432 6.62123 4.88253 6.73015 4.84023 6.8317C4.79792 6.93325 4.73592 7.02542 4.65782 7.10289L0.841163 10.9196C0.763056 10.997 0.701061 11.0892 0.658754 11.1907C0.616447 11.2923 0.594665 11.4012 0.594665 11.5112C0.594665 11.6212 0.616447 11.7302 0.658754 11.8317C0.701061 11.9333 0.763057 12.0254 0.841163 12.1029C0.997298 12.2581 1.20851 12.3452 1.42866 12.3452C1.64882 12.3452 1.86002 12.2581 2.01616 12.1029L5.84115 8.27789C6.30931 7.80914 6.57228 7.17372 6.57228 6.51122C6.57228 5.84872 6.30931 5.21331 5.84115 4.74456L2.01616 0.919556C1.86002 0.764347 1.64881 0.677228 1.42866 0.677228C1.20851 0.677228 0.997298 0.764347 0.841163 0.919556V0.919556Z" fill="#40406B"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="create-accaunt__content_bottom">
                <div class="create-accaunt__content_bottom-buttons">
                <div class="fb-login-button" data-width="" data-size="large" data-button-type="continue_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="false"></div>
                    <button class="create-accaunt__content_bottom-buttons_cancel" @click="closeModalFacebook">Отмена</button>
                </div>
            </div>
        </div>
    </div>
    <ModalCoonectAccaunt v-if="showModalConnect"  @closeModalConnect="closeModalConnect()" @closeModalFacebook="closeModalFacebook()"></ModalCoonectAccaunt>
    <ModalCreateError v-if="showModalError" @closeModalError="closeModalError()"></ModalCreateError>
</template>

<script>
    import { ref, watch, onUpdated, onMounted } from 'vue'
    import ModalCoonectAccaunt from '@/components/Modals/instagrams-api/ModalCoonectAccaunt.vue'
    import ModalCreateError from '@/components/Modals/instagrams-api/ModalCreateError.vue'
    import { useInstagramApi } from "@/composition/useInstagramApi";
 
    export default {
        components: {
            ModalCoonectAccaunt,
            ModalCreateError,
        },
        setup( props, { emit } ) {

            const {facebookss, returnInstagrams , createFacebook, getFacebook, getInstagramsFacebook, initialCreateElement, getInstagramsApi} = useInstagramApi()

            const sdk = () => {

                FB.init({
                    appId            : '147337457542742',
                    autoLogAppEvents : true,
                    xfbml            : true,
                    cookie           : true,
                    version          : 'v12.0'
                });
            }

            const checkAutorizationUser = () => {
            
             FB.getLoginStatus(function(response) {
                    if (response.status === 'connected') {
                        initialResponce.value.uid = response.authResponse.userID;
                        initialResponce.value.accessToken = response.authResponse.accessToken;
                        checkConnect()
                    }
                });
            }
            const initialResponce = ref({
                uid: 0,
                accessToken: 0,
            })

            const token = ref({
                access_token: ""
            })

            const checkConnect = () => {
                token.value.access_token = initialResponce.value.accessToken
                createFacebook(token.value)
                .then(r => {
                logoutUser()
                return r;
            })
                
            }

            const logoutUser = () => {
                FB.logout(function(response) {
                });
            }


            const closeModalFacebook = () => {
                emit('closeModalFacebook')
            }

            const showModalConnect = ref(false)

            const openModalConnect = (id) => {
                initialCreateElement.value.facebook_id = id
                getInstagramsFacebook(id)
                showModalConnect.value = true
            }

            const closeModalConnect = () => {
                showModalConnect.value = false
            }

            const showModalError = ref(false)

            const closeModalError = () => {
                showModalError.value = false
            }

            const openModalError = () => {
                showModalError.value = true
            }  


            watch(() => {
                sdk()
                checkAutorizationUser()
                getFacebook()
            })

            onUpdated(() => {
                checkAutorizationUser()
                checkConnect()
            })

            return {
                closeModalFacebook,
                
                showModalConnect,
                openModalConnect,
                closeModalConnect,

                showModalError,
                closeModalError,
                openModalError,
            
                sdk,
                checkAutorizationUser,
                logoutUser,

                checkConnect,
                initialResponce,

                facebookss,
                token,
                returnInstagrams,
                initialCreateElement,
            }
        }
    }
</script>

<style lang="scss" src="./ModalCreateAccaunt.scss"></style>
