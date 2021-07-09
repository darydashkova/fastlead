import UserInfoSettings from './UserInfoSettings/UserInfoSettings'

import {useUser} from "../../composition/useUser";
import {useUserInfo} from "../../composition/useUserInfo";
import {useImages} from "../../composition/useImages";
import {ref } from 'vue';

export default {
    components: { UserInfoSettings },
    setup() {
        const { user } = useUser();
        const { getImage } = useImages()

        const { toggleOpenedUserInfo } = useUserInfo()

        const src = ref(null);
        getImage(user.value.avatar)
            .then(r => {
                let url = URL.createObjectURL(r);
                src.value = `${url}`;
            })

        return {
            user,
            src,
            toggleOpenedUserInfo
        }
    }
}