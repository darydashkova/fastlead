
import {ref} from "vue";
import {useFolder} from "../../../composition/useFolder";

const activeFolder = ref();

export function MessengerContentInput() {

      const { selectedFolder } = useFolder()   
       const getFolder = (folder) => {
        activeFolder.value=folder;
       }
        return {
            selectedFolder,
            activeFolder,
            getFolder
        }
    
}