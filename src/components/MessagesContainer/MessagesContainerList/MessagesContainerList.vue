<template>
    <div class="messages-container-list">
        <div class="scroll" ref="container" @click.self="scrollTo">
            <div class="scroll__bar" ref="scrollbar"></div>
        </div>
        <div class="messages_container-list__content" ref="content">
            <BaseMessage
                    v-for="message in messages.message"
                    :message="message"
            ></BaseMessage>
        </div>
    </div>
</template>

<script>
    import {ref, onMounted} from 'vue';
    import BaseMessage from '../../Base/BaseMessage';
    import {useCustomScroll} from "../../../composition/useCustomScroll";
    import {useMessages} from "../../../composition/useMessages";
    export default {
        components: {BaseMessage},
        setup() {
            const { container, content, scrollbar, scrollTo, init } = useCustomScroll()
            onMounted( () => {
                init()
                content.value.scrollTop = content.value.scrollHeight;
            })

            const { messages } = useMessages();

            return {
                container,
                content,
                scrollbar,
                scrollTo,

                messages,
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
    .messages_container-list__content {
        height: 100%;
        width: 100%;
        overflow-y: auto;
        padding: 15px 90px 15px 29px;
        @media(max-width: 1366px) {
            padding: 15px 29px;
        }
    }

</style>