<template>
    <div class="base-square-icon">
        <img class="base-square-icon__image" :src="src" alt="">
    </div>
</template>

<script>

    import {computed} from "vue";

    export default {
        props: {
            isActive: Boolean,
            src: String,
        },
        setup(props) {
            return {
                isActive: props.isActive,
                src: computed(() => props.src),
            }
        }
    }
</script>

<style lang="scss">
    .base-square-icon {
        $diagonal: 46px;
        /*diagonal === диагональ круга(картинки)*/
        width: $diagonal;
        height: $diagonal;
        .base-square-icon__image{
            width: $diagonal;
            height: $diagonal;
            border-radius: 10px;
        }
    }
</style>