<template>
    <div class="base-circle-icon"
        :class="{
        'base-circle-icon_active': isActive,
        }"
    >
        <img class="base-circle-icon__image" :src="src" alt="">
    </div>
</template>

<script>

    export default {
        props: {
            isActive: Boolean,
            src: String,
        },
        setup(props) {
            return {
                isActive: props.isActive,
                src: props.src,
            }
        }
    }
</script>

<style lang="scss">
    .base-circle-icon {
        $diagonal: 46px;
        /*diagonal === диагональ круга(картинки)*/
        width: $diagonal;
        height: $diagonal;
        position: relative;
        &.base-circle-icon_active {
            height: calc(#{$diagonal} + 7px);
            /*7px === падение активного круга вниз от картинки*/
            &:after {
                /*активный круг*/
                content: '';
                position: absolute;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: var(--green-color);
                left: 15px;
                bottom: 0;
            }
            &:after{
                border: 1.5px solid var(--left-bar-color);
            }
        }
        .base-circle-icon__image{
            width: $diagonal;
            height: $diagonal;
            border-radius: 50%;
        }

    }
</style>