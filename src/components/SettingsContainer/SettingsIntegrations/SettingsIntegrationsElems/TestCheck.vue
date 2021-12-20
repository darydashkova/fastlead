<template>
    <div class="test-check">
        <div class="test-check__title">Тестовая отправка</div> 
        <div class="test-check__number">
            <input class="test-check__number-input " :class="{'settings-integrations-form__input_error': error}" placeholder="7 (###) ###-##-##"   v-maska="'7 (###) ###-##-##'" v-model="number">
            <button  @click="send(number)" class="test-check__number-send  base-button_border-green pointer">Отправить</button>
        </div>
       
    </div>
</template>
<script>
import { ref } from "vue";
export default {
   props:{},
   emits: ["send"],
    setup(props, {emit}) {
        const error = ref(false);
        const number = ref('');
        const send = (num) => {
            if(num.length!=17){
               error.value = true 
            }
            else{
                error.value = false 
                emit("send", num)   
            }
           
        }
        return{
            number,
            send,
            error
        }
    },
}
</script>
<style lang="scss">
.test-check{
    padding-top:32px;
    display:flex;
    flex-direction:column;
    width:100%;
    &__title{
        text-align: left;
        font-size: 12px;
        line-height: 130%;
        color: #CFCFE4;
        padding-bottom: 6px;
    }
    &__number{
        width:100%;
        text-align:left;
        display:flex;
        align-items: start;
        &-input{
            font-family: Segoe UI;
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 19px;
            width: 100%;
            padding: 8px 10px;
            color: #40406B;
            background:var(--messenger-search-input-bg-active);
            border: 0.7px solid var(--settings-nav-border);
            box-sizing: border-box;
            border-radius: 3px;
            text-align: left;
            min-width: 159px;
            position: relative; 
            margin-right: 16px;
            &::placeholder{
                color:#40406B
            }
        } 
        &-send{
            font-size: 12px;
            line-height: 130%;
            text-align: center;
            padding: 10px 16px;
            border-radius: 6px;
        }
        
    }

}

</style>