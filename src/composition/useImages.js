import {reactive, computed} from 'vue';
import imageActions from "../api/imageActions";

const imagesToSend = reactive({
    data: [],
});

export function useImages() {
    const createImage = async (file) => {
        return await imageActions.addFile(file)
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

    return {
        createImage,
        imagesToSend: computed(() => imagesToSend.data),
        deleteImage,
        addImage,
        replaceImages,
    }
}