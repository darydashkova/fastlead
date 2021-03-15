<template>
    <div class="base-circle-icon">
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
        .base-circle-icon__image{
            width: $diagonal;
            height: $diagonal;
            border-radius: 10px;
        }
    }
</style>