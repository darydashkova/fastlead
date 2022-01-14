<template>
    <div class="wrapper__create">
        <div class="wrapper__create_title">Созданные автоответчики</div>
        <router-link style="text-decoration: none;" :to="'/settings/answerphone/settings-answerphone'"><div @click="answerphoneId = null" class="wrapper__create_buttons pointer"><span class="icon-plus">+</span>Добавить новый</div></router-link>
    </div>
    <AnswerphoneList></AnswerphoneList>
</template>

<script>
import { ref } from 'vue'
import AnswerphoneList from '@/components/SettingsContainer/SettingsAnswerphone/settings-answerphone-list.vue'
import { useAnswerphone } from "@/composition/useAnswerphone"
export default {
    components: {
        AnswerphoneList,
    },
    setup() {
        const {answerphoneId} = useAnswerphone()
        return{
            answerphoneId,
        }
    }
}
</script>
        
<style lang="scss" src="./list-answerphone.scss"></style>