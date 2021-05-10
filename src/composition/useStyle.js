import { ref, computed } from 'vue';

const style = ref(null);


export function useStyle() {
    const setStyle = (type = null) => {
        const common = {
            'green-color': 'linear-gradient(45.66deg, #00BF6D -40.44%, #98D730 120.07%)',
            'red-color': '#EB5757',
            'yellow-color': '#F2C94C',
            'placeholder-color': '#B7B7BE',
            'folder-color': '#757589',
            'webkit-scroll-color': '#B7B7BE',
            'font-my-message-color': '#EDEDEF',

        }
        const dark = {
            ...common,
            'header-color': '#141427', //цвет фона и хедера --> var(--)
            'footer-color': '#141427',

            'left-bar-color': '#1D1D35', //цвет панели с папками --> var(--left-bar-color)
            'main-color': '#1D1D35', //цвет фона с перепиской --> var(--main-color)
            'font-color': '#EDEDEF', //цвет шрифта(основной) --> var(--font-color)
            'messages-color': '#404054', //цвет чужого сообщения var(--messages-color)
            'search-input-color': '#757589', //цвет поисковой строки var(--search-input-color)
            'active-message-color': '#757589', //цвет выбранного диалога var(--active-message-color)
            'separator-color': '#404054', //цвет разделительной линии var(--separator-color)
            'active-folder-color': '#EDEDEF', //цвет активной директории var(--active-folder-color)
            'sub-text-color': '#B7B7BE', //цвет шрифта(вторичный) var(--sub-text-color),
            'date-in-message-color': '#EDEDEF', //цвет текста в отображении даты

            'message-action-icon-color': '#B7B7BE', //цвет иконок
            'folder-create-button-color': '#404054', //цвет создания папки и текста
            'folder-create-plus-color': '#1D1D35', //цвет линий плюсика в svg
            'stripe-instead-ava': '#FFFFFF', //цвет полосок вместо авы

            'user-name-color': '#FFFFFF', //имя профиля в левой панели

            'svg-settings-fill': '#F9F5F3', //цвет SVG в настройках профиля

            'context-background-color': '#2B2B41', //цвет бг контекстного меню

            'create-folder-color': '#1D1D35', //цвет модального окна создания папки var(--create-folder-color)
            'create-folder-font-color': '#EDEDEF', //цвет текста в модальном окне создания папки var(--create-folder-font--color)
            'create-folder-header-color': '#FFFFFF', //цвет заголовка в модальном окне создания папки var(--create-folder-font--color)
            'create-folder-border-color': '#757589', //цвет бордеров в модальном окне создания папки var(--create-folder-font--color)
            'create-folder-font-button': '#EDEDEF', //цвет текста в кнопке

            'cancel-button-color-in-modals': '#4A4A5D', //цвет "Отмены" во всех модалках

            'button-cancel-color': '#4A4A5D', //цвет bg cancel кнопки

            'hover-svg-fill': '#EDEDEF', //цвет ховера fill в модалках
            'default-svg-fill': '#757589',

            'create-chat-border-color': '#404054', //цвет бордера и ховера папки

            'calendar-bg': '#0F0F1B', //цвет календаря

            'ranged-buttons-color': '#404054',


            'settings-nav-color': '#404054', //цвет nav'а в настройках
            'settings-main-color': '#1D1D35',
            'settings-nav-border-color': '#757589',
            'settings-active-link-color': '#757589',

            'mailings-cancel-button-color': '#4A4A5D',

            'settings-dropdown-font-color': '#B7B7BE', //цвет текста в выпадающих менюшках
            'settings-active-font-color': '#EDEDEF',
            'settings-active-background-color': '#757589',
            'settings-dropdown-border-color': '#404054',

            'settings-recipients-active-font-color': '#EDEDEF',

            'calendar-border-color': '#1D1D35',
            'calendar-font-color': '#B7B7BE',
            'calendar-active-font-color': '#FFFFFF',

            'settings-whatsapp-color': '#141427', //цвет ватсаппа
            'settings-whatsapp-name-color': '#B7B7BE', //цвет названия ватсаппа

            'settings-whatsapp-del-icon-fill': '#EB5757',
            'settings-whatsapp-default-icon-fill': '#B7B7BE',
            'settings-whatsapp-del-icon-bg': '#1D1D35',

            'settings-autoresponders-actions-dropdown-font-color': '#B7B7BE',
            'settings-autoresponders-actions-input-bg-color': '#141427',

            'base-checkbox-group-font-color': '#757589',


            'empty-photo-bg': 'rgba(29, 29, 53, 0.88)',
        }
        const light = {
            ...common,
            'header-color': '#757589', //цвет фона и хедера --> var(--)
            'footer-color': '#B7B7BE',

            'left-bar-color': '#EDEDEF', //цвет панели с папками --> var(--left-bar-color)
            'main-color': '#EDEDEF', //цвет фона с перепиской --> var(--main-color)
            'font-color': '#1D1D35', //цвет шрифта(основной) --> var(--font-color)
            'messages-color': '#FFFFFF', //цвет чужого сообщения var(--messages-color)
            'search-input-color': '#EDEDEF', //цвет поисковой строки var(--search-input-color)
            'active-message-color': '#EDEDEF', //цвет выбранного диалога var(--active-message-color)
            'separator-color': '#B7B7BE', //цвет разделительной линии var(--separator-color)
            'active-folder-color': '#1D1D35', //цвет активной директории var(--active-folder-color)
            'sub-text-color': '#757589', //цвет шрифта(вторичный) var(--sub-text-color)
            'date-in-message-color': '#1D1D35', //цвет текста в отображении даты

            'message-action-icon-color': '#FFFFFF', //цвет иконок
            'folder-create-button-color': '#FFFFFF', //цвет создания папки и текста
            'folder-create-plus-color': '#B7B7BE', //цвет линий плюсика в svg
            'stripe-instead-ava': '#757589', //цвет полосок вместо авы

            'user-name-color': '#404054', //имя профиля в левой панели

            'svg-settings-fill': '#B7B7BE', //цвет SVG в настройках профиля

            'context-background-color': '#C3C3C3', //цвет бг контекстного меню

            'create-folder-color': '#FFFFFF', //цвет модального окна создания папки var(--create-folder-color)
            'create-folder-font-color': '#404054', //цвет текста в модальном окне создания папки var(--create-folder-font--color)
            'create-folder-header-color': '#000000', //цвет заголовка в модальном окне создания папки var(--create-folder-font--color)
            'create-folder-border-color': '#757589', //цвет бордеров в модальном окне создания папки var(--create-folder-font--color)
            'create-folder-font-button': '#F3F3F3', //цвет текста в кнопке

            'cancel-button-color-in-modals': '#757589', //цвет "Отмены" во всех модалках

            'button-cancel-color': '#EDEDEF', //цвет bg cancel кнопки

            'hover-svg-fill': '#757589', //цвет ховера fill в модалках
            'default-svg-fill': '#B7B7BE',

            'create-chat-border-color': '#EDEDEF', //цвет бордера и ховера папки

            'calendar-bg': '#EDEDEF', //цвет календаря

            'ranged-buttons-color': '#B7B7BE',

            'settings-nav-color': '#EDEDEF', //цвет nav'а в настройках192
            'settings-main-color': '#FFFFFF', //цвет контейнера в настройках
            'settings-nav-border-color': '#FFFFFF',
            'settings-active-link-color': '#FFFFFF',

            'mailings-cancel-button-color': '#B7B7BE',

            'settings-dropdown-font-color': '#757589',
            'settings-active-font-color': '#FFFFFF',
            'settings-active-background-color': '#B7B7BE',
            'settings-dropdown-border-color': '#B7B7BE',

            'settings-recipients-active-font-color': '#404054',

            'calendar-border-color': '#B7B7BE',
            'calendar-font-color': '#7D7D90',
            'calendar-active-font-color': '#404054',

            'settings-whatsapp-color': '#EDEDEF', //цвет ватсаппа
            'settings-whatsapp-name-color': '#404054',

            'settings-whatsapp-del-icon-fill': '#FFFFFF',
            'settings-whatsapp-default-icon-fill': '#FFFFFF',
            'settings-whatsapp-del-icon-bg': '#EB5757',

            'settings-autoresponders-actions-dropdown-font-color': '#EDEDEF',
            'settings-autoresponders-actions-input-bg-color': '#FFFFFF',

            'base-checkbox-group-font-color': '#404054',

            'empty-photo-bg': 'rgba(64, 64, 84, 0.56)',
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
