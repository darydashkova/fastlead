<template>
<div class="shadow">
    <div class="modal-ignore">
        <div class="modal-ignore__title">
            <div class="modal-ignore__title-name">{{title}}</div>
            <div class="modal-ignore__title-close pointer">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" @click="close">
                    <path d="M22.5003 7.49992C22.2659 7.26559 21.948 7.13394 21.6165 7.13394C21.2851 7.13394 20.9672 7.26559 20.7328 7.49992L15.0003 13.2324L9.26776 7.49992C9.03335 7.26559 8.71547 7.13394 8.38401 7.13394C8.05256 7.13394 7.73467 7.26559 7.50026 7.49992C7.26592 7.73433 7.13428 8.05222 7.13428 8.38367C7.13428 8.71513 7.26592 9.03302 7.50026 9.26743L13.2328 14.9999L7.50026 20.7324C7.26592 20.9668 7.13428 21.2847 7.13428 21.6162C7.13428 21.9476 7.26592 22.2655 7.50026 22.4999C7.73467 22.7343 8.05256 22.8659 8.38401 22.8659C8.71547 22.8659 9.03335 22.7343 9.26776 22.4999L15.0003 16.7674L20.7328 22.4999C20.9672 22.7343 21.2851 22.8659 21.6165 22.8659C21.948 22.8659 22.2659 22.7343 22.5003 22.4999C22.7346 22.2655 22.8662 21.9476 22.8662 21.6162C22.8662 21.2847 22.7346 20.9668 22.5003 20.7324L16.7678 14.9999L22.5003 9.26743C22.7346 9.03302 22.8662 8.71513 22.8662 8.38367C22.8662 8.05222 22.7346 7.73433 22.5003 7.49992Z" fill="#9797BB"/>
                </svg>
            </div>
        </div>
            <div class="modal-ignore__number">
                <div class="modal-ignore__number-name" :class="{'error':error.validNumber}">Номер</div>
                <input v-if="disable" class="modal-ignore__number-input" :class="{'settings-integrations-form__input_error': error}"   placeholder="7 (XXX) XXX-XX-XX"   v-maska="'7 (###) ###-##-##'" v-model="number" disabled>
                <input v-else class="modal-ignore__number-input" :class="{'settings-integrations-form__input_error': error}"   placeholder="7 (XXX) XXX-XX-XX"   v-maska="'7 (###) ###-##-##'" v-model="number">
         
            </div>  
             <div class="modal-ignore__services">
            <div class="modal-ignore__services-title"  :class="{'error':error.validChoise}">Cервисы, из которых не будут приходить сообщения</div>
            <div class="modal-ignore__services-choise">
                <div class="modal-ignore__services-choise-item">
                    <BaseSwitcherNew :model="check[0]" :index="0" @saveCheck="saveCheck" ></BaseSwitcherNew>
                    <div class="modal-ignore__services-choise-title">Не получать сообщения из AmoCRM
                    </div>
                </div>
                <div class="modal-ignore__services-choise-item">
                    <BaseSwitcherNew :model="check[1]" :index="1" @saveCheck="saveCheck" ></BaseSwitcherNew>
                    <div class="modal-ignore__services-choise-title " @click="openCheckbox=!openCheckbox">Не получать сообщения из Yclients
                        <!-- <svg width="10" class="modal-ignore__services-choise-list" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.14053 0.197198C9.07855 0.134713 9.00482 0.0851166 8.92358 0.051271C8.84234 0.0174253 8.7552 0 8.6672 0C8.57919 0 8.49205 0.0174253 8.41081 0.051271C8.32957 0.0851166 8.25584 0.134713 8.19386 0.197198L5.14053 3.25052C5.07855 3.31301 5.00482 3.3626 4.92358 3.39645C4.84234 3.43029 4.7552 3.44772 4.6672 3.44772C4.57919 3.44772 4.49205 3.43029 4.41081 3.39645C4.32957 3.3626 4.25584 3.31301 4.19386 3.25052L1.14053 0.197198C1.07855 0.134713 1.00482 0.0851166 0.92358 0.051271C0.84234 0.0174253 0.755203 0 0.667195 0C0.579187 0 0.49205 0.0174253 0.41081 0.051271C0.329571 0.0851166 0.255837 0.134713 0.193862 0.197198C0.0696944 0.322106 0 0.491073 0 0.667197C0 0.84332 0.0696944 1.01229 0.193862 1.1372L3.25386 4.19719C3.62886 4.57172 4.13719 4.78209 4.6672 4.78209C5.1972 4.78209 5.70553 4.57172 6.08053 4.19719L9.14053 1.1372C9.2647 1.01229 9.33439 0.84332 9.33439 0.667197C9.33439 0.491073 9.2647 0.322106 9.14053 0.197198Z" fill="#9797BB"/>
                        </svg> -->
                    </div>
                    </div> 
                    <div class="modal-ignore__services-choise-check" style="display:none" :class="{'modal-ignore__services-choise-check_hidden':!openCheckbox}">
                         <label class="container">Поздравления с днём рождения
                            <input type="checkbox" checked="checked" class="modal-ignore__services-choise-check">
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">Поздравления с днём рождения
                            <input type="checkbox" checked="checked" class="modal-ignore__services-choise-check">
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">Поздравления с днём рождения
                            <input type="checkbox" checked="checked" class="modal-ignore__services-choise-check">
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">Поздравления с днём рождения
                            <input type="checkbox" checked="checked" class="modal-ignore__services-choise-check">
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">Поздравления с днём рождения
                            <input type="checkbox" checked="checked" class="modal-ignore__services-choise-check">
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">Поздравления с днём рождения
                            <input type="checkbox" checked="checked" class="modal-ignore__services-choise-check">
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">Поздравления с днём рождения
                            <input type="checkbox" checked="checked" class="modal-ignore__services-choise-check">
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">Поздравления с днём рождения
                            <input type="checkbox" checked="checked" class="modal-ignore__services-choise-check">
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">Поздравления с днём рождения
                            <input type="checkbox" checked="checked" class="modal-ignore__services-choise-check">
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">Поздравления с днём рождения
                            <input type="checkbox" checked="checked" class="modal-ignore__services-choise-check">
                            <span class="checkmark"></span>
                        </label>
                </div>
                <div class="modal-ignore__services-choise-item">
                    <BaseSwitcherNew :model="check[2]" :index="2" @saveCheck="saveCheck"></BaseSwitcherNew>
                    <div class="modal-ignore__services-choise-title">Не получать сообщения из Рассылок
                    </div>
                </div>
            </div>
            
        </div>
        <div class="modal-ignore__buttons">
            <div class="base-button base-button_enter base-button_p5-15" @click="save">Сохранить</div>
            <div class="base-button base-button_border-green" @click="close">Отмена</div>
        </div>
    </div>    
</div>

</template>
<script>
import {ref, watch} from "vue"
import BaseSwitcherNew from "../../Base/BaseSwitcherNew"
import {useIgnore} from "../../../composition/useIgnore"
export default {
    components: {
        BaseSwitcherNew
    },
    props:{
        title: String,
        editData:Object,
    },
    emits: ["close"], 
    setup(props, {emit}) {
         const openCheckbox = ref(false);
         const { getAllIgnoreNumbers, addIgnoreNumber, getOneNumber, deleteIgnoreNumber, updateIgnoreNumber } = useIgnore()
         const number = ref('');
         const error = ref({});
         const check = ref([false, false, false]);
         const editFormatPhone = ref();
          const formatedPhone = (number) => {
            let phone = number;
            if(phone.match(/^\d+$/)){
                let match = phone.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
                const num = match[1] + ' (' + match[2]+ ') '+ match[3] + '-'+ match[4]+ '-'+match[5];
                phone =num;
                editFormatPhone.value=phone;
            }
            }
         const validateNumber = () => {
            if(number.value.length<17){
               error.value.validNumber = true 
            }
            else{
                error.value.validNumber = false 
                testSend();
            }
        }
         const validChoise = () => {
             if(!check.value[0]&&!check.value[1]&&!check.value[2]){
                error.value.validChoise = true
                 
            }
            else{
                error.value.validChoise = false 
            }
        }
        const isEdit = ref(true);
        const editNumber = ref({});
        const disable = ref(false);
        watch(()=>{
            if(props.editData&&props.editData.hasOwnProperty('phone')){
                if(isEdit.value){
                    editNumber.value = props.editData
                    formatedPhone(editNumber.value.phone);
                    disable.value = true;
                    number.value =  editFormatPhone.value;
                    if( editNumber.value.is_amocrm){
                        check.value[0] = true;
                    }
                    if( editNumber.value.is_yclients){
                        check.value[1] = true;
                    }
                    if( editNumber.value.is_mass_sending){
                        check.value[2] = true;
                    isEdit.value=false
                    }

                }
            }
        })
        const save = () => {
            const data = ref({});
            validChoise();
            validateNumber();
            if(!error.value.validChoise&&!error.value.validNumber){   
            data.value.phone =  validNumber.value;
            if(props.title.includes('Добавить номер')){
                if(check.value[0]){
                    data.value.is_amocrm= true
                }
                if(check.value[1]){
                data.value.is_yclients= true
                }
                if(check.value[2]){
                data.value.is_mass_sending= true
                }
                addIgnoreNumber(data.value)
                .then((r) => {
                     emit("update");
                emit("close", false);      
                })

            }
            else{
                 if(check.value[0]){
                    data.value.is_amocrm= true
                }
                else{
                    data.value.is_amocrm= false
                }
                if(check.value[1]){
                    data.value.is_yclients= true
                }
                else{
                     data.value.is_yclients= false
                }
                if(check.value[2]){
                    data.value.is_mass_sending= true
                }
                else{
                    data.value.is_mass_sending= false    
                }
                updateIgnoreNumber(data.value)
                .then((r) => {
                     emit("update");
                emit("close", false);      
                })
            }
                
            }

          
        }
        const close = () => {
            emit("close", false);
        }
        const saveCheck = (item, index) => {
            check.value[index] = item
        }
        const validNumber = ref();
         const testSend = () => {
            validNumber.value = number.value.replace(/\s/g, '').replace(/-/g, '').replace("(", '').replace(")", '');
         }
         
         
        return{
            number,
            error,
            validateNumber,
            openCheckbox,
            check,
            saveCheck,
            save,
            testSend,
            close,
            validChoise,
            validNumber,
            editNumber,
            isEdit,
            formatedPhone,
            editFormatPhone,
            disable
        }
    },
}
</script>
<style lang="scss">
    .modal-ignore{
        width:520px;
        background: #252544;
        position: absolute;
        top: 30%;
        left: 45%;
        transform: translate(-45%, -30%);
        box-shadow: 2px 5px 40px rgba(6, 6, 9, 0.2);
        border-radius: 6px;
        &__title{
            display: flex;
            justify-content: space-between;
            width:100%;
            border-bottom: 1px solid #1D1D35;
            padding: 24px;
            &-name{
                font-weight: bold;
                font-size: 24px;
                line-height: 24px;
                color: #F0F0FA;
            }
        }
        &__number{
            display: flex;
            flex-direction: column;
            text-align: left;
            padding: 24px;
            &-name{
                font-size: 14px;
                line-height: 140%;
                padding-bottom: 6px;
                color: #CFCFE4;  
            }
            &-input{
                height: 46px;
                padding: 0px 10px;
                border-radius: 4px;
                border: 1px solid #252544;
                background: #1D1D35;
                color: #CFCFE4;
                &::placeholder{
                    color: #40406B;
                }
            }
        }
        &__services{
            padding: 0px 24px;
            margin-bottom:23px ;
            &-title{
                text-align: left;
                font-weight: normal;
                font-size: 14px;
                line-height: 140%;
                color: #CFCFE4;
                padding-bottom: 6px;
            }
            &-choise{
                background: #1D1D35;
                border-radius: 6px;
                display: flex;
                padding: 0px 10px;
                flex-direction: column;
                &-item{
                    display:flex;  
                    align-items: center; 
                    padding:12px 0px;
                }
                &-title{
                    padding-left: 16px;
                    display: flex;
                    align-items: center;
                    font-weight: normal;
                    font-size: 14px;
                    line-height: 140%;
                    color: #9797BB;
                }
                &-list{
                    margin-left:8px;
                }
                &-check{
                    padding-top:12px;
                    padding-bottom:12px;
                    height:375px;
                    overflow:auto;
                    max-height: 200px;    
                    transition: 0.1s height ease-in, 0.1s padding  ; 
                    &::-webkit-scrollbar {
                    width: 0;
                    }
                    .container {
                    padding:8px 0px;
                    display: flex;
                    position: relative;
                    padding-left: 35px;
                    font-weight: normal;
                    font-size: 14px;
                    line-height: 140%;
                    color: #9797BB;
                    cursor: pointer;
                    user-select: none;
                    }
                    .container input {
                    position: absolute;
                    opacity: 0;
                    cursor: pointer;
                    height: 0;
                    width: 0;
                    }
                    .checkmark {
                    position: absolute;
                    top: 50%;
                    left: 0;
                    transform: translateY(-50%);
                    height: 16px;
                    width: 16px;
                    background-color:  transparent;
                    border:1px solid  #B9B9B9;
                    border-radius: 2px;
                    }
                    .container input:checked ~ .checkmark {
                    background: linear-gradient(45.66deg, #22A595 -40.44%, #84D160 120.07%);
                    border-radius: 2px;
                      border:none;
                    }

                    .checkmark:after {
                    content: "";
                    position: absolute;
                    display: none;
                    }

                    .container input:checked ~ .checkmark:after {
                    display: block;
                    }

                    .container .checkmark:after {
                        left: 50%;
                        top: 50%;
                        width: 4px;
                        height: 9px;
                        border: solid #252544;
                        border-width: 0 1px 1px 0;
                        transform: translate(-50%, -50%) rotate(45deg);
                    }
                    
                }
                &-check_hidden{
                    overflow:hidden;     
                    height:0px;     
                    transition: 0.1s height ease-in, 0.1s padding  ; 
                    padding:0;
                }
            }
        }
        &__buttons{
             border-top: 1px solid #1D1D35;
             padding:20px 24px;
            display: flex;
            .base-button_enter{
                margin-right: 22px;
            }
        }
    }
    .error{
        color:#EB5757 !important;
    }
</style>