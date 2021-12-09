<template>
    <div>
        <div type="text" class="settings-integrations-form__input settings-integrations-form__popup" @click="showPopup(indexItem), showText(indexItem)" @close="close"> 
            <!-- <template v-if="automessageArray[indexItem]">
                <template v-if="automessageArray[indexItem][0]!=null"> 
                    {{automessageArray[indexItem][0]}}
                </template> -->
              <div class="settings-integrations-form_elipsis">      <template v-if="updateMessage&&(updateMessage.hasOwnProperty('type'))">
                    <template v-if="(updateMessage.hasOwnProperty('data'))&&updateMessage?.data&&(updateMessage.data!=null||updateMessage.data!='')&&!updateMessage.hasOwnProperty('caption')">
                      {{updateMessage.data}}
                    </template>
                    <template v-if="updateMessage?.message">
                        {{updateMessage.message}}
                    </template>
                      <template v-if="updateMessage.hasOwnProperty('caption')">
                        <template v-if="updateMessage.caption&&(updateMessage.caption===null||updateMessage.caption==='')">Ввести</template>
                        <template v-if="updateMessage.hasOwnProperty('data')">
                           {{updateMessage.caption}}
                        </template>
                         <template v-else> {{updateMessage.caption}}</template>
                    </template>
                    <template v-if="(updateMessage.hasOwnProperty('data'))&&(updateMessage.data===null||updateMessage.data==='')&&!updateMessage.hasOwnProperty('caption')">Ввести</template>
                  </template>
                <template v-else>Ввести</template></div>
            <svg :class ="{'settings-integrations-form__dropdown-inner-svg_green_no-transform': (isPopup&&(indexPopup==indexItem)) }" class='settings-integrations-form__input-edit' width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg" >
                <g clip-path="url(#clip0)">
                <path d="M14.3255 0.697066L5.18151 9.84107C4.83227 10.1884 4.5554 10.6016 4.36692 11.0567C4.17845 11.5118 4.08212 11.9997 4.08351 12.4923V13.4996C4.08351 13.6985 4.16253 13.8892 4.30318 14.0299C4.44383 14.1705 4.6346 14.2496 4.83351 14.2496H5.84076C6.33333 14.251 6.82129 14.1546 7.27638 13.9662C7.73147 13.7777 8.14465 13.5008 8.49201 13.1516L17.636 4.00757C18.0743 3.56819 18.3204 2.97292 18.3204 2.35232C18.3204 1.73171 18.0743 1.13644 17.636 0.697066C17.1903 0.270986 16.5974 0.0332031 15.9808 0.0332031C15.3641 0.0332031 14.7713 0.270986 14.3255 0.697066ZM16.5755 2.94707L7.43151 12.0911C7.00861 12.5114 6.43702 12.748 5.84076 12.7496H5.58351V12.4923C5.58507 11.8961 5.82169 11.3245 6.24201 10.9016L15.386 1.75757C15.5462 1.60453 15.7592 1.51914 15.9808 1.51914C16.2023 1.51914 16.4153 1.60453 16.5755 1.75757C16.733 1.91545 16.8214 2.12933 16.8214 2.35232C16.8214 2.5753 16.733 2.78918 16.5755 2.94707Z" fill="#9797BB"/>
                <path d="M17.584 6.73425C17.3851 6.73425 17.1943 6.81327 17.0537 6.95392C16.913 7.09457 16.834 7.28534 16.834 7.48425V11.25H13.834C13.2372 11.25 12.665 11.4871 12.243 11.909C11.821 12.331 11.584 12.9033 11.584 13.5V16.5H4.08398C3.48725 16.5 2.91495 16.2629 2.49299 15.841C2.07104 15.419 1.83398 14.8467 1.83398 14.25V3.75C1.83398 3.15326 2.07104 2.58097 2.49299 2.15901C2.91495 1.73705 3.48725 1.5 4.08398 1.5H10.8655C11.0644 1.5 11.2552 1.42098 11.3958 1.28033C11.5365 1.13968 11.6155 0.948912 11.6155 0.75C11.6155 0.551088 11.5365 0.360322 11.3958 0.21967C11.2552 0.0790176 11.0644 0 10.8655 0L4.08398 0C3.08979 0.00119089 2.13665 0.396662 1.43365 1.09967C0.730646 1.80267 0.335175 2.7558 0.333984 3.75L0.333984 14.25C0.335175 15.2442 0.730646 16.1973 1.43365 16.9003C2.13665 17.6033 3.08979 17.9988 4.08398 18H12.5912C13.0839 18.0014 13.572 17.9051 14.0272 17.7166C14.4824 17.5281 14.8957 17.2513 15.2432 16.902L17.2352 14.9085C17.5845 14.5612 17.8615 14.148 18.0501 13.6929C18.2387 13.2378 18.3352 12.7499 18.334 12.2573V7.48425C18.334 7.28534 18.255 7.09457 18.1143 6.95392C17.9737 6.81327 17.7829 6.73425 17.584 6.73425ZM14.1827 15.8415C13.8812 16.1423 13.5 16.3505 13.084 16.4415V13.5C13.084 13.3011 13.163 13.1103 13.3037 12.9697C13.4443 12.829 13.6351 12.75 13.834 12.75H16.7777C16.685 13.1651 16.477 13.5457 16.1777 13.848L14.1827 15.8415Z" fill="#9797BB"/>
                </g>
                <defs>
                <clipPath id="clip0">
                <rect width="18" height="18" fill="white" transform="translate(0.333984)"/>
                </clipPath>
                </defs>
            </svg>
        </div>
        <!-- <template v-if="!updateMessage.caption">123 -->
                <!-- :message="updateMessage.hasOwnProperty('caption')?((updateMessage.caption!=null)?(updateMessage.data?updateMessage.data:updateMessage.caption):updateMessage.message):updateMessage.data"  -->
            <ModalInputAutomessage v-if="isPopup&&(indexPopup==indexItem)" :index = "indexPopup" :show = "isPopup" :arr="arrNum" 
            :message="updateMessage.hasOwnProperty('caption')?((updateMessage.caption!=null)?updateMessage.caption:updateMessage.message):updateMessage.data" 
            @save ="save" :updateMedia='updateMessage'></ModalInputAutomessage>
        <!-- </template>
        <template v-else>
        <ModalInputAutomessage v-if="isPopup&&(indexPopup==indexItem)" :index = "indexPopup" :show = "isPopup" :arr="arrNum" :message="updateMessage.caption" @save ="save" :updateMedia='updateMessage'></ModalInputAutomessage>
     44</template> -->
     </div>               
</template>

<script>
    import {  reactive, ref, watch } from 'vue'
    import {ModalInputAutomessageFunc} from "../../../Modals/integrations/ModalInputAutomessage/modal-input-automessage";
    import ModalInputAutomessage from "../../../Modals/integrations/ModalInputAutomessage/ModalInputAutomessage";
export default {
    props: {
        automessage: String,
        indexItem: Number,
        arrNum: Number, 
        updateMessage:String,
    },
    components: {
        ModalInputAutomessage
        },
        emits:["saveText"],
        setup(props, {emit}) {
        const { showPopup, isPopup, automessage, indexPopup, showText, message,automessageArray, emptyMessage } = ModalInputAutomessageFunc()
        const save = (data) => {
            emit('saveText', data, props.indexItem)
          }
          watch(()=>{

          })
            return {
                showPopup,
                isPopup, 
                automessage, 
                indexPopup,
                message,
                showText,
                automessageArray,
                emptyMessage,
                save
            }
        },
}
</script>
<style lang="scss">
.settings-integrations-form__popup{
    height: 37px;
    position: relative;
    overflow: hidden;
    align-items: flex-start;
    line-height: 23px !important;
    padding-right: 32px !important;
    padding-top: 8px;
    .settings-integrations-form__input-edit{
        position: absolute;
        right: 8px;
        top: 0;
        border-left: 1px solid #252544;
        height: 100%;
        padding-left: 9px;
        min-width: 28px;
    }
}
</style>