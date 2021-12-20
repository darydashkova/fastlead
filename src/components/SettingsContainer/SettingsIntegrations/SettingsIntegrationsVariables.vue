<template>
    <div class="settings-integration-variables">
        <div class="settings-integration-variables-title">Какие переменные можно использовать в сообщениях?</div>
        <div class="settings-integration-variables_height">
            <div class="settings-integration-variables_height-relative">
        <div v-for="(variable, index) in variables" :key="index" class="settings-integration-variables__copy" >
            <div class="settings-integration-variables__copy-title">
                <div class="settings-integration-variables__copy-title-name"> {{ variable[0] }}<pre class="settings-integration-variables__copy-hyphen"> - </pre></div>
                <div  class="settings-integration-variables__copy-title-description"> {{ variable[1] }}</div> 
            </div>
            <svg @click="pasteText( variable[0])" class="pointer settings-integration-variables__img" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 13.3333L3.33333 13.3333C2.4496 13.3323 1.60237 12.9807 0.97748 12.3559C0.352588 11.731 0.00105857 10.8837 0 10L0 3.33333C0.00105857 2.4496 0.352588 1.60237 0.97748 0.97748C1.60237 0.352588 2.4496 0.00105857 3.33333 0L10 0C10.8837 0.00105857 11.731 0.352588 12.3559 0.97748C12.9807 1.60237 13.3323 2.4496 13.3333 3.33333L13.3333 10C13.3323 10.8837 12.9807 11.731 12.3559 12.3559C11.731 12.9807 10.8837 13.3323 10 13.3333ZM3.33333 1.33333C2.8029 1.33333 2.29419 1.54405 1.91912 1.91912C1.54405 2.29419 1.33333 2.8029 1.33333 3.33333L1.33333 10C1.33333 10.5304 1.54405 11.0391 1.91912 11.4142C2.29419 11.7893 2.8029 12 3.33333 12L10 12C10.5304 12 11.0391 11.7893 11.4142 11.4142C11.7893 11.0391 12 10.5304 12 10L12 3.33333C12 2.8029 11.7893 2.29419 11.4142 1.91912C11.0391 1.54405 10.5304 1.33333 10 1.33333L3.33333 1.33333ZM16 12.6667V4C16 3.82319 15.9298 3.65362 15.8047 3.5286C15.6797 3.40357 15.5101 3.33333 15.3333 3.33333C15.1565 3.33333 14.987 3.40357 14.8619 3.5286C14.7369 3.65362 14.6667 3.82319 14.6667 4L14.6667 12.6667C14.6667 13.1971 14.456 13.7058 14.0809 14.0809C13.7058 14.456 13.1971 14.6667 12.6667 14.6667L4 14.6667C3.82319 14.6667 3.65362 14.7369 3.5286 14.8619C3.40357 14.987 3.33333 15.1565 3.33333 15.3333C3.33333 15.5101 3.40357 15.6797 3.5286 15.8047C3.65362 15.9298 3.82319 16 4 16L12.6667 16C13.5504 15.9989 14.3976 15.6474 15.0225 15.0225C15.6474 14.3976 15.9989 13.5504 16 12.6667Z" fill="#CFCFE4"/>
            </svg>
        </div>
         <div class="settings-integration-variables__copy settings-integration-variables__show" >
            <div class="settings-integration-variables__copy-title">
                <div  class="settings-integration-variables__copy-title-description">Образец</div> 
            </div>
           <svg  @click="copySample,openModal = !openModal"   width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="pointer settings-integration-variables__img">
            <path d="M11.75 9.33334C11.75 9.51015 11.6815 9.67972 11.5596 9.80474C11.4377 9.92977 11.2724 10 11.1 10L5.9 10C5.7276 10 5.56227 9.92977 5.44038 9.80474C5.31848 9.67972 5.25 9.51015 5.25 9.33334C5.25 9.15653 5.31848 8.98696 5.44038 8.86194C5.56227 8.73691 5.7276 8.66667 5.9 8.66667L11.1 8.66667C11.2724 8.66667 11.4377 8.73691 11.5596 8.86194C11.6815 8.98696 11.75 9.15653 11.75 9.33334ZM9.14999 11.3333H5.9C5.7276 11.3333 5.56227 11.4036 5.44038 11.5286C5.31848 11.6536 5.25 11.8232 5.25 12C5.25 12.1768 5.31848 12.3464 5.44038 12.4714C5.56227 12.5964 5.7276 12.6667 5.9 12.6667H9.14999C9.32238 12.6667 9.48771 12.5964 9.60961 12.4714C9.73151 12.3464 9.79999 12.1768 9.79999 12C9.79999 11.8232 9.73151 11.6536 9.60961 11.5286C9.48771 11.4036 9.32238 11.3333 9.14999 11.3333ZM15 6.99001L15 12.6667C14.999 13.5504 14.6562 14.3976 14.0469 15.0225C13.4377 15.6474 12.6116 15.9989 11.75 16L5.25 16C4.38836 15.9989 3.56231 15.6474 2.95304 15.0225C2.34377 14.3976 2.00103 13.5504 2 12.6667L2 3.33335C2.00103 2.44962 2.34377 1.60239 2.95304 0.977494C3.56231 0.352603 4.38836 0.00107394 5.25 1.53658e-05L8.18474 1.53658e-05C8.78249 -0.00156258 9.37462 0.118407 9.92689 0.352988C10.4792 0.587569 10.9806 0.932106 11.4022 1.36668L13.6668 3.69068C14.0908 4.12284 14.4269 4.63698 14.6558 5.20333C14.8846 5.76967 15.0016 6.37696 15 6.99001ZM10.4831 2.30935C10.2786 2.10612 10.0489 1.9313 9.79999 1.78935V4.66668C9.79999 4.84349 9.86847 5.01306 9.99037 5.13808C10.1123 5.26311 10.2776 5.33334 10.45 5.33334L13.2554 5.33334C13.1169 5.07814 12.9462 4.84277 12.7477 4.63334L10.4831 2.30935ZM13.7 6.99001C13.7 6.88001 13.6792 6.77468 13.6694 6.66668L10.45 6.66668C9.93282 6.66668 9.43683 6.45596 9.07113 6.08089C8.70544 5.70582 8.49999 5.19711 8.49999 4.66668V1.36468C8.39469 1.35468 8.29134 1.33335 8.18474 1.33335L5.25 1.33335C4.73282 1.33335 4.23684 1.54406 3.87114 1.91913C3.50544 2.29421 3.3 2.80291 3.3 3.33335L3.3 12.6667C3.3 13.1971 3.50544 13.7058 3.87114 14.0809C4.23684 14.456 4.73282 14.6667 5.25 14.6667L11.75 14.6667C12.2672 14.6667 12.7631 14.456 13.1288 14.0809C13.4945 13.7058 13.7 13.1971 13.7 12.6667L13.7 6.99001Z" fill="#CFCFE4"/>
            </svg>
            <div v-show="openModal"   @mouseleave="openModal = false" :class="{'settings-integration-variables__modal':openModal}">
            <SettingsIntegrationModalSample  :copyText="copyText" @copiedText ="getText"></SettingsIntegrationModalSample>
            </div>
        </div> 
        </div>
    </div>
    </div>
</template>
<script>
import SettingsIntegrationModalSample from   "./SettingsIntegrationModalSample/settings-integration-modal-sample";
import {ref, onMounted} from   "vue";
export default {
    components: {
        SettingsIntegrationModalSample
    },
    setup() {
        const openModal = ref(false);
        const variables = ref([['[@clientName]', 'имя клиента'], ['[@dateAndTime]', 'дата и время'], ['[@masterName]', 'имя мастера'], ['[@serviceName]', 'название услуги (услуг)']])
        const copyText = ref(true)
        const clickCopy =ref('');
        const pasteText = (event) => {
                const el = document.createElement('textarea');
                el.value = event;
                el.setAttribute('readonly', '');
                el.style.position = 'absolute';
                el.style.left = '-9999px';
                document.body.appendChild(el);
                el.select();
                document.execCommand('copy');
                document.body.removeChild(el);
                }
                const copySample = () => {
                    pasteText(clickCopy.value)
                }

                const getText = (text, bool) => {
                    clickCopy.value = text;
                }
              
        return{
            variables,
            openModal,
            pasteText,
            copyText,
            copySample,
            getText,
            clickCopy
            
        }
    },
}
</script>
<style lang="scss">
.settings-integration-variables{
    width:36%;
    &-title{
    font-size: 14px;
    line-height: 130%;
    color: #CFCFE4;
    text-align: left;
    padding-bottom: 8px;
    }
&__modal{
 right: 0;
    width: 400px;
    height: 350px;
    position: absolute;
    /* display: none; */
    bottom: 0;
}
    &__copy{
        display: flex;
        width: 100%;
        justify-content: space-between;
        font-family: Segoe UI;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 19px;
        width: 100%;
        padding: 8px 10px;
        color: var(--modal-font-color);
        background:var(--messenger-search-input-bg-active);
        border: 0.7px solid var(--settings-nav-border);
        border-radius: 3px;
        margin-bottom: 4px;
        &-hyphen{
            margin:0px;
        }
        &-title{
            display: flex;
            align-items: center;
             &-description{
           font-size: 14px; 
           color: #9797BB;
            line-height: 130%;  
        }
         &-name{
            font-size: 14px;
            line-height: 130%;
            display: flex;
            align-items: center;
            padding-right: 5px;
            }
        }
    }
    &_height{
        overflow: auto;
        max-height: 590px;
        height: 100%;
        -ms-overflow-style: none;
        scrollbar-width: none;
        display: contents;
        &::-webkit-scrollbar {
        width: 0;
        height: 0;
        }
        &-relative{
            position: relative;
            display: contents;
        }

    }
    &__show{
        position: relative;
    }
    &__img{
        min-width:16px;
    }
}
</style>