<template>
    <div class="authorization"></div>
</template>

<script>
    import {useRoute, useRouter} from 'vue-router'
    import {onMounted} from 'vue'
    import {useUser} from "../../composition/useUser";
    export default {
        setup() {
            const route = useRoute()
            const router = useRouter()
            const { getUser } = useUser()
            onMounted(() => {
                localStorage.setItem('token', route.params.token);
                getUser()
                    .then((r) => {
                        if (!r.error) {
                            router.push('/messenger');
                        }
                    })
            })
        }
    }
</script>