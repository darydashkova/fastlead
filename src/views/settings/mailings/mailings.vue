<template>
    <div class="settings-mailings">
        <div class="settings-mailings__header">
            <div>
                {{headerName}}
            </div>
            <BaseButton v-if="isCreating" class="base-button_cancel base-button_p5-15" @click="toggleCreating(false)">Отмена</BaseButton>
            <BaseButton v-else class="base-button_enter base-button_p5-15" @click="gotoCreate(null)">Создать новую</BaseButton>
        </div>
        <div class="settings-mailings__scroll-container">
            <div class="scroll" ref="container" @click.self="scrollTo">
                <div class="scroll__bar" ref="scrollbar"></div>
            </div>
            <div class="settings-mailings__content" ref="content">
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
    </div>
</template>

<script>
    import BaseButton from '../../../components/Base/BaseButton.vue'
    import SettingsMailingsTable from '../../../components/SettingsContainer/SettingsMailings/SettingsMailingsTable.vue'
    import SettingsMailingsCreate from '../../../components/SettingsContainer/SettingsMailings/SettingsMailingsCreate.vue'

    import {ref, computed, onMounted} from 'vue';
    import {useMailings} from "../../../composition/useMailings";
    import {useCustomScroll} from "../../../composition/useCustomScroll";
    export default {
        components: { BaseButton, SettingsMailingsTable, SettingsMailingsCreate },
        setup() {
            const { container, content, scrollbar, scrollTo, init } = useCustomScroll()
            const { getSingleMailing } = useMailings()

            onMounted( () => {
                init();
            })

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

                 container,
                 content,
                 scrollbar,
                 scrollTo,
             }
        }
    }
</script>

<style lang="scss" src="./mailings.scss"></style>