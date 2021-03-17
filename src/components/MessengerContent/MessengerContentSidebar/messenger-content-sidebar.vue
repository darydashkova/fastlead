<template>
    <div class="messenger-content-sidebar"
    >
        <BaseSearchInput
        ></BaseSearchInput>
            <div class="messenger-content-sidebar__container">
                    <BaseNavMessage
                        v-for="i in 20"
                        :key="i*1000"
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
    import BaseSearchInput from '../../Base/BaseSearchInput'
    import BaseNavMessage from '../../Base/BaseNavMessage'
    export default {
        components: { BaseSearchInput, BaseNavMessage },
    }
</script>

<style lang="scss" src="./messenger-content-sidebar.scss"></style>