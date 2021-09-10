<template>

                <video :src="video.src" class="modal-send-videos__video" @click="videoPlayer">
                </video > 
                <div class="modal-send-videos__player" >
                    <svg v-if="statusSvg" :id="video.id + 'svg'"  class="modal-send-videos__video-container-play" width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16.5" cy="16.5" r="16.5" fill="#2E2E4E" fill-opacity="0.8"/>
                    <g clip-path="url(#clip0)">
                    <path d="M13.9242 8.91488C12.4934 8.09412 11.3333 8.7665 11.3333 10.4155V22.5842C11.3333 24.2348 12.4934 24.9063 13.9242 24.0864L24.5603 17.9866C25.9917 17.1656 25.9917 15.8354 24.5603 15.0145L13.9242 8.91488Z" fill="#EDEDEF"/>
                    </g>
                    <defs>
                    <clipPath id="clip0">
                    <rect width="15.871" height="15.871" fill="white" transform="translate(10.5481 8.56494)"/>
                    </clipPath>
                    </defs>
                </svg>
            </div>

</template>

<script>

import {useModalsVideos} from "../../composition/useModalsVideos";

export default {
    props: {
            video:{
                src : String,
            }
        },
    setup(props) {
        const {statusSvg, videoPlayer } = useModalsVideos();
        return{
        videoPlayer,
        statusSvg
        }
    },
}
</script>
