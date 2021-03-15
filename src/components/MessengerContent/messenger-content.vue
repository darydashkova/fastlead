<template>
    <div class="messenger-content"
        :class="isDark? 'messenger-content_dark' : 'messenger-content_light'"
    >
        <MessengerContentNav
                :isDark="isDark"
        ></MessengerContentNav>
        <MessengerContentSidebar
                :isDark="isDark"
        ></MessengerContentSidebar>
        <MessengerContentPersonalMessages
                :isDark="isDark"
        ></MessengerContentPersonalMessages>
    </div>
</template>

<script>
    import BaseCircleIcon from '../Base/base-circle-icon'
    import MessengerContentNav from './MessengerContentNav/messenger-content-nav'
    import MessengerContentSidebar from './MessengerContentSidebar/messenger-content-sidebar'
    import MessengerContentPersonalMessages from './MessengerContentPersonalMessages/messenger-content-personal-messages'
    export default {
        components: { BaseCircleIcon, MessengerContentNav, MessengerContentSidebar, MessengerContentPersonalMessages},
        props: {
            isDark: Boolean
        },
        setup(props) {
            return {
                isDark: props.isDark
            }
        }

    }
</script>

<style lang="scss" src="./messenger-content.scss"></style>