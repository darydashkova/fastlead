<template>
    <div class="settings-partners-rules">
        <div class="settings-partners-rules__body">
            <div class="settings-partners-rules__header">
                <div class="settings-partners-rules__header_title">Правила пользования партнерской программой</div>
                <div class="settings-partners-rules__header_close pointer" @click="closePartnersRules()">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#9797BB"/>
                    </svg>
                </div>
            </div>
            <div class="settings-partners-rules__main scroll-poiner">
                <p class="settings-partners-rules__main_title text-center">
                    ДОГОВОР-ОФЕРТА<br>
                    по использованию функции «Партнерская программа» 
                    в рамках СРМ системы FastLead
                </p>
                <p class="settings-partners-rules__main_subtitle">
                1. Общие условия:<br></p>
                <p class="settings-partners-rules__main_text">1.1. Участниками «Партнерской программы» могут являться как третьи лица согласно п.1.4. настоящей Оферты, так и действующие клиенты Заказчика.<br>
                1.2. СРМ предоставляет возможность клиентам привлекать на ресурс новых пользователей по средствам реферальной ссылке. В зависимости от суммы оплаченных услуг привлеченными пользователями, Партнер получает вознаграждении в виде 15% от суммы оплаченной услуги его Реферала<br>
                1.3. Заказчик не отвечает за действие или бездействие третьих лиц, как то: рекламодателей, доступность их сайтов, систем емайл-рассылок, хостинга, трекинговых систем и т.д. <br>
                </p>
                <p class="settings-partners-rules__main_subtitle">2. Регистрация, отключение аккаунта Партнера и доступ к СРМ:<br></p>
                <p class="settings-partners-rules__main_text">2.1. К регистрации в качестве Партнера в системе допускаются указанные в п.2.1. настоящей Оферты лица. <br>
                2.2. Запрещены повторные регистрации одного и того же лица в качестве Партнера без согласования с Заказчиком. В случае выявления двух и более аккаунтов, созданных, принадлежащих или являющихся средством работы или получения дохода для одного лица, а также в случае регистрации с указанием ненастоящего профиля в социальной сети, Заказчик вправе заблокировать все эти аккаунты.<br>
                2.3. Заказчик вправе в одностороннем порядке отключить аккаунт Партнера, при этом:<br>
                - в случае отключения аккаунта Партнера не вследствие нарушения Партнером требований настоящей Оферты и (или) иных обязательных требований Заказчика, начисленное Партнеру вознаграждение выплачиваются ему в полном объеме;<br>
                - в случае отключения аккаунта Партнера по причине, связанной с нарушением Партнером требований настоящей Оферты и (или) иных обязательных требований Заказчика, начисленное Партнеру вознаграждение не выплачивается.<br>
                </p>
                <p class="settings-partners-rules__main_subtitle">
                3. Запреты и ограничения:<br></p>
                <p class="settings-partners-rules__main_text">3.1. Партнеру запрещается совершать действия, ставящие и (или) могущие ставить под опасность работу СРМ, Сервиса, конфиденциальность сведений о других партнерах и клиентах Заказчика, коммерческую и иную охраняемую законом тайну Заказчика, в том числе (но не ограничиваясь):<br>
                - выявление уязвимостей Сервиса и СРМ, нарушение процедуры регистрации и авторизации в Сервисе;<br>
                - имитацию или любого рода изменение любого заголовка пакета TCP/IP или любой части заголовка в любом электронном письме или размещенном на Сервисе материале;<br>
                - доступ, использование, копирование, адаптация, модификация, выполнение производных работ, распространение, передача, показ, исполнение или иное использование Сервиса недопустимыми или несанкционированными способами либо способами, которые создают нагрузку на сервисы, ухудшают их работу либо вредят другим лицам;<br>
                - обратное проектирование, изменение, модификация, создание производных работ, декомпиляция или извлечение кода из Сервиса;<br>
                - отправку, хранение или передачу вирусов, или иного компьютерного кода через Сервис;<br>
                - получение или попытки получения несанкционированного доступа к Сервису;<br>
                - вмешательство в работу либо нарушение целостности или работы Сайта, Сервиса;<br>
                - создание программного обеспечения или API, функции которых по сути совпадают с функциями Сервиса, и предложение их к использованию третьими лицами;<br>
                - использовать Сервис для рассылки «спама», сведений и файлов нарушающих действующее законодательство Российской Федерации, а за пределами Российской Федерации – нарушающее национальное законодательство.<br>
                - введение третьих лиц в заблуждение относительно услуг, предлагаемых Заказчиком, их характера и порядка предоставления, стоимости и порядка оплаты.<br>
                - запрещен обман пользователей в любой форме;<br>
                - размещение партнерских ссылок на личных, «фейковых» и специально подготовленный страницах в социальных сетях.<br>
                </p>
                <p class="settings-partners-rules__main_subtitle">
                4. Ответственность Сторон<br></p>
                <p class="settings-partners-rules__main_text">
                4.1. Ответственность Сторон устанавливается действующим законодательством Российской Федерации. <br>
                4.2. Стороны не несут ответственности за нижеизложенное:<br>
                - задержки, сбои, неверную или несвоевременную доставку, удаление или несохранность какой-либо информации при использовании Сервиса;<br>
                - за работоспособность Сервиса и СРМ;<br>
                - за полную или частичную невозможность использования функционала Сервиса по причинам независящим ни от одной Сторон;<br>
                - за перерывы в работе Сервиса по причине проведения обновлений, профилактических и иных работ;<br>
                - за коммерческий результат при использовании Сервиса; <br>
                - за любые прямые или непрямые убытки, возникшие по причине использования Сервиса.<br>
                </p>
                <p class="settings-partners-rules__main_subtitle">
                5. Действие Договора и порядок его расторжения:<br></p>
                <p class="settings-partners-rules__main_text">
                5.1. Договор вступает в силу с момента принятия и действует до момента его полного исполнения, либо до момента его расторжения.<br>
                5.2. Договор может быть расторгнут по соглашению Сторон в любое время.<br>
                5.3. Заказчик без уведомления вправе досрочно расторгнуть Договор в одностороннем внесудебном порядке в порядке ст. 450.1 Гражданского Кодекса Российской Федерации, а также в случаях нарушения Партнером любых условий настоящего Договора.<br>
                5.4. В одностороннем порядке любая Сторона вправе расторгнуть настоящий Договор, уведомив другую Сторону о расторжении, путем направления соответствующего уведомления в срок не позднее 10 (десяти) рабочих дней до даты предполагаемого прекращения действия Договора. <br>
                5.5. При расторжении Договора по любым основаниям, Стороны обязаны произвести полные взаиморасчеты между собой в течение 10 календарных дней. <br>
                </p>
            </div>
            <div class="settings-partners-rules__accept">
                <div class="settings-partners-rules__accept_point pointer" :class="{'active-point': rulesPoint}" @click="searchActiveRulesPoint()">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="17" height="17" rx="2.5" fill="#252544"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.4459 5.97806C13.6547 5.72073 13.6153 5.34288 13.358 5.13409C13.1007 4.92531 12.7229 4.96465 12.5141 5.22198L7.35216 11.5839L5.16662 9.89673C4.90431 9.69425 4.52752 9.74274 4.32503 10.005C4.12254 10.2674 4.17103 10.6442 4.43334 10.8467L7.08246 12.8916L7.54604 13.2495L7.91502 12.7947L13.4459 5.97806Z" fill="#40406B"/>
                        <rect x="0.5" y="0.5" width="17" height="17" rx="2.5" stroke="#40406B"/>
                    </svg>
                </div>
                <div class="settings-partners-rules__accept_text">
                    Нажимая на кнопку вы соглашаетесь с <a href="/rules-partner-program.pdf" download class="pointer">правилами пользования партнерской программой</a>
                </div>
            </div>
            <div class="settings-partners-rules__buttons">
                <div class="settings-partners-rules__buttons_cancel pointer" @click="closePartnersRules()">Отмена</div>
                <div class="settings-partners-rules__buttons_send pointer" @click="aceeptRules()">Отправить</div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue'
import { usePartners } from "@/composition/usePartners";

export default {
    setup(props, {emit}) {

        const {acceptPartnersRules} = usePartners()

        const rulesPoint = ref(false)
        const searchActiveRulesPoint = () => {
            if(rulesPoint.value){
                rulesPoint.value = false
            } else {
                rulesPoint.value = true
            }
        }

        const closePartnersRules = () => {
            emit('closePartnersRules')
        }

        const aceeptRules = () => {
            if(rulesPoint.value == true){
                acceptPartnersRules({
                    rule: "partners_rules",
                })
                closePartnersRules()
            }
        }

        return{
            rulesPoint,
            searchActiveRulesPoint,
            closePartnersRules,

            aceeptRules,
        }
    }
}
</script>

<style lang="scss">
    .text-center{
        text-align: center;
        margin: 0;
    }
    .settings-partners-rules{
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.34);
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: left;
        &__body{
            width: 520px;
            background: #252544;
            border-radius: 6px;
            text-align: left;
        }
        &__header{
            display: flex;
            justify-content: space-between;
            padding: 27px 24px;
            align-items: center;
            border-bottom: 1px solid #1D1D35;
            &_title{
                font-size: 24px;
                color: #F0F0FA;
                font-weight: 700;
                width: 80%;
            }
            &_close{

            }
        }
        &__main{
            height: 300px;
            padding: 22px 24px;
            overflow-y: auto;
            background: #252544;
            &_title{
                font-size: 18px;
                font-weight: 600;
                color: #CFCFE4;
            }
            &_subtitle{
                font-size: 16px;
                font-weight: 500;
                color: #CFCFE4;
            }
            &_text{
                font-size: 16px;
                font-weight: 400;
                color: #9797BB;
            }
        }
        &__accept{
            display: flex;
            padding: 20px 24px 0px;
            border-top: 1px solid #1D1D35;
            align-items: center;
            &_point{

            }
            &_text{
                font-size: 16px;
                color: #CFCFE4;
                margin-left: 20px;
                & a {
                    
                    color: #CFCFE4;
                }
            }
        }
        &__buttons{
            display: flex;
            align-items: center;
            padding: 25px 24px 20px;
            &_cancel{
                color: #5EC075;
                border: 1px solid #5EC075;
                font-size: 16px;
                padding: 7px 26px;
                font-weight: 400;
                border-radius: 6px;
            }
            &_send{
                background: linear-gradient(45.66deg, #22A595 -40.44%, #84D160 120.07%);
                color: #252544;
                font-size: 16px;
                padding: 8px 26px;
                font-weight: 500;
                margin-left: 22px;
                border-radius: 6px;
            }
        }
    }
    .active-point rect{
        &:first-child{
            fill: #5EC075;
        }
        &:last-child{
            stroke: #5EC075;
        }
    }
</style>