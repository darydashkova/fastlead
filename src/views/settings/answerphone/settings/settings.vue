<template>
    <div class="settings__wrapper">
        <div class="settings__wrapper_title">Создание нового автоответчика</div>
    </div>
    <div class="settings__tuning">
        <div class="tuning__base">
            <div class="base__element">
                <div class="base__element_title">Название автоответчика</div>
                <div class="base__element_input">
                    <input v-model="answerphone.name" type="text" class="input__element input__name" placeholder="Ввести">
                </div>
            </div>
            <div class="base__element">
                <div class="base__element_title">Тригер старта</div>
                    <div class="base__element_input pointer" @click="openListTrigers()">
                        <div class="input__element input-select">{{selectTriger.valueTriger}}</div>
                        <span class="pointer"><img src="@/assets/arrow_down.svg"></span>
                    </div>
                    <div class="input__block" v-if="showListTrigers">
                        <div class="input__block_select pointer" v-for="(optionSelect, index) in optionSelects" :key="index" @click="searchTriger(optionSelect.name, optionSelect.database)">{{optionSelect.name}}</div>
                    </div>
            </div>
            <div class="base__element" v-for="(inputValue, index) in inputValues" :key="index">
                <div class="base__element_title">{{inputValue.title}}</div>
                <div class="base__element_input">
                    <div type="text" class="input__element input-select pointer" :placeholder="inputValue.placeholder" @click="openFolders()" v-if="inputValue.id == 2">Выбрать</div>
                    <div type="text" class="input__element input-select pointer" :placeholder="inputValue.placeholder" v-else>Отправлять с {{answerphone.range_work.start}} до {{answerphone.range_work.stop}}</div>
                    <DateRange @closeModalDateRange="closeModalDateRange()" v-if="ModalDateRange"></DateRange>
                    <span class="pointer">
                        <img v-if="inputValue.id == 1" src="@/assets/clock.svg" @click="openModalDateRange()">
                        <img v-else src="@/assets/folder.svg" @click="openFolders()">
                    </span>
                </div>
            </div>
        </div>
        <div class="tuning__message">
                <TextMessage></TextMessage>
        </div>
    </div>
    <div class="settings__buttons">
        <router-link style="text-decoration: none;" :to="'/settings/answerphone/list'"><div class="settings__buttons_cancel pointer">Отмена</div></router-link>
        <div class="settings__buttons_accept pointer">Сохранить</div>

    </div>
    <SelectFolder v-if="folders" @closeFolders="closeFolders()"></SelectFolder>
</template>

<script>
import { ref, watch } from 'vue'
import SelectFolder from '@/components/SettingsContainer/SettingsAnswerphone/settings-answerphone-folders.vue'
import TextMessage from '@/components/SettingsContainer/SettingsIntegrations/SettingsIntegrationsMessage.vue'
import DateRange from '@/components/Modals/ModalDateRange.vue'
import { useAnswerphone } from "@/composition/useAnswerphone"
export default {
    components: {
        SelectFolder,
        TextMessage,
        DateRange,
    },
    setup(props, { emit }) {
        const {answerphone} = useAnswerphone()

        const inputValues = ref([
            {id: 1, title: "Диапазон времени отправки сообщения", placeholder: "Отправлять с 00:00 до 00:00"},
            {id: 2, title: "Папка", placeholder: "Выбрать", click: `openFolders()`},
        ])

        const folders = ref(false)

        const openFolders = () => {
            folders.value = true
        }
        const closeFolders = () => {
            folders.value = false
        }

        const optionSelects = ref([
            {id: 1, name: "Попадание в папку", database: "OnMoved"},
            {id: 2, name: "Первое обращение", database: "OnNewDialog"},
            {id: 3, name: "Обращение в нерабочее время", database: "OnAfterHours"},
            {id: 4, name: "Подписка на аккаунт", database: "OnNewSubscriber"},
            {id: 5, name: "Комментарий под постом", database: "OnComment"},
        ])

        const selectTriger = ref({
            valueTriger: "Выбрать",
            database: "",
        })

        const showListTrigers = ref(false)

        const openListTrigers = () => {
            if(showListTrigers.value){
                closeListTrigers()
            } else {
            showListTrigers.value = true
            }
        }

        const closeListTrigers = () => {
            showListTrigers.value = false
        }
        
        const ModalDateRange = ref(false)
        const openModalDateRange = () => {
            ModalDateRange.value = true
        }
        const closeModalDateRange = () => {
            ModalDateRange.value = false
        }

        const searchTriger = (name, database) => {
            selectTriger.value.valueTriger = name
            selectTriger.value.database = database
            closeListTrigers()
        }

        const initialAnswerphone = () => {
            answerphone.value.event = selectTriger.value.database
        }

        watch(() => {
            initialAnswerphone()
        })
        return{
            inputValues,
            folders,
            optionSelects,
            selectTriger,
            showListTrigers,
            ModalDateRange,
            answerphone,

            openFolders,
            closeFolders,
            openListTrigers,
            closeListTrigers,
            searchTriger,
            openModalDateRange,
            closeModalDateRange,
            initialAnswerphone,
        }
    }
}
</script>

<style lang="scss" src="./settings.scss"></style>

<style lang="scss">

</style>