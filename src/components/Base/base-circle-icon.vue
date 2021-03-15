<template>
    <div class="base-circle-icon"
        :class="{
        'base-circle-icon_active': isActive,
        'base-circle-icon_dark': isDark,
        'base-circle-icon_light': !isDark,
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
            isDark: Boolean,
        },
        setup(props) {
            return {
                isActive: props.isActive,
                src: props.src,
                isDark: props.isDark,
            }
        }
    }
</script>

<style lang="scss">
    @import "@/variables.scss";
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
                background: $green;
                left: 15px;
                bottom: 0;
            }
            &.base-circle-icon_dark {
                &:after{
                    border: 1.5px solid $left-bar-color__dark;
                }
            }
            &.base-circle-icon_light {
                &:after{
                    border: 1.5px solid $left-bar-color__light;
                }
            }
        }
        .base-circle-icon__image{
            width: $diagonal;
            height: $diagonal;
            border-radius: 50%;
        }

    }
</style>