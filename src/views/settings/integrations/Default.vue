<template>
    <div class="settings-integrations">
        <integrationHeaderDefault  :isActivePage='openedForm'   @updateAmo="updateAmo()"   @openList="openedList()" @activeAmoClick="activeAmoClick"></integrationHeaderDefault>  
      <!--  <SettingsIntegrationsForm
                v-if="openedForm"
                @getAmocrm="getAmocrmWrapper"
                @close="closeForm"
                :formData="formData"
        ></SettingsIntegrationsForm>-->
      
        <!-- <SettingsIntegrationsList
                :bitrixProps="integrations.bitrix"
                :amoProps="integrations.amo"
                :yclientsProps="integrations.yclients"
                @getBitrix="getBitrixWrapper"
                @getYclients="getYclientsWrapper"
                @openForm="openForm"
                v-else
        ></SettingsIntegrationsList> -->

        <!-- <SettingsIntegrationsList
                :amoProps="integrations.amo"
                :openForm="openForm"
                v-else
        ></SettingsIntegrationsList>-->
    <SettingsIntegrationsForm
                v-if="openedForm"
                @getAmocrm="getAmocrmWrapper"
                @close="closeForm"
                :formData="formData"
                :editDate="editDate"
                @refreshAmo="getAmocrmWrapper()"
                @updateDateSave ="updateAmo(), openForm"
        ></SettingsIntegrationsForm>
        
        <SettingsIntegrationsList
                :bitrixProps="integrations.bitrix"
                :amoProps="integrations.amo"
                :yclientsProps="integrations.yclients"
                @getBitrix="getBitrixWrapper"
                @getYclients ="getYclientsWrapper"
                @redirectYclient ="yclienRedirection()"
                @openForm="openForm"
                @deleteAmo="delAmoCrm()"
                @deleteYclient="deleteYclient()"
                @activeAmo="activatedForm()" 
                 :activeLink ="isActiveForm"
                @openList="openedList()"
                :openList="isAmoClick"                
                v-else
        ></SettingsIntegrationsList> 
    
   <!-- @openForm="openForm" -->
       
        <router-view></router-view>
       
    </div>
</template>

<script>
    import SettingsIntegrationsList from "../../../components/SettingsContainer/SettingsIntegrations/settings-integrations-list";
    import BaseButton from "../../../components/Base/BaseButton";
    import SettingsIntegrationsForm from "../../../components/SettingsContainer/SettingsIntegrations/settings-integrations-form";
    import {ref, reactive} from 'vue';
    import { useRouter, useRoute}  from 'vue-router'
    import {useIntegrations} from "../../../composition/useIntegrations";
    import {integrationCards} from "../../../components/SettingsContainer/SettingsIntegrations/SettingsIntegrationsCard/settings-integrations-card";
    import integrationHeaderDefault from "./integrationHeader/integrationHeader.vue";
    import {integrationHeader} from "./integrationHeader/integrationHeader.js";
    import { integrationTasks } from "./integrationTabs/integration-tabs-created-tasks"
    export default {
        components: {SettingsIntegrationsForm, SettingsIntegrationsList, BaseButton, integrationHeaderDefault},
        setup() {
            const router = useRouter();
            const {editDate} = integrationTasks();
            const yclienRedirection = () => {
                 router.push('/settings/integrations/yclients/connect')
            }
                   
               const activeAmoClick = () => {
 
               }
        
            const openedForm = ref(false);
            const formData = ref(null);
                const {activateForm, isAmoClick} = integrationHeader();
            const openForm = prop => {
                formData.value = {
                    name: prop,
                    data: integrations[prop],
                }
                openedForm.value = true;
            }
            const amoCrmUpdateValue = ref('111');
            const closeForm = () => {
                formData.value = {
                    name: '',
                    data: {},
                }
                openedForm.value = false;
            }
            const updateAmoDate = ref();
            const openedList = () =>{

            }     
            const { getBitrix, getAmocrm, getYclients, deleteAmocrm, delYclient } = useIntegrations()
            const {checkActiveCard, isActiveAmo, activeAmoCrmPage } = integrationCards()
            const isUpdateAmo = ref();
            const integrations = reactive({
                bitrix: {},
                amo: {},
                yclients: {},
            })

            const getBitrixWrapper = () => {
                getBitrix()
                    .then(r => {
                        if (r.code === 404) {
                            integrations.bitrix = {is_active: false};
                            return;
                        }
                        integrations.bitrix = {...r.bitrix_integration};
                    });
            }
            const getAmocrmWrapper = () => {
                
                getAmocrm()
                    .then(r => {
                        if (r.code === 404) {
                            integrations.amo = {is_active: false};
                            return;
                        }
                        integrations.amo = {...r.amocrm_integration};
                        formData.value.data = integrations.amo
                        if(formData.value.data.new_dialog_action===null){
                            const new_dialog_action = ref({
                                    funnel_id: null,
                                    column_uid: null,
                            });
                            formData.value.data.new_dialog_action=new_dialog_action
                        }
                    }); 
            }
            const  getYclientsWrapper = () => {
               
                 getYclients()
                    .then(r => {
                        if (r.code === 404) {
                            integrations.yclients = {is_active: false};
                            return;
                        }
                        integrations.yclients = {...r.yclients_integration_id};
                    });
            }
            const delAmoCrm = () => {
                deleteAmocrm();
                integrations.amo = {is_active: false};
            }
            const deleteYclient = () => {
                delYclient();
                integrations.yclients = {is_active: false};
            }
             const isActiveForm = ref(false)
            const activatedForm = () => {
                 isActiveForm.value = true
        return true
            }
            getBitrixWrapper();
            getAmocrmWrapper();
            getYclientsWrapper();
            const updateAmo = () => {
                getAmocrmWrapper()
                }
            return {
                openedForm,
                integrations,
                openedList,
                openForm,
                closeForm,
                formData,
                activeAmoClick,
                getBitrixWrapper,
                getAmocrmWrapper,
                 getYclientsWrapper,
                 isActiveAmo,
                 activeAmoCrmPage,
                 deleteAmocrm,
                 delAmoCrm,
                 activatedForm,
                 isActiveForm,
                 isAmoClick,
                 updateAmo,
                 isUpdateAmo,
                 amoCrmUpdateValue,
                 yclienRedirection,
                 deleteYclient,
                 editDate
            }
        }
    }
</script>

<style lang="scss" src="./integrations.scss"></style>