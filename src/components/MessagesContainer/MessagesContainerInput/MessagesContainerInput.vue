<template>
    <div class="messages-container__input">
        <BaseMessageInput
        ></BaseMessageInput>
    </div>
</template>

<script>
    import BaseMessageInput from '../../Base/BaseMessageInput'
    export default {
        components : { BaseMessageInput },
    }
</script>

<style lang="scss">
    .messages-container__input{
        position: relative;
        bottom: 0;
        padding: 5px 16px 14px;
        width: 100%;
        max-width: 100%;
    }
</style>