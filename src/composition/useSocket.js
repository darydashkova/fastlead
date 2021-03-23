import {} from 'vue'
import {useDialogs} from "./useDialogs";
import {api} from "../api/api";

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}


export function useSocket() {
    const { dialogs, setDialogs } = useDialogs();

    const socket = api.connectSocket();
    socket.onopen = () => {
        let cookie = {};
        cookie.UserId = getCookie('UserId');
        cookie.SessionKey = getCookie('SessionKey');
        socket.send(cookie)
    }

    const sendMessage = () => {
        
    }

}