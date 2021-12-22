import answerphonesActions from "../api/answerphoneActions";
import { reactive, computed, ref } from 'vue';
import answerphoneActions from "../api/answerphoneActions";

const answerphones = reactive({
    data: [],
})

const answerphone = ref({
    name: "",
    folder_ids: [],
    event: "",
    message: {
        data: "",
        type: "",
    },
    range_work: {
        start: "00:00",
        stop: "00:00",
    }
})

document.querySelector(".subscription-message")
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

    return {
        getAllAnswerphone,
        deleteAnswerphone,
        stopAnswerphone,
        startAnswerphone,
        answerphone,

        answerphones: computed(() => answerphones.data),
    }
}