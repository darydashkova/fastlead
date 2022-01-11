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
                    <div type="text" class="input__element input-select pointer" :placeholder="inputValue.placeholder" @click="openFolders()" v-if="inputValue.id == 2">{{inputValue.placeholder}}</div>
                    <div type="text" @click="openModalDateRange()" class="input__element input-select pointer" :placeholder="inputValue.placeholder" v-else>Отправлять с {{answerphone.range_work.start}} до {{answerphone.range_work.stop}}</div>
                    <DateRange @closeModalDateRange="closeModalDateRange()" v-if="ModalDateRange"></DateRange>
                    <span class="pointer">
                        <img v-if="inputValue.id == 1" src="@/assets/clock.svg" @click="openModalDateRange()">
                        <img v-else src="@/assets/folder.svg" @click="openFolders()">
                    </span>
                </div>
            </div>
        </div>
        <div class="tuning__message">
                <TextMessage @dataFile='checkData' @propText="getText" :text='textMess' :nameFile='propFileData'></TextMessage>
        </div>
    </div>
    <div class="settings__buttons">
        <router-link style="text-decoration: none;" :to="'/settings/answerphone/list-answerphone'"><div class="settings__buttons_cancel pointer" @click="cancelSettings()">Отмена</div></router-link>
        <router-link style="text-decoration: none;" :to="'/settings/answerphone/list-answerphone'"><div class="settings__buttons_accept pointer" @click="create()">Сохранить</div></router-link>
    </div>
    <SelectFolder v-if="foldersModal" @closeModalConnectFolder="closeModalConnectFolder"></SelectFolder>
    <FullScreenLoader v-if="loader"></FullScreenLoader>
</template>

<script>
import { ref, watch,} from 'vue'
import SelectFolder from '@/components/SettingsContainer/SettingsAnswerphone/settings-answerphone-folders.vue'
import TextMessage from '@/components/SettingsContainer/SettingsIntegrations/SettingsIntegrationsMessage.vue'
import DateRange from '@/components/Modals/ModalDateRange.vue'
import { useAnswerphone } from "@/composition/useAnswerphone"
import { useInstagramApi } from "@/composition/useInstagramApi";
import FullScreenLoader from "@/components/FullScreenLoader";
export default {
    components: {
        SelectFolder,
        TextMessage,
        DateRange,
        FullScreenLoader,
    },
    setup(props, { emit }) {
        const {answerphone, createAnswerphone, answerphoneId, updateAnswerphone, answerphones, getAllAnswerphone} = useAnswerphone()
        const {folders, getFolder} = useInstagramApi()
        getFolder()
        const inputValues = ref([
            {id: 1, title: "Диапазон времени отправки сообщения", placeholder: "Отправлять с 00:00 до 00:00"},
            {id: 2, title: "Папка", placeholder: "Выбрать", click: `openFolders()`},
        ])

        const foldersModal = ref(false)

        const textMess = ref('')

        const loader = ref(false)

        const openFolders = () => {
            foldersModal.value = true
        }
        const closeModalConnectFolder = () => {
            foldersModal.value = false
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

        const create = () => {
            if(answerphoneId.value == null){
                createAnswerphone(answerphone.value)
                .then((r) => {
                    cancelSettings()
                })
            } else {
                updateAnswerphone(answerphone.value)
                .then((r) => {
                    cancelSettings()
                })
            }
        }

        const showListTrigers = ref(false)

        const openListTrigers = () => {
            if(showListTrigers.value){
                closeListTrigers()
            } else {
            showListTrigers.value = true
            }
        }

        const cancelSettings = () => {
            answerphoneId.value = null
            selectTriger.value.valueTriger = "Выбрать"
            answerphone.value.range_work.start = "00:00"
            answerphone.value.range_work.stop = "00:00"
            answerphone.value.name = ""
            inputValues.value[1].placeholder = "Выбрать"
            getAllAnswerphone()
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
            answerphone.value.autoresponder_id = answerphoneId.value

            for(let j=0; j < Object.keys(folders.value).length; j++){
                if(answerphone.value.folder_ids == folders.value[j].folder_id){
                    inputValues.value[1].placeholder = folders.value[j].name
                } else if (folders.value[j].folders){
                    for(let k=0; k < Object.keys(folders.value[j].folders).length; k++){
                        if(answerphone.value.folder_ids == folders.value[j].folders[k].folder_id){
                            inputValues.value[1].placeholder = folders.value[j].folders[k].name
                        }
                    }
                }
            }
        }

        const getText = (text) => {
                answerphone.value.message.data = text;
            }

        const showTriger = ref([])

        const returnTriger = () => {
            for(let i = 0; i < Object.keys(answerphones.value).length; i++){
                for(let j = 0; j < Object.keys(optionSelects.value).length; j++){
                    if(answerphones.value[i].event == optionSelects.value[j].database){
                        showTriger.value[i].name = optionSelects.value[j].name
                    }
                }
            }
        }

        const returnValueAnswerphone = () => {
            for(i=0; i < Object.keys(answerphones.value).length; i++){
                if(answerphones.value[i].autoresponder_id == answerphoneId.value && answerphoneId.value != null){
                    selectTriger.value.valueTriger = showTriger.value[i].name
                    answerphone.value.range_work.start = answerphones.value[i].range_work.start
                    answerphone.value.range_work.stop = answerphones.value[i].range_work.stop
                    answerphone.value.name = answerphones.value[i].name
                    textMess.value = answerphones.value[i].message.text
                    for(let j=0; j < Object.keys(folders.value).length; j++){
                        if(answerphones.value[i].folder_ids[0] == folders.value[j].folder_id){
                            inputValues.value[1].placeholder = folders.value[j].name
                        } else if (folders.value[j].folders){
                            for(let k=0; k < Object.keys(folders.value[j].folders).length; k++){
                                if(answerphones.value[i].folder_ids[0] == folders.value[j].folders[k].folder_id){
                                    inputValues.value[1].placeholder = folders.value[j].folders[k].name
                                }
                            }
                        }
                    }
                } 
            }
        }  
        const updateInitial = ref(true)


         watch(() => {
            for(let i = 0; i < Object.keys(answerphones.value).length; i++){
                showTriger.value.push({name: ""})
            }
            initialAnswerphone()
            
           if(inputValues.value[1].placeholder == "Выбрать"){
                returnTriger()
                returnValueAnswerphone()
           }
        })
        
        returnValueAnswerphone()
        returnTriger()
        
    
        return{
            inputValues,
            foldersModal,
            optionSelects,
            selectTriger,
            showListTrigers,
            ModalDateRange,
            answerphone,

            updateInitial,

            cancelSettings,

            openFolders,
            closeModalConnectFolder,
            openListTrigers,
            closeListTrigers,
            searchTriger,
            openModalDateRange,
            closeModalDateRange,
            initialAnswerphone,

            answerphoneId,

            create,
            getText,
            textMess,

            returnValueAnswerphone,
            answerphones,

            showTriger,
            returnTriger,

            folders,
            loader,
        }
    }
}
</script>

<style lang="scss" src="./settings-answerphone.scss"></style>

<style lang="scss">

</style>