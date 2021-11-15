<template>
    <div class="integration-modal-files">
        <div class="integration-modal-files__title">Прикрепить файл до (1 MB)</div>
        <div class="integration-modal-files__input" v-if="fileName!='Файл не выбран'">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="integration-modal-files__input-img"> 
            <rect width="48" height="48" rx="24" fill="url(#paint0_linear_217:11032)"/>
            <path d="M26.4998 20.6666H31.9498C31.6589 19.8957 31.2069 19.1957 30.624 18.6133L27.7207 15.7083C27.1376 15.1261 26.4374 14.6744 25.6665 14.3833V19.8333C25.6665 20.2935 26.0396 20.6666 26.4998 20.6666Z" fill="#F0F0FA"/>
            <path d="M32.3131 22.3333H26.4998C25.1191 22.3333 23.9998 21.214 23.9998 19.8333V14.02C23.8656 14.0108 23.7315 14 23.5956 14H19.8331C17.5331 14.0028 15.6692 15.8666 15.6665 18.1667V29.8334C15.6692 32.1334 17.5331 33.9973 19.8331 34H28.1665C30.4665 33.9973 32.3304 32.1334 32.3331 29.8333V22.7375C32.3331 22.6017 32.3223 22.4675 32.3131 22.3333Z" fill="#F0F0FA"/>
            <defs>
            <linearGradient id="paint0_linear_217:11032" x1="-19.8519" y1="66.963" x2="58.0741" y2="-9.18518" gradientUnits="userSpaceOnUse">
            <stop stop-color="#22A595"/>
            <stop offset="1" stop-color="#84D160"/>
            </linearGradient>
            </defs>
            </svg>

            {{fileName}}
            </div>
         <div class="integration-modal-files__input" v-else>{{fileName}} </div>
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
           if(props.name){
               fileName.value = props.name
           
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
           number,
           
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
        display:flex;
        align-items: center;
      &::-webkit-input-placeholder {color:#40406B;}
            &::-moz-placeholder {color:#40406B;}
            &:-moz-placeholder {color:#40406B;}
            &:-ms-input-placeholder {color:#40406B;}
            &-img{
                margin-right:16px;
            }
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