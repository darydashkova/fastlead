<template>
    <div class="settings-integrations">
        <div class="settings-integrations__header">
            <div>
                Интеграции
            </div>
            <BaseButton class="base-button_cancel base-button_p6-40">Помощь с настройкой</BaseButton>
        </div>
        <SettingsIntegrationsForm
                v-if="openedForm"
                @getBitrix="getBitrixWrapper"
                @close="closeForm"
                :formData="formData"
        ></SettingsIntegrationsForm>
        <SettingsIntegrationsList
                :bitrixProps="integrations.bitrix"
                :amoProps="integrations.amo"
                @openForm="openForm"
                v-else
        ></SettingsIntegrationsList>
        <router-view></router-view>
    </div>
</template>

<script>
    import SettingsIntegrationsList from "../../../components/SettingsContainer/SettingsIntegrations/settings-integrations-list";
    import BaseButton from "../../../components/Base/BaseButton";
    import SettingsIntegrationsForm
        from "../../../components/SettingsContainer/SettingsIntegrations/settings-integrations-form";
    import {ref, reactive} from 'vue';
    import {useIntegrations} from "../../../composition/useIntegrations";
    export default {
        components: {SettingsIntegrationsForm, SettingsIntegrationsList, BaseButton},
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

            const { getBitrix, getAmocrm } = useIntegrations()

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

            getAmocrm()
                .then(r => {
                    if (r.code === 404) {
                        integrations.amo = {is_active: false};
                        return;
                    }
                    integrations.amo = {...r.amocrm_integration};
                });

            getBitrixWrapper();

            return {
                openedForm,
                integrations,

                openForm,
                closeForm,
                formData,

                getBitrixWrapper,
            }
        }
    }
</script>

<style lang="scss" src="./integrations.scss"></style>