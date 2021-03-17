<template>
    <div class="messenger-content-personal-messages"
    >
        <div class="messenger-content-personal-messages__header">
            <BaseSquareIcon
                    :src="require('../../../assets/images/avatarko_anonim.jpg')"
            ></BaseSquareIcon>
            <div class="messenger-content-personal-messages__name-container">
                <div class="messenger-content-personal-messages__name">Имя</div>
                <div class="messenger-content-personal-messages__date">Имя2</div>
            </div>
        </div>
        <hr class="separator"
        />
        <MessagesContainer
        ></MessagesContainer>
    </div>
</template>

<script>
    import BaseSquareIcon from '../../Base/BaseSquareIcon'
    import MessagesContainer from '../../MessagesContainer/messages-container.vue'
    export default {
        components: { BaseSquareIcon, MessagesContainer },
    }
</script>

<style lang="scss" src="./messenger-content-personal-messages.scss"></style>