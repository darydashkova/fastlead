import { useAuth } from "../../composition/useAuth";

import { useRouter } from 'vue-router'
import { ref } from 'vue';

export default {
    setup() {
        const { tryRegistr } = useAuth()
        const router = useRouter()

        const loading = ref(false);
        const error = ref('');

        const login = ref('');
        const password = ref('');
        const passwordConfirm = ref('');

        const registr = () => {
            if (!login.value.length) {
                error.value = 'Введите логин';
                return;
            }
            if (!password.value.length) {
                error.value = 'Введите пароль';
                return;
            }
            if (password.value !== passwordConfirm.value) {
                error.value = 'Пароли не совпадают';
                return;
            }
            loading.value = true;
            error.value = '';
            tryRegistr({
                login: login.value,
                password: password.value,
            })
                .then(r => {
                    if (r.error) {
                        error.value = r.error;
                    } else {
                        router.push('/login')
                    }
                    loading.value = false;
                })
        }

        const onlyEngChars = ($event) => {
            let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
            if (keyCode < 48 || (keyCode > 57 && keyCode < 65) || keyCode > 122 || (keyCode > 90 && keyCode < 97)) { // 46 is dot
                $event.preventDefault();
            }
        }
        return {
            login,
            password,
            passwordConfirm,

            registr,
            onlyEngChars,
            loading,
            error
        }
    }
}