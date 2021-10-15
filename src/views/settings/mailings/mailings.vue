<template>
    <div class="settings-mailings">
        <div class="settings-mailings__header">
            <div>
                {{headerName}}
                <div class="settings-mailings__sub-header">
                    <!-- <span class="settings-mailings__sub-title pointer"
                          :class="{'settings-mailings__sub-title_active' : !isDynamicMailingsTable}"
                          @click="toggleDynamicMailingsTable(false)"
                    >Пользовательские</span> -->
                    <!-- <span class="settings-mailings__sub-title"> / </span> -->
                    <!-- <span class="settings-mailings__sub-title pointer"
                          :class="{'settings-mailings__sub-title_active' : isDynamicMailingsTable}"
                          @click="toggleDynamicMailingsTable(true)"
                    >Массовые</span> -->
                </div>
            </div>
            <BaseButton v-if="isCreating" class="base-button_cancel base-button_p6-40" @click="toggleCreating(false)">Отмена</BaseButton>
      <!--            <BaseButton v-else class="base-button_enter base-button_p6-40" @click="toggleModalChoiceMailingType(true)">Создать новую</BaseButton>-->
            <BaseButton v-else class="base-button_enter base-button_p6-40" @click="gotoCreate(null, 1)">Создать новую</BaseButton>
        </div>
        <div class="settings-mailings__scroll-container">
            <div class="scroll" ref="container" @click.self="scrollTo">
                <div class="scroll__bar" ref="scrollbar"></div>
            </div>
            <div class="settings-mailings__content" ref="content">
                <SettingsDynamicMailingsCreate
                        v-if="isCreating && isCreatingMass"
                        :selectedMailingToEdit="selectedMailingToEdit"
                        @gotoTable="toggleCreating(false)"
                ></SettingsDynamicMailingsCreate>
                <SettingsMailingsCreate
                        v-else-if="isCreating"
                        :selectedMailingToEdit="selectedMailingToEdit"
                        @gotoTable="toggleCreating(false)"
                ></SettingsMailingsCreate>

                <SettingsDynamicMailingsTable
                        v-else-if="isDynamicMailingsTable"
                        @gotoCreate="gotoCreate"
                ></SettingsDynamicMailingsTable>
                <SettingsMailingsTable
                        v-else
                        @gotoCreate="gotoCreate"
                ></SettingsMailingsTable>
            </div>
        </div>
        <teleport to="body">
            <ModalChoiceMailingType
                    v-if="isOpenedModalChoiceMailingType"
                    @close="toggleModalChoiceMailingType(false)"
                    @save="(d) => gotoCreate(null, d)"
            ></ModalChoiceMailingType>
        </teleport>
    </div>
</template>

<script>
    import BaseButton from '../../../components/Base/BaseButton.vue'
    import SettingsMailingsTable from '../../../components/SettingsContainer/SettingsMailings/settings-mailings-table.vue'
    import SettingsDynamicMailingsTable from '../../../components/SettingsContainer/SettingsMailings/settings-dynamic-mailings-table.vue'
    import SettingsMailingsCreate from '../../../components/SettingsContainer/SettingsMailings/settings-mailings-create.vue'
    import SettingsDynamicMailingsCreate from '../../../components/SettingsContainer/SettingsMailings/settings-dynamic-mailings-create.vue'

    import ModalChoiceMailingType from "../../../components/Modals/ModalChoiceMailingType";


    import {ref, computed, onMounted} from 'vue';
    import {useMailings} from "../../../composition/useMailings";
    import {useCustomScroll} from "../../../composition/useCustomScroll";
    export default {
        components: { BaseButton, SettingsMailingsTable, SettingsMailingsCreate, SettingsDynamicMailingsCreate, SettingsDynamicMailingsTable, ModalChoiceMailingType },
        setup() {
            const { container, content, scrollbar, scrollTo, init } = useCustomScroll()
            const { getSingleMailing, getSingleDynamicMailing } = useMailings()

            onMounted( () => {
                init();
            })

            const isCreating = ref(false);
            const isMassCreating = ref(false);
            const toggleCreating = (boolean, isMass = false) => {
                isCreating.value = boolean;
                isMassCreating.value = isMass;
            }

            const isDynamicMailingsTable = ref(false);
            const toggleDynamicMailingsTable = (boolean) => {
                isDynamicMailingsTable.value = boolean;
            }

            const isOpenedModalChoiceMailingType = ref(false);
            const toggleModalChoiceMailingType = (boolean) => {
                isOpenedModalChoiceMailingType.value = boolean;
            }

            const isCreatingMass = ref(false);
            const toggleIsCreatingMass = (boolean) => {
                isCreatingMass.value = boolean;
            }

            const gotoCreate = (id = null, choiceNumber) => {
                if (id) {
                    if (choiceNumber === 1) {
                        getSingleMailing(id)
                            .then(r => {
                                selectedMailingToEdit.value = r;
                                toggleIsCreatingMass(false)
                                toggleCreating(true)
                            })
                    } else if (choiceNumber === 2) {
                        getSingleDynamicMailing(id)
                            .then(r => {
                                selectedMailingToEdit.value = r;
                                toggleIsCreatingMass(true)
                                toggleCreating(true)
                            })
                    }

                } else {
                    if (choiceNumber === 1) {
                        toggleIsCreatingMass(false)
                        toggleModalChoiceMailingType(false)
                    } else if (choiceNumber === 2) {
                        toggleIsCreatingMass(true)
                        toggleModalChoiceMailingType(false)
                    }
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
                 isCreatingMass,
                 toggleCreating,
                 headerName,
                 gotoCreate,
                 selectedMailingToEdit,

                 isDynamicMailingsTable,
                 toggleDynamicMailingsTable,

                 isOpenedModalChoiceMailingType,
                 toggleModalChoiceMailingType,

                 container,
                 content,
                 scrollbar,
                 scrollTo,
             }
        }
    }
</script>

<style lang="scss" src="./mailings.scss"></style>