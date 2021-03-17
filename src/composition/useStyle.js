import {ref, computed} from 'vue'

export function useStyle() {
    const setStyle = (type = null) => {
        const common = {
            'green-color': 'linear-gradient(45.66deg, #00BF6D -40.44%, #98D730 120.07%)',
            'placeholder-color': '#B7B7BE',
            'folder-color': '#757589',
            'webkit-scroll-color': '#B7B7BE',
            'font-my-message-color': '#EDEDEF',
        }
        const dark = {
            ...common,
            'header-color': '#0F0F1B', //цвет фона и хедера --> var(--)
            'left-bar-color': '#1D1D35', //цвет панели с папками --> var(--left-bar-color)
            'main-color': '#1D1D35', //цвет фона с перепиской --> var(--main-color)
            'font-color': '#EDEDEF', //цвет шрифта(основной) --> var(--font-color)
            'messages-color': '#404054', //цвет чужого сообщения var(--messages-color)
            'search-input-color': '#757589', //цвет поисковой строки var(--search-input-color)
            'active-message-color': '#757589', //цвет выбранного диалога var(--active-message-color)
            'separator-color': '#404054', //цвет разделительной линии var(--separator-color)
            'active-folder-color': '#EDEDEF', //цвет активной директории var(--active-folder-color)
            'sub-text-color': '#B7B7BE', //цвет шрифта(вторичный) var(--sub-text-color)
        }
        const light = {
            ...common,
            'header-color': '#404054', //цвет фона и хедера --> var(--)
            'left-bar-color': '#C4C4C4', //цвет панели с папками --> var(--left-bar-color)
            'main-color': '#EDEDEF', //цвет фона с перепиской --> var(--main-color)
            'font-color': '#1D1D35', //цвет шрифта(основной) --> var(--font-color)
            'messages-color': '#FFFFFF', //цвет чужого сообщения var(--messages-color)
            'search-input-color': '#EDEDEF', //цвет поисковой строки var(--search-input-color)
            'active-message-color': '#EDEDEF', //цвет выбранного диалога var(--active-message-color)
            'separator-color': '#B7B7BE', //цвет разделительной линии var(--separator-color)
            'active-folder-color': '#1D1D35', //цвет активной директории var(--active-folder-color)
            'sub-text-color': '#757589', //цвет шрифта(вторичный) var(--sub-text-color)
        }

        let setProperties = (property) => {
            const body = document.body;
            for (let style in property) {
                body.style.setProperty(`--${style}`, property[style])
            }
        }
        type? setProperties(dark) : setProperties(light)
        localStorage.setItem('style', type)
    }

    return {
        setStyle,
    }
}