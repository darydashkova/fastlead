<template>
    <div class="settings-integrations">
        <integrationHeader></integrationHeader>  
{{integrations.amo}}
              <SettingsIntegrationsForm
                
                @getAmocrm="getAmocrmWrapper"
                @close="closeForm"
                :formData="  integrations.amo "
        ></SettingsIntegrationsForm>
       
        <router-view></router-view>
    </div>
</template>

<script>
 
    import BaseButton from "../../../components/Base/BaseButton";
    import SettingsIntegrationsForm from "../../../components/SettingsContainer/SettingsIntegrations/settings-integrations-form";
    import {ref, reactive} from 'vue';
    import {useIntegrations} from "../../../composition/useIntegrations";
     import {integrationCards} from "../../../components/SettingsContainer/SettingsIntegrations/SettingsIntegrationsCard/settings-integrations-card";
    import integrationHeader from "./integrationHeader/integrationHeader";
    export default {
        components: {  BaseButton, integrationHeader, SettingsIntegrationsForm},
      
                   setup() {
            const openedForm = ref(false);
            const openForm = prop => {
                formData.value = {
                    name: prop,
                    data: integrations[prop],
                }
                openedForm.value = true;
            }
            const closeForm = () => {
                formData.value = {
                    name: '',
                    data: {},
                }
                openedForm.value = false;
            }
            const formData = ref(null);

            const { getAmocrm } = useIntegrations()
            const {checkActiveCard, isActiveAmo, activeAmoCrmPage } = integrationCards()
            const integrations = reactive({

                amo: {},


            })

            const getAmocrmWrapper = () => {
                
                getAmocrm()
                    .then(r => {
                        if (r.code === 404) {
                            integrations.amo = {is_active: false};
                           
                            return;
                        }
                        integrations.amo = {...r.amocrm_integration};

                    });
            }
            getAmocrmWrapper();

            return {
                openedForm,
                integrations,

                openForm,
                closeForm,
                formData,

      
                getAmocrmWrapper,
          
                 isActiveAmo,
                 activeAmoCrmPage
            }
        }
        
    }
</script>

<style lang="scss" src="./integrations.scss"></style>