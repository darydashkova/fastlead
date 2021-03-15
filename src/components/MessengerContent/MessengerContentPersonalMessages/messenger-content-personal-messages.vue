<template>
    <div class="messenger-content-personal-messages"
         :class="isDark? 'messenger-content-personal-messages_dark' : 'messenger-content-personal-messages_light'"
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
            :class="isDark? 'separator_dark' : 'separator_light'"
        />
    </div>
</template>

<script>
    import BaseSquareIcon from '../../Base/base-square-icon'
    export default {
        components: { BaseSquareIcon },
        props: {
            isDark: Boolean,
        },
        setup(props) {
            return {
                isDark: props.isDark
            }
        }
    }
</script>

<style lang="scss" src="./messenger-content-personal-messages.scss"></style>