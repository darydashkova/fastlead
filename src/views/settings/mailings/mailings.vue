<template>
    <div class="settings-mailings">
        <div class="settings-mailings__header">
            <div>
                {{headerName}}
            </div>
            <BaseButton v-if="isCreating" class="base-button_settings-cancel base-button_p5-15" @click="toggleCreating(false)">Отмена</BaseButton>
            <BaseButton v-else class="base-button_enter base-button_p5-15" @click="gotoCreate(null)">Создать новую</BaseButton>
        </div>
        <div class="settings-mailings__content">
            <SettingsMailingsCreate
                    v-if="isCreating"
                    :selectedMailingToEdit="selectedMailingToEdit"
                    @gotoTable="toggleCreating(false)"
            ></SettingsMailingsCreate>
            <SettingsMailingsTable v-else
                @gotoCreate="gotoCreate"
            ></SettingsMailingsTable>
        </div>
    </div>
</template>

<script>
    import BaseButton from '../../../components/Base/BaseButton.vue'
    import SettingsMailingsTable from '../../../components/SettingsContainer/SettingsMailings/SettingsMailingsTable.vue'
    import SettingsMailingsCreate from '../../../components/SettingsContainer/SettingsMailings/SettingsMailingsCreate.vue'

    import { ref, computed } from 'vue';
    import {useMailings} from "../../../composition/useMailings";
    export default {
        components: { BaseButton, SettingsMailingsTable, SettingsMailingsCreate },
        setup() {

            const { getSingleMailing } = useMailings()

             const isCreating = ref(false);
             const toggleCreating = (boolean) => {
                 isCreating.value = boolean;
             }

             const gotoCreate = (id = null) => {
                 if (id) {
                     getSingleMailing(id)
                         .then(r => {
                             selectedMailingToEdit.value = r;
                             toggleCreating(true)
                         })
                 } else {
                     selectedMailingToEdit.value = null;
                     toggleCreating(true)
                 }
             }
             const selectedMailingToEdit = ref(null);


            const headerName = computed(() => {
                if (isCreating.value) {
                    return selectedMailingToEdit.value? `Редактирование ${selectedMailingToEdit.value.name}` : 'Создание новой рассылки';
                } else {
                    return 'Рассылки'
                }
             })


             return {
                 isCreating,
                 toggleCreating,
                 headerName,
                 gotoCreate,
                 selectedMailingToEdit,
             }
        }
    }
</script>

<style lang="scss" src="./mailings.scss"></style>