import {ref} from 'vue';

const checkEdit = ref(false);
const indexTask = ref();
export function yclientFunction() {
   
    const editTaskYclient = (index) => {
        checkEdit.value=true;
        indexTask.value=index
    }
    return {
        editTaskYclient,
        checkEdit,
        indexTask
    }
}