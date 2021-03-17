<template>
    <div class="messages-container">
        <MessagesContainerList
            :isDark="isDark"
        ></MessagesContainerList>
        <MessagesContainerInput
            :isDark="isDark"
        ></MessagesContainerInput>
    </div>
</template>

<script>
    import MessagesContainerList from './MessagesContainerList/MessagesContainerList'
    import MessagesContainerInput from './MessagesContainerInput/MessagesContainerInput'
    export default {
        components: {MessagesContainerList, MessagesContainerInput},
        props: {
            isDark: Boolean,
        },
        setup(props) {
            return {
                isDark: props.isDark
            }
        }

    }
</script>

<style lang="scss">
    .messages-container {
        height: calc(100% - 79px);
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
    }
</style>