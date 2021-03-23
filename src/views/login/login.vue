<template>
    <div class="login">
        <form class="login__form" @submit.prevent="tryAuth">
            <h1 class="login__header">Авторизация</h1>
            <input class="login__input" type="text" v-model="authData.login"
                   placeholder="Логин"
                   :class="error? 'login__input_error' : ''"
            >
            <input class="login__input" type="password" v-model="authData.password"
                   placeholder="Пароль"
                   :class="error? 'login__input_error' : ''"
            >
            <button class="login__button" type="submit"
                :disabled="loading"
            >Войти</button>
        </form>
    </div>
</template>

<script src="./login.js"></script>
<style lang="scss" src="./login.scss"></style>