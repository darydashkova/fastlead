<template>
    <div class="settings-integrations">
        <div class="settings-integrations__header">
            <div>
                Интеграции
            </div>
            <BaseButton class="base-button_cancel base-button_p6-40">Помощь с настройкой</BaseButton>
        </div>
        <SettingsIntegrationsForm v-if="openedForm"></SettingsIntegrationsForm>
        <SettingsIntegrationsList v-else></SettingsIntegrationsList>
    </div>
</template>

<script>
    import SettingsIntegrationsList from "../../../components/SettingsContainer/SettingsIntegrations/settings-integrations-list";
    import BaseButton from "../../../components/Base/BaseButton";
    import SettingsIntegrationsForm
        from "../../../components/SettingsContainer/SettingsIntegrations/settings-integrations-form";
    import {ref} from 'vue';
    export default {
        components: {SettingsIntegrationsForm, SettingsIntegrationsList, BaseButton},
        setup() {
            const openedForm = ref(true);
            return {
                openedForm
            }
        }
    }
</script>

<style lang="scss" src="./integrations.scss"></style>