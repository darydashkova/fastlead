<template>
    <div class="test-check">
        <div class="test-check__title">Тестовая отправка</div> 
        <div class="test-check__number">
            <input class="test-check__number-input" placeholder="Ввести номер"   v-maska="'# (###) ###-##-##'">
            <button  class="test-check__number-send  base-button_border-green">Отправить</button>
        </div>
       
    </div>
</template>
<script>

export default {
   
    setup() {
       
        return{

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
            color: var(--modal-font-color);
            background: var(--modal-element-hover-bg-color);
            border: 0.7px solid var(--modal-input-border-color);
            box-sizing: border-box;
            border-radius: 3px;
            text-align: left;
            min-width: 159px;
            position: relative; 
            margin-right: 16px;
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