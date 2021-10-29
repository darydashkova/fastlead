<template>
<div>
    <div class="settings-integrations-form__field">
        <div class="settings-integrations-form__date settings-integrations-form__record-time ">
            <div class="settings-integrations-form__date-column">
                <div>Наименования</div>               
                <input class="settings-integrations-form__input_test " v-model="name"  placeholder="Ввести">  
            </div>
            <div class="settings-integrations-form__date-column">
                <div>ID филиала</div>
                    <input class="settings-integrations-form__input_test " type="number" placeholder="Ввести" v-model="filial"> 
            </div>
            <div class="settings-integrations-form__date-column">
                <div>Аккаунт</div>
                <div class="settings-integrations-form__container">
                    <button @click="openAcc" class="settings-integrations-form__input_test " :class="{'settings-integrations-form__select_active': statusAccSelect }"> 
                        <div class="settings-integrations-form__dropdown-inner" :class="{'settings-integrations-form__dropdown-inner_placeholder':(textOption=='Выбрать')}"> {{textOption}}
                            <svg class="settings-integrations-form__dropdown-inner-arrow" width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.1888 2.46058C4.16403 2.48338 4.1346 2.50147 4.1022 2.51381C4.06981 2.52615 4.03508 2.5325 4 2.5325C3.96492 2.5325 3.93019 2.52615 3.8978 2.51381C3.8654 2.50147 3.83597 2.48338 3.8112 2.46058L1.36591 0.215245C1.21591 0.0774725 1.01243 4.67421e-05 0.800243 7.24799e-07C0.588055 -4.52925e-05 0.384538 0.0772927 0.234464 0.215001C0.084389 0.352709 5.0074e-05 0.539506 6.11966e-08 0.7343C-4.99516e-05 0.929095 0.0841932 1.11593 0.234197 1.2537L2.68002 3.49904C3.03044 3.81985 3.50512 4 4 4C4.49488 4 4.96956 3.81985 5.31998 3.49904L7.7658 1.2537C7.91581 1.11593 8.00005 0.929095 8 0.7343C7.99995 0.539506 7.91561 0.352709 7.76554 0.215001C7.61546 0.0772928 7.41194 -4.52111e-05 7.19976 8.01112e-07C6.98757 4.68134e-05 6.78409 0.0774725 6.63409 0.215245L4.1888 2.46058Z" fill="#9797BB">
                                </path>
                            </svg>
                        </div>
                        <div class="settings-integrations-form__dropdown-list" v-if="statusAccSelect">
                            <div  class="settings-integrations-form__dropdown-item" v-for=" (whatsapp, index) in whatsapps" :key="index" @click="chooseOption(whatsapp.phone), chooseId(whatsapp.whatsapp_id)">
                                {{whatsapp.phone}}
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
         <!-- <div class="settings-integrations-form__date settings-integrations-form__record-time settings-integrations-form__date settings-integrations-form__record-time_top settings-integrations-form__record-time-dop">
            <div class="settings-integrations-form__date-column">
                <div>Дополнительные фильтры</div>
                <div class="settings-integrations-form__container">
                    <button @click="openFilters" class="settings-integrations-form__input_test" :class="{'settings-integrations-form__select_active': statusFiltersSelect }"> 
                        <div class="settings-integrations-form__dropdown-inner settings-integrations-form__dropdown-inner_placeholder"> Показать
                            <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.14053 0.197198C9.07855 0.134713 9.00482 0.0851166 8.92358 0.051271C8.84234 0.0174253 8.7552 0 8.6672 0C8.57919 0 8.49205 0.0174253 8.41081 0.051271C8.32957 0.0851166 8.25584 0.134713 8.19386 0.197198L5.14053 3.25052C5.07855 3.31301 5.00482 3.3626 4.92358 3.39645C4.84234 3.43029 4.7552 3.44772 4.6672 3.44772C4.57919 3.44772 4.49205 3.43029 4.41081 3.39645C4.32957 3.3626 4.25584 3.31301 4.19386 3.25052L1.14053 0.197198C1.07855 0.134713 1.00482 0.0851166 0.92358 0.051271C0.84234 0.0174253 0.755203 0 0.667195 0C0.579187 0 0.49205 0.0174253 0.41081 0.051271C0.329571 0.0851166 0.255837 0.134713 0.193862 0.197198C0.0696944 0.322106 0 0.491073 0 0.667197C0 0.84332 0.0696944 1.01229 0.193862 1.1372L3.25386 4.19719C3.62886 4.57172 4.13719 4.78209 4.6672 4.78209C5.1972 4.78209 5.70553 4.57172 6.08053 4.19719L9.14053 1.1372C9.2647 1.01229 9.33439 0.84332 9.33439 0.667197C9.33439 0.491073 9.2647 0.322106 9.14053 0.197198Z" fill="#CFCFE4"/>
                            </svg>
                        </div>
                    </button> 
                    <div class="settings-integrations-form__dropdown-list settings-integrations-form__dropdown-list-filters" :class="{' settings-integrations-form__dropdown-list-filters_hidden':!statusFiltersSelect}">
                        <div class="settings-integrations-form__dropdown-list-filters-title">Клиент потратил сумму</div>
                        <div class="settings-integrations-form__date-row">
                            <div class="settings-integrations-form__date-column">
                                <div class="settings-integrations-form__date-column-title">От</div>
                                <input type="number"   min="0"  class="settings-integrations-form__date-input" placeholder="00" >
                            </div>
                            <div class="settings-integrations-form__date-column settings-integrations-form__date-column_end">
                                <div class="settings-integrations-form__date-column-title">До</div>
                                <input type="number"   min="0"  class="settings-integrations-form__date-input"  placeholder="00">
                            </div>
                        </div>
                        <div class="settings-integrations-form__dropdown-list-filters-title">Кол-во посещений</div>
                        <div class="settings-integrations-form__date-row">
                            <div class="settings-integrations-form__date-column">
                                <div class="settings-integrations-form__date-column-title">От</div>
                                <input type="number"   min="0" class="settings-integrations-form__date-input"  placeholder="00">
                            </div>
                            <div class="settings-integrations-form__date-column settings-integrations-form__date-column_end">
                                <div class="settings-integrations-form__date-column-title">До</div>
                                <input type="number"   min="0"  class="settings-integrations-form__date-input"  placeholder="00">
                            </div>
                        </div>
                        <div class="settings-integrations-form__dropdown-list-filters-title">Поздравить за N до дня рождения</div>
                        <div class="settings-integrations-form__date-row">
                            <div class="settings-integrations-form__date-column">
                                <div class="settings-integrations-form__date-column-title">От</div>
                                <input type="number"   min="0"  class="settings-integrations-form__date-input"  placeholder="00">
                            </div>
                            <div class="settings-integrations-form__date-column settings-integrations-form__date-column_end">
                                <div class="settings-integrations-form__date-column-title">До</div>
                                <input type="number"   min="0"  class="settings-integrations-form__date-input"  placeholder="00">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
    <div class="settings-integrations-form__field ">
        <div class=" settings-integrations-form__create-message">
            <SettingsIntegrationsMessage @dataFile='checkData' @propText="getText" :text='textMess' :nameFile='propFileData'></SettingsIntegrationsMessage>
            <SettingsIntegrationsVariables></SettingsIntegrationsVariables>
        </div>
         <!-- <TestCheck></TestCheck>  -->
    </div> 
    <div class="settings-integrations-form__field_no-border">
        <button class="base-button_border-green pointer" @click="deleteBirthday">Удалить</button>
        <template v-if="Propdata&&Propdata.parameters">
            <button class="base-button base-button_enter base-button_p5-15 pointer" @click="update(data)">Изменить</button> 
        </template> 
        <template v-else>
            <button class="base-button base-button_enter base-button_p5-15 pointer" @click="post(data)">Сохранить</button>
        </template>
    </div>
</div>
</template>
<script>
import { ref, reactive, watch } from "vue";
import SettingsIntegrationsMessage from "../SettingsIntegrationsMessage";
import SettingsIntegrationsVariables from "../SettingsIntegrationsVariables";
import TestCheck from "../SettingsIntegrationsElems/TestCheck.vue";
import { useWhatsapp } from "../../../../composition/useWhatsapp";
import {useIntegrations} from "../../../../composition/useIntegrations"
import { useRouter, useRoute}  from 'vue-router'

export default {
  components: { SettingsIntegrationsMessage, SettingsIntegrationsVariables, TestCheck },
  props: {
      Propdata:Object
      },
    setup(props) {
         const router = useRouter();
        const {postBirthdayTask, updateTask} = useIntegrations()
        const { whatsapps, getWhatsapps } = useWhatsapp()
        const statusSelect = ref(false);
        const textOption = ref('');
        const minute = ref('00');
        const hours = ref('00');
        const statusAccSelect = ref(false);
        const statusFiltersSelect = ref(false);
        const sum1 = ref(1);
        const sum2 = ref(2);
        const name = ref('');
        const filial = ref('');
        const message = ref('');
        const whatsappId=ref();
        const textMess = ref('')
        const fileData = ref([])
        const propFileData = ref('');
        getWhatsapps()
        const data = ref({
                type: "PostCreatedNotification",
                task_name: "Уведомление о созданной записи",
                parameters:
                [
                    {
                        message: {
                            type: "text",
                            data: "",
                        },
                        whatsapp_id : null,
                        company_id : null
                    }
                ]
            })
            const getText = (text) => {
                message.value = text;
            }
            const chooseId = (id) => {
                whatsappId.value = id
            }
            const checkData = (data) => {
                console.log(data)
                if(data.length!=0){                
                   fileData.value = data
                  
                }
            }
            const ValidateDate = () => {
                if(textOption.value=='Выбрать'){
                    data.value.parameters[0].company_id ='';
                    return false
                }
                else{
                    data.value.parameters[0].company_id = filial.value; 
                }
               
                 if(whatsappId.value=='undefined'){
                    return false
                }
                else{
                    data.value.parameters[0].whatsapp_id =  whatsappId.value;    
                }
                
                if((message.value=='')||(message.value=='undefined')){
                    if(props.Propdata.parameters){
                         console.log('111')
                         console.log(props.Propdata.parameters[0])
                        if( props.Propdata.parameters[0].message.Caption!=null){
                                   console.log('22')
                            if( fileData.value.length!=0){
                                data.value.parameters[0].message.caption = props.Propdata.parameters[0].message.Caption;
                                data.value.parameters[0].message.data =  fileData.value[0];
                                data.value.parameters[0].message.type = fileData.value[1]
                                 console.log(props.Propdata.parameters[0].message.Caption)
                            }
                            else{
                                    data.value.parameters[0].message.caption = props.Propdata.parameters[0].message.Caption;
                    //    data.value.parameters[0].message.data = props.Propdata.parameters[0].message.file_uid;
                    console.log(props.Propdata.parameters[0].message.Caption)
                       data.value.parameters[0].message.type =  props.Propdata.parameters[0].message.Type 
                       if( props.Propdata.parameters[0].message.Img!=null){
                           data.value.parameters[0].message.data = props.Propdata.parameters[0].message.Img; 
                       }
                       else if(props.Propdata.parameters[0].message.Document!=null){
                              data.value.parameters[0].message.data = props.Propdata.parameters[0].message.Document; 
                       }
                        else if(props.Propdata.parameters[0].message.Video!=null){
                              data.value.parameters[0].message.data = props.Propdata.parameters[0].message.Video; 
                       } 
                            }
                            console.log( data.value.parameters[0].message)
                   
                        }
                        else{
                            data.value.parameters[0].message.data =  props.Propdata.parameters[0].message.Text;    
                        }
                       
                    }
                    
                else{
                    return false   
                    }
                }
                else{
                    if (fileData.value.length!=0){
                       data.value.parameters[0].message.caption =  message.value;
                       data.value.parameters[0].message.data =  fileData.value[0];
                       data.value.parameters[0].message.type = fileData.value[1]
                    } 
                    else{
                         data.value.parameters[0].message.data = message.value;
                    }   
                }  
                if(((name.value=='')||(name.value=='undefined'))){
                      return false  
                }
                else {
                       data.value.task_name =  name.value;    
                }
                return true
            }
            const checkOpenModal = (item) => {
                statusAccSelect.value=false;
                statusSelect.value=false;
                statusFiltersSelect.value=false;
                item.value = true;
            }
        const post = () => {
            if (ValidateDate()){
                const dataNew = data.value
                console.log(dataNew)
                postBirthdayTask(dataNew)
                .then(r=> {
                    console.log(r)
                    router.push('/settings/integrations/yclients/create')
                })
                
            } 
        }
        const update = () => {
           data.value.task_id = props.Propdata.task_id;
            // if(message.value==''){
            //     data.value.parameters[0].message.data = props.Propdata.parameters[0].message.Text;
            // }
            if (ValidateDate()){
                const dataNew = data.value
                console.log(dataNew)
                updateTask(dataNew)
                 .then(r=> {
                   router.push('/settings/integrations/yclients/create')  
                 })
                
            } 
        }
        watch(()=>{
            if(props.Propdata.parameters){
                if(props.Propdata.parameters[0].message.Caption!=null){
                    textMess.value = props.Propdata.parameters[0].message.Caption
                    // if(textMess.value = props.Propdata.parameters[0].message.Img!=null){
                    //   propFileData.value.push(props.Propdata.parameters[0].message.Img)  
                    // }
                    propFileData.value = props.Propdata.parameters[0].message.file_name
                }
                else{
                 textMess.value = props.Propdata.parameters[0].message.Text   
                }
                
                name.value=props.Propdata.task_name;
                filial.value=props.Propdata.parameters[0].company_id
                whatsappId.value=props.Propdata.parameters[0].whatsapp_id
                for(let i =0; i< whatsapps.value.length; i++){
                    if(whatsapps.value[i].whatsapp_id==whatsappId.value){
                        const phone =whatsapps.value[i].phone
                        textOption.value = phone
                    } 
                }   
             
            }
        })
        textOption.value = 'Выбрать';
        const chooseOption = (text) => {
                textOption.value = text
            }
        const chooseAcc = (text) => {
            timeZoneOption.value = text.path[0].innerHTML
        }
        const openSelect = () => {
            statusSelect.value = !statusSelect.value;
            if(statusSelect.value){
             checkOpenModal(statusSelect)   
            } 
        }
        const openAcc =  () => {
            statusAccSelect.value=!statusAccSelect.value;
             if(statusAccSelect.value){
             checkOpenModal(statusAccSelect)   
            }
        }
        const openFilters = () => {
            statusFiltersSelect.value=!statusFiltersSelect.value;
            if(statusFiltersSelect.value){
             checkOpenModal(statusFiltersSelect)   
            }
        }
        const checkFilters = (item) => {
            item = String(item);
            if ( item.startsWith('0')){
              item = item.split('');
              item = item.splice(0,1);
              item = String(item);
              item - Number(item);
            }
        }
         
        const values = reactive( {
            title: ['Поздравление с днём рождения', 'fdfc', 'fsfsf', 'fsfs' ]
        })
        const deleteBirthday = () => {
            filial.value=null;
            name.value='';
            timeOption.value='Выбрать'
            textOption.value='Выбрать',
            textMess.value='';
        }
        return {
            checkOpenModal,
            openSelect,
            statusSelect,
            values,
            chooseOption,
            textOption,
            minute,
            hours,
            statusAccSelect,
            openAcc,
            openFilters,
            statusFiltersSelect,
            sum1,
            sum2,
            checkFilters,
            chooseAcc,
            data,
            name,
            post,
            filial,
            whatsapps,
            message,
            getText,
            chooseId,
            whatsappId,
            ValidateDate,
            deleteBirthday,
            textMess,
            update,
            checkData,
            fileData,
            propFileData
        }
    },
}
</script>
<style lang="scss">



.settings-integrations-form__record-time{
    .settings-integrations-form__date-column{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .settings-integrations-form__input_test{
            width: 100%;
            margin-left: 0;
            height: 39px;
           
            &::-webkit-input-placeholder {color:#40406B;}
            &::-moz-placeholder {color:#40406B;}
            &:-moz-placeholder {color:#40406B;}
            &:-ms-input-placeholder {color:#40406B;}
            .settings-integrations-form__dropdown-inner{
                height: 100%;
                overflow: hidden;
                align-items: flex-start;
            }
            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
            }
        }
        &-title{
           width: 93%; 
        }
        &_end{
            align-items: flex-end;
        }
    }
    .settings-integrations-form__dropdown-inner{
        position: relative;
        svg {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
        }
        &_placeholder{
            color:#40406B;
        }
    }
    .settings-integrations-form__dropdown-list{
      &-time{
        display: flex;
        padding: 18px;
        background: #1D1D35;
    }  
    &-filters{
    display: flex;
    flex-direction: column;
    padding: 0px 18px;
    width: 93%;
    .settings-integrations-form__date-row{
        display: flex;
        padding-bottom: 18px;
        border-bottom: 1px solid #40406B;
        flex-direction: row;
    }
    &-title{
        padding-bottom: 16px;
        padding-top: 18px;
    }
    input[type="number"]::-webkit-outer-spin-button, 
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none; 
        background: #2E2E4E url('../../../../assets/arrowFilters.svg') no-repeat center center;
        width: 1em;

        opacity: .5; /* shows Spin Buttons per default (Chrome >= 39) */
        position: absolute;
        top: 0;
        right: 5px;
        bottom: 0;
    }
    &_hidden{
        display: none;
    }
    }
    &_max-height{
        max-height: 200px;
        overflow: auto;
        -ms-overflow-style: none;
        scrollbar-width: none;
        &::-webkit-scrollbar {
        width: 0;
        height: 0;
        }
    }
    }
    .settings-integrations-form__date-input-arrow{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    &_top{
        padding-top:22px;
    }
    &-dop{
        width:71.3%;
    }
}
.settings-integrations-form__create-message{
    display: flex;
    justify-content: space-between;
}  
 .settings-integrations-form__field_no-border{
    padding: 36px 30px;
    width: 100%;
    display: flex;
justify-content: flex-end;
    .base-button_border-green{
        padding: 8px 18px;
        border-radius: 6px;
        margin-right: 19px;
    }
    .base-button{
        color: #1D1D35;
        font-weight: 500;
    }
    }
</style>