<template>
    <div class="base-dialogs-folder-tuning" v-if="folder">
        <BaseFolderName>
            {{folder.name}}
        </BaseFolderName>
        <svg @click="toggleModalCreateChat(true)" class="base-dialogs-folder-tuning__add-button" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 20H2.5C1.12168 20 0 18.8783 0 17.5V16.6667C0 12.0717 3.73832 8.33334 8.33332 8.33334C8.79332 8.33334 9.16664 8.70666 9.16664 9.16666C9.16664 9.62666 8.79332 9.99998 8.33332 9.99998C4.6575 9.99998 1.66664 12.9908 1.66664 16.6667V17.5C1.66664 17.96 2.04082 18.3333 2.49996 18.3333H9.99996C10.46 18.3333 10.8333 18.7058 10.8333 19.1666C10.8333 19.6275 10.46 20 10 20Z" fill="#B7B7BE"/>
            <path d="M8.33331 0.833237C10.6342 0.833237 12.5 2.6991 12.5 4.99992V6.6666C12.5 8.96742 10.6342 10.8333 8.33331 10.8333C6.03249 10.8333 4.16663 8.96745 4.16663 6.6666V4.99992C4.16667 2.6991 6.03249 0.833237 8.33331 0.833237Z" fill="#404054"/>
            <path d="M8.33325 11.6667C5.57575 11.6667 3.33325 9.42418 3.33325 6.66668V5C3.33325 2.2425 5.57575 0 8.33325 0C11.0908 0 13.3333 2.2425 13.3333 5V6.66668C13.3333 9.42418 11.0908 11.6667 8.33325 11.6667ZM8.33325 1.66668C6.49493 1.66668 4.99993 3.16168 4.99993 5V6.66668C4.99993 8.505 6.49493 10 8.33325 10C10.1716 10 11.6666 8.505 11.6666 6.66668V5C11.6666 3.16168 10.1716 1.66668 8.33325 1.66668Z" fill="#B7B7BE"/>
            <path d="M19.1667 15.8334H10.8333C10.3733 15.8334 10 15.4609 10 15.0001C10 14.5393 10.3733 14.1668 10.8333 14.1668H19.1666C19.6275 14.1668 20 14.5393 20 15.0001C20 15.4609 19.6275 15.8334 19.1667 15.8334Z" fill="#B7B7BE"/>
            <path d="M14.9999 20C14.5391 20 14.1666 19.6275 14.1666 19.1667V10.8333C14.1666 10.3725 14.5391 10 14.9999 10C15.4608 10 15.8333 10.3725 15.8333 10.8333V19.1666C15.8333 19.6275 15.4608 20 14.9999 20Z" fill="#B7B7BE"/>
        </svg>
    </div>
</template>

<script>
    import { computed } from 'vue'
    import BaseFolderName from './BaseFolderName.vue'
    import {useModals} from "../../composition/useModals";
    export default {
        components: { BaseFolderName },
        props: {
            folder: {
                folder_id: [Number, String],
                name: String,
            }
        },
        setup(props) {

            const { openedModalCreateChat, toggleModalCreateChat } = useModals()

            return {
                folder: computed(() => props.folder),
                toggleModalCreateChat,
            }
        }
    }
</script>

<style lang="scss">
    .base-dialogs-folder-tuning {
        display: flex;
        width: 100%;
        padding: 0 21px;
        justify-content: space-between;
        align-items: center;
        margin-top: 22px;
    }

    .base-dialogs-folder-tuning__add-button {
        cursor: pointer;
        min-width: 20px;
        max-width: 20px;
    }
</style>