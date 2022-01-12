<template>
<div class="shadows" @click="closeModal">
     <teleport to="body" v-if="loading">
                <FullScreenLoader ></FullScreenLoader>
    </teleport>
    <div class="settings-chats ">
        <div class="settings-chats__title">Подключение к онлайн-чатам</div>
        <svg class="settings-chats__close pointer" @click='close' width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.5002 7.49989C22.2658 7.26556 21.9479 7.13391 21.6164 7.13391C21.285 7.13391 20.9671 7.26556 20.7327 7.49989L15.0002 13.2324L9.26767 7.49989C9.03326 7.26556 8.71537 7.13391 8.38392 7.13391C8.05246 7.13391 7.73458 7.26556 7.50017 7.49989C7.26583 7.7343 7.13419 8.05219 7.13419 8.38364C7.13419 8.7151 7.26583 9.03298 7.50017 9.26739L13.2327 14.9999L7.50017 20.7324C7.26583 20.9668 7.13419 21.2847 7.13419 21.6161C7.13419 21.9476 7.26583 22.2655 7.50017 22.4999C7.73458 22.7342 8.05246 22.8659 8.38392 22.8659C8.71537 22.8659 9.03326 22.7342 9.26767 22.4999L15.0002 16.7674L20.7327 22.4999C20.9671 22.7342 21.285 22.8659 21.6164 22.8659C21.9479 22.8659 22.2658 22.7342 22.5002 22.4999C22.7345 22.2655 22.8662 21.9476 22.8662 21.6161C22.8662 21.2847 22.7345 20.9668 22.5002 20.7324L16.7677 14.9999L22.5002 9.26739C22.7345 9.03298 22.8662 8.7151 22.8662 8.38364C22.8662 8.05219 22.7345 7.7343 22.5002 7.49989Z" fill="#9797BB"/>
        </svg>
        <div class="settings-chats__number">
            <div class="settings-chats__number-title">Выберите канал, который хотите подключить к онлайн-чатам</div>
            <div class="settings-chats__number_padding scroll-poiner">
                <BaseSearchInput :placeholder="'Поиск'" @searchValue='searchValue'></BaseSearchInput>
                <div class="settings-chats__number-data">
                    <div class="settings-chats__number-data-item">
                        <input type="radio" value="" v-model="empty" @click="checkRadio(empty)" >
                        <div class="settings-chats__number-data-item-info settings-chats__number-data-item_border">
                            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 0C32.598 0 42 9.40201 42 21C42 32.598 32.598 42 21 42C9.40201 42 0 32.598 0 21C0.0125504 9.40718 9.40718 0.0125508 21 0ZM14 25.5272C13.2889 26.1817 13.243 27.2888 13.8975 28C14.552 28.7111 15.6591 28.757 16.3702 28.1025C16.4058 28.0698 16.44 28.0356 16.4728 28L21 23.4745L25.5255 28C26.2207 28.6714 27.3285 28.6521 28 27.9569C28.6549 27.2788 28.6549 26.2037 28 25.5255L23.4745 21L28 16.4745C28.6714 15.7793 28.6521 14.6715 27.9569 14C27.2788 13.3451 26.2037 13.3451 25.5255 14L21 18.5255L16.4728 14C15.8183 13.2889 14.7112 13.243 14 13.8975C13.2889 14.552 13.243 15.6591 13.8975 16.3702C13.9302 16.4058 13.9644 16.44 14 16.4728L18.5255 21L14 25.5272Z" fill="#40406B"/>
                            </svg>
                            <div class="settings-chats__number-data-empty-choise">
                                <div class="settings-chats__base-title">Не выбрано</div>
                                <div class="settings-chats__base-name">Не подключать канал к онлайн-чатам</div>
                            </div>
                        </div>
                    </div>
                    <template v-if="sameObject">
                        <div class="settings-chats__number-data-item" v-for="(item, index) in sameObject" :key="index">
                            <input type="radio" value="" v-model="sameObject[index][1]"  @click="checkRadio(sameObject[index][1], 'instagram',index)">
                            <div class="settings-chats__number-data-item-info "
                            :class="{'settings-chats__number-data-item_border':(index+1 != sameObject.length)}">
                                <img src="../../../assets/redesign-instagram.svg" class="settings-chats__number-data-item-info-img" v-if="item[0].hasOwnProperty('instagram_id')">
                                <img src="../../../assets/redesign-whatsapp.svg"  class="settings-chats__number-data-item-info-img" v-if="item[0].hasOwnProperty('whatsapp_id')">
                                <div class="settings-chats__number-data-empty-choise">
                                    <template v-if="item[0].hasOwnProperty('login')">
                                        <div class="settings-chats__base-title">{{item[0].login}}</div>
                                        <div class="settings-chats__base-name">Instagram</div>
                                    </template>
                                    <template v-if="item[0].hasOwnProperty('name')">
                                            <div class="settings-chats__base-title">{{item[0].name}}</div>
                                        <div class="settings-chats__base-name">Whatsapp</div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <div class="settings-chats__buttons">
            <div class="base-button base-button_enter base-button_p5-15" @click="save">Готово</div>
            <div class="base-button base-button_border-green" @click='close'>Отмена</div>
        </div>
    </div>
    </div>
</template>
<script>
    import {onMounted, ref, watch} from "vue";
    import { useWhatsapp } from "../../../composition/useWhatsapp";
    import { useInstagram } from "../../../composition/useInstagrams";
    import { useIntegrations } from "../../../composition/useIntegrations";
    import BaseSearchInput from "../../Base/BaseSearchInput";
    import FullScreenLoader from "../../FullScreenLoader";
    export default {
        props: {
            index: Number,
            integration_id:Number,
        },
        components:{BaseSearchInput, FullScreenLoader},
        emits: ['close'],
        setup(props, {emit}) {
            const empty =ref(false)
            const empty1 =ref(false)
            const { whatsapps, getWhatsapps } = useWhatsapp()
            const {getInstagrams, instagrams} = useInstagram()
            const {addOnlineChats, disconnectOnlineChats, getOnlineChats, reconnectOnlineChats} = useIntegrations();
            const loading = ref(false);

            const close = () =>{
                emit('close')
            }

            const chatsObj = ref({
                amocrm_integration_id : null,
                id : null,
                type : ""
            })
            const chatsEmptyObj = ref({
                  amocrm_integration_id: null
            })

            const save = () => {
                const elem = ref();
                elem.value = sameObject.value.filter(i=>i[1]==='')
                
                if(elem.value&&elem.value[0]){
                    if(elem.value[0][0].hasOwnProperty('instagram_id')){
                        chatsObj.value.id = elem.value[0][0].instagram_id
                        chatsObj.value.type='instagram'
                    }
                    else{
                        chatsObj.value.id = elem.value[0][0].whatsapp_id
                        chatsObj.value.type='whatsapp'
                    }
                    chatsObj.value.amocrm_integration_id = props.integration_id;
                    if(chatsActive.value&&chatsActive.value.hasOwnProperty('type')){

                    reconnectOnlineChats(chatsObj.value)

                        emit('close')

                    }
                    else{
                      addOnlineChats(chatsObj.value)

                            emit('close')

                    }    
                }
                else if(empty.value ===''){
                    chatsEmptyObj.value.amocrm_integration_id = props.integration_id;
                    disconnectOnlineChats( chatsEmptyObj.value)

                    emit('close')

                   
                }

                 
            }

            const closeModal = (e) => {

            if(e.target.className === 'shadows'){
                close()
            }
            }
            const searchValue = (search) => {
               
                if(search.value!=''){
                     sameObject.value=[]
                    getInstArray()
                    sameObject.value =  sameObject.value.filter(i=> (i[0].hasOwnProperty('name')&&i[0].name.includes(search.value))||(i[0].hasOwnProperty('login')&&i[0].login.includes(search.value)))
                }
                else{
                    sameObject.value =[]
                    getInstArray();
                }
            }
            const instArray = ref([]);
            const whatsArray = ref([]);
            const sameObject = ref([])
            const getInstArray = () => {
                for(let i = 0; i<instagrams.value.length;i++ ){
                    sameObject.value.push([instagrams.value[i],false])
                }
                
                 for(let i = 0; i<whatsapps.value.length;i++ ){
                     sameObject.value.push([whatsapps.value[i], false])
                }
            }
            const checkRadio = (item, arr, index) =>{
                empty.value=false
                for(let i = 0; i<sameObject.value.length;i++ ){
                        sameObject.value[i][1] = false;
                    }
                   
                   console.log()
                item = true;

            }
        
        const isGetArr=ref(true);
        const chatsActive = ref(null);
        const getChats = () => {
              loading.value=true;
            getOnlineChats()
            .then((r)=>{
                if(r.hasOwnProperty('type')){
                 chatsActive.value = r;
               for(let i = 0; i<sameObject.value.length;i++ ){
                   if(sameObject.value[i][0].hasOwnProperty('instagram_id')){
                       if(sameObject.value[i][0].instagram_id==r.id){
                           sameObject.value[i][1]=''
                       }
                   }
                    else if(sameObject.value[i][0].hasOwnProperty('whatsapp_id')){
                       if(sameObject.value[i][0].whatsapp_id==r.id){
                           sameObject.value[i][1]=''
                       }
                   }
               }   
                }
                else{
                    empty.value=''
                }
                isGetArr.value = false
                loading.value=false;
               console.log( sameObject.value)
            })
        }
        getChats()
        watch(()=>{
            if(isGetArr.value){
                loading.value=true;
                if(instagrams.value&&whatsapps.value&&whatsapps.value[0]&&instagrams.value[0]&&instagrams.value[0].hasOwnProperty('instagram_id')){
        
                        getInstArray();
                        isGetArr.value = false
                }
            
            }            
        })
        onMounted(()=>{
         
        })
            return{
                close,
                whatsapps,
                instagrams,
                sameObject,
                closeModal,
                empty,
                empty1,
                getInstArray,
                checkRadio,
                instArray,
                isGetArr,
                save,
                whatsArray,
                searchValue,
                chatsObj,
                chatsEmptyObj,
                getChats,
                chatsActive,
                loading
                
            }
        },
    }
</script>
<style lang="scss">
.settings-chats{
    position:absolute;
    width:530px;
    background-color: #252544;
    border-radius: 6px;
    z-index: 99;
    top: 25%;
    left: 50%;
    transform: translate(-50% , -25%);
    &__title{
        font-style: normal;
        font-weight: bold;
        font-size: 24px;
        line-height: 24px;
        color: #F0F0FA;
        padding: 22px 24px 31px;
        text-align: left;
    }
    &__close{
    position: absolute;
    top: 19px;
    right: 21px;
    }
    &__number{
        border-top: 1px solid #1D1D35;
        border-bottom: 1px solid #1D1D35;
        &-input{
            font-family: Segoe UI;
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 19px;
            width: 100%;
            padding: 8px 10px;
            color: var(--modal-font-color);
            background:#1D1D35;
            border: 0.7 px solid var(--modal-input-border-color);
            border-radius: 3px;
            text-align: left;
            &::placeholder{
                color: #40406B;
            }
        }
        &-title{
            font-size: 14px;
            line-height: 140%;
            color: #CFCFE4;
            text-align: left;
            padding: 24px 24px 6px;
        }
        &_padding{
            margin: 0px 24px 22px;
            background-color: var(--modal-bg-color);
            border-radius: 6px;
            max-height: 315px;
            padding:16px 24px 0px ;
        }
        &-data{
            display: flex;
            align-items: flex-start;
            justify-content: center;
            flex-direction: column;
                &-empty-choise{
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                margin-left: 12px;
                }
            input[type=radio] {
             position: relative;

                margin-right: 41px;
            }
            input[type=radio]:after {
                top: 50%;
                transform: translateY(-50%);
                width: 20px;
                height: 20px;
                border-radius: 20px;
               
                left: -1px;
                position: absolute;
                background-color: #252544;
                content: '';
                display: inline-block;
                visibility: visible;
                border: 1px solid #40406B;
            }
            input[type=radio]:hover:after {
                width: 20px;
                top: 50%;
                transform: translateY(-50%);
                height: 20px;
                border-radius: 20px;
            
                left: -1px;
                position: absolute;
                background-color: #252544;
                background-image: url('../../../assets/circle-radio-hover.svg');
                background-repeat: no-repeat;
                background-position: center;
                content: '';
                display: inline-block;
                visibility: visible;
                border: 1px solid #40406B;
            }
            input[type='radio']:checked:after {
                top: 50%;
                transform: translateY(-50%);
                width: 20px;
                height: 20px;
                border-radius: 20px;
                position: absolute;
                background-color: #252544;
                content: '';
                display: inline-block;
                visibility: visible;
                border: 1px solid #5EC075;
                background-image: url('../../../assets/circle-radio.svg');
                background-repeat: no-repeat;
                background-position: center;
                    }
        &-item{
            display: flex;
            align-items: center;
            width: 100%;
            &-info{
                width: 100%;
                display: flex;
                padding: 12px 0px;
                &-img{
                    width: 42px;
                    height: 42px;
                }
            }
            &_border{

                border-bottom: 1px solid #252544;
            }
             
        }
        }
  

    }  
    &__buttons{
        display: flex;
        padding: 20px 24px;
        .base-button_enter{
            margin-right: 22px;
            font-weight: 500;
            font-size: 16px;
            line-height: 140%;
            text-align: center;
            color: #252544;
        }
    }
    &__base-title{
        font-size: 16px;
        line-height: 140%;
        color: var(--font-color);
        font-weight: normal;
    }
    &__base-name{
        line-height: 130%;
        font-size: 12px;
        color: var(--sub-text-color);
        font-weight: normal;
    }
}
</style>