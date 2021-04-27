<template>
    <div class="settings-nav">
        <div class="settings-nav__header">
            <router-link to="/messenger">
                Вернуться в чаты
            </router-link>
        </div>
        <div class="settings-nav__list">
            <div class="settings-nav__link-container">
                <router-link to="/settings/whatsapps"
                             class="settings-nav__link"
                             v-slot="{ href, route, navigate, isActive, isExactActive }"
                >
                    <div class="settings-nav__element"
                         :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']"
                    >
                        <a
                                class="settings-nav__link"
                                :href="href"
                                @click="navigate"
                        >WhatsApp аккаунты</a>
                    </div>
                </router-link>
            </div>

            <div class="settings-nav__link-container">
                <router-link
                        class="settings-nav__link"
                        to="/settings/"
                        v-slot="{ href, route, navigate, isActive, isExactActive}"
                >
                    <div class="settings-nav__element"
                         :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']"
                    >
                        <a
                                class="settings-nav__link"
                                :href="href"
                                @click="navigate"
                        >Интеграциии</a>
                    </div>
                </router-link>
            </div>
            <div class="settings-nav__link-container">
                <router-link
                        class="settings-nav__link"
                        to="/settings/"
                        v-slot="{ href, route, navigate, isActive, isExactActive}"
                >
                    <div class="settings-nav__element"
                         :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']"
                    >
                        <a
                                class="settings-nav__link"
                                :href="href"
                                @click="navigate"
                        >Финансы</a>
                    </div>
                </router-link>
            </div>
            <div class="settings-nav__link-container">
                <router-link
                        class="settings-nav__link"
                        to="/settings/"
                        v-slot="{ href, route, navigate, isActive, isExactActive}"
                >
                    <div class="settings-nav__element"
                         :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']"
                    >
                        <a
                                class="settings-nav__link"
                                :href="href"
                                @click="navigate"
                        >Шаблоны сообщений</a>
                    </div>
                </router-link>
            </div>
            <div class="settings-nav__link-container">
                <router-link
                        class="settings-nav__link"
                        to="/settings/account"
                        v-slot="{ href, route, navigate, isActive, isExactActive}"
                >
                    <div class="settings-nav__element"
                         :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']"
                    >
                        <a
                                class="settings-nav__link"
                                :href="href"
                                @click="navigate"
                        >Настройки аккаунта</a>
                    </div>
                </router-link>
            </div>
            <div class="settings-nav__link-container">
                <router-link
                        class="settings-nav__link"
                        to="/settings/"
                        v-slot="{ href, route, navigate, isActive, isExactActive}"
                >
                    <div class="settings-nav__element"
                         :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']"
                    >
                        <a
                                class="settings-nav__link"
                                :href="href"
                                @click="navigate"
                        >Страница-визитка</a>
                    </div>
                </router-link>
            </div>
            <div class="settings-nav__link-container">
                <router-link
                        class="settings-nav__link"
                        to="/settings/"
                        v-slot="{ href, route, navigate, isActive, isExactActive}"
                >
                    <div class="settings-nav__element"
                         :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']"
                    >
                        <a
                                class="settings-nav__link"
                                :href="href"
                                @click="navigate"
                        >Справка</a>
                    </div>
                </router-link>
            </div>
            <div class="settings-nav__link-container">
                <router-link
                        class="settings-nav__link"
                        to="/settings/"
                        v-slot="{ href, route, navigate, isActive, isExactActive}"
                >
                    <div class="settings-nav__element"
                         :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']"
                    >
                        <a
                                class="settings-nav__link"
                                :href="href"
                                @click="navigate"
                        >Связь с поддержкой</a>
                    </div>
                </router-link>
            </div>
            <div class="settings-nav__link-container">
                <router-link
                        class="settings-nav__link"
                        to="/settings/"
                        v-slot="{ href, route, navigate, isActive, isExactActive}"
                >
                    <div class="settings-nav__element"
                         :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']"
                    >
                        <a
                                class="settings-nav__link"
                                :href="href"
                                @click="navigate"
                        >Управление менеджером</a>
                    </div>
                </router-link>
            </div>
            <div class="settings-nav__link-container">
                <router-link
                        class="settings-nav__link"
                        to="/settings/mailings"
                        v-slot="{ href, route, navigate, isActive, isExactActive}"
                >
                    <div class="settings-nav__element"
                         :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']"
                    >
                        <a
                                class="settings-nav__link"
                                :href="href"
                                @click="navigate"
                        >Рассылки</a>
                    </div>
                </router-link>
            </div>
            <div class="settings-nav__link-container">
                <router-link
                        class="settings-nav__link"
                        to="/settings/autoresponder"
                        v-slot="{ href, route, navigate, isActive, isExactActive}"
                >
                    <div class="settings-nav__element"
                         :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']"
                    >
                        <a
                                class="settings-nav__link"
                                :href="href"
                                @click="navigate"
                        >Автоответчик</a>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        setup() {

        }
    }
</script>

<style lang="scss" src="./settings-nav.scss"></style>