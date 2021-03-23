import {reactive, ref} from 'vue';

const contextPosition = reactive({
    top: '0px',
    left: '0px',
})

const isContextOpened = ref(false);

const dialogId = ref(null);

export function useContextMenu() {

    const setContext = (context, id) => {
        contextPosition.top = context.top + 'px';
        contextPosition.left = context.left + 'px';
        isContextOpened.value = true;
        dialogId.value = id;
    }

    const unsetContext = (context) => {
        isContextOpened.value = false;
    }


    return {
        contextPosition,
        isContextOpened,
        dialogId,

        setContext,
        unsetContext,
    }
}