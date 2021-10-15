<template>
    <div class="modal-sample">
        <div class="modal-sample__block">
<pre class="modal-sample__block-text">[@masterName]- Имя сотрудника 
*[@clientName], напоминаем Вам о записи:*
         
*Дата:* [@recordDate]
*Время:* [@recordTime]
*Услуга:* [@serviceTitle]
*Детали:* [@recordForm]
           
До Вашего визита осталось [@recordLeftTime]
-------------------------------------------
*Команда ПЕРСОНА ФЛАГМАН TIGI*
Красоту творим любовью
☎+7 7172 72 92 92 
📍 go.2gis.com/7zhfk 
📺 bit.ly/2PzWZrK</pre>
        </div>
    </div>
</template>
<script>
import { ref , onMounted, onUpdated} from "vue"
export default {
    props: {
        copyText:Boolean,
    },
    emits : ["copiedText"],
    setup(props, {emit}) {
       const copiedText = () => {
            const text = document.querySelector( "pre" ).textContent;
            emit('copiedText', text, true) 
       }
       onMounted(()=>{
           copiedText();  
       })
        return {
            copiedText
        }
    },
}
</script>
<style lang="scss">
.modal-sample{
    position: absolute;
   background: #F0F0FA;
   padding: 18px;
    border-radius: 6px;
    max-width: 350px;
    bottom: 50px; 
    color: #252544;
    right: 5px;
    &__block{
    text-align: left;
        &-text{
        font-size: 12px;
        line-height: 130%;
        display: flex;
        align-items: center;
        margin: 0;
        color: #252544;
        }
    }
   &::after {
    content: " ";
    position: absolute;
    top: 100%; /* В нижней части всплывающей подсказки */
    right: 7px;
    margin-left: -5px;
    border-width: 5px;

    border-style: solid;
    border-color: #F0F0FA transparent transparent transparent;
}
}
</style>