<template>
    <div class="messenger-content-personal-messages" v-if="selectedDialog">
        <div class="messenger-content-personal-messages__header">
            <BaseSquareIcon
                    :src="messages.avatar"
            ></BaseSquareIcon>
            <div class="messenger-content-personal-messages__name-container">
                <div class="messenger-content-personal-messages__name">{{messages.name}}</div>
                <div class="messenger-content-personal-messages__date">{{messages.is_online? 'В сети' : 'Не в сети'}}</div>
            </div>
        </div>
        <hr class="separator"/>
        <MessagesContainer
        ></MessagesContainer>
    </div>
</template>

<script>
    import BaseSquareIcon from '../../Base/BaseSquareIcon'
    import MessagesContainer from '../../MessagesContainer/messages-container.vue'
    import { useMessages } from "../../../composition/useMessages";
    import { computed } from 'vue';
    import { useDialogs } from "../../../composition/useDialogs";
    export default {
        components: { BaseSquareIcon, MessagesContainer },
        setup() {
            const { messages } = useMessages();

            const { selectedDialog } = useDialogs()

            return {
                messages,
                selectedDialog,
            }
        }
    }
</script>

<style lang="scss" src="./messenger-content-personal-messages.scss"></style>