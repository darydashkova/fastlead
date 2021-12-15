<template>
    <div class="messenger-content-header"> 
       <div class="messenger-content-header__title">Чаты</div>
    
<template v-if="foldersSlider&&foldersSlider.folders">
    <swiper class="messenger-content-header__slider" v-if="checkWidth"
            :slides-per-view="4"
            :slides-per-group="1"
            :navigation="true"
            :scrollbar="{ draggable: true }"
            :space-between="20"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
            virtual>
        <swiper-slide  class="pointer" @click="choseFolder(foldersSlider.folder_id)" v-if="mainDialogFolder" 
        ><div :class="{'messenger-content-header__slider-active green-color':(selectedFolder==foldersSlider.folder_id)}">{{foldersSlider.name}}</div></swiper-slide>
        <swiper-slide v-for="(folder, index) in foldersSlider.folders" :virtualIndex="index" :key="index" class="pointer" @click="choseFolder(folder.folder_id)"
        ><div  :class="{'messenger-content-header__slider-active green-color':(selectedFolder==folder.folder_id)}">{{folder.name}}</div></swiper-slide>
    </swiper>   
    <div class="messenger-content-header__slider " v-if="!checkWidth" >
          <div  class="pointer" @click="choseFolder(foldersSlider.folder_id)" v-if="mainDialogFolder"
        >{{foldersSlider.name}}</div>
    <div  v-for="(folder, index) in foldersSlider.folders" :key="index" class="messenger-content-header__slider_no-slide"> {{folder.name}}</div>
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
             const { getDialogs, selectedGroupDialogs, toggleAllSelectedGroupDialogs, dialogs } = useDialogs()
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
                        return true
                    }   
                    else{
                        return false
                    } 
                }
            }
            const foldersSlider = ref([]);

            const mainDialogFolder = ref(false);
            const gerFoldersForSlider = () => {
                const isParent = ref([])
                isParent.value=folders.value.find(i => i.folder_id==selectedFolder.value);
                if(isParent.value){
                    if (isParent.value.parent_folder_id!=null){
                        foldersSlider.value = folders.value.find(i => i.folder_id==isParent.value.parent_folder_id);
                    }
                    else{
                        foldersSlider.value = folders.value.find(i => i.folder_id==selectedFolder.value);
                    }
                }
                 if(dialogs.value){
                   mainDialogFolder.value = true;  
                 }
                 else{
                       mainDialogFolder.value = false;   
                 }
            }
            const choseFolder = (id) => {
                console.log(id)
                // if (selectedFolder.value !== id) {
                    selectFolder(id);
                    isLoadingDialogs.value = true;
                    getAllFoldersInFolder(id, true);
                    getDialogs(id)
                        .then((r) => {
                            isLoadingDialogs.value = false;
                            console.log(r)
                        })
                // }
                toggleAllSelectedGroupDialogs(false);
                toggleOpenedUserInfo(false);
                getFolder(selectedFolder.value)
            }
            onMounted(()=>{
                
             }) 
             const isSelectedNewFolder = ref(null);
             watch(()=>{
               
                 if(folders.value){  
                     if(selectedFolder.value&&(isSelectedNewFolder.value!=selectedFolder.value)){
                     isSelectedNewFolder.value=selectedFolder.value;
                     gerFoldersForSlider();
                 } 
                 }
                if(document.querySelector('.messenger-content-header__slider')&&foldersSlider.value){
                    checkWidth() 
                } 
                
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
                dialogs,
                isSelectedNewFolder,
                mainDialogFolder,
                
            }
        },
    }
</script>
<style lang="scss" src="./messanger-content-header.scss"></style>