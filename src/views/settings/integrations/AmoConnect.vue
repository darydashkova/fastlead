<template>
    <div class="settings-integrations">
        <div class="settings-integrations__header">
            <div>
                Интеграции
            </div>
        </div>
        <teleport to="body">
            <FullScreenLoader></FullScreenLoader>
        </teleport>
    </div>
</template>

<script>
    import { useRouter, useRoute } from 'vue-router'
    import {useIntegrations} from "../../../composition/useIntegrations";
    import FullScreenLoader from "../../../components/FullScreenLoader";
    export default {
        components: {FullScreenLoader},
        setup() {
            const router = useRouter();
            const route = useRoute();
            const { connectAmocrmAfterLogin } = useIntegrations()
            connectAmocrmAfterLogin(route.query)
                .then(r => {
                    router.push('/settings/integrations')
                })
        }
    }
</script>

<style lang="scss" src="./integrations.scss"></style> 