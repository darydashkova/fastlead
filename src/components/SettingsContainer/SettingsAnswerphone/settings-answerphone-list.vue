<template>
    <table class="answerphone__list">
        <tr class="answerphone__list_row">
            <td class="answerphone__list_title" v-for="(listTitle, index) in listTitles" :key="index">
            {{listTitle.name}}
            </td>
        </tr>
        <tr class="answerphone__list_element" v-for="(answerphone, index) in answerphones" :key="index">
            <td class="answerphone__list_value">
                {{answerphone.name}}
            </td>
            <td class="answerphone__list_value">
                {{answerphone.event}}
            </td>
            <td class="answerphone__list_value">
                с {{answerphone.range_work.start}} до {{answerphone.range_work.stop}}
            </td>
            <td class="answerphone__list_value">
                {{answerphone.message.text}}
            </td>
            <td class="answerphone__list_value">
                <img src="@/assets/stop-play.svg" v-if="answerphone.is_enable" @click="stopAutoresponder(answerphone.autoresponder_id)">
                <img src="@/assets/play.svg" v-else @click="startAutoresponder(answerphone.autoresponder_id)">
                <img src="@/assets/change.svg">
                <img src="@/assets/delete.svg" @click="deleteAutoresponders(answerphone.autoresponder_id)">
            </td>
        </tr>
    </table>
</template>

<script>
import { ref, onUpdated } from 'vue'
import { useAnswerphone } from "@/composition/useAnswerphone"
export default {
    setup() {

        const {answerphones, getAllAnswerphone, deleteAnswerphone, stopAnswerphone, startAnswerphone} = useAnswerphone()

        getAllAnswerphone()

        const listTitles = ref([
            {name: "НАЗВАНИЕ"},
            {name: "ТРИГЕР СТАРТА"},
            {name: "ДИАПАЗОН ОТПРАВКИ"},
            {name: "ТЕКСТ"},
            {name: "ДЕЙСТВИЕ"},
        ])

        const deleteAutoresponders = (id) => {
            deleteAnswerphone({autoresponder_id: id})
        }

        const stopAutoresponder = (id) => {
            stopAnswerphone({autoresponder_id: id})
            .then(r => {
            console.log(answerphones.value[0])
            })
        }

        const startAutoresponder = (id) => {
            startAnswerphone({autoresponder_id: id})
            .then(r => {
                console.log(answerphones.value[0])
            })
        }

        onUpdated(() => {
            getAllAnswerphone()
        })

        return{
            answerphones,
            listTitles,

            deleteAutoresponders,
            stopAutoresponder,
            startAutoresponder,
        }
    }
}
</script>

<style lang="scss" src="./settings-answerphone-list.scss"></style>