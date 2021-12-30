<template>
    <div class = "settings-integration-message">
        <div class="settings-integration-message__title">Сообщение</div>
        <div class="settings-integration-message__input">
            <div class="scroll" ref="container" @click.self="scrollTo">
                <div class="scroll__bar" ref="scrollbar"></div>
            </div>
            <textarea class="settings-integration-message__input-text settings-integrations-form__input_test" 
            placeholder="" ref="content" v-model="textMessage" @change="checkMesage"></textarea>
               <div class="settings-integration-message__input-elems">
                <div class="settings-integration-message__input-elems-flex">
                    <div class="settings-integration-message__input-elems-emoji pointer">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" @click="openEmojiBlock">
                        <path d="M10 19C7.59602 19 5.33593 18.0638 3.63602 16.364C1.93618 14.6641 1 12.404 1 10C1 7.59602 1.93618 5.33593 3.63602 3.63602C5.33593 1.93618 7.59602 1 10 1C12.404 1 14.6641 1.93618 16.364 3.63602C18.0638 5.33593 19 7.59602 19 10C19 12.404 18.0638 14.6641 16.364 16.364C14.6641 18.0638 12.404 19 10 19ZM10 2.40625C5.81279 2.40625 2.40625 5.81279 2.40625 10C2.40625 14.1872 5.81279 17.5938 10 17.5938C14.1872 17.5938 17.5938 14.1872 17.5938 10C17.5938 5.81279 14.1872 2.40625 10 2.40625ZM13.2954 11.5535C12.9678 11.345 12.5332 11.4415 12.3248 11.7692C12.3161 11.7828 11.4411 13.1311 9.96484 13.1311C8.48863 13.1311 7.61359 11.7828 7.60491 11.7692C7.39643 11.4416 6.96187 11.345 6.63425 11.5535C6.30662 11.762 6.21005 12.1966 6.41853 12.5241C6.47084 12.6063 7.72536 14.5373 9.96484 14.5373C12.2043 14.5373 13.4588 12.6064 13.5112 12.5241C13.7196 12.1965 13.6231 11.762 13.2954 11.5535ZM6.73047 6.80078C7.21587 6.80078 7.60938 7.19428 7.60938 7.67969C7.60938 8.16509 7.21587 8.55859 6.73047 8.55859C6.24507 8.55859 5.85156 8.16509 5.85156 7.67969C5.85156 7.19428 6.24507 6.80078 6.73047 6.80078ZM12.3906 7.67969C12.3906 8.16509 12.7841 8.55859 13.2695 8.55859C13.7549 8.55859 14.1484 8.16509 14.1484 7.67969C14.1484 7.19428 13.7549 6.80078 13.2695 6.80078C12.7841 6.80078 12.3906 7.19428 12.3906 7.67969Z" fill="#9797BB"/>
                        </svg>
                    </div>
                    <div class="settings-integration-message__input-elems-files pointer">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" @click="openFileBlock">
                        <path d="M9.29275 17.6036L18.8217 8.24795C19.0593 8.01431 19.0596 7.63593 18.8217 7.4012C18.5833 7.16792 18.1969 7.16792 17.9589 7.4012L8.43038 16.7576C7.01181 18.1512 4.70263 18.1512 3.28406 16.7576C1.86548 15.3647 1.86548 13.098 3.28442 11.7044L12.2447 2.90609C13.2068 1.96141 14.7735 1.96141 15.7352 2.90609C16.6973 3.85004 16.6969 5.38873 15.7348 6.33341L7.99077 13.9372C7.50972 14.4089 6.72838 14.4096 6.24697 13.9365C5.76666 13.466 5.76702 12.6988 6.24807 12.2265L13.0249 5.5709C13.2625 5.33689 13.2629 4.95852 13.0245 4.72415C12.7866 4.4905 12.4005 4.4905 12.1622 4.72415L5.38461 11.379C4.42838 12.3175 4.42728 13.8462 5.38314 14.7847C6.34047 15.7236 7.89691 15.7236 8.85387 14.7847L16.5983 7.18124C18.0367 5.76891 18.0363 3.47059 16.5983 2.05862C15.1599 0.647008 12.8196 0.647008 11.3816 2.05934L2.42132 10.8566C0.526467 12.7175 0.526101 15.7441 2.42096 17.605C4.31582 19.4656 7.39753 19.4649 9.29275 17.6036Z" fill="#9797BB"/>
                        </svg>
                    </div> 
                </div>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.8409 0.159095C7.62878 -0.0530321 7.28485 -0.0530316 7.07272 0.159096L0.159096 7.07272C-0.0530318 7.28485 -0.0530319 7.62878 0.159095 7.8409C0.371223 8.05303 0.71515 8.05303 0.927277 7.8409L7.8409 0.927276C8.05303 0.715149 8.05303 0.371223 7.8409 0.159095ZM7.8409 3.23182C7.62878 3.01969 7.28485 3.01969 7.07272 3.23182L3.23182 7.07272C3.01969 7.28485 3.01969 7.62878 3.23182 7.8409C3.44395 8.05303 3.78787 8.05303 4 7.8409L7.8409 4C8.05303 3.78787 8.05303 3.44395 7.8409 3.23182Z" fill="#9797BB"/>
                </svg>
            </div> 
        </div>
        <Picker
            v-show="openedEmojiPicker"
            :data="emojiIndex"
            :showPreview="false"
            style="width: 100%; position: absolute; left: 0; bottom: -15px;"
            set="apple"
            @select="addEmoji"
            ></Picker>
        <SettingsIntegrationsModalFiles @close="openedFileModal = false"  v-show="openedFileModal" @saveFile ='getDataFile' :name='fileName'></SettingsIntegrationsModalFiles>
    </div>
</template>
<script>
 import { ref, reactive, onMounted, watch } from "vue";
import { Picker } from "../../emoji-component/src";
import {useEmoji} from "../../../composition/useEmoji";
import {useCustomScroll} from "../../../composition/useCustomScroll";
import SettingsIntegrationsModalFiles from "./SettingsIntegrationsModalFiles"
export default {
    components: { Picker, SettingsIntegrationsModalFiles},
    emits: ["propText", "dataFile"],
    props: {
        text:String,
        nameFile:String,
    },
    setup(props,{emit}) {
        const openedEmojiPicker = ref(false);
        const textarea = ref();
        const textMessage = ref('');
        const fileName=ref('');
        const checkProps = ref(true);
        const openedFileModal = ref(false);
            onMounted(() => {
                textarea.value = document.querySelector('.settings-integration-message__input-text');
            })
            const { container, content, scrollbar, scrollTo } = useCustomScroll();
           const { emojiIndex, emojiToHtml, wrapEmoji } = useEmoji()
            const addEmoji = (emoji) => {
               textMessage.value += emoji.native
                textarea.value.value+=emoji.native
              
            }
            const wrapTab = (text) => {
                return text.replace(/\n/g, '<br>')
            }
            const openEmojiBlock = (item) => {
                openedEmojiPicker.value =!openedEmojiPicker.value;
                openedFileModal.value = false
                ScrollToBottom()
            }
            const getDataFile = (data) => {
                emit('dataFile', data)
            }
            const openFileBlock = (item) => {
                openedFileModal.value =!openedFileModal.value;
                openedEmojiPicker.value = false
                ScrollToBottom()
            }
            const checkMesage = () => {
                emit("propText", textMessage.value)
            }
            watch(()=>{
            if(checkProps.value){
                textMessage.value=props.text; 
           fileName.value = props.nameFile;
           checkProps.value = false;
            }
           if(textMessage.value!=null){
               checkMesage()
           }
        })
        return {
            openedEmojiPicker,
            emojiIndex,
            emojiToHtml,
            wrapEmoji,
            addEmoji,
            wrapTab,
            textarea,
            container, 
            content, 
            scrollbar, 
            scrollTo,
            openedFileModal,
            openEmojiBlock,
            openFileBlock,
            textMessage,
            checkMesage,
            getDataFile,
            fileName,
            checkProps
        }
    },
}
</script>
<style lang="scss">
.settings-integration-message{
    position: relative;
    width: 73%; 
    margin-right:16px;
    .emoji-mart-static{
        bottom:30px !important;
    }
    &__title{
    font-size: 14px;
    line-height: 130%;
    color: #CFCFE4;
   
    text-align: left;
    padding-bottom: 8px;
    position: relative;
    }
    &__input{
        position: relative;
        &-elems{
        display: flex;
        width: 99%;
        left: 2px;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        bottom: 5px;
        padding: 0px 10px;
        background-color:var(--messenger-search-input-bg-active);
        height: 35px;
        &-flex{
            display: flex;
        }
        &-emoji{
          padding-right: 12px;  
        }
        }
        &-text{
          height: 200px;
        }
    }
.settings-integrations-form__input_test{
  font-family: Segoe UI;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  width: 100%;
  margin-left: 50px;
  padding: 8px 10px;
  color: var(--modal-font-color);
  background: var(--messenger-search-input-bg-active) ;
  border: 1px solid var(--settings-nav-border) ;
  box-sizing: border-box;
  border-radius: 3px;
  text-align: left;
  min-width: 159px;
  position: relative;
  &::placeholder{
    color: #40406B;
  }
}
    .settings-integrations-form__input_test{
        margin-left: 0px; 
        padding-bottom: 45px;
        height: 608px;
        max-height: 608px;
        overflow: auto;
        -ms-overflow-style: none;
        scrollbar-width: none;
        &::-webkit-scrollbar {
        width: 0;
        height: 0;
        }
}

}
</style>