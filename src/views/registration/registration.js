import { useAuth } from "../../composition/useAuth";

import { useRouter } from 'vue-router'
import { ref } from 'vue';

export default {
    setup() {
        const { tryRegistr } = useAuth()
        const router = useRouter()

        const loading = ref(false);
        const error = ref('');

        const name = ref('');
        const phone = ref('');
        const email = ref('');
        const checkbox = ref(true);

        const registr = () => {
            if (!name.value.length) {
                error.value = 'Введите имя';
                return;
            }
            if (!phone.value.length) {
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
                name: name.value,
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

        const onlyRusChars = ($event) => {
            const regex = new RegExp("^[а-яёА-ЯЁ]+$");
            const key = String.fromCharCode(!$event.charCode ? $event.which : $event.charCode);
            if (!regex.test(key)) {
                $event.preventDefault();
                return false;
            }
        }
        return {
            name,
            phone,
            email,
            checkbox,

            registr,
            onlyRusChars,
            loading,
            error
        }
    }
}