<template>
    <div class="settings-finance__rates">
        <div class="settings-finance__tariff">
            <h2>Тарифы</h2>
            <div class="settings-finance__type-tariff">
                <div :id = "arr[0].id" class="settings-finance__type-tariff_base" :class="{'tariff_active' : arr[0].active}" @click="searchElemnt(arr[0])">БАЗОВЫЙ</div>
                <div :id = "arr[1].id"  class="settings-finance__type-tariff_start" :class="{'tariff_active': arr[1].active}" @click="searchElemnt(arr[1])">START</div>
                <div :id = "arr[2].id"  class="settings-finance__type-tariff_pro" :class="{'tariff_active' : arr[2].active}" @click="searchElemnt(arr[2])">PRO</div>
            </div>
        </div>
        <div class="settings-finance__info">
            <table>
                <tr class="settings-finance__info_table">
                    <td>КОЛ-ВО ДИАЛОГОВ</td>
                    <td>30 в месяц</td>
                    <td class="settings-finance__info_table-start">120 в месяц</td>
                    <td class="settings-finance__info_tabled">Неограничено</td>
                    <td></td>
                </tr>
                <tr class="settings-finance__info_table">
                    <td>КОЛИЧЕСТВО ОПЕРАТОРОВ</td>
                    <td>2 оператора</td>
                    <td class="settings-finance__info_table-start">2 оператора</td>
                    <td class="settings-finance__info_table-last">Неограничено</td>
                    <td></td>
                </tr>
                <tr class="settings-finance__info_table">
                    <td>СРОК ХРАНЕНИЯ ПЕРЕПИСКИ</td>
                    <td>2 месяца</td>
                    <td class="settings-finance__info_table-start">Неограничено</td>
                    <td class="settings-finance__info_table-last">Неограничено</td>
                    <td></td>
                </tr>
            </table>
        </div>
        <div class="settings-finance__payment">
            <h2>Оплата</h2>
            <div class="settings-finance__type-payment">
                <div :id = "mounth[0].id" class="settings-finance__type-payment_mounth" :class="{'tariff_active-payment' : mounth[0].active}" @click="searchMounth(mounth[0])">КАЖДЫЙ МЕСЯЦ</div>
                <div :id = "mounth[1].id" class="settings-finance__type-payment_mounth" :class="{'tariff_active-payment' : mounth[1].active}" @click="searchMounth(mounth[1])">3 МЕСЯЦА -10%</div>
                <div :id = "mounth[2].id" class="settings-finance__type-payment_mounth" :class="{'tariff_active-payment' : mounth[2].active}" @click="searchMounth(mounth[2])">6 МЕСЯЦЕВ -20%</div>
                <div :id = "mounth[3].id" class="settings-finance__type-payment_mounth" :class="{'tariff_active-payment' : mounth[3].active}" @click="searchMounth(mounth[3])">12 МЕСЯЦЕВ -30%</div>
                <div :id = "mounth[4].id" class="settings-finance__type-payment_mounth" :class="{'tariff_active-payment' : mounth[4].active}" @click="searchMounth(mounth[4])">24 МЕСЯЦА -40%</div>
            </div>
        </div>
        <table class="settings-finance__calculator">
            <tr class="settings-finance__calculator_titles">
                <td>НАИМЕНОВАНИЕ ПАРАМЕТРОВ</td>
                <td>СТОИМОСТЬ</td>
                <td>КОЛ-ВО</td>
                <td>СКИДКА</td>
                <td>ОПЦИИ</td>
            </tr>
            <tr class="settings-finance__calculator_values">
                <td>КАНАЛ-WHATSAPP</td>
                <td>{{ initialСost[0].price }}₽/мес</td>
                <td class="settings-finance__btn">
                    <button class="settings-finance__btn_minus" @click="decrimentWhats()" >
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.25 9.25H6.75C6.33579 9.25 6 9.58579 6 10C6 10.4142 6.33579 10.75 6.75 10.75H14.25C14.6642 10.75 15 10.4142 15 10C15 9.58579 14.6642 9.25 14.25 9.25Z" fill="#CFCFE4"/>
                            <rect x="1" y="0.5" width="19" height="19" rx="2.5" stroke="#CFCFE4"/>
                        </svg>
                    </button>
                    <span>{{ count[0].numberWhats }}</span>
                    <button class="settings-finance__btn_plus" @click="incrementWhats()">
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0)">
                                <path d="M14.25 9.25H11.25V6.25C11.25 6.05109 11.171 5.86032 11.0303 5.71967C10.8897 5.57902 10.6989 5.5 10.5 5.5C10.3011 5.5 10.1103 5.57902 9.96967 5.71967C9.82902 5.86032 9.75 6.05109 9.75 6.25V9.25H6.75C6.55109 9.25 6.36032 9.32902 6.21967 9.46967C6.07902 9.61032 6 9.80109 6 10C6 10.1989 6.07902 10.3897 6.21967 10.5303C6.36032 10.671 6.55109 10.75 6.75 10.75H9.75V13.75C9.75 13.9489 9.82902 14.1397 9.96967 14.2803C10.1103 14.421 10.3011 14.5 10.5 14.5C10.6989 14.5 10.8897 14.421 11.0303 14.2803C11.171 14.1397 11.25 13.9489 11.25 13.75V10.75H14.25C14.4489 10.75 14.6397 10.671 14.7803 10.5303C14.921 10.3897 15 10.1989 15 10C15 9.80109 14.921 9.61032 14.7803 9.46967C14.6397 9.32902 14.4489 9.25 14.25 9.25Z" fill="#CFCFE4"/>
                            </g>
                            <rect x="1" y="0.5" width="19" height="19" rx="2.5" stroke="#CFCFE4"/>
                            <defs>
                                <clipPath id="clip0">
                                    <rect width="18" height="18" fill="white" transform="translate(1.5 1)"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                </td>
                <td>-{{initialСost[7].price}}%</td>
                <td>
                    <button class="settings-finance__btn_reset" @click="resetWhatsNumber">Очистить</button>
                </td>
            </tr>
            <tr class="settings-finance__calculator_values">
                <td>КАНАЛ-INSTAGRAM</td>
                <td>{{ initialСost[0].price }}₽/мес</td>
                <td class="settings-finance__btn">
                    <button class="settings-finance__btn_minus" @click="decrimentInst()" >
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.25 9.25H6.75C6.33579 9.25 6 9.58579 6 10C6 10.4142 6.33579 10.75 6.75 10.75H14.25C14.6642 10.75 15 10.4142 15 10C15 9.58579 14.6642 9.25 14.25 9.25Z" fill="#CFCFE4"/>
                            <rect x="1" y="0.5" width="19" height="19" rx="2.5" stroke="#CFCFE4"/>
                        </svg>
                    </button>
                    <span>{{ count[1].numberInst }}</span>
                    <button class="settings-finance__btn_plus" @click="incrementInst()">
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0)">
                                <path d="M14.25 9.25H11.25V6.25C11.25 6.05109 11.171 5.86032 11.0303 5.71967C10.8897 5.57902 10.6989 5.5 10.5 5.5C10.3011 5.5 10.1103 5.57902 9.96967 5.71967C9.82902 5.86032 9.75 6.05109 9.75 6.25V9.25H6.75C6.55109 9.25 6.36032 9.32902 6.21967 9.46967C6.07902 9.61032 6 9.80109 6 10C6 10.1989 6.07902 10.3897 6.21967 10.5303C6.36032 10.671 6.55109 10.75 6.75 10.75H9.75V13.75C9.75 13.9489 9.82902 14.1397 9.96967 14.2803C10.1103 14.421 10.3011 14.5 10.5 14.5C10.6989 14.5 10.8897 14.421 11.0303 14.2803C11.171 14.1397 11.25 13.9489 11.25 13.75V10.75H14.25C14.4489 10.75 14.6397 10.671 14.7803 10.5303C14.921 10.3897 15 10.1989 15 10C15 9.80109 14.921 9.61032 14.7803 9.46967C14.6397 9.32902 14.4489 9.25 14.25 9.25Z" fill="#CFCFE4"/>
                            </g>
                            <rect x="1" y="0.5" width="19" height="19" rx="2.5" stroke="#CFCFE4"/>
                            <defs>
                                <clipPath id="clip0">
                                    <rect width="18" height="18" fill="white" transform="translate(1.5 1)"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                </td>
                <td>-{{initialСost[7].price}}%</td>
                <td><button class="settings-finance__btn_reset" @click="resetInstNumber">Очистить</button></td>
            </tr>
            <tr class="settings-finance__calculator_values">
                <td>КОЛ-ВО ПОДАРОЧНЫХ ДНЕЙ</td>
                <td></td>
                <td class="settings-finance__calculator_values-days">{{initialСost[10].count}}</td>
                <td></td>
                <td></td>
            </tr>
            <tr style="display:none;" class="settings-finance__calculator_values">
                <td>
                <div class="settings-finance__calculator_values-question">
                    <svg  width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.99992 0.5C10.6819 0.5 13.6666 3.48467 13.6666 7.16667C13.6666 10.8487 10.6819 13.8333 
                        6.99992 13.8333C3.31792 13.8333 0.333252 10.8487 0.333252 7.16667C0.333252 3.48467 3.31792 0.5 6.99992 
                        0.5ZM6.99992 1.33333C3.77825 1.33333 1.16659 3.945 1.16659 7.16667C1.16659 10.3883 3.77825 13 6.99992 
                        13C10.2216 13 12.8333 10.3883 12.8333 7.16667C12.8333 3.945 10.2216 1.33333 6.99992 1.33333ZM7.08325 
                        9.83333C7.21586 9.83333 7.34304 9.88601 7.43681 9.97978C7.53057 10.0735 7.58325 10.2007 7.58325 
                        10.3333C7.58325 10.4659 7.53057 10.5931 7.43681 10.6869C7.34304 10.7807 7.21586 10.8333 7.08325 
                        10.8333C6.95064 10.8333 6.82347 10.7807 6.7297 10.6869C6.63593 10.5931 6.58325 10.4659 6.58325 
                        10.3333C6.58325 10.2007 6.63593 10.0735 6.7297 9.97978C6.82347 9.88601 6.95064 9.83333 7.08325 
                        9.83333ZM7.08325 3.5C8.20492 3.5 9.16659 4.46067 9.16659 5.583C9.16725 6.28967 8.91025 6.73967 
                        8.27392 7.42567L7.93559 7.788C7.59459 8.16767 7.45959 8.40833 7.44692 8.693L7.44592 8.747L7.44392 
                        8.78967L7.43792 8.831C7.41781 8.93219 7.36088 9.02233 7.27815 9.08396C7.19541 9.14559 7.09275 9.17433 
                        6.99004 9.16462C6.88733 9.15492 6.79187 9.10745 6.72214 9.03141C6.65241 8.95537 6.61338 8.85617 6.61259 
                        8.753C6.60825 8.15667 6.83825 7.749 7.38192 7.158L7.72425 6.792C8.17692 6.29467 8.33359 6.001 8.33325 
                        5.58333C8.33325 4.921 7.74492 4.33333 7.08325 4.33333C6.44325 4.33333 5.87125 4.88467 5.83525 5.51967L5.83125 
                        5.626C5.82078 5.73263 5.76963 5.83113 5.68843 5.90104C5.60723 5.97094 5.50223 6.00688 5.39522 6.00139C5.28822 
                        5.9959 5.18745 5.9494 5.11383 5.87155C5.04022 5.79369 4.99942 5.69048 4.99992 5.58333C4.99992 4.46167 5.96192 
                        3.5 7.08325 3.5Z" fill="#9797BB"/>
                    </svg>
                    
                    <div class="settings-finance__calculator_message">
                        <div class="settings-finance__calculator_message-arrov">
                        </div>
                        <div class="settings-finance__calculator_message-text">
                            Валидатор — это сервис, для проверки базы клиентов на наличие установленного на телефоне WhatsApp.
                        </div>
                    </div>
                </div>
                    <span class="settings-finance__calculator_values-text"> 
                        ВАЛИДАЦИЯ БАЗЫ
                    </span>
                    
                </td>
                <td>500₽/мес</td>
                <td></td>
                <td></td>
                <td>
                    <label class="switch">
                        <input type="checkbox" @click="toggleValidationBase()">
                        <div class="slider round"></div>
                    </label>  
                </td>
            </tr>
            <tr style="display: none;" class="settings-finance__calculator_values">
                <td>
                <div class="settings-finance__calculator_values-question">
                    <svg  width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.99992 0.5C10.6819 0.5 13.6666 3.48467 13.6666 7.16667C13.6666 10.8487 10.6819 13.8333 
                        6.99992 13.8333C3.31792 13.8333 0.333252 10.8487 0.333252 7.16667C0.333252 3.48467 3.31792 0.5 6.99992 
                        0.5ZM6.99992 1.33333C3.77825 1.33333 1.16659 3.945 1.16659 7.16667C1.16659 10.3883 3.77825 13 6.99992 
                        13C10.2216 13 12.8333 10.3883 12.8333 7.16667C12.8333 3.945 10.2216 1.33333 6.99992 1.33333ZM7.08325 
                        9.83333C7.21586 9.83333 7.34304 9.88601 7.43681 9.97978C7.53057 10.0735 7.58325 10.2007 7.58325 
                        10.3333C7.58325 10.4659 7.53057 10.5931 7.43681 10.6869C7.34304 10.7807 7.21586 10.8333 7.08325 
                        10.8333C6.95064 10.8333 6.82347 10.7807 6.7297 10.6869C6.63593 10.5931 6.58325 10.4659 6.58325 
                        10.3333C6.58325 10.2007 6.63593 10.0735 6.7297 9.97978C6.82347 9.88601 6.95064 9.83333 7.08325 
                        9.83333ZM7.08325 3.5C8.20492 3.5 9.16659 4.46067 9.16659 5.583C9.16725 6.28967 8.91025 6.73967 
                        8.27392 7.42567L7.93559 7.788C7.59459 8.16767 7.45959 8.40833 7.44692 8.693L7.44592 8.747L7.44392 
                        8.78967L7.43792 8.831C7.41781 8.93219 7.36088 9.02233 7.27815 9.08396C7.19541 9.14559 7.09275 9.17433 
                        6.99004 9.16462C6.88733 9.15492 6.79187 9.10745 6.72214 9.03141C6.65241 8.95537 6.61338 8.85617 6.61259 
                        8.753C6.60825 8.15667 6.83825 7.749 7.38192 7.158L7.72425 6.792C8.17692 6.29467 8.33359 6.001 8.33325 
                        5.58333C8.33325 4.921 7.74492 4.33333 7.08325 4.33333C6.44325 4.33333 5.87125 4.88467 5.83525 5.51967L5.83125 
                        5.626C5.82078 5.73263 5.76963 5.83113 5.68843 5.90104C5.60723 5.97094 5.50223 6.00688 5.39522 6.00139C5.28822 
                        5.9959 5.18745 5.9494 5.11383 5.87155C5.04022 5.79369 4.99942 5.69048 4.99992 5.58333C4.99992 4.46167 5.96192 
                        3.5 7.08325 3.5Z" fill="#9797BB"/>
                    </svg>
                    
                    <div class="settings-finance__calculator_message">
                        <div class="settings-finance__calculator_message-arrov">
                        </div>
                        <div class="settings-finance__calculator_message-text">
                            Эта функция позволяет установить стабильную интеграцию и получать сообщения с WhatsApp не зависимо от того, 
                            находится телефон в сети или нет, так как номер находится на нашем ресурсе с бесперебойным подключением.
                        </div>
                    </div>
                </div>
                    <span class="settings-finance__calculator_values-text"> 
                        АРЕНДА ВИРТУАЛЬНЫХ НОМЕРОВ
                    </span>
                </td>
                <td>500₽/мес</td>
                <td></td>
                <td></td>
                <td>
                    <label class="switch">
                        <input type="checkbox" @click="toggleTubeRental()">
                        <div class="slider round"></div>
                    </label>  
                </td>
            </tr>
            <tr style="display: none;" class="settings-finance__calculator_values">
                <td>
                <div class="settings-finance__calculator_values-question">
                    <svg  width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.99992 0.5C10.6819 0.5 13.6666 3.48467 13.6666 7.16667C13.6666 10.8487 10.6819 13.8333 
                        6.99992 13.8333C3.31792 13.8333 0.333252 10.8487 0.333252 7.16667C0.333252 3.48467 3.31792 0.5 6.99992 
                        0.5ZM6.99992 1.33333C3.77825 1.33333 1.16659 3.945 1.16659 7.16667C1.16659 10.3883 3.77825 13 6.99992 
                        13C10.2216 13 12.8333 10.3883 12.8333 7.16667C12.8333 3.945 10.2216 1.33333 6.99992 1.33333ZM7.08325 
                        9.83333C7.21586 9.83333 7.34304 9.88601 7.43681 9.97978C7.53057 10.0735 7.58325 10.2007 7.58325 
                        10.3333C7.58325 10.4659 7.53057 10.5931 7.43681 10.6869C7.34304 10.7807 7.21586 10.8333 7.08325 
                        10.8333C6.95064 10.8333 6.82347 10.7807 6.7297 10.6869C6.63593 10.5931 6.58325 10.4659 6.58325 
                        10.3333C6.58325 10.2007 6.63593 10.0735 6.7297 9.97978C6.82347 9.88601 6.95064 9.83333 7.08325 
                        9.83333ZM7.08325 3.5C8.20492 3.5 9.16659 4.46067 9.16659 5.583C9.16725 6.28967 8.91025 6.73967 
                        8.27392 7.42567L7.93559 7.788C7.59459 8.16767 7.45959 8.40833 7.44692 8.693L7.44592 8.747L7.44392 
                        8.78967L7.43792 8.831C7.41781 8.93219 7.36088 9.02233 7.27815 9.08396C7.19541 9.14559 7.09275 9.17433 
                        6.99004 9.16462C6.88733 9.15492 6.79187 9.10745 6.72214 9.03141C6.65241 8.95537 6.61338 8.85617 6.61259 
                        8.753C6.60825 8.15667 6.83825 7.749 7.38192 7.158L7.72425 6.792C8.17692 6.29467 8.33359 6.001 8.33325 
                        5.58333C8.33325 4.921 7.74492 4.33333 7.08325 4.33333C6.44325 4.33333 5.87125 4.88467 5.83525 5.51967L5.83125 
                        5.626C5.82078 5.73263 5.76963 5.83113 5.68843 5.90104C5.60723 5.97094 5.50223 6.00688 5.39522 6.00139C5.28822 
                        5.9959 5.18745 5.9494 5.11383 5.87155C5.04022 5.79369 4.99942 5.69048 4.99992 5.58333C4.99992 4.46167 5.96192 
                        3.5 7.08325 3.5Z" fill="#9797BB"/>
                    </svg>
                    
                    <div class="settings-finance__calculator_message">
                        <div class="settings-finance__calculator_message-arrov">
                        </div>
                        <div class="settings-finance__calculator_message-text">
                            Рассылка WhatsApp — это массовая отправка сообщений по выбранной базе контактов. Максимальная рассылка 
                            200 000 контактов.
                        </div>
                    </div>
                </div>
                    <span class="settings-finance__calculator_values-text"> 
                        МАССОВЫЕ РАССЫЛКИ В WHATSAPP
                    </span>
                </td>
                <td>2₽/мес</td>
                <td class="settings-finance__btn">
                    <button class="settings-finance__btn_minus" @click="decrimentMailing()" >
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.25 9.25H6.75C6.33579 9.25 6 9.58579 6 10C6 10.4142 6.33579 10.75 6.75 10.75H14.25C14.6642 10.75 15 10.4142 15 10C15 9.58579 14.6642 9.25 14.25 9.25Z" fill="#CFCFE4"/>
                            <rect x="1" y="0.5" width="19" height="19" rx="2.5" stroke="#CFCFE4"/>
                        </svg>
                    </button>
                    <span>{{ count[2].numberMailing }}</span>
                    <button class="settings-finance__btn_plus" @click="incrementMailing()">
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0)">
                                <path d="M14.25 9.25H11.25V6.25C11.25 6.05109 11.171 5.86032 11.0303 5.71967C10.8897 5.57902 10.6989 5.5 10.5 5.5C10.3011 5.5 10.1103 5.57902 9.96967 5.71967C9.82902 5.86032 9.75 6.05109 9.75 6.25V9.25H6.75C6.55109 9.25 6.36032 9.32902 6.21967 9.46967C6.07902 9.61032 6 9.80109 6 10C6 10.1989 6.07902 10.3897 6.21967 10.5303C6.36032 10.671 6.55109 10.75 6.75 10.75H9.75V13.75C9.75 13.9489 9.82902 14.1397 9.96967 14.2803C10.1103 14.421 10.3011 14.5 10.5 14.5C10.6989 14.5 10.8897 14.421 11.0303 14.2803C11.171 14.1397 11.25 13.9489 11.25 13.75V10.75H14.25C14.4489 10.75 14.6397 10.671 14.7803 10.5303C14.921 10.3897 15 10.1989 15 10C15 9.80109 14.921 9.61032 14.7803 9.46967C14.6397 9.32902 14.4489 9.25 14.25 9.25Z" fill="#CFCFE4"/>
                            </g>
                            <rect x="1" y="0.5" width="19" height="19" rx="2.5" stroke="#CFCFE4"/>
                            <defs>
                                <clipPath id="clip0">
                                    <rect width="18" height="18" fill="white" transform="translate(1.5 1)"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                </td>
                <td></td>
                <td><button class="settings-finance__btn_reset" @click="resetMailingNumber">Очистить</button></td>
            </tr>
        </table>
        <div class="settings-finance__total">
            <h2>Итого к оплате</h2>
            <h2>{{initialСost[8].price}} ₽</h2>
        </div>
        <div class="settings-finance__total settings-finance__total_without-discount">
            <h2>Цена без скидки</h2>
            <h2>{{initialСost[11].price}} ₽</h2>
        </div>
        
        <div class="settings-finance__pay">

            <router-link to="/settings/finance/history" v-if="returnFinance.tariff_id != undefined"><button type="button" class="settings-finance__pay-button" @click="update()">Обновить</button></router-link>
            <button type="button" class="settings-finance__pay-button" @click="createNewFinance(returnFinance.user_tariff_id)" v-if="returnFinance.tariff_id == undefined">Оплатить</button>
             
        </div>
    </div> 
    
    <Payment v-if="isModalOpen" @closePay="closePay()"></Payment>
</template>
<script>
import { ref, onMounted, onUpdated } from 'vue'
import Payment from '@/components/SettingsContainer/SettingsFinanse/settings-finance-payment.vue'
import { useFinance } from "@/composition/useFinance";
export default {
    components: {
        Payment,
    },
    setup() {

        const {createFinance, getSingleFinance, returnFinance, updateFinance, returnFinanceHistory, paymentFinance, linkPayment, routerTrue} = useFinance();

        routerTrue.value.link = "/settings/finance/rates"

        const arr = ref([   //initial type tariff block
            {id:0, active:true},
            {id:1, active:false},
            {id:2, active:false},
        ])
        const initialСost = ref([   //initial price in dependence of tariff
            {name: "View", price: 0}, //displaying the cost per channel 
            {name: "Base", price: 0, id: 1}, //Base price
            {name: "Start", price: 950, id: 2},  //Start price 
            {name: "Pro", price: 2100, id: 3},   //Pro price
            {name: "ValidationBase", price: 0}, //Validation base price
            {name: "TubeRental", price: 0}, //Tube rental price
            {name: "MassMeiling", price: 2},  //mass meiling price
            {name: "Seil", price: 0},  //discount percentage depending on the number of months
            {name: "PriceTotal", price: 0},   //total price
            {name: "NumberOfMounth", price: 1, id: 1}, //initial number of months
            {name: "FreeDays", count: 0}, //initial number of days
            {name: "PriceWithoutDiscount", price:0}, //initial discount
            {name: "Base", id: 1},
        ])
        const searchElemnt = (element) => { //assigning an active class to a block
            for (let i = 0; i<arr.value.length; i++) {
                arr.value[i].active = false;
            }
            arr.value[element.id].active=true;

            if (arr.value[0].active == true ){   //tariff Base is active
                initialСost.value[0].price = initialСost.value[1].price;
                count.value[0].numberWhats = 1;
                count.value[1].numberInst = 1;
                initialСost.value[12].name = initialСost.value[1].name
                initialСost.value[12].id = initialСost.value[1].id
            } else if (arr.value[1].active == true){    //tariff Start is active
                initialСost.value[0].price = initialСost.value[2].price;
                initialСost.value[12].name = initialСost.value[2].name
                initialСost.value[12].id = initialСost.value[2].id
            } else {    //tariff Pro is active
                initialСost.value[0].price = initialСost.value[3].price;
                initialСost.value[12].name = initialСost.value[3].name
                initialСost.value[12].id = initialСost.value[3].id
                /* count.value[0].numberWhats = 0;
                count.value[1].numberInst = 0; */
            }
            totalPrice() 
        }

        const mounth = ref([
            {id:1, active:true, seil: 0, count: 1},
            {id:2, active:false, seil: 10, count: 3},
            {id:3, active:false, seil: 20, count: 6},
            {id:4, active:false, seil: 30, count: 12},
            {id:5, active:false, seil: 40, count: 24},
        ])
        const searchMounth = (seil) => {
            for (let i = 0; i<mounth.value.length; i++) {
                mounth.value[i].active = false;
            }
            mounth.value[seil.id - 1].active=true;

            if (mounth.value[0].active == true){
                initialСost.value[7].price = mounth.value[0].seil;
                initialСost.value[9].price = mounth.value[0].count;
                initialСost.value[9].id = mounth.value[0].id;
            } else if (mounth.value[1].active == true){
                initialСost.value[7].price = mounth.value[1].seil;
                initialСost.value[9].price = mounth.value[1].count;
                initialСost.value[9].id = mounth.value[1].id;
            } else if (mounth.value[2].active == true){
                initialСost.value[7].price = mounth.value[2].seil;
                initialСost.value[9].price = mounth.value[2].count;
                initialСost.value[9].id = mounth.value[2].id;
            } else if (mounth.value[3].active == true){
                initialСost.value[7].price = mounth.value[3].seil;
                initialСost.value[9].price = mounth.value[3].count;
                initialСost.value[9].id = mounth.value[3].id;
            } else {
                initialСost.value[7].price = mounth.value[4].seil;
                initialСost.value[9].price = mounth.value[4].count;
                initialСost.value[9].id = mounth.value[4].id;
            }
            totalPrice() 
        }

        const count = ref([
            {numberWhats: 1},
            {numberInst: 1},
            {numberMailing: 0},
            {checkboxBase: false},
            {checkboxTube: false},
        ])

        const incrementWhats = () => {
            if(arr.value[0].active == false){
            count.value[0].numberWhats++
            }
            totalPrice();
        }
        const decrimentWhats = () => {
            if(arr.value[0].active == false){
            if (returnFinance.value.tariff_id == undefined && count.value[0].numberWhats > 0){
            count.value[0].numberWhats-- 
            }
            if(returnFinance.value.tariff_id != undefined && count.value[0].numberWhats > returnFinance.value.parameters[0].whatsapp){
                count.value[0].numberWhats--
                console.log("Уменьшение")
            }
            totalPrice();
            }
        }
        const resetWhatsNumber = () => {
            count.value[0].numberWhats = 0
            if(returnFinance.value.tariff_id != undefined){
                count.value[0].numberWhats = returnFinance.value.parameters[0].whatsapp;
            }
            totalPrice();
        }

        const incrementInst = () => {
            if(arr.value[0].active == false){
            count.value[1].numberInst++ 
            }
            totalPrice();
        }
        const decrimentInst = () => {
            if(arr.value[0].active == false){
            if (returnFinance.value.tariff_id == undefined && count.value[1].numberInst > 0){
            count.value[1].numberInst-- 
            }
            if(returnFinance.value.tariff_id != undefined && count.value[1].numberInst > returnFinance.value.parameters[0].instagram){
                count.value[1].numberInst--
                console.log("Уменьшение")
            }
            totalPrice();
            }
        }
        const resetInstNumber = () => {
            count.value[1].numberInst = 0
            if(returnFinance.value.tariff_id != undefined){
                count.value[1].numberInst = returnFinance.value.parameters[0].instagram
            }
            totalPrice();
        }

        const incrementMailing = () => {
            count.value[2].numberMailing+=1000
            totalPrice();
        }
        const decrimentMailing = () => {
            if (count.value[2].numberMailing > 0){
            count.value[2].numberMailing-=1000 
            totalPrice();
            }
        }
        const resetMailingNumber = () => {
            count.value[2].numberMailing = 0
            totalPrice();
        }

        const toggleValidationBase = () => {
            if (count.value[3].checkboxBase == false){
            count.value[3].checkboxBase = true
            initialСost.value[4].price = 500;
            } else{
                count.value[3].checkboxBase = false
                initialСost.value[4].price = 0;
            }
            totalPrice();
        }
        const toggleTubeRental = () => {
            if (count.value[4].checkboxTube == false){
            count.value[4].checkboxTube = true
            initialСost.value[5].price = 500;
            } else{
                count.value[4].checkboxTube = false
                initialСost.value[5].price = 0;
            }
            totalPrice();
        }

        const totalPrice = () => {
            
            let totalWhats = count.value[0].numberWhats * initialСost.value[0].price;   //the cost of whatsapp channels
            
            let totalInst = count.value[1].numberInst * initialСost.value[0].price;     //the cost of instagram channels
            
            let totalCostChannels = (totalWhats + totalInst) * initialСost.value[9].price; //the cost of all channels with mounth

            let totalDiscount = totalCostChannels * initialСost.value[7].price/100; //total discount on selected services

            let totalPriceWithoutAdditional = totalCostChannels - totalDiscount; // the cost of discounted services  

            let massMailingtotal = count.value[2].numberMailing * initialСost.value[6].price * initialСost.value[9].price; //total price mass mailing

            initialСost.value[11].price = totalCostChannels + massMailingtotal + (initialСost.value[4].price * initialСost.value[9].price) + (initialСost.value[5].price * initialСost.value[9].price); // price without discount

            initialСost.value[8].price = totalPriceWithoutAdditional + massMailingtotal + (initialСost.value[4].price * initialСost.value[9].price) + (initialСost.value[5].price  * initialСost.value[9].price); //total price

            if(arr.value[2].active == true && count.value[0].numberWhats >= 4 || arr.value[2].active == true && count.value[1].numberInst >= 4){
                initialСost.value[10].count = Math.round(totalDiscount / (2100/31)); // free days pro
            }else if(arr.value[1].active == true && count.value[0].numberWhats >= 4 || arr.value[1].active == true && count.value[1].numberInst >= 4){
                initialСost.value[10].count = Math.round(totalDiscount / (950/31)); //free days start
            } else{
                initialСost.value[10].count = 0; //free days base
            }
        }

        const sellParametrs = ref({
        tariff_id: 1,
        sale_id: 1,
        parameters: 
        [
            {
                whatsapp: 0,
                instagram: 0,
                base_validation: false,
                virtual_numbers: false,
                mass_sending: 0,
            }
        ] 
        })
        
        const appropriationSellParametrs = () => {
            sellParametrs.value.tariff_id = initialСost.value[12].id;
            sellParametrs.value.sale_id = initialСost.value[9].id;
            sellParametrs.value.parameters[0].whatsapp = count.value[0].numberWhats;
            sellParametrs.value.parameters[0].instagram = count.value[1].numberInst;
            sellParametrs.value.parameters[0].base_validation = count.value[3].checkboxBase;
            sellParametrs.value.parameters[0].virtual_numbers = count.value[4].checkboxTube;
            sellParametrs.value.parameters[0].mass_sending = count.value[2].numberMailing;

            totalPrice()
        }

        const createNewFinance = () => {

            appropriationSellParametrs()

            createFinance(sellParametrs.value)
                        .then(r => {
                            if (r.error) {
                                return;
                            }
                                getSingleFinance(r.user_tariff_id)
                                isModalOpen.value = true

                                paymentFinance({user_tariff_id: r.user_tariff_id})
                                .then(r => {
                                    console.log(r)
                                    linkPayment.value = r
                                    if (r.error) {
                                        return;
                                    }
                        })
                        })
            
            
        }

        const isModalOpen = ref(false)

        const closePay = () => {
            isModalOpen.value = false
        }

        const returnDataHistory = () => {
            if (returnFinance.value.tariff_id != undefined){

                initialСost.value[12].id        = returnFinance.value.tariff_id
                initialСost.value[9].id         = returnFinance.value.sale_id
                count.value[0].numberWhats      = returnFinance.value.parameters[0].whatsapp
                count.value[1].numberInst       = returnFinance.value.parameters[0].instagram
                count.value[3].checkboxBase     = returnFinance.value.parameters[0].base_validation
                count.value[4].checkboxTube     = returnFinance.value.parameters[0].virtual_numbers
                count.value[2].numberMailing    = returnFinance.value.parameters[0].mass_sending

                if (initialСost.value[12].id == 1){
                    initialСost.value[0].price = initialСost.value[1].price;
                }else if (initialСost.value[12].id == 2){
                    arr.value[0].active = false
                    arr.value[1].active = true
                    initialСost.value[0].price = initialСost.value[2].price;
                } else {
                    arr.value[0].active = false
                    arr.value[2].active = true
                    initialСost.value[0].price = initialСost.value[3].price;
                }

                if (initialСost.value[9].id == 1){
                    initialСost.value[7].price = mounth.value[0].seil;
                    initialСost.value[9].price = mounth.value[0].count;
                } else if (initialСost.value[9].id == 2){
                    mounth.value[1].active = true
                    mounth.value[0].active = false
                    initialСost.value[7].price = mounth.value[1].seil;
                    initialСost.value[9].price = mounth.value[1].count;
                } else if (initialСost.value[9].id == 3){
                    mounth.value[2].active = true
                    mounth.value[0].active = false
                    initialСost.value[7].price = mounth.value[2].seil;
                    initialСost.value[9].price = mounth.value[2].count;
                } else if (initialСost.value[9].id == 4){
                    mounth.value[3].active = true
                    mounth.value[0].active = false
                    initialСost.value[7].price = mounth.value[3].seil;
                    initialСost.value[9].price = mounth.value[3].count;
                } else if (initialСost.value[9].id == 5){
                    mounth.value[4].active = true
                    mounth.value[0].active = false
                    initialСost.value[7].price = mounth.value[4].seil;
                    initialСost.value[9].price = mounth.value[4].count;
                }
                totalPrice()
            }
        }

        const initialUpdate = () => {
            sellUpdateParametrs.value.user_tariff_id                   =        returnFinance.value.user_tariff_id
            sellUpdateParametrs.value.tariff_id                        =        initialСost.value[12].id     
            sellUpdateParametrs.value.sale_id                          =        initialСost.value[9].id      
            sellUpdateParametrs.value.parameters[0].whatsapp           =        count.value[0].numberWhats   
            sellUpdateParametrs.value.parameters[0].instagram          =        count.value[1].numberInst    
            sellUpdateParametrs.value.parameters[0].base_validation    =        count.value[3].checkboxBase  
            sellUpdateParametrs.value.parameters[0].virtual_numbers    =        count.value[4].checkboxTube  
            sellUpdateParametrs.value.parameters[0].mass_sending       =        count.value[2].numberMailing 
        }

        const sellUpdateParametrs = ref({
        user_tariff_id: returnFinance.value.user_tariff_id,
        tariff_id: 1,
        sale_id: 1,
        parameters: 
        [
            {
                whatsapp: 0,
                instagram: 0,
                base_validation: false,
                virtual_numbers: false,
                mass_sending: 0,
            }
        ] 
        })
        
        const updateCheck = ref(true)
                
        onUpdated(()=>{
           if(updateCheck.value&&returnFinance.value?.status){
                   returnDataHistory()
                   updateCheck.value=false
           } else{
               console.log('-')
            }
        })

        const update = () => {
            initialUpdate()

            updateFinance(sellUpdateParametrs.value)
                        .then(r => {
                            if (r.error) {
                                return;
                            }
                        })
        }

        return {
            searchElemnt,
            arr,
            updateCheck,
            incrementWhats,
            decrimentWhats,
            resetWhatsNumber,
            incrementInst,
            decrimentInst,
            resetInstNumber,
            incrementMailing,
            decrimentMailing,
            resetMailingNumber,
            
            count,
            
            searchMounth,
            mounth,
            
            initialСost,
            toggleValidationBase,
            toggleTubeRental,
            
            totalPrice,
            
            isModalOpen,
            closePay,

            sellParametrs,
            appropriationSellParametrs,
            createNewFinance,

            returnFinance,
            returnDataHistory,

            sellUpdateParametrs,
            initialUpdate,
            update,

            linkPayment,

            routerTrue,
        }
    }
}
</script>

<style lang="scss" src="./rates.scss"></style>