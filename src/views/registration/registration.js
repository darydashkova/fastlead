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
        const phone = ref('');
        const email = ref('');
        const checkbox = ref(true);

        const registr = () => {
            if (!login.value.length) {
                error.value = 'Введите логин';
                return;
            }
            if (!phone.value.length) {
                console.log(phone);
                error.value = 'Введите телефон';
                return;
            }
            if (!email.value.length) {
                error.value = 'Введите E-mail';
                return;
            }
            if (!checkbox.value) {
                error.value = 'Необходимо согласие на обработку персональных данных';
                return;
            }
            loading.value = true;
            error.value = '';
            tryRegistr({
                login: login.value,
                phone: phone.value,
                email: email.value,
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
            phone,
            email,
            checkbox,

            registr,
            onlyEngChars,
            loading,
            error
        }
    }
}