<template>
    <div class="wrapper__create">
        <div class="wrapper__create_title">Созданные автоответчики</div>
        <router-link style="text-decoration: none;" :to="'/settings/answerphone/settings'"><div class="wrapper__create_buttons pointer"><span class="icon-plus">+</span>Добавить новый</div></router-link>
    </div>
    <AnswerphoneList></AnswerphoneList>
</template>

<script>
import { ref } from 'vue'
import AnswerphoneList from '@/components/SettingsContainer/SettingsAnswerphone/settings-answerphone-list.vue'
export default {
    components: {
        AnswerphoneList,
    },
    setup() {
       
        return{
        
        }
    }
}
</script>
        
<style lang="scss" src="./list.scss"></style>