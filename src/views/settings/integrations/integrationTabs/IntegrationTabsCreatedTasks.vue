<template>
    <div class="integration-tabs-created-tasks">
        <integrationHeader ></integrationHeader>
        <div class="integration-tabs-created-tasks__container">
            <teleport to="body" v-if="loading">
                <FullScreenLoader ></FullScreenLoader>
            </teleport>
          <div v-if="amo?.id.length!=0&&amo" class="integration-tabs-created-tasks__container-scroll scroll-poiner">

                <!-- <div class="integration-tabs-created-tasks__container-list" >
                        <SettingsIntegrationsTask :name="getNameFunnel(amo.funnel_actions[index].id)" :indexPhone ="amo.funnel_actions[index].id" :active="amo.is_active" @clickAmoSettings ="createdTasksEditActiveated" @deleteInput="del(index)" :phone="getPhoneFunnel(amo.funnel_actions[index].id)" v-for="(item, index) in amo?.funnel_actions" :key="index" :index='index'>
                        </SettingsIntegrationsTask>
                        <SettingsIntegrationsTask 
                        :data='amo.id[index]' 
                        v-for="(item, index) in amo?.id" 
                        :key="index" 
                        @clickAmoSettings ="createdTasksEditActiveated" 
                        @deleteInput="updateTasks " 
                        ></SettingsIntegrationsTask>
                </div>  -->
                <table class="integration-tabs-created-tasks__container-table">
                    <tr class="integration-tabs-created-tasks__container-table-tr">
                        <th class="integration-tabs-created-tasks__container-table-channel">Канал</th>
                        <th class="integration-tabs-created-tasks__container-table-status">Статус</th>
                        <th class="integration-tabs-created-tasks__container-table-action">Действие</th>
                    </tr>
                    <template v-if="allChanels">
                     <tr class="integration-tabs-created-tasks__container-table-tr integration-tabs-created-tasks__container-table-tr_height" v-for="(channel, inx) in amo.id" :key="inx">
                        <template v-if="allChanels.find(i=>i.hasOwnProperty('whatsapp_id'))&&allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id)">
                            <td class="integration-tabs-created-tasks__container-table-channel" >
                                <img src="../../../../assets/redesign-whatsapp.svg">
                                {{allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).name}}
                         
                            </td>
                            <td class="integration-tabs-created-tasks__container-table-status"
                           
                            ><div :class="{'integration-tabs-created-tasks__container-table-status_active':allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).status=='Активен',
                            'integration-tabs-created-tasks__container-table-status_no-active':allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).status=='Не активирован',
                            'integration-tabs-created-tasks__container-table-status_problems':allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).status=='Проблемы с  подключением к телефону',
                             'integration-tabs-created-tasks__container-table-status_disabled':allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).status=='Недействительная сессия',
                             'integration-tabs-created-tasks__container-table-status_off':allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).status=='Отключен'
                            }">{{allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).status}}</div>
                            </td>
                            <td class="integration-tabs-created-tasks__container-table-action">
                            <div @click="createdTasksEditActiveated(channel.id, 'whatsapp')" >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="settings-integrations-tasks__edit">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.7197 6.95391C16.8603 6.81326 17.0511 6.73424 17.25 6.73424C17.4489 6.73424 17.6397 6.81326 17.7803 6.95391C17.921 7.09457 18 7.28533 18 7.48424V12.2572C18.0012 12.7499 17.9047 13.2378 17.7161 13.6929C17.5275 14.148 17.2506 14.5611 16.9012 14.9085L14.9092 16.902C14.5617 17.2513 14.1484 17.5281 13.6932 17.7166C13.238 17.9051 12.7499 18.0014 12.2572 18H3.75C2.7558 17.9988 1.80267 17.6033 1.09966 16.9003C0.396661 16.1973 0.00119089 15.2442 0 14.25V3.75C0.00119089 2.7558 0.396661 1.80267 1.09966 1.09966C1.80267 0.396661 2.7558 0.00119089 3.75 0H10.5315C10.7304 0 10.9212 0.0790176 11.0618 0.21967C11.2025 0.360322 11.2815 0.551087 11.2815 0.749999C11.2815 0.948912 11.2025 1.13968 11.0618 1.28033C10.9212 1.42098 10.7304 1.5 10.5315 1.5H3.75C3.15326 1.5 2.58097 1.73705 2.15901 2.15901C1.73705 2.58096 1.5 3.15326 1.5 3.75V14.25C1.5 14.8467 1.73705 15.419 2.15901 15.841C2.58097 16.2629 3.15326 16.5 3.75 16.5H11.25V13.5C11.25 12.9033 11.487 12.331 11.909 11.909C12.331 11.487 12.9033 11.25 13.5 11.25H16.5V7.48424C16.5 7.28533 16.579 7.09457 16.7197 6.95391ZM12.75 16.4415C13.166 16.3504 13.5473 16.1422 13.8487 15.8415L15.8437 13.848C16.143 13.5457 16.351 13.1651 16.4437 12.75H13.5C13.3011 12.75 13.1103 12.829 12.9697 12.9697C12.829 13.1103 12.75 13.3011 12.75 13.5V16.4415ZM4.84655 9.84191L13.9905 0.69792C14.4363 0.27184 15.0292 0.0340576 15.6458 0.0340576C16.2624 0.0340576 16.8553 0.27184 17.301 0.69792C17.7393 1.13729 17.9855 1.73256 17.9855 2.35317C17.9855 2.97377 17.7393 3.56904 17.301 4.00842L8.15705 13.1524C7.80969 13.5017 7.39651 13.7785 6.94142 13.967C6.48633 14.1555 5.99837 14.2518 5.5058 14.2504H4.49855C4.29964 14.2504 4.10887 14.1714 3.96822 14.0307C3.82757 13.8901 3.74855 13.6993 3.74855 13.5004V12.4932C3.74716 12.0006 3.84349 11.5126 4.03196 11.0575C4.22043 10.6025 4.49731 10.1893 4.84655 9.84191ZM7.09655 12.0919L16.2405 2.94792C16.398 2.79003 16.4864 2.57615 16.4864 2.35317C16.4864 2.13019 16.398 1.9163 16.2405 1.75842C16.0804 1.60539 15.8673 1.51999 15.6458 1.51999C15.4243 1.51999 15.2112 1.60539 15.051 1.75842L5.90705 10.9024C5.48672 11.3253 5.25011 11.8969 5.24855 12.4932V12.7504H5.5058C6.10205 12.7488 6.67364 12.5122 7.09655 12.0919Z" fill="#9797BB"/>
                        </svg>
                        </div>
                        <div @click="deleteInput()" > 
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="settings-integrations-tasks__delete">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.29 3H13.779C13.591 2.15356 13.0936 1.39301 12.3706 0.846538C11.6476 0.300067 10.7433 0.00109089 9.81002 0H8.19002C7.25674 0.00109089 6.3524 0.300067 5.62941 0.846538C4.90643 1.39301 4.40903 2.15356 4.22102 3H1.71002C1.4952 3 1.28918 3.07902 1.13726 3.21967C0.985362 3.36032 0.900024 3.55108 0.900024 3.75C0.900024 3.94891 0.985362 4.13968 1.13726 4.28033C1.28918 4.42098 1.4952 4.5 1.71002 4.5H2.52002V14.25C2.52131 15.2442 2.94842 16.1973 3.70766 16.9004C4.4669 17.6034 5.49629 17.9988 6.57002 18H11.43C12.5037 17.9988 13.5331 17.6034 14.2924 16.9004C15.0516 16.1973 15.4788 15.2442 15.48 14.25V4.5H16.29C16.5049 4.5 16.7109 4.42098 16.8628 4.28033C17.0147 4.13968 17.1 3.94891 17.1 3.75C17.1 3.55108 17.0147 3.36032 16.8628 3.21967C16.7109 3.07902 16.5049 3 16.29 3ZM8.19002 1.5H9.81002C10.3124 1.50057 10.8024 1.64503 11.2127 1.91358C11.6229 2.18213 11.9334 2.56162 12.1015 3H5.89853C6.06667 2.56162 6.37716 2.18213 6.78742 1.91358C7.19768 1.64503 7.6876 1.50057 8.19002 1.5ZM13.86 14.25C13.86 14.8468 13.604 15.4191 13.1483 15.841C12.6925 16.2629 12.0745 16.5 11.43 16.5H6.57002C5.92555 16.5 5.30747 16.2629 4.85175 15.841C4.39604 15.4191 4.14002 14.8468 4.14002 14.25V4.5H13.86V14.25ZM7.38007 13.4999C7.59489 13.4999 7.80092 13.4209 7.95282 13.2802C8.10472 13.1396 8.19007 12.9488 8.19007 12.7499V8.24992C8.19007 8.05101 8.10472 7.86025 7.95282 7.7196C7.80092 7.57894 7.59489 7.49992 7.38007 7.49992C7.16524 7.49992 6.95921 7.57894 6.80731 7.7196C6.65541 7.86025 6.57007 8.05101 6.57007 8.24992V12.7499C6.57007 12.9488 6.65541 13.1396 6.80731 13.2802C6.95921 13.4209 7.16524 13.4999 7.38007 13.4999ZM11.1928 13.2802C11.0409 13.4209 10.8349 13.4999 10.62 13.4999C10.4052 13.4999 10.1992 13.4209 10.0473 13.2802C9.89534 13.1396 9.81002 12.9488 9.81002 12.7499V8.24992C9.81002 8.05101 9.89534 7.86025 10.0473 7.7196C10.1992 7.57894 10.4052 7.49992 10.62 7.49992C10.8349 7.49992 11.0409 7.57894 11.1928 7.7196C11.3447 7.86025 11.43 8.05101 11.43 8.24992V12.7499C11.43 12.9488 11.3447 13.1396 11.1928 13.2802Z" fill="#EB5757"/>
                            </svg>
                        </div>
                        </td>
                        
                         </template>
                        <template v-else-if="allChanels.find(i=>i.hasOwnProperty('instagram_id'))&&allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id)">
                            <td class="integration-tabs-created-tasks__container-table-channel" >
                                <img src="../../../../assets/redesign-instagram.svg">
                                {{allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).login}}</td>
                            <td class="integration-tabs-created-tasks__container-table-status"> 
                                <div :class="{'integration-tabs-created-tasks__container-table-status_active':allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).status=='Активен',
                                'integration-tabs-created-tasks__container-table-status_no-active':allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).status=='Не активирован',
                                'integration-tabs-created-tasks__container-table-status_problems':allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).status=='Не удалось подключиться',
                                'integration-tabs-created-tasks__container-table-status_disabled':allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).status=='Двухфакторная аутентификация...',
                                'integration-tabs-created-tasks__container-table-status_off':allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).status=='Отключен'
                                }"> {{allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).status}}</div>
                            </td>
                            <td class="integration-tabs-created-tasks__container-table-action">
                            <div @click="createdTasksEditActiveated(channel.id, 'instagram')" >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="settings-integrations-tasks__edit pointer">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.7197 6.95391C16.8603 6.81326 17.0511 6.73424 17.25 6.73424C17.4489 6.73424 17.6397 6.81326 17.7803 6.95391C17.921 7.09457 18 7.28533 18 7.48424V12.2572C18.0012 12.7499 17.9047 13.2378 17.7161 13.6929C17.5275 14.148 17.2506 14.5611 16.9012 14.9085L14.9092 16.902C14.5617 17.2513 14.1484 17.5281 13.6932 17.7166C13.238 17.9051 12.7499 18.0014 12.2572 18H3.75C2.7558 17.9988 1.80267 17.6033 1.09966 16.9003C0.396661 16.1973 0.00119089 15.2442 0 14.25V3.75C0.00119089 2.7558 0.396661 1.80267 1.09966 1.09966C1.80267 0.396661 2.7558 0.00119089 3.75 0H10.5315C10.7304 0 10.9212 0.0790176 11.0618 0.21967C11.2025 0.360322 11.2815 0.551087 11.2815 0.749999C11.2815 0.948912 11.2025 1.13968 11.0618 1.28033C10.9212 1.42098 10.7304 1.5 10.5315 1.5H3.75C3.15326 1.5 2.58097 1.73705 2.15901 2.15901C1.73705 2.58096 1.5 3.15326 1.5 3.75V14.25C1.5 14.8467 1.73705 15.419 2.15901 15.841C2.58097 16.2629 3.15326 16.5 3.75 16.5H11.25V13.5C11.25 12.9033 11.487 12.331 11.909 11.909C12.331 11.487 12.9033 11.25 13.5 11.25H16.5V7.48424C16.5 7.28533 16.579 7.09457 16.7197 6.95391ZM12.75 16.4415C13.166 16.3504 13.5473 16.1422 13.8487 15.8415L15.8437 13.848C16.143 13.5457 16.351 13.1651 16.4437 12.75H13.5C13.3011 12.75 13.1103 12.829 12.9697 12.9697C12.829 13.1103 12.75 13.3011 12.75 13.5V16.4415ZM4.84655 9.84191L13.9905 0.69792C14.4363 0.27184 15.0292 0.0340576 15.6458 0.0340576C16.2624 0.0340576 16.8553 0.27184 17.301 0.69792C17.7393 1.13729 17.9855 1.73256 17.9855 2.35317C17.9855 2.97377 17.7393 3.56904 17.301 4.00842L8.15705 13.1524C7.80969 13.5017 7.39651 13.7785 6.94142 13.967C6.48633 14.1555 5.99837 14.2518 5.5058 14.2504H4.49855C4.29964 14.2504 4.10887 14.1714 3.96822 14.0307C3.82757 13.8901 3.74855 13.6993 3.74855 13.5004V12.4932C3.74716 12.0006 3.84349 11.5126 4.03196 11.0575C4.22043 10.6025 4.49731 10.1893 4.84655 9.84191ZM7.09655 12.0919L16.2405 2.94792C16.398 2.79003 16.4864 2.57615 16.4864 2.35317C16.4864 2.13019 16.398 1.9163 16.2405 1.75842C16.0804 1.60539 15.8673 1.51999 15.6458 1.51999C15.4243 1.51999 15.2112 1.60539 15.051 1.75842L5.90705 10.9024C5.48672 11.3253 5.25011 11.8969 5.24855 12.4932V12.7504H5.5058C6.10205 12.7488 6.67364 12.5122 7.09655 12.0919Z" fill="#9797BB"/>
                        </svg>
                        </div>
                        <div @click="deleteInput()" > 
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="settings-integrations-tasks__delete pointer">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.29 3H13.779C13.591 2.15356 13.0936 1.39301 12.3706 0.846538C11.6476 0.300067 10.7433 0.00109089 9.81002 0H8.19002C7.25674 0.00109089 6.3524 0.300067 5.62941 0.846538C4.90643 1.39301 4.40903 2.15356 4.22102 3H1.71002C1.4952 3 1.28918 3.07902 1.13726 3.21967C0.985362 3.36032 0.900024 3.55108 0.900024 3.75C0.900024 3.94891 0.985362 4.13968 1.13726 4.28033C1.28918 4.42098 1.4952 4.5 1.71002 4.5H2.52002V14.25C2.52131 15.2442 2.94842 16.1973 3.70766 16.9004C4.4669 17.6034 5.49629 17.9988 6.57002 18H11.43C12.5037 17.9988 13.5331 17.6034 14.2924 16.9004C15.0516 16.1973 15.4788 15.2442 15.48 14.25V4.5H16.29C16.5049 4.5 16.7109 4.42098 16.8628 4.28033C17.0147 4.13968 17.1 3.94891 17.1 3.75C17.1 3.55108 17.0147 3.36032 16.8628 3.21967C16.7109 3.07902 16.5049 3 16.29 3ZM8.19002 1.5H9.81002C10.3124 1.50057 10.8024 1.64503 11.2127 1.91358C11.6229 2.18213 11.9334 2.56162 12.1015 3H5.89853C6.06667 2.56162 6.37716 2.18213 6.78742 1.91358C7.19768 1.64503 7.6876 1.50057 8.19002 1.5ZM13.86 14.25C13.86 14.8468 13.604 15.4191 13.1483 15.841C12.6925 16.2629 12.0745 16.5 11.43 16.5H6.57002C5.92555 16.5 5.30747 16.2629 4.85175 15.841C4.39604 15.4191 4.14002 14.8468 4.14002 14.25V4.5H13.86V14.25ZM7.38007 13.4999C7.59489 13.4999 7.80092 13.4209 7.95282 13.2802C8.10472 13.1396 8.19007 12.9488 8.19007 12.7499V8.24992C8.19007 8.05101 8.10472 7.86025 7.95282 7.7196C7.80092 7.57894 7.59489 7.49992 7.38007 7.49992C7.16524 7.49992 6.95921 7.57894 6.80731 7.7196C6.65541 7.86025 6.57007 8.05101 6.57007 8.24992V12.7499C6.57007 12.9488 6.65541 13.1396 6.80731 13.2802C6.95921 13.4209 7.16524 13.4999 7.38007 13.4999ZM11.1928 13.2802C11.0409 13.4209 10.8349 13.4999 10.62 13.4999C10.4052 13.4999 10.1992 13.4209 10.0473 13.2802C9.89534 13.1396 9.81002 12.9488 9.81002 12.7499V8.24992C9.81002 8.05101 9.89534 7.86025 10.0473 7.7196C10.1992 7.57894 10.4052 7.49992 10.62 7.49992C10.8349 7.49992 11.0409 7.57894 11.1928 7.7196C11.3447 7.86025 11.43 8.05101 11.43 8.24992V12.7499C11.43 12.9488 11.3447 13.1396 11.1928 13.2802Z" fill="#EB5757"/>
                            </svg>
                        </div>
                        </td>
                         </template>
                        
                    </tr>
                    <tr class="integration-tabs-created-tasks__container-table-tr integration-tabs-created-tasks__container-table-tr_height" v-for="(channel, inx) in amo.id" :key="inx">
                        <template v-if="allChanels.find(i=>i.hasOwnProperty('whatsapp_id'))&&allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id)">
                            <td class="integration-tabs-created-tasks__container-table-channel" >
                                <img src="../../../../assets/redesign-whatsapp.svg">
                                {{allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).name}}
                         
                            </td>
                            <td class="integration-tabs-created-tasks__container-table-status"
                           
                            ><div :class="{'integration-tabs-created-tasks__container-table-status_active':allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).status=='Активен',
                            'integration-tabs-created-tasks__container-table-status_no-active':allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).status=='Не активирован',
                            'integration-tabs-created-tasks__container-table-status_problems':allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).status=='Проблемы с  подключением к телефону',
                             'integration-tabs-created-tasks__container-table-status_disabled':allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).status=='Недействительная сессия',
                             'integration-tabs-created-tasks__container-table-status_off':allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).status=='Отключен'
                            }">{{allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).status}}</div>
                            </td>
                            <td class="integration-tabs-created-tasks__container-table-action">
                            <div @click="createdTasksEditActiveated(channel.id, 'whatsapp')" >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="settings-integrations-tasks__edit">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.7197 6.95391C16.8603 6.81326 17.0511 6.73424 17.25 6.73424C17.4489 6.73424 17.6397 6.81326 17.7803 6.95391C17.921 7.09457 18 7.28533 18 7.48424V12.2572C18.0012 12.7499 17.9047 13.2378 17.7161 13.6929C17.5275 14.148 17.2506 14.5611 16.9012 14.9085L14.9092 16.902C14.5617 17.2513 14.1484 17.5281 13.6932 17.7166C13.238 17.9051 12.7499 18.0014 12.2572 18H3.75C2.7558 17.9988 1.80267 17.6033 1.09966 16.9003C0.396661 16.1973 0.00119089 15.2442 0 14.25V3.75C0.00119089 2.7558 0.396661 1.80267 1.09966 1.09966C1.80267 0.396661 2.7558 0.00119089 3.75 0H10.5315C10.7304 0 10.9212 0.0790176 11.0618 0.21967C11.2025 0.360322 11.2815 0.551087 11.2815 0.749999C11.2815 0.948912 11.2025 1.13968 11.0618 1.28033C10.9212 1.42098 10.7304 1.5 10.5315 1.5H3.75C3.15326 1.5 2.58097 1.73705 2.15901 2.15901C1.73705 2.58096 1.5 3.15326 1.5 3.75V14.25C1.5 14.8467 1.73705 15.419 2.15901 15.841C2.58097 16.2629 3.15326 16.5 3.75 16.5H11.25V13.5C11.25 12.9033 11.487 12.331 11.909 11.909C12.331 11.487 12.9033 11.25 13.5 11.25H16.5V7.48424C16.5 7.28533 16.579 7.09457 16.7197 6.95391ZM12.75 16.4415C13.166 16.3504 13.5473 16.1422 13.8487 15.8415L15.8437 13.848C16.143 13.5457 16.351 13.1651 16.4437 12.75H13.5C13.3011 12.75 13.1103 12.829 12.9697 12.9697C12.829 13.1103 12.75 13.3011 12.75 13.5V16.4415ZM4.84655 9.84191L13.9905 0.69792C14.4363 0.27184 15.0292 0.0340576 15.6458 0.0340576C16.2624 0.0340576 16.8553 0.27184 17.301 0.69792C17.7393 1.13729 17.9855 1.73256 17.9855 2.35317C17.9855 2.97377 17.7393 3.56904 17.301 4.00842L8.15705 13.1524C7.80969 13.5017 7.39651 13.7785 6.94142 13.967C6.48633 14.1555 5.99837 14.2518 5.5058 14.2504H4.49855C4.29964 14.2504 4.10887 14.1714 3.96822 14.0307C3.82757 13.8901 3.74855 13.6993 3.74855 13.5004V12.4932C3.74716 12.0006 3.84349 11.5126 4.03196 11.0575C4.22043 10.6025 4.49731 10.1893 4.84655 9.84191ZM7.09655 12.0919L16.2405 2.94792C16.398 2.79003 16.4864 2.57615 16.4864 2.35317C16.4864 2.13019 16.398 1.9163 16.2405 1.75842C16.0804 1.60539 15.8673 1.51999 15.6458 1.51999C15.4243 1.51999 15.2112 1.60539 15.051 1.75842L5.90705 10.9024C5.48672 11.3253 5.25011 11.8969 5.24855 12.4932V12.7504H5.5058C6.10205 12.7488 6.67364 12.5122 7.09655 12.0919Z" fill="#9797BB"/>
                        </svg>
                        </div>
                        <div @click="deleteInput()" > 
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="settings-integrations-tasks__delete">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.29 3H13.779C13.591 2.15356 13.0936 1.39301 12.3706 0.846538C11.6476 0.300067 10.7433 0.00109089 9.81002 0H8.19002C7.25674 0.00109089 6.3524 0.300067 5.62941 0.846538C4.90643 1.39301 4.40903 2.15356 4.22102 3H1.71002C1.4952 3 1.28918 3.07902 1.13726 3.21967C0.985362 3.36032 0.900024 3.55108 0.900024 3.75C0.900024 3.94891 0.985362 4.13968 1.13726 4.28033C1.28918 4.42098 1.4952 4.5 1.71002 4.5H2.52002V14.25C2.52131 15.2442 2.94842 16.1973 3.70766 16.9004C4.4669 17.6034 5.49629 17.9988 6.57002 18H11.43C12.5037 17.9988 13.5331 17.6034 14.2924 16.9004C15.0516 16.1973 15.4788 15.2442 15.48 14.25V4.5H16.29C16.5049 4.5 16.7109 4.42098 16.8628 4.28033C17.0147 4.13968 17.1 3.94891 17.1 3.75C17.1 3.55108 17.0147 3.36032 16.8628 3.21967C16.7109 3.07902 16.5049 3 16.29 3ZM8.19002 1.5H9.81002C10.3124 1.50057 10.8024 1.64503 11.2127 1.91358C11.6229 2.18213 11.9334 2.56162 12.1015 3H5.89853C6.06667 2.56162 6.37716 2.18213 6.78742 1.91358C7.19768 1.64503 7.6876 1.50057 8.19002 1.5ZM13.86 14.25C13.86 14.8468 13.604 15.4191 13.1483 15.841C12.6925 16.2629 12.0745 16.5 11.43 16.5H6.57002C5.92555 16.5 5.30747 16.2629 4.85175 15.841C4.39604 15.4191 4.14002 14.8468 4.14002 14.25V4.5H13.86V14.25ZM7.38007 13.4999C7.59489 13.4999 7.80092 13.4209 7.95282 13.2802C8.10472 13.1396 8.19007 12.9488 8.19007 12.7499V8.24992C8.19007 8.05101 8.10472 7.86025 7.95282 7.7196C7.80092 7.57894 7.59489 7.49992 7.38007 7.49992C7.16524 7.49992 6.95921 7.57894 6.80731 7.7196C6.65541 7.86025 6.57007 8.05101 6.57007 8.24992V12.7499C6.57007 12.9488 6.65541 13.1396 6.80731 13.2802C6.95921 13.4209 7.16524 13.4999 7.38007 13.4999ZM11.1928 13.2802C11.0409 13.4209 10.8349 13.4999 10.62 13.4999C10.4052 13.4999 10.1992 13.4209 10.0473 13.2802C9.89534 13.1396 9.81002 12.9488 9.81002 12.7499V8.24992C9.81002 8.05101 9.89534 7.86025 10.0473 7.7196C10.1992 7.57894 10.4052 7.49992 10.62 7.49992C10.8349 7.49992 11.0409 7.57894 11.1928 7.7196C11.3447 7.86025 11.43 8.05101 11.43 8.24992V12.7499C11.43 12.9488 11.3447 13.1396 11.1928 13.2802Z" fill="#EB5757"/>
                            </svg>
                        </div>
                        </td>
                        
                         </template>
                        <template v-else-if="allChanels.find(i=>i.hasOwnProperty('instagram_id'))&&allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id)">
                            <td class="integration-tabs-created-tasks__container-table-channel" >
                                <img src="../../../../assets/redesign-instagram.svg">
                                {{allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).login}}</td>
                            <td class="integration-tabs-created-tasks__container-table-status"> 
                                <div :class="{'integration-tabs-created-tasks__container-table-status_active':allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).status=='Активен',
                                'integration-tabs-created-tasks__container-table-status_no-active':allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).status=='Не активирован',
                                'integration-tabs-created-tasks__container-table-status_problems':allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).status=='Не удалось подключиться',
                                'integration-tabs-created-tasks__container-table-status_disabled':allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).status=='Двухфакторная аутентификация...',
                                'integration-tabs-created-tasks__container-table-status_off':allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).status=='Отключен'
                                }"> {{allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).status}}</div>
                            </td>
                            <td class="integration-tabs-created-tasks__container-table-action">
                            <div @click="createdTasksEditActiveated(channel.id, 'instagram')" >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="settings-integrations-tasks__edit pointer">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.7197 6.95391C16.8603 6.81326 17.0511 6.73424 17.25 6.73424C17.4489 6.73424 17.6397 6.81326 17.7803 6.95391C17.921 7.09457 18 7.28533 18 7.48424V12.2572C18.0012 12.7499 17.9047 13.2378 17.7161 13.6929C17.5275 14.148 17.2506 14.5611 16.9012 14.9085L14.9092 16.902C14.5617 17.2513 14.1484 17.5281 13.6932 17.7166C13.238 17.9051 12.7499 18.0014 12.2572 18H3.75C2.7558 17.9988 1.80267 17.6033 1.09966 16.9003C0.396661 16.1973 0.00119089 15.2442 0 14.25V3.75C0.00119089 2.7558 0.396661 1.80267 1.09966 1.09966C1.80267 0.396661 2.7558 0.00119089 3.75 0H10.5315C10.7304 0 10.9212 0.0790176 11.0618 0.21967C11.2025 0.360322 11.2815 0.551087 11.2815 0.749999C11.2815 0.948912 11.2025 1.13968 11.0618 1.28033C10.9212 1.42098 10.7304 1.5 10.5315 1.5H3.75C3.15326 1.5 2.58097 1.73705 2.15901 2.15901C1.73705 2.58096 1.5 3.15326 1.5 3.75V14.25C1.5 14.8467 1.73705 15.419 2.15901 15.841C2.58097 16.2629 3.15326 16.5 3.75 16.5H11.25V13.5C11.25 12.9033 11.487 12.331 11.909 11.909C12.331 11.487 12.9033 11.25 13.5 11.25H16.5V7.48424C16.5 7.28533 16.579 7.09457 16.7197 6.95391ZM12.75 16.4415C13.166 16.3504 13.5473 16.1422 13.8487 15.8415L15.8437 13.848C16.143 13.5457 16.351 13.1651 16.4437 12.75H13.5C13.3011 12.75 13.1103 12.829 12.9697 12.9697C12.829 13.1103 12.75 13.3011 12.75 13.5V16.4415ZM4.84655 9.84191L13.9905 0.69792C14.4363 0.27184 15.0292 0.0340576 15.6458 0.0340576C16.2624 0.0340576 16.8553 0.27184 17.301 0.69792C17.7393 1.13729 17.9855 1.73256 17.9855 2.35317C17.9855 2.97377 17.7393 3.56904 17.301 4.00842L8.15705 13.1524C7.80969 13.5017 7.39651 13.7785 6.94142 13.967C6.48633 14.1555 5.99837 14.2518 5.5058 14.2504H4.49855C4.29964 14.2504 4.10887 14.1714 3.96822 14.0307C3.82757 13.8901 3.74855 13.6993 3.74855 13.5004V12.4932C3.74716 12.0006 3.84349 11.5126 4.03196 11.0575C4.22043 10.6025 4.49731 10.1893 4.84655 9.84191ZM7.09655 12.0919L16.2405 2.94792C16.398 2.79003 16.4864 2.57615 16.4864 2.35317C16.4864 2.13019 16.398 1.9163 16.2405 1.75842C16.0804 1.60539 15.8673 1.51999 15.6458 1.51999C15.4243 1.51999 15.2112 1.60539 15.051 1.75842L5.90705 10.9024C5.48672 11.3253 5.25011 11.8969 5.24855 12.4932V12.7504H5.5058C6.10205 12.7488 6.67364 12.5122 7.09655 12.0919Z" fill="#9797BB"/>
                        </svg>
                        </div>
                        <div @click="deleteInput()" > 
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="settings-integrations-tasks__delete pointer">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.29 3H13.779C13.591 2.15356 13.0936 1.39301 12.3706 0.846538C11.6476 0.300067 10.7433 0.00109089 9.81002 0H8.19002C7.25674 0.00109089 6.3524 0.300067 5.62941 0.846538C4.90643 1.39301 4.40903 2.15356 4.22102 3H1.71002C1.4952 3 1.28918 3.07902 1.13726 3.21967C0.985362 3.36032 0.900024 3.55108 0.900024 3.75C0.900024 3.94891 0.985362 4.13968 1.13726 4.28033C1.28918 4.42098 1.4952 4.5 1.71002 4.5H2.52002V14.25C2.52131 15.2442 2.94842 16.1973 3.70766 16.9004C4.4669 17.6034 5.49629 17.9988 6.57002 18H11.43C12.5037 17.9988 13.5331 17.6034 14.2924 16.9004C15.0516 16.1973 15.4788 15.2442 15.48 14.25V4.5H16.29C16.5049 4.5 16.7109 4.42098 16.8628 4.28033C17.0147 4.13968 17.1 3.94891 17.1 3.75C17.1 3.55108 17.0147 3.36032 16.8628 3.21967C16.7109 3.07902 16.5049 3 16.29 3ZM8.19002 1.5H9.81002C10.3124 1.50057 10.8024 1.64503 11.2127 1.91358C11.6229 2.18213 11.9334 2.56162 12.1015 3H5.89853C6.06667 2.56162 6.37716 2.18213 6.78742 1.91358C7.19768 1.64503 7.6876 1.50057 8.19002 1.5ZM13.86 14.25C13.86 14.8468 13.604 15.4191 13.1483 15.841C12.6925 16.2629 12.0745 16.5 11.43 16.5H6.57002C5.92555 16.5 5.30747 16.2629 4.85175 15.841C4.39604 15.4191 4.14002 14.8468 4.14002 14.25V4.5H13.86V14.25ZM7.38007 13.4999C7.59489 13.4999 7.80092 13.4209 7.95282 13.2802C8.10472 13.1396 8.19007 12.9488 8.19007 12.7499V8.24992C8.19007 8.05101 8.10472 7.86025 7.95282 7.7196C7.80092 7.57894 7.59489 7.49992 7.38007 7.49992C7.16524 7.49992 6.95921 7.57894 6.80731 7.7196C6.65541 7.86025 6.57007 8.05101 6.57007 8.24992V12.7499C6.57007 12.9488 6.65541 13.1396 6.80731 13.2802C6.95921 13.4209 7.16524 13.4999 7.38007 13.4999ZM11.1928 13.2802C11.0409 13.4209 10.8349 13.4999 10.62 13.4999C10.4052 13.4999 10.1992 13.4209 10.0473 13.2802C9.89534 13.1396 9.81002 12.9488 9.81002 12.7499V8.24992C9.81002 8.05101 9.89534 7.86025 10.0473 7.7196C10.1992 7.57894 10.4052 7.49992 10.62 7.49992C10.8349 7.49992 11.0409 7.57894 11.1928 7.7196C11.3447 7.86025 11.43 8.05101 11.43 8.24992V12.7499C11.43 12.9488 11.3447 13.1396 11.1928 13.2802Z" fill="#EB5757"/>
                            </svg>
                        </div>
                        </td>
                         </template>
                        
                    </tr>
                    <tr class="integration-tabs-created-tasks__container-table-tr integration-tabs-created-tasks__container-table-tr_height" v-for="(channel, inx) in amo.id" :key="inx">
                        <template v-if="allChanels.find(i=>i.hasOwnProperty('whatsapp_id'))&&allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id)">
                            <td class="integration-tabs-created-tasks__container-table-channel" >
                                <img src="../../../../assets/redesign-whatsapp.svg">
                                {{allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).name}}
                         
                            </td>
                            <td class="integration-tabs-created-tasks__container-table-status"
                           
                            ><div :class="{'integration-tabs-created-tasks__container-table-status_active':allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).status=='Активен',
                            'integration-tabs-created-tasks__container-table-status_no-active':allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).status=='Не активирован',
                            'integration-tabs-created-tasks__container-table-status_problems':allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).status=='Проблемы с  подключением к телефону',
                             'integration-tabs-created-tasks__container-table-status_disabled':allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).status=='Недействительная сессия',
                             'integration-tabs-created-tasks__container-table-status_off':allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).status=='Отключен'
                            }">{{allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).status}}</div>
                            </td>
                            <td class="integration-tabs-created-tasks__container-table-action">
                            <div @click="createdTasksEditActiveated(channel.id, 'whatsapp')" >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="settings-integrations-tasks__edit">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.7197 6.95391C16.8603 6.81326 17.0511 6.73424 17.25 6.73424C17.4489 6.73424 17.6397 6.81326 17.7803 6.95391C17.921 7.09457 18 7.28533 18 7.48424V12.2572C18.0012 12.7499 17.9047 13.2378 17.7161 13.6929C17.5275 14.148 17.2506 14.5611 16.9012 14.9085L14.9092 16.902C14.5617 17.2513 14.1484 17.5281 13.6932 17.7166C13.238 17.9051 12.7499 18.0014 12.2572 18H3.75C2.7558 17.9988 1.80267 17.6033 1.09966 16.9003C0.396661 16.1973 0.00119089 15.2442 0 14.25V3.75C0.00119089 2.7558 0.396661 1.80267 1.09966 1.09966C1.80267 0.396661 2.7558 0.00119089 3.75 0H10.5315C10.7304 0 10.9212 0.0790176 11.0618 0.21967C11.2025 0.360322 11.2815 0.551087 11.2815 0.749999C11.2815 0.948912 11.2025 1.13968 11.0618 1.28033C10.9212 1.42098 10.7304 1.5 10.5315 1.5H3.75C3.15326 1.5 2.58097 1.73705 2.15901 2.15901C1.73705 2.58096 1.5 3.15326 1.5 3.75V14.25C1.5 14.8467 1.73705 15.419 2.15901 15.841C2.58097 16.2629 3.15326 16.5 3.75 16.5H11.25V13.5C11.25 12.9033 11.487 12.331 11.909 11.909C12.331 11.487 12.9033 11.25 13.5 11.25H16.5V7.48424C16.5 7.28533 16.579 7.09457 16.7197 6.95391ZM12.75 16.4415C13.166 16.3504 13.5473 16.1422 13.8487 15.8415L15.8437 13.848C16.143 13.5457 16.351 13.1651 16.4437 12.75H13.5C13.3011 12.75 13.1103 12.829 12.9697 12.9697C12.829 13.1103 12.75 13.3011 12.75 13.5V16.4415ZM4.84655 9.84191L13.9905 0.69792C14.4363 0.27184 15.0292 0.0340576 15.6458 0.0340576C16.2624 0.0340576 16.8553 0.27184 17.301 0.69792C17.7393 1.13729 17.9855 1.73256 17.9855 2.35317C17.9855 2.97377 17.7393 3.56904 17.301 4.00842L8.15705 13.1524C7.80969 13.5017 7.39651 13.7785 6.94142 13.967C6.48633 14.1555 5.99837 14.2518 5.5058 14.2504H4.49855C4.29964 14.2504 4.10887 14.1714 3.96822 14.0307C3.82757 13.8901 3.74855 13.6993 3.74855 13.5004V12.4932C3.74716 12.0006 3.84349 11.5126 4.03196 11.0575C4.22043 10.6025 4.49731 10.1893 4.84655 9.84191ZM7.09655 12.0919L16.2405 2.94792C16.398 2.79003 16.4864 2.57615 16.4864 2.35317C16.4864 2.13019 16.398 1.9163 16.2405 1.75842C16.0804 1.60539 15.8673 1.51999 15.6458 1.51999C15.4243 1.51999 15.2112 1.60539 15.051 1.75842L5.90705 10.9024C5.48672 11.3253 5.25011 11.8969 5.24855 12.4932V12.7504H5.5058C6.10205 12.7488 6.67364 12.5122 7.09655 12.0919Z" fill="#9797BB"/>
                        </svg>
                        </div>
                        <div @click="deleteInput()" > 
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="settings-integrations-tasks__delete">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.29 3H13.779C13.591 2.15356 13.0936 1.39301 12.3706 0.846538C11.6476 0.300067 10.7433 0.00109089 9.81002 0H8.19002C7.25674 0.00109089 6.3524 0.300067 5.62941 0.846538C4.90643 1.39301 4.40903 2.15356 4.22102 3H1.71002C1.4952 3 1.28918 3.07902 1.13726 3.21967C0.985362 3.36032 0.900024 3.55108 0.900024 3.75C0.900024 3.94891 0.985362 4.13968 1.13726 4.28033C1.28918 4.42098 1.4952 4.5 1.71002 4.5H2.52002V14.25C2.52131 15.2442 2.94842 16.1973 3.70766 16.9004C4.4669 17.6034 5.49629 17.9988 6.57002 18H11.43C12.5037 17.9988 13.5331 17.6034 14.2924 16.9004C15.0516 16.1973 15.4788 15.2442 15.48 14.25V4.5H16.29C16.5049 4.5 16.7109 4.42098 16.8628 4.28033C17.0147 4.13968 17.1 3.94891 17.1 3.75C17.1 3.55108 17.0147 3.36032 16.8628 3.21967C16.7109 3.07902 16.5049 3 16.29 3ZM8.19002 1.5H9.81002C10.3124 1.50057 10.8024 1.64503 11.2127 1.91358C11.6229 2.18213 11.9334 2.56162 12.1015 3H5.89853C6.06667 2.56162 6.37716 2.18213 6.78742 1.91358C7.19768 1.64503 7.6876 1.50057 8.19002 1.5ZM13.86 14.25C13.86 14.8468 13.604 15.4191 13.1483 15.841C12.6925 16.2629 12.0745 16.5 11.43 16.5H6.57002C5.92555 16.5 5.30747 16.2629 4.85175 15.841C4.39604 15.4191 4.14002 14.8468 4.14002 14.25V4.5H13.86V14.25ZM7.38007 13.4999C7.59489 13.4999 7.80092 13.4209 7.95282 13.2802C8.10472 13.1396 8.19007 12.9488 8.19007 12.7499V8.24992C8.19007 8.05101 8.10472 7.86025 7.95282 7.7196C7.80092 7.57894 7.59489 7.49992 7.38007 7.49992C7.16524 7.49992 6.95921 7.57894 6.80731 7.7196C6.65541 7.86025 6.57007 8.05101 6.57007 8.24992V12.7499C6.57007 12.9488 6.65541 13.1396 6.80731 13.2802C6.95921 13.4209 7.16524 13.4999 7.38007 13.4999ZM11.1928 13.2802C11.0409 13.4209 10.8349 13.4999 10.62 13.4999C10.4052 13.4999 10.1992 13.4209 10.0473 13.2802C9.89534 13.1396 9.81002 12.9488 9.81002 12.7499V8.24992C9.81002 8.05101 9.89534 7.86025 10.0473 7.7196C10.1992 7.57894 10.4052 7.49992 10.62 7.49992C10.8349 7.49992 11.0409 7.57894 11.1928 7.7196C11.3447 7.86025 11.43 8.05101 11.43 8.24992V12.7499C11.43 12.9488 11.3447 13.1396 11.1928 13.2802Z" fill="#EB5757"/>
                            </svg>
                        </div>
                        </td>
                        
                         </template>
                        <template v-else-if="allChanels.find(i=>i.hasOwnProperty('instagram_id'))&&allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id)">
                            <td class="integration-tabs-created-tasks__container-table-channel" >
                                <img src="../../../../assets/redesign-instagram.svg">
                                {{allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).login}}</td>
                            <td class="integration-tabs-created-tasks__container-table-status"> 
                                <div :class="{'integration-tabs-created-tasks__container-table-status_active':allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).status=='Активен',
                                'integration-tabs-created-tasks__container-table-status_no-active':allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).status=='Не активирован',
                                'integration-tabs-created-tasks__container-table-status_problems':allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).status=='Не удалось подключиться',
                                'integration-tabs-created-tasks__container-table-status_disabled':allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).status=='Двухфакторная аутентификация...',
                                'integration-tabs-created-tasks__container-table-status_off':allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).status=='Отключен'
                                }"> {{allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).status}}</div>
                            </td>
                            <td class="integration-tabs-created-tasks__container-table-action">
                            <div @click="createdTasksEditActiveated(channel.id, 'instagram')" >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="settings-integrations-tasks__edit pointer">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.7197 6.95391C16.8603 6.81326 17.0511 6.73424 17.25 6.73424C17.4489 6.73424 17.6397 6.81326 17.7803 6.95391C17.921 7.09457 18 7.28533 18 7.48424V12.2572C18.0012 12.7499 17.9047 13.2378 17.7161 13.6929C17.5275 14.148 17.2506 14.5611 16.9012 14.9085L14.9092 16.902C14.5617 17.2513 14.1484 17.5281 13.6932 17.7166C13.238 17.9051 12.7499 18.0014 12.2572 18H3.75C2.7558 17.9988 1.80267 17.6033 1.09966 16.9003C0.396661 16.1973 0.00119089 15.2442 0 14.25V3.75C0.00119089 2.7558 0.396661 1.80267 1.09966 1.09966C1.80267 0.396661 2.7558 0.00119089 3.75 0H10.5315C10.7304 0 10.9212 0.0790176 11.0618 0.21967C11.2025 0.360322 11.2815 0.551087 11.2815 0.749999C11.2815 0.948912 11.2025 1.13968 11.0618 1.28033C10.9212 1.42098 10.7304 1.5 10.5315 1.5H3.75C3.15326 1.5 2.58097 1.73705 2.15901 2.15901C1.73705 2.58096 1.5 3.15326 1.5 3.75V14.25C1.5 14.8467 1.73705 15.419 2.15901 15.841C2.58097 16.2629 3.15326 16.5 3.75 16.5H11.25V13.5C11.25 12.9033 11.487 12.331 11.909 11.909C12.331 11.487 12.9033 11.25 13.5 11.25H16.5V7.48424C16.5 7.28533 16.579 7.09457 16.7197 6.95391ZM12.75 16.4415C13.166 16.3504 13.5473 16.1422 13.8487 15.8415L15.8437 13.848C16.143 13.5457 16.351 13.1651 16.4437 12.75H13.5C13.3011 12.75 13.1103 12.829 12.9697 12.9697C12.829 13.1103 12.75 13.3011 12.75 13.5V16.4415ZM4.84655 9.84191L13.9905 0.69792C14.4363 0.27184 15.0292 0.0340576 15.6458 0.0340576C16.2624 0.0340576 16.8553 0.27184 17.301 0.69792C17.7393 1.13729 17.9855 1.73256 17.9855 2.35317C17.9855 2.97377 17.7393 3.56904 17.301 4.00842L8.15705 13.1524C7.80969 13.5017 7.39651 13.7785 6.94142 13.967C6.48633 14.1555 5.99837 14.2518 5.5058 14.2504H4.49855C4.29964 14.2504 4.10887 14.1714 3.96822 14.0307C3.82757 13.8901 3.74855 13.6993 3.74855 13.5004V12.4932C3.74716 12.0006 3.84349 11.5126 4.03196 11.0575C4.22043 10.6025 4.49731 10.1893 4.84655 9.84191ZM7.09655 12.0919L16.2405 2.94792C16.398 2.79003 16.4864 2.57615 16.4864 2.35317C16.4864 2.13019 16.398 1.9163 16.2405 1.75842C16.0804 1.60539 15.8673 1.51999 15.6458 1.51999C15.4243 1.51999 15.2112 1.60539 15.051 1.75842L5.90705 10.9024C5.48672 11.3253 5.25011 11.8969 5.24855 12.4932V12.7504H5.5058C6.10205 12.7488 6.67364 12.5122 7.09655 12.0919Z" fill="#9797BB"/>
                        </svg>
                        </div>
                        <div @click="deleteInput()" > 
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="settings-integrations-tasks__delete pointer">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.29 3H13.779C13.591 2.15356 13.0936 1.39301 12.3706 0.846538C11.6476 0.300067 10.7433 0.00109089 9.81002 0H8.19002C7.25674 0.00109089 6.3524 0.300067 5.62941 0.846538C4.90643 1.39301 4.40903 2.15356 4.22102 3H1.71002C1.4952 3 1.28918 3.07902 1.13726 3.21967C0.985362 3.36032 0.900024 3.55108 0.900024 3.75C0.900024 3.94891 0.985362 4.13968 1.13726 4.28033C1.28918 4.42098 1.4952 4.5 1.71002 4.5H2.52002V14.25C2.52131 15.2442 2.94842 16.1973 3.70766 16.9004C4.4669 17.6034 5.49629 17.9988 6.57002 18H11.43C12.5037 17.9988 13.5331 17.6034 14.2924 16.9004C15.0516 16.1973 15.4788 15.2442 15.48 14.25V4.5H16.29C16.5049 4.5 16.7109 4.42098 16.8628 4.28033C17.0147 4.13968 17.1 3.94891 17.1 3.75C17.1 3.55108 17.0147 3.36032 16.8628 3.21967C16.7109 3.07902 16.5049 3 16.29 3ZM8.19002 1.5H9.81002C10.3124 1.50057 10.8024 1.64503 11.2127 1.91358C11.6229 2.18213 11.9334 2.56162 12.1015 3H5.89853C6.06667 2.56162 6.37716 2.18213 6.78742 1.91358C7.19768 1.64503 7.6876 1.50057 8.19002 1.5ZM13.86 14.25C13.86 14.8468 13.604 15.4191 13.1483 15.841C12.6925 16.2629 12.0745 16.5 11.43 16.5H6.57002C5.92555 16.5 5.30747 16.2629 4.85175 15.841C4.39604 15.4191 4.14002 14.8468 4.14002 14.25V4.5H13.86V14.25ZM7.38007 13.4999C7.59489 13.4999 7.80092 13.4209 7.95282 13.2802C8.10472 13.1396 8.19007 12.9488 8.19007 12.7499V8.24992C8.19007 8.05101 8.10472 7.86025 7.95282 7.7196C7.80092 7.57894 7.59489 7.49992 7.38007 7.49992C7.16524 7.49992 6.95921 7.57894 6.80731 7.7196C6.65541 7.86025 6.57007 8.05101 6.57007 8.24992V12.7499C6.57007 12.9488 6.65541 13.1396 6.80731 13.2802C6.95921 13.4209 7.16524 13.4999 7.38007 13.4999ZM11.1928 13.2802C11.0409 13.4209 10.8349 13.4999 10.62 13.4999C10.4052 13.4999 10.1992 13.4209 10.0473 13.2802C9.89534 13.1396 9.81002 12.9488 9.81002 12.7499V8.24992C9.81002 8.05101 9.89534 7.86025 10.0473 7.7196C10.1992 7.57894 10.4052 7.49992 10.62 7.49992C10.8349 7.49992 11.0409 7.57894 11.1928 7.7196C11.3447 7.86025 11.43 8.05101 11.43 8.24992V12.7499C11.43 12.9488 11.3447 13.1396 11.1928 13.2802Z" fill="#EB5757"/>
                            </svg>
                        </div>
                        </td>
                         </template>
                        
                    </tr>
                    <tr class="integration-tabs-created-tasks__container-table-tr integration-tabs-created-tasks__container-table-tr_height" v-for="(channel, inx) in amo.id" :key="inx">
                        <template v-if="allChanels.find(i=>i.hasOwnProperty('whatsapp_id'))&&allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id)">
                            <td class="integration-tabs-created-tasks__container-table-channel" >
                                <img src="../../../../assets/redesign-whatsapp.svg">
                                {{allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).name}}
                         
                            </td>
                            <td class="integration-tabs-created-tasks__container-table-status"
                           
                            ><div :class="{'integration-tabs-created-tasks__container-table-status_active':allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).status=='Активен',
                            'integration-tabs-created-tasks__container-table-status_no-active':allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).status=='Не активирован',
                            'integration-tabs-created-tasks__container-table-status_problems':allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).status=='Проблемы с  подключением к телефону',
                             'integration-tabs-created-tasks__container-table-status_disabled':allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).status=='Недействительная сессия',
                             'integration-tabs-created-tasks__container-table-status_off':allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).status=='Отключен'
                            }">{{allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).status}}</div>
                            </td>
                            <td class="integration-tabs-created-tasks__container-table-action">
                            <div @click="createdTasksEditActiveated(channel.id, 'whatsapp')" >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="settings-integrations-tasks__edit">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.7197 6.95391C16.8603 6.81326 17.0511 6.73424 17.25 6.73424C17.4489 6.73424 17.6397 6.81326 17.7803 6.95391C17.921 7.09457 18 7.28533 18 7.48424V12.2572C18.0012 12.7499 17.9047 13.2378 17.7161 13.6929C17.5275 14.148 17.2506 14.5611 16.9012 14.9085L14.9092 16.902C14.5617 17.2513 14.1484 17.5281 13.6932 17.7166C13.238 17.9051 12.7499 18.0014 12.2572 18H3.75C2.7558 17.9988 1.80267 17.6033 1.09966 16.9003C0.396661 16.1973 0.00119089 15.2442 0 14.25V3.75C0.00119089 2.7558 0.396661 1.80267 1.09966 1.09966C1.80267 0.396661 2.7558 0.00119089 3.75 0H10.5315C10.7304 0 10.9212 0.0790176 11.0618 0.21967C11.2025 0.360322 11.2815 0.551087 11.2815 0.749999C11.2815 0.948912 11.2025 1.13968 11.0618 1.28033C10.9212 1.42098 10.7304 1.5 10.5315 1.5H3.75C3.15326 1.5 2.58097 1.73705 2.15901 2.15901C1.73705 2.58096 1.5 3.15326 1.5 3.75V14.25C1.5 14.8467 1.73705 15.419 2.15901 15.841C2.58097 16.2629 3.15326 16.5 3.75 16.5H11.25V13.5C11.25 12.9033 11.487 12.331 11.909 11.909C12.331 11.487 12.9033 11.25 13.5 11.25H16.5V7.48424C16.5 7.28533 16.579 7.09457 16.7197 6.95391ZM12.75 16.4415C13.166 16.3504 13.5473 16.1422 13.8487 15.8415L15.8437 13.848C16.143 13.5457 16.351 13.1651 16.4437 12.75H13.5C13.3011 12.75 13.1103 12.829 12.9697 12.9697C12.829 13.1103 12.75 13.3011 12.75 13.5V16.4415ZM4.84655 9.84191L13.9905 0.69792C14.4363 0.27184 15.0292 0.0340576 15.6458 0.0340576C16.2624 0.0340576 16.8553 0.27184 17.301 0.69792C17.7393 1.13729 17.9855 1.73256 17.9855 2.35317C17.9855 2.97377 17.7393 3.56904 17.301 4.00842L8.15705 13.1524C7.80969 13.5017 7.39651 13.7785 6.94142 13.967C6.48633 14.1555 5.99837 14.2518 5.5058 14.2504H4.49855C4.29964 14.2504 4.10887 14.1714 3.96822 14.0307C3.82757 13.8901 3.74855 13.6993 3.74855 13.5004V12.4932C3.74716 12.0006 3.84349 11.5126 4.03196 11.0575C4.22043 10.6025 4.49731 10.1893 4.84655 9.84191ZM7.09655 12.0919L16.2405 2.94792C16.398 2.79003 16.4864 2.57615 16.4864 2.35317C16.4864 2.13019 16.398 1.9163 16.2405 1.75842C16.0804 1.60539 15.8673 1.51999 15.6458 1.51999C15.4243 1.51999 15.2112 1.60539 15.051 1.75842L5.90705 10.9024C5.48672 11.3253 5.25011 11.8969 5.24855 12.4932V12.7504H5.5058C6.10205 12.7488 6.67364 12.5122 7.09655 12.0919Z" fill="#9797BB"/>
                        </svg>
                        </div>
                        <div @click="deleteInput()" > 
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="settings-integrations-tasks__delete">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.29 3H13.779C13.591 2.15356 13.0936 1.39301 12.3706 0.846538C11.6476 0.300067 10.7433 0.00109089 9.81002 0H8.19002C7.25674 0.00109089 6.3524 0.300067 5.62941 0.846538C4.90643 1.39301 4.40903 2.15356 4.22102 3H1.71002C1.4952 3 1.28918 3.07902 1.13726 3.21967C0.985362 3.36032 0.900024 3.55108 0.900024 3.75C0.900024 3.94891 0.985362 4.13968 1.13726 4.28033C1.28918 4.42098 1.4952 4.5 1.71002 4.5H2.52002V14.25C2.52131 15.2442 2.94842 16.1973 3.70766 16.9004C4.4669 17.6034 5.49629 17.9988 6.57002 18H11.43C12.5037 17.9988 13.5331 17.6034 14.2924 16.9004C15.0516 16.1973 15.4788 15.2442 15.48 14.25V4.5H16.29C16.5049 4.5 16.7109 4.42098 16.8628 4.28033C17.0147 4.13968 17.1 3.94891 17.1 3.75C17.1 3.55108 17.0147 3.36032 16.8628 3.21967C16.7109 3.07902 16.5049 3 16.29 3ZM8.19002 1.5H9.81002C10.3124 1.50057 10.8024 1.64503 11.2127 1.91358C11.6229 2.18213 11.9334 2.56162 12.1015 3H5.89853C6.06667 2.56162 6.37716 2.18213 6.78742 1.91358C7.19768 1.64503 7.6876 1.50057 8.19002 1.5ZM13.86 14.25C13.86 14.8468 13.604 15.4191 13.1483 15.841C12.6925 16.2629 12.0745 16.5 11.43 16.5H6.57002C5.92555 16.5 5.30747 16.2629 4.85175 15.841C4.39604 15.4191 4.14002 14.8468 4.14002 14.25V4.5H13.86V14.25ZM7.38007 13.4999C7.59489 13.4999 7.80092 13.4209 7.95282 13.2802C8.10472 13.1396 8.19007 12.9488 8.19007 12.7499V8.24992C8.19007 8.05101 8.10472 7.86025 7.95282 7.7196C7.80092 7.57894 7.59489 7.49992 7.38007 7.49992C7.16524 7.49992 6.95921 7.57894 6.80731 7.7196C6.65541 7.86025 6.57007 8.05101 6.57007 8.24992V12.7499C6.57007 12.9488 6.65541 13.1396 6.80731 13.2802C6.95921 13.4209 7.16524 13.4999 7.38007 13.4999ZM11.1928 13.2802C11.0409 13.4209 10.8349 13.4999 10.62 13.4999C10.4052 13.4999 10.1992 13.4209 10.0473 13.2802C9.89534 13.1396 9.81002 12.9488 9.81002 12.7499V8.24992C9.81002 8.05101 9.89534 7.86025 10.0473 7.7196C10.1992 7.57894 10.4052 7.49992 10.62 7.49992C10.8349 7.49992 11.0409 7.57894 11.1928 7.7196C11.3447 7.86025 11.43 8.05101 11.43 8.24992V12.7499C11.43 12.9488 11.3447 13.1396 11.1928 13.2802Z" fill="#EB5757"/>
                            </svg>
                        </div>
                        </td>
                        
                         </template>
                        <template v-else-if="allChanels.find(i=>i.hasOwnProperty('instagram_id'))&&allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id)">
                            <td class="integration-tabs-created-tasks__container-table-channel" >
                                <img src="../../../../assets/redesign-instagram.svg">
                                {{allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).login}}</td>
                            <td class="integration-tabs-created-tasks__container-table-status"> 
                                <div :class="{'integration-tabs-created-tasks__container-table-status_active':allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).status=='Активен',
                                'integration-tabs-created-tasks__container-table-status_no-active':allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).status=='Не активирован',
                                'integration-tabs-created-tasks__container-table-status_problems':allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).status=='Не удалось подключиться',
                                'integration-tabs-created-tasks__container-table-status_disabled':allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).status=='Двухфакторная аутентификация...',
                                'integration-tabs-created-tasks__container-table-status_off':allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).status=='Отключен'
                                }"> {{allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).status}}</div>
                            </td>
                            <td class="integration-tabs-created-tasks__container-table-action">
                            <div @click="createdTasksEditActiveated(channel.id, 'instagram')" >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="settings-integrations-tasks__edit pointer">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.7197 6.95391C16.8603 6.81326 17.0511 6.73424 17.25 6.73424C17.4489 6.73424 17.6397 6.81326 17.7803 6.95391C17.921 7.09457 18 7.28533 18 7.48424V12.2572C18.0012 12.7499 17.9047 13.2378 17.7161 13.6929C17.5275 14.148 17.2506 14.5611 16.9012 14.9085L14.9092 16.902C14.5617 17.2513 14.1484 17.5281 13.6932 17.7166C13.238 17.9051 12.7499 18.0014 12.2572 18H3.75C2.7558 17.9988 1.80267 17.6033 1.09966 16.9003C0.396661 16.1973 0.00119089 15.2442 0 14.25V3.75C0.00119089 2.7558 0.396661 1.80267 1.09966 1.09966C1.80267 0.396661 2.7558 0.00119089 3.75 0H10.5315C10.7304 0 10.9212 0.0790176 11.0618 0.21967C11.2025 0.360322 11.2815 0.551087 11.2815 0.749999C11.2815 0.948912 11.2025 1.13968 11.0618 1.28033C10.9212 1.42098 10.7304 1.5 10.5315 1.5H3.75C3.15326 1.5 2.58097 1.73705 2.15901 2.15901C1.73705 2.58096 1.5 3.15326 1.5 3.75V14.25C1.5 14.8467 1.73705 15.419 2.15901 15.841C2.58097 16.2629 3.15326 16.5 3.75 16.5H11.25V13.5C11.25 12.9033 11.487 12.331 11.909 11.909C12.331 11.487 12.9033 11.25 13.5 11.25H16.5V7.48424C16.5 7.28533 16.579 7.09457 16.7197 6.95391ZM12.75 16.4415C13.166 16.3504 13.5473 16.1422 13.8487 15.8415L15.8437 13.848C16.143 13.5457 16.351 13.1651 16.4437 12.75H13.5C13.3011 12.75 13.1103 12.829 12.9697 12.9697C12.829 13.1103 12.75 13.3011 12.75 13.5V16.4415ZM4.84655 9.84191L13.9905 0.69792C14.4363 0.27184 15.0292 0.0340576 15.6458 0.0340576C16.2624 0.0340576 16.8553 0.27184 17.301 0.69792C17.7393 1.13729 17.9855 1.73256 17.9855 2.35317C17.9855 2.97377 17.7393 3.56904 17.301 4.00842L8.15705 13.1524C7.80969 13.5017 7.39651 13.7785 6.94142 13.967C6.48633 14.1555 5.99837 14.2518 5.5058 14.2504H4.49855C4.29964 14.2504 4.10887 14.1714 3.96822 14.0307C3.82757 13.8901 3.74855 13.6993 3.74855 13.5004V12.4932C3.74716 12.0006 3.84349 11.5126 4.03196 11.0575C4.22043 10.6025 4.49731 10.1893 4.84655 9.84191ZM7.09655 12.0919L16.2405 2.94792C16.398 2.79003 16.4864 2.57615 16.4864 2.35317C16.4864 2.13019 16.398 1.9163 16.2405 1.75842C16.0804 1.60539 15.8673 1.51999 15.6458 1.51999C15.4243 1.51999 15.2112 1.60539 15.051 1.75842L5.90705 10.9024C5.48672 11.3253 5.25011 11.8969 5.24855 12.4932V12.7504H5.5058C6.10205 12.7488 6.67364 12.5122 7.09655 12.0919Z" fill="#9797BB"/>
                        </svg>
                        </div>
                        <div @click="deleteInput()" > 
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="settings-integrations-tasks__delete pointer">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.29 3H13.779C13.591 2.15356 13.0936 1.39301 12.3706 0.846538C11.6476 0.300067 10.7433 0.00109089 9.81002 0H8.19002C7.25674 0.00109089 6.3524 0.300067 5.62941 0.846538C4.90643 1.39301 4.40903 2.15356 4.22102 3H1.71002C1.4952 3 1.28918 3.07902 1.13726 3.21967C0.985362 3.36032 0.900024 3.55108 0.900024 3.75C0.900024 3.94891 0.985362 4.13968 1.13726 4.28033C1.28918 4.42098 1.4952 4.5 1.71002 4.5H2.52002V14.25C2.52131 15.2442 2.94842 16.1973 3.70766 16.9004C4.4669 17.6034 5.49629 17.9988 6.57002 18H11.43C12.5037 17.9988 13.5331 17.6034 14.2924 16.9004C15.0516 16.1973 15.4788 15.2442 15.48 14.25V4.5H16.29C16.5049 4.5 16.7109 4.42098 16.8628 4.28033C17.0147 4.13968 17.1 3.94891 17.1 3.75C17.1 3.55108 17.0147 3.36032 16.8628 3.21967C16.7109 3.07902 16.5049 3 16.29 3ZM8.19002 1.5H9.81002C10.3124 1.50057 10.8024 1.64503 11.2127 1.91358C11.6229 2.18213 11.9334 2.56162 12.1015 3H5.89853C6.06667 2.56162 6.37716 2.18213 6.78742 1.91358C7.19768 1.64503 7.6876 1.50057 8.19002 1.5ZM13.86 14.25C13.86 14.8468 13.604 15.4191 13.1483 15.841C12.6925 16.2629 12.0745 16.5 11.43 16.5H6.57002C5.92555 16.5 5.30747 16.2629 4.85175 15.841C4.39604 15.4191 4.14002 14.8468 4.14002 14.25V4.5H13.86V14.25ZM7.38007 13.4999C7.59489 13.4999 7.80092 13.4209 7.95282 13.2802C8.10472 13.1396 8.19007 12.9488 8.19007 12.7499V8.24992C8.19007 8.05101 8.10472 7.86025 7.95282 7.7196C7.80092 7.57894 7.59489 7.49992 7.38007 7.49992C7.16524 7.49992 6.95921 7.57894 6.80731 7.7196C6.65541 7.86025 6.57007 8.05101 6.57007 8.24992V12.7499C6.57007 12.9488 6.65541 13.1396 6.80731 13.2802C6.95921 13.4209 7.16524 13.4999 7.38007 13.4999ZM11.1928 13.2802C11.0409 13.4209 10.8349 13.4999 10.62 13.4999C10.4052 13.4999 10.1992 13.4209 10.0473 13.2802C9.89534 13.1396 9.81002 12.9488 9.81002 12.7499V8.24992C9.81002 8.05101 9.89534 7.86025 10.0473 7.7196C10.1992 7.57894 10.4052 7.49992 10.62 7.49992C10.8349 7.49992 11.0409 7.57894 11.1928 7.7196C11.3447 7.86025 11.43 8.05101 11.43 8.24992V12.7499C11.43 12.9488 11.3447 13.1396 11.1928 13.2802Z" fill="#EB5757"/>
                            </svg>
                        </div>
                        </td>
                         </template>
                        
                    </tr>
                    <tr class="integration-tabs-created-tasks__container-table-tr integration-tabs-created-tasks__container-table-tr_height" v-for="(channel, inx) in amo.id" :key="inx">
                        <template v-if="allChanels.find(i=>i.hasOwnProperty('whatsapp_id'))&&allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id)">
                            <td class="integration-tabs-created-tasks__container-table-channel" >
                                <img src="../../../../assets/redesign-whatsapp.svg">
                                {{allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).name}}
                         
                            </td>
                            <td class="integration-tabs-created-tasks__container-table-status"
                           
                            ><div :class="{'integration-tabs-created-tasks__container-table-status_active':allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).status=='Активен',
                            'integration-tabs-created-tasks__container-table-status_no-active':allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).status=='Не активирован',
                            'integration-tabs-created-tasks__container-table-status_problems':allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).status=='Проблемы с  подключением к телефону',
                             'integration-tabs-created-tasks__container-table-status_disabled':allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).status=='Недействительная сессия',
                             'integration-tabs-created-tasks__container-table-status_off':allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).status=='Отключен'
                            }">{{allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).status}}</div>
                            </td>
                            <td class="integration-tabs-created-tasks__container-table-action">
                            <div @click="createdTasksEditActiveated(channel.id, 'whatsapp')" >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="settings-integrations-tasks__edit">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.7197 6.95391C16.8603 6.81326 17.0511 6.73424 17.25 6.73424C17.4489 6.73424 17.6397 6.81326 17.7803 6.95391C17.921 7.09457 18 7.28533 18 7.48424V12.2572C18.0012 12.7499 17.9047 13.2378 17.7161 13.6929C17.5275 14.148 17.2506 14.5611 16.9012 14.9085L14.9092 16.902C14.5617 17.2513 14.1484 17.5281 13.6932 17.7166C13.238 17.9051 12.7499 18.0014 12.2572 18H3.75C2.7558 17.9988 1.80267 17.6033 1.09966 16.9003C0.396661 16.1973 0.00119089 15.2442 0 14.25V3.75C0.00119089 2.7558 0.396661 1.80267 1.09966 1.09966C1.80267 0.396661 2.7558 0.00119089 3.75 0H10.5315C10.7304 0 10.9212 0.0790176 11.0618 0.21967C11.2025 0.360322 11.2815 0.551087 11.2815 0.749999C11.2815 0.948912 11.2025 1.13968 11.0618 1.28033C10.9212 1.42098 10.7304 1.5 10.5315 1.5H3.75C3.15326 1.5 2.58097 1.73705 2.15901 2.15901C1.73705 2.58096 1.5 3.15326 1.5 3.75V14.25C1.5 14.8467 1.73705 15.419 2.15901 15.841C2.58097 16.2629 3.15326 16.5 3.75 16.5H11.25V13.5C11.25 12.9033 11.487 12.331 11.909 11.909C12.331 11.487 12.9033 11.25 13.5 11.25H16.5V7.48424C16.5 7.28533 16.579 7.09457 16.7197 6.95391ZM12.75 16.4415C13.166 16.3504 13.5473 16.1422 13.8487 15.8415L15.8437 13.848C16.143 13.5457 16.351 13.1651 16.4437 12.75H13.5C13.3011 12.75 13.1103 12.829 12.9697 12.9697C12.829 13.1103 12.75 13.3011 12.75 13.5V16.4415ZM4.84655 9.84191L13.9905 0.69792C14.4363 0.27184 15.0292 0.0340576 15.6458 0.0340576C16.2624 0.0340576 16.8553 0.27184 17.301 0.69792C17.7393 1.13729 17.9855 1.73256 17.9855 2.35317C17.9855 2.97377 17.7393 3.56904 17.301 4.00842L8.15705 13.1524C7.80969 13.5017 7.39651 13.7785 6.94142 13.967C6.48633 14.1555 5.99837 14.2518 5.5058 14.2504H4.49855C4.29964 14.2504 4.10887 14.1714 3.96822 14.0307C3.82757 13.8901 3.74855 13.6993 3.74855 13.5004V12.4932C3.74716 12.0006 3.84349 11.5126 4.03196 11.0575C4.22043 10.6025 4.49731 10.1893 4.84655 9.84191ZM7.09655 12.0919L16.2405 2.94792C16.398 2.79003 16.4864 2.57615 16.4864 2.35317C16.4864 2.13019 16.398 1.9163 16.2405 1.75842C16.0804 1.60539 15.8673 1.51999 15.6458 1.51999C15.4243 1.51999 15.2112 1.60539 15.051 1.75842L5.90705 10.9024C5.48672 11.3253 5.25011 11.8969 5.24855 12.4932V12.7504H5.5058C6.10205 12.7488 6.67364 12.5122 7.09655 12.0919Z" fill="#9797BB"/>
                        </svg>
                        </div>
                        <div @click="deleteInput()" > 
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="settings-integrations-tasks__delete">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.29 3H13.779C13.591 2.15356 13.0936 1.39301 12.3706 0.846538C11.6476 0.300067 10.7433 0.00109089 9.81002 0H8.19002C7.25674 0.00109089 6.3524 0.300067 5.62941 0.846538C4.90643 1.39301 4.40903 2.15356 4.22102 3H1.71002C1.4952 3 1.28918 3.07902 1.13726 3.21967C0.985362 3.36032 0.900024 3.55108 0.900024 3.75C0.900024 3.94891 0.985362 4.13968 1.13726 4.28033C1.28918 4.42098 1.4952 4.5 1.71002 4.5H2.52002V14.25C2.52131 15.2442 2.94842 16.1973 3.70766 16.9004C4.4669 17.6034 5.49629 17.9988 6.57002 18H11.43C12.5037 17.9988 13.5331 17.6034 14.2924 16.9004C15.0516 16.1973 15.4788 15.2442 15.48 14.25V4.5H16.29C16.5049 4.5 16.7109 4.42098 16.8628 4.28033C17.0147 4.13968 17.1 3.94891 17.1 3.75C17.1 3.55108 17.0147 3.36032 16.8628 3.21967C16.7109 3.07902 16.5049 3 16.29 3ZM8.19002 1.5H9.81002C10.3124 1.50057 10.8024 1.64503 11.2127 1.91358C11.6229 2.18213 11.9334 2.56162 12.1015 3H5.89853C6.06667 2.56162 6.37716 2.18213 6.78742 1.91358C7.19768 1.64503 7.6876 1.50057 8.19002 1.5ZM13.86 14.25C13.86 14.8468 13.604 15.4191 13.1483 15.841C12.6925 16.2629 12.0745 16.5 11.43 16.5H6.57002C5.92555 16.5 5.30747 16.2629 4.85175 15.841C4.39604 15.4191 4.14002 14.8468 4.14002 14.25V4.5H13.86V14.25ZM7.38007 13.4999C7.59489 13.4999 7.80092 13.4209 7.95282 13.2802C8.10472 13.1396 8.19007 12.9488 8.19007 12.7499V8.24992C8.19007 8.05101 8.10472 7.86025 7.95282 7.7196C7.80092 7.57894 7.59489 7.49992 7.38007 7.49992C7.16524 7.49992 6.95921 7.57894 6.80731 7.7196C6.65541 7.86025 6.57007 8.05101 6.57007 8.24992V12.7499C6.57007 12.9488 6.65541 13.1396 6.80731 13.2802C6.95921 13.4209 7.16524 13.4999 7.38007 13.4999ZM11.1928 13.2802C11.0409 13.4209 10.8349 13.4999 10.62 13.4999C10.4052 13.4999 10.1992 13.4209 10.0473 13.2802C9.89534 13.1396 9.81002 12.9488 9.81002 12.7499V8.24992C9.81002 8.05101 9.89534 7.86025 10.0473 7.7196C10.1992 7.57894 10.4052 7.49992 10.62 7.49992C10.8349 7.49992 11.0409 7.57894 11.1928 7.7196C11.3447 7.86025 11.43 8.05101 11.43 8.24992V12.7499C11.43 12.9488 11.3447 13.1396 11.1928 13.2802Z" fill="#EB5757"/>
                            </svg>
                        </div>
                        </td>
                        
                         </template>
                        <template v-else-if="allChanels.find(i=>i.hasOwnProperty('instagram_id'))&&allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id)">
                            <td class="integration-tabs-created-tasks__container-table-channel" >
                                <img src="../../../../assets/redesign-instagram.svg">
                                {{allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).login}}</td>
                            <td class="integration-tabs-created-tasks__container-table-status"> 
                                <div :class="{'integration-tabs-created-tasks__container-table-status_active':allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).status=='Активен',
                                'integration-tabs-created-tasks__container-table-status_no-active':allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).status=='Не активирован',
                                'integration-tabs-created-tasks__container-table-status_problems':allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).status=='Не удалось подключиться',
                                'integration-tabs-created-tasks__container-table-status_disabled':allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).status=='Двухфакторная аутентификация...',
                                'integration-tabs-created-tasks__container-table-status_off':allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).status=='Отключен'
                                }"> {{allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).status}}</div>
                            </td>
                            <td class="integration-tabs-created-tasks__container-table-action">
                            <div @click="createdTasksEditActiveated(channel.id, 'instagram')" >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="settings-integrations-tasks__edit pointer">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.7197 6.95391C16.8603 6.81326 17.0511 6.73424 17.25 6.73424C17.4489 6.73424 17.6397 6.81326 17.7803 6.95391C17.921 7.09457 18 7.28533 18 7.48424V12.2572C18.0012 12.7499 17.9047 13.2378 17.7161 13.6929C17.5275 14.148 17.2506 14.5611 16.9012 14.9085L14.9092 16.902C14.5617 17.2513 14.1484 17.5281 13.6932 17.7166C13.238 17.9051 12.7499 18.0014 12.2572 18H3.75C2.7558 17.9988 1.80267 17.6033 1.09966 16.9003C0.396661 16.1973 0.00119089 15.2442 0 14.25V3.75C0.00119089 2.7558 0.396661 1.80267 1.09966 1.09966C1.80267 0.396661 2.7558 0.00119089 3.75 0H10.5315C10.7304 0 10.9212 0.0790176 11.0618 0.21967C11.2025 0.360322 11.2815 0.551087 11.2815 0.749999C11.2815 0.948912 11.2025 1.13968 11.0618 1.28033C10.9212 1.42098 10.7304 1.5 10.5315 1.5H3.75C3.15326 1.5 2.58097 1.73705 2.15901 2.15901C1.73705 2.58096 1.5 3.15326 1.5 3.75V14.25C1.5 14.8467 1.73705 15.419 2.15901 15.841C2.58097 16.2629 3.15326 16.5 3.75 16.5H11.25V13.5C11.25 12.9033 11.487 12.331 11.909 11.909C12.331 11.487 12.9033 11.25 13.5 11.25H16.5V7.48424C16.5 7.28533 16.579 7.09457 16.7197 6.95391ZM12.75 16.4415C13.166 16.3504 13.5473 16.1422 13.8487 15.8415L15.8437 13.848C16.143 13.5457 16.351 13.1651 16.4437 12.75H13.5C13.3011 12.75 13.1103 12.829 12.9697 12.9697C12.829 13.1103 12.75 13.3011 12.75 13.5V16.4415ZM4.84655 9.84191L13.9905 0.69792C14.4363 0.27184 15.0292 0.0340576 15.6458 0.0340576C16.2624 0.0340576 16.8553 0.27184 17.301 0.69792C17.7393 1.13729 17.9855 1.73256 17.9855 2.35317C17.9855 2.97377 17.7393 3.56904 17.301 4.00842L8.15705 13.1524C7.80969 13.5017 7.39651 13.7785 6.94142 13.967C6.48633 14.1555 5.99837 14.2518 5.5058 14.2504H4.49855C4.29964 14.2504 4.10887 14.1714 3.96822 14.0307C3.82757 13.8901 3.74855 13.6993 3.74855 13.5004V12.4932C3.74716 12.0006 3.84349 11.5126 4.03196 11.0575C4.22043 10.6025 4.49731 10.1893 4.84655 9.84191ZM7.09655 12.0919L16.2405 2.94792C16.398 2.79003 16.4864 2.57615 16.4864 2.35317C16.4864 2.13019 16.398 1.9163 16.2405 1.75842C16.0804 1.60539 15.8673 1.51999 15.6458 1.51999C15.4243 1.51999 15.2112 1.60539 15.051 1.75842L5.90705 10.9024C5.48672 11.3253 5.25011 11.8969 5.24855 12.4932V12.7504H5.5058C6.10205 12.7488 6.67364 12.5122 7.09655 12.0919Z" fill="#9797BB"/>
                        </svg>
                        </div>
                        <div @click="deleteInput()" > 
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="settings-integrations-tasks__delete pointer">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.29 3H13.779C13.591 2.15356 13.0936 1.39301 12.3706 0.846538C11.6476 0.300067 10.7433 0.00109089 9.81002 0H8.19002C7.25674 0.00109089 6.3524 0.300067 5.62941 0.846538C4.90643 1.39301 4.40903 2.15356 4.22102 3H1.71002C1.4952 3 1.28918 3.07902 1.13726 3.21967C0.985362 3.36032 0.900024 3.55108 0.900024 3.75C0.900024 3.94891 0.985362 4.13968 1.13726 4.28033C1.28918 4.42098 1.4952 4.5 1.71002 4.5H2.52002V14.25C2.52131 15.2442 2.94842 16.1973 3.70766 16.9004C4.4669 17.6034 5.49629 17.9988 6.57002 18H11.43C12.5037 17.9988 13.5331 17.6034 14.2924 16.9004C15.0516 16.1973 15.4788 15.2442 15.48 14.25V4.5H16.29C16.5049 4.5 16.7109 4.42098 16.8628 4.28033C17.0147 4.13968 17.1 3.94891 17.1 3.75C17.1 3.55108 17.0147 3.36032 16.8628 3.21967C16.7109 3.07902 16.5049 3 16.29 3ZM8.19002 1.5H9.81002C10.3124 1.50057 10.8024 1.64503 11.2127 1.91358C11.6229 2.18213 11.9334 2.56162 12.1015 3H5.89853C6.06667 2.56162 6.37716 2.18213 6.78742 1.91358C7.19768 1.64503 7.6876 1.50057 8.19002 1.5ZM13.86 14.25C13.86 14.8468 13.604 15.4191 13.1483 15.841C12.6925 16.2629 12.0745 16.5 11.43 16.5H6.57002C5.92555 16.5 5.30747 16.2629 4.85175 15.841C4.39604 15.4191 4.14002 14.8468 4.14002 14.25V4.5H13.86V14.25ZM7.38007 13.4999C7.59489 13.4999 7.80092 13.4209 7.95282 13.2802C8.10472 13.1396 8.19007 12.9488 8.19007 12.7499V8.24992C8.19007 8.05101 8.10472 7.86025 7.95282 7.7196C7.80092 7.57894 7.59489 7.49992 7.38007 7.49992C7.16524 7.49992 6.95921 7.57894 6.80731 7.7196C6.65541 7.86025 6.57007 8.05101 6.57007 8.24992V12.7499C6.57007 12.9488 6.65541 13.1396 6.80731 13.2802C6.95921 13.4209 7.16524 13.4999 7.38007 13.4999ZM11.1928 13.2802C11.0409 13.4209 10.8349 13.4999 10.62 13.4999C10.4052 13.4999 10.1992 13.4209 10.0473 13.2802C9.89534 13.1396 9.81002 12.9488 9.81002 12.7499V8.24992C9.81002 8.05101 9.89534 7.86025 10.0473 7.7196C10.1992 7.57894 10.4052 7.49992 10.62 7.49992C10.8349 7.49992 11.0409 7.57894 11.1928 7.7196C11.3447 7.86025 11.43 8.05101 11.43 8.24992V12.7499C11.43 12.9488 11.3447 13.1396 11.1928 13.2802Z" fill="#EB5757"/>
                            </svg>
                        </div>
                        </td>
                         </template>
                        
                    </tr>
                    <tr class="integration-tabs-created-tasks__container-table-tr integration-tabs-created-tasks__container-table-tr_height" v-for="(channel, inx) in amo.id" :key="inx">
                        <template v-if="allChanels.find(i=>i.hasOwnProperty('whatsapp_id'))&&allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id)">
                            <td class="integration-tabs-created-tasks__container-table-channel" >
                                <img src="../../../../assets/redesign-whatsapp.svg">
                                {{allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).name}}
                         
                            </td>
                            <td class="integration-tabs-created-tasks__container-table-status"
                           
                            ><div :class="{'integration-tabs-created-tasks__container-table-status_active':allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).status=='Активен',
                            'integration-tabs-created-tasks__container-table-status_no-active':allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).status=='Не активирован',
                            'integration-tabs-created-tasks__container-table-status_problems':allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).status=='Проблемы с  подключением к телефону',
                             'integration-tabs-created-tasks__container-table-status_disabled':allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).status=='Недействительная сессия',
                             'integration-tabs-created-tasks__container-table-status_off':allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).status=='Отключен'
                            }">{{allChanels.find(i=>i.hasOwnProperty('whatsapp_id')&&channel.id==i.whatsapp_id).status}}</div>
                            </td>
                            <td class="integration-tabs-created-tasks__container-table-action">
                            <div @click="createdTasksEditActiveated(channel.id, 'whatsapp')" >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="settings-integrations-tasks__edit">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.7197 6.95391C16.8603 6.81326 17.0511 6.73424 17.25 6.73424C17.4489 6.73424 17.6397 6.81326 17.7803 6.95391C17.921 7.09457 18 7.28533 18 7.48424V12.2572C18.0012 12.7499 17.9047 13.2378 17.7161 13.6929C17.5275 14.148 17.2506 14.5611 16.9012 14.9085L14.9092 16.902C14.5617 17.2513 14.1484 17.5281 13.6932 17.7166C13.238 17.9051 12.7499 18.0014 12.2572 18H3.75C2.7558 17.9988 1.80267 17.6033 1.09966 16.9003C0.396661 16.1973 0.00119089 15.2442 0 14.25V3.75C0.00119089 2.7558 0.396661 1.80267 1.09966 1.09966C1.80267 0.396661 2.7558 0.00119089 3.75 0H10.5315C10.7304 0 10.9212 0.0790176 11.0618 0.21967C11.2025 0.360322 11.2815 0.551087 11.2815 0.749999C11.2815 0.948912 11.2025 1.13968 11.0618 1.28033C10.9212 1.42098 10.7304 1.5 10.5315 1.5H3.75C3.15326 1.5 2.58097 1.73705 2.15901 2.15901C1.73705 2.58096 1.5 3.15326 1.5 3.75V14.25C1.5 14.8467 1.73705 15.419 2.15901 15.841C2.58097 16.2629 3.15326 16.5 3.75 16.5H11.25V13.5C11.25 12.9033 11.487 12.331 11.909 11.909C12.331 11.487 12.9033 11.25 13.5 11.25H16.5V7.48424C16.5 7.28533 16.579 7.09457 16.7197 6.95391ZM12.75 16.4415C13.166 16.3504 13.5473 16.1422 13.8487 15.8415L15.8437 13.848C16.143 13.5457 16.351 13.1651 16.4437 12.75H13.5C13.3011 12.75 13.1103 12.829 12.9697 12.9697C12.829 13.1103 12.75 13.3011 12.75 13.5V16.4415ZM4.84655 9.84191L13.9905 0.69792C14.4363 0.27184 15.0292 0.0340576 15.6458 0.0340576C16.2624 0.0340576 16.8553 0.27184 17.301 0.69792C17.7393 1.13729 17.9855 1.73256 17.9855 2.35317C17.9855 2.97377 17.7393 3.56904 17.301 4.00842L8.15705 13.1524C7.80969 13.5017 7.39651 13.7785 6.94142 13.967C6.48633 14.1555 5.99837 14.2518 5.5058 14.2504H4.49855C4.29964 14.2504 4.10887 14.1714 3.96822 14.0307C3.82757 13.8901 3.74855 13.6993 3.74855 13.5004V12.4932C3.74716 12.0006 3.84349 11.5126 4.03196 11.0575C4.22043 10.6025 4.49731 10.1893 4.84655 9.84191ZM7.09655 12.0919L16.2405 2.94792C16.398 2.79003 16.4864 2.57615 16.4864 2.35317C16.4864 2.13019 16.398 1.9163 16.2405 1.75842C16.0804 1.60539 15.8673 1.51999 15.6458 1.51999C15.4243 1.51999 15.2112 1.60539 15.051 1.75842L5.90705 10.9024C5.48672 11.3253 5.25011 11.8969 5.24855 12.4932V12.7504H5.5058C6.10205 12.7488 6.67364 12.5122 7.09655 12.0919Z" fill="#9797BB"/>
                        </svg>
                        </div>
                        <div @click="deleteInput()" > 
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="settings-integrations-tasks__delete">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.29 3H13.779C13.591 2.15356 13.0936 1.39301 12.3706 0.846538C11.6476 0.300067 10.7433 0.00109089 9.81002 0H8.19002C7.25674 0.00109089 6.3524 0.300067 5.62941 0.846538C4.90643 1.39301 4.40903 2.15356 4.22102 3H1.71002C1.4952 3 1.28918 3.07902 1.13726 3.21967C0.985362 3.36032 0.900024 3.55108 0.900024 3.75C0.900024 3.94891 0.985362 4.13968 1.13726 4.28033C1.28918 4.42098 1.4952 4.5 1.71002 4.5H2.52002V14.25C2.52131 15.2442 2.94842 16.1973 3.70766 16.9004C4.4669 17.6034 5.49629 17.9988 6.57002 18H11.43C12.5037 17.9988 13.5331 17.6034 14.2924 16.9004C15.0516 16.1973 15.4788 15.2442 15.48 14.25V4.5H16.29C16.5049 4.5 16.7109 4.42098 16.8628 4.28033C17.0147 4.13968 17.1 3.94891 17.1 3.75C17.1 3.55108 17.0147 3.36032 16.8628 3.21967C16.7109 3.07902 16.5049 3 16.29 3ZM8.19002 1.5H9.81002C10.3124 1.50057 10.8024 1.64503 11.2127 1.91358C11.6229 2.18213 11.9334 2.56162 12.1015 3H5.89853C6.06667 2.56162 6.37716 2.18213 6.78742 1.91358C7.19768 1.64503 7.6876 1.50057 8.19002 1.5ZM13.86 14.25C13.86 14.8468 13.604 15.4191 13.1483 15.841C12.6925 16.2629 12.0745 16.5 11.43 16.5H6.57002C5.92555 16.5 5.30747 16.2629 4.85175 15.841C4.39604 15.4191 4.14002 14.8468 4.14002 14.25V4.5H13.86V14.25ZM7.38007 13.4999C7.59489 13.4999 7.80092 13.4209 7.95282 13.2802C8.10472 13.1396 8.19007 12.9488 8.19007 12.7499V8.24992C8.19007 8.05101 8.10472 7.86025 7.95282 7.7196C7.80092 7.57894 7.59489 7.49992 7.38007 7.49992C7.16524 7.49992 6.95921 7.57894 6.80731 7.7196C6.65541 7.86025 6.57007 8.05101 6.57007 8.24992V12.7499C6.57007 12.9488 6.65541 13.1396 6.80731 13.2802C6.95921 13.4209 7.16524 13.4999 7.38007 13.4999ZM11.1928 13.2802C11.0409 13.4209 10.8349 13.4999 10.62 13.4999C10.4052 13.4999 10.1992 13.4209 10.0473 13.2802C9.89534 13.1396 9.81002 12.9488 9.81002 12.7499V8.24992C9.81002 8.05101 9.89534 7.86025 10.0473 7.7196C10.1992 7.57894 10.4052 7.49992 10.62 7.49992C10.8349 7.49992 11.0409 7.57894 11.1928 7.7196C11.3447 7.86025 11.43 8.05101 11.43 8.24992V12.7499C11.43 12.9488 11.3447 13.1396 11.1928 13.2802Z" fill="#EB5757"/>
                            </svg>
                        </div>
                        </td>
                        
                         </template>
                        <template v-else-if="allChanels.find(i=>i.hasOwnProperty('instagram_id'))&&allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id)">
                            <td class="integration-tabs-created-tasks__container-table-channel" >
                                <img src="../../../../assets/redesign-instagram.svg">
                                {{allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).login}}</td>
                            <td class="integration-tabs-created-tasks__container-table-status"> 
                                <div :class="{'integration-tabs-created-tasks__container-table-status_active':allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).status=='Активен',
                                'integration-tabs-created-tasks__container-table-status_no-active':allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).status=='Не активирован',
                                'integration-tabs-created-tasks__container-table-status_problems':allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).status=='Не удалось подключиться',
                                'integration-tabs-created-tasks__container-table-status_disabled':allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).status=='Двухфакторная аутентификация...',
                                'integration-tabs-created-tasks__container-table-status_off':allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).status=='Отключен'
                                }"> {{allChanels.find(i=>i.hasOwnProperty('instagram_id')&&channel.id==i.whatsapp_id).status}}</div>
                            </td>
                            <td class="integration-tabs-created-tasks__container-table-action">
                            <div @click="createdTasksEditActiveated(channel.id, 'instagram')" >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="settings-integrations-tasks__edit pointer">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.7197 6.95391C16.8603 6.81326 17.0511 6.73424 17.25 6.73424C17.4489 6.73424 17.6397 6.81326 17.7803 6.95391C17.921 7.09457 18 7.28533 18 7.48424V12.2572C18.0012 12.7499 17.9047 13.2378 17.7161 13.6929C17.5275 14.148 17.2506 14.5611 16.9012 14.9085L14.9092 16.902C14.5617 17.2513 14.1484 17.5281 13.6932 17.7166C13.238 17.9051 12.7499 18.0014 12.2572 18H3.75C2.7558 17.9988 1.80267 17.6033 1.09966 16.9003C0.396661 16.1973 0.00119089 15.2442 0 14.25V3.75C0.00119089 2.7558 0.396661 1.80267 1.09966 1.09966C1.80267 0.396661 2.7558 0.00119089 3.75 0H10.5315C10.7304 0 10.9212 0.0790176 11.0618 0.21967C11.2025 0.360322 11.2815 0.551087 11.2815 0.749999C11.2815 0.948912 11.2025 1.13968 11.0618 1.28033C10.9212 1.42098 10.7304 1.5 10.5315 1.5H3.75C3.15326 1.5 2.58097 1.73705 2.15901 2.15901C1.73705 2.58096 1.5 3.15326 1.5 3.75V14.25C1.5 14.8467 1.73705 15.419 2.15901 15.841C2.58097 16.2629 3.15326 16.5 3.75 16.5H11.25V13.5C11.25 12.9033 11.487 12.331 11.909 11.909C12.331 11.487 12.9033 11.25 13.5 11.25H16.5V7.48424C16.5 7.28533 16.579 7.09457 16.7197 6.95391ZM12.75 16.4415C13.166 16.3504 13.5473 16.1422 13.8487 15.8415L15.8437 13.848C16.143 13.5457 16.351 13.1651 16.4437 12.75H13.5C13.3011 12.75 13.1103 12.829 12.9697 12.9697C12.829 13.1103 12.75 13.3011 12.75 13.5V16.4415ZM4.84655 9.84191L13.9905 0.69792C14.4363 0.27184 15.0292 0.0340576 15.6458 0.0340576C16.2624 0.0340576 16.8553 0.27184 17.301 0.69792C17.7393 1.13729 17.9855 1.73256 17.9855 2.35317C17.9855 2.97377 17.7393 3.56904 17.301 4.00842L8.15705 13.1524C7.80969 13.5017 7.39651 13.7785 6.94142 13.967C6.48633 14.1555 5.99837 14.2518 5.5058 14.2504H4.49855C4.29964 14.2504 4.10887 14.1714 3.96822 14.0307C3.82757 13.8901 3.74855 13.6993 3.74855 13.5004V12.4932C3.74716 12.0006 3.84349 11.5126 4.03196 11.0575C4.22043 10.6025 4.49731 10.1893 4.84655 9.84191ZM7.09655 12.0919L16.2405 2.94792C16.398 2.79003 16.4864 2.57615 16.4864 2.35317C16.4864 2.13019 16.398 1.9163 16.2405 1.75842C16.0804 1.60539 15.8673 1.51999 15.6458 1.51999C15.4243 1.51999 15.2112 1.60539 15.051 1.75842L5.90705 10.9024C5.48672 11.3253 5.25011 11.8969 5.24855 12.4932V12.7504H5.5058C6.10205 12.7488 6.67364 12.5122 7.09655 12.0919Z" fill="#9797BB"/>
                        </svg>
                        </div>
                        <div @click="deleteInput()" > 
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="settings-integrations-tasks__delete pointer">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.29 3H13.779C13.591 2.15356 13.0936 1.39301 12.3706 0.846538C11.6476 0.300067 10.7433 0.00109089 9.81002 0H8.19002C7.25674 0.00109089 6.3524 0.300067 5.62941 0.846538C4.90643 1.39301 4.40903 2.15356 4.22102 3H1.71002C1.4952 3 1.28918 3.07902 1.13726 3.21967C0.985362 3.36032 0.900024 3.55108 0.900024 3.75C0.900024 3.94891 0.985362 4.13968 1.13726 4.28033C1.28918 4.42098 1.4952 4.5 1.71002 4.5H2.52002V14.25C2.52131 15.2442 2.94842 16.1973 3.70766 16.9004C4.4669 17.6034 5.49629 17.9988 6.57002 18H11.43C12.5037 17.9988 13.5331 17.6034 14.2924 16.9004C15.0516 16.1973 15.4788 15.2442 15.48 14.25V4.5H16.29C16.5049 4.5 16.7109 4.42098 16.8628 4.28033C17.0147 4.13968 17.1 3.94891 17.1 3.75C17.1 3.55108 17.0147 3.36032 16.8628 3.21967C16.7109 3.07902 16.5049 3 16.29 3ZM8.19002 1.5H9.81002C10.3124 1.50057 10.8024 1.64503 11.2127 1.91358C11.6229 2.18213 11.9334 2.56162 12.1015 3H5.89853C6.06667 2.56162 6.37716 2.18213 6.78742 1.91358C7.19768 1.64503 7.6876 1.50057 8.19002 1.5ZM13.86 14.25C13.86 14.8468 13.604 15.4191 13.1483 15.841C12.6925 16.2629 12.0745 16.5 11.43 16.5H6.57002C5.92555 16.5 5.30747 16.2629 4.85175 15.841C4.39604 15.4191 4.14002 14.8468 4.14002 14.25V4.5H13.86V14.25ZM7.38007 13.4999C7.59489 13.4999 7.80092 13.4209 7.95282 13.2802C8.10472 13.1396 8.19007 12.9488 8.19007 12.7499V8.24992C8.19007 8.05101 8.10472 7.86025 7.95282 7.7196C7.80092 7.57894 7.59489 7.49992 7.38007 7.49992C7.16524 7.49992 6.95921 7.57894 6.80731 7.7196C6.65541 7.86025 6.57007 8.05101 6.57007 8.24992V12.7499C6.57007 12.9488 6.65541 13.1396 6.80731 13.2802C6.95921 13.4209 7.16524 13.4999 7.38007 13.4999ZM11.1928 13.2802C11.0409 13.4209 10.8349 13.4999 10.62 13.4999C10.4052 13.4999 10.1992 13.4209 10.0473 13.2802C9.89534 13.1396 9.81002 12.9488 9.81002 12.7499V8.24992C9.81002 8.05101 9.89534 7.86025 10.0473 7.7196C10.1992 7.57894 10.4052 7.49992 10.62 7.49992C10.8349 7.49992 11.0409 7.57894 11.1928 7.7196C11.3447 7.86025 11.43 8.05101 11.43 8.24992V12.7499C11.43 12.9488 11.3447 13.1396 11.1928 13.2802Z" fill="#EB5757"/>
                            </svg>
                        </div>
                        </td>
                         </template>
                        
                    </tr>
                    </template> 
                </table>
                
            </div>
            <template v-else-if="!loading&&(Object.keys(amo).length)">  
                <div class="empty-list">
                        <div class="empty-list__info">
                            <div class="empty-list__info-title">У вас еще нет задач</div>
                            <div class="empty-list__info-button base-button base-button_enter base-button_p5-15" @click="addTask">Добавить задачу</div>
                        </div>
                    </div>
            </template>
        </div>
    </div>
</template>
<script>
    import integrationHeader from "../integrationHeader/integrationHeader.vue";
    import {integrationCards} from "../../../../components/SettingsContainer/SettingsIntegrations/SettingsIntegrationsCard/settings-integrations-card"; 
    import BaseInputGroup from "../../../../components/Base/BaseInputGroup"; 
    import FullScreenLoader from "../../../../components/FullScreenLoader";
    // import SettingsIntegrationsTask from "../../../../components/SettingsContainer/SettingsIntegrations/SettingsIntegrationsTask/SettingsIntegrationsTask.vue"; 
    import {useIntegrations} from "../../../../composition/useIntegrations";
    import {ref, reactive, onMounted, watch, onUpdated} from 'vue';
    import { useWhatsapp } from "../../../../composition/useWhatsapp";
    import { useInstagram } from "../../../../composition/useInstagrams";
    import { integrationTasks } from "./integration-tabs-created-tasks";

    export default {
        components: { integrationHeader, BaseInputGroup, FullScreenLoader },
        setup() {
            const { checkActiveCard, isActiveAmo, activeCreatedTasks} = integrationCards()
            const { deleteIdAmocrm, getAllTasksAmo, allChanels } = useIntegrations()
            const {getDateForChange} = integrationTasks();
            const { whatsapps, getWhatsapps } = useWhatsapp()
            const { getInstagrams} = useInstagram()
            const activeUpdate = ref(null);
            const loading = ref(false);
            const dataInfo = ref()
             checkActiveCard(true);
             activeCreatedTasks.value = true;
             const amo = ref();
             getWhatsapps();
             getInstagrams();
                const getAmocrmWrapper = () => {
                loading.value = true
                getAllTasksAmo()
                    .then(r => {
                        loading.value = false
                        if (r.code === 404) {
                            amo.value = {is_active: false};
                            return;
                        }
                        amo.value = {...r.amocrm_integration};
                    });
            }
            const updateTasks =  (data) => {
                 deleteIdAmocrm(data)
                 .then(r => {
                    activeUpdate.value  = r.status
                 });
            }
            const createdTasksEditActiveated = (index, name) => {
                const gg = document.querySelector('.settings-integrations__header-pages-link a ')
                const data = [index, name]
                getDateForChange(data);
                 gg.click();
            }
            const addTask = () => {
                const gg = document.querySelector('.settings-integrations__header-pages-link a ')
                gg.click();
            }
            const getNameFunnel = (id) => {
                let index = whatsapps.value.findIndex(item => item.whatsapp_id==id)  
                const name = whatsapps.value[index].name
               return name
            }
             const getPhoneFunnel = (id) => {
                let index = whatsapps.value.findIndex(item => item.whatsapp_id==id)  
                const phone = whatsapps.value[index].phone
               return phone
            }
            

             watch(() => {
                  if (activeUpdate.value=='ok'){
                   getAmocrmWrapper();  
                    activeUpdate.value = null
                  }
                
             });
             const del = (indx) => {
              
                  amo.value.funnel_actions=amo.value.funnel_actions.filter(index => index!=0)
                  amo.value.funnel_actions = amo.value.funnel_actions
                
                   amo.value.funnel_actions.splice(0,1)
                  
             }
            const delNewDialog = () => {
                
            }
            getAmocrmWrapper();
                
            
            return{
                isActiveAmo,
                activeCreatedTasks,
                getAmocrmWrapper,
                amo,
                getNameFunnel,
                whatsapps,
                getPhoneFunnel,
                createdTasksEditActiveated,
                del,
                delNewDialog,
                getAllTasksAmo,
                deleteIdAmocrm,
                updateTasks,
                activeUpdate,
                addTask,
                loading,
                dataInfo,
                allChanels,

            }
        },
    }
</script>
<style lang="scss">
.integration-tabs-created-tasks__container{
    padding: 32px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: calc(100% - 64px);
    width: 100%;
    &-scroll{
        border-radius: 8px;
        overflow: auto;
        max-height: 100%;

        
    }
    &-title{
        font-size: 12px;
        line-height: 130%;  
        color: #CFCFE4;  
        text-align: left;
        padding-bottom: 6px;
    }
    &-list{
        @media (min-width: 1200px) {
            max-width:1000px
        }
        &-block{
            display: flex;
            align-items: center;
            padding-bottom: 16px;
            .base-input-group{
                width: 80%;
            }
            &-delete{
                margin-left: 14px;
            }
            &-edit{
                margin-left: 20px;
            }
            .base-input-group__input:disabled{
               font-size: 14px;
                line-height: 130%;
                color: #9797BB; 
            }
        }
    }
    .empty-list{
        width: 100%;
        position: relative;
        height: 100%;
        background-color: var(--header-color);
        border-radius: 9px;
        &__info{
            transform: translate(-50%, -47%);
            left: 50%;
            top: 47%;
            position: absolute;
            width: fit-content;
            display:flex;
            align-items: center;
            flex-direction: column;
            &-title{
                font-weight: bold;
                font-size: 24px;
                line-height: 24px;
                color: #F0F0FA;
                padding-bottom:32px;
            }
            &-button{
                color: #1D1D35
            }
        }
    }
    &-table{
        border-collapse: collapse;
        width: 100%;

        th{
            font-size: 10px;
            line-height: 130%;
            text-transform: uppercase;
            color: #9797BB;
            font-weight: normal;
            padding: 12px 20px;
        }
        
        &-channel{
            width: 100%;
            text-align: left;
            font-weight: normal;
            font-size: 12px;
            line-height: 130%;
            color: #CFCFE4;
            display: flex;
            align-items: center;
            img{
                padding-right: 10px;
            }
          
        }
        &-status{
            width: 62.2%;
            text-align: left;
            &_active{
                color: var(--border-active);
                background: rgba(94, 192, 117, 0.1);
                font-weight: normal;
                font-size: 12px;
                line-height: 130%;
                width: fit-content;
                padding: 4px 10px;
                overflow: hidden;
                border-radius: 22px;
            }
            &_no-active{
                color: var(--main-font-color);
                background: rgba(151, 151, 187, 0.1);
                font-weight: normal;
                font-size: 12px;
                line-height: 130%;
                width: fit-content;
                padding: 4px 10px;
                overflow: hidden;
                border-radius: 22px; 
            }
            &_problems{
                 color: #EBC257;
                background: rgba(235, 194, 87, 0.1);;
                font-weight: normal;
                font-size: 12px;
                line-height: 130%;
                width: fit-content;
                padding: 4px 10px;
                overflow: hidden;
                border-radius: 22px; 
            }
            &_disabled{
                 color: #EBC257;
                background: rgba(235, 194, 87, 0.1);;
                font-weight: normal;
                font-size: 12px;
                line-height: 130%;
                width: fit-content;
                padding: 4px 10px;
                overflow: hidden;
                border-radius: 22px; 
            }
            &_off{
                 color: #EB5757;
                background: rgba(235, 87, 87, 0.1);
                font-weight: normal;
                font-size: 12px;
                line-height: 130%;
                width: fit-content;
                padding: 4px 10px;
                overflow: hidden;
                border-radius: 22px; 
            }
          
        }  
        &-action{
            width: 100%;
            text-align: right;
            display: flex;
            justify-content: flex-end;
            .settings-integrations-tasks__edit{
                margin-right: 13px;
            }
        }
        &-tr:nth-child(2n){
            background-color: #1D1D35;
        }
         &-tr:nth-child(2n-1){
            background-color: #252544;
        }
        &-tr_height{
            td{
                padding: 24px 20px !important; 
            }
           
        }
    }
}
</style>