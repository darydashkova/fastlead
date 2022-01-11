<template>
    <div class="answerphone__list">
        <table class="answerphone__table-none" v-if="!answerphones[0] || !answerphones">
            <tr class="answerphone__table_row">
                <td class="answerphone__table_title" v-for="(listTitle, index) in listTitles" :key="index">
                {{listTitle.name}}
                </td>
            </tr>
            <tr class="answerphone__table_none-answerphones">
                <td colspan="5">
                    <div class="answerphone__none-block">
                        <div class="answerphone__none-block_title">У вас еще нет созданных автоответчиков</div>
                        <router-link @click="answerphoneId = null" style="text-decoration: none;" :to="'/settings/answerphone/settings-answerphone'"><div class="answerphone__none-block_button pointer">Добавить</div></router-link>
                    </div>
                </td>
            </tr>
        </table>
        <table class="answerphone__table" v-else>
            <tr class="answerphone__table_row">
                <td class="answerphone__table_title" v-for="(listTitle, index) in listTitles" :key="index">
                {{listTitle.name}}
                </td>
            </tr>
            <tr class="answerphone__table_element" v-for="(answerphone, index) in answerphones" :key="index">
                <td class="answerphone__table_value">
                    {{answerphone.name}}
                </td>
                <td class="answerphone__table_value">
                    {{showTriger[index].name}}
                </td>
                <td class="answerphone__table_value">
                    с {{answerphone.range_work.start}} до {{answerphone.range_work.stop}}
                </td>
                <td class="answerphone__table_value">
                    {{answerphone.message.text}}
                </td>
                <td class="answerphone__table_value">
                    <img class="pointer" src="@/assets/stop-play.svg" v-if="answerphone.is_enable" @click="stopAutoresponder(answerphone.autoresponder_id)">
                    <img class="pointer" src="@/assets/play.svg" v-else @click="startAutoresponder(answerphone.autoresponder_id)">
                     <router-link style="text-decoration: none;" :to="'/settings/answerphone/settings-answerphone'"><img @click="sellAnswerphoneId(answerphone.autoresponder_id)" class="pointer" src="@/assets/change.svg"></router-link>
                    <img class="pointer" src="@/assets/delete.svg" @click="deleteAutoresponders(answerphone.autoresponder_id)">
                </td>
            </tr>
        </table>
    </div>
    <FullScreenLoader v-if="loader"></FullScreenLoader>
</template>

<script>
import { ref, onUpdated, watch } from 'vue'
import { useAnswerphone } from "@/composition/useAnswerphone"
import FullScreenLoader from "../../FullScreenLoader";
export default {
    components: {
        FullScreenLoader,
    },
    setup() {

        const {answerphones, getAllAnswerphone, deleteAnswerphone, stopAnswerphone, startAnswerphone, answerphoneId} = useAnswerphone()

        getAllAnswerphone()
        .then((r) => {
            searchTriger()
            loader.value = false
        })

        const loader = ref(true)

        const listTitles = ref([
            {name: "НАЗВАНИЕ"},
            {name: "ТРИГЕР СТАРТА"},
            {name: "ДИАПАЗОН ОТПРАВКИ"},
            {name: "ТЕКСТ"},
            {name: "ДЕЙСТВИЕ"},
        ])

        const showTriger = ref([])

        const answerphoneTriger = ref([
            {id: 1, name: "Попадание в папку", database: "OnMoved"},
            {id: 2, name: "Первое обращение", database: "OnNewDialog"},
            {id: 3, name: "Обращение в нерабочее время", database: "OnAfterHours"},
            {id: 4, name: "Подписка на аккаунт", database: "OnNewSubscriber"},
            {id: 5, name: "Комментарий под постом", database: "OnComment"},
        ])

        const searchTriger = () => {
            for(let i = 0; i < Object.keys(answerphones.value).length; i++){
                for(let j = 0; j < Object.keys(answerphoneTriger.value).length; j++){
                    if(answerphones.value[i].event == answerphoneTriger.value[j].database){
                        showTriger.value[i].name = answerphoneTriger.value[j].name
                    }
                }
            }
        }

        const deleteAutoresponders = (id) => {
            loader.value = true
            deleteAnswerphone({autoresponder_id: id})
            .then((r) => {
                getAllAnswerphone()
                .then((r) => {
                    loader.value = false
                })
            })
        }

        const stopAutoresponder = (id) => {
            loader.value = true
            stopAnswerphone({autoresponder_id: id})
            .then((r) => {
                getAllAnswerphone()
                .then((r) => {
                    loader.value = false
                })
            })
        }

        const startAutoresponder = (id) => {
            loader.value = true
            startAnswerphone({autoresponder_id: id})
            .then((r) => {
                getAllAnswerphone()
                .then((r) => {
                    loader.value = false
                })
            })
        }

        const sellAnswerphoneId = (id) => {
            answerphoneId.value = id
        }


        watch(() => {
          for(let i = 0; i < Object.keys(answerphones.value).length; i++){
                showTriger.value.push({name: ""})
          }
        })

        return{
            answerphones,
            listTitles,

            deleteAutoresponders,
            stopAutoresponder,
            startAutoresponder,

            sellAnswerphoneId,
            answerphoneId,

            searchTriger,
            answerphoneTriger,
            showTriger,

            loader,
        }
    }
}
</script>

<style lang="scss" src="./settings-answerphone-list.scss"></style>