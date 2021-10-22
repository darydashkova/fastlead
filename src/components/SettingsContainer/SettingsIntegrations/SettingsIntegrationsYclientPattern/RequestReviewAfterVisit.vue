<template>
<div>
     <div class="settings-integrations-form__field">
        <div class="settings-integrations-form__date settings-integrations-form__birthday ">
            <div class="settings-integrations-form__date-column">
                <div>Наименования</div>               
                    <input class="settings-integrations-form__input_test " v-model="name"  placeholder="Ввести">  
            </div>
            <!-- <div class="settings-integrations-form__date-column">
                <div>Часовой пояс</div>
                <div class="settings-integrations-form__container">
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
            </div>  -->
            <div class="settings-integrations-form__date-column">
                <div>Запросить отзыв после визита через N минут</div>
                <input class="settings-integrations-form__input_test " type="number" placeholder="0" v-model="ntime"> 
            </div>
        </div>
        <div class="settings-integrations-form__date settings-integrations-form__birthday settings-integrations-form__date settings-integrations-form__birthday_top">
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
                <!-- <div class="settings-integrations-form__date-column">
                    <div>Дополнительные фильтры</div>
                    <div class="settings-integrations-form__container settings-integrations-form__container-filters">
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
                             <div class="settings-integrations-form__dropdown-list-filters-title">Выполнять, если у записи статус</div>
                            <div class="settings-integrations-form__date-row settings-integrations-form__checkbox-block">
                                <div  v-for="(label, index) in checkboxStatus" :key="index" @click='activeCheckbox'>
                                    <input class="settings-integrations-form__date-row-checkbox" type="checkbox"  :name="label.name" :value="label.val">
                                      <label class="settings-integrations-form__date-row-label" for="vehicle1"   :class="{
                            'settings-integrations-form__date-row-label_bottom': (index!=(checkboxStatus.length-1))}">{{label.title}}</label>
                                </div>
                            </div>
                             <div class="settings-integrations-form__dropdown-list-filters-title">Выполнять, если у записи тип</div>
                             <div class="settings-integrations-form__date-row settings-integrations-form__checkbox-block">
                                <div  v-for="(label, index) in checkboxIsOnline" :key="index" @click='activeCheckbox'>
                                    <input class="settings-integrations-form__date-row-checkbox" type="checkbox"  :name="label.name" :value="label.val">
                                      <label class="settings-integrations-form__date-row-label" for="vehicle1"   :class="{
                            'settings-integrations-form__date-row-label_bottom': (index!=(checkboxIsOnline.length-1))}">{{label.title}}</label>
                                </div>
                            </div>
                            <div class="settings-integrations-form__switcher " v-for="(item, index) in switcherObj" :key="index" @mousedown="changeSwitcher(item)" :class="{'base-switcher_no-border': (item.api==='groups')}">
                                <template v-if="item.api!='groups'&&item.api!='recordingTime'">
                                    <BaseSwitcher 
                                        :value="item.active"
                                        @changeValue="setStyle"
                                        class="integration-modal-files__title-no-padding"
                                        >{{item.title}}</BaseSwitcher>
                                    <div>
                                        <div class="settings-integrations-form__container">
                                            <button class="settings-integrations-form__input_test " :class="{'settings-integrations-form__select_active': item.list }"> 
                                                <div class="settings-integrations-form__dropdown-inner" :class="{'settings-integrations-form__dropdown-inner_placeholder':(textOption=='Выбрать')}"> {{textOption}}
                                                    <svg class="settings-integrations-form__dropdown-inner-arrow" width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M4.1888 2.46058C4.16403 2.48338 4.1346 2.50147 4.1022 2.51381C4.06981 2.52615 4.03508 2.5325 4 2.5325C3.96492 2.5325 3.93019 2.52615 3.8978 2.51381C3.8654 2.50147 3.83597 2.48338 3.8112 2.46058L1.36591 0.215245C1.21591 0.0774725 1.01243 4.67421e-05 0.800243 7.24799e-07C0.588055 -4.52925e-05 0.384538 0.0772927 0.234464 0.215001C0.084389 0.352709 5.0074e-05 0.539506 6.11966e-08 0.7343C-4.99516e-05 0.929095 0.0841932 1.11593 0.234197 1.2537L2.68002 3.49904C3.03044 3.81985 3.50512 4 4 4C4.49488 4 4.96956 3.81985 5.31998 3.49904L7.7658 1.2537C7.91581 1.11593 8.00005 0.929095 8 0.7343C7.99995 0.539506 7.91561 0.352709 7.76554 0.215001C7.61546 0.0772928 7.41194 -4.52111e-05 7.19976 8.01112e-07C6.98757 4.68134e-05 6.78409 0.0774725 6.63409 0.215245L4.1888 2.46058Z" fill="#9797BB">
                                                        </path>
                                                    </svg>
                                                </div>
                                                <div class="settings-integrations-form__dropdown-list" v-if="item.list">
                                                    <div  class="settings-integrations-form__dropdown-item" v-for=" (whatsapp, index) in whatsapps" :key="index" >
                                                        {{whatsapp.phone}}
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </template>
                                <template v-if="item.api==='recordingTime'">
                                    <BaseSwitcher 
                                    :value="item.active"
                                    @changeValue="setStyle"
                                    class="integration-modal-files__title-no-padding"
                                    >{{item.title}}</BaseSwitcher>
                                    <div class="settings-integrations-form__date-row_no-border">
                                        <div class="settings-integrations-form__date-column">
                                            <div class="settings-integrations-form__date-column-title">От</div>
                                            <input type="number"   min="0"  class="settings-integrations-form__date-input"  placeholder="00">
                                        </div>
                                        <div class="settings-integrations-form__date-column settings-integrations-form__date-column_end">
                                            <div class="settings-integrations-form__date-column-title">До</div>
                                            <input type="number"   min="0"  class="settings-integrations-form__date-input"  placeholder="00">
                                        </div>
                                    </div>
                                </template>
                                 <template v-if="item.api==='groups'">
                                    <BaseSwitcher 
                                    :value="item.active"
                                    @changeValue="setStyle"
                                    class="integration-modal-files__title-no-padding"
                                    >{{item.title}}</BaseSwitcher>
                                 </template>
                            </div>  
                           
                            
                        </div>
                    </div>
                </div>  -->
            </div>
     </div>
     <div class="settings-integrations-form__field ">
        <div class=" settings-integrations-form__create-message">
            <SettingsIntegrationsMessage @propText="getText" :text='textMess'></SettingsIntegrationsMessage>
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
import BaseSwitcher from "../../../Base/BaseSwitcher";
import { useStyle } from "../../../../composition/useStyle";
export default {
  components: { SettingsIntegrationsMessage, SettingsIntegrationsVariables, TestCheck, BaseSwitcher },
  props: {
      Propdata:Object
      },
    setup(props) {
        const { style, setStyle } = useStyle();
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
        const sum1 = ref(1);
        const sum2 = ref(2);
        const name = ref('');
        const filial = ref('');
        const message = ref('');
        const whatsappId=ref();
        const textMess = ref('')
        const ntime = ref('')
        const switcherObj = ref([
            {title: 'Выполнять, если категория записи', active:false, api:'entryСategory', list:false},
            {title:  'Выполнять, если услуга записи', active:false, api:'recordingService', list:false},
            {title: 'Выполнять, если категория клиента', active:false, api:'сustomerСategory', list:false},
            {title:  'Выполнять, если сотрудник', active:false, api:'employee', list:false},
            {title:   'Выполнять, если время записи', active:false, api:'recordingTime', list:false},
            {title:   'Группировать записи по визиту', active:false, api:'groups', list:false},
        ])
        const changeSwitcher = (activeItem) => {
            activeItem.active=!activeItem.active
        }
        getWhatsapps()
        const data = ref({
                type: "Review",
                task_name: "Запрос отзыва после визита",
                parameters:
                [
                    {
                        message: {
                            type: "text",
                            data: ""
                        },
                        whatsapp_id : null,
                        n_minutes : null,
                        company_id : null
                    }
                ]
            })
        const checkboxStatus = ref([
            {name:'waitClient', val:'waitClient', title:'Ожидание клиента'},
            {name:'clientHere', val:'clientHere', title:'Клиент пришел'},
            {name:'clientIsntGo', val:'clientIsntGo', title:'Клиент не пришел'},
            {name:'clientСonfirmed', val:'clientСonfirmed', title:'Клиент подтвердил'},
        ])
        const checkboxIsOnline = ref([
            {name:'online', val:'online', title:'Онлайн'},
            {name:'offline', val:'offline', title:'Офлайн'},
        ])
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
                if(whatsappId.value=='undefined'){
                    return false
                }
                else{
                    data.value.parameters[0].whatsapp_id =  whatsappId.value;    
                }
                if((message.value=='')||(message.value=='undefined')){
                    if(props.Propdata.parameters){
                        data.value.parameters[0].message.data =  props.Propdata.parameters[0].message.Text;    
                    }
                else{
                    return false   
                    }
                }
                else{
                    data.value.parameters[0].message.data =  message.value;    
                }  
                if(((name.value=='')||(name.value=='undefined'))){
                    return false  
                }
                else {
                    data.value.task_name =  name.value;    
                }
                if(ntime.value==''){
                    return false  
                }
                else {
                    data.value.parameters[0].n_minutes =  ntime.value;    
                }
                return true
            }
        const post = () => {
            if (ValidateDate()){
                const dataNew = data.value
                console.log(dataNew)
                postBirthdayTask(dataNew)
                router.push('/settings/integrations/yclients/create')
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
                router.push('/settings/integrations/yclients/create')
                console.log(dataNew)
            } 
        }
        watch(()=>{
            if(props.Propdata.parameters){
                ntime.value=props.Propdata.parameters[0].n_minutes;
                textMess.value = props.Propdata.parameters[0].message.Text
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
        const checkOpenModal = (item) => {
            statusAccSelect.value=false;
            statusTimeSelect.value = false;
            statusSelect.value=false;
            statusFiltersSelect.value=false;
            item.value = true;
        }
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
        const activeCheckbox = (item) =>{
            item.path[1].children[0].checked = !item.path[1].children[0].checked 
        }
        return {
            activeCheckbox,
            checkOpenModal,
            checkboxStatus,
            style,
            openSelect,
            statusSelect,
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
            ntime,
            checkboxIsOnline,
            setStyle,
            switcherObj,
            changeSwitcher
        }
    },
}
</script>
<style lang="scss">
.settings-integrations-form__birthday{
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
    max-height: 500px;
    overflow-y: auto;
    -ms-overflow-style: none; 
    overflow: -moz-scrollbars-none; 
    &::-webkit-scrollbar { width: 0; }
    .settings-integrations-form__date-row{
        display: flex;
        padding-bottom: 18px;
        border-bottom: 1px solid #40406B;
        flex-direction: row;
        /* стили для чекбокса, находящегося в состоянии disabled */
        &-checkbox{
            display: none;
        }
        &-checkbox:disabled+label::before {
        background-color: #B9B9B9;
        }
        &-checkbox:checked+label::before {
        background-image: url("../../../../assets/checkboxArrow.svg") , var(--green-color);
        background-size: auto;
        background-repeat: no-repeat;
         border: 1px solid #5EC075;
        }
        &-checkbox +label::before {
        content: '';
        display: inline-block;
        width: 16px;
        height: 16px;
        flex-shrink: 0;
        flex-grow: 0;
        border: 1px solid #B9B9B9;
        border-radius: 3px;
        margin-right: 0.5em;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 50% 50%;
        }
        &-label{
            display: flex;
            align-items: center;
            flex-direction: row;
           
        }
        &-label_bottom{
             margin-bottom: 14px;
        }
    }
    .settings-integrations-form__date-row_no-border{
        border-bottom:  none;
        display: flex;
        flex-direction: row;
    }
    .settings-integrations-form__checkbox-block{
        display:flex;
        flex-direction: column;
    }
    &-title{
        padding-bottom: 16px;
        padding-top: 18px;
        font-weight: 600;
        font-size: 14px;
        line-height: 130%;
        color: #CFCFE4;
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
    .settings-integrations-form__switcher{
        padding-top: 24px;
        display:flex;
        flex-direction: column ;
        padding-bottom: 18px;
        border-bottom: 1px solid #40406B;
        .base-switcher{
            flex-direction: row-reverse;
            justify-content: flex-end;
            padding-bottom:16px
        }
        .settings-integrations-form__container{
            .settings-integrations-form__input_test{
                width:100%
            }   
            
        }
        .settings-integrations-form__input_test{
            width:100%
        }
        .base-switcher__slider-circle{
        bottom: -1px;
        }
        .base-switcher__label{
            font-weight: 600;
            font-size: 14px;
            line-height: 130%;
            color: #CFCFE4;
            padding-left: 16px;
        }
    }
    .base-switcher_no-border{
        border-bottom: none;
        padding-bottom:2px !important;
    }
</style>