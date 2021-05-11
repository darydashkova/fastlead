<template>
    <div class="base-search-input">
        <input v-model="searchValue" @input="search" type="text" class="base-search-input__input" :placeholder="placeholder">
        <svg class="base-search-input__loupe" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.8289 13.0041L9.84771 9.0229C10.6189 8.07034 11.0832 6.85992 11.0832 5.54161C11.0832 2.48615 8.59705 0 5.54159 0C2.48612 0 0 2.48612 0 5.54159C0 8.59705 2.48615 11.0832 5.54161 11.0832C6.85992 11.0832 8.07034 10.6189 9.0229 9.84771L13.0041 13.8289C13.1179 13.9427 13.2672 13.9998 13.4165 13.9998C13.5659 13.9998 13.7152 13.9427 13.8289 13.8289C14.057 13.6008 14.057 13.2322 13.8289 13.0041ZM5.54161 9.91654C3.12897 9.91654 1.16666 7.95424 1.16666 5.54159C1.16666 3.12894 3.12897 1.16664 5.54161 1.16664C7.95426 1.16664 9.91656 3.12894 9.91656 5.54159C9.91656 7.95424 7.95424 9.91654 5.54161 9.91654Z"
                  fill="var(--search-input-placeholder-color)"/>
        </svg>

        <svg v-show="searchValue" @click="deleteSearchValue" class="base-search-input__exit" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L9 9M9 1L1 9" stroke="var(--search-input-placeholder-color)" stroke-linecap="round"/>
        </svg>

    </div>
</template>

<script>
    import { ref } from 'vue';
    export default {
        props: {
            placeholder: String,
        },

        setup(props, {emit}) {

            const searchValue = ref('');

            const deleteSearchValue = () => {
                searchValue.value = '';
                emit('toggleSearch', false);
            }

            const search = ($event) => {
                $event.target.value.length
                    ? emit('toggleSearch', true)
                    : emit('toggleSearch', false)

                emit('handler', $event.target.value)
            }

            return {
                placeholder: props.placeholder,
                search,
                searchValue,
                deleteSearchValue
            }
        }
    }
</script>

<style lang="scss">
    $padding: 16px;
    .base-search-input {
        position: relative;
        display: flex;
        align-items: center;
        padding: 0 $padding;
        &.base-search-input_m {
            margin: 24px 0 34px;
        }
    }
    .base-search-input__input{
        -webkit-appearance: none;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        border:none;
        outline: none;

        border-radius: 16.9474px;
        width: 100%;
        padding: 8px 28px 8px 59px;
        position: relative;
        font-family: Segoe UI;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        color: var(--font-color);
        background: var(--search-input-color);
        &::placeholder {
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            color: var(--search-input-placeholder-color);
        }
    }
    .base-search-input__loupe{
        position: absolute;
        left: calc(15px + #{$padding});
        cursor: pointer;
    }
    .base-search-input__exit {
        position: absolute;
        right: calc(15px + #{$padding});
        cursor: pointer;
    }
</style>