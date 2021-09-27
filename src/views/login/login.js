import { useAuth } from "../../composition/useAuth";

import { useRouter } from 'vue-router'
import { ref } from 'vue';

export default {
    setup() {
        const { tryAuth, getCsrf } = useAuth()
        const router = useRouter();

        const loading = ref(false);
        const error = ref('');
        getCsrf();
        const login = ref('');
        const password = ref('');
        const onlyEngChars = ($event) => {
            let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
            if (keyCode < 48 || (keyCode > 57 && keyCode < 65) || keyCode > 122 || (keyCode > 90 && keyCode < 97)) { // 46 is dot
                $event.preventDefault();
            }
        }

        const auth = () => {
            
            if (!login.value.length) {
                error.value = 'Введите логин';
                return;
            }
            if (!password.value.length) {
                error.value = 'Введите пароль';
                return;
            }

            loading.value = true;
            error.value = '';
            tryAuth({
                login: login.value,
                password: password.value,
            })
                .then(r => {
                    if (r.error) {
                        error.value = r.error;
                    } else {
                        localStorage.setItem('token', r.token);
                        router.push('/messenger')
                    }
                    loading.value = false;

                })
        }


        return {
            login,
            password,
            auth,
            onlyEngChars,
            getCsrf,
            loading,
            error
        }
    }
}