<template>
    <div class="messenger"
         :class="isDark.value? 'messenger_dark' : 'messenger_light'"
    >
        <MessengerContent
                :isDark="isDark.value"
        ></MessengerContent>
    </div>
</template>

<script>
    import MessengerContent from "../../components/MessengerContent/messenger-content";
    import {useStyle} from "../../composition/useStyle";
    export default {
        components: {MessengerContent},
        setup() {
            let {isDark} = useStyle()
            return {
                isDark
            }
        }
    }
</script>
<style lang="scss" src="./messenger.scss"></style>
