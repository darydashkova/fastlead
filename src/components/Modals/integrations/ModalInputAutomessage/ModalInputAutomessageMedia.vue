<template>
 <div v-if="updateMedia&&updateMedia.hasOwnProperty('is_read')&&!files">
 <div   class="modal-input-automessage__message-data-elem" :class="{'modal-input-automessage__message-data-elem_background': updateMedia.type.startsWith('video')}"> 
                        <div  v-if="updateMedia.type.startsWith('im')" :style="{
                        'background': `url(${backgr}) no-repeat`,
                        'background-size': 'cover',
                        'background-position': 'center',
                        }"  class="modal-input-automessage__message-data-img"  ></div>
                        <div v-else-if="updateMedia.type.startsWith('video')" >
                           <svg v-if="!isPlay" class="modal-input-automessage__message-data-video-play" width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="16.5" cy="16.5" r="16.5" fill="#2E2E4E" fill-opacity="0.8"/>
                            <g clip-path="url(#clip0_2003:3141)">
                            <path d="M13.9243 8.91488C12.4934 8.09412 11.3334 8.7665 11.3334 10.4155V22.5842C11.3334 24.2348 12.4934 24.9063 13.9243 24.0864L24.5604 17.9866C25.9917 17.1656 25.9917 15.8354 24.5604 15.0145L13.9243 8.91488Z" fill="#EDEDEF"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_2003:3141">
                            <rect width="15.871" height="15.871" fill="white" transform="translate(10.5481 8.56494)"/>
                            </clipPath>
                            </defs>
                            </svg>
                            <video  class="modal-input-automessage__message-data-video"  @click="playVideo">
                                <source :src="backgr" >
                            </video>
                        </div>
                            <div v-else class="modal-input-automessage__message-data-docs">
                                <div class="modal-input-automessage__message-data-docs-circle">
                                    <svg class="modal-input-automessage__message-data-docs-circle-img" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.4998 6.66662H17.9498C17.6589 5.89568 17.2069 5.19568 16.624 4.6133L13.7207 1.7083C13.1376 1.12607 12.4374 0.674395 11.6665 0.383301V5.8333C11.6665 6.2935 12.0396 6.66662 12.4998 6.66662Z" fill="#F0F0FA"/>
                                    <path d="M18.3131 8.33332H12.4998C11.1191 8.33332 9.99982 7.21402 9.99982 5.83332V0.02C9.86564 0.0108203 9.7315 0 9.59564 0H5.83314C3.53311 0.00277344 1.66924 1.86664 1.6665 4.16668V15.8334C1.66924 18.1334 3.53311 19.9973 5.83314 20H14.1665C16.4665 19.9973 18.3304 18.1334 18.3331 15.8333V8.7375C18.3331 8.60168 18.3223 8.4675 18.3131 8.33332Z" fill="#F0F0FA"/>
                                    </svg>
                                </div>
                                {{updateMedia.file_name}}
                            </div>
                    </div> 
                </div> 

 <div v-else>
    <div  v-for="(file, index) in files" :key="index" class="modal-input-automessage__message-data-elem" :class="{'modal-input-automessage__message-data-elem_background': file[0].type.startsWith('video')}"> 
                        <div  v-if="file[0].type.startsWith('image')" :style="{
                        'background': `url(${file[1]}) no-repeat`,
                        'background-size': 'cover',
                        'background-position': 'center',
                        }"  class="modal-input-automessage__message-data-img"  ></div>
                        <template v-else-if="file[0].type.startsWith('video')" >
                           <svg v-if="!isPlay"  width="33"  class="modal-input-automessage__message-data-video-play" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="16.5" cy="16.5" r="16.5" fill="#2E2E4E" fill-opacity="0.8"/>
                            <g clip-path="url(#clip0_2003:3141)">
                            <path d="M13.9243 8.91488C12.4934 8.09412 11.3334 8.7665 11.3334 10.4155V22.5842C11.3334 24.2348 12.4934 24.9063 13.9243 24.0864L24.5604 17.9866C25.9917 17.1656 25.9917 15.8354 24.5604 15.0145L13.9243 8.91488Z" fill="#EDEDEF"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_2003:3141">
                            <rect width="15.871" height="15.871" fill="white" transform="translate(10.5481 8.56494)"/>
                            </clipPath>
                            </defs>
                            </svg>
                            <video   @click="playVideo" class="modal-input-automessage__message-data-video">
                                <source :src="file[1]">
                            </video>
                        </template>
                           
                            <div v-else class="modal-input-automessage__message-data-docs">
                                <div class="modal-input-automessage__message-data-docs-circle">
                                    <svg class="modal-input-automessage__message-data-docs-circle-img" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.4998 6.66662H17.9498C17.6589 5.89568 17.2069 5.19568 16.624 4.6133L13.7207 1.7083C13.1376 1.12607 12.4374 0.674395 11.6665 0.383301V5.8333C11.6665 6.2935 12.0396 6.66662 12.4998 6.66662Z" fill="#F0F0FA"/>
                                    <path d="M18.3131 8.33332H12.4998C11.1191 8.33332 9.99982 7.21402 9.99982 5.83332V0.02C9.86564 0.0108203 9.7315 0 9.59564 0H5.83314C3.53311 0.00277344 1.66924 1.86664 1.6665 4.16668V15.8334C1.66924 18.1334 3.53311 19.9973 5.83314 20H14.1665C16.4665 19.9973 18.3304 18.1334 18.3331 15.8333V8.7375C18.3331 8.60168 18.3223 8.4675 18.3131 8.33332Z" fill="#F0F0FA"/>
                                    </svg>
                                    
                                </div>
                                {{file[0].name}}
                            </div>
                    </div>
</div>    
</template>              


<script>
import {useImages} from "../../../../composition/useImages";
import {  reactive, ref, watch } from 'vue'
export default {
    props: {
        files: Object,
        updateMedia:Object,
    },
    setup(props) {
        const backgr = ref();
        const isPlay = ref(false);
        const {getImage}= useImages();
        watch(()=>{
            if(props.updateMedia){
                if(props.updateMedia.type=='img'){
                 getImage(props.updateMedia.img)  
                  .then(r => { 
                    let url = URL.createObjectURL(r);
                    backgr.value = `${url}`;
            }) 
                }
                if(props.updateMedia.type=='video'){
                 getImage(props.updateMedia.video)   
                  .then(r => { 
                    let url = URL.createObjectURL(r);
                    backgr.value = `${url}`;
            })
                }
              
            }
        })
        const playVideo = (e) => {
            isPlay.value = !isPlay.value
            if( isPlay.value){
                e.target.play()
            }
            else{
                 e.target.pause();
            }
           
        }
        return {
            backgr,
            playVideo,
            isPlay
        }
    },
}
</script>
<style lang="scss">
.modal-input-automessage__message-data-elem_background{
    position:relative;
    .modal-input-automessage__message-data-video-play{
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        left: 50%;
    }
}

</style>