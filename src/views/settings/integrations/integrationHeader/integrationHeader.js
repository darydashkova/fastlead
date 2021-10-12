import {ref} from 'vue';
const  isAmoClick = ref(false);
export function integrationHeader() {
   
    const activateForm = (val) => {
        isAmoClick.value = val;
       
        // if(isAmoClick.value){
        //     console.log('+++++')
        //     const amoEditLin = document.querySelector('.integration-tabs-created-tasks__container')
        //     console.log(amoEditLin)
        // }
        return isAmoClick
    }
    

    return {
        activateForm,
        isAmoClick
    }
}