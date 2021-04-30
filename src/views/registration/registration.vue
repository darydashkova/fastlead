<template>
    <div class="registration">
        <form class="registration__form" @submit.prevent="registr">
            <h1 class="registration__header">Регистрация</h1>
            <input class="registration__input" type="text" v-model="login"
                   placeholder="Логин"
                   @keypress="onlyEngChars"
            >
            <input class="registration__input" type="password" v-model="password"
                   placeholder="Пароль"
            >
            <input class="registration__input" type="password" v-model="passwordConfirm"
                   placeholder="Подтверждение пароля"
            >
            <div v-if="error" class="registration__error">{{error}}</div>
            <button class="registration__button" type="submit"
                    :disabled="loading"
            >Зарегистрироваться</button>
            <router-link class="registration__hint" to="/login">У меня есть аккаунт</router-link>
        </form>
    </div>
</template>

<script src="./registration.js"></script>
<style lang="scss" src="./registration.scss"></style>