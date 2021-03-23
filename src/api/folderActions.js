import { api } from './api'

export default {
    getAllFolders: () => {
        return api.fetch('GET', 'get/folder/all')
    }
}