<template>
<div>

    <div class="settings-integrations settings-integrations-yclient " >
       <integrationHeaderCommon :date="date" @pageOpen ="openPattern"></integrationHeaderCommon>
       <div v-if="numberPattern[0]==='Настройка Yclients' && numberPattern[1]==='true'||defaultPattern">
           <div class="settings-integrations-yclient__pattern-tasks">
               <div class="settings-integrations-form__field">
                <div class="settings-integrations-yclient__pattern-tasks-title">Выберите Задачу</div>
                <div class="settings-integrations-form__container">
                <div class="settings-integrations-form__container-arrow ">
                </div>
                <template v-if="cooseDate.type">
                    <button class="settings-integrations-form__input settings-integrations-form__select settings-integrations-form__task" :class="{'settings-integrations-form__select_active': statusSelect }"> 
                    <div class="settings-integrations-form__dropdown-inner" @click="openSelect"  > {{cooseDate.type}}
                        <svg class="settings-integrations-form__dropdown-inner-arrow" width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.1888 2.46058C4.16403 2.48338 4.1346 2.50147 4.1022 2.51381C4.06981 2.52615 4.03508 2.5325 4 2.5325C3.96492 2.5325 3.93019 2.52615 3.8978 2.51381C3.8654 2.50147 3.83597 2.48338 3.8112 2.46058L1.36591 0.215245C1.21591 0.0774725 1.01243 4.67421e-05 0.800243 7.24799e-07C0.588055 -4.52925e-05 0.384538 0.0772927 0.234464 0.215001C0.084389 0.352709 5.0074e-05 0.539506 6.11966e-08 0.7343C-4.99516e-05 0.929095 0.0841932 1.11593 0.234197 1.2537L2.68002 3.49904C3.03044 3.81985 3.50512 4 4 4C4.49488 4 4.96956 3.81985 5.31998 3.49904L7.7658 1.2537C7.91581 1.11593 8.00005 0.929095 8 0.7343C7.99995 0.539506 7.91561 0.352709 7.76554 0.215001C7.61546 0.0772928 7.41194 -4.52111e-05 7.19976 8.01112e-07C6.98757 4.68134e-05 6.78409 0.0774725 6.63409 0.215245L4.1888 2.46058Z" fill="#9797BB">
                            </path>
                        </svg>
                    </div>
                </button></template>
                <template v-else> <button class="settings-integrations-form__input settings-integrations-form__select" :class="{'settings-integrations-form__select_active': statusSelect }"> 
                    <div class="settings-integrations-form__dropdown-inner" @click="openSelect"  > {{textOption}}
                        <svg class="settings-integrations-form__dropdown-inner-arrow" width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.1888 2.46058C4.16403 2.48338 4.1346 2.50147 4.1022 2.51381C4.06981 2.52615 4.03508 2.5325 4 2.5325C3.96492 2.5325 3.93019 2.52615 3.8978 2.51381C3.8654 2.50147 3.83597 2.48338 3.8112 2.46058L1.36591 0.215245C1.21591 0.0774725 1.01243 4.67421e-05 0.800243 7.24799e-07C0.588055 -4.52925e-05 0.384538 0.0772927 0.234464 0.215001C0.084389 0.352709 5.0074e-05 0.539506 6.11966e-08 0.7343C-4.99516e-05 0.929095 0.0841932 1.11593 0.234197 1.2537L2.68002 3.49904C3.03044 3.81985 3.50512 4 4 4C4.49488 4 4.96956 3.81985 5.31998 3.49904L7.7658 1.2537C7.91581 1.11593 8.00005 0.929095 8 0.7343C7.99995 0.539506 7.91561 0.352709 7.76554 0.215001C7.61546 0.0772928 7.41194 -4.52111e-05 7.19976 8.01112e-07C6.98757 4.68134e-05 6.78409 0.0774725 6.63409 0.215245L4.1888 2.46058Z" fill="#9797BB">
                            </path>
                        </svg>
                        </div>
                        <div class="settings-integrations-form__dropdown-list" v-if="statusSelect">
                            <div  class="settings-integrations-form__dropdown-item" v-for=" (item, index) in values.title" :key="index" @click="chooseOption">
                                {{item}}
                            </div>
                        </div>
                </button></template>
                </div>
            </div>
            <div v-if="textOption==='Поздравление с днём рождения'">
                    <BirthdayPattern :Propdata = 'cooseDate'></BirthdayPattern>
            </div>
            <div v-if="textOption==='Напоминание о записи в заданное время'">
               <ReminderRecordingTime :Propdata = 'cooseDate'></ReminderRecordingTime>
            </div>
            <div v-if="textOption==='Запрос отзыва после визита'">
              <RequestReviewAfterVisit :Propdata = 'cooseDate'></RequestReviewAfterVisit>
            </div>
            <div v-if="textOption==='Уведомление о созданной записи'">
              <CreatedRecord :Propdata = 'cooseDate'></CreatedRecord>
            </div>
           </div>
       </div>
        <!-- <div v-if="numberPattern[0]==='Созданные задачи' && numberPattern[1]==='true'">22222</div>
         <div v-if="numberPattern[0]==='Игнор лист' && numberPattern[1]==='true'">3333</div> -->
    </div>
        <teleport to="body">

        </teleport>
    </div>
</template>

<script>
    import { ref, reactive, onBeforeMount, onMounted, onUpdated ,watch} from "vue";
    import {yclientFunction} from "./yclient.js";
    import integrationHeaderCommon from "../integrationHeaderCommon/integrationHeaderCommon";
    import BirthdayPattern from "../../../../components/SettingsContainer/SettingsIntegrations/SettingsIntegrationsYclientPattern/BirthdayPattern"
    import ReminderRecordingTime   from "../../../../components/SettingsContainer/SettingsIntegrations/SettingsIntegrationsYclientPattern/ReminderRecordingTime"
    import RequestReviewAfterVisit   from "../../../../components/SettingsContainer/SettingsIntegrations/SettingsIntegrationsYclientPattern/RequestReviewAfterVisit"
    import CreatedRecord   from "../../../../components/SettingsContainer/SettingsIntegrations/SettingsIntegrationsYclientPattern/CreatedRecord"
    import {useCustomScroll} from "../../../../composition/useCustomScroll";
    import {useIntegrations} from "../../../../composition/useIntegrations";
    export default {
        components: {integrationHeaderCommon, BirthdayPattern, ReminderRecordingTime, RequestReviewAfterVisit, CreatedRecord},
        setup() {
            const statusSelect = ref(false);
            const textOption = ref('');
            const { container, content, scrollbar, scrollTo, init } = useCustomScroll();
            textOption.value = 'Выбрать';
            const {editTaskYclient, checkEdit, indexTask} = yclientFunction()
             const {getAllTask} = useIntegrations()
             const data = ref({})
            const buttonDisabled = ref(true);
            const values = reactive( {
                 title: ['Поздравление с днём рождения','Напоминание о записи в заданное время','Запрос отзыва после визита','Уведомление о созданной записи']
            });
            const cooseDate=ref({});
            const getAllTaskYclient =  (index) => {
                    getAllTask()
                    .then(r => {
                        data.value = {...r}
            
                    })
                }
            watch(()=>{
                if(checkEdit.value&&data.value.yclients_task){  
                    textOption.value=data.value.yclients_task[indexTask.value].type
                    cooseDate.value = data.value.yclients_task[indexTask.value]
                    checkEdit.value = false;
                    indexTask.value = null;          
                }

            })
            getAllTaskYclient()
            const chooseOption = (text) => {
                textOption.value = text.path[0].innerHTML
                 statusSelect.value = !statusSelect.value;
            }
            const openSelect = () => {
                statusSelect.value = !statusSelect.value;
            }
            const links = ref([['Настройка Yclients','true', '/settings/integrations/yclients/connect'],['Созданные задачи','false', '/settings/integrations/yclients/create']]); 
            //,['Игнор лист', 'false', '/settings/integrations/yclients/connect']
           
             const date  = ref({links:links, name:'yclient'})
             const numberPattern = ref('');
             const openPattern = (link) => {
                 defaultPattern.value = false;
                numberPattern.value = links.value[link]
             }
             const defaultPattern = ref(false);
             if(links.value[0][1]==='true'){
                defaultPattern.value =true
             }
            return {
                values,
                openSelect,
                statusSelect,
                chooseOption,
                textOption,
                buttonDisabled,
                links,
                date,
                openPattern,
                numberPattern,
                defaultPattern,
                 container,
                content,
                scrollbar,
                scrollTo,
             checkEdit,
             getAllTaskYclient,
             data,
             indexTask,
             cooseDate
            }
        }
    }
</script>
<style lang="scss">
.settings-integrations-yclient{
     overflow-y:auto;
     //position:relative;
     max-height:100%;
     height: 100%;
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
     &::-webkit-scrollbar { width: 0; }
  .settings-integrations-form__dropdown-item{
      line-height: 19px;
  }  
  &__pattern-tasks-title{
      text-align: left;
      font-size: 12px;
      line-height: 130%;
      color: #CFCFE4;
      padding-bottom: 6px;
  }
}

.settings-integrations-form__select{
    max-width:66.3%;
    min-width:66.3%;
    .settings-integrations-form__dropdown-inner{
        padding: 8px 10px 8px 5px;
        min-height: 34px;
        font-size: 14px;
        line-height: 19px;
        color: #EDEDEF;
        position: relative;
        &-arrow{
            position: absolute;
            right: 0;
        }
    }
    .settings-integrations-form__dropdown-list{
        z-index: 9;
    }
    &_active{
        border: 1px solid #5EC075 !important;
    }
} 
.settings-integrations-form__button:nth-last-child(1){
margin-left: 10px;
}
.settings-integrations-form__button{
    padding: 6px 15px;
    background: #414159;
    border-radius: 4px;
    color: #EDEDEF;
}
.settings-integrations-form__container-arrow{
   max-width: 506px;
    width: 100%;  
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
}

.settings-integrations-form__select:not(:-internal-list-box) {
    padding-top: 20px;
    }
.settings-integrations-form__container{
    display: flex;
    justify-content: space-between;
    position: relative;
    margin-top: 6px;
    width:100%;
    .settings-integrations-form__input{
        padding: 0px 10px;
        max-width: 473px;
        @media screen and (max-width:1200px) {
             max-width: 473px;
        }
}
    &-save{
        display: flex;
        
        .settings-integrations-form__button{
          font-family: Segoe UI;  
        }
       .settings-integrations-form__button_disabled{
           background: #414159;
            color: #757589;
       } 
    }
}
.settings-integrations-form__container-arrow-img{
    width:8px;
    position: absolute;
    right: 15px;
    height: 4px;
    background: url(../../../../assets/selectArrow.svg) no-repeat right;
    transform: rotate(180deg);
}
.settings-integrations-form__date{
    display: flex;
    justify-content: space-between;
}
.settings-integrations-form__date-column{
    color: #DEDEEE;
    width: 93%;
    text-align: left;
    .settings-integrations-form__date-input{
        width: 100% !important;
        background: #2E2E4E;
        border: 0.7px solid #414159;
        border-radius: 3px;
        display: flex;
        padding: 8px 10px 8px 7px;
        margin-top: 8px;
        font-size: 16px;
        justify-content: space-between;
          color: #DEDEEE;
        font-family: 'Segoe UI';
        &::-webkit-input-placeholder {color:#DEDEEE;}
        &::-moz-placeholder          {color:#DEDEEE;}/* Firefox 19+ */
        &:-moz-placeholder           {color:#DEDEEE;}/* Firefox 18- */
        &:-ms-input-placeholder      {color:#DEDEEE;}
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0; 
        }
    }
    
}
</style>
<style lang="scss" src="../integrations.scss"></style>

<style lang="scss" src="../../../../components/SettingsContainer/SettingsIntegrations/settings-integrations-form.scss"></style>