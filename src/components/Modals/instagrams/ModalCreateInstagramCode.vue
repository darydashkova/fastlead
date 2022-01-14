<template>
    <div class="modal-create-instagram" @mousedown.self="close">
        <div class="modal-create-instagram__bodys">
        <div class="modal-create-instagram__headers">
            <div class="modal-create-instagram__headers_title">
               Введите свой код безопасности
            </div>
            <div class="modal-create-instagram__headers_close">
               <img class="pointer" src="@/assets/close.svg" @click.self="close">
            </div>
        </div>
            <div class="modal-create-instagram__input-group modal-create-instagram__input-group_padding-20">
                <div for-id="modal-create-instagram__input" class="modal-create-instagram__input-group_title" :class="{'base-modal-label_error': errors.login}">
                    {{errors.login? 'Проверьте правильность ввода' : '6-значный код из SMS'}}
                </div>
                <!--<input id="modal-create-instagram__input"
                       type="number"
                       class="modal-create-instagram__input"
                       v-model="login"
                     maxlength = "6"
                     @input="maxLength(login)"
                       >-->
                    <div class="modal-create-instagram__code">
                        <template v-for="(inputCode, index) in inputCodes" :key="index">
                            <input @input="jumpInput" type="number" v-maska="'#'"  class="modal-create-instagram__code_input" v-model="inputCode.value" placeholder="–">
                        </template>
                    </div>
            </div>
          
            <div class="modal-create-instagram__buttons">
                <BaseButton
                        class="base-button_enter modal-create-instagram__buttons_access"
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

    import { onMounted, ref, reactive, computed, onUpdated, watch } from "vue";
    import {useInstagram} from "../../../composition/useInstagrams";
    import FullScreenLoader from "../../FullScreenLoader";

    export default {
        components: {FullScreenLoader, BaseButton, BaseModalLabel, BaseModalHeader, ModalCreateInstagramSuccess },
        props: {
            index:Number,
            instagramId: Number,
        },
        emits:["succesInstagram"],
        setup(props, {emit}) {
            const loading = ref(false);
            const { createInstagram, updateInstagram, getInstagrams, twoFactorInstagram, activateInstagram } = useInstagram()
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

            const inputCodes = ref([
                {id: 1, value: ""},
                {id: 2, value: ""},
                {id: 3, value: ""},
                {id: 4, value: ""},
                {id: 5, value: ""},
                {id: 6, value: ""},
            ])
       
            const login = ref('');

            const initialLogin = () => {
                login.value= inputCodes.value[0].value + inputCodes.value[1].value + inputCodes.value[2].value + inputCodes.value[3].value + inputCodes.value[4].value + inputCodes.value[5].value
            }

            onUpdated(() => {
              initialLogin()  
            })

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
            const jumpInput = (e) => {
                const delInputs = e.path[1].children
                    for(i=0; i < inputCodes.value.length; i++){
                        if(inputCodes.value[i].value != ""){
                            delInputs[i+1].focus()
                        }
                    }
            }

            const save = () => {
                errors.login = false;
         
                if (!login.value) {
                    errors.login = true;
                    return;
                }
                const data = ref({});
                data.value.instagram_id = props.index;
                data.value.code = login.value;
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
                inputCodes,
                initialLogin,
                instagramId: computed(() => props.instagramId),
                jumpInput,
                input: ($event) => emit('inputValue', $event.target.value),
                
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
    .modal-create-instagram__bodys{
         width: 520px;
        height: 360px;
        background: #252544;
        border-radius: 9px;
        padding: 20px 0;
        text-align: left;
    }
    .modal-create-instagram__headers{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border-bottom: 1px solid #1D1D35;
        padding: 0px 24px 32px;
        &_title{
            font-size: 24px;
            color: #F0F0FA;
        }
        &_close{
            padding-top: 4px;
        }
    }
    .modal-create-instagram__input-group {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 31px 0 29px;
        &_title{
            color: #CFCFE4;
            font-size: 14px;
            font-weight: 400px;
        }
        &.modal-create-instagram__input-group_padding-20 {
            padding: 0 24px;  
        }
    }
    .modal-create-instagram__code {
        font-family: Segoe UI;
        display: flex;
        padding: 9px 0px;
        &_input{
            font-style: normal;
            font-weight: 600;
            font-size: 30px;
            text-align: center;
            margin-top: 6px;
            padding: 6px 10px;
            color: var(--modal-font-color);
            background: #1D1D35;
            border-radius: 3px;
            width: 73.67px;
            height: 90px;
            margin-right: 6px;
            line-height: 37px;
            &::placeholder{
                position: absolute;
                margin-top: 50%;
                color: #40406B;
                margin-left: 25%;
            }
            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                /* display: none; <- Crashes Chrome on hover */
                -webkit-appearance: none;
                margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
            }
        }
    }
    .modal-create-instagram__buttons {
        padding: 18px 24px;
        width: 100%;
        display: flex;
        margin-top: 30px;
        justify-content: flex-start;
        border-top: 1px solid #1D1D35;
        &_access{
            color: #252544;
            padding-top: 10px;
            margin-right: 22px;
        }
    }
</style>