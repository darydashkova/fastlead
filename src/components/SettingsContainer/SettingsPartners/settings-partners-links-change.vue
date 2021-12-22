<template>
    <div class="settings-partners-link-change">
        <div class="settings-partners-link-change__block">
            <div class="settings-partners-link-change__block_header">
                <h2 class="settings-partners-link-change__block_header-title">Переименовать ссылку</h2>
                <button class="settings-partners-link-change__block_header-close" type="button" @click="closeModalChange">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#9797BB"/>
                    </svg>
                </button>
            </div>
            <div class="settings-partners-link-change__block_main">
                <p class="settings-partners-link-change__block_main-title">Название</p>
                <input v-model="initialUpdate.url_name" placeholder="Ввести" class="settings-partners-link-change__block_main-input">
            </div>
            <div class="settings-partners-link-change__block_buttons">
                <button type="button" class="settings-partners-link-change__block_buttons-access" @click="sellUpdateLink()">Применить</button>
                <button type="button" class="settings-partners-link-change__block_buttons-cansel" @click="closeModalChange">Отмена</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onUpdated, onMounted } from 'vue'
import { usePartners } from "@/composition/usePartners";
export default {
    setup(props, {emit}){

        const {returnPartners, updatePartners, getPartners} = usePartners()

        const closeModalChange = () => {
            emit('closeModalChange');
        }

        const initialUpdate = ref({
            affiliate_id: 0,
            url_name: "",
        })

        const updateParametrs = () => {
            initialUpdate.value.affiliate_id = returnPartners.value.affiliate[0].affiliate_id
            returnPartners.value.affiliate[0].url_name = initialUpdate.value.url_name
        }

        onUpdated(() => {
            updateParametrs()
        })

        const sellUpdateLink = () => {

            updatePartners(initialUpdate.value)
            .then(r => {
                if (r.error) {
                    return;
                }
            })
            emit('closeModalChange'); 
        }

        return {
            closeModalChange,
            
            returnPartners,

            initialUpdate,
            updateParametrs,
            sellUpdateLink,
            
        }
    }
}
</script>

<style lang="scss" src="./settings-partners-links-change.scss"></style>