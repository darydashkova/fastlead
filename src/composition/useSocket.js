import {} from 'vue'
import {useDialogs} from "./useDialogs";
import {api} from "../api/api";
import {useMessages} from "./useMessages";
import {useFolder} from "./useFolder";

const audio = document.createElement('audio');
let ogg = document.createElement('source');
ogg.src = '/audio/notification.ogg';
ogg.type = '/audio/ogg; codecs=vorbis';
let mp3 = document.createElement('source');
mp3.src = '/audio/notification.mp3';
mp3.type = 'audio/mpeg';
audio.append(ogg);
audio.append(mp3);



let socket = new WebSocket(`${process.env.VUE_APP_SOCKET_URL}?token=${localStorage.getItem('token')}`)

export function useSocket() {
    const { dialogs, setDialogs, selectedDialog } = useDialogs();
    const { addMessage } = useMessages()
    const { selectedFolder, getAllFolders, folders } = useFolder();
    const socketInit = () => {
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

    const refreshSocket = () => {
        if (!isOpen(socket)) {
            socket = new WebSocket(`${process.env.VUE_APP_SOCKET_URL}?token=${localStorage.getItem('token')}`)
        }
        socketInit();
    }


    return {
        socket,
        socketSend,
        socketInit,

        refreshSocket,
    }
}