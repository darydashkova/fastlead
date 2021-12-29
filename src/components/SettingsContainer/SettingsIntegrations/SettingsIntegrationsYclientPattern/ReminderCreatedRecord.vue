<template>
<div>
     <div class="settings-integrations-form__field">
        <div class="settings-integrations-form__date settings-integrations-form__birthday ">
            <div class="settings-integrations-form__date-column">
                <div>Наименования</div>   
                 <div class="settings-integrations-form__container">            
                    <input class="settings-integrations-form__input_test " v-model="name"  placeholder="Ввести" :class="{'yclient-pattern__error':error.name,
                    'settings-integrations-form__select_active':focusName}"
                     @focus="checkOpenModal(), focusName=true" @blur="focusName=false">  
                     </div>
            </div>
            <!-- <div class="settings-integrations-form__date-column">
                <div>Часовой пояс</div>
                <div class="settings-integrations-form__container">
                    <button @click="openSelect" class="settings-integrations-form__input_test " :class="{'settings-integrations-form__select_active': statusSelect }"> 
                        <div class="settings-integrations-form__dropdown-inner" :class="{'settings-integrations-form__dropdown-inner_placeholder':(timeZoneOption=='Выбрать')}"> {{timeZoneOption}}
                           <svg :class="{'settings-integrations-form__dropdown-inner-svg_green': statusSelect }"  class='settings-integrations-form__dropdown-inner-svg' width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.14053 0.197198C9.07855 0.134713 9.00482 0.0851166 8.92358 0.051271C8.84234 0.0174253 8.7552 0 8.6672 0C8.57919 0 8.49205 0.0174253 8.41081 0.051271C8.32957 0.0851166 8.25584 0.134713 8.19386 0.197198L5.14053 3.25052C5.07855 3.31301 5.00482 3.3626 4.92358 3.39645C4.84234 3.43029 4.7552 3.44772 4.6672 3.44772C4.57919 3.44772 4.49205 3.43029 4.41081 3.39645C4.32957 3.3626 4.25584 3.31301 4.19386 3.25052L1.14053 0.197198C1.07855 0.134713 1.00482 0.0851166 0.92358 0.051271C0.84234 0.0174253 0.755203 0 0.667195 0C0.579187 0 0.49205 0.0174253 0.41081 0.051271C0.329571 0.0851166 0.255837 0.134713 0.193862 0.197198C0.0696944 0.322106 0 0.491073 0 0.667197C0 0.84332 0.0696944 1.01229 0.193862 1.1372L3.25386 4.19719C3.62886 4.57172 4.13719 4.78209 4.6672 4.78209C5.1972 4.78209 5.70553 4.57172 6.08053 4.19719L9.14053 1.1372C9.2647 1.01229 9.33439 0.84332 9.33439 0.667197C9.33439 0.491073 9.2647 0.322106 9.14053 0.197198Z" fill="#CFCFE4"/>
                        </svg>
                        </div>
                            <div class="settings-integrations-form__dropdown-list settings-integrations-form__dropdown-list_max-height" v-if="statusSelect">
                                <div  class="settings-integrations-form__dropdown-item" v-for=" (item, index) in timeZones" :key="index" @click="chooseAcc">
                                    (GMT {{item.time}}:00) {{item.city}}
                                </div>
                            </div>
                    </button>
                </div>
            </div>  -->
            <div class="settings-integrations-form__date-column">
            <div>Напомнить за N часов </div>
             <div class="settings-integrations-form__container">
                    <input class="settings-integrations-form__input_test " type="number" placeholder="0" v-model="NDay" :class="{'yclient-pattern__error':error.nhourse,
                    'settings-integrations-form__select_active':focusDay}"
                    @focus="checkOpenModal(), focusDay=true" @blur="focusDay=false"> 
                </div>
            </div> 
              <div class="settings-integrations-form__date-column">
                <div>ID филиала</div>
                 <div class="settings-integrations-form__container">
                        <input class="settings-integrations-form__input_test " type="number" placeholder="Ввести" 
                        v-model="filial" :class="{'yclient-pattern__error':error.id, 'settings-integrations-form__select_active':focusId}"
                        @focus="checkOpenModal(), focusId=true" @blur="focusId=false"> 
                     </div>
                </div>
        </div>
        <div class="settings-integrations-form__date settings-integrations-form__birthday settings-integrations-form__date settings-integrations-form__birthday_top">
         
                <div class="settings-integrations-form__date-column">
                    <div>Аккаунт</div>
                    <div class="settings-integrations-form__container">
                        <button @click="openAcc" class="settings-integrations-form__input_test " :class="{'settings-integrations-form__select_active': statusAccSelect,'yclient-pattern__error':error.textOption }"> 
                            <div class="settings-integrations-form__dropdown-inner" :class="{'settings-integrations-form__dropdown-inner_placeholder':(textOption=='Выбрать')}"> {{textOption}}
                                <svg :class="{'settings-integrations-form__dropdown-inner-svg_green': statusAccSelect }"  class='settings-integrations-form__dropdown-inner-svg' width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.14053 0.197198C9.07855 0.134713 9.00482 0.0851166 8.92358 0.051271C8.84234 0.0174253 8.7552 0 8.6672 0C8.57919 0 8.49205 0.0174253 8.41081 0.051271C8.32957 0.0851166 8.25584 0.134713 8.19386 0.197198L5.14053 3.25052C5.07855 3.31301 5.00482 3.3626 4.92358 3.39645C4.84234 3.43029 4.7552 3.44772 4.6672 3.44772C4.57919 3.44772 4.49205 3.43029 4.41081 3.39645C4.32957 3.3626 4.25584 3.31301 4.19386 3.25052L1.14053 0.197198C1.07855 0.134713 1.00482 0.0851166 0.92358 0.051271C0.84234 0.0174253 0.755203 0 0.667195 0C0.579187 0 0.49205 0.0174253 0.41081 0.051271C0.329571 0.0851166 0.255837 0.134713 0.193862 0.197198C0.0696944 0.322106 0 0.491073 0 0.667197C0 0.84332 0.0696944 1.01229 0.193862 1.1372L3.25386 4.19719C3.62886 4.57172 4.13719 4.78209 4.6672 4.78209C5.1972 4.78209 5.70553 4.57172 6.08053 4.19719L9.14053 1.1372C9.2647 1.01229 9.33439 0.84332 9.33439 0.667197C9.33439 0.491073 9.2647 0.322106 9.14053 0.197198Z" fill="#CFCFE4"/>
                        </svg>
                            </div>
                            <div class="settings-integrations-form__dropdown-list" v-if="statusAccSelect">
                              
                             <div  class="settings-integrations-form__dropdown-item" v-for=" (whatsapp, index) in whatsapps" :key="index" @click="chooseOption(whatsapp.phone), chooseId(whatsapp.whatsapp_id, 'whatsapp')">
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
                                        {{whatsapp.name}} / {{whatsapp.phone}} / {{whatsapp.status}}
                            </div>
                             <div  class="settings-integrations-form__dropdown-item" v-for=" (instagram, index) in instagrams" :key="index" @click="chooseOption(instagram.login), chooseId(instagram.instagram_id, 'instagram')">
                                <svg class="settings-integrations-form__dropdown-image" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_675:3241)">
                                    <path d="M1.0003 1.08868C-0.257038 2.39468 0.000295601 3.78201 0.000295601 7.99668C0.000295601 11.4967 -0.610371 15.0053 2.58563 15.8313C3.58363 16.088 12.4263 16.088 13.423 15.83C14.7536 15.4867 15.8363 14.4073 15.9843 12.5253C16.005 12.2627 16.005 3.73534 15.9836 3.46734C15.8263 1.46268 14.5923 0.307344 12.9663 0.0733439C12.5936 0.0193439 12.519 0.00334392 10.607 1.05856e-05C3.82496 0.00334392 2.3383 -0.298656 1.0003 1.08868V1.08868Z" fill="url(#paint0_linear_675:3241)"/>
                                    <path d="M7.99814 2.09274C5.57747 2.09274 3.2788 1.8774 2.4008 4.13074C2.03814 5.0614 2.0908 6.27007 2.0908 8.00074C2.0908 9.51941 2.04214 10.9467 2.4008 11.8701C3.2768 14.1247 5.59414 13.9087 7.9968 13.9087C10.3148 13.9087 12.7048 14.1501 13.5935 11.8701C13.9568 10.9301 13.9035 9.73941 13.9035 8.00074C13.9035 5.69274 14.0308 4.20274 12.9115 3.08407C11.7781 1.95074 10.2455 2.09274 7.99547 2.09274H7.99814ZM7.4688 3.1574C12.5181 3.1494 13.1608 2.58807 12.8061 10.3861C12.6801 13.1441 10.5801 12.8414 7.9988 12.8414C3.29214 12.8414 3.1568 12.7067 3.1568 7.99807C3.1568 3.23474 3.53014 3.16007 7.4688 3.15607V3.1574ZM11.1515 4.13807C10.7601 4.13807 10.4428 4.4554 10.4428 4.84674C10.4428 5.23807 10.7601 5.5554 11.1515 5.5554C11.5428 5.5554 11.8601 5.23807 11.8601 4.84674C11.8601 4.4554 11.5428 4.13807 11.1515 4.13807V4.13807ZM7.99814 4.96674C6.3228 4.96674 4.9648 6.3254 4.9648 8.00074C4.9648 9.67607 6.3228 11.0341 7.99814 11.0341C9.67347 11.0341 11.0308 9.67607 11.0308 8.00074C11.0308 6.3254 9.67347 4.96674 7.99814 4.96674V4.96674ZM7.99814 6.0314C10.6015 6.0314 10.6048 9.97007 7.99814 9.97007C5.39547 9.97007 5.39147 6.0314 7.99814 6.0314Z" fill="white"/>
                                    </g>
                                    <defs>
                                    <linearGradient id="paint0_linear_675:3241" x1="1.03098" y1="14.9781" x2="15.9013" y2="2.10799" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#FFDD55"/>
                                    <stop offset="0.5" stop-color="#FF543E"/>
                                    <stop offset="1" stop-color="#C837AB"/>
                                    </linearGradient>
                                    <clipPath id="clip0_675:3241">
                                    <rect width="16" height="16" fill="white"/>
                                     </clipPath>
                                    </defs>
                                </svg>
                                         {{instagram.login}} / {{instagram.status}}
                            </div> 
                            </div>
                        </button>
                    </div>
                </div>
                    <div class="settings-integrations-form__date-column"></div>
                   <div class="settings-integrations-form__date-column">
               <!--  <div>Дополнительные фильтры</div>
                <div class="settings-integrations-form__container">
                    <button @click="openFilters" class="settings-integrations-form__input_test" :class="{'settings-integrations-form__select_active': statusFiltersSelect }"> 
                        <div class="settings-integrations-form__dropdown-inner settings-integrations-form__dropdown-inner_placeholder"> Показать
                            <svg :class="{'settings-integrations-form__dropdown-inner-svg_green': statusFiltersSelect }"  class='settings-integrations-form__dropdown-inner-svg' width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.14053 0.197198C9.07855 0.134713 9.00482 0.0851166 8.92358 0.051271C8.84234 0.0174253 8.7552 0 8.6672 0C8.57919 0 8.49205 0.0174253 8.41081 0.051271C8.32957 0.0851166 8.25584 0.134713 8.19386 0.197198L5.14053 3.25052C5.07855 3.31301 5.00482 3.3626 4.92358 3.39645C4.84234 3.43029 4.7552 3.44772 4.6672 3.44772C4.57919 3.44772 4.49205 3.43029 4.41081 3.39645C4.32957 3.3626 4.25584 3.31301 4.19386 3.25052L1.14053 0.197198C1.07855 0.134713 1.00482 0.0851166 0.92358 0.051271C0.84234 0.0174253 0.755203 0 0.667195 0C0.579187 0 0.49205 0.0174253 0.41081 0.051271C0.329571 0.0851166 0.255837 0.134713 0.193862 0.197198C0.0696944 0.322106 0 0.491073 0 0.667197C0 0.84332 0.0696944 1.01229 0.193862 1.1372L3.25386 4.19719C3.62886 4.57172 4.13719 4.78209 4.6672 4.78209C5.1972 4.78209 5.70553 4.57172 6.08053 4.19719L9.14053 1.1372C9.2647 1.01229 9.33439 0.84332 9.33439 0.667197C9.33439 0.491073 9.2647 0.322106 9.14053 0.197198Z" fill="#CFCFE4"/>
                        </svg>
                        </div>
                    </button> 
                    <div class="settings-integrations-form__dropdown-list settings-integrations-form__dropdown-list-filters" :class="{' settings-integrations-form__dropdown-list-filters_hidden':!statusFiltersSelect}">
                        <div class="settings-integrations-form__dropdown-list-filters-title">Клиент потратил сумму</div>
                        <div class="settings-integrations-form__date-row">
                            <div class="settings-integrations-form__date-column">
                                <div class="settings-integrations-form__date-column-title">От</div>
                                <input type="number"   min="0"  class="settings-integrations-form__date-input" placeholder="00" >
                            </div>
                            <div class="settings-integrations-form__date-column settings-integrations-form__date-column_end">
                                <div class="settings-integrations-form__date-column-title">До</div>
                                <input type="number"   min="0"  class="settings-integrations-form__date-input"  placeholder="00">
                            </div>
                        </div>
                        <div class="settings-integrations-form__dropdown-list-filters-title">Кол-во посещений</div>
                        <div class="settings-integrations-form__date-row">
                            <div class="settings-integrations-form__date-column">
                                <div class="settings-integrations-form__date-column-title">От</div>
                                <input type="number"   min="0" class="settings-integrations-form__date-input"  placeholder="00">
                            </div>
                            <div class="settings-integrations-form__date-column settings-integrations-form__date-column_end">
                                <div class="settings-integrations-form__date-column-title">До</div>
                                <input type="number"   min="0"  class="settings-integrations-form__date-input"  placeholder="00">
                            </div>
                        </div>
                        
                        <div class="settings-integrations-form__checkbox" >
                            <div class="settings-integrations-form__checkbox-title"> Выполнять, если у записи статус</div>
                            <BaseCheckbox :id="index" :title="checkbox[0]" v-for="(checkbox, index) in checkboxs" :key="index" :name="status" 
                            ></BaseCheckbox>
                        </div>
                         <div class="settings-integrations-form__checkbox" >
                            <div class="settings-integrations-form__checkbox-title"> Выполнять, если у записи тип</div>
                            <BaseCheckbox :id="checkboxs.length" :title="'Онлайн'" :name="type" 
                            ></BaseCheckbox>
                             <BaseCheckbox :id="checkboxs.length+1" :title="'Офлайн'" :name="type" 
                            ></BaseCheckbox>
                        </div>
                         <BaseSwitcherNew :model="item[1]" :index="key" @saveCheck="saveCheck"  v-for=" (item, key) in switcherInput" :key="key" :needInput="true"
                         class="settings-integrations-form__checkbox"
                            :title="item[0]"></BaseSwitcherNew>
                     
                           <BaseSwitcherNew :model="timeRecording[1]" :index="key" @saveCheck="saveCheck"  :needInput="false"  class="settings-integrations-form__checkbox"
                            :title="timeRecording[0]"></BaseSwitcherNew>
                        <div class="settings-integrations-form__date-row">
                            <div class="settings-integrations-form__date-column">
                                <div class="settings-integrations-form__date-column-title">От</div>
                                <input type="number"   min="0" class="settings-integrations-form__date-input"  placeholder="00">
                            </div>
                            <div class="settings-integrations-form__date-column settings-integrations-form__date-column_end">
                                <div class="settings-integrations-form__date-column-title">До</div>
                                <input type="number"   min="0"  class="settings-integrations-form__date-input"  placeholder="00">
                            </div>
                        </div>
                    </div>
                </div>-->
            </div> 
        </div>
           
     </div>
     <div class="settings-integrations-form__field ">
        <div class=" settings-integrations-form__create-message">
            <SettingsIntegrationsMessage @dataFile='checkData' @propText="getText" :text='textMess' :nameFile='propFileData' @click="checkOpenModal()"
             :class="{'settings-integrations-form__create-message_error':error.message}"
            ></SettingsIntegrationsMessage>
            <SettingsIntegrationsVariables></SettingsIntegrationsVariables>
        </div>
         <TestCheck @send='testSend'></TestCheck> 
        </div> 
        <div class="settings-integrations-form__field_no-border">
            <button class="base-button_border-green pointer" @click="deleteBirthday">Удалить</button>
            <template v-if="Propdata&&Propdata.parameters">
                <button class="base-button base-button_enter base-button_p5-15 pointer" @click="update(data)">Изменить</button> 
            </template> 
            <template v-else>
                <button class="base-button base-button_enter base-button_p5-15 pointer" @click="post(data)">Сохранить</button>
            </template> 
        </div>
    </div>
</template>
<script>
import { ref, reactive, watch } from "vue";
import SettingsIntegrationsMessage from "../SettingsIntegrationsMessage";
import SettingsIntegrationsVariables from "../SettingsIntegrationsVariables";
import TestCheck from "../SettingsIntegrationsElems/TestCheck.vue";
import { useWhatsapp } from "../../../../composition/useWhatsapp";
import {useIntegrations} from "../../../../composition/useIntegrations"
import { useRouter, useRoute}  from 'vue-router'
import BaseSwitcherNew from "../../../Base/BaseSwitcherNew";
import { useStyle } from "../../../../composition/useStyle";
import { useInstagram } from "../../../../composition/useInstagrams";
import  BaseCheckbox  from "../../../../components/Base/BaseCheckbox.vue";
export default {
  components: { SettingsIntegrationsMessage, SettingsIntegrationsVariables, TestCheck, BaseSwitcherNew,BaseCheckbox },
  props: {
    Propdata:Object,
    isCloseAll:Boolean,

      },
    setup(props) {
        const { style, setStyle } = useStyle();
        const router = useRouter();
        const {postBirthdayTask, updateTask, testMessage} = useIntegrations()
        const { whatsapps, getWhatsapps } = useWhatsapp()
        const statusSelect = ref(false);
        const textOption = ref('');
        const {getInstagrams, instagrams} = useInstagram()
        const timeOption = ref('Выбрать');
        const timeZoneOption = ref('Выбрать');
        const minute = ref('00');
        const hours = ref('00');
        const statusTimeSelect = ref(false);
        const statusAccSelect = ref(false);
        const statusFiltersSelect = ref(false);
        const sum1 = ref(1);
        const sum2 = ref(2);
        const name = ref('');
        const filial = ref('');
        const message = ref('');
        const whatsappId=ref('');
        const textMess = ref('')
        const fileData = ref([])
        const propFileData = ref('');
        const ntime = ref('')
        const propsCheck = ref(true);
        const instId=ref('');
        const focusName = ref(false);
         const NDay = ref('');
        const focusId = ref(false);
        const focusDay = ref(false);
         textOption.value = 'Выбрать';
        
        const changeSwitcher = (activeItem) => {
            activeItem.active=!activeItem.active
        }
         const checkData = (data) => {
                if(data.length!=0){                
                   fileData.value = data
                  
                }
            }
        getWhatsapps()
        const data = ref({
                type: "RecordRemind",
                task_name: "Напоминание о записи",
                parameters:
                [
                    {
                        message: {
                            type: "text",
                            data: ""
                        },
                        whatsapp_id : null,
                        n_hour : null,
                        company_id : null
                    }
                ]
            })
  
        const switcherInput = ref([
            ['Выполнять, если категория записи', false],
            ['Выполнять, если услуга записи', false],
            ['Выполнять, если категория клиента', false],
            ['Выполнять, если сотрудник', false],
        
        ])
         const check = ref([
             ['Не учитывать смену даты и времени', false],
             ['Учитывать смену мастера', false],
             ['Учитывать смену статуса записи', false],
             ['Учитывать смену категории записи', false],
             ['Учитывать изменение услуг записи', false]]
         );
         const timeRecording = ref(['Выполнять, если время записи', false])
        const checkboxs = ref([
            ['Ожидание клиента', false],
            ['Клиент пришел', false],
            ['Клиент не пришел', false],
            ['Клиент подтвердил', false],
        ])
         textOption.value = 'Выбрать';
            const getText = (text) => {
                message.value = text;
            }
            const chooseId = (id, name) => {
                if(name==='whatsapp'){
                    whatsappId.value = id
                    if(data.value.parameters[0].hasOwnProperty('instagram_id')){
                         instId.value = null;
                        delete data.value.parameters[0].instagram_id
                    }
                }
                else{
                      whatsappId.value = null;
                    instId.value = id;
                    if(data.value.parameters[0].hasOwnProperty('whatsapp_id')){
                        delete data.value.parameters[0].whatsapp_id
                    }
                }
            }
            const error = ref(
            {
                textOption:false,
                id:false,
                message:false,
                name:false,
                nday:false,
            })
            const ValidateDate = () => {
                  const valid = ref(true);
                   if(NDay.value==''){
                    data.value.parameters[0].n_hour ='';
                    error.value.nday = true;
                      valid.value= false
                }
                else{
                    data.value.parameters[0].n_hour = NDay.value; 
                }
                if(textOption.value=='Выбрать'){
                    data.value.parameters[0].company_id ='';
                      error.value.textOption = true;
                     valid.value= false
                }
                else{
                    
                    data.value.parameters[0].company_id = String(filial.value);  
                }
                if(whatsappId.value==''){
                        if(instId.value==''){
                              error.value.id = true;
                             valid.value= false
                        }
                        else{
                             data.value.parameters[0].instagram_id =  instId.value;   
                        }
                }
               
               else if (whatsappId.value==null){
                      if(data.value.parameters[0].hasOwnProperty('whatsapp_id')){
                        delete data.value.parameters[0].whatsapp_id
                    }
                }
                 else{
                    data.value.parameters[0].whatsapp_id =  whatsappId.value;    
                }
                if (instId.value==null){
                      if(data.value.parameters[0].hasOwnProperty('instagram_id')){
                        delete data.value.parameters[0].instagram_id
                    }
                }
                  if(instId.value==''){
                    if(whatsappId.value==''){
                          error.value.id = true;
                         valid.value= false
                    }
                    else{
                          data.value.parameters[0].whatsapp_id =  whatsappId.value;    
                    }
                  }
                  else{
                        data.value.parameters[0].instagram_id =  instId.value;
                  }
                 if((message.value=='')||(message.value=='undefined')){
                    if(props.Propdata.parameters){

                        if( props.Propdata.parameters[0].message.Caption!=null){

                            if( fileData.value.length!=0){
                                data.value.parameters[0].message.caption = props.Propdata.parameters[0].message.Caption;
                                data.value.parameters[0].message.data =  fileData.value[0];
                                data.value.parameters[0].message.type = fileData.value[1]

                            }
                            else{
                                    data.value.parameters[0].message.caption = props.Propdata.parameters[0].message.Caption;
                    //    data.value.parameters[0].message.data = props.Propdata.parameters[0].message.file_uid;
                       data.value.parameters[0].message.type =  props.Propdata.parameters[0].message.Type 
                       if( props.Propdata.parameters[0].message.Img!=null){
                           data.value.parameters[0].message.data = props.Propdata.parameters[0].message.Img; 
                       }
                       else if(props.Propdata.parameters[0].message.Document!=null){
                              data.value.parameters[0].message.data = props.Propdata.parameters[0].message.Document; 
                       }
                        else if(props.Propdata.parameters[0].message.Video!=null){
                              data.value.parameters[0].message.data = props.Propdata.parameters[0].message.Video; 
                       } 
                            }
                   
                        }
                        else{
                            data.value.parameters[0].message.data =  props.Propdata.parameters[0].message.Text;    
                        }
                       
                    }
                    
                else{
                      error.value.message = true;
                     valid.value= false  
                    }
                }
                else{
                    if (fileData.value.length!=0){
                       data.value.parameters[0].message.caption =  message.value;
                       data.value.parameters[0].message.data =  fileData.value[0];
                       data.value.parameters[0].message.type = fileData.value[1]
                    } 
                    else{
                         data.value.parameters[0].message.data = message.value;
                    }   
                }   
                if(((name.value=='')||(name.value=='undefined'))){
                      error.value.name = true;
                    valid.value= false 
                }
                else {
                    data.value.task_name =  name.value;    
                }
                // if(ntime.value==''){
                //       error.value.ntime = true;
                //      valid.value= false
                // }
                // else {
                //     data.value.parameters[0].n_minutes =  ntime.value;    
                // }
                return  valid.value
            }
        const post = () => {
            if (ValidateDate()){
                const dataNew = data.value
                postBirthdayTask(dataNew)
                .then(r=> {
                    router.push('/settings/integrations/yclients/create')
                })
            } 
        }
        const update = () => {
           data.value.task_id = props.Propdata.task_id;
            if(message.value==''){
                data.value.parameters[0].message.data = props.Propdata.parameters[0].message.Text;
            }
            if (ValidateDate()){
                const dataNew = data.value
                updateTask(dataNew)
               .then(r=> {
                   router.push('/settings/integrations/yclients/create')  
                 })
            } 
        }
        const checkUpdate = ref(true);
        watch(()=>{
            if(props.isCloseAll){
                checkOpenModal()
            }
            if(props.Propdata.parameters){
                if(checkUpdate.value){
                ntime.value=props.Propdata.parameters[0].n_minutes;
                 if(props.Propdata.parameters[0].message.Caption!=null){
                    textMess.value = props.Propdata.parameters[0].message.Caption
                    // if(textMess.value = props.Propdata.parameters[0].message.Img!=null){
                    //   propFileData.value.push(props.Propdata.parameters[0].message.Img)  
                    // }
                    propFileData.value = props.Propdata.parameters[0].message.file_name
                }
                else{
                 textMess.value = props.Propdata.parameters[0].message.Text   
                }
                name.value=props.Propdata.task_name;
                NDay.value = props.Propdata.parameters[0].n_hour
                filial.value=props.Propdata.parameters[0].company_id
               if(props.Propdata.parameters[0].hasOwnProperty('whatsapp_id')){
                    whatsappId.value=props.Propdata.parameters[0].whatsapp_id
                }
                else{
                    instId.value = props.Propdata.parameters[0].instagram_id;
                }
                if(propsCheck.value){
                for(let i =0; i< whatsapps.value.length; i++){
                    if(whatsapps.value[i].whatsapp_id==whatsappId.value){
                        const phone =whatsapps.value[i].phone
                        textOption.value = phone
                    } 
                }
                for(let i =0; i< instagrams.value.length; i++){
                    if(instagrams.value[i].instagram_id==instId.value){
                         const phone =instagrams.value[i].login
                          textOption.value = phone
                    } 
                }  
                 propsCheck.value=false
                  }
            }
            checkUpdate.value=false;
            }
        })
        const checkOpenModal = (item) => {
            if(item){
                statusAccSelect.value=false;
                statusTimeSelect.value = false;
                statusSelect.value=false;
                statusFiltersSelect.value=false;
                item.value = true;   
            }
            else{
                statusAccSelect.value=false;
                statusTimeSelect.value = false;
                statusSelect.value=false;
                statusFiltersSelect.value=false;
            }
            
        }
       
        const chooseOption = (text) => {
                textOption.value = text
            }
        const chooseAcc = (text) => {
            timeZoneOption.value = text.path[0].innerHTML
        }
        const openSelect = () => {
            statusSelect.value = !statusSelect.value;
            if(statusSelect.value){
             checkOpenModal(statusSelect)   
            } 
        }
        const statusTimeSelected = () => {
            statusTimeSelect.value = !statusTimeSelect.value;
            timeOption.value = hours.value + ':' + minute.value;
            if(statusTimeSelect.value){
             checkOpenModal(statusTimeSelect)   
            }
        }
        const openAcc =  () => {
            statusAccSelect.value=!statusAccSelect.value;
             if(statusAccSelect.value){
             checkOpenModal(statusAccSelect)   
            }
        }
        const openFilters = () => {
            statusFiltersSelect.value=!statusFiltersSelect.value;
            if(statusFiltersSelect.value){
             checkOpenModal(statusFiltersSelect)   
            }
        }
        const checkFilters = (item) => {
            item = String(item);
            if ( item.startsWith('0')){
              item = item.split('');
              item = item.splice(0,1);
              item = String(item);
              item - Number(item);
            }
        }
         const timeZones = ref([]);
            timeZones.value = [
                {time:'0', city:'Гринвич, Лондон, Рейкьявик, Лиссабон, Дакар'},
                {time: '+1', city: 'Рим, Париж, Берлин, Осло, Мадрид, Копенгаген, Вена'},
                {time : '+2', city: 'Киев, Минск, Анкара, Афины, Иерусалим, Хельсинки, София, Бухарест, Кейптаун'},
                {time: '+3', city:'Москва, Аддис-Абеба, Багдад'},
                {time:'+4' , city:'Тегеран, Баку, Абу-Даби'},
                {time: '+5', city:'Душанбе, Ташкент, Карачи'},
                {time: '+6', city:'Алматы, Тюмень'},
                {time:'+7' , city:'Новосибирск, Джакарта, Бангкок'},
                {time: '+8', city:'Иркутск, Пекин, Шанхай'},
                {time:' +9', city:'Токио, Сеул, Пхеньян'},
                {time: '+10', city:'Канберра, Сидней, Мельбурн'},
                {time: '+11', city:'Магадан'},
                {time: '+12', city:'Веллингтон'},
                {time: '-12', city:'Анадырь, Камчатка'},
                {time: '-11', city:'Ном (Аляска), Самоа'},
                {time: '-10', city:'Аляска, Гавайи'},
                {time: '-9', city:''},
                {time: '-8', city:'Лос-Анджелес, Сан-Франциско, Сиэтл, Ванкувер'},
                {time: '-7', city:'Денвер, Феникс, о.Пасхи'},
                {time: '-6', city:''},
                {time: '-5', city:'Нью-Йорк, Вашингтон, Атланта, Оттава, Гавана, Богота, Лима'},
                {time: '-4', city:'Ла-Пас, Каракас, Галифакс'},
                {time: '-3', city:'Асунсьон, Буэнос-Айрес'},
                {time: '-2', city:'Сан-Паулу, Бразилиа'},
                {time: '-1', city:'Азорские о-ва'},
                ]
        const arrowNext = (time, name) => {
            time=String(time)
             if(time.startsWith('0')){ 
                 time = time.split('');
                 time = time[1]
                 time++;
             }
             else{
                 time = Number(time)
                if(name == 'minute'){
                  if(time===59){
                     return false
                 }
                 else {
                      time++;  
                 }  
                }
                if(name == 'hours'){
                  if(time===23){
                     return false
                 }
                 else {
                      time++;  
                 }  
                }
             }
            if(name == 'minute'){
                if(time<10){
                    minute.value = '0'+time;  
                }
                else{
                    minute.value = time;  
                }
            }
            else{
                if(time<10){
                  hours.value = '0'+time;  
                }
                else{
                    hours.value = time;  
                }
            }
        }
        const arrowPrev = (time, name) => {
            time=String(time)
            if(time.startsWith('0')){ 
                 time = time.split('');
                 time = Number(time[1])
                 if(time ===0){
                     return false
                 }
                 else{
                  time--;    
                 }
             }
             else{
                 time = Number(time)
                  time--; 
             }
            if(name == 'minute'){
                if(time<10){
                  minute.value = '0'+time;  
                }
                else{
                     minute.value = time;  
                }
            }
            else{
                if(time<10){
                  hours.value = '0'+time;  
                }
                else{
                     hours.value = time;  
                }
            }
        }
        const deleteBirthday = () => {
            filial.value=null;
            name.value='';
            timeOption.value='Выбрать'
            textOption.value='Выбрать',
            textMess.value='';
        }
        const activeCheckbox = (item) =>{
            item.path[1].children[0].checked = !item.path[1].children[0].checked 
        }
        const testSend = (item) => {
            const phone = ref();
            phone.value = item.replace(/\s/g, '').replace(/-/g, '').replace("(", '').replace(")", '');
            if(ValidateDate()){
             const dataNew = data.value.parameters[0] ;   
            const dataTest = ref({});
            dataTest.value.phone = phone.value;
            dataTest.value.whatsapp_id = whatsappId.value;
                if(dataNew.message.hasOwnProperty('caption')){
                        dataTest.value.caption = dataNew.message.caption;
                        dataTest.value.data = dataNew.message.data;
                        dataTest.value.type = dataNew.message.type;
                }
                else{
                    dataTest.value.data = dataNew.message.data;
                    dataTest.value.type = dataNew.message.type;
                }
                 testMessage(dataTest.value)
            }
    
            }
        return {
            activeCheckbox,
            checkOpenModal,
            style,
            openSelect,
            statusSelect,
            chooseOption,
            textOption,
            timeOption,
            statusTimeSelected,
            statusTimeSelect,
            minute,
            hours,
            arrowNext,
            arrowPrev,
            timeOption,
            statusAccSelect,
            openAcc,
            openFilters,
            statusFiltersSelect,
            sum1,
            sum2,
            checkFilters,
            timeZones,
            chooseAcc,
            timeZoneOption,
            data,
            name,
            post,
            filial,
            whatsapps,
            message,
            getText,
            chooseId,
            whatsappId,
            ValidateDate,
            deleteBirthday,
            textMess,
            update,
            ntime,
            setStyle,
            switcherInput,
            changeSwitcher,
            fileData,
            propFileData,
            checkData,
            instagrams,
            testSend,
            instId,
            checkUpdate,
            error,
            focusName,
            focusId,
            focusDay,
            NDay,
            checkboxs,
            check,
            timeRecording
            
        }
    },
}
</script>
<style lang="scss">
.settings-integrations-form__birthday{
    .settings-integrations-form__date-column{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .settings-integrations-form__input_test{
            width: 100%;
            margin-left: 0;
            height: 39px;
           
            &::-webkit-input-placeholder {color:#40406B;}
            &::-moz-placeholder {color:#40406B;}
            &:-moz-placeholder {color:#40406B;}
            &:-ms-input-placeholder {color:#40406B;}
            .settings-integrations-form__dropdown-inner{
                height: 100%;
                overflow: hidden;
                align-items: center;
            }
            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
            }
        }
        &-title{
           width: 93%; 
        }
        &_end{
            align-items: flex-end;
        }
    }
    .settings-integrations-form__dropdown-inner{
        position: relative;
        svg {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
        }
        &_placeholder{
            color:#40406B;
        }
    }
    .settings-integrations-form__dropdown-list{
      &-time{
        display: flex;
        padding: 18px;
      
    }  
    &-filters{
    display: flex;
    flex-direction: column;
    padding: 0px 18px;
    width: 93%;
    max-height: 500px;
    overflow-y: auto;
    -ms-overflow-style: none; 
    overflow: -moz-scrollbars-none; 
    &::-webkit-scrollbar { width: 0; }
    .settings-integrations-form__date-row{
        display: flex;
        padding-bottom: 18px;
        border-bottom: 1px solid #40406B;
        flex-direction: row;
        /* стили для чекбокса, находящегося в состоянии disabled */
        &-checkbox{
            display: none;
        }
        &-checkbox:disabled+label::before {
        background-color: #B9B9B9;
        }
        &-checkbox:checked+label::before {
        background-image: url("../../../../assets/checkboxArrow.svg") , var(--green-color);
        background-size: auto;
        background-repeat: no-repeat;
         border: 1px solid #5EC075;
        }
        &-checkbox +label::before {
        content: '';
        display: inline-block;
        width: 16px;
        height: 16px;
        flex-shrink: 0;
        flex-grow: 0;
        border: 1px solid #B9B9B9;
        border-radius: 3px;
        margin-right: 0.5em;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 50% 50%;
        }
        &-label{
            display: flex;
            align-items: center;
            flex-direction: row;
           
        }
        &-label_bottom{
             margin-bottom: 14px;
        }
    }
    .settings-integrations-form__date-row_no-border{
        border-bottom:  none;
        display: flex;
        flex-direction: row;
    }
    .settings-integrations-form__checkbox-block{
        display:flex;
        flex-direction: column;
    }
    &-title{
        padding-bottom: 16px;
        padding-top: 18px;
        font-weight: 600;
        font-size: 14px;
        line-height: 130%;
        color: #CFCFE4;
    }
    input[type="number"]::-webkit-outer-spin-button, 
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none; 
        background:  var(--messenger-search-input-bg-active) url('../../../../assets/arrowFilters.svg') no-repeat center center;
        width: 1em;
        opacity: .5; /* shows Spin Buttons per default (Chrome >= 39) */
        position: absolute;
        top: 0;
        right: 5px;
        bottom: 0;
    }
    &_hidden{
        display: none;
    }
    }
    &_max-height{
        max-height: 200px;
        overflow: auto;
        -ms-overflow-style: none;
        scrollbar-width: none;
        &::-webkit-scrollbar {
        width: 0;
        height: 0;
        }
    }
    }
    .settings-integrations-form__date-input-arrow{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    &_top{
        padding-top:22px;
    }
 
}
.settings-integrations-form__create-message{
    display: flex;
    justify-content: space-between;
}  
 .settings-integrations-form__field_no-border{
    padding: 36px 30px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
        .base-button_border-green{
            padding: 8px 18px;
            border-radius: 6px;
            margin-right: 19px;
        }
        .base-button{
            color: #1D1D35;
            font-weight: 500;
        }
    }
    .settings-integrations-form__switcher{
        padding-top: 24px;
        display:flex;
        flex-direction: column ;
        padding-bottom: 18px;
        border-bottom: 1px solid #40406B;
        .base-switcher{
            flex-direction: row-reverse;
            justify-content: flex-end;
            padding-bottom:16px
        }
        .settings-integrations-form__container{
            .settings-integrations-form__input_test{
                width:100%
            }   
            
        }
        .settings-integrations-form__input_test{
            width:100%
        }
        .base-switcher__slider-circle{
        bottom: -1px;
        }
        .base-switcher__label{
            font-weight: 600;
            font-size: 14px;
            line-height: 130%;
            color: #CFCFE4;
            padding-left: 16px;
        }
    }
    .base-switcher_no-border{
        border-bottom: none;
        padding-bottom:2px !important;
    }
    .settings-integrations-form__create-message_error{
        .settings-integrations-form__input_test{
            border: 0.7px solid var(--red-color);
        }
}
</style>