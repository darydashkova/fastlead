<template>
  <div class="integration-tabs-ignore">
    <integrationHeader></integrationHeader>
    <div class="integration-tabs-ignore__main">
      <div class="integration-tabs-ignore__main-block">
          <div class="integration-tabs-ignore__main-block-flex">
        <div class="integration-tabs-ignore__main-block-flex-title">Номер телефона</div>
        <input
          placeholder="Ввести"
          class="integration-tabs-ignore__main-block-flex-input"
        />
      </div>
      <div class="integration-tabs-ignore__main-block-flex">
        <div class="integration-tabs-ignore__main-block-flex-title">Воронка</div>
        <button class="settings-integrations-form__input settings-integrations-form__input_width "  @click="openedDropdown.toggleOpened('funnel', 'action')"
                                    @blur="openedDropdown.toggleOpened(null, null)">
            <div class="settings-integrations-form__dropdown-inner">Выбрать
                 <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M4.1888 2.46058C4.16403 2.48338 4.1346 2.50147 4.1022 2.51381C4.06981 2.52615 4.03508 2.5325 4 2.5325C3.96492 2.5325 3.93019 2.52615 3.8978 2.51381C3.8654 2.50147 3.83597 2.48338 3.8112 2.46058L1.36591 0.215245C1.21591 0.0774725 1.01243 4.67421e-05 0.800243 7.24799e-07C0.588055 -4.52925e-05 0.384538 0.0772927 0.234464 0.215001C0.084389 0.352709 5.0074e-05 0.539506 6.11966e-08 0.7343C-4.99516e-05 0.929095 0.0841932 1.11593 0.234197 1.2537L2.68002 3.49904C3.03044 3.81985 3.50512 4 4 4C4.49488 4 4.96956 3.81985 5.31998 3.49904L7.7658 1.2537C7.91581 1.11593 8.00005 0.929095 8 0.7343C7.99995 0.539506 7.91561 0.352709 7.76554 0.215001C7.61546 0.0772928 7.41194 -4.52111e-05 7.19976 8.01112e-07C6.98757 4.68134e-05 6.78409 0.0774725 6.63409 0.215245L4.1888 2.46058Z" fill="#9797BB">
                     </path>
                </svg>
            </div>
            <div class="settings-integrations-form__dropdown-list"  v-if="openedDropdown.openedProp === 'funnel' && openedDropdown.openedIndex === 'action'">
                <div class="settings-integrations-form__dropdown-item"    @click="openedDropdown.select('new_dialog_action', 'column_uid', column.column_uid)">
                    123
                </div>
            </div>
         </button>
      </div>
      <div class="integration-tabs-ignore__main-block-flex">
        <div class="integration-tabs-ignore__main-block-flex-title">Этап</div>
        <button class="settings-integrations-form__input settings-integrations-form__input_width"  @click="openedDropdown.toggleOpened('stage', 'action')"
                                    @blur="openedDropdown.toggleOpened(null, null)">
            <div class="settings-integrations-form__dropdown-inner" @click="activeListStages">Выбрать
                 <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M4.1888 2.46058C4.16403 2.48338 4.1346 2.50147 4.1022 2.51381C4.06981 2.52615 4.03508 2.5325 4 2.5325C3.96492 2.5325 3.93019 2.52615 3.8978 2.51381C3.8654 2.50147 3.83597 2.48338 3.8112 2.46058L1.36591 0.215245C1.21591 0.0774725 1.01243 4.67421e-05 0.800243 7.24799e-07C0.588055 -4.52925e-05 0.384538 0.0772927 0.234464 0.215001C0.084389 0.352709 5.0074e-05 0.539506 6.11966e-08 0.7343C-4.99516e-05 0.929095 0.0841932 1.11593 0.234197 1.2537L2.68002 3.49904C3.03044 3.81985 3.50512 4 4 4C4.49488 4 4.96956 3.81985 5.31998 3.49904L7.7658 1.2537C7.91581 1.11593 8.00005 0.929095 8 0.7343C7.99995 0.539506 7.91561 0.352709 7.76554 0.215001C7.61546 0.0772928 7.41194 -4.52111e-05 7.19976 8.01112e-07C6.98757 4.68134e-05 6.78409 0.0774725 6.63409 0.215245L4.1888 2.46058Z" fill="#9797BB">
                     </path>
                </svg>
            </div>
            <div class="settings-integrations-form__dropdown-list"  v-if="openedDropdown.openedProp === 'stage' && openedDropdown.openedIndex === 'action'">
                <div class="settings-integrations-form__dropdown-item"    @click="openedDropdown.select('new_dialog_action', 'column_uid', column.column_uid)">
                    123
                </div>
            </div>
         </button>
      </div>
      </div>
      <BaseButton  class="base-button_border-green" @click="addNumber" >Добавить</BaseButton>
    </div>
    <div class="integration-tabs-ignore_top">
     <div class="integration-tabs-ignore__main_add integration-tabs-ignore__main"  v-for="item in formData.length" :key="item">
      <div class="integration-tabs-ignore__main-block integration-tabs-ignore__main-block_added">
          <div class="integration-tabs-ignore__main-block-flex">
        <div class="integration-tabs-ignore__main-block-flex-title">Номер телефона</div>
        <input
          placeholder="Ввести"
          class="integration-tabs-ignore__main-block-flex-input"
        />
      </div>
      <div class="integration-tabs-ignore__main-block-flex">
        <div class="integration-tabs-ignore__main-block-flex-title">Воронка</div>
        <button class="settings-integrations-form__input settings-integrations-form__input_width "  @click="openedDropdown.toggleOpened('funnel'+item, 'action')"
                                    @blur="openedDropdown.toggleOpened(null, null)">
            <div class="settings-integrations-form__dropdown-inner">Выбрать
                 <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M4.1888 2.46058C4.16403 2.48338 4.1346 2.50147 4.1022 2.51381C4.06981 2.52615 4.03508 2.5325 4 2.5325C3.96492 2.5325 3.93019 2.52615 3.8978 2.51381C3.8654 2.50147 3.83597 2.48338 3.8112 2.46058L1.36591 0.215245C1.21591 0.0774725 1.01243 4.67421e-05 0.800243 7.24799e-07C0.588055 -4.52925e-05 0.384538 0.0772927 0.234464 0.215001C0.084389 0.352709 5.0074e-05 0.539506 6.11966e-08 0.7343C-4.99516e-05 0.929095 0.0841932 1.11593 0.234197 1.2537L2.68002 3.49904C3.03044 3.81985 3.50512 4 4 4C4.49488 4 4.96956 3.81985 5.31998 3.49904L7.7658 1.2537C7.91581 1.11593 8.00005 0.929095 8 0.7343C7.99995 0.539506 7.91561 0.352709 7.76554 0.215001C7.61546 0.0772928 7.41194 -4.52111e-05 7.19976 8.01112e-07C6.98757 4.68134e-05 6.78409 0.0774725 6.63409 0.215245L4.1888 2.46058Z" fill="#9797BB">
                     </path>
                </svg>
            </div>
            <div class="settings-integrations-form__dropdown-list"  v-if="openedDropdown.openedProp === 'funnel'+item && openedDropdown.openedIndex === 'action'">
                <div class="settings-integrations-form__dropdown-item"    @click="openedDropdown.select('new_dialog_action', 'column_uid', column.column_uid)">
                    123
                </div>
            </div>
         </button>
      </div>
      <div class="integration-tabs-ignore__main-block-flex">
        <div class="integration-tabs-ignore__main-block-flex-title">Этап</div>
        <button class="settings-integrations-form__input settings-integrations-form__input_width"  @click="openedDropdown.toggleOpened('stage'+ item, 'action')"
                                    @blur="openedDropdown.toggleOpened(null, null)">
            <div class="settings-integrations-form__dropdown-inner" @click="activeListStages">Выбрать
                 <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M4.1888 2.46058C4.16403 2.48338 4.1346 2.50147 4.1022 2.51381C4.06981 2.52615 4.03508 2.5325 4 2.5325C3.96492 2.5325 3.93019 2.52615 3.8978 2.51381C3.8654 2.50147 3.83597 2.48338 3.8112 2.46058L1.36591 0.215245C1.21591 0.0774725 1.01243 4.67421e-05 0.800243 7.24799e-07C0.588055 -4.52925e-05 0.384538 0.0772927 0.234464 0.215001C0.084389 0.352709 5.0074e-05 0.539506 6.11966e-08 0.7343C-4.99516e-05 0.929095 0.0841932 1.11593 0.234197 1.2537L2.68002 3.49904C3.03044 3.81985 3.50512 4 4 4C4.49488 4 4.96956 3.81985 5.31998 3.49904L7.7658 1.2537C7.91581 1.11593 8.00005 0.929095 8 0.7343C7.99995 0.539506 7.91561 0.352709 7.76554 0.215001C7.61546 0.0772928 7.41194 -4.52111e-05 7.19976 8.01112e-07C6.98757 4.68134e-05 6.78409 0.0774725 6.63409 0.215245L4.1888 2.46058Z" fill="#9797BB">
                     </path>
                </svg>
            </div>
            <div class="settings-integrations-form__dropdown-list"  v-if="openedDropdown.openedProp === 'stage' +item && openedDropdown.openedIndex === 'action'">
                <div class="settings-integrations-form__dropdown-item"    @click="openedDropdown.select('new_dialog_action', 'column_uid', column.column_uid)">
                    123
                </div>
            </div>
         </button>
      </div>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="integration-tabs-ignore__main-block-delete" @click="del(item)" :id="item"> 
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.29 3H13.779C13.591 2.15356 13.0936 1.39301 12.3706 0.846538C11.6476 0.300067 10.7433 0.00109089 9.81002 0H8.19002C7.25674 0.00109089 6.3524 0.300067 5.62941 0.846538C4.90643 1.39301 4.40903 2.15356 4.22102 3H1.71002C1.4952 3 1.28918 3.07902 1.13726 3.21967C0.985362 3.36032 0.900024 3.55108 0.900024 3.75C0.900024 3.94891 0.985362 4.13968 1.13726 4.28033C1.28918 4.42098 1.4952 4.5 1.71002 4.5H2.52002V14.25C2.52131 15.2442 2.94842 16.1973 3.70766 16.9004C4.4669 17.6034 5.49629 17.9988 6.57002 18H11.43C12.5037 17.9988 13.5331 17.6034 14.2924 16.9004C15.0516 16.1973 15.4788 15.2442 15.48 14.25V4.5H16.29C16.5049 4.5 16.7109 4.42098 16.8628 4.28033C17.0147 4.13968 17.1 3.94891 17.1 3.75C17.1 3.55108 17.0147 3.36032 16.8628 3.21967C16.7109 3.07902 16.5049 3 16.29 3ZM8.19002 1.5H9.81002C10.3124 1.50057 10.8024 1.64503 11.2127 1.91358C11.6229 2.18213 11.9334 2.56162 12.1015 3H5.89853C6.06667 2.56162 6.37716 2.18213 6.78742 1.91358C7.19768 1.64503 7.6876 1.50057 8.19002 1.5ZM13.86 14.25C13.86 14.8468 13.604 15.4191 13.1483 15.841C12.6925 16.2629 12.0745 16.5 11.43 16.5H6.57002C5.92555 16.5 5.30747 16.2629 4.85175 15.841C4.39604 15.4191 4.14002 14.8468 4.14002 14.25V4.5H13.86V14.25ZM7.38007 13.4999C7.59489 13.4999 7.80092 13.4209 7.95282 13.2802C8.10472 13.1396 8.19007 12.9488 8.19007 12.7499V8.24992C8.19007 8.05101 8.10472 7.86025 7.95282 7.7196C7.80092 7.57894 7.59489 7.49992 7.38007 7.49992C7.16524 7.49992 6.95921 7.57894 6.80731 7.7196C6.65541 7.86025 6.57007 8.05101 6.57007 8.24992V12.7499C6.57007 12.9488 6.65541 13.1396 6.80731 13.2802C6.95921 13.4209 7.16524 13.4999 7.38007 13.4999ZM11.1928 13.2802C11.0409 13.4209 10.8349 13.4999 10.62 13.4999C10.4052 13.4999 10.1992 13.4209 10.0473 13.2802C9.89534 13.1396 9.81002 12.9488 9.81002 12.7499V8.24992C9.81002 8.05101 9.89534 7.86025 10.0473 7.7196C10.1992 7.57894 10.4052 7.49992 10.62 7.49992C10.8349 7.49992 11.0409 7.57894 11.1928 7.7196C11.3447 7.86025 11.43 8.05101 11.43 8.24992V12.7499C11.43 12.9488 11.3447 13.1396 11.1928 13.2802Z" fill="#EB5757"/>
        </svg>

      </div>
      <BaseButton  class="base-button_border-green" >Сохранить</BaseButton>
    </div>
    </div>
  </div>
</template>

<script>
 import integrationHeader from "../integrationHeader/integrationHeader.vue";
import { integrationCards } from "../../../../components/SettingsContainer/SettingsIntegrations/SettingsIntegrationsCard/settings-integrations-card";
import { useIntegrations } from "../../../../composition/useIntegrations";
import { ref, reactive } from "vue";
 import BaseButton from "../../../../components/Base/BaseButton";


export default {
  components: { integrationHeader ,BaseButton },
  setup() {
    const {
      checkActiveCard,
      isActiveAmo,
      activeAmoCrmPage,
      activeNextTabs,
      activeIgnoreList,
      activeCreatedTasks,
    } = integrationCards();
    const { getBitrix, getAmocrm, getYclients } = useIntegrations();
    checkActiveCard(true);
    activeIgnoreList.value = true;
    const integrations = reactive({
      amo: {},
      // yclients: {},
      // bitrix: {},
    });

    //   const getBitrixWrapper = () => {
    //     getBitrix()
    //         .then(r => {
    //             if (r.code === 404) {
    //                 integrations.bitrix = {is_active: false};
    //                 return;
    //             }
    //             integrations.bitrix = {...r.bitrix_integration};
    //         });
    // }

    const getAmocrmWrapper = () => {
      getAmocrm().then((r) => {
        if (r.code === 404) {
          integrations.amo = { is_active: false };

          return;
        }
        integrations.amo = { ...r.amocrm_integration };
      });
    };

    const formData = ref([]);
        const openedDropdown = reactive({
                toggleOpened: (prop, index) => {
                    openedDropdown.openedProp = prop;
                    openedDropdown.openedIndex = index;
                },
                openedProp: null,
                openedIndex: null,

                select: (prop, name, id, index = null) => {
                    if (index !== null) {
                        formData[prop][index][name] = id;

                    } else {
                        formData[prop][name] = id;
                    }
                    setTimeout(() => {
                        openedDropdown.toggleOpened(null, null);
                    }, 100)
                }
            })
    const del = (elem) => {
        // formData
     
    }
    // const  getYclientsWrapper = () => {
    //      getYclients()
    //         .then(r => {
    //             if (r.code === 404) {
    //                 integrations.yclients = {is_active: false};
    //                 return;
    //             }
    //             integrations.yclients = {...r.yclients_integration};
    //         });
    // }

    getAmocrmWrapper();
    // getYclientsWrapper();
    //   getBitrixWrapper();
    const addNumber = () => {
        formData.value.length+=1;
    }
    return {
      isActiveAmo,
      activeCreatedTasks,
      integrations,
      // getYclientsWrapper,
      // getBitrixWrapper,
      getAmocrmWrapper,
      addNumber,
      formData,
      openedDropdown,
      del
    };
  },
};
</script>
<style lang="scss">
.integration-tabs-ignore {
  &__main {
    display: flex;
    justify-content: space-between;
    
    margin: 32px 32px 0px 32px;
    padding-bottom: 32px;
    align-items: flex-end;
    border-bottom: 1px solid var(--modal-element-hover-bg-color) ;
    &-block {
        display: flex;
        width: 80%;
        align-items: flex-end;
        &-flex{
            width: 100%;
            margin-right: 16px;
            &-input {
                font-family: Segoe UI;
                font-style: normal;
                font-weight: 400;
                font-size: 14px;
                line-height: 19px;
                width: 100%;
                padding: 8px 10px;
                color: var(--modal-font-color);
                background: var(--modal-element-hover-bg-color);
                border: 0.7px solid var(--modal-input-border-color);
                box-sizing: border-box;
                border-radius: 3px;
                text-align: left;
                position: relative;
                &::placeholder{
                    color:#CFCFE4;
                }
            }
            &-title{
                text-align: left;
                padding-bottom: 6px;
                font-size: 12px;
                line-height: 130%;
                color: #CFCFE4;
            }
            .settings-integrations-form__input{
                @media screen and (max-width: 1200px){
                    max-width: 100%;
                }
            }
        }
        &-delete{
            width:18px ;
            min-width: 18px;
            margin-bottom: 9px;
        }
    }
      &-block_added{
            width: calc(80% + 18px) !important;
        }
     .base-button_border-green{
    padding: 10px 16px;
    font-size: 12px;
    line-height: 17px;
 }
  }
    &__main_add {
    border-bottom: none !important;
    padding-bottom: 0px;
    margin-top: 15px;
    }
     &__main_add:nth-child(1){
 
    margin-top: 32px;
    }
    &_top{
        margin-top: 32px;
    }
}
</style>
<style lang="scss" src="../../../../components/SettingsContainer/SettingsIntegrations/settings-integrations-form.scss"></style>