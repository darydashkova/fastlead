
import { ref, onMounted, reactive } from 'vue';
const isActiveAmo = ref('');
const activeAmoCrmPage = ref('');
const activeCreatedTasks = ref('');
const activeIgnoreList = ref('');
export function integrationCards() {
    
    const checkActiveCard = (item) => {
        isActiveAmo.value=item;
        return isActiveAmo
    }
    const activeTabs = (page) => {
        activeAmoCrmPage.value = page;
        activeCreatedTasks.value = false;
        activeIgnoreList.value = false;
        return activeAmoCrmPage
    }
    const activeNextTabs = (e) => {
        activeAmoCrmPage.value = false;
        activeCreatedTasks.value = false;
        activeIgnoreList.value = false;
         const href = document.location.pathname;
        if(href === '/settings/integrations/create'){
            activeCreatedTasks.value = true;
        }
        else if (href === '/settings/integrations/ignore'){
            activeIgnoreList.value = true;
        }
        else {
            activeAmoCrmPage.value = true;

        }
    }
   
    return {
        checkActiveCard,
        isActiveAmo,
        activeAmoCrmPage,
        activeTabs,
        activeNextTabs,
        activeIgnoreList,
        activeCreatedTasks

    }
}