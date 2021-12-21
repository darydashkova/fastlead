<template>
    <div class="settings-partners-rules">
        <div class="settings-partners-rules__body">
            <div class="settings-partners-rules__header">
                <div class="settings-partners-rules__header_title">Правила пользования партнерской программой</div>
                <div class="settings-partners-rules__header_close pointer">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#9797BB"/>
                    </svg>
                </div>
            </div>
            <div class="settings-partners-rules__main">
                <div class="settings-partners-rules__main_text">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
                </div>
            </div>
            <div class="settings-partners-rules__accept">
                <div class="settings-partners-rules__accept_point pointer">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="17" height="17" rx="2.5" fill="#252544"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.4459 5.97806C13.6547 5.72073 13.6153 5.34288 13.358 5.13409C13.1007 4.92531 12.7229 4.96465 12.5141 5.22198L7.35216 11.5839L5.16662 9.89673C4.90431 9.69425 4.52752 9.74274 4.32503 10.005C4.12254 10.2674 4.17103 10.6442 4.43334 10.8467L7.08246 12.8916L7.54604 13.2495L7.91502 12.7947L13.4459 5.97806Z" fill="#40406B"/>
                        <rect x="0.5" y="0.5" width="17" height="17" rx="2.5" stroke="#40406B"/>
                    </svg>
                </div>
                <div class="settings-partners-rules__accept_text">
                    Нажимая на кнопку вы соглашаетесь с <a href="www.yandex.ru" class="pointer">правилами пользования партнерской программой</a>
                </div>
            </div>
            <div class="settings-partners-rules__buttons">
                <div class="settings-partners-rules__buttons_cancel pointer">Отмена</div>
                <div class="settings-partners-rules__buttons_send pointer">Отправить</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss">
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
</style>