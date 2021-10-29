<template>
    <div class="settings-integrations-form">
        <div class="scroll" ref="container" @click.self="scrollTo">
            <div class="scroll__bar" ref="scrollbar"></div>
        </div>
        <div class="settings-integrations-form__body" ref="content">
            <template v-if="form.data.data">
                 <div class="settings-integrations-form__field settings-integrations-form__channel">
                     <div class="settings-integrations-form__label" >Канал</div>
                     <!-- <button class="settings-integrations-form__input settings-integrations-form__input_width"
                                    :class="{'settings-integrations-form__input_error': errors.new_dialog_action && (errors.new_dialog_action.funnel_id === null)}"
                                    @click="(openedDropdown.openedProp!=null&& openedDropdown.openedIndex!=null)?openedDropdown.toggleOpened(null, null):openedDropdown.toggleOpened('channel', 'action')"
                                    @blur="openedDropdown.toggleOpened(null, null)"
                            >
                                <div class="settings-integrations-form__dropdown-inner">

                                <template v-if="form.data.data.funnel_actions==null||form.data.data.funnel_actions.id==null">Введите</template>
                                <template v-else>{{validChannelName(form.data.data?.funnel_actions?.id)}}</template>

                                    <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.1888 2.46058C4.16403 2.48338 4.1346 2.50147 4.1022 2.51381C4.06981 2.52615 4.03508 2.5325 4 2.5325C3.96492 2.5325 3.93019 2.52615 3.8978 2.51381C3.8654 2.50147 3.83597 2.48338 3.8112 2.46058L1.36591 0.215245C1.21591 0.0774725 1.01243 4.67421e-05 0.800243 7.24799e-07C0.588055 -4.52925e-05 0.384538 0.0772927 0.234464 0.215001C0.084389 0.352709 5.0074e-05 0.539506 6.11966e-08 0.7343C-4.99516e-05 0.929095 0.0841932 1.11593 0.234197 1.2537L2.68002 3.49904C3.03044 3.81985 3.50512 4 4 4C4.49488 4 4.96956 3.81985 5.31998 3.49904L7.7658 1.2537C7.91581 1.11593 8.00005 0.929095 8 0.7343C7.99995 0.539506 7.91561 0.352709 7.76554 0.215001C7.61546 0.0772928 7.41194 -4.52111e-05 7.19976 8.01112e-07C6.98757 4.68134e-05 6.78409 0.0774725 6.63409 0.215245L4.1888 2.46058Z" fill="#9797BB"/>
                                    </svg>
                                </div>
                                <div class="settings-integrations-form__dropdown-list"
                                     v-if="openedDropdown.openedProp === 'channel' && openedDropdown.openedIndex === 'action'">

                              
                                    <div class="settings-integrations-form__dropdown-item"
                                          v-for="(whatsapp, index) in whatsapps"
                                         :key="index"
                                         @click="validChannelName(whatsapp.whatsapp_id)">
                                          {{whatsapp.phone}}-{{ whatsapp.whatsapp_id}} {{whatsapp}}
                                    </div>
                                </div>
                            </button> -->
                            <button class="settings-integrations-form__input settings-integrations-form__input_width "
                             :class="{'settings-integrations-form__select_active': showChannelsActive }"
                                    @click="showChannels()"
                            >
                                <div class="settings-integrations-form__dropdown-inner">
                                <template v-if="phone==''">Введите</template>
                                <template v-else> {{phone}}</template>
                              
                                    <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.1888 2.46058C4.16403 2.48338 4.1346 2.50147 4.1022 2.51381C4.06981 2.52615 4.03508 2.5325 4 2.5325C3.96492 2.5325 3.93019 2.52615 3.8978 2.51381C3.8654 2.50147 3.83597 2.48338 3.8112 2.46058L1.36591 0.215245C1.21591 0.0774725 1.01243 4.67421e-05 0.800243 7.24799e-07C0.588055 -4.52925e-05 0.384538 0.0772927 0.234464 0.215001C0.084389 0.352709 5.0074e-05 0.539506 6.11966e-08 0.7343C-4.99516e-05 0.929095 0.0841932 1.11593 0.234197 1.2537L2.68002 3.49904C3.03044 3.81985 3.50512 4 4 4C4.49488 4 4.96956 3.81985 5.31998 3.49904L7.7658 1.2537C7.91581 1.11593 8.00005 0.929095 8 0.7343C7.99995 0.539506 7.91561 0.352709 7.76554 0.215001C7.61546 0.0772928 7.41194 -4.52111e-05 7.19976 8.01112e-07C6.98757 4.68134e-05 6.78409 0.0774725 6.63409 0.215245L4.1888 2.46058Z" fill="#9797BB"/>
                                    </svg>
                                </div>
                                <div class="settings-integrations-form__dropdown-list"
                                v-if="showChannelsActive"
                                >
                              
                                    <div class="settings-integrations-form__dropdown-item"
                                          v-for="(whatsapp, index) in whatsapps"
                                         :key="index"
                                         @click="channelChoise(whatsapp.whatsapp_id)">
                                          {{whatsapp.phone}}
                                    </div>
                                </div>
                            </button>
                            </div>
            <div class="settings-integrations-form__active" v-if="phone!=''">
                <div class="settings-integrations-form__field">
                    <div class="settings-integrations-form__header settings-integrations-form__header_mb-30">
                        Если клиент попал в CRM  систему и ему нужно  написать первому
                    </div>
                    <div v-for="(funnelAction, index) in form.data.data.funnel_actions"
                         class="settings-integrations-form__row"
                         :class="{'settings-integrations-form__row_mt-26': index > 0}"
                         :key="index">
                        <div class="settongs-integrations-form__input-group settongs-integrations-form__input-group_mr-13">
                            <div class="settings-integrations-form__label" v-if="index === 0">Воронка</div>
                            <button class="settings-integrations-form__input"
                                    :class="{'settings-integrations-form__input_error': errors.funnel_actions[index] && (errors.funnel_actions[index].funnel_id === null),
                                    'settings-integrations-form__select_active':openedDropdown.openedProp === 'funnel' && openedDropdown.openedIndex === index}"
                                    @click="(openedDropdown.openedProp!=null&& openedDropdown.openedIndex!=null)?openedDropdown.toggleOpened(null, null):openedDropdown.toggleOpened('funnel', index)"
                                    @blur="openedDropdown.toggleOpened(null, null)"
                            >
                                    <div class="settings-integrations-form__dropdown-inner">
                                        {{validFunnelName(funnelAction.funnel_id)}}
                                        <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.1888 2.46058C4.16403 2.48338 4.1346 2.50147 4.1022 2.51381C4.06981 2.52615 4.03508 2.5325 4 2.5325C3.96492 2.5325 3.93019 2.52615 3.8978 2.51381C3.8654 2.50147 3.83597 2.48338 3.8112 2.46058L1.36591 0.215245C1.21591 0.0774725 1.01243 4.67421e-05 0.800243 7.24799e-07C0.588055 -4.52925e-05 0.384538 0.0772927 0.234464 0.215001C0.084389 0.352709 5.0074e-05 0.539506 6.11966e-08 0.7343C-4.99516e-05 0.929095 0.0841932 1.11593 0.234197 1.2537L2.68002 3.49904C3.03044 3.81985 3.50512 4 4 4C4.49488 4 4.96956 3.81985 5.31998 3.49904L7.7658 1.2537C7.91581 1.11593 8.00005 0.929095 8 0.7343C7.99995 0.539506 7.91561 0.352709 7.76554 0.215001C7.61546 0.0772928 7.41194 -4.52111e-05 7.19976 8.01112e-07C6.98757 4.68134e-05 6.78409 0.0774725 6.63409 0.215245L4.1888 2.46058Z" fill="#9797BB"/>
                                        </svg>
                                    </div>
                                    
                                    <div class="settings-integrations-form__dropdown-list"
                                         v-if="openedDropdown.openedProp === 'funnel' && openedDropdown.openedIndex === index"
                                    >
                                        <div  class="settings-integrations-form__dropdown-item" v-for="funnel in funnels" :key="funnel.funnel_id"
                                              @click="openedDropdown.select('funnel_actions', 'funnel_id', funnel.funnel_id, index)"
                                        >
                                            {{funnel.name}}
                                        </div>
                                    </div>

                            </button>
                        </div>
                        <div class="settongs-integrations-form__input-group settongs-integrations-form__input-group_mr-13">
                            <div class="settings-integrations-form__label" v-if="index === 0">Этап</div>
                            <button class="settings-integrations-form__input"
                                    :class="{'settings-integrations-form__input_error': errors.funnel_actions[index] && (errors.funnel_actions[index].column_uid === null),
                                     'settings-integrations-form__select_active': openedDropdown.openedProp === 'column' && openedDropdown.openedIndex === index }"
                                    @click="(openedDropdown.openedProp!=null&& openedDropdown.openedIndex!=null)?openedDropdown.toggleOpened(null, null):openedDropdown.toggleOpened('column', index)"
                                    @blur="openedDropdown.toggleOpened(null, null)"
                            >
                                <div class="settings-integrations-form__dropdown-inner">
                                    {{validColumnName(funnelAction.funnel_id, funnelAction.column_uid)}}
                                    <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.1888 2.46058C4.16403 2.48338 4.1346 2.50147 4.1022 2.51381C4.06981 2.52615 4.03508 2.5325 4 2.5325C3.96492 2.5325 3.93019 2.52615 3.8978 2.51381C3.8654 2.50147 3.83597 2.48338 3.8112 2.46058L1.36591 0.215245C1.21591 0.0774725 1.01243 4.67421e-05 0.800243 7.24799e-07C0.588055 -4.52925e-05 0.384538 0.0772927 0.234464 0.215001C0.084389 0.352709 5.0074e-05 0.539506 6.11966e-08 0.7343C-4.99516e-05 0.929095 0.0841932 1.11593 0.234197 1.2537L2.68002 3.49904C3.03044 3.81985 3.50512 4 4 4C4.49488 4 4.96956 3.81985 5.31998 3.49904L7.7658 1.2537C7.91581 1.11593 8.00005 0.929095 8 0.7343C7.99995 0.539506 7.91561 0.352709 7.76554 0.215001C7.61546 0.0772928 7.41194 -4.52111e-05 7.19976 8.01112e-07C6.98757 4.68134e-05 6.78409 0.0774725 6.63409 0.215245L4.1888 2.46058Z" fill="#9797BB"/>
                                    </svg>
                                </div>
                                <div class="settings-integrations-form__dropdown-list"
                                     v-if="openedDropdown.openedProp === 'column' && openedDropdown.openedIndex === index">
                                    <div  class="settings-integrations-form__dropdown-item" v-for="column in funnels.find(item => item.funnel_id === funnelAction.funnel_id).columns" :key="column.column_uid"
                                         @click="openedDropdown.select('funnel_actions', 'column_uid', column.column_uid, index)">
                                        {{column.name}}
                                    </div>
                                </div>
                            </button>
                        </div>
                     <div class="settongs-integrations-form__input-group">
                            <div class="settings-integrations-form__row settings-integrations-form__row_al-end">
                                <div class="settongs-integrations-form__input-group settongs-integrations-form__input-group_w-100 settongs-integrations-form__input-group_mr-13">
                                    <div class="settings-integrations-form__label" v-if="index === 0">Автосообщение</div>
                                    <SettingsIntegrationAutoMessage @saveText="saveMessage" :updateMessage="funnelAction.message" :automesage="automessage" :indexItem='index' :arrNum='form.data.data.funnel_actions.length' @click="checkAutomessage(funnelAction, index)"></SettingsIntegrationAutoMessage>       
                                </div>

                                <svg width="18" @click="del(index)" class="pointer settings-integrations-form__delete" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1 3.33333H14.31C14.1011 2.39284 13.5484 1.54779 12.7451 0.940598C11.9418 0.333408 10.937 0.0012121 9.9 0H8.1C7.06302 0.0012121 6.05819 0.333408 5.25487 0.940598C4.45156 1.54779 3.89889 2.39284 3.69 3.33333H0.9C0.661305 3.33333 0.432387 3.42113 0.263604 3.57741C0.0948211 3.73369 0 3.94565 0 4.16667C0 4.38768 0.0948211 4.59964 0.263604 4.75592C0.432387 4.9122 0.661305 5 0.9 5H1.8V15.8333C1.80143 16.938 2.27599 17.997 3.1196 18.7782C3.9632 19.5593 5.10696 19.9987 6.3 20H11.7C12.893 19.9987 14.0368 19.5593 14.8804 18.7782C15.724 17.997 16.1986 16.938 16.2 15.8333V5H17.1C17.3387 5 17.5676 4.9122 17.7364 4.75592C17.9052 4.59964 18 4.38768 18 4.16667C18 3.94565 17.9052 3.73369 17.7364 3.57741C17.5676 3.42113 17.3387 3.33333 17.1 3.33333ZM8.1 1.66667H9.9C10.4582 1.6673 11.0026 1.82781 11.4585 2.1262C11.9143 2.42459 12.2593 2.84624 12.4461 3.33333H5.5539C5.74072 2.84624 6.08571 2.42459 6.54155 2.1262C6.99739 1.82781 7.54175 1.6673 8.1 1.66667ZM14.4 15.8333C14.4 16.4964 14.1155 17.1323 13.6092 17.6011C13.1028 18.0699 12.4161 18.3333 11.7 18.3333H6.3C5.58392 18.3333 4.89716 18.0699 4.39081 17.6011C3.88446 17.1323 3.6 16.4964 3.6 15.8333V5H14.4V15.8333ZM7.20005 14.9999C7.43874 14.9999 7.66766 14.9121 7.83644 14.7558C8.00522 14.5995 8.10005 14.3876 8.10005 14.1666V9.16658C8.10005 8.94557 8.00522 8.73361 7.83644 8.57733C7.66766 8.42105 7.43874 8.33325 7.20005 8.33325C6.96135 8.33325 6.73243 8.42105 6.56365 8.57733C6.39487 8.73361 6.30005 8.94557 6.30005 9.16658V14.1666C6.30005 14.3876 6.39487 14.5995 6.56365 14.7558C6.73243 14.9121 6.96135 14.9999 7.20005 14.9999ZM11.4364 14.7558C11.2676 14.9121 11.0387 14.9999 10.8 14.9999C10.5613 14.9999 10.3324 14.9121 10.1636 14.7558C9.99479 14.5995 9.89996 14.3876 9.89996 14.1666V9.16658C9.89996 8.94557 9.99479 8.73361 10.1636 8.57733C10.3324 8.42105 10.5613 8.33325 10.8 8.33325C11.0387 8.33325 11.2676 8.42105 11.4364 8.57733C11.6052 8.73361 11.7 8.94557 11.7 9.16658V14.1666C11.7 14.3876 11.6052 14.5995 11.4364 14.7558Z" fill="#EB5757"/>
                                </svg>
                                

                            </div>
                        </div> 
                        
                          <!-- <div class="settongs-integrations-form__input-group settongs-integrations-form__input-group_width">
                            <div class="settings-integrations-form__label" v-if="index === 0">Тестовая отправка</div>
                            <div class="settings-integrations-form__label-test">
                               <input class="settings-integrations-form__input_test "  v-maska="'# (###) ###-##-##'"> 
                            <div class="settings-integrations-form__label-test-button pointer" @click="test(form.data.data.funnel_actions[index])">Отправить</div>
                            </div>
                        </div> -->
                    </div>
                    <div class="settings-integrations-form__add">
                    <span @click="form.addAction">
                        Добавить условие
                    </span>
                    </div>
                </div>
                <div class="settings-integrations-form__field">
                    <div class="settings-integrations-form__header settings-integrations-form__header_mb-30">
                       Если клиента  нет в CRM системе и его нужно добавить  в сделку 
                    </div>
                    <div class="settings-integrations-form__row">
                        <div class="settongs-integrations-form__input-group">
                            <div class="settings-integrations-form__label">Воронка</div>
                            <button class="settings-integrations-form__input"

                                    :class="{'settings-integrations-form__input_error': errors.new_dialog_action && (errors.new_dialog_action.funnel_id === null),
                                    'settings-integrations-form__select_active': openedDropdown.openedProp === 'funnel' && openedDropdown.openedIndex === 'action' }"
                                    @click="(openedDropdown.openedProp!=null&& openedDropdown.openedIndex!=null)?openedDropdown.toggleOpened(null, null):openedDropdown.toggleOpened('funnel', 'action')"
                                    @blur="openedDropdown.toggleOpened(null, null)"
                            >
                                <div class="settings-integrations-form__dropdown-inner">
                                    {{validFunnelName(form.data.data?.new_dialog_action?.funnel_id)}}
                                    <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.1888 2.46058C4.16403 2.48338 4.1346 2.50147 4.1022 2.51381C4.06981 2.52615 4.03508 2.5325 4 2.5325C3.96492 2.5325 3.93019 2.52615 3.8978 2.51381C3.8654 2.50147 3.83597 2.48338 3.8112 2.46058L1.36591 0.215245C1.21591 0.0774725 1.01243 4.67421e-05 0.800243 7.24799e-07C0.588055 -4.52925e-05 0.384538 0.0772927 0.234464 0.215001C0.084389 0.352709 5.0074e-05 0.539506 6.11966e-08 0.7343C-4.99516e-05 0.929095 0.0841932 1.11593 0.234197 1.2537L2.68002 3.49904C3.03044 3.81985 3.50512 4 4 4C4.49488 4 4.96956 3.81985 5.31998 3.49904L7.7658 1.2537C7.91581 1.11593 8.00005 0.929095 8 0.7343C7.99995 0.539506 7.91561 0.352709 7.76554 0.215001C7.61546 0.0772928 7.41194 -4.52111e-05 7.19976 8.01112e-07C6.98757 4.68134e-05 6.78409 0.0774725 6.63409 0.215245L4.1888 2.46058Z" fill="#9797BB"/>
                                    </svg>
                                </div>
                                <div class="settings-integrations-form__dropdown-list"
                                     v-if="openedDropdown.openedProp === 'funnel' && openedDropdown.openedIndex === 'action'">
                                    <div class="settings-integrations-form__dropdown-item"
                                          v-for="funnel in funnels"
                                         :key="funnel.funnel_id"
                                         @click="openedDropdown.select('new_dialog_action', 'funnel_id', funnel.funnel_id)">
                                         <!--.select('new_dialog_action', 'funnel_id',  funnel.funnel_id)" -->
                                        {{funnel.name}}
                                    </div>
                                </div>
                            </button>
                        </div>
                        <div class="settongs-integrations-form__input-group">
                            <div class="settings-integrations-form__label">Этап</div>
                            <button class="settings-integrations-form__input"
                                    :class="{'settings-integrations-form__input_error': errors.new_dialog_action && (errors.new_dialog_action.column_uid === null),
                                     'settings-integrations-form__select_active': openedDropdown.openedProp === 'column' && openedDropdown.openedIndex === 'action' }"
                                    @click="(openedDropdown.openedProp!=null&& openedDropdown.openedIndex!=null)?openedDropdown.toggleOpened(null, null):openedDropdown.toggleOpened('column', 'action')"
                                    @blur="openedDropdown.toggleOpened(null, null)"
                            >
                                <div class="settings-integrations-form__dropdown-inner">
                                    {{validColumnName(form.data.data?.new_dialog_action?.funnel_id, form.data.data?.new_dialog_action?.column_uid)}}
                                    <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.1888 2.46058C4.16403 2.48338 4.1346 2.50147 4.1022 2.51381C4.06981 2.52615 4.03508 2.5325 4 2.5325C3.96492 2.5325 3.93019 2.52615 3.8978 2.51381C3.8654 2.50147 3.83597 2.48338 3.8112 2.46058L1.36591 0.215245C1.21591 0.0774725 1.01243 4.67421e-05 0.800243 7.24799e-07C0.588055 -4.52925e-05 0.384538 0.0772927 0.234464 0.215001C0.084389 0.352709 5.0074e-05 0.539506 6.11966e-08 0.7343C-4.99516e-05 0.929095 0.0841932 1.11593 0.234197 1.2537L2.68002 3.49904C3.03044 3.81985 3.50512 4 4 4C4.49488 4 4.96956 3.81985 5.31998 3.49904L7.7658 1.2537C7.91581 1.11593 8.00005 0.929095 8 0.7343C7.99995 0.539506 7.91561 0.352709 7.76554 0.215001C7.61546 0.0772928 7.41194 -4.52111e-05 7.19976 8.01112e-07C6.98757 4.68134e-05 6.78409 0.0774725 6.63409 0.215245L4.1888 2.46058Z" fill="#9797BB"/>
                                    </svg>
                                </div>
                                <div class="settings-integrations-form__dropdown-list"
                                     v-if="openedDropdown.openedProp === 'column' && openedDropdown.openedIndex === 'action'">
                                    <div  class="settings-integrations-form__dropdown-item"
                                          v-for="column in funnels.find(item => item.funnel_id === form.data.data?.new_dialog_action?.funnel_id).columns" :key="column.column_uid"
                                          @click="openedDropdown.select('new_dialog_action', 'column_uid', column.column_uid)"
                                    >
                                    <!--.select('new_dialog_action', 'column_uid',  funnel.funnel_id)" -->
                                        {{column.name}}
                                    </div>
                                </div>
                            </button>
                        </div>
                        <div class="settongs-integrations-form__input-group"></div>
                    </div>
                </div>
</div>
<!--                Пока нет Сотрудников и Ролей v-if=false-->
                <div class="settings-integrations-form__field" v-if="false">
                    <div class="settings-integrations-form__header">
                        Выберите роли сотрудников
                    </div>
                    <div class="settings-integrations-form__subheader">
                        Instagram
                    </div>
                    <div class="settings-integrations-form__row settings-integrations-form__row_mt-26">
                        <div class="settings-integrations-form__input settings-integrations-form__input_search">
                            <svg class="settings-integrations-form__icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.8289 13.0041L9.84771 9.0229C10.6189 8.07034 11.0832 6.85992 11.0832 5.54161C11.0832 2.48615 8.59705 0 5.54159 0C2.48612 0 0 2.48612 0 5.54159C0 8.59705 2.48615 11.0832 5.54161 11.0832C6.85992 11.0832 8.07034 10.6189 9.0229 9.84771L13.0041 13.8289C13.1179 13.9427 13.2672 13.9998 13.4165 13.9998C13.5659 13.9998 13.7152 13.9427 13.8289 13.8289C14.057 13.6008 14.057 13.2322 13.8289 13.0041ZM5.54161 9.91654C3.12897 9.91654 1.16666 7.95424 1.16666 5.54159C1.16666 3.12894 3.12897 1.16664 5.54161 1.16664C7.95426 1.16664 9.91656 3.12894 9.91656 5.54159C9.91656 7.95424 7.95424 9.91654 5.54161 9.91654Z" fill="#9797BB"/>
                            </svg>
                            <input type="text" class="settings-integrations-form__input settings-integrations-form__input_clear" placeholder="Поиск по сотрудникам">
                        </div>
                    </div>
                    <table class="settings-integrations-form__contributors">
                        <tr>
                            <th>СОТРУДНИКИ</th>
                            <th>РОЛИ</th>
                            <th>ПОЛУЧАЕТ НОВЫХ КЛИЕНТОВ</th>
                        </tr>
                        <tr>
                            <td>Имя</td>
                            <td>
                                <div class="settings-integrations-form__roles">
                                    <div class="settings-integrations-form__role">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0)">
                                                <path d="M19.3932 12.1504C18.1007 14.2554 15.1607 17.7871 10.0007 17.7871C4.84065 17.7871 1.90065 14.2554 0.608153 12.1504C0.208593 11.5042 -0.00305176 10.7594 -0.00305176 9.99961C-0.00305176 9.23981 0.208593 8.49503 0.608153 7.84878C1.90065 5.74378 4.84065 2.21211 10.0007 2.21211C15.1607 2.21211 18.1007 5.74378 19.3932 7.84878C19.7927 8.49503 20.0044 9.23981 20.0044 9.99961C20.0044 10.7594 19.7927 11.5042 19.3932 12.1504ZM17.9723 8.72128C16.8623 6.91628 14.3498 3.87878 10.0007 3.87878C5.65149 3.87878 3.13899 6.91628 2.02899 8.72128C1.7916 9.1054 1.66586 9.54805 1.66586 9.99961C1.66586 10.4512 1.7916 10.8938 2.02899 11.2779C3.13899 13.0829 5.65149 16.1204 10.0007 16.1204C14.3498 16.1204 16.8623 13.0863 17.9723 11.2779C18.2097 10.8938 18.3354 10.4512 18.3354 9.99961C18.3354 9.54805 18.2097 9.1054 17.9723 8.72128Z" fill="#9797BB"/>
                                                <path d="M9.99962 14.166C9.17553 14.166 8.36994 13.9216 7.68474 13.4638C6.99953 13.006 6.46548 12.3552 6.15012 11.5939C5.83475 10.8325 5.75224 9.99473 5.91301 9.18647C6.07378 8.37822 6.47062 7.63579 7.05334 7.05307C7.63606 6.47035 8.37849 6.07351 9.18674 5.91274C9.99499 5.75197 10.8328 5.83448 11.5941 6.14985C12.3555 6.46521 13.0062 6.99927 13.4641 7.68447C13.9219 8.36968 14.1663 9.17526 14.1663 9.99935C14.165 11.104 13.7255 12.1631 12.9444 12.9442C12.1633 13.7253 11.1043 14.1647 9.99962 14.166ZM9.99962 7.49935C9.50516 7.49935 9.02181 7.64597 8.61069 7.92067C8.19957 8.19538 7.87914 8.58582 7.68992 9.04264C7.5007 9.49945 7.45119 10.0021 7.54765 10.4871C7.64412 10.972 7.88222 11.4175 8.23185 11.7671C8.58148 12.1167 9.02694 12.3548 9.51189 12.4513C9.99684 12.5478 10.4995 12.4983 10.9563 12.309C11.4131 12.1198 11.8036 11.7994 12.0783 11.3883C12.353 10.9772 12.4996 10.4938 12.4996 9.99935C12.4996 9.33631 12.2362 8.70042 11.7674 8.23158C11.2985 7.76274 10.6627 7.49935 9.99962 7.49935Z" fill="#9797BB"/>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0">
                                                    <rect width="20" height="20" fill="white" transform="matrix(1 0 0 -1 0 20)"/>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <div class="settings-integrations-form__role">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0)">
                                                <path d="M19.9994 9.37297C19.8788 7.42299 19.1903 5.5509 18.0187 3.98749C16.847 2.42409 15.2435 1.23771 13.4058 0.574632C11.568 -0.0884492 9.57644 -0.199252 7.67649 0.255883C5.77654 0.711018 4.05131 1.71219 2.71348 3.13599C1.37565 4.55978 0.483721 6.34394 0.147639 8.26852C-0.188444 10.1931 0.0460174 12.174 0.822117 13.9669C1.59822 15.7598 2.88203 17.2865 4.51528 18.3586C6.14853 19.4307 8.05982 20.0015 10.0135 20.0005H15.8327C16.9374 19.9994 17.9966 19.56 18.7777 18.7789C19.5589 17.9977 19.9983 16.9385 19.9994 15.8338V9.37297ZM18.3327 15.8338C18.3327 16.4968 18.0693 17.1327 17.6005 17.6016C17.1316 18.0704 16.4957 18.3338 15.8327 18.3338H10.0135C8.83763 18.3333 7.67506 18.0849 6.6016 17.6049C5.52815 17.1249 4.56792 16.424 3.78352 15.548C2.99533 14.6724 2.40346 13.6384 2.0476 12.5153C1.69173 11.3922 1.5801 10.206 1.72019 9.0363C1.94138 7.19125 2.77034 5.47229 4.07639 4.15041C5.38243 2.82852 7.09127 1.97889 8.93352 1.73547C9.29288 1.69043 9.65468 1.66761 10.0169 1.66714C11.9589 1.66184 13.8409 2.34039 15.3327 3.5838C16.204 4.30792 16.9191 5.20143 17.4348 6.21016C17.9505 7.21889 18.2559 8.32184 18.3327 9.45214V15.8338Z" fill="#9797BB"/>
                                                <path d="M6.66604 7.50065H9.99937C10.2204 7.50065 10.4323 7.41285 10.5886 7.25657C10.7449 7.10029 10.8327 6.88833 10.8327 6.66732C10.8327 6.4463 10.7449 6.23434 10.5886 6.07806C10.4323 5.92178 10.2204 5.83398 9.99937 5.83398H6.66604C6.44502 5.83398 6.23306 5.92178 6.07678 6.07806C5.9205 6.23434 5.8327 6.4463 5.8327 6.66732C5.8327 6.88833 5.9205 7.10029 6.07678 7.25657C6.23306 7.41285 6.44502 7.50065 6.66604 7.50065Z" fill="#9797BB"/>
                                                <path d="M13.3327 9.16602H6.66604C6.44502 9.16602 6.23306 9.25381 6.07678 9.4101C5.9205 9.56638 5.8327 9.77834 5.8327 9.99935C5.8327 10.2204 5.9205 10.4323 6.07678 10.5886C6.23306 10.7449 6.44502 10.8327 6.66604 10.8327H13.3327C13.5537 10.8327 13.7657 10.7449 13.922 10.5886C14.0782 10.4323 14.166 10.2204 14.166 9.99935C14.166 9.77834 14.0782 9.56638 13.922 9.4101C13.7657 9.25381 13.5537 9.16602 13.3327 9.16602Z" fill="#9797BB"/>
                                                <path d="M13.3327 12.5H6.66604C6.44502 12.5 6.23306 12.5878 6.07678 12.7441C5.9205 12.9004 5.8327 13.1123 5.8327 13.3333C5.8327 13.5544 5.9205 13.7663 6.07678 13.9226C6.23306 14.0789 6.44502 14.1667 6.66604 14.1667H13.3327C13.5537 14.1667 13.7657 14.0789 13.922 13.9226C14.0782 13.7663 14.166 13.5544 14.166 13.3333C14.166 13.1123 14.0782 12.9004 13.922 12.7441C13.7657 12.5878 13.5537 12.5 13.3327 12.5Z" fill="#9797BB"/>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0">
                                                    <rect width="20" height="20" fill="white"/>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <div class="settings-integrations-form__role">
                                        <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 10C8.98891 10 9.95561 9.70676 10.7779 9.15735C11.6001 8.60794 12.241 7.82705 12.6194 6.91342C12.9978 5.99979 13.0969 4.99446 12.9039 4.02455C12.711 3.05465 12.2348 2.16373 11.5355 1.46447C10.8363 0.765206 9.94536 0.289002 8.97545 0.0960758C8.00555 -0.0968503 7.00021 0.00216643 6.08658 0.380605C5.17295 0.759043 4.39206 1.39991 3.84265 2.22215C3.29324 3.0444 3 4.0111 3 5C3.00132 6.32568 3.52853 7.59668 4.46593 8.53407C5.40332 9.47147 6.67432 9.99868 8 10ZM8 1.66667C8.65927 1.66667 9.30374 1.86217 9.8519 2.22844C10.4001 2.59471 10.8273 3.1153 11.0796 3.72439C11.3319 4.33348 11.3979 5.0037 11.2693 5.6503C11.1407 6.29691 10.8232 6.89085 10.357 7.35703C9.89085 7.8232 9.2969 8.14067 8.6503 8.26929C8.0037 8.3979 7.33348 8.33189 6.72439 8.0796C6.1153 7.82731 5.59471 7.40007 5.22843 6.8519C4.86216 6.30374 4.66667 5.65927 4.66667 5C4.66667 4.11595 5.01786 3.2681 5.64298 2.64298C6.2681 2.01786 7.11594 1.66667 8 1.66667Z" fill="#9797BB"/>
                                            <path d="M8 11.668C6.01155 11.6702 4.10518 12.4611 2.69914 13.8671C1.29309 15.2731 0.502206 17.1795 0.5 19.168C0.5 19.389 0.587797 19.6009 0.744078 19.7572C0.900358 19.9135 1.11232 20.0013 1.33333 20.0013C1.55435 20.0013 1.76631 19.9135 1.92259 19.7572C2.07887 19.6009 2.16667 19.389 2.16667 19.168C2.16667 17.6209 2.78125 16.1371 3.87521 15.0432C4.96917 13.9492 6.4529 13.3346 8 13.3346C9.5471 13.3346 11.0308 13.9492 12.1248 15.0432C13.2188 16.1371 13.8333 17.6209 13.8333 19.168C13.8333 19.389 13.9211 19.6009 14.0774 19.7572C14.2337 19.9135 14.4457 20.0013 14.6667 20.0013C14.8877 20.0013 15.0996 19.9135 15.2559 19.7572C15.4122 19.6009 15.5 19.389 15.5 19.168C15.4978 17.1795 14.7069 15.2731 13.3009 13.8671C11.8948 12.4611 9.98845 11.6702 8 11.668Z" fill="#9797BB"/>
                                        </svg>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <BaseSwitcherWithoutLabel
                                        change="change"
                                        :dynamic-id="'settings-integrations-form__contributors1'"
                                        :value="true"
                                ></BaseSwitcherWithoutLabel>
                            </td>
                        </tr>
                    </table>
                </div>
            </template>

        </div>
    </div>
    <div class="settings-integrations-form__footer" v-if="phone!=''">
        <BaseButton class="base-button_border-green" @click="$router.go(0)">Отмена</BaseButton>
        <BaseButton class="base-button_enter base-button_p5-15" @click="save">Сохранить</BaseButton>
       

    </div>
</template>
<script>
    import {useCustomScroll} from "../../../composition/useCustomScroll";
    import {onMounted, reactive, ref, computed, onUpdated} from "vue";
    import ModalIntegrationBitrix from "../../Modals/integrations/ModalIntegrationBitrix";
    import ModalIntegrationAmoCRM from "../../Modals/integrations/ModalIntegrationAmoCRM";
    import {ModalInputAutomessageFunc} from "../../Modals/integrations/ModalInputAutomessage/modal-input-automessage";
    import ModalInputAutomessage from "../../Modals/integrations/ModalInputAutomessage/ModalInputAutomessage";
    import BaseButton from "../../Base/BaseButton";
    import BaseSwitcherWithoutLabel from "../../Base/BaseSwitcherWithoutLabel";
    import {useIntegrations} from "../../../composition/useIntegrations";
    import SettingsIntegrationAutoMessage from "./SettingsIntegrationAutoMessage/SettingsIntegrationAutoMessage";
    import { useWhatsapp } from "../../../composition/useWhatsapp";
    import { integrationTasks } from "../../../views/settings/integrations/integrationTabs/integration-tabs-created-tasks"

    export default {
        components: {
            BaseSwitcherWithoutLabel,
            ModalIntegrationBitrix,
            ModalIntegrationAmoCRM,
            BaseButton,
            ModalInputAutomessage,
            SettingsIntegrationAutoMessage
        },
        props: {
            formData: Object
        },
        emits: ['getBitrix', 'getAmocrm', 'close'],
        setup(props, {emit}) {
            const {editDate} = integrationTasks()
            const { whatsapps, getWhatsapps } = useWhatsapp()
            const { container, content, scrollbar, scrollTo, init } = useCustomScroll()
            const { getFunnelsBitrix, getFunnelsAmocrm, updateBitrix, updateAmocrm } = useIntegrations()
           const { showPopup, isPopup, automessage, indexPopup, automessageArray } = ModalInputAutomessageFunc()
            const form = reactive({
                data: {},
                addAction: () => {
                    let objToAdd = {
                        funnel_id: null,
                        column_uid: null,
                        id: phoneId.value,
                        type: 'whatsapp',
                        message: {
                            type: 'text',
                            data: '',
                        }
                    }
                    form.data.data.funnel_actions = Array.isArray(form.data.data.funnel_actions) ? [...form.data.data.funnel_actions, objToAdd] : [objToAdd]
                }
            })
         
            const errors = ref({
                funnel_actions: [],
                new_dialog_action: {
                    funnel_id: 'not_null',
                    column_uid: 'not_null',
                }
            });
            const arrAutoSms = ref([]);
            const saveMessage = (text, index) => {
                console.log(text)
             if(Array.isArray(text)){
                 form.data.data.funnel_actions[index].message={}
                form.data.data.funnel_actions[index].message.data=text[1][0][2][0]
                form.data.data.funnel_actions[index].message.caption = text[0]
                if(text[1][0][0].type.startsWith('im')){
                  form.data.data.funnel_actions[index].message.type= 'img'
                }
               else if(text[1][0][0].type.startsWith('video')){
                  form.data.data.funnel_actions[index].message.type= 'video'
                }
               else {
                    form.data.data.funnel_actions[index].message.type= 'document'
                }
                arrAutoSms.value.push(index)
             } 
             else{
                   form.data.data.funnel_actions[index].message.data=text

                }
                // form.data.data.funnel_actions[index].message.data=text
                // form.data.data.funnel_actions[index].message.data
                // form.data.data.funnel_actions[index].message.data
            }
            getWhatsapps();
            const openedDropdown = reactive({
                toggleOpened: (prop, index) => {
                    openedDropdown.openedProp = prop;
                    openedDropdown.openedIndex = index;
                },
                openedProp: null,
                openedIndex: null,

                select: (prop, name, id, index = null) => {
                    if (index !== null) {
                        form.data.data[prop][index][name] = id;

                    } else {
                        
                        form.data.data[prop][name] = id;
                  
                    }
                    setTimeout(() => {
                        openedDropdown.toggleOpened(null, null);
                    }, 100)
                }
            })
           
            const showChannelsActive = ref(false)
            const showChannels = () => {
                showChannelsActive.value=!showChannelsActive.value
                return showChannelsActive
            }
            const validColumnName = computed(() => {
                return (funnel_id, column_id) => {
                    let name = 'Выбрать';

                    if (funnel_id !== null && column_id !== null) {
                        let findedEl = funnels.value && funnels.value.find(i => i.funnel_id === funnel_id);
                        if (findedEl) {
                            let findedColumn = findedEl.columns.find(i => i.column_uid === column_id);
                            (findedColumn) && (name = findedColumn.name);
                        }
                    }

                    return name;
                }
            })
           const phone = ref('')
           const phoneId = ref();
            const channelChoise = (id) => {
                if(id!=null){
                    phoneId.value=id;
                      let index = whatsapps.value.findIndex(item => item.whatsapp_id==id)  
                       phone.value = whatsapps.value[index].phone;
                         form.data.data.new_dialog_action.id=id;
                         form.data.data.new_dialog_action.type='whatsapp';
                }
               
                return phone
            }
          
            const validFunnelName = computed(() => {
                                return (id) => {
                    let name = 'Выбрать';
                    if (id !== null) {
                        let findedEl = funnels.value && funnels.value.find(i => i.funnel_id === id);

                        if (funnels.value && findedEl) {
                            name = findedEl.name;
                        }
                    }
                    return name;
                }
            })
                 const validChannelName = computed(() => {
                return (id) => {
                    let name = 'Выбрать';
                    if (id !== null) {
                        let index = whatsapps.value.findIndex(item => item.whatsapp_id==id)  
                        name=whatsapps.value[index].phone;
                     form.data.data.funnel_actions[0].id = id;
                   
                    }
                    return name;
                }
            })
          
            const checkAutomessage = (message, index) => {
                form.data.data.funnel_actions[index].message.data=message.message.data;
                
                return message
            }
            const funnels = ref(null);

            const validation = () => {
                let valid = true;
                errors.value.funnel_actions = [];
                errors.value.new_dialog_action = {};
                 errors.value.new_dialog_action.funnel_id = 'not_null';
                errors.value.new_dialog_action.column_uid = 'not_null'; 
                let isValid = false;
        
                if(!form.data.data.funnel_actions){
                    if(form.data.data.new_dialog_action){
                        if(form.data.data.new_dialog_action?.column_uid===null||form.data.data.new_dialog_action?.funnel_id===null){
                            errors.value.new_dialog_action.funnel_id = null;
                            errors.value.new_dialog_action.column_uid = null; 
                          
                            valid= false;
                        }
                        else{
                            errors.value.new_dialog_action.funnel_id = 'not_null';
                            errors.value.new_dialog_action.column_uid = 'not_null'; 
                            valid= true;
                            isValid = true;
                        }  
                    }
                   
                } 
                else{
                         form.data.data.funnel_actions = form.data.data.funnel_actions.filter( lIndex => lIndex.column_uid!=null);
                          form.data.data.funnel_actions = form.data.data.funnel_actions.filter( lIndex => lIndex.funnel_id!=null);
                          form.data.data.funnel_actions = form.data.data.funnel_actions.filter( lIndex => lIndex.message.data!="");
                         
                        //   form.data.data.funnel_actions=form.data.data.funnel_actions.filter( lIndex => lIndex.length!=0);
                        if(form.data.data.new_dialog_action.column_uid===null||form.data.data.new_dialog_action.funnel_id===null){
                                form.data.data.new_dialog_action=null;
                             isValid=false;
                           }
                          if(form.data.data.funnel_actions.length!=0){
                            errors.value.new_dialog_action.funnel_id = 'not_null';
                            errors.value.new_dialog_action.column_uid = 'not_null'; 
                            valid=true; 
                            
                          }
                           else{
                           form.data.data.funnel_actions=null    
                          if(!isValid){
                            valid=false; 
                          }
                            else{
                                 valid=true;  
                            }
                           }
                           
                    }
                errors.value.new_dialog_action = form.data.data.new_dialog_action;
                // errors.value.funnel_actions.find(i => {
                //     if (i.funnel_id === null || i.column_uid === null) {
                //         valid = false;
                //            console.log('333')
                //     }
                //     else
                //      if ((i.funnel_id === null || i.column_uid === null)&&isValid){
                           
                //             valid=true; 
                //     }
                // })   
                return valid;
            }
            const condition = ref();
            const save = () => {
                 console.log('not-yet-valid')
                  if (validation()) { 
                      console.log('valid')
                //     if (form.data.name === 'bitrix') {
                //         updateBitrix(form.data.data)
                //             .then(r => {
                //                 if (r.error) {
                //                     return;
                //                 }
                //                 emit('getBitrix');
                //                 emit('close');
                //             })
            
                //     } else {
                //         console.log('1') 
                if(form.data.data.funnel_actions!=null){    
                    for(let i = 0; i <form.data.data.funnel_actions.length;i++){
                        if(form.data.data.funnel_actions[i].message.hasOwnProperty('is_read')){
                          const type = form.data.data.funnel_actions[i].message.type
                            const mess = form.data.data.funnel_actions[i].message.file_uid
                            const caption = form.data.data.funnel_actions[i].message.caption
                             if(arrAutoSms.value.length=!0){
                                  for(let j = 0; j<arrAutoSms.value.length;j++){
                                if(arrAutoSms.value[j]!==i){
                            form.data.data.funnel_actions[i].message = {};
                            form.data.data.funnel_actions[i].message.data = mess;
                            form.data.data.funnel_actions[i].message.type = type  
                           form.data.data.funnel_actions[i].message.caption = caption  
                                }
                            } 
                             }
                           
                        }
                        else{
                           if(form.data.data.funnel_actions[i].message.message){
                            const type = form.data.data.funnel_actions[i].message.type
                            const mess = form.data.data.funnel_actions[i].message.message
                            form.data.data.funnel_actions[i].message = {};
                            form.data.data.funnel_actions[i].message.data = mess;
                            form.data.data.funnel_actions[i].message.type = type
                        } 
                        }
                    }
                    console.log(form.data.data)
                     console.log(arrAutoSms.value)
                }
                        updateAmocrm(form.data.data)
                            .then(r => {
                                if (r.error) {
                                
                                    return;
                                }
                                automessageArray.value = [];
                                emit('getAmocrm');
                                emit('close');
                                 emit('updateDateSave');
                            })
                        //  location.reload();
                //      }
                }
            }
            const test = (itemForm) => {
                if (validation()) { 
                updateAmocrm(itemForm)
                            .then(r => {
                                if (r.error) {
                                    return;
                                }
                                emit('getAmocrm');
                                emit('close');
                            })
                          }
            }
            const del = (index) => {
             automessageArray.value = automessageArray.value.filter((i, lIndex) => lIndex !== index);
                 form.data.data.funnel_actions = form.data.data.funnel_actions.filter((i, lIndex) => lIndex !== index);
               
            }
          
            onMounted(() => {
                init();
       
                form.data = props.formData;
                if (!form.data.data.new_dialog_action) {
                    form.data.data.new_dialog_action = {
                        funnel_id: null,
                        column_uid: null,
                        id: null,
                    }
                }
                if (Array.isArray(form.data.data.funnel_actions)) {
                    form.data.data.funnel_actions = form.data.data.funnel_actions.map(item => {
                        let k = {}
                        if (item.message && item.message.message) {
                            k.message = {
                                type: 'text',
                                data: item.message.message,


                            }
                        }
                        return {
                            ...item,
                            ...k,
                        }
                    })
                }
                if (form.data.name === 'bitrix') {
                    getFunnelsBitrix()
                        .then(r => {
                            if (r.error) return;
                            funnels.value = r.funnels;
                        })
                }
                if (form.data.name === 'amo') {
                    getFunnelsAmocrm()
                        .then(r => {
                            if (r.error) return;
                            funnels.value = r.funnels;
                        })
                }
            })
         onUpdated(() => {
                if(editDate.value!=null){
                    const id = editDate.value

                channelChoise(id)
                editDate.value=null
                }
                
            })
            return {
                container,
                content,
                scrollbar,
                scrollTo,
                automessage,
                form,
                funnels,
                indexPopup,
                validFunnelName,
                validColumnName,
                isPopup,
                openedDropdown,
                save,
                del,
                errors,
                showPopup,
                condition,
                automessageArray,
                test,
                whatsapps,
                validChannelName,
                showChannelsActive,
                showChannels,
                channelChoise,
                phone,
                phoneId,
                checkAutomessage,
                saveMessage,
                editDate,
                arrAutoSms
        
            }
        }
    }
</script>
<style lang="scss" src="./settings-integrations-form.scss"></style>