<template>
<div class="switcher">
  <div class="switcher__checkbox">
    <label class="switcher__label">
      <input class="switcher__input" type="checkbox" v-model="check" />
      <span class="slider round"></span>
    </label>
    <div>{{title}}</div>
    </div>
                    <div class="settings-integrations-form__container" v-if="needInput">
                    <button @click="openAcc" class="settings-integrations-form__input_test " > 
                        <div class="settings-integrations-form__dropdown-inner" :class="{'settings-integrations-form__dropdown-inner_placeholder':(textOption=='Выбрать')}"> <!--{{textOption}}-->
                            <svg class="settings-integrations-form__dropdown-inner-arrow" width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.1888 2.46058C4.16403 2.48338 4.1346 2.50147 4.1022 2.51381C4.06981 2.52615 4.03508 2.5325 4 2.5325C3.96492 2.5325 3.93019 2.52615 3.8978 2.51381C3.8654 2.50147 3.83597 2.48338 3.8112 2.46058L1.36591 0.215245C1.21591 0.0774725 1.01243 4.67421e-05 0.800243 7.24799e-07C0.588055 -4.52925e-05 0.384538 0.0772927 0.234464 0.215001C0.084389 0.352709 5.0074e-05 0.539506 6.11966e-08 0.7343C-4.99516e-05 0.929095 0.0841932 1.11593 0.234197 1.2537L2.68002 3.49904C3.03044 3.81985 3.50512 4 4 4C4.49488 4 4.96956 3.81985 5.31998 3.49904L7.7658 1.2537C7.91581 1.11593 8.00005 0.929095 8 0.7343C7.99995 0.539506 7.91561 0.352709 7.76554 0.215001C7.61546 0.0772928 7.41194 -4.52111e-05 7.19976 8.01112e-07C6.98757 4.68134e-05 6.78409 0.0774725 6.63409 0.215245L4.1888 2.46058Z" fill="#9797BB">
                                </path>
                            </svg>
                        </div>
                        <div class="settings-integrations-form__dropdown-list" v-if="statusAccSelect">
                            <div  class="settings-integrations-form__dropdown-item" v-for=" n in 10"  @click="chooseOption(whatsapp.phone), chooseId(whatsapp.whatsapp_id, 'whatsapp')">
                                <svg class="settings-integrations-form__dropdown-image" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_675:274)">
                                                <path d="M4.22905 13.7034L4.49061 13.8327C5.58061 14.479 6.8013 14.7807 8.02205 14.7807C11.8586 14.7807 14.9976 11.678 14.9976 7.88591C14.9976 6.07606 14.2564 4.30927 12.9485 3.01648C11.6406 1.72369 9.89667 0.99115 8.02205 0.99115C4.18549 0.99115 1.04642 4.09379 1.09005 7.92903C1.09005 9.22176 1.48242 10.4715 2.13636 11.5487L2.31074 11.8073L1.61324 14.3498L4.22905 13.7034Z" fill="#18CA7F"/>
                                                <path d="M13.6896 2.32698C12.2073 0.81878 10.1582 0 8.0655 0C3.61863 0 0.043625 3.57665 0.0871875 7.92896C0.0871875 9.30792 0.479562 10.6438 1.13356 11.8504L0 15.9442L4.22894 14.8668C5.40606 15.5133 6.71394 15.8149 8.02194 15.8149C12.4253 15.8149 16.0002 12.2382 16.0002 7.88596C16.0002 5.77439 15.1718 3.79212 13.6896 2.32698ZM8.0655 14.4791C6.88838 14.4791 5.71125 14.1775 4.7085 13.5742L4.44694 13.4449L1.91831 14.0912L2.57225 11.635L2.39788 11.3764C0.479563 8.31691 1.39512 4.26613 4.53412 2.37004C7.67312 0.474008 11.7277 1.37897 13.646 4.48161C15.5642 7.58425 14.6487 11.5918 11.5098 13.4879C10.5069 14.1343 9.28625 14.4791 8.0655 14.4791ZM11.9021 9.69588L11.4225 9.4804C11.4225 9.4804 10.725 9.17875 10.289 8.96327C10.2454 8.96327 10.2018 8.92015 10.1582 8.92015C10.0274 8.92015 9.94019 8.96327 9.853 9.00639C9.853 9.00639 9.80944 9.04945 9.19906 9.73893C9.15544 9.82511 9.06825 9.86823 8.98106 9.86823H8.93744C8.89387 9.86823 8.80669 9.82511 8.76306 9.78205L8.54506 9.69588C8.0655 9.4804 7.62956 9.22181 7.28075 8.8771C7.19356 8.79092 7.06275 8.70474 6.97556 8.61856C6.67038 8.31691 6.36519 7.97214 6.14725 7.58431L6.10362 7.49813C6.06006 7.45501 6.06006 7.41195 6.01644 7.32578C6.01644 7.2396 6.01644 7.15342 6.06006 7.1103C6.06006 7.1103 6.23444 6.89483 6.36519 6.76559C6.45244 6.67935 6.496 6.55012 6.58319 6.46394C6.67038 6.33464 6.714 6.16229 6.67037 6.03299C6.62681 5.81751 6.10363 4.65402 5.97288 4.39549C5.88563 4.26619 5.7985 4.22314 5.66769 4.18002H5.18813C5.10088 4.18002 5.01375 4.22314 4.9265 4.22314L4.88287 4.26619C4.79569 4.30931 4.7085 4.39549 4.62131 4.43855C4.53413 4.52479 4.4905 4.6109 4.40331 4.69714C4.09813 5.08497 3.92375 5.55898 3.92375 6.03299C3.92375 6.3777 4.01094 6.72247 4.14175 7.02412L4.18538 7.15342C4.57775 7.97214 5.10088 8.70474 5.7985 9.3511L5.97288 9.52346C6.10363 9.65276 6.23444 9.73893 6.32163 9.86817C7.23719 10.6439 8.2835 11.2041 9.46062 11.5057C9.59144 11.5488 9.76581 11.5488 9.89662 11.5919H10.3326C10.5506 11.5919 10.8121 11.5057 10.9866 11.4196C11.1173 11.3334 11.2045 11.3334 11.2917 11.2472L11.3789 11.161C11.4661 11.0748 11.5533 11.0317 11.6405 10.9455C11.7277 10.8594 11.8149 10.7732 11.8585 10.6869C11.9457 10.5146 11.9893 10.2991 12.0329 10.0837V9.78205C12.0329 9.78205 11.9892 9.73893 11.9021 9.69588Z" fill="white"/>
                                                </g>
                                                <defs>
                                                <clipPath id="clip0_675:274">
                                                <rect width="16" height="16" fill="white"/>
                                                </clipPath>
                                                </defs>
                                            </svg>
                                        n
                            </div>
                            
                        </div>
                    </button>
                </div>
  </div>
</template>

<script>
import {onUpdated, ref} from "vue"
export default {
  props:{
    model:Boolean,
    title:String,
    index: Number,
    needInput:Boolean,
  },
  emits:["model"],

    setup(props, {emit}) {
      const check = ref(props.model);
       onUpdated(()=>{
        save();
       })
     const save = () => {
       emit("saveCheck", check.value, props.index)
     }
     const statusAccSelect = ref(false);
     const openAcc =  () => {
            statusAccSelect.value=!statusAccSelect.value;
            //  if(statusAccSelect.value){
            //  checkOpenModal(statusAccSelect)   
            // }
        }
     return{
       save,
       check,
       openAcc,
       statusAccSelect
     }   
    },
}
</script>
<style lang="scss">
.switcher{
display: flex;
align-items: flex-start;
flex-direction: column;
&__checkbox{
display: flex;
align-items: center
}
.switcher__label { 
  position: relative; 
  display: inline-block; 
  width: 31px; 
  margin-right: 16px;
  height: 18px;
input {  
  opacity: 0; 
  width: 0; 
  height: 0; 
} 
 
.slider { 
  position: absolute; 
  cursor: pointer; 
  top: 0; 
  left: 0; 
  right: 0; 
  bottom: 0.5px; 
  background-color: transparent; 
  -webkit-transition: .4s; 
  transition: .4s; 
    border: 1px solid #9797BB;
} 
 
.slider:before { 
  position: absolute; 
  content: ""; 
  height: 14px; 
  width: 14px; 
  left: 1px; 
  bottom: 0.5px; 
  background: linear-gradient(45.66deg, #22A595 -40.44%, #84D160 120.07%);
  -webkit-transition: .4s; 
  transition: .4s; 
  background: #9797BB;
} 
 
input:checked + .slider { 
 background-color: transparent;
    border: 1px solid  #5EC075;
} 

 
input:focus + .slider { 
  box-shadow: 0 0 1px #2196F3; 
} 
 
input:checked + .slider:before { 
  -webkit-transform: translateX(13px); 
  -ms-transform: translateX(13px); 
  transform: translateX(13px); 
    background: linear-gradient(45.66deg, #22A595 -40.44%, #84D160 120.07%);
} 
 
/* Rounded sliders */ 
.slider.round { 
  border-radius: 34px; 
} 
 
.slider.round:before { 
  border-radius: 50%; 
} 
} 
}
</style>