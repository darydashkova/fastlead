<template>
    <div class="settings-autoresponder">
        <div class="settings-autoresponder__header">
            <div>
                {{headerName}}
            </div>
            <BaseButton v-if="isCreating && !autoresponders.isOpenedEdit" class="base-button_cancel base-button_p5-15" @click="toggleCreating(false)">Отмена</BaseButton>
            <BaseButton v-else-if="isCreating && autoresponders.isOpenedEdit" class="base-button_cancel base-button_p5-15" @click="cancelEdit">Отменить изменения</BaseButton>
            <BaseButton v-else class="base-button_enter base-button_p5-15" @click="gotoCreate(null)">Создать новый</BaseButton>
        </div>
        <div class="settings-autoresponder__scroll-container">
            <div class="scroll" ref="container" @click.self="scrollTo">
                <div class="scroll__bar" ref="scrollbar"></div>
            </div>
            <div class="settings-autoresponder__content" ref="content">
                <SettingsAutoresponderCreate
                        ref="autoresponderCreateRef"

                        v-if="isCreating"
                        :selectedAutoresponderToEdit="selectedAutoresponderToEdit"
                        @gotoTable="toggleCreating(false)"
                ></SettingsAutoresponderCreate>
                <SettingsAutoresponderTable v-else
                       @gotoCreate="gotoCreate"
                ></SettingsAutoresponderTable>
            </div>
        </div>
    </div>
</template>

<script>
    import BaseButton from '../../../components/Base/BaseButton.vue'
    import SettingsAutoresponderTable from '../../../components/SettingsContainer/SettingsAutoresponder/SettingsAutoresponderTable.vue'
    import SettingsAutoresponderCreate from '../../../components/SettingsContainer/SettingsAutoresponder/SettingsAutoresponderCreate.vue'

    import {ref, computed, onMounted} from 'vue';
    import {useCustomScroll} from "../../../composition/useCustomScroll";
    import {useAutoresponders} from "../../../composition/useAutoresponder";
    export default {
        components: { BaseButton, SettingsAutoresponderTable, SettingsAutoresponderCreate },
        setup() {
            const { container, content, scrollbar, scrollTo, init } = useCustomScroll()

            const { getSingleAutoresponder, autorespondersActions } = useAutoresponders()

            onMounted( () => {
                init();
            })

            const isCreating = ref(false);
            const toggleCreating = (boolean) => {
                isCreating.value = boolean;
            }
            const selectedAutoresponderToEdit = ref(null);

            const gotoCreate = (id = null) => {
                if (id) {
                    getSingleAutoresponder(id)
                        .then(r => {
                            selectedAutoresponderToEdit.value = r;
                            toggleCreating(true)
                        })
                } else {
                    selectedAutoresponderToEdit.value = null;
                    toggleCreating(true)
                }
            }


            const headerName = computed(() => {
                if (isCreating.value) {
                    return selectedAutoresponderToEdit.value? `Редактирование ${selectedAutoresponderToEdit.value.name}` : 'Создание нового автоответчика';
                } else {
                    return 'Автоотвечик'
                }
            })

            const autoresponderCreateRef = ref(null);
            const cancelEdit = () => {
                autoresponderCreateRef.value.cancelEdit()
            }

            return {
                isCreating,
                toggleCreating,
                headerName,
                gotoCreate,
                selectedAutoresponderToEdit,

                container,
                content,
                scrollbar,
                scrollTo,

                autoresponders: computed(() => autorespondersActions),

                autoresponderCreateRef,
                cancelEdit
            }
        }
    }
</script>

<style lang="scss" src="./autoresponder.scss"></style>