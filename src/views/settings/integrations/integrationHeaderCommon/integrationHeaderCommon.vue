<template>
    <div class="settings-integrations__header">
            <div class="settings-integrations__header-name" >
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