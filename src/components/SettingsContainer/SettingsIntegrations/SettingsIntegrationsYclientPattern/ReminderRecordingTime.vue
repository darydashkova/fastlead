<template>
<div>
     <div class="settings-integrations-form__field">
    <div class="settings-integrations-form__date settings-integrations-form__record-time ">
        <div class="settings-integrations-form__date-column">
            <div>Наименования</div>               
                    <input class="settings-integrations-form__input_test " v-model="name"  placeholder="Ввести">  
                </div>
                <!-- <div class="settings-integrations-form__date-column">
                    <div>Часовой пояс</div>
                    <div class="settings-integrations-form__container">
                <div class="settings-integrations-form__container-arrow ">
                </div>
                <button @click="openSelect" class="settings-integrations-form__input_test " :class="{'settings-integrations-form__select_active': statusSelect }"> 
                    <div class="settings-integrations-form__dropdown-inner" :class="{'settings-integrations-form__dropdown-inner_placeholder':(timeZoneOption=='Выбрать')}"> {{timeZoneOption}}
                        <svg class="settings-integrations-form__dropdown-inner-arrow" width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.1888 2.46058C4.16403 2.48338 4.1346 2.50147 4.1022 2.51381C4.06981 2.52615 4.03508 2.5325 4 2.5325C3.96492 2.5325 3.93019 2.52615 3.8978 2.51381C3.8654 2.50147 3.83597 2.48338 3.8112 2.46058L1.36591 0.215245C1.21591 0.0774725 1.01243 4.67421e-05 0.800243 7.24799e-07C0.588055 -4.52925e-05 0.384538 0.0772927 0.234464 0.215001C0.084389 0.352709 5.0074e-05 0.539506 6.11966e-08 0.7343C-4.99516e-05 0.929095 0.0841932 1.11593 0.234197 1.2537L2.68002 3.49904C3.03044 3.81985 3.50512 4 4 4C4.49488 4 4.96956 3.81985 5.31998 3.49904L7.7658 1.2537C7.91581 1.11593 8.00005 0.929095 8 0.7343C7.99995 0.539506 7.91561 0.352709 7.76554 0.215001C7.61546 0.0772928 7.41194 -4.52111e-05 7.19976 8.01112e-07C6.98757 4.68134e-05 6.78409 0.0774725 6.63409 0.215245L4.1888 2.46058Z" fill="#9797BB">
                            </path>
                        </svg>
                        </div>
                        <div class="settings-integrations-form__dropdown-list settings-integrations-form__dropdown-list_max-height" v-if="statusSelect">
                            <div  class="settings-integrations-form__dropdown-item" v-for=" (item, index) in timeZones" :key="index" @click="chooseAcc">
                               (GMT {{item.time}}:00) {{item.city}}
                            </div>
                        </div>
                </button>
                </div>
                </div> -->
                 <div class="settings-integrations-form__date-column">
                    <div>Время запуска</div>
                    <div class="settings-integrations-form__container">
                <div class="settings-integrations-form__container-arrow ">
                </div>
                <button @click="statusTimeSelected" class="settings-integrations-form__input_test " :class="{'settings-integrations-form__select_active': statusTimeSelect }"> 
                    <div class="settings-integrations-form__dropdown-inner" :class="{'settings-integrations-form__dropdown-inner_placeholder':(timeOption=='Выбрать')}"> {{timeOption}}
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0)">
                            <path d="M8 0C6.41775 0 4.87104 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346629 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C15.9977 5.87897 15.1541 3.84547 13.6543 2.34568C12.1545 0.845886 10.121 0.00229405 8 0V0ZM8 14.6667C6.68146 14.6667 5.39253 14.2757 4.2962 13.5431C3.19987 12.8106 2.34539 11.7694 1.84081 10.5512C1.33622 9.33305 1.2042 7.99261 1.46144 6.6994C1.71867 5.40619 2.35361 4.21831 3.28596 3.28596C4.21831 2.35361 5.4062 1.71867 6.6994 1.46143C7.99261 1.2042 9.33305 1.33622 10.5512 1.8408C11.7694 2.34539 12.8106 3.19987 13.5431 4.2962C14.2757 5.39253 14.6667 6.68146 14.6667 8C14.6647 9.76752 13.9617 11.4621 12.7119 12.7119C11.4621 13.9617 9.76752 14.6647 8 14.6667Z" fill="#CFCFE4"/>
                            <path d="M7.99964 4C7.82283 4 7.65326 4.07024 7.52824 4.19526C7.40321 4.32029 7.33297 4.48986 7.33297 4.66667V7.55L5.08564 8.958C4.93535 9.05188 4.82851 9.20163 4.78863 9.37428C4.74875 9.54694 4.77909 9.72837 4.87297 9.87866C4.96686 10.029 5.1166 10.1358 5.28926 10.1757C5.46192 10.2156 5.64335 10.1852 5.79364 10.0913L8.35364 8.49133C8.45037 8.43073 8.52991 8.34631 8.58466 8.24615C8.6394 8.146 8.66752 8.03346 8.66631 7.91933V4.66667C8.66631 4.48986 8.59607 4.32029 8.47105 4.19526C8.34602 4.07024 8.17645 4 7.99964 4Z" fill="#CFCFE4"/>
                            </g>
                            <defs>
                            <clipPath id="clip0">
                            <rect width="16" height="16" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>
                    </div>
                </button> <div class="settings-integrations-form__dropdown-list settings-integrations-form__dropdown-list-time" v-if="statusTimeSelect">
                            <div class="settings-integrations-form__date-column">
                                <div class="settings-integrations-form__date-column-title">Часов</div>
                                <div class="settings-integrations-form__date-input">
                                    {{hours}}
                                    <div class="settings-integrations-form__date-input-arrow">
                                        <svg @click="arrowNext(hours, 'hours')" width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.5928 7L1.40723 7C1.22705 6.99923 1.05114 6.94437 0.901741 6.84235C0.752344 6.74032 0.636169 6.59572 0.567908 6.42682C0.499647 6.25792 0.482365 6.07231 0.518247 5.89347C0.554129 5.71462 0.641564 5.55057 0.769494 5.42205L5.85315 0.272955C5.93785 0.186465 6.03861 0.117815 6.14963 0.0709676C6.26065 0.0241193 6.37973 4.18623e-07 6.5 4.29138e-07C6.62027 4.39652e-07 6.73935 0.0241194 6.85037 0.0709677C6.96139 0.117815 7.06215 0.186465 7.14685 0.272955L12.2305 5.42205C12.3584 5.55057 12.4459 5.71462 12.4818 5.89347C12.5176 6.07231 12.5004 6.25792 12.4321 6.42682C12.3638 6.59572 12.2477 6.74032 12.0983 6.84235C11.9489 6.94437 11.773 6.99923 11.5928 7Z" fill="#9797BB"/>
                                        </svg>
                                        <svg @click="arrowPrev(hours, 'hours')" width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.40723 1.58625e-07L11.5928 1.93952e-06C11.773 0.000767166 11.9489 0.0556308 12.0983 0.157656C12.2477 0.25968 12.3638 0.404285 12.4321 0.573183C12.5004 0.742081 12.5176 0.927688 12.4818 1.10653C12.4459 1.28538 12.3584 1.44943 12.2305 1.57795L7.14684 6.72704C7.06215 6.81353 6.96139 6.88218 6.85037 6.92903C6.73935 6.97588 6.62027 7 6.5 7C6.37973 7 6.26065 6.97588 6.14963 6.92903C6.03861 6.88218 5.93785 6.81353 5.85315 6.72704L0.769495 1.57795C0.641564 1.44943 0.55413 1.28538 0.518248 1.10653C0.482366 0.927686 0.499648 0.742079 0.567909 0.573181C0.63617 0.404283 0.752344 0.259678 0.901742 0.157654C1.05114 0.0556289 1.22705 0.000765323 1.40723 1.58625e-07Z" fill="#9797BB"/>
                                        </svg>
                                    </div>    
                                </div>
                            </div>
                            <div class="settings-integrations-form__date-column settings-integrations-form__date-column_end">
                                <div class="settings-integrations-form__date-column-title">Минут</div>
                                <div class="settings-integrations-form__date-input">
                                    {{minute}}
                                     <div class="settings-integrations-form__date-input-arrow">
                                        <svg @click="arrowNext(minute, 'minute')" width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.5928 7L1.40723 7C1.22705 6.99923 1.05114 6.94437 0.901741 6.84235C0.752344 6.74032 0.636169 6.59572 0.567908 6.42682C0.499647 6.25792 0.482365 6.07231 0.518247 5.89347C0.554129 5.71462 0.641564 5.55057 0.769494 5.42205L5.85315 0.272955C5.93785 0.186465 6.03861 0.117815 6.14963 0.0709676C6.26065 0.0241193 6.37973 4.18623e-07 6.5 4.29138e-07C6.62027 4.39652e-07 6.73935 0.0241194 6.85037 0.0709677C6.96139 0.117815 7.06215 0.186465 7.14685 0.272955L12.2305 5.42205C12.3584 5.55057 12.4459 5.71462 12.4818 5.89347C12.5176 6.07231 12.5004 6.25792 12.4321 6.42682C12.3638 6.59572 12.2477 6.74032 12.0983 6.84235C11.9489 6.94437 11.773 6.99923 11.5928 7Z" fill="#9797BB"/>
                                        </svg>
                                        <svg @click="arrowPrev(minute, 'minute')" width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.40723 1.58625e-07L11.5928 1.93952e-06C11.773 0.000767166 11.9489 0.0556308 12.0983 0.157656C12.2477 0.25968 12.3638 0.404285 12.4321 0.573183C12.5004 0.742081 12.5176 0.927688 12.4818 1.10653C12.4459 1.28538 12.3584 1.44943 12.2305 1.57795L7.14684 6.72704C7.06215 6.81353 6.96139 6.88218 6.85037 6.92903C6.73935 6.97588 6.62027 7 6.5 7C6.37973 7 6.26065 6.97588 6.14963 6.92903C6.03861 6.88218 5.93785 6.81353 5.85315 6.72704L0.769495 1.57795C0.641564 1.44943 0.55413 1.28538 0.518248 1.10653C0.482366 0.927686 0.499648 0.742079 0.567909 0.573181C0.63617 0.404283 0.752344 0.259678 0.901742 0.157654C1.05114 0.0556289 1.22705 0.000765323 1.40723 1.58625e-07Z" fill="#9797BB"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
        <div class="settings-integrations-form__date settings-integrations-form__record-time settings-integrations-form__date settings-integrations-form__record-time_top">
        <div class="settings-integrations-form__date-column">
            <div>Напомнить за N дней </div>
                <input class="settings-integrations-form__input_test " type="number" placeholder="0" v-model="NDay"> 
            </div>
        <div class="settings-integrations-form__date-column">
            <div>ID филиала</div>
                <input class="settings-integrations-form__input_test " type="number" placeholder="Ввести" v-model="filial"> 
            </div>
                <div class="settings-integrations-form__date-column">
                    <div>Аккаунт</div>
                    <div class="settings-integrations-form__container">
                <div class="settings-integrations-form__container-arrow ">
                </div>
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
                <div class="settings-integrations-form__container-arrow ">
                </div>
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
            <SettingsIntegrationsMessage  @dataFile='checkData' @propText="getText" :text='textMess' :nameFile='propFileData'></SettingsIntegrationsMessage>
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
        const timeOption = ref('Выбрать');
        const timeZoneOption = ref('Выбрать');
        const minute = ref('00');
        const hours = ref('00');
        const statusTimeSelect = ref(false);
        const statusAccSelect = ref(false);
        const statusFiltersSelect = ref(false);
        const fileData = ref([])
        const propFileData = ref('');
        const sum1 = ref(1);
        const sum2 = ref(2);
        const name = ref('');
        const filial = ref('');
        const NDay = ref('');
        const message = ref('');
        const whatsappId=ref();
        const textMess = ref('')
        getWhatsapps()
        const data = ref({
                type: "RecordRemindAtTime",
                task_name: "Напоминание о записи в заданное время",
                parameters:
                [
                    {
                        message: {
                            type: "text",
                            data: ""
                        },
                        n_day : null,
                        whatsapp_id : null,
                        start_time : "",
                        company_id : null
                    }
                ]
            })
             const checkData = (data) => {
                console.log(data)
                if(data.length!=0){                
                   fileData.value = data
                  
                }
            }
            const getText = (text) => {
                message.value = text;
            }
            const chooseId = (id) => {
                whatsappId.value = id
            }
            const ValidateDate = () => {
                if(textOption.value=='Выбрать'){
                    data.value.parameters[0].company_id ='';
                    return false
                }
                else{
                    data.value.parameters[0].company_id = filial.value; 
                }
                if(textOption.value==''){
                    data.value.parameters[0].n_day ='';
                    return false
                }
                else{
                    data.value.parameters[0].n_day = NDay.value; 
                }
                if(timeOption.value=='Выбрать'){
                    data.value.parameters[0].start_time ='';
                    return false
                }
                else{
                    data.value.parameters[0].start_time = timeOption.value;   
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
                statusTimeSelect.value = false;
                statusSelect.value=false;
                statusFiltersSelect.value=false;
                item.value = true;
            }
        const post = () => {
            if (ValidateDate()){
                const dataNew = data.value
                postBirthdayTask(dataNew)
               .then(r=> {
                    console.log(r)
                    router.push('/settings/integrations/yclients/create')
                })
            } 
        }
        const update = () => {
           data.value.task_id = props.Propdata.task_id;
            if(message.value==''){
                data.value.parameters[0].message.data = props.Propdata.parameters[0].message.Text;
            }
            if (ValidateDate()){
                const dataNew = data.value
                updateTask(dataNew)
                .then(r=> {
                   router.push('/settings/integrations/yclients/create')  
                 })
            } 
        }
        watch(()=>{
            if(props.Propdata.parameters){
                timeOption.value=props.Propdata.parameters[0].start_time;
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
                NDay.value = props.Propdata.parameters[0].n_day
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
        const statusTimeSelected = () => {
            statusTimeSelect.value = !statusTimeSelect.value;
            timeOption.value = hours.value + ':' + minute.value;
            if(statusTimeSelect.value){
             checkOpenModal(statusTimeSelect)   
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
         const timeZones = ref([]);
            timeZones.value = [
                {time:'0', city:'Гринвич, Лондон, Рейкьявик, Лиссабон, Дакар'},
                {time: '+1', city: 'Рим, Париж, Берлин, Осло, Мадрид, Копенгаген, Вена'},
                {time : '+2', city: 'Киев, Минск, Анкара, Афины, Иерусалим, Хельсинки, София, Бухарест, Кейптаун'},
                {time: '+3', city:'Москва, Аддис-Абеба, Багдад'},
                {time:'+4' , city:'Тегеран, Баку, Абу-Даби'},
                {time: '+5', city:'Душанбе, Ташкент, Карачи'},
                {time: '+6', city:'Алматы, Тюмень'},
                {time:'+7' , city:'Новосибирск, Джакарта, Бангкок'},
                {time: '+8', city:'Иркутск, Пекин, Шанхай'},
                {time:' +9', city:'Токио, Сеул, Пхеньян'},
                {time: '+10', city:'Канберра, Сидней, Мельбурн'},
                {time: '+11', city:'Магадан'},
                {time: '+12', city:'Веллингтон'},
                {time: '-12', city:'Анадырь, Камчатка'},
                {time: '-11', city:'Ном (Аляска), Самоа'},
                {time: '-10', city:'Аляска, Гавайи'},
                {time: '-9', city:''},
                {time: '-8', city:'Лос-Анджелес, Сан-Франциско, Сиэтл, Ванкувер'},
                {time: '-7', city:'Денвер, Феникс, о.Пасхи'},
                {time: '-6', city:''},
                {time: '-5', city:'Нью-Йорк, Вашингтон, Атланта, Оттава, Гавана, Богота, Лима'},
                {time: '-4', city:'Ла-Пас, Каракас, Галифакс'},
                {time: '-3', city:'Асунсьон, Буэнос-Айрес'},
                {time: '-2', city:'Сан-Паулу, Бразилиа'},
                {time: '-1', city:'Азорские о-ва'},
                ]
        const values = reactive( {
            title: ['Поздравление с днём рождения', 'fdfc', 'fsfsf', 'fsfs' ]
        })
        const arrowNext = (time, name) => {
            time=String(time)
             if(time.startsWith('0')){ 
                 time = time.split('');
                 time = time[1]
                 time++;

             }
             else{

                 time = Number(time)
                if(name == 'minute'){
                  if(time===59){
                     return false
                 }
                 else {
                      time++;  
                 }  
                }
                if(name == 'hours'){
                  if(time===23){
                     return false
                 }
                 else {
                      time++;  
                 }  
                }
             }
            if(name == 'minute'){
                if(time<10){
                    minute.value = '0'+time;  
                }
                else{
                    minute.value = time;  
                }
            }
            else{
                if(time<10){
                  hours.value = '0'+time;  
                }
                else{
                    hours.value = time;  
                }
            }

        }
        const arrowPrev = (time, name) => {
            time=String(time)
            if(time.startsWith('0')){ 
                 time = time.split('');
                 time = Number(time[1])
                 console.log(time)
                 if(time ===0){
                     return false
                 }
                 else{
                  time--;    
                 }
             }
             else{
                 time = Number(time)
                  time--; 
             }
            if(name == 'minute'){
                if(time<10){
                  minute.value = '0'+time;  
                }
                else{
                     minute.value = time;  
                }
            }
            else{
                if(time<10){
                  hours.value = '0'+time;  
                }
                else{
                     hours.value = time;  
                }
            }

        }
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
            timeOption,
            statusTimeSelected,
            statusTimeSelect,
            minute,
            hours,
            arrowNext,
            arrowPrev,
            timeOption,
            statusAccSelect,
            openAcc,
            openFilters,
            statusFiltersSelect,
            sum1,
            sum2,
            checkFilters,
            timeZones,
            chooseAcc,
            timeZoneOption,
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
            NDay,
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