import { api } from './api'

export default {
    getAllFolders: () => {
        return api.fetch('GET', 'get/folder/all', null, true)
    },
    getAllFoldersInFolder: (id) => {
        return api.fetch('GET', `get/folder/all?parent_folder_id=${id}`, null, true)
    },
    createFolder: (data) => {
      let lData = {
          ...data,
          csrf_token: localStorage.getItem('x-csrf'),
      }
      return api.fetch('POST', 'create/folder', lData, true);
    },
    deleteFolder: (ids) => {
        let lData = {
            folder_ids: [...ids],
            csrf_token: localStorage.getItem('x-csrf')
        }
        return api.fetch('POST', 'delete/folder', lData, true)
    },
    updateFolder: (data) => {
        let lData = {
            ...data,
            csrf_token: localStorage.getItem('x-csrf')
        }
        return api.fetch('POST', 'update/folder/name', lData, true)
    }
}