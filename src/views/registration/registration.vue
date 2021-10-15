<template>
    <div class="registration">
        <form class="registration__form" @submit.prevent="registr">
            <h1 class="registration__header">Регистрация</h1>
            <input class="registration__input" type="text"
                   v-model="name"
                   placeholder="Имя"
                   @keypress="onlyRusChars"
            >
            <input class="registration__input" type="tel"
                   v-model="phone"
                   placeholder="+7 (123) 456-78-90"
                 v-maska="'+7 (###) ###-##-##'"
            >
            <input class="registration__input" type="email"
                   v-model="email"
                   placeholder="E-mail"
            >
            <div v-if="error" class="registration__error">{{error}}</div>

            <label class="registration__checkbox">Я даю согласие на обработку своих персональных данных и принимаю условия оферты
                <input class="registration__checkbox-hidden" type="checkbox"
                       checked="checked"
                       v-model="checkbox"
                >
                <span class="registration__checkmark"></span>
            </label>
            <button class="registration__button" type="submit"
                    :disabled="loading"
            >Зарегистрироваться</button>
            <router-link class="registration__hint" to="/login">У меня есть аккаунт</router-link>
        </form>
    </div>
</template>

<script src="./registration.js"></script>
<style lang="scss" src="./registration.scss"></style>