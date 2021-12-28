<template>
    <div class="messages-container-list">
        <div class="scroll" ref="container" @click.self="scrollTo">
            <div class="scroll__bar" ref="scrollbar"></div>
        </div>
        <div class="messages-container-list__content" ref="content">
            <template v-for="(group, index) in groupedMessages" :key="index">
                <div class="messages-container-list__date" >
                    <div class="messages-container-list__date-text">
                        {{group.date}}
                    </div>
                </div>
                <template v-for="(message, indx) in group.message"  :key="indx">

                    <BaseGroupedImages
                            v-if=" Array.isArray(message)"
                            :images="message"
                           
                    ></BaseGroupedImages>
                   <BaseMessage
                            v-else
                            :message="message"
                            :key="message.message_id"
                    ></BaseMessage>
                </template>
            </template>
        </div>
    </div>
</template>

<script>
    import { onMounted, computed, ref } from 'vue';
    import BaseMessage from '../../Base/BaseMessage.vue';
    import BaseGroupedImages from '../../Base/BaseGroupedImages.vue';
    import { useCustomScroll } from "../../../composition/useCustomScroll";
    import { useMessages } from "../../../composition/useMessages";
    import {useDate} from "../../../composition/useDate";

    export default {
        components: {BaseMessage, BaseGroupedImages},
        setup() {
            const { container, content, scrollbar, scrollTo, init } = useCustomScroll()
            const { messages, setListRef } = useMessages();
            const { validDate } = useDate();
            onMounted( () => {
                init();
                setListRef(content.value);
            })
            let groupedMessages = computed(() => {
                let dateArr = [];
                let finalArr = [];
                if (messages.value.messages) {
                    messages.value.messages.forEach(item => {
                        let elem = dateArr.find(i => validDate(item.time, true) === i.date)
                        elem
                            ? elem.message.push(item)
                            : dateArr.push({date: validDate(item.time, true), message: [item]})
                    })  
                }
                if (dateArr.length) {
                    finalArr = dateArr.map(i => {
                        return {
                            date: i.date,
                            message: [],
                        }
                    })
                
                    for (let i = 0; i < dateArr.length; i++) {
                        let groupImg = [];
                        let groupDocs = []; 
                        dateArr[i].message.forEach(item => { 
                            //бежим по массиву сообщений определенной даты
                            if (item.type === 'text') {
                                //если текстовое сообщение проверяем
                                //if (groupImg.length > 3) {
                                //    finalArr[i].message.push(groupImg);
                                //    groupImg = [];
                                    //если больше 3 подряд то проверяем на совпадение по времени
                                    //ToDo поделить на группы по 30 минут
                                //} else 
                                //{
                                    //если меньше 4 подряд - пушим фотографии отдельно и обнуляем массив
                                    groupImg.forEach(img => {
                                        finalArr[i].message.push(img);
                                    })
                                    groupImg = [];
                                //}
                                finalArr[i].message.push(item);
                            } 
                            else if (item.type === 'document') {
                                 groupDocs.push(item);
                            } 
                            else {
                                groupImg.push(item);
                            }
                        })
                        // if (groupImg.length > 3) {
                        //     finalArr[i].message.push(groupImg);
                        //     groupImg = [];
                        // } 
                        // else 
                        // {
                            groupImg.forEach(img => {
                                finalArr[i].message.push(img);
                            })
                            groupImg = [];
                            groupDocs.forEach(file => {
                                finalArr[i].message.push(file);
                            })
                        //}
                    }
                }
                return finalArr;
            })
                 
            return {
                container,
                content,
                scrollbar,
                scrollTo,
                messages,
                groupedMessages, 
            }
        }
    }
</script>

<style lang="scss">
    .messages-container-list {
        height: 100%;
        position: relative;
        background-color: var(--modal-bg-color);
        overflow: hidden;
        ::-webkit-scrollbar {
            display: none;
        }
    }
    .messages-container-list__content {
        height: calc(100% - 20px);
        width: 100%;
        overflow-y: auto;
        padding: 15px 45px;
        margin: 10px 0;
    }
    .messages-container-list__date {
        margin: 25px 0;
        width: 100%;
        text-align: right;
        border-bottom: 1px solid var(--folder-color);
    }
    .messages-container-list__date-text {
        display: inline-block;
        margin: 0 auto;
        padding: 4px 16px;
        border-radius: 4px;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        color: var(--date-in-message-color);

    }

</style>