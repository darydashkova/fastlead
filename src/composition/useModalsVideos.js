import { ref } from 'vue';
const openedModalSendVideos = ref(false);

export function useModalsVideos() {
    const statusVideo = ref(false);
    const statusSvg = ref(true);
    const toggleModalSendVideos = (value) => {
        openedModalSendVideos.value = value;
    }
    const videoPlayer = (d) => {
        if(!statusVideo.value){
           d.currentTarget.play();  
           statusSvg.value= false;
            statusVideo.value = true;
        }
        else{
            d.currentTarget.pause();  
            statusVideo.value = false;
            statusSvg.value= true;
        }
        return statusVideo, statusSvg
    }
    return {
        toggleModalSendVideos,
        openedModalSendVideos,
        videoPlayer,
        statusSvg
    }
}