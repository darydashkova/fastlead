<template>
    <div class="settings-account">
        <div class="settings-account__header">
            <div>
                Настройки аккаунта
            </div>
        </div>
        <div class="settings-account__scroll-container">
            <div class="scroll" ref="container" @click.self="scrollTo">
                <div class="scroll__bar" ref="scrollbar"></div>
            </div>
            <div class="settings-account__content" ref="content">
                <div class="settings-account__row">
                    <div class="settings-account__first-element">
                        <BaseCircleIcon
                                class="base-circle-icon_big"
                                :key="user.avatar"
                                :src="user.avatar"
                        ></BaseCircleIcon>
                    </div>
                    <div class="settings-account__text">
                        {{user.login}}
                    </div>
                    <div class="settings-account__last-element">
                        <div class="settings-account__action-button" @click="toggleModalChangeAva(true)">Изменить фото</div>

                    </div>
                </div>
                <div class="settings-account__row settings-account__row_pd-26 settings-account__row_column">
                    <div class="settings-account__row settings-account__row_none"
                         :class="{'settings-account__row_mb-24': openedActivity}"
                    >
                        <div class="settings-account__first-element">
                            <div class="settings-account__text">
                                Последняя активность
                            </div>
                        </div>
                        <div class="settings-account__row settings-account__row_none settings-account__row_jsb settings-account__row_w-300">
                            <div>
                                <div class="settings-account__text">
<!--                                    Windows - Краснодар, Россия-->
                                    нет данных
                                </div>
                                <div class="settings-account__sub-text">
<!--                                    сегодня в 16:53 - Браузер Yandex Browser-->
                                    нет данных
                                </div>
                            </div>
                            <div class="settings-account__online-text">
<!--                                online-->
                                нет данных
                            </div>
                        </div>
                        <div class="settings-account__last-element">
                            <div class="settings-account__action-button"
                                 v-if="!openedActivity"
                                 @click="toggleOpenedActivity(true)"
                            >История активности</div>
                            <BaseButton v-else
                                        @click="toggleOpenedActivity(false)"
                                        class="base-button_cancel base-button_p5-15"
                            >
                                Свернуть
                            </BaseButton>
                        </div>
                    </div>
                    <template v-if="openedActivity">
                        <div class="settings-account__row settings-account__row_none settings-account__row_mb-24">
                            <div class="settings-account__first-element">
                            </div>
                            <div class="settings-account__row settings-account__row_none settings-account__row_jsb settings-account__row_w-400">
                                <div>
                                    <div class="settings-account__text">
<!--                                        Windows - Краснодар, Россия-->
                                        нет данных
                                    </div>
                                    <div class="settings-account__sub-text">
<!--                                        сегодня в 16:53 - Браузер Yandex Browser-->
                                        нет данных
                                    </div>
                                </div>
                                <div class="settings-account__online-text">
<!--                                    online-->
                                    нет данных
                                </div>
                            </div>
                        </div>
                        <div class="settings-account__row settings-account__row_none settings-account__row_mb-24">
                            <div class="settings-account__first-element">
                            </div>
                            <div class="settings-account__row settings-account__row_none settings-account__row_jsb settings-account__row_w-400">
                                <div>
                                    <div class="settings-account__text">
<!--                                        Windows - Краснодар, Россия-->
                                            нет данных
                                    </div>
                                    <div class="settings-account__sub-text">
<!--                                        сегодня в 16:53 - Браузер Yandex Browser-->
                                        нет данных
                                    </div>
                                </div>
                                <div class="settings-account__online-text">
                                    нет данных
<!--                                    online-->
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
                <div v-if="openedChangePass" class="settings-account__row settings-account__row_pd-32 settings-account__row_column">
                    <div class="settings-account__row settings-account__row_none settings-account__row_mb-24">
                        <div class="settings-account__first-element">
                            <div class="settings-account__text">
                                Пароль
                            </div>
                        </div>
                        <div class="settings-account__sub-text">
<!--                            Обновлен 8 месяцев назад-->
                            нет данных
                        </div>
                        <div class="settings-account__last-element">
                            <BaseButton class="base-button_enter base-button_p5-15" @click="tryToChangePass">Готово</BaseButton>
                        </div>
                    </div>
                    <div class="settings-account__row settings-account__row_none settings-account__row_mb-24">
                        <div class="settings-account__first-element">
                            <div class="settings-account__text">
                                Старый пароль
                            </div>
                        </div>
                        <div class="settings-account__password"
                             :class="{'settings-account__password_error-old': password.error_old}"
                        >
                            <input type="password" class="settings-account_input" v-model="password.prev">
                        </div>

                        <div class="settings-account__last-element">
                            <BaseButton class="base-button_cancel base-button_p5-15" @click="toggleOpenedChangePass(false)">Отмена</BaseButton>
                        </div>
                    </div>
                    <div class="settings-account__row settings-account__row_none settings-account__row_mb-24">
                        <div class="settings-account__first-element">
                            <div class="settings-account__text">
                                Новый пароль
                            </div>
                        </div>
                        <div class="settings-account__password"
                             :class="{'settings-account__password_error-length': password.error_length}"
                        >
                            <input type="password" class="settings-account_input" v-model="password.new">
                        </div>
                    </div>
                    <div class="settings-account__row settings-account__row_none">
                        <div class="settings-account__first-element">
                            <div class="settings-account__text">
                                Повторите пароль
                            </div>
                        </div>
                        <div class="settings-account__password"
                             :class="{'settings-account__password_error-confirm': password.error_confirm}"
                        >
                            <input type="password" class="settings-account_input" v-model="password.new_again">
                        </div>
                    </div>
                </div>
                <div v-else class="settings-account__row settings-account__row_pd-32">
                    <div class="settings-account__first-element">
                        <div class="settings-account__text">
                            Пароль
                        </div>
                    </div>
                    <div class="settings-account__sub-text">
<!--                        Обновлен 8 месяцев назад-->
                        нет данных
                    </div>
                    <div class="settings-account__last-element">
                        <div class="settings-account__action-button" @click="toggleOpenedChangePass(true)">Изменить пароль</div>
                    </div>
                </div>
                <div class="settings-account__row settings-account__row_pd-32 settings-account__row_column">
                    <div class="settings-account__row settings-account__row_none"
                         :class="{'settings-account__row_mb-24': openedActions}"
                    >
                        <div class="settings-account__first-element">
                            <div class="settings-account__text">
                                Последние действия
                            </div>
                        </div>
                        <div class="settings-account__sub-text">
<!--                            Сегодня в 20:30 - создал рассылку-->
                            нет данных
                        </div>
                        <div class="settings-account__last-element">
                            <div class="settings-account__action-button"
                                 v-if="!openedActions"
                                 @click="toggleOpenedActions(true)"
                            >История действий</div>
                            <BaseButton v-else class="base-button_cancel base-button_p5-15" @click="toggleOpenedActions(false)">Свернуть</BaseButton>
                        </div>
                    </div>
                    <template v-if="openedActions">
                        <div class="settings-account__row settings-account__row_none settings-account__row_mb-24">
                            <div class="settings-account__first-element"></div>
                            <div class="settings-account__sub-text">
<!--                                Сегодня в 20:30 - создал рассылку-->
                                нет данных
                            </div>
                        </div>
                        <div class="settings-account__row settings-account__row_none settings-account__row_mb-24">
                            <div class="settings-account__first-element"></div>
                            <div class="settings-account__sub-text">
<!--                                Сегодня в 20:30 - создал рассылку-->
                                нет данных
                            </div>
                        </div>

                    </template>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import BaseButton from '../../../components/Base/BaseButton.vue'
    import BaseCircleIcon from '../../../components/Base/BaseCircleIcon.vue'
    import {ref, reactive, onMounted} from 'vue';
    import { useModals } from "../../../composition/useModals";
    import { useUser } from "../../../composition/useUser";
    import { useAccount } from "../../../composition/useAccount";
    import {useCustomScroll} from "../../../composition/useCustomScroll";
    export default {
        components: { BaseButton, BaseCircleIcon },
        setup() {
            const { container, content, scrollbar, scrollTo, init } = useCustomScroll()
            const { toggleModalChangeAva } = useModals()
            const { getUser, user } = useUser()
            const { changePass } = useAccount()

            onMounted( () => {
                init();
            })

            const openedChangePass = ref(false);
            const toggleOpenedChangePass = (boolean) => {
                openedChangePass.value = boolean;
                password.prev = '';
                password.new = '';
                password.new_again = '';
            }

            const password = reactive({
                prev: '',
                new: '',
                new_again: '',
                error_length: false,
                error_confirm: false,
                error_old: false,
            })

            const tryToChangePass = () => {
                password.error_length = false;
                password.error_confirm = false;
                if (!password.new.length) {
                    password.error_length = true;
                    return;
                }
                if (password.new === password.new_again) {
                    changePass({
                        new_password: password.new,
                        new_password_confirm: password.new_again,
                        old_password: password.prev,
                    })
                        .then((r) => {
                            if (r.error) {
                                password.error_length = true;
                                password.error_old = true;
                            } else {
                                toggleOpenedChangePass(false);
                            }
                        })
                } else {
                    password.error_confirm = true;
                }
            }

            const openedActivity = ref(false);
            const toggleOpenedActivity = (boolean) => {
                openedActivity.value = boolean;
            }

            const openedActions = ref(false);
            const toggleOpenedActions = (boolean) => {
                openedActions.value = boolean;
            }

            getUser();

            return {
                openedChangePass,
                toggleOpenedChangePass,
                openedActivity,
                toggleOpenedActivity,
                openedActions,
                toggleOpenedActions,
                toggleModalChangeAva,

                user,
                password,

                tryToChangePass,

                container,
                content,
                scrollbar,
                scrollTo,
            }
        }
    }
</script>

<style lang="scss" src="./account.scss"></style>