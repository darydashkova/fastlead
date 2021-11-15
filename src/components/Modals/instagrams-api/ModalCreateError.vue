<template>
    <div class="error-accaunt__shadows">
        <div class="error-accaunt__content">
            <div class="error-accaunt__content_header">
                Аккаунт не найден
            </div>
            <div class="error-accaunt__content_main">
                Прочитайте интрукцию по<br/>подключению Instagram API
            </div>
            <div class="error-accaunt__content_bottom">
                <div class="error-accaunt__content_bottom-buttons">
                    <button class="error-accaunt__content_bottom-buttons_connect">Подробнее</button>
                    <button class="error-accaunt__content_bottom-buttons_cancel" @click="closeModalError">Отмена</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { ref } from 'vue'
    export default {

        setup(props, {emit}){

            const closeModalError = () => {
                emit('closeModalError')
            }

            return {
                closeModalError,
            }
        }
    }
</script>

<style lang="scss" src="./ModalCreateError.scss"></style>