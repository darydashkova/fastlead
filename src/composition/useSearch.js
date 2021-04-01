import { ref } from 'vue';

const openedSearch = ref(false);



export function useSearch() {
    const toggleSearch = (boolean) => {
        openedSearch.value = boolean;
    }

    const openedSearchParameters = ref(false);
    const toggleSearchParameters = (boolean) => {
        openedSearchParameters.value = boolean;
    }

    return {
        openedSearch,
        toggleSearch,

        openedSearchParameters,
        toggleSearchParameters
    }
}