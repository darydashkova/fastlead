import { ref, computed } from 'vue';

const style = ref(null);


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
            'header-color': '#141427', //цвет фона и хедера --> var(--)
            'left-bar-color': '#1D1D35', //цвет панели с папками --> var(--left-bar-color)
            'main-color': '#1D1D35', //цвет фона с перепиской --> var(--main-color)
            'font-color': '#EDEDEF', //цвет шрифта(основной) --> var(--font-color)
            'messages-color': '#404054', //цвет чужого сообщения var(--messages-color)
            'search-input-color': '#757589', //цвет поисковой строки var(--search-input-color)
            'active-message-color': '#757589', //цвет выбранного диалога var(--active-message-color)
            'separator-color': '#404054', //цвет разделительной линии var(--separator-color)
            'active-folder-color': '#EDEDEF', //цвет активной директории var(--active-folder-color)
            'sub-text-color': '#B7B7BE', //цвет шрифта(вторичный) var(--sub-text-color),

            'context-background-color': '#2B2B41', //цвет бг контекстного меню

            'create-folder-color': '#1D1D35', //цвет модального окна создания папки var(--create-folder-color)
            'create-folder-font-color': '#EDEDEF', //цвет текста в модальном окне создания папки var(--create-folder-font--color)
            'create-folder-header-color': '#FFFFFF', //цвет заголовка в модальном окне создания папки var(--create-folder-font--color)
            'create-folder-border-color': '#757589', //цвет бордеров в модальном окне создания папки var(--create-folder-font--color)
            'create-folder-font-button': '#EDEDEF', //цвет текста в кнопке
            'button-cancel-color': '#4A4A5D', //цвет bg cancel кнопки

            'create-chat-border-color': '#404054', //цвет бордера и ховера папки
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

            'context-background-color': '#C3C3C3', //цвет бг контекстного меню

            'create-folder-color': '#FFFFFF', //цвет модального окна создания папки var(--create-folder-color)
            'create-folder-font-color': '#4A4A5D', //цвет текста в модальном окне создания папки var(--create-folder-font--color)
            'create-folder-header-color': '#000000', //цвет заголовка в модальном окне создания папки var(--create-folder-font--color)
            'create-folder-border-color': '#C4C4C4', //цвет бордеров в модальном окне создания папки var(--create-folder-font--color)
            'create-folder-font-button': '#F3F3F3', //цвет текста в кнопке
            'button-cancel-color': '#4A4A5D', //цвет bg cancel кнопки

            'create-chat-border-color': '#404054', //цвет бордера и ховера папки
            'modal-bg-color': '#1d1d35',



        }

        let setProperties = (property) => {
            const body = document.body;
            for (let style in property) {
                body.style.setProperty(`--${style}`, property[style])
            }
        }
        type? setProperties(dark) : setProperties(light)
        style.value = type;
        localStorage.setItem('style', type)
    }

    return {
        setStyle,
        style: computed(() => style.value),
    }
}