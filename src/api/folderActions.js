import { api } from './api'

export default {
    getAllFolders: () => {
        return api.fetch('GET', 'get/folder/all')
    },
    createFolder: (data) => {
      let lData = {
          ...data,
          csrf_token: localStorage.getItem('x-csrf'),
      }
      return api.fetch('POST', 'create/folder', lData);
    },
    deleteFolder: (id) => {
        let lData = {
            folder_id: id,
            csrf_token: localStorage.getItem('x-csrf')
        }
      return api.fetch('POST', 'delete/folder', lData)
    },
}