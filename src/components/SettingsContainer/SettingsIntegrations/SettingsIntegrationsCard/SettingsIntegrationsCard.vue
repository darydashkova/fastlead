<template>
  <div class="settings-integration-card " >
    <div class="settings-integration-card__title ">
      <img :src="img" class="settings-integration-card__title-img" >
      <div class="settings-integration-card__title_active" v-if="active">
        Активный
      </div>
      <div class="settings-integration-card__title_no-active" v-else>
        Неактивный
      </div>
    </div>
    <div class="settings-integration-card__name">{{ name }}</div>
    <div v-if="active" class="settings-integration-card__button">
      <div class="settings-integration-card__button-delete pointer" @click="del()">
        Удалить
      </div>
      <div class="settings-integration-card__button-edit pointer"  @click="connect()"> 
        Редактировать 
      </div>
    </div>
    <div v-else class="settings-integration-card__button-add pointer" @click="plug">
      Подключить 
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import {integrationHeader} from "../../../../views/settings/integrations/integrationHeader/integrationHeader.js";
export default {
  props: {
    img: String,
    active: String,
    name: String,
    activelink: String,
  },
  setup(props, {emit}) {
    const {activateForm, isAmoClick} = integrationHeader();
   
    const connect = () => {
      emit("connect");
    }
    if(activateForm()){
      //  connect();
    }
    const del = () => {
      emit("del");
    }  
  
    const plug = () =>{
           emit("plug");
    }
   emit("connectEdit");
    onMounted({
      
    })
    return {
      connect,
      del,
    isAmoClick,
    plug
    }
  },
};
</script>
<style lang="scss">
.settings-integration-card {
  margin-left:20px ;
  margin-top: 20px;
  width: 272px;
  background-color: var(--modal-bg-color);
  border-radius: 9px;
  padding: 22px;
  &__title {
    display: flex;
    justify-content: space-between;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border-integration-card);
    &_active {
      padding: 4px 8px;
      color: #5ec075;
      background: rgba(94, 192, 117, 0.1);
      height: fit-content;
      font-size: 12px;
      line-height: 130%;
      border-radius: 22px;
    }
    &_no-active {
      padding: 4px 8px;
      color: #eb5757;
      background: rgba(235, 87, 87, 0.1);
      height: fit-content;
      font-size: 12px;
      line-height: 130%;
      border-radius: 22px;
    }
    &-img{
      width: 62px;
      height:62px;
    }
  }
  &__name {
    text-align: left;
    padding: 16px 0px;
    font-weight: 600;
    font-size: 16px;
    line-height: 130%;
    color: #f0f0fa;
  }
  &__button {
    display: flex;
    justify-content: space-between;
    &-edit {
      color: #9797bb;
    }
    &-delete {
      color: #eb5757;
    }
    &-delete,
    &-edit {
      font-size: 14px;
      line-height: 130%;
      border: 1px solid var(--border-integration-card);
      padding: 4px 12px;
      border-radius: 4px;
    }
    &-add {
      width: 100%;
      padding: 4px 0px;
      font-size: 14px;
      line-height: 130%;
      background: linear-gradient(45.66deg, #22a595 -40.44%, #84d160 120.07%);
      -webkit-background-clip: text;
       border: 1px solid var(--border-integration-card);
       border-radius: 4px;
      -webkit-text-fill-color: transparent;
      display: block;
    }
  }
}
</style>