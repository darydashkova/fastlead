<template>
    <div class="messages-container-list">
        <div class="scroll" ref="container" @click.self="scrollTo">
            <div class="scroll__bar" ref="scrollbar"></div>
        </div>
        <div class="messages-container-list__content" ref="content">
            <template v-for="group in groupedMessages">
                <div class="messages-container-list__date">
                    {{group.date}}
                </div>
                <BaseMessage
                        v-for="message in group.message"
                        :message="message"
                ></BaseMessage>
            </template>
        </div>
    </div>
</template>

<script>
    import { onMounted, computed } from 'vue';
    import BaseMessage from '../../Base/BaseMessage';
    import { useCustomScroll } from "../../../composition/useCustomScroll";
    import { useMessages } from "../../../composition/useMessages";
    import {useDate} from "../../../composition/useDate";

    export default {
        components: {BaseMessage},
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

                if (messages.value.message) {
                    messages.value.message.forEach(item => {
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
                        dateArr[i].message.forEach(item => {
                            //бежим по массиву сообщений определенной даты
                            if (item.type === 'text') {
                                //если текстовое сообщение проверяем
                                if (groupImg.length > 3) {
                                    finalArr[i].message.push(groupImg);
                                    groupImg = [];
                                    //если больше 3 подряд то проверяем на совпадение по времени
                                    //ToDo поделить на группы по 30 минут
                                } else {
                                    //если меньше 4 подряд - пушим фотографии отдельно и обнуляем массив
                                    groupImg.forEach(img => {
                                        finalArr[i].message.push(img);
                                    })
                                    groupImg = [];
                                }
                                finalArr[i].message.push(item);
                            } else {
                                groupImg.push(item);
                            }
                        })
                        if (groupImg.length) {
                            finalArr[i].message.push(groupImg);
                            groupImg = [];
                        }
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
        overflow: hidden;
        ::-webkit-scrollbar {
            display: none;
        }
    }
    .messages-container-list__content {
        height: 100%;
        width: 100%;
        overflow-y: auto;
        padding: 15px 90px 15px 29px;
        @media(max-width: 1366px) {
            padding: 15px 29px;
        }
    }

</style>