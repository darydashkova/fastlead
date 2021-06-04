import accountActions from "../api/accountActions";
import imageActions from "../api/filesActions";

export function useAccount() {
    const changePass = async (password) => {
        return await accountActions.changePassword(password)
    }

    const changeAva = async (file) => {
        return await imageActions.addFile(file)
            .then( async(r) => {
                return await accountActions.changeAva(r.files[0])
            })
    }



    return {
        changePass,
        changeAva
    }
}