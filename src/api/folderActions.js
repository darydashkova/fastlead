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
    deleteFolder: (ids) => {
        let lData = {
            folder_ids: [...ids],
            csrf_token: localStorage.getItem('x-csrf')
        }
      return api.fetch('POST', 'delete/folder', lData)
    },
}