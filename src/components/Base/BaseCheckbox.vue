<template>
<div>

    <input type="checkbox" :id="id"  value="name" @click="controlCheckbox()" class="base-checkbox__input" v-model="isActive">
    <label :for="id" ><span ></span>{{title}}</label>
 </div>  
    
</template>

<script>
    import { computed, ref, watchEffect, toRefs } from "vue";
    import {useImages} from "../../composition/useImages";
    export default {
        props: {
            id:Number,
            title: String,
            isCheck:Boolean,
            name: String,
             },
        emits:['getCheckbox'],
        setup(props, {emit}) {
            const name =ref()
            const { getImage } = useImages()
            const isActive = ref();
            const controlCheckbox = () => {
                emit('getCheckbox', isActive.value, name)
            }
           

         
           
            return {
           
               
                isActive,
                name,
                controlCheckbox
            }
        }
    }
</script>

<style lang="scss">
/* Hide original inputs */
input[type=checkbox], input[type=radio] {
    display: none;
}

/* Checkboxes */
input[type=checkbox] + label span {
    border: 1px solid var(--messenger-search-input-bg);
    font-size: 24pt;
    display: inline-block;
    width: 22px;
    height: 22px;
    border-radius: 4px;
    line-height: 0.25em;
    margin: 4px 8px 8px 0px;
    padding: 2px;
    text-align: center;
    vertical-align: middle;
}
input[type=checkbox] + label span:hover {
  background-image: url(../../assets/vectorCheckbox.svg);
    background-position: right; /*Например справа размещаем картинку*/
    background-repeat: no-repeat;
    background-position: 50% 50%;
}
 input[type=checkbox]:checked + label span {
    background-color: var(--border-active);
    background-image: url(../../assets/vectorCheckbox.svg);
    background-position: right; /*Например справа размещаем картинку*/
    background-repeat: no-repeat;
    background-position: 50% 50%;
    border: 1px solid var(--border-active);
    
}


    .base-circle-icon {
        $diagonal: 46px;
        /*diagonal === диагональ круга(картинки)*/
        width: $diagonal;
        height: $diagonal;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
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
                left: calc(#{$diagonal} / 2 - 9.5px);
                bottom: 0;
                border: 1.5px solid var(--left-bar-color);
            }
        }
        .base-circle-icon__image{
            width: $diagonal;
            height: $diagonal;
            border-radius: 50%;
        }
        &.base-circle-icon_big {
            $diagonal: 75px;
            /*diagonal === диагональ круга(картинки)*/
            width: $diagonal;
            height: $diagonal;
            display: inline-block;
            .base-circle-icon__image{
                width: $diagonal;
                height: $diagonal;
            }
        }
        &.base-circle-icon_little {
            $diagonal: 21px;
            /*diagonal === диагональ круга(картинки)*/
            width: $diagonal;
            height: $diagonal;
            display: inline-block;
            .base-circle-icon__image{
                width: $diagonal;
                height: $diagonal;
            }
        }
        &.base-circle-icon__52 {
            $diagonal: 52px;
            /*diagonal === диагональ круга(картинки)*/
            width: $diagonal;
            height: $diagonal;
            display: inline-block;
            .base-circle-icon__image{
                width: $diagonal;
                height: $diagonal;
            }
        }
        &.base-circle-icon_ml-negative {
            margin-left: -4px;
            &:first-of-type {
                margin-left: 0;
            }
        }
        &.base-circle-icon_need-selecting {
            &:hover {
                .base-circle-icon__selector {
                    display: flex;
                }
                .base-circle-icon__image {
                    display: none;
                }
            .base-circle-icon__selector {
                background: #252544 !important;
                .base-circle-icon__inside-selector{
                    background: #252544 !important;
                    &-check{
                        path {
                            fill: #40406B;
                        }
                    }
                }  
            }
            }
        }
        &.base-circle-icon_selected {
            .base-circle-icon__selector {
                display: flex;
            }
            .base-circle-icon__image {
                display: none;
            }
        }
    }
    .base-circle-icon__selector {
        width: 22px;
        height: 22px;
        background: var(--green-color);
        border-radius: 5px;
        padding: 1.6px;
        justify-content: center;
        align-items: center;
        display: none;
        
    }  
    .base-circle-icon__inside-selector {
       background: var(--green-color);
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
       
         
    }
  
      
    .base-circle-icon__selector_active {
        background: var(--green-color);
    }
</style>