<template>
    <div class="settings-autoresponder-card">
        <div class="settings-autoresponder-card__container">
            <div class="settings-autoresponder-card__header">
                Сообщение
            </div>
            <div class="settings-autoresponder-card__actions-container">
                <svg @click="del" class="pointer" style="margin-right: 18px" width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.2 3H12.72C12.5343 2.15356 12.0431 1.39301 11.329 0.846539C10.6149 0.300068 9.72176 0.00109089 8.8 0H7.2C6.27824 0.00109089 5.38506 0.300068 4.671 0.846539C3.95694 1.39301 3.46568 2.15356 3.28 3H0.8C0.587827 3 0.384344 3.07902 0.234315 3.21967C0.0842854 3.36032 0 3.55109 0 3.75C0 3.94891 0.0842854 4.13968 0.234315 4.28033C0.384344 4.42098 0.587827 4.5 0.8 4.5H1.6V14.25C1.60127 15.2442 2.02311 16.1973 2.77298 16.9003C3.52285 17.6033 4.53952 17.9988 5.6 18H10.4C11.4605 17.9988 12.4772 17.6033 13.227 16.9003C13.9769 16.1973 14.3987 15.2442 14.4 14.25V4.5H15.2C15.4122 4.5 15.6157 4.42098 15.7657 4.28033C15.9157 4.13968 16 3.94891 16 3.75C16 3.55109 15.9157 3.36032 15.7657 3.21967C15.6157 3.07902 15.4122 3 15.2 3ZM7.2 1.5H8.8C9.29622 1.50057 9.7801 1.64503 10.1853 1.91358C10.5905 2.18213 10.8971 2.56162 11.0632 3H4.9368C5.10287 2.56162 5.40952 2.18213 5.81471 1.91358C6.2199 1.64503 6.70378 1.50057 7.2 1.5ZM12.8 14.25C12.8 14.8467 12.5471 15.419 12.0971 15.841C11.647 16.2629 11.0365 16.5 10.4 16.5H5.6C4.96348 16.5 4.35303 16.2629 3.90294 15.841C3.45286 15.419 3.2 14.8467 3.2 14.25V4.5H12.8V14.25ZM6.39961 13.5001C6.61178 13.5001 6.81526 13.421 6.96529 13.2804C7.11532 13.1397 7.19961 12.949 7.19961 12.7501V8.25006C7.19961 8.05115 7.11532 7.86039 6.96529 7.71973C6.81526 7.57908 6.61178 7.50006 6.39961 7.50006C6.18744 7.50006 5.98395 7.57908 5.83392 7.71973C5.68389 7.86039 5.59961 8.05115 5.59961 8.25006V12.7501C5.59961 12.949 5.68389 13.1397 5.83392 13.2804C5.98395 13.421 6.18744 13.5001 6.39961 13.5001ZM10.1645 13.2804C10.0145 13.421 9.81101 13.5001 9.59883 13.5001C9.38666 13.5001 9.18317 13.421 9.03314 13.2804C8.88311 13.1397 8.79883 12.949 8.79883 12.7501V8.25006C8.79883 8.05115 8.88311 7.86039 9.03314 7.71973C9.18317 7.57908 9.38666 7.50006 9.59883 7.50006C9.81101 7.50006 10.0145 7.57908 10.1645 7.71973C10.3146 7.86039 10.3988 8.05115 10.3988 8.25006V12.7501C10.3988 12.949 10.3146 13.1397 10.1645 13.2804Z" fill="#9797BB"/>
                </svg>
                <svg class="pointer" width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="18" height="2" rx="1" fill="#9797BB"/>
                    <rect y="6" width="18" height="2" rx="1" fill="#9797BB"/>
                    <rect y="12" width="18" height="2" rx="1" fill="#9797BB"/>
                </svg>
            </div>
        </div>
        <div @click="open" class="settings-autoresponder-card__container">
            <textarea class="settings-autoresponder-card__message"></textarea>
            <div class="settings-autoresponder-card__links-container">
                <div class="settings-autoresponder-card__link-name">Ответили</div>
                <div class="settings-autoresponder-card__link-name">Всегда</div>
                <div class="settings-autoresponder-card__link-name">Не ответили</div>
            </div>
        </div>
        <div class="settings-autoresponder-card__link"
             :style="{
                'left': i < 3 && '-5.5px',
                'right': i > 2 && '-5.5px',
                'bottom': i * 25 + 'px',
             }"
             v-for="i in 6"
        ></div>
    </div>
</template>

<script>
    export default {
        setup() {
            const del = (id) => {
            }
            const open = (id) => {
            }
            return {
                del, open
            }
        }
    }
</script>

<style lang="scss">
</style>