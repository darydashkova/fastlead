
import { ref } from 'vue';

const editDate = ref(null);
const checkDate = ref(false)

export function integrationTasks() {

   const getDateForChange = (date) => {
    checkDate.value = true;
    editDate.value = date
   }
   
    return {
        getDateForChange,
        editDate,
        checkDate
    }
}