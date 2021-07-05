import {} from 'vue'
import {useDialogs} from "./useDialogs";
import {api} from "../api/api";
import {useMessages} from "./useMessages";
import {useFolder} from "./useFolder";

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

const audio = document.createElement('audio');
let ogg = document.createElement('source');
ogg.src = '/audio/notification.ogg';
ogg.type = '/audio/ogg; codecs=vorbis';
let mp3 = document.createElement('source');
mp3.src = '/audio/notification.mp3';
mp3.type = 'audio/mpeg';
audio.append(ogg);
audio.append(mp3);

// const dotenv = require('dotenv');
// dotenv.config();

// const url = `ws://${process.env.API_URL}:${process.env.SOCKET_PORT}`;
const socket = new WebSocket(`wss://api.fastlead.app:3000`)
// const socket = new WebSocket(url)


export function useSocket() {
    const { dialogs, setDialogs, selectedDialog } = useDialogs();
    const { addMessage } = useMessages()
    const { selectedFolder, getAllFolders, folders } = useFolder()

    socket.onopen = () => {
        socketSend('auth', {UserId: getCookie('UserId'), SessionKey: getCookie('SessionKey') })
    }
    function isOpen(ws) { return ws.readyState === ws.OPEN }
    const socketSend = (action, data) => {
        if (!isOpen(socket)) return;
        let command = {
            command: action,
        }
        socket.send(JSON.stringify({
            ...command,
            ...data,
        }))
    }

    socket.onmessage = (message) => {
        let mes = JSON.parse(message.data)
        if (mes.dialog_id) {
            if (!mes.last_message.is_me) {
                if (audio.paused) {
                    audio.play();
                } else {
                    audio.pause();
                    audio.currentTime = 0.0;
                    audio.play();
                }
            }


            if (selectedDialog.value === mes.dialog_id) {
                addMessage(mes.last_message);
                let locDialogs = [{...mes}, ...dialogs.value.filter(i => i.dialog_id !== mes.dialog_id)];
                setDialogs(locDialogs);
            } else {
                if (mes.folder_id === selectedFolder.value) {
                    let locDialogs = [{...mes}, ...dialogs.value.filter(i => i.dialog_id !== mes.dialog_id)];
                    setDialogs(locDialogs);
                } else {
                    setDialogs(dialogs.value.filter(i => i.dialog_id !== mes.dialog_id))
                    getAllFolders();
                }
            }
        }
    }
    return {
        socket,
        socketSend
    }
}