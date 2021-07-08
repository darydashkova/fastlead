<template>
    <div class="modal-create-folder" @mousedown.self="close">
        <div class="modal-create-folder__body">
            <BaseModalHeader>
                Новая папка
            </BaseModalHeader>
            <div class="modal-create-folder__input-group modal-create-folder__input-group_padding-20">
                <BaseModalLabel for-id="modal-create-folder__input" :class="{'base-modal-label_error': error}">Название папки</BaseModalLabel>
                <input id="modal-create-folder__input" type="text" class="modal-create-folder__input" v-model="name" maxlength="19">
            </div>
            <div class="modal-create-folder__footer">
                <BaseButton
                        @click="save"
                        class="base-button_enter"
                >
                    Добавить
                </BaseButton>
                <BaseButton
                        @click="close"
                        class="base-button_cancel"
                >
                    Отмена
                </BaseButton>
            </div>
        </div>
    </div>
</template>

<script>
    import BaseButton from '../Base/BaseButton.vue'
    import BaseModalLabel from '../Base/BaseModalLabel.vue'
    import BaseModalHeader from '../Base/BaseModalHeader.vue'

    import { ref, onMounted } from 'vue';
    export default {
        components: { BaseButton, BaseModalLabel, BaseModalHeader },
        props: {
            name: String,
        },
        setup(props, {emit}) {
            const name = ref('');
            const error = ref(false);
            const close = () => {
                emit('close')
            }

            const save = () => {
                error.value = false;
                if (!name.value.length) {
                    error.value = true;
                    return;
                }
                emit('save', name.value);
            }
            onMounted(() => {
                name.value = props.name;
            })

            return {
                name,
                error,
                save,
                close,
            }
        }
    }
</script>

<style lang="scss">
    .modal-create-folder {
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.34);
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1300;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: left;
        &.z-index {
            z-index: 1400;
        }
    }
    .modal-create-folder__body {
        width: 364px;
        border-radius: 9px;
        position: relative;
        padding: 20px 0;

        background: var(--modal-bg-color);
        color: var(--modal-font-color);
    }
    .modal-create-folder__input-group {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 31px 0 29px;
        &.modal-create-folder__input-group_padding-20 {
            padding: 0 20px;
        }
    }
    .modal-create-folder__input {
        font-family: Segoe UI;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        margin-top: 6px;
        width: 100%;
        padding: 6px 10px;

        color: var(--modal-font-color);
        background: var(--modal-element-hover-bg-color);
        border: 0.7px solid var(--modal-input-border-color);
        box-sizing: border-box;
        border-radius: 3px;
    }

</style>