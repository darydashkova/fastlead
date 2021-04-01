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
        padding: 15px 40px 3px 29px;
        width: 100%;
        max-width: 100%;
        background: var(--header-color);
    }
</style>