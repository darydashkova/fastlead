import { ref, computed } from 'vue';

const style = ref(null);


export function useStyle() {
    const setStyle = (type = null) => {
        const common = {
            'green-color': 'linear-gradient(45.66deg, #22A595 -40.44%, #84D160 120.07%)',
            'search-input-placeholder-color': '#9797BB',

            'red-color': '#EB5757',
            'yellow-color': '#F2C94C',

            'folder-color': '#757589',
            'webkit-scroll-color': '#B7B7BE',
            'font-my-message-color': '#EDEDEF',


        }
        const dark = {
            ...common,
            'left-bar-color': '#141427', //цвет панели с папками --> var(--left-bar-color)
            'default-svg-fill': '#575773',
            'hover-svg-fill': '#FBFBFE',
            'hover-folder-bg': '#1D1D35',
            'messenger-middle-bar-bg': '#414159',
            'separator-color': '#2E2E4E', //цвет разделительной линии var(--separator-color)
            'user-info-settings-header-bg': '#2E2E4E',
            'user-info-settings-hover-svg-fill': '#F0F0FA',
            'user-info-settings-default-svg-fill': '#9797BB',
            'user-info-settings-default-setting-name': '#F0F0FA',
            'user-info-settings-hover-setting-bg': '#575773',
            'foreign-messages-font-color': '#F0F0FA', //цвет чужого сообщения var(--messages-color)
            'messenger-search-input-bg': '#575773',

            'messages-input-wrapper-bg': '#141427',

            'font-color': '#F0F0FA', //цвет шрифта(основной) --> var(--font-color)
            'sub-text-font-color': '#575773',
            'main-color': '#1D1D35', //цвет фона с перепиской --> var(--main-color)
            'messages-color': '#414159', //цвет чужого сообщения var(--messages-color)
            'context-background-color': '#2E2E4E', //цвет бг контекстного меню
            'placeholder-color': '#575773',

            'modal-bg-color': '#1D1D35',
            'modal-element-hover-bg-color': '#2E2E4E',
            'modal-font-color': '#FBFBFE', //цвет текста в модальном окне создания папки var(--create-folder-font--color)
            'modal-sub-font-color': '#9797BB', //цвет текста в модальном окне создания папки var(--create-folder-font--color)
            'modal-base-text-default-color': '#EDEDEF',
            'modal-hint-font-color': '#575773',
            'modal-button-cancel-color': '#414159', //цвет "Отмены" во всех модалках
            'modal-input-border-color': '#414159',
            'modal-send-images-name-color': '#F0F0FA',
            'modal-element-borders-color': '#2E2E4E',


            'button-cancel-color': '#2E2E4E', //цвет bg cancel кнопки
            'settings-nav-color': '#141427', //цвет nav'а в настройках

            'settings-left-bar-hover': '#1D1D35',
            'settings-main-color': '#1D1D35',
            'settings-header-color': '#F0F0FA',
            'settings-whatsapp-color': '#141427', //цвет ватсаппа
            'settings-whatsapp-name-color': '#F0F0FA', //цвет названия ватсаппа
            'settings-whatsapp-sub-color': '#9797BB',

            'settings-whatsapp-del-icon-fill': '#EB5757',
            'settings-whatsapp-default-icon-fill': '#B7B7BE',
            'settings-whatsapp-del-icon-bg': '#1D1D35',
            'ranged-buttons-color': '#141427',
            'calendar-bg': '#0F0F1B', //цвет календаря










            'header-color': '#141427', //цвет фона и хедера --> var(--)

            'search-input-color': '#757589', //цвет поисковой строки var(--search-input-color)
            'active-message-color': '#757589', //цвет выбранного диалога var(--active-message-color)
            'active-folder-color': '#EDEDEF', //цвет активной директории var(--active-folder-color)
            'sub-text-color': '#B7B7BE', //цвет шрифта(вторичный) var(--sub-text-color),
            'date-in-message-color': '#EDEDEF', //цвет текста в отображении даты

            'message-action-icon-color': '#B7B7BE', //цвет иконок
            'folder-create-button-color': '#404054', //цвет создания папки и текста
            'folder-create-plus-color': '#1D1D35', //цвет линий плюсика в svg
            'stripe-instead-ava': '#FFFFFF', //цвет полосок вместо авы

            'user-name-color': '#FFFFFF', //имя профиля в левой панели

            'svg-settings-fill': '#F9F5F3', //цвет SVG в настройках профиля


            'create-folder-color': '#1D1D35', //цвет модального окна создания папки var(--create-folder-color)
            'create-folder-font-color': '#EDEDEF', //цвет текста в модальном окне создания папки var(--create-folder-font--color)
            'create-folder-header-color': '#FFFFFF', //цвет заголовка в модальном окне создания папки var(--create-folder-font--color)
            'create-folder-border-color': '#757589', //цвет бордеров в модальном окне создания папки var(--create-folder-font--color)
            'create-folder-font-button': '#EDEDEF', //цвет текста в кнопке

            'cancel-button-color-in-modals': '#4A4A5D', //цвет "Отмены" во всех модалках

            'create-chat-border-color': '#404054', //цвет бордера и ховера папки




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



            'settings-autoresponders-actions-dropdown-font-color': '#B7B7BE',
            'settings-autoresponders-actions-input-bg-color': '#141427',

            'base-checkbox-group-font-color': '#757589',


            'empty-photo-bg': 'rgba(29, 29, 53, 0.88)',
        }
        const light = {
            ...common,
            'left-bar-color': '#DEDEEE', //цвет панели с папками --> var(--left-bar-color)
            'default-svg-fill': '#9797BB', //дефолтный fill всех свг
            'hover-svg-fill': '#575773',
            'hover-folder-bg': '#F0F0FA',
            'messenger-middle-bar-bg': '#FBFBFE',
            'separator-color': '#DEDEEE', //цвет разделительной линии var(--separator-color)
            'user-info-settings-header-bg': '#DEDEEE',
            'user-info-settings-hover-svg-fill': '#575773',
            'user-info-settings-default-svg-fill': '#9797BB',
            'user-info-settings-default-setting-name': '#9797BB',
            'user-info-settings-hover-setting-bg': '#F0F0FA',
            'foreign-messages-font-color': '#575773', //цвет чужого сообщения var(--messages-color)
            'messenger-search-input-bg': '#F0F0FA',

            'messages-input-wrapper-bg': '#DEDEEE',

            'font-color': '#575773', //цвет шрифта(основной) --> var(--font-color)
            'sub-text-font-color': '#9797BB',
            'main-color': '#F0F0FA', //цвет фона с перепиской --> var(--main-color)
            'messages-color': '#FBFBFE', //цвет чужого сообщения var(--messages-color)
            'context-background-color': '#DEDEEE', //цвет бг контекстного меню
            'placeholder-color': '#9797BB',

            'modal-bg-color': '#F0F0FA',
            'modal-element-hover-bg-color': '#FBFBFE',
            'modal-font-color': '#575773', //цвет текста в модальном окне создания папки var(--create-folder-font--color)
            'modal-sub-font-color': '#9797BB', //цвет текста в модальном окне создания папки var(--create-folder-font--color)
            'modal-base-text-default-color': '#9797BB',
            'modal-hint-font-color': '#9797BB',
            'modal-button-cancel-color': '#9797BB', //цвет "Отмены" во всех модалках
            'modal-input-border-color': '#DEDEEE',
            'modal-send-images-name-color': '#414159',
            'modal-element-borders-color': '#9797BB',



            'button-cancel-color': '#FBFBFE', //цвет bg cancel кнопки
            'settings-nav-color': '#DEDEEE', //цвет nav'а в настройках192

            'settings-left-bar-hover': '#FBFBFE',
            'settings-main-color': '#F0F0FA', //цвет контейнера в настройках
            'settings-header-color': '#414159',
            'settings-whatsapp-color': '#DEDEEE', //цвет ватсаппа
            'settings-whatsapp-name-color': '#414159',
            'settings-whatsapp-sub-color': '#9797BB',

            'settings-whatsapp-del-icon-fill': '#FFFFFF',
            'settings-whatsapp-default-icon-fill': '#FFFFFF',
            'settings-whatsapp-del-icon-bg': '#EB5757',
            'ranged-buttons-color': '#DEDEEE',
            'calendar-bg': '#EDEDEF', //цвет календаря









            'header-color': '#757589', //цвет фона и хедера --> var(--)
            'footer-color': '#B7B7BE',

            'search-input-color': '#EDEDEF', //цвет поисковой строки var(--search-input-color)
            'active-message-color': '#EDEDEF', //цвет выбранного диалога var(--active-message-color)
            'active-folder-color': '#1D1D35', //цвет активной директории var(--active-folder-color)
            'sub-text-color': '#757589', //цвет шрифта(вторичный) var(--sub-text-color)
            'date-in-message-color': '#1D1D35', //цвет текста в отображении даты

            'message-action-icon-color': '#FFFFFF', //цвет иконок
            'folder-create-button-color': '#FFFFFF', //цвет создания папки и текста
            'folder-create-plus-color': '#B7B7BE', //цвет линий плюсика в svg
            'stripe-instead-ava': '#757589', //цвет полосок вместо авы

            'user-name-color': '#404054', //имя профиля в левой панели

            'svg-settings-fill': '#B7B7BE', //цвет SVG в настройках профиля


            'create-folder-color': '#FFFFFF', //цвет модального окна создания папки var(--create-folder-color)
            'create-folder-font-color': '#575773', //цвет текста в модальном окне создания папки var(--create-folder-font--color)
            'create-folder-header-color': '#000000', //цвет заголовка в модальном окне создания папки var(--create-folder-font--color)
            'create-folder-border-color': '#757589', //цвет бордеров в модальном окне создания папки var(--create-folder-font--color)
            'create-folder-font-button': '#F3F3F3', //цвет текста в кнопке

            'cancel-button-color-in-modals': '#757589', //цвет "Отмены" во всех модалках



            'create-chat-border-color': '#EDEDEF', //цвет бордера и ховера папки



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
