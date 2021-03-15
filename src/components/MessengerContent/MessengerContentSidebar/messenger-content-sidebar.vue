<template>
    <div class="messenger-content-sidebar"
        :class="isDark? 'messenger-content-sidebar_dark' : 'messenger-content-sidebar_light'"
    >
        <BaseSearchInput
                :isDark="isDark"
        ></BaseSearchInput>
        <div class="messenger-content-sidebar__container">
            <BaseNavMessage
                v-for="i in 4"
                :key="i*1000"
                :isDark="isDark"
                :chatInfo="{
                    src: require('../../../assets/images/icon_inactive.png'),
                    name: 'Человек #'+i,
                    message: {
                        text: 'Как дела? =)',
                        date: '21:22',
                    },
                    status: i,
                    unreadableCount: '6',
                }"
                :isActive="i === 4"
            ></BaseNavMessage>
        </div>
    </div>
</template>
<script>
    import BaseSearchInput from '../../../components/Base/base-search-input'
    import BaseNavMessage from '../../../components/Base/base-nav-message'
    export default {
        components: { BaseSearchInput, BaseNavMessage },
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

<style lang="scss" src="./messenger-content-sidebar.scss"></style>