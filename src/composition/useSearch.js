import { ref } from 'vue';
import searchActions from "../api/searchActions";

const openedSearch = ref(false);

const selectedParameter = ref(null);



export function useSearch() {
    const toggleSearch = (boolean) => {
        openedSearch.value = boolean;
    }

    const openedSearchParameters = ref(false);
    const toggleSearchParameters = (boolean) => {
        openedSearchParameters.value = boolean;
    }

    const selectParameter = (value) => {
        selectedParameter.value = value;
    }

    const search = async (value) => {
        let params = [];
        selectedParameter.value
            ? params.push(selectedParameter.value)
            : params = ['name', 'phone', 'messages','login','tags'];
        return await searchActions.searchDialogs(value, params)
    }



    return {
        openedSearch,
        toggleSearch,

        openedSearchParameters,
        toggleSearchParameters,


        selectedParameter,
        selectParameter,

        search,

    }
}