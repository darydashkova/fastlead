<template>
    <label class="base-modal-label" :for="forId">
        <slot></slot>
    </label>
</template>

<script>
    export default {
        props: {
            forId: String
        },
        setup(props) {
            return {
                forId: props.id,
            }
        }
    }
</script>

<style lang="scss">
    .base-modal-label {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        background: var(--green-color);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        &.base-modal-label_error {
            background: #EB5757;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    }
</style>