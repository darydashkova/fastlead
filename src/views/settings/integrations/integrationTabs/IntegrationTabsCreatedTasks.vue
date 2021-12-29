<template>
    <div class="integration-tabs-created-tasks">
        <integrationHeader ></integrationHeader>
        <div class="integration-tabs-created-tasks__container">
            <teleport to="body" v-if="loading">
                <FullScreenLoader ></FullScreenLoader>
            </teleport>
          <template v-if="amo?.id.length!=0&&amo">
              <div class="integration-tabs-created-tasks__container-title">Воронка</div>
                <div class="integration-tabs-created-tasks__container-list" >
                        <!-- <SettingsIntegrationsTask :name="getNameFunnel(amo.funnel_actions[index].id)" :indexPhone ="amo.funnel_actions[index].id" :active="amo.is_active" @clickAmoSettings ="createdTasksEditActiveated" @deleteInput="del(index)" :phone="getPhoneFunnel(amo.funnel_actions[index].id)" v-for="(item, index) in amo?.funnel_actions" :key="index" :index='index'>
                        </SettingsIntegrationsTask> -->
                        <SettingsIntegrationsTask 
                        :data='amo.id[index]' 
                        v-for="(item, index) in amo?.id" 
                        :key="index" 
                        @clickAmoSettings ="createdTasksEditActiveated" 
                        @deleteInput="updateTasks " 
                        ></SettingsIntegrationsTask>
                </div> 
            </template>
            <template v-else-if="!loading&&(Object.keys(amo).length)">
                
                <div class="empty-list">
                        <div class="empty-list__info">
                            <div class="empty-list__info-title">У вас еще нет задач</div>
                            <div class="empty-list__info-button base-button base-button_enter base-button_p5-15" @click="addTask">Добавить задачу</div>
                        </div>
                    </div>
            </template>
        </div>
    </div>
</template>
<script>
    import integrationHeader from "../integrationHeader/integrationHeader.vue";
    import {integrationCards} from "../../../../components/SettingsContainer/SettingsIntegrations/SettingsIntegrationsCard/settings-integrations-card"; 
    import BaseInputGroup from "../../../../components/Base/BaseInputGroup"; 
    import FullScreenLoader from "../../../../components/FullScreenLoader";
    import SettingsIntegrationsTask from "../../../../components/SettingsContainer/SettingsIntegrations/SettingsIntegrationsTask/SettingsIntegrationsTask.vue"; 
    import {useIntegrations} from "../../../../composition/useIntegrations";
    import {ref, reactive, onMounted, watch, onUpdated} from 'vue';
    import { useWhatsapp } from "../../../../composition/useWhatsapp";
    import { integrationTasks } from "./integration-tabs-created-tasks";

    export default {
        components: { integrationHeader, BaseInputGroup, SettingsIntegrationsTask, FullScreenLoader },
        setup() {
            const { checkActiveCard, isActiveAmo, activeCreatedTasks} = integrationCards()
            const { deleteIdAmocrm, getAllTasksAmo } = useIntegrations()
            const {getDateForChange} = integrationTasks();
            const { whatsapps, getWhatsapps } = useWhatsapp()
            const activeUpdate = ref(null);
            const loading = ref(false);
             checkActiveCard(true);
             activeCreatedTasks.value = true;
             const amo = ref();
             getWhatsapps();
                 const getAmocrmWrapper = () => {
                    loading.value = true
                getAllTasksAmo()
                    .then(r => {
                        loading.value = false
                        if (r.code === 404) {
                           amo.value = {is_active: false};
                            return;
                        }
                        amo.value = {...r.amocrm_integration};
                    });
            }
            const updateTasks =  (data) => {
                 deleteIdAmocrm(data)
                 .then(r => {
                  
                    activeUpdate.value  = r.status
                 });
            }
            const createdTasksEditActiveated = (index, name) => {
                const gg = document.querySelector('.settings-integrations__header-pages-link a ')
                const data = [index, name]
                getDateForChange(data);
                 gg.click();
            }
            const addTask = () => {
                const gg = document.querySelector('.settings-integrations__header-pages-link a ')
                gg.click();
            }
            const getNameFunnel = (id) => {
                let index = whatsapps.value.findIndex(item => item.whatsapp_id==id)  
                const name = whatsapps.value[index].name
               return name
            }
             const getPhoneFunnel = (id) => {
                let index = whatsapps.value.findIndex(item => item.whatsapp_id==id)  
                const phone = whatsapps.value[index].phone
               return phone
            }
             watch(() => {
                  if (activeUpdate.value=='ok'){
                   getAmocrmWrapper();  
                    activeUpdate.value = null
                  }
                
             });
             const del = (indx) => {
              
                  amo.value.funnel_actions=amo.value.funnel_actions.filter(index => index!=0)
                  amo.value.funnel_actions = amo.value.funnel_actions
                
                   amo.value.funnel_actions.splice(0,1)
                  
             }
            const delNewDialog = () => {
                
            }
            getAmocrmWrapper();
            
            return{
                isActiveAmo,
                activeCreatedTasks,
                getAmocrmWrapper,
                amo,
                getNameFunnel,
                whatsapps,
                getWhatsapps,
                getPhoneFunnel,
                createdTasksEditActiveated,
                del,
                delNewDialog,
                getAllTasksAmo,
                deleteIdAmocrm,
                updateTasks,
                activeUpdate,
                addTask,
                loading
            }
        },
    }
</script>
<style lang="scss">
.integration-tabs-created-tasks__container{
    padding: 32px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: calc(100% - 64px);
    width: 100%;
    &-title{
        font-size: 12px;
        line-height: 130%;  
        color: #CFCFE4;  
        text-align: left;
        padding-bottom: 6px;
    }
    &-list{
        @media (min-width: 1200px) {
            max-width:1000px
        }
        &-block{
            display: flex;
            align-items: center;
            padding-bottom: 16px;
            .base-input-group{
                width: 80%;
            }
            &-delete{
                margin-left: 14px;
            }
            &-edit{
                margin-left: 20px;
            }
            .base-input-group__input:disabled{
               font-size: 14px;
                line-height: 130%;
                color: #9797BB; 
            }
        }
    }
    .empty-list{
        width: 100%;
        position: relative;
        height: 100%;
        background-color: var(--header-color);
        border-radius: 9px;
        &__info{
            transform: translate(-50%, -47%);
            left: 50%;
            top: 47%;
            position: absolute;
            width: fit-content;
            display:flex;
            align-items: center;
            flex-direction: column;
            &-title{
                font-weight: bold;
                font-size: 24px;
                line-height: 24px;
                color: #F0F0FA;
                padding-bottom:32px;
            }
            &-button{
                color: #1D1D35
            }
        }
    }
}
</style>