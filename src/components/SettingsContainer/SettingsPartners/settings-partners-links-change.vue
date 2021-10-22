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
                <input placeholder="Ввести" class="settings-partners-link-change__block_main-input">
            </div>
            <div class="settings-partners-link-change__block_buttons">
                <button type="button" class="settings-partners-link-change__block_buttons-access">Применить</button>
                <button type="button" class="settings-partners-link-change__block_buttons-cansel" @click="closeModalChange">Отмена</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    setup(props, {emit}){

        const closeModalChange = () => {
            emit('closeModalChange');
        }

        return {
            closeModalChange,
        }
    }
}
</script>

<style lang="scss" src="./settings-partners-links-change.scss"></style>