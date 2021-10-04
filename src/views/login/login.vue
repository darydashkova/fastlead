<template>
    <div class="login">
        <form class="login__form" @submit.prevent="auth">
            <h1 class="login__header">Авторизация</h1>
            <input class="login__input" type="text" v-model="login"
                   placeholder="Логин"
                   @keypress="onlyEngChars"
            >
            <input class="login__input" type="password" v-model="password"
                   placeholder="Пароль"
            >
            <div v-if="error" class="login__error">{{error}}</div>
            <!-- <div class="login__hint login__hint_mt-10">Забыли пароль?</div> -->
            <button class="login__button" type="submit"
                :disabled="loading"
            >Войти</button>
            <!-- <router-link class="login__hint" to="/registration">У меня нет аккаунта</router-link> -->
        </form>
    </div>
</template>

<script src="./login.js"></script>
<style lang="scss" src="./login.scss"></style>