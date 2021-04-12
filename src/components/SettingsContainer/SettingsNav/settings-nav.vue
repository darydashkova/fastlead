<template>
    <div class="settings-nav">
        <div class="settings-nav__header">
            <router-link to="/messenger">
                Вернуться в чаты
            </router-link>
        </div>
        <div class="settings-nav__list">
            <div class="settings-nav__element">WhatsApp аккаунты</div>
            <div class="settings-nav__element">Интеграциии</div>
            <div class="settings-nav__element">Финансы</div>
            <div class="settings-nav__element">Шаблоны сообщений</div>
            <div class="settings-nav__element">Настройки аккаунта</div>
            <div class="settings-nav__element">Страница-визитка</div>
            <div class="settings-nav__element">Справка</div>
            <div class="settings-nav__element">Связь с поддержкой</div>
            <div class="settings-nav__element">Управление менеджером</div>
            <div class="settings-nav__element">Рассылки</div>
            <div class="settings-nav__element">Автоответчик</div>
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