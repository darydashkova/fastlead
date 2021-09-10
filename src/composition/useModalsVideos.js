import { ref } from 'vue';
const openedModalSendVideos = ref(false);

export function useModalsVideos() {
    const statusVideo = ref(false);
    const toggleModalSendVideos = (value) => {
        openedModalSendVideos.value = value;
    }
    const videoPlayer = (d) => {
        console.log(d.currentTarget)
        const item = d.currentTarget.parentNode.getElementsByTagName('video')
        const svg = d.currentTarget.parentNode.getElementsByTagName('svg');
        if(!statusVideo.value){
            item[0].play();  
            statusVideo.value = true;
            svg[0].style.display = 'none';
        }
        else{
            item[0].pause();  
            statusVideo.value = false;
             svg[0].style.display = 'inherit';
        }
        return statusVideo
    }
    return {
        toggleModalSendVideos,
        openedModalSendVideos,
        videoPlayer
    }
}