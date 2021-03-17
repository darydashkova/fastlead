<template>
    <div class="messenger-content-nav"
    >
        <div class="messenger-content-nav__ava-container">
            <BaseCircleIcon
                    :src="require('@/assets/images/icon_inactive.png')"
                    :isActive="true"
            ></BaseCircleIcon>
        </div>
        <hr class="separator"
        />
        <div class="messenger-content-nav__folder-container">
            <BaseFolder
                    v-for="i in 5"
                    :key="i"

                    :class="i !== 5? 'base-folder_margin-bottom' : ''"
                    :isActive="i < 2"
            >
                Папка {{i}}
            </BaseFolder>
        </div>


    </div>
</template>

<script>
    import BaseCircleIcon from "../../Base/BaseCircleIcon";
    import BaseFolder from "../../Base/BaseFolder";
    export default {
        components: {BaseCircleIcon, BaseFolder},
    }
</script>

<style lang="scss" src="./messenger-content-nav.scss"></style>