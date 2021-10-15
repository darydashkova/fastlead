import {reactive, computed} from 'vue';
import filesActions from "../api/filesActions";


const videosToSend = reactive({
    data: [],
});

export function useVideos() {
    const createVideo= async (file) => {
        return await filesActions.addFile(file)
    }
    const deleteVideo = (id) => {
        videosToSend.data = videosToSend.data.filter(item => item.id !== id);
    }
    const clearVideo = () => {
        videosToSend.data = [];
    }
    const addVideo = (file) => {
        videosToSend.data.push(file);
    }
    const replaceVideo = (array) => {
        videosToSend.data = [...array]
    }
    return {
        createVideo,
        videosToSend: computed(() => videosToSend.data),
        deleteVideo,
        addVideo,
        replaceVideo,
        clearVideo
    }
}