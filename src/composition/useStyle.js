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
            'font-my-message-color': '#252544',


        }
        const dark = {
            ...common,
            'main-font-color':'#9797BB', //главный цвет текста 
            'left-bar-color': '#141427', //цвет панели с папками --> var(--left-bar-color)
            'default-svg-fill': '#575773',
            'hover-svg-fill': '#FBFBFE',
            'hover-folder-bg': '#1D1D35',
            'messenger-middle-bar-bg': '#414159',
            'separator-color': '#252544', //цвет разделительной линии var(--separator-color)
            'user-info-settings-header-bg': '#2E2E4E',
            'user-info-settings-hover-svg-fill': '#F0F0FA',
            'user-info-settings-default-svg-fill': '#9797BB',
            'user-info-settings-default-setting-name': '#F0F0FA',
            'user-info-settings-hover-setting-bg': '#575773',
            'foreign-messages-font-color': '#F0F0FA', //цвет чужого сообщения var(--messages-color)
            'messenger-search-input-bg': '#40406B',
            'messenger-search-input-bg-active': '#1D1D35', 
            'user-icon-name' : '#575773',
            'messages-input-wrapper-bg': '#252544',
            
            'border-integration-card':'#40406B',
            


            'font-color': ' #CFCFE4', //цвет шрифта(основной) --> var(--font-color)
            'sub-text-font-color': '#575773',
            'main-color': '#141427', //цвет фона с перепиской --> var(--main-color)
            'messages-color': '#252544', //цвет чужого сообщения var(--messages-color)
            'context-background-color': '#2E2E4E', //цвет бг контекстного меню
            'placeholder-color': '#575773',
            'settings-active-list':'#141427',//цвет открытого пункта меню со вложенным списком
            'color-messanger':'#CFCFE4', //цвет в диалогах
            'color-messanger-name' :'#F0F0FA', //цвет имени в диалоге
            'modal-bg-color': '#1D1D35',
            'header-color':'#1D1D35', //цвет Header в диалогах
            'modal-element-hover-bg-color': '#2E2E4E',
            'settings-active-link' : '#141427', //цвет активной ссылки в меню
            'modal-font-color': '#FBFBFE', //цвет текста в модальном окне создания папки var(--create-folder-font--color)
            'modal-sub-font-color': '#9797BB', //цвет текста в модальном окне создания папки var(--create-folder-font--color)
            'modal-base-text-default-color': '#EDEDEF',
            'modal-hint-font-color': '#575773',
            'modal-button-cancel-color': '#414159', //цвет "Отмены" во всех модалках
            'modal-input-border-color': '#414159',
            'modal-send-images-name-color': '#F0F0FA',
            'modal-element-borders-color': '#2E2E4E',


            'button-cancel-color': '#2E2E4E', //цвет bg cancel кнопки
            'settings-nav-color': ' #1D1D35', //цвет nav'а в настройках
            'settings-nav-border' : '#252544',//цвет border в меню

            'settings-left-bar-hover': '#1D1D35',
            'settings-main-color': '#141427',
            'settings-header-color': '#F0F0FA',
            'settings-whatsapp-color': '#141427', //цвет ватсаппа
            'settings-whatsapp-name-color': '#F0F0FA', //цвет названия ватсаппа
            'settings-whatsapp-sub-color': '#9797BB',

            'settings-whatsapp-del-icon-fill': '#EB5757',
            'settings-whatsapp-default-icon-fill': '#B7B7BE',
            'settings-whatsapp-del-icon-bg': '#1D1D35',
            'ranged-buttons-color': '#141427',
            'calendar-bg': '#0F0F1B', //цвет календаря
            'search-input-color': '#575773', //цвет поисковой строки var(--search-input-color)

            'settings-label-color': '#EDEDEF',



            'sub-text-color': '#9797BB', //цвет шрифта(вторичный) var(--sub-text-color),
            'date-in-message-color': '#EDEDEF', //цвет текста в отображении даты
            'stripe-instead-ava': '#FFFFFF', //цвет полосок вместо авы
            'mailings-cancel-button-color': '#4A4A5D',

            'calendar-border-color': '#1D1D35',
            'calendar-font-color': '#B7B7BE',
            'calendar-active-font-color': '#FFFFFF',
            'cursor-input-active':' #5EC075', //цвет курсора


            'settings-autoresponders-actions-input-bg-color': '#141427',

            'base-checkbox-group-font-color': '#757589',

            'empty-photo-bg': 'rgba(29, 29, 53, 0.88)',
            'border-active' : '#5EC075', //зеленые/активный border
            'messanger-content' : '#252544',
            'time-message-my' : '#2A5F5F', 
            'my-message-bg' : '#5EC075' //цвет моего сообщения в диалоге
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
            'user-icon-name' : '#9797BB',
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
            'search-input-color': '#F0F0FA', //цвет поисковой строки var(--search-input-color)

            'settings-label-color': '#575773',

            'sub-text-color': '#757589', //цвет шрифта(вторичный) var(--sub-text-color)
            'date-in-message-color': '#1D1D35', //цвет текста в отображении даты
            'stripe-instead-ava': '#757589', //цвет полосок вместо авы
            'mailings-cancel-button-color': '#B7B7BE',

            'calendar-border-color': '#B7B7BE',
            'calendar-font-color': '#7D7D90',
            'calendar-active-font-color': '#404054',

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
        type? setProperties(dark) : setProperties(dark) //setProperties(light) 
        style.value = type;
        localStorage.setItem('style', type)
    }

    return {
        setStyle,
        style: computed(() => style.value),
    }
}
