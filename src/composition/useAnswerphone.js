import answerphonesActions from "../api/answerphoneActions";
import { reactive, computed, ref } from 'vue';
import answerphoneActions from "../api/answerphoneActions";

const answerphones = reactive({
    data: [],
})

const answerphone = ref({
    autoresponder_id: null,
    name: "",
    folder_ids: null,
    event: "",
    message: {
        data: "",
        type: "text",
    },
    range_work: {
        start: "00:00",
        stop: "00:00",
    }
})

const answerphoneId = ref(null)

export function useAnswerphone() {
    
    const getAllAnswerphone = async () => {

        return await answerphonesActions.getAllAnswerphone()
            .then(r => {
                answerphones.data = {...r.autoresponders}
                return r.autoresponders;
            })
    }

    const deleteAnswerphone = async (data) => {
        return await answerphoneActions.deleteAnswerphone(data)
    }

    const stopAnswerphone = async (data) => {
        return await answerphoneActions.stopAnswerphone(data)
    }

    const startAnswerphone = async (data) => {
        return await answerphoneActions.startAnswerphone(data)
    }

    const createAnswerphone = async (data) => {
        return await answerphoneActions.createAnswerphone(data)
    }

    const updateAnswerphone = async (data) => {
        return await answerphoneActions.updateAnswerphone(data)
    }

    return {
        getAllAnswerphone,
        deleteAnswerphone,
        stopAnswerphone,
        startAnswerphone,
        createAnswerphone,
        updateAnswerphone,
        answerphone,

        answerphoneId,

        answerphones: computed(() => answerphones.data),
    }
}