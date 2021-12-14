<template>
    <div class="messenger-content-header"> 
       <div class="messenger-content-header__title">Чаты</div>
<template v-if="foldersSlider&&foldersSlider.folders">

    <swiper class="messenger-content-header__slider" v-if="isSlider"
            :slides-per-view="4"
            :slides-per-group="1"
            :navigation="true"
            :scrollbar="{ draggable: true }"
            :space-between="20"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
            virtual>
        <swiper-slide v-for="(folder, index) in foldersSlider.folders" :virtualIndex="index" :key="index" class="pointer" @click="choseFolder(folder.folder_id)"
        >{{folder.name}}</swiper-slide>
        <swiper-slide class="pointer"
        >gfgrfhjhf</swiper-slide>
         <swiper-slide class="pointer"
        >gfgrfhjhf</swiper-slide>
         <swiper-slide class="pointer"
        >gfgrfhjhf</swiper-slide>
         <swiper-slide class="pointer"
        >gfgrfhjhf</swiper-slide>
         <swiper-slide class="pointer"
        >gfgrfhjhf</swiper-slide>
         <swiper-slide class="pointer"
        >gfgrfhjhf</swiper-slide>
    </swiper>   
    <div class="messenger-content-header__slider " v-else >
    <div  v-for="(folder, index) in foldersSlider.folders" :key="index" class="messenger-content-header__slider_no-slide"> {{folder.name}}</div>
    <div  class="messenger-content-header__slider_no-slide" v-for ='n in 10'>dcfdsdc</div>

    

        </div>
</template>

    </div>
</template>
<script>
    import  SwiperCore, { Virtual }  from "swiper";
    import {useFolder} from "../../../composition/useFolder";
    import { Navigation, Pagination, Scrollbar  } from 'swiper';
    import { Swiper, SwiperSlide } from "swiper/vue";
    import "swiper/swiper-bundle.css";
    import {onMounted, ref, watch} from "vue"
     import { useUserInfo } from "../../../composition/useUserInfo";
    import 'swiper/components/navigation';
    import {useDialogs} from "../../../composition/useDialogs";
    import {MessengerContentInput} from "../../../components/MessengerContent/MessengerContentNav/messenger-content-nav.js";
    import {useLoader} from "../../../composition/useLoader";
    
    SwiperCore.use([Virtual, Navigation]);
    export default {
        components: {
            Swiper,
            SwiperSlide,
            Navigation
        },
        setup() {
            const { selectedFolder, folders, getAllFoldersInFolder,  getAllFolders , selectFolder} = useFolder()
             const { getDialogs, selectedGroupDialogs, toggleAllSelectedGroupDialogs } = useDialogs()
             const { toggleOpenedUserInfo, openedUserInfo } = useUserInfo()
             const { getFolder, activeFolder } = MessengerContentInput()
            const { isLoadingDialogs } = useLoader()
            const onSlideChange = () => {
                console.log('click');
            }
            const isSlider = ref(false);
            const checkWidth =  () => {
            const widthSlider = document.querySelector('.messenger-content-header__slider') ;

            if(foldersSlider.value&&foldersSlider.value.folders&&widthSlider){
             if(widthSlider.clientWidth<widthSlider.scrollWidth){
                    isSlider.value = true;
               }    
            }
               
            }
            const foldersSlider = ref([]);
            const gerFoldersForSlider = () => {
                 foldersSlider.value = folders.value.find(i => i.folder_id==selectedFolder.value) ;
                 checkWidth()
            }
            
            const choseFolder = (id) => {
                if (selectedFolder.value !== id) {
                    selectFolder(id);
                    isLoadingDialogs.value = true;
                    getAllFoldersInFolder(id, true);
                    getDialogs(id)
                        .then(() => {
                            isLoadingDialogs.value = false;
                        })
                }
                toggleAllSelectedGroupDialogs(false);
                toggleOpenedUserInfo(false);
                getFolder(selectedFolder.value)
            }
            onMounted(()=>{
             }) 
             watch(()=>{
                gerFoldersForSlider();
             })
             return{
                modules: [Navigation, Pagination, Scrollbar],
                onSlideChange,
                checkWidth,
                isSlider,
                folders,
                selectedFolder,
                foldersSlider,
                gerFoldersForSlider,
                toggleOpenedUserInfo,
                choseFolder,
                toggleOpenedUserInfo,
                openedUserInfo,
                selectedGroupDialogs,
                getAllFolders,
            }
        },
    }
</script>
<style lang="scss" src="./messanger-content-header.scss"></style>