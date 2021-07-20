<template>
    <div class="user-info">
        <div class="user-info__container">
            <div class="user-info__ava-container">
                <div class="user-info__ava" v-if="src"
                    :style="{'background': `url(${src}) center center / cover no-repeat`}"
                ></div>
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