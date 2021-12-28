<template>
    <div class="new-folders__shadow">
        <div class="new-folder">
            <div class="new-folder__header">
                <div class="new-folder__header_title">Новая папка</div>
                <span class="new-folder__header_close pointer"><img src="@/assets/close.svg" @click="closeNewFolder"></span>
            </div>
            <div class="new-folder__main">
                <div class="new-folder__main_title">Название папки</div>
                <input class="new-folder__main_input" type="text" placeholder="Введите название">
            </div>
            <div class="new-folder__buttons">
                <div class="new-folder__buttons_create pointer">Создать</div>
                <div class="new-folder__buttons_cancel pointer" @click="closeNewFolder">Отмена</div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {

    setup(props, { emit }) {
        const closeNewFolder = () => {
            emit('closeNewFolder')
        }
        return{
            closeNewFolder,
        }
    }
    
}
</script>

<style lang="scss" src="./settings-answerphone-create-folders.scss"></style>