<template>
    <div class="integration-tabs-created-tasks">
        <integrationHeader ></integrationHeader>
        <div class="integration-tabs-created-tasks__container">
            <div class="integration-tabs-created-tasks__container-title">Воронка</div>
            <div class="integration-tabs-created-tasks__container-list" >
                <template v-if="amo?.funnel_actions!=null">
                    <SettingsIntegrationsTask :name="getNameFunnel(amo.funnel_actions[index].id)" :indexPhone ="amo.funnel_actions[index].id" :active="amo.is_active" @clickAmoSettings ="createdTasksEditActiveated" @deleteInput="del(index)" :phone="getPhoneFunnel(amo.funnel_actions[index].id)" v-for="(item, index) in amo?.funnel_actions" :key="index" :index='index'>
                    </SettingsIntegrationsTask>
                </template>
                <template v-if="amo?.new_dialog_action!=null">
                    <SettingsIntegrationsTask :name="getNameFunnel(amo.new_dialog_action.id)" :active="amo.is_active" @clickAmoSettings ="createdTasksEditActiveatedNewDialog" @deleteInput="delNewDialog(amo.new_dialog_action)" :phone="getPhoneFunnel(amo.new_dialog_action.id)" ></SettingsIntegrationsTask>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
    import integrationHeader from "../integrationHeader/integrationHeader.vue";
    import {integrationCards} from "../../../../components/SettingsContainer/SettingsIntegrations/SettingsIntegrationsCard/settings-integrations-card"; 
    import BaseInputGroup from "../../../../components/Base/BaseInputGroup"; 
    import SettingsIntegrationsTask from "../../../../components/SettingsContainer/SettingsIntegrations/SettingsIntegrationsTask/SettingsIntegrationsTask.vue"; 
    import {useIntegrations} from "../../../../composition/useIntegrations";
    import {ref, reactive, onMounted} from 'vue';
    import { useWhatsapp } from "../../../../composition/useWhatsapp";
    import { integrationTasks } from "./integration-tabs-created-tasks";

    export default {
        components: { integrationHeader, BaseInputGroup, SettingsIntegrationsTask },
        setup() {
            const { checkActiveCard, isActiveAmo, activeAmoCrmPage, activeNextTabs, activeIgnoreList, activeCreatedTasks} = integrationCards()
            const { getAmocrm } = useIntegrations()
            const {getDateForChange} = integrationTasks();
            const { whatsapps, getWhatsapps } = useWhatsapp()
             checkActiveCard(true);
             activeCreatedTasks.value = true;
             const amo = ref();
             getWhatsapps();
                 const getAmocrmWrapper = () => {
                getAmocrm()
                    .then(r => {
                        if (r.code === 404) {
                           amo.value = {is_active: false};
                           
                            return;
                        }
                        amo.value = {...r.amocrm_integration};
                     
                    });
            }
            const createdTasksEditActive = ref(false);
            const createdTasksEditActiveated = (index) => {
                const gg = document.querySelector('.settings-integrations__header-pages-link a ')
                const data = amo.value.funnel_actions.find(i => i.id == index)
                getDateForChange(index);
                 gg.click();
            }
            const createdTasksEditActiveatedNewDialog = (index) => {
            const gg = document.querySelector('.settings-integrations__header-pages-link a ')
            const data = amo.value.new_dialog_action.id
                getDateForChange(index);
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
             onMounted(() => {

             });
             const del = (indx) => {
                 console.log(amo.value.funnel_actions)
                  amo.value.funnel_actions=amo.value.funnel_actions.filter(index => index!=0)
                  amo.value.funnel_actions = amo.value.funnel_actions
                  console.log(indx)
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
                createdTasksEditActive,
                del,
                delNewDialog,
                createdTasksEditActiveatedNewDialog
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
    &-title{
        font-size: 12px;
        line-height: 130%;  
        color: #CFCFE4;  
        text-align: left;
        padding-bottom: 6px;
    }
    &-list{
        
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
}
</style>