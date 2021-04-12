<template>
    <div class="user-info">
        <div class="user-info__header pointer" @click="toggleSettings(false)">
            Учетные данные
        </div>
        <div class="user-info__container">
            <div class="user-info__ava-container">
                <img :src="user.avatar" alt="" class="user-info__ava">
            </div>
            <div class="user-info__login">
                {{user.login}}
            </div>
        </div>
        <UserInfoSettings></UserInfoSettings>
    </div>
</template>

<script src="./user-info.js"></script>
<style lang="scss" src="./user-info.scss"></style>