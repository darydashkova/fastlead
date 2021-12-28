<template>
    <div class="base-search-input">
        <input v-model="searchValue" @input="search" type="text" class="base-search-input__input"  :placeholder="placeholder">
        <svg class="base-search-input__loupe" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.8289 13.0041L9.84771 9.0229C10.6189 8.07034 11.0832 6.85992 11.0832 5.54161C11.0832 2.48615 8.59705 0 5.54159 0C2.48612 0 0 2.48612 0 5.54159C0 8.59705 2.48615 11.0832 5.54161 11.0832C6.85992 11.0832 8.07034 10.6189 9.0229 9.84771L13.0041 13.8289C13.1179 13.9427 13.2672 13.9998 13.4165 13.9998C13.5659 13.9998 13.7152 13.9427 13.8289 13.8289C14.057 13.6008 14.057 13.2322 13.8289 13.0041ZM5.54161 9.91654C3.12897 9.91654 1.16666 7.95424 1.16666 5.54159C1.16666 3.12894 3.12897 1.16664 5.54161 1.16664C7.95426 1.16664 9.91656 3.12894 9.91656 5.54159C9.91656 7.95424 7.95424 9.91654 5.54161 9.91654Z"
                  fill="var(--search-input-placeholder-color)"/>
        </svg>

        <!--<svg v-show="searchValue" @click="deleteSearchValue" class="base-search-input__exit" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L9 9M9 1L1 9" stroke="var(--search-input-placeholder-color)" stroke-linecap="round"/>
        </svg>-->
        <svg v-if="isWithAction && !searchValue" class="base-search-input__add" @click="toggleModalCreateChat(true)" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 10C8.48891 10 9.4556 9.70676 10.2779 9.15735C11.1001 8.60794 11.741 7.82705 12.1194 6.91342C12.4978 5.99979 12.5969 4.99445 12.4039 4.02455C12.211 3.05465 11.7348 2.16373 11.0355 1.46447C10.3363 0.765206 9.44536 0.289002 8.47545 0.0960758C7.50555 -0.0968502 6.50021 0.00216643 5.58658 0.380605C4.67295 0.759043 3.89206 1.3999 3.34265 2.22215C2.79324 3.0444 2.5 4.0111 2.5 5C2.50132 6.32568 3.02853 7.59668 3.96593 8.53407C4.90332 9.47147 6.17432 9.99868 7.5 10ZM7.5 1.66667C8.15927 1.66667 8.80374 1.86217 9.3519 2.22844C9.90006 2.59471 10.3273 3.1153 10.5796 3.72439C10.8319 4.33348 10.8979 5.0037 10.7693 5.6503C10.6407 6.29691 10.3232 6.89085 9.85702 7.35702C9.39085 7.8232 8.7969 8.14067 8.1503 8.26929C7.5037 8.3979 6.83348 8.33189 6.22439 8.0796C5.6153 7.82731 5.09471 7.40007 4.72843 6.8519C4.36216 6.30374 4.16667 5.65927 4.16667 5C4.16667 4.11595 4.51786 3.2681 5.14298 2.64298C5.7681 2.01786 6.61594 1.66667 7.5 1.66667ZM19.1666 9.16675H17.5V7.50008C17.5 7.27907 17.4122 7.06711 17.2559 6.91083C17.0996 6.75455 16.8877 6.66675 16.6666 6.66675C16.4456 6.66675 16.2337 6.75455 16.0774 6.91083C15.9211 7.06711 15.8333 7.27907 15.8333 7.50008V9.16675H14.1666C13.9456 9.16675 13.7337 9.25455 13.5774 9.41083C13.4211 9.56711 13.3333 9.77907 13.3333 10.0001C13.3333 10.2211 13.4211 10.4331 13.5774 10.5893C13.7337 10.7456 13.9456 10.8334 14.1666 10.8334H15.8333V12.5001C15.8333 12.7211 15.9211 12.9331 16.0774 13.0893C16.2337 13.2456 16.4456 13.3334 16.6666 13.3334C16.8877 13.3334 17.0996 13.2456 17.2559 13.0893C17.4122 12.9331 17.5 12.7211 17.5 12.5001V10.8334H19.1666C19.3877 10.8334 19.5996 10.7456 19.7559 10.5893C19.9122 10.4331 20 10.2211 20 10.0001C20 9.77907 19.9122 9.56711 19.7559 9.41083C19.5996 9.25455 19.3877 9.16675 19.1666 9.16675ZM2.19914 13.8659C3.60518 12.4598 5.51155 11.669 7.5 11.6667C9.48845 11.669 11.3948 12.4598 12.8009 13.8659C14.2069 15.2719 14.9978 17.1783 15 19.1667C15 19.3878 14.9122 19.5997 14.7559 19.756C14.5996 19.9123 14.3877 20.0001 14.1667 20.0001C13.9457 20.0001 13.7337 19.9123 13.5774 19.756C13.4211 19.5997 13.3333 19.3878 13.3333 19.1667C13.3333 17.6197 12.7188 16.1359 11.6248 15.042C10.5308 13.948 9.0471 13.3334 7.5 13.3334C5.9529 13.3334 4.46917 13.948 3.37521 15.042C2.28125 16.1359 1.66667 17.6197 1.66667 19.1667C1.66667 19.3878 1.57887 19.5997 1.42259 19.756C1.26631 19.9123 1.05435 20.0001 0.833333 20.0001C0.61232 20.0001 0.400358 19.9123 0.244078 19.756C0.0877974 19.5997 0 19.3878 0 19.1667C0.00220571 17.1783 0.79309 15.2719 2.19914 13.8659Z"
                  fill="#9797BB"/>
        </svg>

    </div>
</template>

<script>
    import { ref } from 'vue';
    export default {
        props: {
            placeholder: String,
            isWithAction: Boolean,
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
                deleteSearchValue,
                toggleModalCreateChat: (d) => emit('toggleModalCreateChat', d),

                isWithAction: props.isWithAction,
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
        width: 100%;
      
        &.base-search-input_m {
            margin: 24px 0 34px;
        }
        &.base-search-input_pdt-5 {
            padding-top: 5px;
        }
        &.base-search-input_middle-bar {
            .base-search-input__input {
                background: var(--search-input-color)!important;
            }
        }

    }
    .base-search-input__input{
        -webkit-appearance: none;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        border:none;
        outline: none;
        font-family: Inter;
        border-radius: 6px;
        width: 100%;
        padding: 5px 20px 5px 42px;
        position: relative;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 21px;
        color: var(--modal-font-color);
        background: #1D1D35;
        border: 1px solid #40406B;
        &::placeholder {
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            color: #40406B;
        }

    }
    .base-search-input__loupe{
        position: absolute;
        left: 10px;
        cursor: pointer;
    }
    .base-search-input__exit {
        position: absolute;
        right: calc(15px + #{$padding});
        cursor: pointer;
    }
    .base-search-input__add {
        cursor: pointer;
        margin-left: 14px;
    }
</style>