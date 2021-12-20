<template>
<div class="switcher">
    <label class="switcher__label">
      <input class="switcher__input" type="checkbox" v-model="check" />
      <span class="slider round"></span>
    </label>
    <div>{{title}}</div>
  </div>
</template>

<script>
import {onUpdated, ref} from "vue"
export default {
  props:{
    model:Boolean,
    title:String,
    index: Number,
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
     return{
       save,
       check
     }   
    },
}
</script>
<style lang="scss">
.switcher{
display: flex;
align-items: center;
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