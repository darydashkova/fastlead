<template>
    <div class="settings-integrations__header">
            <div class="settings-integrations__header-name" >
                <!-- <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="settings-integrations__header-name-svg">
                <g clip-path="url(#clip0_189_16432)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.4444 4.00008H3.22222C3.07488 4.00008 2.93357 3.92984 2.82939 3.80482C2.7252 3.6798 2.66667 3.51022 2.66667 3.33341C2.66667 3.15661 2.7252 2.98703 2.82939 2.86201C2.93357 2.73699 3.07488 2.66675 3.22222 2.66675H15.4444C15.5918 2.66675 15.7331 2.73699 15.8373 2.86201C15.9415 2.98703 16 3.15661 16 3.33341C16 3.51022 15.9415 3.6798 15.8373 3.80482C15.7331 3.92984 15.5918 4.00008 15.4444 4.00008ZM6 7.11119H15.3333C15.5101 7.11119 15.6797 7.18143 15.8047 7.30645C15.9298 7.43148 16 7.60105 16 7.77786C16 7.95467 15.9298 8.12424 15.8047 8.24926C15.6797 8.37429 15.5101 8.44453 15.3333 8.44453H6C5.82319 8.44453 5.65362 8.37429 5.5286 8.24926C5.40357 8.12424 5.33333 7.95467 5.33333 7.77786C5.33333 7.60105 5.40357 7.43148 5.5286 7.30645C5.65362 7.18143 5.82319 7.11119 6 7.11119ZM15.4444 12.0001H3.22222C3.07488 12.0001 2.93357 12.0703 2.82939 12.1954C2.7252 12.3203 2.66667 12.4899 2.66667 12.6667C2.66667 12.8435 2.7252 13.0131 2.82939 13.1381C2.93357 13.2632 3.07488 13.3334 3.22222 13.3334H15.4444C15.5918 13.3334 15.7331 13.2632 15.8373 13.1381C15.9415 13.0131 16 12.8435 16 12.6667C16 12.4899 15.9415 12.3203 15.8373 12.1954C15.7331 12.0703 15.5918 12.0001 15.4444 12.0001ZM3.32892 8.50927L1.21394 10.4734C1.11445 10.5658 0.987674 10.6286 0.849681 10.6541C0.711683 10.6795 0.568658 10.6664 0.438701 10.6163C0.308744 10.5663 0.197695 10.4816 0.119603 10.3728C0.041513 10.2642 -0.000110252 10.1364 2.19329e-07 10.0058V5.99436C-0.000110252 5.8637 0.041513 5.73596 0.119603 5.62727C0.197695 5.51859 0.308744 5.43386 0.438701 5.3838C0.568658 5.33375 0.711683 5.32061 0.849681 5.34607C0.987674 5.37152 1.11445 5.43441 1.21394 5.52678L3.32892 7.49089C3.47406 7.62607 3.55556 7.80918 3.55556 8.00008C3.55556 8.19098 3.47406 8.37408 3.32892 8.50927Z" fill="#9797BB"/>
                </g>
                <defs>
                <clipPath id="clip0_189_16432">
                <rect width="16" height="16" fill="white"/>
                </clipPath>
                </defs>
                </svg> -->
                Интеграции 
            </div>
            <div class="settings-integrations__header-pages" > 
                <div class="settings-integrations__header-pages-link pointer" v-for="(link, index) in date.links" 
                :class="{'settings-integrations__header-pages-link_active': (dateNew[index][1]=='true')}"
                @click="activateLink(index)" :key="index"
                >
                     <router-link :to="link[2]"> {{link[0]}}</router-link>  
               
                    </div>
               
            </div>
            <!-- <BaseButton @click="closeForm" v-if="openedForm" class="base-button_cancel base-button_p6-40">Отмена</BaseButton> -->
            <!-- <BaseButton v-else class="base-button_cancel base-button_p6-40">Помощь с настройкой</BaseButton> -->

        </div>
</template>
<script>
  import { ref, reactive, onMounted } from "vue";
export default {
    props: {
        date:Object,
    },
    emits: ["pageOpen"],
    setup(props, {emit}) {
        const location = document.location.pathname;
        const dateNew = ref(props.date.links);
    const activeAmoCrmPage = ref(false);
        const activateLink = (link) => { 
            for(let i = 0; i<dateNew.value.length; i++){
               dateNew.value[i][1]='false'
            }
                dateNew.value[link][1]='true'
                emit('pageOpen', link)
        }

     
        return {
            activateLink,
            location,
            activeAmoCrmPage,
            dateNew
        }
    },
}
</script>
<style lang="scss" src="../integrations.scss"></style>