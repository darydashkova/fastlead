<template>
    <div class="messenger-content-nav"
        :class="isDark? 'messenger-content-nav_dark' : 'messenger-content-nav_light'"
    >
        <div class="messenger-content-nav__ava-container">
            <BaseCircleIcon
                    :isDark="isDark"
                    :src="require('@/assets/images/icon_inactive.png')"
                    :isActive="true"
            ></BaseCircleIcon>
        </div>
        <hr class="separator"
            :class="isDark? 'separator_dark' : 'separator_light'"
        />
        <div class="messenger-content-nav__folder-container">
            <BaseFolder
                    v-for="i in 5"
                    :key="i"

                    :class="i !== 5? 'base-folder_margin-bottom' : ''"
                    :isActive="i < 2"
                    :isDark="isDark"
            >
                Папка {{i}}
            </BaseFolder>
        </div>


    </div>
</template>

<script>
    import BaseCircleIcon from "../../Base/base-circle-icon";
    import BaseFolder from "../../Base/base-folder";
    export default {
        components: {BaseCircleIcon, BaseFolder},
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

<style lang="scss" src="./messenger-content-nav.scss"></style>