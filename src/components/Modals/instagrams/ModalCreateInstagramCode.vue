<template>
    <div class="modal-create-instagram" @mousedown.self="close">
        <div class="modal-create-instagram__body">
            <BaseModalHeader>
               Введите свой код безопасности
            </BaseModalHeader>
            <div class="modal-create-instagram__input-group modal-create-instagram__input-group_padding-20">
                <BaseModalLabel for-id="modal-create-instagram__input" :class="{'base-modal-label_error': errors.login}">
                    {{errors.login? 'Проверьте правильность ввода' : 'Введите 6-значный код из SMS'}}
                </BaseModalLabel>
                <input id="modal-create-instagram__input"
                        type="number"
                        class="modal-create-instagram__input"
                        v-model="login"
                        v-maska="'######'"
                       >
            </div>
          
            <div class="modal-create-instagram__buttons">
                <BaseButton
                        class="base-button_enter"
                        @click="save"
                >
                    Отправить
                </BaseButton>
                <BaseButton
                        class="base-button_cancel"
                        @click.self="close"
                >
                    Отмена
                </BaseButton>
            </div>
        </div>
        <teleport to="body" v-if="loading">
            <FullScreenLoader></FullScreenLoader>
        </teleport>
        <!-- <teleport to="body" v-if="success">
            <ModalCreateInstagramSuccess
                @close="closeAfterUpdate"
            ></ModalCreateInstagramSuccess>
        </teleport> -->
    </div>
</template>

<script>
    import BaseButton from '../../Base/BaseButton.vue'
    import BaseModalLabel from '../../Base/BaseModalLabel.vue'
    import BaseModalHeader from '../../Base/BaseModalHeader.vue'
    import ModalCreateInstagramSuccess from './ModalCreateInstagramSuccess.vue'

    import { onMounted, ref, reactive, computed } from "vue";
    import {useInstagram} from "../../../composition/useInstagrams";
    import FullScreenLoader from "../../FullScreenLoader";

    export default {
        components: {FullScreenLoader, BaseButton, BaseModalLabel, BaseModalHeader, ModalCreateInstagramSuccess },
        props: {
            index:Number,
        },
        emits:["succesInstagram"],
        setup(props, {emit}) {
            const loading = ref(false);
            const { createInstagram, updateInstagram, getInstagrams, twoFactorInstagram } = useInstagram()
            const max = ref();
            const maxLength = (evt) => {
            if(evt.length<6){

            }
            else if(evt.length==6){
                max.value = evt;
            }
            else{
                login.value = max.value
            }
        }
       
            const login = ref('');
            const errors = reactive({
                login: false,
               
            })

        
            const success = ref(false);

            const close = () => {
                emit('close', false)
            }

           
            onMounted(() => {
                if (props.selectedInstagram) {
               
                    login.value = props.selectedInstagram.login;
                }
            })

            // const closeAfterUpdate = () => {
            //     getInstagrams();
            //     close();
            // }

            const save = () => {
                errors.login = false;
         
                if (!login.value) {
                    errors.login = true;
                    return;
                }
                const data = ref({});
                data.value.instagram_id = props.index;
                data.value.code = Number(login.value);
                loading.value = true;
                const dataNew = 
                twoFactorInstagram(data.value)
                .then ((r) => {
                    loading.value = false;
                      if (r.error) {
                          emit("succesInstagram", false)
                          return
                      }
                     emit("succesInstagram", true)
                    
                })
                let infoToSend = {
                  
                    login: login.value,
                }
            

            }
            return {
                login,
                max,
                save,
                errors,
                close,
                maxLength,
           loading,
                success,
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
        width: 364px;
        background: var(--modal-bg-color);
        border-radius: 9px;
        padding: 20px 0;
        text-align: left;
    }
    .modal-create-instagram__input-group {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 31px 0 29px;
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
        padding: 6px 10px;

        color: var(--modal-font-color);
        background: var(--modal-element-hover-bg-color);
        border: 0.7px solid var(--modal-input-border-color);
        box-sizing: border-box;
        border-radius: 3px;
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            /* display: none; <- Crashes Chrome on hover */
            -webkit-appearance: none;
            margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
        }
    }
    .modal-create-instagram__buttons {
        padding: 0 20px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 44px;
    }
</style>