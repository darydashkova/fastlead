<template>
    <div class="modal-create-instagram-success" @mousedown.self="close">
        <div class="modal-create-instagram-success__body">
            Instagram аккаунт успешно <br> активирован
        </div>
    </div>
</template>

<script>
    export default {
        setup(props, {emit}) {
            const close = () => {
                emit('close');
            }
            setTimeout(() => close(), 3000);
            return {
                close,
            }
        }
    }
</script>

<style lang="scss">
    .modal-create-instagram-success {
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.34);
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1300;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: left;
        &.z-index {
            z-index: 1400;
        }
    }
    .modal-create-instagram-success__body {
        width: 364px;
        background: var(--modal-bg-color);
        border-radius: 9px;
        padding: 40px 30px;

        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 24px;
        text-align: center;
        color: var(--modal-base-text-default-color);
    }
</style>