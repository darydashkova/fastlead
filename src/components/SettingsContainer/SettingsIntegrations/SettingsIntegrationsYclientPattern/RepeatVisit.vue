<template>
<div>
     <div class="settings-integrations-form__field">
    <div class="settings-integrations-form__date settings-integrations-form__record-time ">
        <div class="settings-integrations-form__date-column">
            <div>Наименования</div>
                  <input class="settings-integrations-form__input_test " v-model="name"  placeholder="Ввести"  :class="{'yclient-pattern__error':error.name, 
                    'settings-integrations-form__select_active':focusName}" 
                    @focus="checkOpenModal(), focusName=true" @blur="focusName=false">                
            </div>
                <!-- <div class="settings-integrations-form__date-column">
                    <div>Часовой пояс</div>
                    <div class="settings-integrations-form__container">
                <div class="settings-integrations-form__container-arrow ">
                </div>
                <button @click="openSelect checkOpenModal()" class="settings-integrations-form__input_test " :class="{'settings-integrations-form__select_active': statusSelect }"> 
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
                </div> -->
                 <div class="settings-integrations-form__date-column">
                    <div>Время запуска</div>
                    <div class="settings-integrations-form__container">
                <div class="settings-integrations-form__container-arrow ">
                </div>
                <button @click="statusTimeSelected" class="settings-integrations-form__input_test " :class="{'settings-integrations-form__select_active': statusTimeSelect,'yclient-pattern__error':error.timeOption }"> 
                    <div class="settings-integrations-form__dropdown-inner" :class="{'settings-integrations-form__dropdown-inner_placeholder':(timeOption=='Выбрать')}"> {{timeOption}}
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0)">
                            <path d="M8 0C6.41775 0 4.87104 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346629 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C15.9977 5.87897 15.1541 3.84547 13.6543 2.34568C12.1545 0.845886 10.121 0.00229405 8 0V0ZM8 14.6667C6.68146 14.6667 5.39253 14.2757 4.2962 13.5431C3.19987 12.8106 2.34539 11.7694 1.84081 10.5512C1.33622 9.33305 1.2042 7.99261 1.46144 6.6994C1.71867 5.40619 2.35361 4.21831 3.28596 3.28596C4.21831 2.35361 5.4062 1.71867 6.6994 1.46143C7.99261 1.2042 9.33305 1.33622 10.5512 1.8408C11.7694 2.34539 12.8106 3.19987 13.5431 4.2962C14.2757 5.39253 14.6667 6.68146 14.6667 8C14.6647 9.76752 13.9617 11.4621 12.7119 12.7119C11.4621 13.9617 9.76752 14.6647 8 14.6667Z" fill="#CFCFE4"/>
                            <path d="M7.99964 4C7.82283 4 7.65326 4.07024 7.52824 4.19526C7.40321 4.32029 7.33297 4.48986 7.33297 4.66667V7.55L5.08564 8.958C4.93535 9.05188 4.82851 9.20163 4.78863 9.37428C4.74875 9.54694 4.77909 9.72837 4.87297 9.87866C4.96686 10.029 5.1166 10.1358 5.28926 10.1757C5.46192 10.2156 5.64335 10.1852 5.79364 10.0913L8.35364 8.49133C8.45037 8.43073 8.52991 8.34631 8.58466 8.24615C8.6394 8.146 8.66752 8.03346 8.66631 7.91933V4.66667C8.66631 4.48986 8.59607 4.32029 8.47105 4.19526C8.34602 4.07024 8.17645 4 7.99964 4Z" fill="#CFCFE4"/>
                            </g>
                            <defs>
                            <clipPath id="clip0">
                            <rect width="16" height="16" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>
                    </div>
                </button> <div class="settings-integrations-form__dropdown-list settings-integrations-form__dropdown-list-time" v-if="statusTimeSelect">
                            <div class="settings-integrations-form__date-column">
                                <div class="settings-integrations-form__date-column-title">Часов</div>
                                <div class="settings-integrations-form__date-input">
                                      <input class="settings-integrations-form__date-input_transparent" v-model="hours" maxlength="2" min="0" max="23" step="1" >
                                    <div class="settings-integrations-form__date-input-arrow">
                                        <svg @click="arrowNext(hours, 'hours')" width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.5928 7L1.40723 7C1.22705 6.99923 1.05114 6.94437 0.901741 6.84235C0.752344 6.74032 0.636169 6.59572 0.567908 6.42682C0.499647 6.25792 0.482365 6.07231 0.518247 5.89347C0.554129 5.71462 0.641564 5.55057 0.769494 5.42205L5.85315 0.272955C5.93785 0.186465 6.03861 0.117815 6.14963 0.0709676C6.26065 0.0241193 6.37973 4.18623e-07 6.5 4.29138e-07C6.62027 4.39652e-07 6.73935 0.0241194 6.85037 0.0709677C6.96139 0.117815 7.06215 0.186465 7.14685 0.272955L12.2305 5.42205C12.3584 5.55057 12.4459 5.71462 12.4818 5.89347C12.5176 6.07231 12.5004 6.25792 12.4321 6.42682C12.3638 6.59572 12.2477 6.74032 12.0983 6.84235C11.9489 6.94437 11.773 6.99923 11.5928 7Z" fill="#9797BB"/>
                                        </svg>
                                        <svg @click="arrowPrev(hours, 'hours')" width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.40723 1.58625e-07L11.5928 1.93952e-06C11.773 0.000767166 11.9489 0.0556308 12.0983 0.157656C12.2477 0.25968 12.3638 0.404285 12.4321 0.573183C12.5004 0.742081 12.5176 0.927688 12.4818 1.10653C12.4459 1.28538 12.3584 1.44943 12.2305 1.57795L7.14684 6.72704C7.06215 6.81353 6.96139 6.88218 6.85037 6.92903C6.73935 6.97588 6.62027 7 6.5 7C6.37973 7 6.26065 6.97588 6.14963 6.92903C6.03861 6.88218 5.93785 6.81353 5.85315 6.72704L0.769495 1.57795C0.641564 1.44943 0.55413 1.28538 0.518248 1.10653C0.482366 0.927686 0.499648 0.742079 0.567909 0.573181C0.63617 0.404283 0.752344 0.259678 0.901742 0.157654C1.05114 0.0556289 1.22705 0.000765323 1.40723 1.58625e-07Z" fill="#9797BB"/>
                                        </svg>
                                    </div>    
                                </div>
                            </div>
                            <div class="settings-integrations-form__date-column settings-integrations-form__date-column_end">
                                <div class="settings-integrations-form__date-column-title">Минут</div>
                                <div class="settings-integrations-form__date-input">
                                     <input v-model="minute" maxlength="2" min="0" max="23" step="1"  class="settings-integrations-form__date-input_transparent">
                                     <div class="settings-integrations-form__date-input-arrow">
                                        <svg @click="arrowNext(minute, 'minute')" width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.5928 7L1.40723 7C1.22705 6.99923 1.05114 6.94437 0.901741 6.84235C0.752344 6.74032 0.636169 6.59572 0.567908 6.42682C0.499647 6.25792 0.482365 6.07231 0.518247 5.89347C0.554129 5.71462 0.641564 5.55057 0.769494 5.42205L5.85315 0.272955C5.93785 0.186465 6.03861 0.117815 6.14963 0.0709676C6.26065 0.0241193 6.37973 4.18623e-07 6.5 4.29138e-07C6.62027 4.39652e-07 6.73935 0.0241194 6.85037 0.0709677C6.96139 0.117815 7.06215 0.186465 7.14685 0.272955L12.2305 5.42205C12.3584 5.55057 12.4459 5.71462 12.4818 5.89347C12.5176 6.07231 12.5004 6.25792 12.4321 6.42682C12.3638 6.59572 12.2477 6.74032 12.0983 6.84235C11.9489 6.94437 11.773 6.99923 11.5928 7Z" fill="#9797BB"/>
                                        </svg>
                                        <svg @click="arrowPrev(minute, 'minute')" width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.40723 1.58625e-07L11.5928 1.93952e-06C11.773 0.000767166 11.9489 0.0556308 12.0983 0.157656C12.2477 0.25968 12.3638 0.404285 12.4321 0.573183C12.5004 0.742081 12.5176 0.927688 12.4818 1.10653C12.4459 1.28538 12.3584 1.44943 12.2305 1.57795L7.14684 6.72704C7.06215 6.81353 6.96139 6.88218 6.85037 6.92903C6.73935 6.97588 6.62027 7 6.5 7C6.37973 7 6.26065 6.97588 6.14963 6.92903C6.03861 6.88218 5.93785 6.81353 5.85315 6.72704L0.769495 1.57795C0.641564 1.44943 0.55413 1.28538 0.518248 1.10653C0.482366 0.927686 0.499648 0.742079 0.567909 0.573181C0.63617 0.404283 0.752344 0.259678 0.901742 0.157654C1.05114 0.0556289 1.22705 0.000765323 1.40723 1.58625e-07Z" fill="#9797BB"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>  
            <div class="settings-integrations-form__date-column">
            <div>Напомнить за N дней дней после последнего визита </div>
            <div class="settings-integrations-form__container">
                <input class="settings-integrations-form__input_test " type="number" placeholder="0" v-model="NDay"
                 :class="{'yclient-pattern__error':error.nday, 'settings-integrations-form__select_active':focusDay}"
                  @focus="checkOpenModal(), focusDay=true" @blur="focusDay=false" > </div>
            </div>
        </div>
        <div class="settings-integrations-form__date settings-integrations-form__record-time settings-integrations-form__date settings-integrations-form__record-time_top">
      
        <div class="settings-integrations-form__date-column">
            <div>ID филиала</div>
             <div class="settings-integrations-form__container">
                <input class="settings-integrations-form__input_test " type="number" placeholder="Ввести" v-model="filial" 
                        :class="{'yclient-pattern__error':error.id, 'settings-integrations-form__select_active':focusId}" 
                    @focus="checkOpenModal(), focusId=true" @blur="focusId=false">
                </div>
                     </div>
                <div class="settings-integrations-form__date-column">
                    <div>Аккаунт</div>
                    <div class="settings-integrations-form__container">
                <div class="settings-integrations-form__container-arrow ">
                </div>
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
        </div>
         <!-- <div class="settings-integrations-form__date settings-integrations-form__record-time settings-integrations-form__date settings-integrations-form__record-time_top settings-integrations-form__record-time-dop">
                <div class="settings-integrations-form__date-column">
                    <div>Дополнительные фильтры</div>
                    <div class="settings-integrations-form__container">
                <div class="settings-integrations-form__container-arrow ">
                </div>
                <button @click="openFilters" class="settings-integrations-form__input_test" :class="{'settings-integrations-form__select_active': statusFiltersSelect }"> 
                    <div class="settings-integrations-form__dropdown-inner settings-integrations-form__dropdown-inner_placeholder"> Показать
                      <svg :class="{'settings-integrations-form__dropdown-inner-svg_green': statusFiltersSelect }"  class='settings-integrations-form__dropdown-inner-svg' width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.14053 0.197198C9.07855 0.134713 9.00482 0.0851166 8.92358 0.051271C8.84234 0.0174253 8.7552 0 8.6672 0C8.57919 0 8.49205 0.0174253 8.41081 0.051271C8.32957 0.0851166 8.25584 0.134713 8.19386 0.197198L5.14053 3.25052C5.07855 3.31301 5.00482 3.3626 4.92358 3.39645C4.84234 3.43029 4.7552 3.44772 4.6672 3.44772C4.57919 3.44772 4.49205 3.43029 4.41081 3.39645C4.32957 3.3626 4.25584 3.31301 4.19386 3.25052L1.14053 0.197198C1.07855 0.134713 1.00482 0.0851166 0.92358 0.051271C0.84234 0.0174253 0.755203 0 0.667195 0C0.579187 0 0.49205 0.0174253 0.41081 0.051271C0.329571 0.0851166 0.255837 0.134713 0.193862 0.197198C0.0696944 0.322106 0 0.491073 0 0.667197C0 0.84332 0.0696944 1.01229 0.193862 1.1372L3.25386 4.19719C3.62886 4.57172 4.13719 4.78209 4.6672 4.78209C5.1972 4.78209 5.70553 4.57172 6.08053 4.19719L9.14053 1.1372C9.2647 1.01229 9.33439 0.84332 9.33439 0.667197C9.33439 0.491073 9.2647 0.322106 9.14053 0.197198Z" fill="#CFCFE4"/>
                        </svg>
                    </div>
                </button> 
                <div class="settings-integrations-form__dropdown-list settings-integrations-form__dropdown-list-filters" 
                :class="{' settings-integrations-form__dropdown-list-filters_hidden':!statusFiltersSelect}">
                    
                         <div class="settings-integrations-form__date-column">
                    <div>Услуги</div>
                    <div class="settings-integrations-form__container">
                <div class="settings-integrations-form__container-arrow ">
                </div>
                <button @click="openSelectFilter(openServices,'openServices')" class="settings-integrations-form__input_test " :class="{'settings-integrations-form__select_active': openServices,'yclient-pattern__error':error.textOption }"> 
                    <div class="settings-integrations-form__dropdown-inner" :class="{'settings-integrations-form__dropdown-inner_placeholder':(textOption=='Выбрать')}"> {{textOption}}
                        <svg class="settings-integrations-form__dropdown-inner-arrow" width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.1888 2.46058C4.16403 2.48338 4.1346 2.50147 4.1022 2.51381C4.06981 2.52615 4.03508 2.5325 4 2.5325C3.96492 2.5325 3.93019 2.52615 3.8978 2.51381C3.8654 2.50147 3.83597 2.48338 3.8112 2.46058L1.36591 0.215245C1.21591 0.0774725 1.01243 4.67421e-05 0.800243 7.24799e-07C0.588055 -4.52925e-05 0.384538 0.0772927 0.234464 0.215001C0.084389 0.352709 5.0074e-05 0.539506 6.11966e-08 0.7343C-4.99516e-05 0.929095 0.0841932 1.11593 0.234197 1.2537L2.68002 3.49904C3.03044 3.81985 3.50512 4 4 4C4.49488 4 4.96956 3.81985 5.31998 3.49904L7.7658 1.2537C7.91581 1.11593 8.00005 0.929095 8 0.7343C7.99995 0.539506 7.91561 0.352709 7.76554 0.215001C7.61546 0.0772928 7.41194 -4.52111e-05 7.19976 8.01112e-07C6.98757 4.68134e-05 6.78409 0.0774725 6.63409 0.215245L4.1888 2.46058Z" fill="#9797BB">
                            </path>
                        </svg>
                        </div>
                        <div class="settings-integrations-form__dropdown-list" v-if="openServices">
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
                           
                        </div>
                </button>
                </div>
                </div>
                <div class="settings-integrations-form__date-column">
                    <div>Категория клиентов</div>
                    <div class="settings-integrations-form__container">
                <div class="settings-integrations-form__container-arrow ">
                </div>
                <button @click="openSelectFilter(openClient, 'openClient') " class="settings-integrations-form__input_test " :class="{'settings-integrations-form__select_active': openClient,'yclient-pattern__error':error.textOption }"> 
                    <div class="settings-integrations-form__dropdown-inner" :class="{'settings-integrations-form__dropdown-inner_placeholder':(textOption=='Выбрать')}"> {{textOption}}
                        <svg class="settings-integrations-form__dropdown-inner-arrow" width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.1888 2.46058C4.16403 2.48338 4.1346 2.50147 4.1022 2.51381C4.06981 2.52615 4.03508 2.5325 4 2.5325C3.96492 2.5325 3.93019 2.52615 3.8978 2.51381C3.8654 2.50147 3.83597 2.48338 3.8112 2.46058L1.36591 0.215245C1.21591 0.0774725 1.01243 4.67421e-05 0.800243 7.24799e-07C0.588055 -4.52925e-05 0.384538 0.0772927 0.234464 0.215001C0.084389 0.352709 5.0074e-05 0.539506 6.11966e-08 0.7343C-4.99516e-05 0.929095 0.0841932 1.11593 0.234197 1.2537L2.68002 3.49904C3.03044 3.81985 3.50512 4 4 4C4.49488 4 4.96956 3.81985 5.31998 3.49904L7.7658 1.2537C7.91581 1.11593 8.00005 0.929095 8 0.7343C7.99995 0.539506 7.91561 0.352709 7.76554 0.215001C7.61546 0.0772928 7.41194 -4.52111e-05 7.19976 8.01112e-07C6.98757 4.68134e-05 6.78409 0.0774725 6.63409 0.215245L4.1888 2.46058Z" fill="#9797BB">
                            </path>
                        </svg>
                        </div>
                        <div class="settings-integrations-form__dropdown-list" v-if="openClient">
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
                           
                        </div>
                </button>
                </div>
                </div>
                <div class="settings-integrations-form__date-column">
                    <div>Сотрудник</div>
                    <div class="settings-integrations-form__container">
                <div class="settings-integrations-form__container-arrow ">
                </div>
                <button @click="openSelectFilter(openPeople, 'openPeople')" class="settings-integrations-form__input_test " :class="{'settings-integrations-form__select_active': openPeople,'yclient-pattern__error':error.textOption }"> 
                    <div class="settings-integrations-form__dropdown-inner" :class="{'settings-integrations-form__dropdown-inner_placeholder':(textOption=='Выбрать')}"> {{textOption}}
                        <svg class="settings-integrations-form__dropdown-inner-arrow" width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.1888 2.46058C4.16403 2.48338 4.1346 2.50147 4.1022 2.51381C4.06981 2.52615 4.03508 2.5325 4 2.5325C3.96492 2.5325 3.93019 2.52615 3.8978 2.51381C3.8654 2.50147 3.83597 2.48338 3.8112 2.46058L1.36591 0.215245C1.21591 0.0774725 1.01243 4.67421e-05 0.800243 7.24799e-07C0.588055 -4.52925e-05 0.384538 0.0772927 0.234464 0.215001C0.084389 0.352709 5.0074e-05 0.539506 6.11966e-08 0.7343C-4.99516e-05 0.929095 0.0841932 1.11593 0.234197 1.2537L2.68002 3.49904C3.03044 3.81985 3.50512 4 4 4C4.49488 4 4.96956 3.81985 5.31998 3.49904L7.7658 1.2537C7.91581 1.11593 8.00005 0.929095 8 0.7343C7.99995 0.539506 7.91561 0.352709 7.76554 0.215001C7.61546 0.0772928 7.41194 -4.52111e-05 7.19976 8.01112e-07C6.98757 4.68134e-05 6.78409 0.0774725 6.63409 0.215245L4.1888 2.46058Z" fill="#9797BB">
                            </path>
                        </svg>
                        </div>
                        <div class="settings-integrations-form__dropdown-list" v-if="openPeople">
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
                           
                        </div>
                </button>
                </div>
                </div>
                       
                    <div class="settings-integrations-form__dropdown-list-filters-title">Клиент потратил сумму</div>
                            <div class="settings-integrations-form__date-row">
                                <div class="settings-integrations-form__date-column">
                                <div class="settings-integrations-form__date-column-title">От</div>
                               <input type="number"   min="0"  class="settings-integrations-form__date-input" placeholder="00" @focus="openSelectFilter()">
                            </div>
                            <div class="settings-integrations-form__date-column settings-integrations-form__date-column_end">
                                <div class="settings-integrations-form__date-column-title">До</div>
                               <input type="number"   min="0"  class="settings-integrations-form__date-input"  placeholder="00" @focus="openSelectFilter()">
                            </div>
                        </div>
                        <div class="settings-integrations-form__dropdown-list-filters-title">Кол-во посещений</div>
                            <div class="settings-integrations-form__date-row">
                                <div class="settings-integrations-form__date-column">
                                <div class="settings-integrations-form__date-column-title">От</div>
                                <input type="number"   min="0" class="settings-integrations-form__date-input"  placeholder="00" @focus="openSelectFilter()">
                            </div>
                            <div class="settings-integrations-form__date-column settings-integrations-form__date-column_end">
                                <div class="settings-integrations-form__date-column-title">До</div>
                                <input type="number"   min="0"  class="settings-integrations-form__date-input"  placeholder="00" @focus="openSelectFilter()">
                            </div>
                        </div>
                        <div class="settings-integrations-form__checkbox_no-padding" >
                            <div class="settings-integrations-form__checkbox-title"> Статус записей</div>
                            <BaseCheckbox :id="index" :title="checkbox[0]" v-for="(checkbox, index) in checkboxs" :key="index" :name="status" @click="openSelectFilter()" 
                            ></BaseCheckbox>
                        </div>
                        </div>
                </div>
            </div>
        </div> -->
   
     </div>
     <div class="settings-integrations-form__field ">
        <div class=" settings-integrations-form__create-message">
            <SettingsIntegrationsMessage  @dataFile='checkData' @propText="getText" :text='textMess' :nameFile='propFileData'
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
import { useInstagram } from "../../../../composition/useInstagrams";
import  BaseCheckbox  from "../../../../components/Base/BaseCheckbox.vue";

export default {
  components: { SettingsIntegrationsMessage, SettingsIntegrationsVariables, TestCheck, BaseCheckbox },
  props: {
    Propdata:Object,
    isCloseAll:Boolean,
    },

    setup(props) {
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
        const fileData = ref([])
        const propFileData = ref('');
        const sum1 = ref(1);
        const sum2 = ref(2);
        const name = ref('');
        const filial = ref('');
        const NDay = ref('');
        const message = ref('');
        const whatsappId=ref('');
        const textMess = ref('')
        const propsCheck = ref(true);
        const focusName = ref(false);
        const focusId = ref(false);
         const focusDay = ref(false);
         const instId=ref('');
           const checkboxs = ref([
            ['Ожидание клиента', false],
            ['Клиент пришел', false],
            ['Клиент не пришел', false],
            ['Клиент подтвердил', false],
        ])
         const openServices = ref(false);
         const openPeople =ref(false);
         const openClient = ref(false)
        getWhatsapps()
        textOption.value = 'Выбрать';
        const data = ref({
                type: "RevisitReminder",
                task_name: "Напоминание о повторном визите",
                parameters:
                [
                    {
                        message: {
                            type: "text",
                            data: ""
                        },
                        instagram_id : null,
                        n_day : null,
                        whatsapp_id : null,
                        start_time : "",
                        company_id : null
                    }
                ]
            })
            const openSelectFilter = (item, name) => {
                if(name == 'openServices'){
                openServices.value=!openServices.value
                openClient.value=false
                openPeople.value=false
                }
                else if (name =='openClient'){
                openServices.value=false
                openClient.value=!openClient.value
                openPeople.value=false
                }
                else if (name == 'openPeople'){
                openServices.value=false
                openClient.value=false
                openPeople.value=!openPeople.value
                }
                else{
                  openServices.value=false
                openClient.value=false
                openPeople.value=false   
                }
              
          
            }
             const checkData = (data) => {
                if(data.length!=0){                
                   fileData.value = data
                  
                }
            }
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
             const checkTime  = (item, name) => {
            if(hours.value>24){
                hours.value = 23;
            }
            if(minute.value>59){
                minute.value = 59;
            }
        }
        const error = ref(
            {
                textOption:false,
                id:false,
                message:false,
                name:false,
                nday:false,
                timeOption:false,
            })
            const ValidateDate = () => {
                const valid = ref(true);
                if(textOption.value=='Выбрать'){
                    data.value.parameters[0].company_id ='';
                     error.value.textOption = true;
                      valid.value= false
                }
                else{
                    data.value.parameters[0].company_id = String(filial.value);  
                }
                if(NDay.value==''){
                    data.value.parameters[0].n_day ='';
                    error.value.nday = true;
                      valid.value= false
                }
                else{
                    data.value.parameters[0].n_day = NDay.value; 
                }
                if(timeOption.value=='Выбрать'){
                    data.value.parameters[0].start_time ='';
                    error.value.timeOption = true;
                    valid.value= false
                }
                else{
                    data.value.parameters[0].start_time = timeOption.value;   
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
                 if(data.value.parameters[0].instagram_id==null){
                        delete data.value.parameters[0].instagram_id
                    }
                return   valid.value
            }
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
                timeOption.value=props.Propdata.parameters[0].start_time;
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
                NDay.value = props.Propdata.parameters[0].n_day
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
               propsCheck.value = false;  
             }
                checkUpdate.value = false
            }
            }
        })
        
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
            checkTime()
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
        const values = reactive( {
            title: ['Поздравление с днём рождения', 'fdfc', 'fsfsf', 'fsfs' ]
        })
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
                 time = Number(time[1]);
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
            checkOpenModal,
            openSelect,
            statusSelect,
            values,
            chooseOption,
            checkboxs,
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
            NDay,
            checkData,
            fileData,
            propFileData,
            instagrams,
            propsCheck,
            checkTime,
            testSend,
            instId,
            checkUpdate,
            error,
            openServices,
            openPeople,
            openClient,
            openSelectFilter,
            focusName,
            focusId,
            focusDay
        }
    },
}
</script>
<style lang="scss">



.settings-integrations-form__record-time{
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
    .settings-integrations-form__date-input_transparent{
        background: transparent;
        color:#DEDEEE;
    }
    &-filters{
    display: flex;
    flex-direction: column;
    padding: 0px 18px;
    width: 93%;
    .settings-integrations-form__date-row{
        display: flex;
        padding-bottom: 18px;
        border-bottom: 1px solid #40406B;
        flex-direction: row;
    }
    &-title{
        padding-bottom: 16px;
        padding-top: 18px;
    }
    input[type="number"]::-webkit-outer-spin-button, 
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none; 
        background: var(--messenger-search-input-bg-active) url('../../../../assets/arrowFilters.svg') no-repeat center center;
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
    &-dop{
       width:71.3%;
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
        .settings-integrations-form__create-message_error{
        .settings-integrations-form__input_test{
            border: 0.7px solid var(--red-color);
        }
}
</style>