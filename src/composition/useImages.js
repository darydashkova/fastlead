import {reactive, computed} from 'vue';
import filesActions from "../api/filesActions";
import imagesActions from "../api/imagesActions";

const imagesToSend = reactive({
    data: [],
});

export function useImages() {
    const createImage = async (file) => {
        return await filesActions.addFile(file)
    }
    const deleteImage = (id) => {
        imagesToSend.data = imagesToSend.data.filter(item => item.id !== id);
    }
    const addImage = (file) => {
        imagesToSend.data.push(file);
    }
    const replaceImages = (array) => {
        imagesToSend.data = [...array]
    }

    const getImage = async (url) => {
        return await imagesActions.getImage(url)
    }

    return {
        createImage,
        imagesToSend: computed(() => imagesToSend.data),
        deleteImage,
        addImage,
        replaceImages,

        getImage,
    }
}