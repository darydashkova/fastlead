import {reactive, ref, computed} from 'vue';

const contextPosition = reactive({
    top: '0px',
    left: '0px',
})

const isContextOpened = ref(false);

const context = reactive({
    id: null,
    itemName: '',
    item: '',
});

export function useContextMenu() {

    const setContext = (position, ctx) => {
        contextPosition.top = position.top + 'px';
        contextPosition.left = position.left + 'px';
        context.id = ctx.id;
        context.itemName = ctx.itemName;
        context.item = ctx.item;
        isContextOpened.value = true;
    }

    const unsetContext = () => {
        isContextOpened.value = false;
    }


    return {
        contextPosition,
        isContextOpened,
        context: computed(() => context),

        setContext,
        unsetContext,
    }
}