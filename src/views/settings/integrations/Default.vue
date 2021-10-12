<template>
    <div class="settings-integrations">
        <integrationHeaderDefault  :isActivePage='openedForm'   @updateAmo="updateAmo()"   @openList="openedList()"></integrationHeaderDefault>  
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
        <!-- {{formData}}--------------------- -->
        
    <SettingsIntegrationsForm
                v-if="openedForm"
                @getAmocrm="getAmocrmWrapper"
                @close="closeForm"
                :formData="formData"
                @refreshAmo="getAmocrmWrapper()"
                @updateDateSave ="updateAmo(), openForm"
        ></SettingsIntegrationsForm>
        
        <SettingsIntegrationsList
                :bitrixProps="integrations.bitrix"
                :amoProps="integrations.amo"
                @getBitrix="getBitrixWrapper"
                @redirectYclient ="yclienRedirection()"
                @openForm="openForm"
                @deleteAmo="delAmoCrm()"
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
    import {useIntegrations} from "../../../composition/useIntegrations";
    import {integrationCards} from "../../../components/SettingsContainer/SettingsIntegrations/SettingsIntegrationsCard/settings-integrations-card";
    import integrationHeaderDefault from "./integrationHeader/integrationHeader.vue";
     import {integrationHeader} from "./integrationHeader/integrationHeader.js";
    export default {
        components: {SettingsIntegrationsForm, SettingsIntegrationsList, BaseButton, integrationHeaderDefault},
        setup() {
    
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
// openedForm.value = false;

            }     
            const { getBitrix, getAmocrm, deleteAmocrm } = useIntegrations()
            const {checkActiveCard, isActiveAmo, activeAmoCrmPage } = integrationCards()
            const isUpdateAmo = ref();
            const integrations = reactive({
                bitrix: {},
                amo: {},
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
                        formData.value.data= integrations.amo
                    }); 
                 
            }
           
            const delAmoCrm = () => {
                deleteAmocrm();
                integrations.amo = {is_active: false};
            }
             const isActiveForm = ref(false)
            const activatedForm = () => {
                 isActiveForm.value = true
        return true
            }
            getBitrixWrapper();
            getAmocrmWrapper();
            const updateAmo = () => {
                getAmocrmWrapper()
                console.log(formData) 
                }
            return {
                openedForm,
                integrations,
                openedList,
                openForm,
                closeForm,
                formData,

                getBitrixWrapper,
                getAmocrmWrapper,
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
            }
        }
    }
</script>

<style lang="scss" src="./integrations.scss"></style>