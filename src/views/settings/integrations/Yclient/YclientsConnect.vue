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
                    <button class="settings-integrations-form__input settings-integrations-form__select settings-integrations-form__task" > 
                    <div class="settings-integrations-form__dropdown-inner" @click="openSelect"  > {{cooseDate.type}}
                         <svg  class='settings-integrations-form__dropdown-inner-svg' width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.14053 0.197198C9.07855 0.134713 9.00482 0.0851166 8.92358 0.051271C8.84234 0.0174253 8.7552 0 8.6672 0C8.57919 0 8.49205 0.0174253 8.41081 0.051271C8.32957 0.0851166 8.25584 0.134713 8.19386 0.197198L5.14053 3.25052C5.07855 3.31301 5.00482 3.3626 4.92358 3.39645C4.84234 3.43029 4.7552 3.44772 4.6672 3.44772C4.57919 3.44772 4.49205 3.43029 4.41081 3.39645C4.32957 3.3626 4.25584 3.31301 4.19386 3.25052L1.14053 0.197198C1.07855 0.134713 1.00482 0.0851166 0.92358 0.051271C0.84234 0.0174253 0.755203 0 0.667195 0C0.579187 0 0.49205 0.0174253 0.41081 0.051271C0.329571 0.0851166 0.255837 0.134713 0.193862 0.197198C0.0696944 0.322106 0 0.491073 0 0.667197C0 0.84332 0.0696944 1.01229 0.193862 1.1372L3.25386 4.19719C3.62886 4.57172 4.13719 4.78209 4.6672 4.78209C5.1972 4.78209 5.70553 4.57172 6.08053 4.19719L9.14053 1.1372C9.2647 1.01229 9.33439 0.84332 9.33439 0.667197C9.33439 0.491073 9.2647 0.322106 9.14053 0.197198Z" fill="#CFCFE4"/>
                        </svg>
                    </div>
                </button></template>
                <template v-else> <button class="settings-integrations-form__input settings-integrations-form__select" :class="{'settings-integrations-form__select_active': statusSelect }"> 
                    <div class="settings-integrations-form__dropdown-inner" @click="openSelect"  > {{textOption}}
                   
                        <svg :class="{'settings-integrations-form__dropdown-inner-svg_green': statusSelect }"  class='settings-integrations-form__dropdown-inner-svg' width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.14053 0.197198C9.07855 0.134713 9.00482 0.0851166 8.92358 0.051271C8.84234 0.0174253 8.7552 0 8.6672 0C8.57919 0 8.49205 0.0174253 8.41081 0.051271C8.32957 0.0851166 8.25584 0.134713 8.19386 0.197198L5.14053 3.25052C5.07855 3.31301 5.00482 3.3626 4.92358 3.39645C4.84234 3.43029 4.7552 3.44772 4.6672 3.44772C4.57919 3.44772 4.49205 3.43029 4.41081 3.39645C4.32957 3.3626 4.25584 3.31301 4.19386 3.25052L1.14053 0.197198C1.07855 0.134713 1.00482 0.0851166 0.92358 0.051271C0.84234 0.0174253 0.755203 0 0.667195 0C0.579187 0 0.49205 0.0174253 0.41081 0.051271C0.329571 0.0851166 0.255837 0.134713 0.193862 0.197198C0.0696944 0.322106 0 0.491073 0 0.667197C0 0.84332 0.0696944 1.01229 0.193862 1.1372L3.25386 4.19719C3.62886 4.57172 4.13719 4.78209 4.6672 4.78209C5.1972 4.78209 5.70553 4.57172 6.08053 4.19719L9.14053 1.1372C9.2647 1.01229 9.33439 0.84332 9.33439 0.667197C9.33439 0.491073 9.2647 0.322106 9.14053 0.197198Z" fill="#CFCFE4"/>
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
                    <BirthdayPattern :Propdata = 'cooseDate' :isCloseAll="statusSelect"></BirthdayPattern>
            </div>
            <div v-if="textOption==='Напоминание о записи в заданное время'">
               <ReminderRecordingTime :Propdata = 'cooseDate' :isCloseAll="statusSelect"></ReminderRecordingTime>
            </div>
            <div v-if="textOption==='Запрос отзыва после визита'">
              <RequestReviewAfterVisit :Propdata = 'cooseDate' :isCloseAll="statusSelect"></RequestReviewAfterVisit>
            </div>
            <div v-if="textOption==='Уведомление о созданной записи'">
              <CreatedRecord :Propdata = 'cooseDate' :isCloseAll="statusSelect"></CreatedRecord>
            </div>
            <div v-if="textOption==='Уведомление об изменении записи'">
              <ChangedRecord :Propdata = 'cooseDate' :isCloseAll="statusSelect"></ChangedRecord>
            </div>
              <div v-if="textOption==='Уведомление об удалении записи'">
              <DeletedRecord :Propdata = 'cooseDate' :isCloseAll="statusSelect"></DeletedRecord>
            </div>
            <div v-if="textOption==='Напоминание о повторном визите'">
              <RepeatVisit :Propdata = 'cooseDate' :isCloseAll="statusSelect"></RepeatVisit>
            </div>
             <div v-if="textOption==='Напоминание о записи'">
              <ReminderCreatedRecord :Propdata = 'cooseDate' :isCloseAll="statusSelect"></ReminderCreatedRecord>
            </div>
             <!-- <div v-if="textOption==='Интеграция с модулем уведомлений Yclients'">
              <NotificationModule :Propdata = 'cooseDate' :isCloseAll="statusSelect"></NotificationModule>
            </div> -->
            <!-- <div v-if="textOption==='Кросс-продажи'">
              <CrossSales :Propdata = 'cooseDate' :isCloseAll="statusSelect"></CrossSales>
            </div> -->
            
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
    import ChangedRecord   from "../../../../components/SettingsContainer/SettingsIntegrations/SettingsIntegrationsYclientPattern/ChangedRecord"
    import DeletedRecord   from "../../../../components/SettingsContainer/SettingsIntegrations/SettingsIntegrationsYclientPattern/DeletedRecord"
    import RepeatVisit   from "../../../../components/SettingsContainer/SettingsIntegrations/SettingsIntegrationsYclientPattern/RepeatVisit"
    import ReminderCreatedRecord   from "../../../../components/SettingsContainer/SettingsIntegrations/SettingsIntegrationsYclientPattern/ReminderCreatedRecord"
    import NotificationModule   from "../../../../components/SettingsContainer/SettingsIntegrations/SettingsIntegrationsYclientPattern/NotificationModule"
    import CrossSales   from "../../../../components/SettingsContainer/SettingsIntegrations/SettingsIntegrationsYclientPattern/CrossSales"
    import {useCustomScroll} from "../../../../composition/useCustomScroll";
    import {useIntegrations} from "../../../../composition/useIntegrations";
    export default {
        components: {integrationHeaderCommon, BirthdayPattern, ReminderRecordingTime, RequestReviewAfterVisit, CreatedRecord,ChangedRecord,
         DeletedRecord,RepeatVisit, ReminderCreatedRecord, NotificationModule, CrossSales},
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
                 title: [
                    'Поздравление с днём рождения',
                    'Напоминание о записи в заданное время',
                    'Запрос отзыва после визита',
                    'Уведомление о созданной записи',
                    'Уведомление об изменении записи',
                    'Уведомление об удалении записи',
                    'Напоминание о повторном визите',
                    'Напоминание о записи',
                    // 'Интеграция с модулем уведомлений Yclients',
                    // 'Кросс-продажи'
                 ]
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
            const links = ref([['Настройка Yclients','true', '/settings/integrations/yclients/connect'],
            ['Созданные задачи','false', '/settings/integrations/yclients/create']]); 
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
        padding: 0px ;
        min-height: 34px;
        
        font-size: 14px;
        line-height: 19px;
        color: #EDEDEF;
        position: relative;
        
        
        &-arrow{
            position: absolute;
            right: 10px;
            transform: rotate(0deg);
            transition: 0.3s ease;
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
    width: 45%;
    text-align: left;
    .settings-integrations-form__date-input{
        width: 100% !important;
        background: var(--messenger-search-input-bg-active);
      
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