<template>
    <div class="modal-create-instagram" @mousedown.self="close">
        <div class="modal-create-instagram__body">
            <div class="modal-create-instagram__header">
                Активация канала
                <img class="pointer" src="@/assets/close.svg" @click.self="close">
            </div>
            <div class="modal-create-instagram__body_title">Instagram</div>
            <div class="modal-create-instagram__input-group modal-create-instagram__input-group_padding-20">
                <div for-id="modal-create-instagram__input" class="modal-create-instagram__input-group_name" :class="{'base-modal-label_error': errors.login}">
                    {{errors.login? 'Проверьте правильность ввода' : 'Логин'}}
                </div>
                <input id="modal-create-instagram__input"
                       type="text"
                       class="modal-create-instagram__input"
                       v-model="login">
            </div>
            <div class="modal-create-instagram__input-group modal-create-instagram__input-group_padding-20">
                <div for-id="modal-create-instagram__input-pass" class="modal-create-instagram__input-group_name" :class="{'base-modal-label_error': errors.password}">
                    {{errors.password? 'Проверьте правильность ввода' : 'Пароль'}}
                </div>
                <input id="modal-create-instagram__input-pass"
                       type="password"
                       class="modal-create-instagram__input"
                       v-model="password"
                >
            </div>
            <div class="modal-create-instagram__buttons">
                <div
                        class="modal-create-instagram__buttons_accept pointer"
                        @click="save"
                >
                    Сохранить
                </div>
                <div
                        class="modal-create-instagram__buttons_close pointer"
                        @click.self="close"
                >
                    Отмена
                </div>
            </div>
        </div>
        <teleport to="body" v-if="loading">
            <FullScreenLoader></FullScreenLoader>
        </teleport>
        <teleport to="body" v-if="success">
            <ModalCreateInstagramSuccess
                @close="closeAfterUpdate"
            ></ModalCreateInstagramSuccess>
        </teleport>
    </div>
</template>

<script>
    import BaseButton from '../../Base/BaseButton.vue'
    import BaseModalLabel from '../../Base/BaseModalLabel.vue'
    import BaseModalHeader from '../../Base/BaseModalHeader.vue'
    import ModalCreateInstagramSuccess from './ModalCreateInstagramSuccess.vue'

    import { onMounted, ref, reactive, computed, watch } from "vue";
    import {useInstagram} from "../../../composition/useInstagrams";
    import FullScreenLoader from "../../FullScreenLoader";

    export default {
        components: {FullScreenLoader, BaseButton, BaseModalLabel, BaseModalHeader, ModalCreateInstagramSuccess },
        props: {
            selectedInstagram: Object,
            succes:Boolean,
        },
        emits:["twoFactorModal"],
        setup(props, {emit}) {

            const { createInstagram, updateInstagram, getInstagrams } = useInstagram()

 const succesTwoFactor = ref(true)
            const password = ref('');
            const login = ref('');
            const errors = reactive({
                login: false,
                password: false,
            })

            const loading = ref(false);
            const success = ref(false);

            const close = () => {
                emit('close')
            }

            const header = computed(() => {
                return props.selectedInstagram? 'Редактировать Instagram аккаунт' : 'Новый Instagram аккаунт'
            })

            onMounted(() => {
                if (props.selectedInstagram) {
                    password.value = props.selectedInstagram.password;
                    login.value = props.selectedInstagram.login;
                }
            })

            const closeAfterUpdate = () => {
                getInstagrams();
                close();
            }

            const save = () => {
                errors.login = false;
                errors.password = false;
                if (!password.value) {
                    errors.password = true;
                    return;
                }
                if (!login.value) {
                    errors.login = true;
                    return;
                }
                let infoToSend = {
                    password: password.value,
                    login: login.value,
                }
                loading.value = true;
                if (props.selectedInstagram) {
                    infoToSend.instagram_id = props.selectedInstagram.instagram_id;
                    updateInstagram(infoToSend)
                        .then((r) => {
                            loading.value = false;
                            if (r.error) {
                                errors.login = true;
                                errors.password = true;
                                return;
                            }
                            closeAfterUpdate()
                        })
                } else {
                    createInstagram(infoToSend)
                        .then((r) => {
                            loading.value = false;
                            if (r.error) {
                                errors.login = true;
                                errors.password = true;
                                return;
                            }
                            
                            else{
                                if(r.two_factor){
                                   
                                emit("twoFactorModal", true, r.instagram_id)
                                }
                                else{
                                    success.value = true; 
                                }
                            }
                        })
                }
               
watch(()=>{
    if(props.succes){
        if(succesTwoFactor.value){
             success.value = true;  
             succesTwoFactor.value = false
        }
       
    }
})

            }
            return {
                login,
                password,

                save,
                errors,
                close,

                header,
                loading,
                closeAfterUpdate,
                success,
                succesTwoFactor
            }
        }
    }
</script>

<style lang="scss">
    .modal-create-instagram {
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.34);
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1300;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: left;
        &.z-index {
            z-index: 1400;
        }
    }
    .modal-create-instagram__body {
        width: 520px;
        height: 420px;
        background: #252544;
        border-radius: 9px;
        text-align: left;
        padding: 20px 0px;
        &_title{
            color: #9797BB;
            font-size: 16px;
            margin-top: 20px;
            padding: 0 24px 17px;
            border-bottom: 1px solid #1D1D35;
        }
    }
    .modal-create-instagram__header{
        display: flex;
        justify-content: space-between;
        padding: 0px 24px;
        color: #F0F0FA;
        weight: 700;
        font-size: 24px;
    }
    .modal-create-instagram__input-group {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 25px 0 29px;
        &_name{
            color: #CFCFE4;
            font-size: 14px;
        }
        &.modal-create-instagram__input-group_padding-20 {
            padding: 0 20px;
        }
    }
    .modal-create-instagram__input {
        font-family: Segoe UI;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        margin-top: 6px;
        width: 100%;
        padding: 12px 10px;

        color: var(--modal-font-color);
        background: #1D1D35;
        box-sizing: border-box;
        border-radius: 3px;
    }
    .modal-create-instagram__buttons {
        padding: 20px 24px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        &_accept{
            padding: 8px 26px;
            border-radius: 6px;
            background: linear-gradient(45.66deg, #22A595 -40.44%, #84D160 120.07%);
            color: #252544;
        }
        &_close{
            padding: 8px 26px;
            border-radius: 6px;
            border: 1px solid #5EC075;
            color: #5EC075;
            margin-left: 22px;
        }
    }
</style>