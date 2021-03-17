<template>
    <div class="messages-container-list" ref="container">
        <BaseMessage
            v-for="i in 50"
            :isDark="isDark"
            :isMe="i % 2 == 0"
        ></BaseMessage>
    </div>
</template>

<script>
    import BaseMessage from '../../Base/BaseMessage'
    export default {
        components: {BaseMessage},
        props: {
            isDark: Boolean
        },
        setup(props) {
            let container = document.querySelector('.messages-container-list')
            console.dir(container)
            // container.value.scrollTop = container.value.scrollHeight
            return {
                isDark: props.isDark,
                container,
            }
        }
    }
</script>

<style lang="scss">
    .messages-container-list {
        height: 100%;
        overflow-y: auto;
        padding: 15px 90px 15px 29px;
    }
</style>