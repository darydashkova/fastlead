<template>
    <div class="settings-message-templates">
        <div class="settings-message-templates__header">
            <div>
                Шаблоны сообщений
            </div>
            <BaseButton v-if="false" class="base-button_cancel base-button_p6-40">Отмена</BaseButton>
            <BaseButton v-else class="base-button_enter base-button_p6-40" @click="create">Создать новый</BaseButton>
        </div>
        <div class="settings-message-templates__scroll-container">
            <div class="scroll" ref="container" @click.self="scrollTo">
                <div class="scroll__bar" ref="scrollbar"></div>
            </div>
            <div class="settings-message-templates__content" ref="content">
                <div class="settings-message-templates__element" v-for="i in 4">
                    <div class="settings-message-templates__message">
                        <div class="settings-message-templates__message-scroll">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium assumenda culpa cumque dignissimos dolorem eos exercitationem facilis illo libero molestias, nisi nostrum quisquam quos ratione rem sint sunt tempore voluptates! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, blanditiis cupiditate dolor dolores ducimus explicabo iste necessitatibus obcaecati odit officiis provident ratione rem sunt tempora ut velit, voluptas! Labore, ullam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita hic incidunt laboriosam libero molestiae nihil quidem suscipit ullam? Delectus earum esse illum inventore minima modi nesciunt nisi nulla quae ut.
                        </div>
                    </div>
                    <div class="settings-message-templates__name">
                        <span>
                            Довольно крупное название смс
                        </span>
                        <div class="settings-message-templates__action-container">
                            <div class="settings-message-templates__action settings-message-templates__action_default pointer"
                                 @click="edit({message: strExample, name: 'Тестовый шаблон'})"
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M18.5774 7.72657C18.7337 7.57029 18.9456 7.48249 19.1667 7.48249C19.3877 7.48249 19.5996 7.57029 19.7559 7.72657C19.9122 7.88285 20 8.09481 20 8.31583V13.6192C20.0013 14.1665 19.8941 14.7087 19.6846 15.2143C19.475 15.72 19.1673 16.179 18.7792 16.565L16.5658 18.78C16.1797 19.1681 15.7205 19.4757 15.2147 19.6851C14.7089 19.8945 14.1666 20.0015 13.6192 20H4.16666C3.062 19.9987 2.00296 19.5592 1.22185 18.7781C0.440735 17.997 0.00132321 16.938 0 15.8333V4.16666C0.00132321 3.062 0.440735 2.00296 1.22185 1.22185C2.00296 0.440735 3.062 0.00132321 4.16666 0H11.7017C11.9227 0 12.1346 0.0877973 12.2909 0.244077C12.4472 0.400358 12.535 0.612319 12.535 0.833333C12.535 1.05435 12.4472 1.26631 12.2909 1.42259C12.1346 1.57887 11.9227 1.66667 11.7017 1.66667H4.16666C3.50362 1.66667 2.86774 1.93006 2.3989 2.3989C1.93006 2.86774 1.66667 3.50362 1.66667 4.16666V15.8333C1.66667 16.4964 1.93006 17.1322 2.3989 17.6011C2.86774 18.0699 3.50362 18.3333 4.16666 18.3333H12.5V15C12.5 14.3369 12.7634 13.7011 13.2322 13.2322C13.7011 12.7634 14.3369 12.5 15 12.5H18.3333V8.31583C18.3333 8.09481 18.4211 7.88285 18.5774 7.72657ZM14.1667 18.2683C14.6289 18.1672 15.0525 17.9358 15.3875 17.6017L17.6042 15.3867C17.9367 15.0508 18.1677 14.6279 18.2708 14.1667H15C14.779 14.1667 14.567 14.2545 14.4107 14.4107C14.2545 14.567 14.1667 14.779 14.1667 15V18.2683ZM5.3867 10.935L15.5467 0.775039C16.042 0.301618 16.7007 0.0374146 17.3859 0.0374146C18.071 0.0374146 18.7298 0.301618 19.225 0.775039C19.712 1.26323 19.9855 1.92464 19.9855 2.6142C19.9855 3.30377 19.712 3.96518 19.225 4.45337L9.06503 14.6134C8.67907 15.0014 8.21998 15.309 7.71433 15.5185C7.20867 15.7279 6.6665 15.8349 6.1192 15.8334H5.00003C4.77902 15.8334 4.56706 15.7456 4.41078 15.5893C4.2545 15.433 4.1667 15.221 4.1667 15V13.8809C4.16515 13.3336 4.27218 12.7914 4.4816 12.2857C4.69101 11.7801 4.99865 11.321 5.3867 10.935ZM7.8867 13.435L18.0467 3.27504C18.2216 3.09961 18.3199 2.86196 18.3199 2.6142C18.3199 2.36645 18.2216 2.1288 18.0467 1.95337C17.8687 1.78333 17.632 1.68845 17.3859 1.68845C17.1397 1.68845 16.903 1.78333 16.725 1.95337L6.56503 12.1134C6.098 12.5833 5.8351 13.2184 5.83336 13.8809V14.1667H6.1192C6.7817 14.165 7.4168 13.9021 7.8867 13.435Z"
                                          fill="var(--settings-whatsapp-sub-color)"/>
                                </svg>
                            </div>
                            <div class="settings-message-templates__action settings-message-templates__action_del pointer"
                            >
                                <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1 3.33333H14.31C14.1011 2.39284 13.5484 1.54779 12.7451 0.940598C11.9418 0.333408 10.937 0.0012121 9.9 0H8.1C7.06302 0.0012121 6.05819 0.333408 5.25487 0.940598C4.45156 1.54779 3.89889 2.39284 3.69 3.33333H0.9C0.661305 3.33333 0.432387 3.42113 0.263604 3.57741C0.0948211 3.73369 0 3.94565 0 4.16667C0 4.38768 0.0948211 4.59964 0.263604 4.75592C0.432387 4.9122 0.661305 5 0.9 5H1.8V15.8333C1.80143 16.938 2.27599 17.997 3.1196 18.7782C3.9632 19.5593 5.10696 19.9987 6.3 20H11.7C12.893 19.9987 14.0368 19.5593 14.8804 18.7782C15.724 17.997 16.1986 16.938 16.2 15.8333V5H17.1C17.3387 5 17.5676 4.9122 17.7364 4.75592C17.9052 4.59964 18 4.38768 18 4.16667C18 3.94565 17.9052 3.73369 17.7364 3.57741C17.5676 3.42113 17.3387 3.33333 17.1 3.33333ZM8.1 1.66667H9.9C10.4582 1.6673 11.0026 1.82781 11.4585 2.1262C11.9143 2.42459 12.2593 2.84624 12.4461 3.33333H5.5539C5.74072 2.84624 6.08571 2.42459 6.54155 2.1262C6.99739 1.82781 7.54175 1.6673 8.1 1.66667ZM14.4 15.8333C14.4 16.4964 14.1155 17.1323 13.6092 17.6011C13.1028 18.0699 12.4161 18.3333 11.7 18.3333H6.3C5.58392 18.3333 4.89716 18.0699 4.39081 17.6011C3.88446 17.1323 3.6 16.4964 3.6 15.8333V5H14.4V15.8333ZM7.20002 14.9999C7.43872 14.9999 7.66763 14.9121 7.83642 14.7558C8.0052 14.5995 8.10002 14.3876 8.10002 14.1666V9.16658C8.10002 8.94557 8.0052 8.73361 7.83642 8.57733C7.66763 8.42105 7.43872 8.33325 7.20002 8.33325C6.96133 8.33325 6.73241 8.42105 6.56363 8.57733C6.39484 8.73361 6.30002 8.94557 6.30002 9.16658V14.1666C6.30002 14.3876 6.39484 14.5995 6.56363 14.7558C6.73241 14.9121 6.96133 14.9999 7.20002 14.9999ZM11.4364 14.7558C11.2676 14.9121 11.0387 14.9999 10.8 14.9999C10.5613 14.9999 10.3324 14.9121 10.1636 14.7558C9.99479 14.5995 9.89997 14.3876 9.89997 14.1666V9.16658C9.89997 8.94557 9.99479 8.73361 10.1636 8.57733C10.3324 8.42105 10.5613 8.33325 10.8 8.33325C11.0387 8.33325 11.2676 8.42105 11.4364 8.57733C11.6052 8.73361 11.7 8.94557 11.7 9.16658V14.1666C11.7 14.3876 11.6052 14.5995 11.4364 14.7558Z"
                                          fill="var(--red-color)"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BaseButton from '../../../components/Base/BaseButton.vue'


    import {ref, computed, onMounted} from 'vue';
    import {useCustomScroll} from "../../../composition/useCustomScroll";
    import {useModalMessageTemplate} from "../../../composition/useModalMessageTemplate";
    export default {
        components: { BaseButton },
        setup() {
            const { container, content, scrollbar, scrollTo, init } = useCustomScroll()
            const { toggleModalCreateMessageTemplate, setMessageTemplateToEdit } = useModalMessageTemplate()
            onMounted( () => {
                init();
            })

            const create = () => {
                setMessageTemplateToEdit(null);
                toggleModalCreateMessageTemplate(true)
            }
            const edit = (template) => {
                setMessageTemplateToEdit(template);
                toggleModalCreateMessageTemplate(true);
            }
            let strExample = `Здравствуйте, меня зовут Ксения. Я маркетолог.
Занимаюсь продвижением и брендингом. Оформляю ваши соц.сети, разрабатываю маркетинговую стратегию, снимаю контент и привожу клиентов через регулярное ведение сторис.

У меня есть опыт в работе со строительной компанией - за месяц работы я привела 10 заявок на бесплатный замер, через который были заключены 3 договора на ремонт, 2 заказали дизайн-проект.  Я хочу предложить вам повторить эту работу и начать развивать ваш Бренд через соц.сети.

Мои кейсы - https://drive.google.com/drive/folders/1wXUxbZbLZekQtYLxYN3oExsLOF8Y7HQQ
В папке "строительная компания" вы можете ознакомиться с результатами моей работы.

Работаю в сфере SMM 3 года, знаю как продвигать сложные ниши.

Когда вам удобно провести бесплатную консультацию, на которой обговорим условия сотрудничества?😍😍😍😍😍😍😍😍😍😆😆😆😆😜😜😜😜😜😜😜😜😜😜😜😜😜😜😜😜😜😜😜😜😜😜😜😜😜😜😜😜😜😜😜😜😜😜😜😜😜`;


            return {
                container,
                content,
                scrollbar,
                scrollTo,

                create,
                edit,
                strExample,
            }
        }
    }
</script>

<style lang="scss" src="./message-templates.scss"></style>