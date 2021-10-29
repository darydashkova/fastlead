<template>
    <div class="integration-modal-files">
        <div class="integration-modal-files__title">Прикрепить файл до (1 MB)</div>
        <div class="integration-modal-files__input">{{fileName}}</div>
        <input type="file" style="display:none" class="integration-modal-files__input_hidden" @change=" getName" >
        <div class="integration-modal-files__input-button" @click="inputOpen">Выбрать файл</div>
        <!-- <div class="integration-modal-files__line"> 
        </div>    -->
        <!-- <BaseSwitcher
                :value="style"
                 @changeValue="setStyle"
                 class="integration-modal-files__title-no-padding"
                >Отправить с текстом под файлом</BaseSwitcher> -->
        <div class="integration-modal-files__line"> </div>
        <!-- <div class="integration-modal-files__title">Прикрепить контакт</div>
          <input class="integration-modal-files__input" type="text"   v-maska="'+7 (###) ###-##-##'" placeholder="+7(xxx)-xxx-xx-xx" v-model='number'>
          <div class="integration-modal-files__line"> </div> -->
          <div class="integration-modal-files__buttons">
              <div class="base-button_border-green base-button_p5-15 pointer" @click="close">Отменить</div>
          <div class="base-button base-button_enter pointer" @click="save">Прикрепить</div>
          
          </div>
    </div>
</template>
<script>
import { ref, onMounted, watch } from "vue";
import BaseSwitcher from "../../Base/BaseSwitcher";
import { useStyle } from "../../../composition/useStyle";
 import {useImages} from "../../../composition/useImages";
export default {
    components: { BaseSwitcher },
    props: {
        name:String,
        },
    emits: ['saveFile'],
    setup( props, {emit}) {
        const { style, setStyle } = useStyle();
        const { createImage} = useImages()
        const inputBlock = ref();
        const fileName = ref('Файл не выбран')
        const dataFile = ref([]);
        const number = ref();
        const inputOpen = () => {
            inputBlock.value.click();
       }
       watch(()=>{
           console.log(props.name)
           if(props.name){
               fileName.value=props.name
           }
           
       })
       onMounted(() => {
            inputBlock.value = document.querySelector('.integration-modal-files__input_hidden');
       })
       const nameFile = () => {
           fileName.value = inputBlock.value.files[0].name
       }
       const close = () => {
           emit('close');
       }
       const save = () => {
           const data = ref([]);
           if(dataFile.value.length!=0){
            createImage(dataFile.value[0])
            .then((r) => {
                //отправка с номером
                // if( number.value.length==18){
                //     data.value.push(r.files[0], number.value)
                // }
                // else{
                //   data.value.push(r.files[0], null)   
                // }
                if(dataFile.value[0].type.startsWith('im')){
                 data.value.push(r.files[0], 'img');   
                }
                else if (dataFile.value[0].type.startsWith('document')) {
                   data.value.push(r.files[0], 'document');   
                }
                else if (dataFile.value[0].type.startsWith('video')){
                    data.value.push(r.files[0], 'video');     
                }
                 emit('saveFile', data.value)  
              
            })
           }
       
        close();

       }
        const getName = ($event) => {
            nameFile();
            $event.target.files.forEach(item => {
                let fr = new FileReader();
                fr.addEventListener("load", function () {
                dataFile.value=[]
                dataFile.value.push(item)
                // createImage(item)
                //     .then((r) => {
                //     dataFile.value = r.files;
                //     console.log( dataFile.value ) 
                //     })
                }, false);
            fr.readAsDataURL(item);
            })
       }
       return{
           inputOpen,
           inputBlock,
           fileName,
           nameFile,
           setStyle,
           style,
           close,
           save,
           getName,
           dataFile,
           number
           
       }
    },
}


</script>
<style lang="scss">
.integration-modal-files{
    position: absolute;
    bottom: 42px;
    border: 1px solid #1D1D35;
    max-width: 348px;
    left: 5px;
    width: 100%;
    background: #252544;
    border: 1px solid #2E2E4E;
    border-radius: 4px;
    padding: 18px;
    &__buttons{
        display:flex;
        justify-content: space-between;
        .base-button,.base-button_border-green{
            display: flex;
            align-items: center;
            line-height: 130%;
            padding: 8px 16px;
        }
        .base-button{
    color: #1D1D35;
    font-weight: 500;
        }
    }
    &__input{
        font-family: Segoe UI;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    width: 100%;
    padding: 8px 10px;
    color: #40406B;
    background: #1D1D35;
    box-sizing: border-box;
    border-radius: 3px;
    text-align: left;
      &::-webkit-input-placeholder {color:#40406B;}
            &::-moz-placeholder {color:#40406B;}
            &:-moz-placeholder {color:#40406B;}
            &:-ms-input-placeholder {color:#40406B;}
    }
    &__title{
        font-size: 12px;
        line-height: 130%;
        color: #CFCFE4;
        padding-bottom: 8px;
        text-align: left;
    }
    &__input-button{
        margin-top: 20px;
        background: var(--green-color);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        border: 1px solid #84D160;
        width: fit-content;
        border-radius: 4px;
        padding: 4px 12px;
}
&__line{
height: 1px;
border-bottom: 1px solid #40406B;
padding-top: 20px;
margin-bottom: 20px;
.base-switcher{
padding-top: 20px;
}
}
&__title-no-padding{
    font-size: 12px;
    line-height: 130%;
    color: #CFCFE4;
    text-align: left;
}
}
</style>