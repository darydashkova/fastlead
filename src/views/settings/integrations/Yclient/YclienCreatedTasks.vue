<template>
    <div class="yclient-created-tasks">
        <div class="scroll" ref="container" @click.self="scrollTo">
            <div class="scroll__bar" ref="scrollbar"></div>
        </div>
        <div class="yclient-created-tasks__content" ref="content">
            <integrationHeaderCommon :date="date" ></integrationHeaderCommon>
            <div class="yclient-created-tasks__block">
                <teleport to="body" v-if="loading">
                <FullScreenLoader ></FullScreenLoader>
                </teleport>
                <template v-if="data.yclients_task">
                <div class="yclient-created-tasks__title">
                    <div class="yclient-created-tasks__title-name">Наименования</div>
                    <div  class="yclient-created-tasks__title-name">Задача</div>
                </div>
                    <div class="yclient-created-tasks__block-column" v-for="(task, index) in data.yclients_task" :key='index'>
                        <input class="yclient-created-tasks__block-column-input" disabled :value="task.task_name">
                        <input class="yclient-created-tasks__block-column-input" disabled :value="task.type">
                        <svg @click="editTask(index)" class="pointer" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.7197 6.95391C16.8603 6.81326 17.0511 6.73424 17.25 6.73424C17.4489 6.73424 17.6397 6.81326 17.7803 6.95391C17.921 7.09457 18 7.28533 18 7.48424V12.2572C18.0012 12.7499 17.9047 13.2378 17.7161 13.6929C17.5275 14.148 17.2506 14.5611 16.9012 14.9085L14.9092 16.902C14.5617 17.2513 14.1484 17.5281 13.6932 17.7166C13.238 17.9051 12.7499 18.0014 12.2572 18H3.75C2.7558 17.9988 1.80267 17.6033 1.09966 16.9003C0.396661 16.1973 0.00119089 15.2442 0 14.25V3.75C0.00119089 2.7558 0.396661 1.80267 1.09966 1.09966C1.80267 0.396661 2.7558 0.00119089 3.75 0H10.5315C10.7304 0 10.9212 0.0790176 11.0618 0.21967C11.2025 0.360322 11.2815 0.551087 11.2815 0.749999C11.2815 0.948912 11.2025 1.13968 11.0618 1.28033C10.9212 1.42098 10.7304 1.5 10.5315 1.5H3.75C3.15326 1.5 2.58097 1.73705 2.15901 2.15901C1.73705 2.58096 1.5 3.15326 1.5 3.75V14.25C1.5 14.8467 1.73705 15.419 2.15901 15.841C2.58097 16.2629 3.15326 16.5 3.75 16.5H11.25V13.5C11.25 12.9033 11.487 12.331 11.909 11.909C12.331 11.487 12.9033 11.25 13.5 11.25H16.5V7.48424C16.5 7.28533 16.579 7.09457 16.7197 6.95391ZM12.75 16.4415C13.166 16.3504 13.5473 16.1422 13.8487 15.8415L15.8437 13.848C16.143 13.5457 16.351 13.1651 16.4437 12.75H13.5C13.3011 12.75 13.1103 12.829 12.9697 12.9697C12.829 13.1103 12.75 13.3011 12.75 13.5V16.4415ZM4.84655 9.84191L13.9905 0.69792C14.4363 0.27184 15.0292 0.0340576 15.6458 0.0340576C16.2624 0.0340576 16.8553 0.27184 17.301 0.69792C17.7393 1.13729 17.9855 1.73256 17.9855 2.35317C17.9855 2.97377 17.7393 3.56904 17.301 4.00842L8.15705 13.1524C7.80969 13.5017 7.39651 13.7785 6.94142 13.967C6.48633 14.1555 5.99837 14.2518 5.5058 14.2504H4.49855C4.29964 14.2504 4.10887 14.1714 3.96822 14.0307C3.82757 13.8901 3.74855 13.6993 3.74855 13.5004V12.4932C3.74716 12.0006 3.84349 11.5126 4.03196 11.0575C4.22043 10.6025 4.49731 10.1893 4.84655 9.84191ZM7.09655 12.0919L16.2405 2.94792C16.398 2.79003 16.4864 2.57615 16.4864 2.35317C16.4864 2.13019 16.398 1.9163 16.2405 1.75842C16.0804 1.60539 15.8673 1.51999 15.6458 1.51999C15.4243 1.51999 15.2112 1.60539 15.051 1.75842L5.90705 10.9024C5.48672 11.3253 5.25011 11.8969 5.24855 12.4932V12.7504H5.5058C6.10205 12.7488 6.67364 12.5122 7.09655 12.0919Z" fill="#9797BB"/>
                        </svg>
                        <svg @click="deleteChooseTask(index)" class="pointer" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2899 3H13.7789C13.5909 2.15356 13.0935 1.39301 12.3705 0.846538C11.6475 0.300067 10.7432 0.00109089 9.8099 0H8.1899C7.25662 0.00109089 6.35227 0.300067 5.62929 0.846538C4.90631 1.39301 4.4089 2.15356 4.2209 3H1.7099C1.49508 3 1.28905 3.07902 1.13714 3.21967C0.98524 3.36032 0.899902 3.55108 0.899902 3.75C0.899902 3.94891 0.98524 4.13968 1.13714 4.28033C1.28905 4.42098 1.49508 4.5 1.7099 4.5H2.5199V14.25C2.52119 15.2442 2.94829 16.1973 3.70754 16.9004C4.46678 17.6034 5.49617 17.9988 6.5699 18H11.4299C12.5036 17.9988 13.533 17.6034 14.2923 16.9004C15.0515 16.1973 15.4786 15.2442 15.4799 14.25V4.5H16.2899C16.5047 4.5 16.7107 4.42098 16.8627 4.28033C17.0146 4.13968 17.0999 3.94891 17.0999 3.75C17.0999 3.55108 17.0146 3.36032 16.8627 3.21967C16.7107 3.07902 16.5047 3 16.2899 3ZM8.1899 1.5H9.8099C10.3123 1.50057 10.8022 1.64503 11.2126 1.91358C11.6228 2.18213 11.9333 2.56162 12.1014 3H5.89841C6.06655 2.56162 6.37704 2.18213 6.7873 1.91358C7.19755 1.64503 7.68748 1.50057 8.1899 1.5ZM13.8599 14.25C13.8599 14.8468 13.6039 15.4191 13.1482 15.841C12.6924 16.2629 12.0744 16.5 11.4299 16.5H6.5699C5.92543 16.5 5.30735 16.2629 4.85163 15.841C4.39592 15.4191 4.1399 14.8468 4.1399 14.25V4.5H13.8599V14.25ZM7.37995 13.4999C7.59477 13.4999 7.8008 13.4209 7.9527 13.2802C8.1046 13.1396 8.18995 12.9488 8.18995 12.7499V8.24992C8.18995 8.05101 8.1046 7.86025 7.9527 7.7196C7.8008 7.57894 7.59477 7.49992 7.37995 7.49992C7.16512 7.49992 6.95909 7.57894 6.80719 7.7196C6.65529 7.86025 6.56995 8.05101 6.56995 8.24992V12.7499C6.56995 12.9488 6.65529 13.1396 6.80719 13.2802C6.95909 13.4209 7.16512 13.4999 7.37995 13.4999ZM11.1927 13.2802C11.0407 13.4209 10.8347 13.4999 10.6199 13.4999C10.4051 13.4999 10.1991 13.4209 10.0471 13.2802C9.89522 13.1396 9.8099 12.9488 9.8099 12.7499V8.24992C9.8099 8.05101 9.89522 7.86025 10.0471 7.7196C10.1991 7.57894 10.4051 7.49992 10.6199 7.49992C10.8347 7.49992 11.0407 7.57894 11.1927 7.7196C11.3446 7.86025 11.4299 8.05101 11.4299 8.24992V12.7499C11.4299 12.9488 11.3446 13.1396 11.1927 13.2802Z" fill="#EB5757"/>
                        </svg>
                    </div>
                </template>
                  
                <template v-else-if="!data.yclients_task&&!loading">
                    <div class="empty-list">
                        <div class="empty-list__info">
                            <div class="empty-list__info-title">У вас еще нет задач</div>
                            <div class="empty-list__info-button base-button base-button_enter base-button_p5-15" @click="addTask">Добавить задачу</div>
                        </div>
                    </div>
                </template>
                
            </div>
        </div>
    </div>
</template>

<script>
    import { ref, onBeforeUpdate } from "vue";
    import integrationHeaderCommon from "../integrationHeaderCommon/integrationHeaderCommon";
    import {useCustomScroll} from "../../../../composition/useCustomScroll";
    import FullScreenLoader from "../../../../components//FullScreenLoader";
    import {useIntegrations} from "../../../../composition/useIntegrations";
    import {yclientFunction} from "./yclient.js";
    import { useRouter, useRoute}  from 'vue-router'
export default {
    components: {
        integrationHeaderCommon,
        FullScreenLoader, 
    },
    props: {},
    emit: ["editTask"],
    setup(props, {emit}) {
        const {getAllTask, deleteTask} = useIntegrations()
        const data = ref({})
        const router = useRouter();
        const {editTaskYclient, checkEdit, indexTask} = yclientFunction()
        const loading = ref(false);
        const getAllTaskYclient =  () => {
            loading.value = true;
            getAllTask()
             .then(r => {
                 loading.value = false;
                data.value = {...r}
            })
        }  
        const editTask = (index) => {
            editTaskYclient(index);
            
              router.push('/settings/integrations/yclients/connect');
        }
        // const editTask = (index) => {
        //     const task = data.value.yclients_task[index]
        //      console.log(task);
        // }
        const { container, content, scrollbar, scrollTo, init } = useCustomScroll();
        const links = ref([['Настройка Yclients','false', '/settings/integrations/yclients/connect'],['Созданные задачи','true', '/settings/integrations/yclients/create']]); 
        const date  = ref({links:links, name:'yclient'})
        const checkUpdate = ref(false);
        const deleteChooseTask = (index) => {
            const taskId = {task_id:data.value.yclients_task[index].task_id}
            deleteTask(taskId)
            getAllTaskYclient();
            checkUpdate.value=true;
        }
        onBeforeUpdate(() => {
            if(checkUpdate.value){
                getAllTaskYclient();
                checkUpdate.value=false;
            }
        })

        getAllTaskYclient();  

        return {
            links,
            date,
            getAllTaskYclient,
            data,
            deleteChooseTask,
            deleteTask,
            editTask,
            editTask,
            editTaskYclient,
            checkEdit,
            indexTask,
            checkUpdate,
            loading
        }
    },
}
</script>
<style lang="scss">
.yclient-created-tasks{
    &__content{
        width: 100%;
        height: 100%;
    } 
    &__block{
        padding: 41px 31px;
        width: 100%;
        height:calc(100% - 62px);
        &-column{
            display: flex;
            justify-content:space-between;
            flex-direction: row;
            margin-bottom: 16px;
            width: 100%;
            align-items: center;
            &-title{
                text-align: left;
                width: calc(50% - 8px); 
                font-size: 12px;
                line-height: 130%;
                color: #CFCFE4;
                padding-bottom: 6px;
            }
            &-input{
                font-family: Segoe UI;
                font-style: normal;
                font-weight: 400;
                font-size: 14px;
                line-height: 19px;
                width: 100%;
                padding: 8px 10px;
                color: var(--modal-font-color);
                background: var(--messenger-search-input-bg-active);
                border: 0.7px solid var(--settings-nav-border);
                width: calc(50% - 42px); 
                border-radius: 3px;
               
            }
        }
    } 
    &__title{
            display: flex;
            justify-content: flex-start;
            flex-direction: row;
            &-name{
                text-align: left;
                width: calc(50% - 42px); 
                font-size: 12px;
                line-height: 130%;
                color: #CFCFE4;
                padding-bottom: 6px;
                &:nth-child(1){
                    margin-right: 16px;
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
}
</style>