<template>
    <div class="settings-mailings">
        <div class="settings-mailings__header">
            <div>
                {{headerName}}
            </div>
            <BaseButton v-if="isCreating" class="base-button_cancel base-button_p5-15" @click="isCreating = false">Отмена</BaseButton>
            <BaseButton v-else class="base-button_enter base-button_p5-15" @click="isCreating = true">Создать новую</BaseButton>
        </div>
        <div class="settings-mailings__content">
            <SettingsMailingsCreate v-if="isCreating"></SettingsMailingsCreate>
            <SettingsMailingsTable v-else></SettingsMailingsTable>
        </div>
    </div>
</template>

<script>
    import BaseButton from '../../../components/Base/BaseButton.vue'
    import SettingsMailingsTable from '../../../components/SettingsContainer/SettingsMailings/SettingsMailingsTable.vue'
    import SettingsMailingsCreate from '../../../components/SettingsContainer/SettingsMailings/SettingsMailingsCreate.vue'

    import { ref, computed } from 'vue';
    export default {
        components: { BaseButton, SettingsMailingsTable, SettingsMailingsCreate },
        setup() {
             const isCreating = ref(false);

             const headerName = computed(() => {
                 return isCreating.value ? 'Создание новой рассылки' : 'Рассылки'
             })

             return {
                 isCreating,
                 headerName,
             }
        }
    }
</script>

<style lang="scss" src="./mailings.scss"></style>