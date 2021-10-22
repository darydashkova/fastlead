<template>
    <div class="settings-integrations__header">
            <div class="settings-integrations__header-name" >
                Интеграции 
            </div>
            <div class="settings-integrations__header-pages" v-if="isActiveAmo">
                <div class="settings-integrations__header-pages-link pointer" :class="{'settings-integrations__header-pages-link_active': activeAmoCrmPage&&href == '/settings/integrations'}" @click="activeNextTabs(), activateForm(true), activeAmo(), updateAmo()">
                     <router-link to="/settings/integrations">Настройка AmoCRM</router-link> 
                    </div>
                <div class="settings-integrations__header-pages-link pointer"   @click="activeNextTabs(), activateForm(false)" :class="{'settings-integrations__header-pages-link_active': activeCreatedTasks}">
                    <router-link to="/settings/integrations/create">Созданные задачи</router-link>
                </div>
                <!-- <div class="settings-integrations__header-pages-link pointer"   @click="activeNextTabs(), activateForm(false) " :class="{'settings-integrations__header-pages-link_active': activeIgnoreList}">
                  <router-link to="/settings/integrations/ignore">  Игнор лист </router-link>
                    </div> -->
            </div>
            <!-- <BaseButton @click="closeForm" v-if="openedForm" class="base-button_cancel base-button_p6-40">Отмена</BaseButton> -->
            <!-- <BaseButton v-else class="base-button_cancel base-button_p6-40">Помощь с настройкой</BaseButton> -->
        </div>
</template>
<script>

import {integrationCards} from "../../../../components/SettingsContainer/SettingsIntegrations/SettingsIntegrationsCard/settings-integrations-card";
import {integrationHeader} from "./integrationHeader.js"

export default {
    props: {
    },
    setup(props, {emit}) {
        const { checkActiveCard, isActiveAmo, activeAmoCrmPage, activeNextTabs,activeIgnoreList,activeCreatedTasks} = integrationCards()
        const {activateForm, isAmoClick} = integrationHeader()
        const activeAmo = () => {
            emit('activeAmo')
            }
        const openList=() => {
            emit('openList')
        }
        const updateAmo = () => {
            emit('updateAmo')
        }
         const href = document.location.pathname;

        if( href == '/settings/integrations'){
            updateAmo()
        }
        return{
            isActiveAmo,
            activeAmoCrmPage,
            activeNextTabs,
            activeCreatedTasks,
            activeIgnoreList,
            activeAmo,
            activateForm,
            openList,
            isAmoClick,
            updateAmo,
            href
        }
    },
}
</script>
<style lang="scss" src="../integrations.scss"></style>