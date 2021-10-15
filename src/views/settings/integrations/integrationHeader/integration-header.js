import {ref} from 'vue';


export function integrationHeader() {
   
    const replaceVideo = (array) => {
        videosToSend.data = [...array]
    }
    return {
        replaceVideo,
    }
}