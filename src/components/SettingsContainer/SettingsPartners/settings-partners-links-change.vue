<template>
    <div class="settings-partners-link-change">
        <div class="settings-partners-link-change__block">
            <div class="settings-partners-link-change__block_header">
                <h2 class="settings-partners-link-change__block_header-title">Переименовать ссылку</h2>
                <div class="settings-partners-link-change__block_header-close pointer" type="button" @click="closeModalChange">
                    <img src="@/assets/close.svg">
                </div>
            </div>
            <div class="settings-partners-link-change__block_main">
                <p class="settings-partners-link-change__block_main-title">Название</p>
                <input v-model="initialUpdate.url_name" placeholder="Ввести" class="settings-partners-link-change__block_main-input">
            </div>
            <div class="settings-partners-link-change__block_buttons">
                <div type="button" class="settings-partners-link-change__block_buttons-access pointer" @click="sellUpdateLink()">Сохранить изменения</div>
                <div type="button" class="settings-partners-link-change__block_buttons-cansel pointer" @click="closeModalChange">Отмена</div>
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
            getPartners()
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