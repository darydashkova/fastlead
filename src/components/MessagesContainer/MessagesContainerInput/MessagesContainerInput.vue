<template>
    <div class="messages-container-input">
        <Picker
                v-show="smiles.isOpened"
                :data="emojiIndex"
                :showPreview="false"
                style="width: 100%"
                set="apple"
                @select="smiles.addEmoji"
        />
        <div class="messages-container-input__container"> 
            <div class="messages-container-input__input"
                 contenteditable="true"
                 placeholder="Введите ваше сообщение..."
                 ref="textarea"
                 @input="input"
                 @keypress="isEnter"
                 @paste="smiles.paste"
                 @copy="smiles.copy"
                  v-if="isActiveDialog"
            ></div>
            <div class="messages-container-input__input messages-container-input__disabled"
                 value="Этот диалог неактивен"
                 isContentEditable="false"
                 v-if="!isActiveDialog"
            >Этот диалог неактивен</div>
             <svg 
                 @click="send"  v-if="value"
                 class="messages-container-input__icon messages-container-input__icon_airplane"
                 width="26" height="23" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24.4516 9.12261L3.47412 0.198642C2.59038 -0.177351 1.59196 -0.011949 0.868585 0.630081C0.145205 1.27222 -0.15735 2.2616 0.079088 3.2121L1.94627 10.719H11.0882C11.5089 10.719 11.85 11.0687 11.85 11.5C11.85 11.9313 11.5089 12.281 11.0882 12.281H1.94627L0.079088 19.7879C-0.15735 20.7385 0.145154 21.7278 0.868585 22.3699C1.59344 23.0133 2.59195 23.1766 3.47417 22.8014L24.4516 13.8774C25.4067 13.4712 26 12.5602 26 11.5C26 10.4399 25.4067 9.52885 24.4516 9.12261Z" fill="url(#paint0_linear)"/>
                <defs>
                    <linearGradient id="paint0_linear" x1="-10.7531" y1="32.0864" x2="26.4121" y2="-8.96798" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#22A595"/>
                        <stop offset="1" stop-color="#84D160"/>
                    </linearGradient>
                </defs>
            </svg>
            <!-- <button class="messages-container-input__icon messages-container-input__icon_smile pointer">
                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0333 4.61377C21.322 6.3318 22.0794 8.38905 22.2119 10.5319V17.6317C22.2107 18.8457 21.7275 20.0096 20.8682 20.868C20.009 21.7265 18.844 22.2093 17.6288 22.2105H11.228C9.07905 22.2116 6.97673 21.5844 5.18024 20.4062C3.38374 19.2281 1.97162 17.5504 1.11795 15.5802C0.264276 13.6099 0.00638099 11.4331 0.376055 9.3182C0.745728 7.20328 1.72681 5.24266 3.19835 3.67805C4.66989 2.11345 6.56756 1.01325 8.65741 0.513102C10.7473 0.0129532 12.9379 0.134715 14.9593 0.863377C16.9808 1.59204 18.7446 2.89575 20.0333 4.61377ZM19.5733 19.5743C20.089 19.0591 20.3787 18.3603 20.3787 17.6317V10.6189C20.2943 9.3768 19.9583 8.16477 19.3911 7.05627C18.8238 5.94778 18.0372 4.9659 17.0788 4.17016C15.4379 2.80377 13.3679 2.05811 11.2317 2.06393C10.8333 2.06445 10.4354 2.08953 10.0401 2.13902C8.0137 2.40652 6.13406 3.34018 4.69748 4.7928C3.2609 6.24543 2.34908 8.1344 2.10578 10.1619C1.95169 11.4474 2.07448 12.7509 2.46591 13.985C2.85735 15.2191 3.50837 16.3554 4.37534 17.3176C5.23814 18.2803 6.29434 19.0505 7.47509 19.578C8.65583 20.1055 9.93461 20.3784 11.228 20.379H17.6288C18.3581 20.379 19.0576 20.0895 19.5733 19.5743ZM11.2124 8.47407H7.54589C7.30279 8.47407 7.06964 8.37759 6.89774 8.20585C6.72584 8.03412 6.62927 7.80119 6.62927 7.55832C6.62927 7.31545 6.72584 7.08252 6.89774 6.91078C7.06964 6.73905 7.30279 6.64257 7.54589 6.64257H11.2124C11.4555 6.64257 11.6886 6.73905 11.8605 6.91078C12.0324 7.08252 12.129 7.31545 12.129 7.55832C12.129 7.80119 12.0324 8.03412 11.8605 8.20585C11.6886 8.37759 11.4555 8.47407 11.2124 8.47407ZM7.54589 10.3056C7.30279 10.3056 7.06964 10.4021 6.89774 10.5738C6.72584 10.7455 6.62927 10.9785 6.62927 11.2213C6.62927 11.4642 6.72584 11.6971 6.89774 11.8689C7.06964 12.0406 7.30279 12.1371 7.54589 12.1371H14.8789C15.122 12.1371 15.3551 12.0406 15.527 11.8689C15.6989 11.6971 15.7955 11.4642 15.7955 11.2213C15.7955 10.9785 15.6989 10.7455 15.527 10.5738C15.3551 10.4021 15.122 10.3056 14.8789 10.3056H7.54589ZM6.89774 14.2368C7.06964 14.0651 7.30279 13.9686 7.54589 13.9686H14.8789C15.122 13.9686 15.3551 14.0651 15.527 14.2368C15.6989 14.4085 15.7955 14.6415 15.7955 14.8843C15.7955 15.1272 15.6989 15.3601 15.527 15.5319C15.3551 15.7036 15.122 15.8001 14.8789 15.8001H7.54589C7.30279 15.8001 7.06964 15.7036 6.89774 15.5319C6.72584 15.3601 6.62927 15.1272 6.62927 14.8843C6.62927 14.6415 6.72584 14.4085 6.89774 14.2368Z"
                          fill="var(--default-svg-fill)"/>
                </svg>
            </button> -->
            <button class="messages-container-input__icon messages-container-input__icon_smile pointer"
                @click="smiles.toggle()"
            >
                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.2119 22.2104C8.27371 22.2104 5.51138 21.0662 3.43371 18.9887C1.35613 16.911 0.211914 14.1487 0.211914 11.2104C0.211914 8.27225 1.35613 5.50991 3.43371 3.43225C5.51138 1.35466 8.27371 0.210449 11.2119 0.210449C14.1501 0.210449 16.9124 1.35466 18.9901 3.43225C21.0677 5.50991 22.2119 8.27225 22.2119 11.2104C22.2119 14.1487 21.0677 16.911 18.9901 18.9887C16.9124 21.0662 14.1501 22.2104 11.2119 22.2104ZM11.2119 1.9292C6.09421 1.9292 1.93066 6.09274 1.93066 11.2104C1.93066 16.3282 6.09421 20.4917 11.2119 20.4917C16.3296 20.4917 20.4932 16.3282 20.4932 11.2104C20.4932 6.09274 16.3296 1.9292 11.2119 1.9292ZM15.2397 13.1092C14.8392 12.8543 14.3081 12.9723 14.0533 13.3728C14.0427 13.3894 12.9732 15.0373 11.1689 15.0373C9.36469 15.0373 8.2952 13.3894 8.28458 13.3728C8.02978 12.9724 7.49864 12.8543 7.09821 13.1092C6.69779 13.364 6.57975 13.8951 6.83456 14.2955C6.8985 14.396 8.43179 16.756 11.1689 16.756C13.9061 16.756 15.4394 14.396 15.5033 14.2955C15.7581 13.8951 15.6401 13.364 15.2397 13.1092ZM7.21582 7.30029C7.80909 7.30029 8.29004 7.78124 8.29004 8.37451C8.29004 8.96778 7.80909 9.44873 7.21582 9.44873C6.62255 9.44873 6.1416 8.96778 6.1416 8.37451C6.1416 7.78124 6.62255 7.30029 7.21582 7.30029ZM14.1338 8.37451C14.1338 8.96778 14.6147 9.44873 15.208 9.44873C15.8013 9.44873 16.2822 8.96778 16.2822 8.37451C16.2822 7.78124 15.8013 7.30029 15.208 7.30029C14.6147 7.30029 14.1338 7.78124 14.1338 8.37451Z"
                          fill="var(--default-svg-fill)"/>
                </svg>
            </button>
           <button class="messages-container-input__icon messages-container-input__icon_include"
                    @blur="attachment.open(false)"
            >
                <svg class="pointer" width="21" height="23" viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg"
                     @click="attachment.toggle"
                >
                    <path d="M13.2458 5.53727C13.0375 5.53727 12.8492 5.61572 12.7016 5.74105L12.6939 5.73328L6.04702 12.392C5.29377 13.149 4.98493 13.8875 4.98098 14.9419C4.98098 15.7665 5.28409 16.5083 5.8343 17.0307C6.40257 17.5699 7.19178 17.8549 8.11699 17.8548H8.13641C9.09946 17.8504 10.0006 17.4695 10.6731 16.7831L18.3856 9.03205C20.339 7.06822 20.3903 4.26939 18.5075 2.37663C17.5737 1.438 16.3304 0.921021 15.0066 0.921021C13.6829 0.921021 12.4399 1.438 11.5068 2.3767L1.84701 12.0857C-0.615669 14.5613 -0.615669 18.5895 1.84701 21.0652C3.03805 22.2621 4.62406 22.9211 6.31284 22.9211C8.00166 22.9211 9.58778 22.2621 10.7793 21.065L20.7796 10.9768C20.7796 10.9768 21 10.759 21 10.3917C21 9.92105 20.6204 9.53941 20.1522 9.53941C19.9297 9.53941 19.7287 9.62755 19.5774 9.7686L19.5748 9.766L9.57437 19.8544C8.70453 20.7283 7.54618 21.2096 6.31266 21.2096C5.07915 21.2096 3.92098 20.7283 3.05146 19.8544C1.25296 18.0458 1.25296 15.104 3.05146 13.2966L12.7112 3.58779C13.3233 2.97248 14.1385 2.63369 15.0066 2.63369C15.8748 2.63369 16.6905 2.97263 17.3031 3.58779C17.914 4.2019 18.221 4.93144 18.1913 5.69785C18.1619 6.45212 17.8127 7.18635 17.1811 7.82118L9.45242 15.5887C9.0991 15.9444 8.62934 16.141 8.13037 16.1422C7.18124 16.1422 6.68468 15.5411 6.68468 14.9481C6.68659 14.447 6.88208 13.975 7.2354 13.6193L13.8984 6.94437L13.8909 6.93678C14.0155 6.78845 14.0936 6.59921 14.0936 6.38972C14.0937 5.91873 13.714 5.53727 13.2458 5.53727Z"
                          fill="var(--default-svg-fill)"/>
                </svg>
                <div class="messages-container-input__attachments" v-if="attachment.isOpened">
                    <!-- <div class="messages-container-input__attachment">
                        <div class="messages-container-input__attachment-icon">
                            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.59258 8.24161C8.82515 8.73608 7.9229 9 6.99992 9C5.76262 8.99881 4.57635 8.52432 3.70145 7.68066C2.82655 6.83701 2.33449 5.69311 2.33325 4.5C2.33325 3.60999 2.60695 2.73996 3.11973 1.99994C3.63251 1.25991 4.36134 0.683138 5.21406 0.342544C6.06678 0.00194979 7.0051 -0.0871652 7.91034 0.0864682C8.81558 0.260102 9.64711 0.688685 10.2998 1.31802C10.9524 1.94736 11.3969 2.74918 11.5769 3.62209C11.757 4.49501 11.6646 5.39981 11.3114 6.22208C10.9581 7.04434 10.36 7.74715 9.59258 8.24161ZM8.72836 2.00559C8.21674 1.67595 7.61524 1.5 6.99992 1.5C6.1748 1.5 5.38348 1.81607 4.80003 2.37868C4.21658 2.94129 3.88881 3.70435 3.88881 4.5C3.88881 5.09334 4.07127 5.67336 4.41312 6.16671C4.75498 6.66006 5.24087 7.04458 5.80935 7.27164C6.37783 7.4987 7.00337 7.55811 7.60687 7.44236C8.21036 7.3266 8.76471 7.04088 9.19981 6.62132C9.6349 6.20176 9.93121 5.66721 10.0513 5.08527C10.1713 4.50333 10.1097 3.90013 9.87421 3.35195C9.63874 2.80377 9.23998 2.33524 8.72836 2.00559ZM2.05253 12.4792C3.36483 11.2138 5.14412 10.502 7 10.5C8.85588 10.502 10.6352 11.2138 11.9475 12.4792C13.2598 13.7447 13.9979 15.4604 14 17.25C14 17.4489 13.9181 17.6397 13.7722 17.7803C13.6263 17.921 13.4285 18 13.2222 18C13.0159 18 12.8181 17.921 12.6722 17.7803C12.5264 17.6397 12.4444 17.4489 12.4444 17.25C12.4444 15.8576 11.8708 14.5222 10.8498 13.5377C9.82877 12.5531 8.44396 12 7 12C5.55604 12 4.17123 12.5531 3.1502 13.5377C2.12916 14.5222 1.55556 15.8576 1.55556 17.25C1.55556 17.4489 1.47361 17.6397 1.32775 17.7803C1.18189 17.921 0.984057 18 0.777778 18C0.571498 18 0.373667 17.921 0.227806 17.7803C0.0819442 17.6397 0 17.4489 0 17.25C0.00205866 15.4604 0.740218 13.7447 2.05253 12.4792Z"
                                      fill="#575773"/>
                            </svg>
                        </div>
                        <div>
                            Контакт
                        </div>
                    </div> -->
                    <div class="messages-container-input__attachment" @click.stop="attachment.addVideo">
                        <div class="messages-container-input__attachment-icon">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.869 3H14.25C15.2442 3.00119 16.1973 3.39666 16.9003 4.09966C17.6033 4.80267 17.9988 5.7558 18 6.75V14.25C17.9988 15.2442 17.6033 16.1973 16.9003 16.9003C16.1973 17.6033 15.2442 17.9988 14.25 18H3.75C2.7558 17.9988 1.80267 17.6033 1.09966 16.9003C0.396661 16.1973 0.00119089 15.2442 0 14.25V6.75C0.00119089 5.7558 0.396661 4.80267 1.09966 4.09966C1.80267 3.39666 2.7558 3.00119 3.75 3H4.131L5.769 0.876C5.9801 0.604355 6.25026 0.384312 6.559 0.232541C6.86774 0.0807686 7.20697 0.00124728 7.551 0H10.449C10.793 0.00124728 11.1323 0.0807686 11.441 0.232541C11.7497 0.384312 12.0199 0.604355 12.231 0.876L13.869 3ZM7.2202 1.57761C7.11727 1.6283 7.02725 1.70179 6.957 1.7925L6.0255 3H11.9745L11.043 1.7925C10.9727 1.70187 10.8826 1.62844 10.7797 1.57776C10.6768 1.52709 10.5637 1.50049 10.449 1.5H7.551C7.43627 1.50038 7.32313 1.52693 7.2202 1.57761ZM15.841 15.841C16.2629 15.419 16.5 14.8467 16.5 14.25V6.75C16.5 6.15326 16.2629 5.58097 15.841 5.15901C15.419 4.73705 14.8467 4.5 14.25 4.5H3.75C3.15326 4.5 2.58097 4.73705 2.15901 5.15901C1.73705 5.58097 1.5 6.15326 1.5 6.75V14.25C1.5 14.8467 1.73705 15.419 2.15901 15.841C2.58097 16.2629 3.15326 16.5 3.75 16.5H14.25C14.8467 16.5 15.419 16.2629 15.841 15.841ZM6.49994 6.75839C7.23996 6.26392 8.10999 6 9 6C10.1931 6.00119 11.337 6.47568 12.1807 7.31933C13.0243 8.16299 13.4988 9.30689 13.5 10.5C13.5 11.39 13.2361 12.26 12.7416 13.0001C12.2471 13.7401 11.5443 14.3169 10.7221 14.6575C9.89981 14.9981 8.99501 15.0872 8.1221 14.9135C7.24918 14.7399 6.44736 14.3113 5.81802 13.682C5.18869 13.0526 4.7601 12.2508 4.58647 11.3779C4.41283 10.505 4.50195 9.60019 4.84254 8.77792C5.18314 7.95566 5.75991 7.25285 6.49994 6.75839ZM7.33329 12.9944C7.82664 13.3241 8.40666 13.5 9 13.5C9.79565 13.5 10.5587 13.1839 11.1213 12.6213C11.6839 12.0587 12 11.2956 12 10.5C12 9.90666 11.8241 9.32664 11.4944 8.83329C11.1648 8.33994 10.6962 7.95542 10.1481 7.72836C9.59987 7.5013 8.99667 7.44189 8.41473 7.55764C7.83279 7.6734 7.29824 7.95912 6.87868 8.37868C6.45912 8.79824 6.1734 9.33279 6.05765 9.91473C5.94189 10.4967 6.0013 11.0999 6.22836 11.6481C6.45543 12.1962 6.83994 12.6648 7.33329 12.9944Z"
                                      fill="#9797BB"/>
                            </svg>
                        </div>
                        <div>
                            Видео
                        </div>
                    </div>
                    <div class="messages-container-input__attachment" @click.stop="attachment.addPhoto">
                        <div class="messages-container-input__attachment-icon">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.75 0H14.25C15.2442 0.00119089 16.1973 0.396661 16.9003 1.09966C17.6033 1.80267 17.9988 2.7558 18 3.75V14.25C17.9988 15.2442 17.6033 16.1973 16.9003 16.9003C16.1973 17.6033 15.2442 17.9988 14.25 18H3.75C2.7558 17.9988 1.80267 17.6033 1.09966 16.9003C0.396661 16.1973 0.00119089 15.2442 0 14.25V3.75C0.00119089 2.7558 0.396661 1.80267 1.09966 1.09966C1.80267 0.396661 2.7558 0.00119089 3.75 0ZM14.25 1.5H3.75C3.15326 1.5 2.58097 1.73705 2.15901 2.15901C1.73705 2.58097 1.5 3.15326 1.5 3.75V10.9395L4.09875 8.3415C4.44698 7.99318 4.86042 7.71686 5.31546 7.52835C5.77049 7.33983 6.25821 7.2428 6.75075 7.2428C7.24329 7.2428 7.73101 7.33983 8.18604 7.52835C8.64108 7.71686 9.05452 7.99318 9.40275 8.3415L16.275 15.2137C16.4218 14.9136 16.4987 14.5841 16.5 14.25V3.75C16.5 3.15326 16.2629 2.58097 15.841 2.15901C15.419 1.73705 14.8467 1.5 14.25 1.5ZM2.15901 15.841C2.58097 16.2629 3.15326 16.5 3.75 16.5H14.25C14.5841 16.4987 14.9136 16.4218 15.2137 16.275L8.3415 9.402C8.13255 9.19292 7.88445 9.02705 7.61137 8.91389C7.33829 8.80073 7.0456 8.74248 6.75 8.74248C6.4544 8.74248 6.16171 8.80073 5.88863 8.91389C5.61555 9.02705 5.36745 9.19292 5.1585 9.402L1.5 13.0605V14.25C1.5 14.8467 1.73705 15.419 2.15901 15.841ZM13.4583 7.43261C13.0266 7.72105 12.5191 7.875 11.9999 7.875C11.3037 7.875 10.636 7.59844 10.1438 7.10615C9.65147 6.61387 9.37491 5.94619 9.37491 5.25C9.37491 4.73082 9.52886 4.22331 9.8173 3.79163C10.1057 3.35995 10.5157 3.0235 10.9954 2.82482C11.475 2.62614 12.0028 2.57415 12.512 2.67544C13.0212 2.77672 13.489 3.02673 13.8561 3.39384C14.2232 3.76096 14.4732 4.22869 14.5745 4.73789C14.6758 5.24709 14.6238 5.77489 14.4251 6.25454C14.2264 6.7342 13.89 7.14417 13.4583 7.43261ZM12.6249 4.3146C12.4399 4.19098 12.2224 4.125 11.9999 4.125C11.7015 4.125 11.4154 4.24353 11.2044 4.4545C10.9934 4.66548 10.8749 4.95163 10.8749 5.25C10.8749 5.4725 10.9409 5.69001 11.0645 5.87502C11.1881 6.06002 11.3638 6.20422 11.5694 6.28936C11.775 6.37451 12.0012 6.39679 12.2194 6.35338C12.4376 6.30998 12.6381 6.20283 12.7954 6.0455C12.9527 5.88816 13.0599 5.68771 13.1033 5.46948C13.1467 5.25125 13.1244 5.02505 13.0393 4.81948C12.9541 4.61391 12.8099 4.43821 12.6249 4.3146Z"
                                      fill="#9797BB"/>
                            </svg>
                        </div>
                        <div>
                            Фото
                        </div>
                    </div>
                    <div class="messages-container-input__attachment"  @click.stop="attachment.addDocs">
                        <div class="messages-container-input__attachment-icon">
                            <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.4617 4.15201L10.8487 1.53752C10.3622 1.04862 9.78364 0.661015 9.14641 0.397111C8.50918 0.133208 7.82595 -0.00175791 7.13624 1.72865e-05H3.75C2.7558 0.00120818 1.80267 0.396678 1.09966 1.09968C0.396661 1.80268 0.00119089 2.75582 0 3.75001V14.25C0.00119089 15.2442 0.396661 16.1973 1.09966 16.9003C1.80267 17.6033 2.7558 17.9988 3.75 18H11.25C12.2442 17.9988 13.1973 17.6033 13.9003 16.9003C14.6033 16.1973 14.9988 15.2442 15 14.25V7.86376C15.0018 7.17408 14.8668 6.49088 14.6028 5.85374C14.3388 5.21661 13.9509 4.63819 13.4617 4.15201ZM12.4012 5.21251C12.6303 5.44812 12.8272 5.7129 12.987 6.00001H9.74999C9.55108 6.00001 9.36031 5.92099 9.21966 5.78034C9.07901 5.63969 8.99999 5.44892 8.99999 5.25001V2.01302C9.28719 2.17271 9.5522 2.36939 9.78824 2.59801L12.4012 5.21251ZM13.5 14.25C13.5 14.8467 13.2629 15.419 12.841 15.841C12.419 16.2629 11.8467 16.5 11.25 16.5H3.75C3.15326 16.5 2.58096 16.2629 2.15901 15.841C1.73705 15.419 1.5 14.8467 1.5 14.25V3.75001C1.5 3.15328 1.73705 2.58098 2.15901 2.15903C2.58096 1.73707 3.15326 1.50002 3.75 1.50002H7.13624C7.25924 1.50002 7.37849 1.52402 7.49999 1.53527V5.25001C7.49999 5.84675 7.73704 6.41904 8.159 6.841C8.58096 7.26296 9.15325 7.50001 9.74999 7.50001H13.4647C13.476 7.62151 13.5 7.74001 13.5 7.86376V14.25Z"
                                      fill="#9797BB"/>
                            </svg>
                        </div>
                        <div>
                            Документ
                        </div>
                    </div>
                </div>
            </button> 
          <!--   <svg v-if="!value" class="messages-container-input__icon messages-container-input__icon_micro" width="19" height="23" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5628 10.7322C14.5628 13.6373 12.1666 15.993 9.2115 15.993C6.25642 15.993 3.86015 13.6373 3.86015 10.7322V5.47131C3.86015 2.56621 6.25642 0.210449 9.2115 0.210449C12.1666 0.210449 14.5628 2.56621 14.5628 5.47131V10.7322ZM9.2115 1.96408C7.24157 1.96408 5.64394 3.5347 5.64394 5.47131V10.7322C5.64394 12.6688 7.24157 14.2394 9.2115 14.2394C11.1814 14.2394 12.779 12.6688 12.779 10.7322V5.47131C12.779 3.5347 11.1814 1.96408 9.2115 1.96408ZM16.4282 10.8119C16.4282 10.3277 16.8275 9.93512 17.32 9.93512C17.8126 9.93512 18.2119 10.3277 18.2119 10.812V11.6888C18.2119 15.7503 14.117 19.095 10.1038 19.5313V20.4569H11.8876C12.3802 20.4569 12.7795 20.8494 12.7795 21.3337C12.7795 21.8179 12.3802 22.2104 11.8876 22.2104H6.53621C6.04364 22.2104 5.64433 21.8179 5.64433 21.3336C5.64433 20.8494 6.04364 20.4568 6.53621 20.4568H8.32006V19.5313C4.30682 19.095 0.211914 15.7503 0.211914 11.6888V10.812C0.211914 10.3277 0.611218 9.93516 1.10379 9.93516C1.59637 9.93516 1.99567 10.3277 1.99567 10.812V11.6888C1.99567 15.0783 5.76415 17.8264 9.21194 17.8264C12.6597 17.8264 16.4282 15.0783 16.4282 11.6888V10.8119Z"
                      fill="var(--default-svg-fill)"/>
            </svg> -->
            <input @change="attachment.change"
                   type="file"
                   style="display: none;"
                   id="messages-container-input__attachment"
                   multiple
                   accept="image/*"
            >
            <input @change="attachment.changeDocs"
                   type="file"
                   style="display: none;"
                   id="messages-container-input__attachment-docs"
                   multiple
                   accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
            >
            <input @change="attachment.changeVideo"
                   type="file"
                   style="display: none;"
                   id="messages-container-input__attachment-video"
                   multiple
                   accept="video/mp4,video/x-m4v,video/*"
            >
        </div>
        <teleport to="body">
            <ModalSendImages
                    v-if="openedModalSendImages"
            ></ModalSendImages>
             <ModalSendFiles
                    v-if="openedModalSendFiles"
            ></ModalSendFiles>
            <ModalSendVideos
                    v-if="openedModalSendVideos"
            ></ModalSendVideos>
        </teleport>
    </div>
</template>

<script>
    import { ref, reactive, computed } from 'vue'
    import { useDialogs } from "../../../composition/useDialogs";
    import { useSocket } from "../../../composition/useSocket";
    import { Picker } from "../../emoji-component/src";
    import ModalSendImages from "../../Modals/ModalSendImages";
    import ModalSendFiles from "../../Modals/ModalSendFiles";
    import ModalSendVideos from "../../Modals/ModalSendVideos";
    import {useModalsImages} from "../../../composition/useModalsImages";
    import {useModalsFiles} from "../../../composition/useModalsFiles";
    import {useModalsVideos} from "../../../composition/useModalsVideos";
    import {useImages} from "../../../composition/useImages";
    import {useEmoji} from "../../../composition/useEmoji";
    import {useFiles} from "../../../composition/useFiles";
    import {useVideos} from "../../../composition/useVideos";
    import { useMessages } from "../../../composition/useMessages";

    export default {
        components: {
            Picker, ModalSendImages, ModalSendFiles, ModalSendVideos
        },
        setup() {
            const token = localStorage.getItem('token');//токены
            const { selectedDialog } = useDialogs();
            const { socketSend, status } = useSocket();
            const { createImage, replaceImages, addImage } = useImages()
            const { openedModalSendImages, toggleModalSendImages } = useModalsImages();
            const { openedModalSendFiles, toggleModalSendFiles } = useModalsFiles();
            const { openedModalSendVideos, toggleModalSendVideos } = useModalsVideos();
            const { emojiIndex, emojiToHtml, wrapEmoji } = useEmoji();
            const { addSendedMessage, messages, isActiveDialog, getRandomInRange } = useMessages();
            const { createFile, replaceFile, addFiles } = useFiles();
            const { createVideo, replaceVideo, addVideo } = useVideos()
            const value = ref('');
            const textarea = ref(null);
            const isEnter = ($event) => {
                if ($event.keyCode === 13 && !$event.shiftKey) {
                    $event.preventDefault();
                    send();
                    return false;
                }
            }
            const send = () => {
                const uidRandom = getRandomInRange();
                if (value.value) {
                    let div = document.createElement('div');
                    div.innerHTML = value.value;
                    div.querySelectorAll('img').forEach(img => {
                        img.replaceWith(img.getAttribute('data-text'))
                    })
                    div.innerHTML = div.innerHTML.replace(/<br>/g, '\n');
                    div.innerHTML = div.innerHTML.replace(/\n\n/g, '\n');
                    div.innerHTML = div.innerHTML.replace(/\&nbsp\;/gi, ' ');
                    addSendedMessage({
                        is_me: true,
                        is_read: false,
                        message: div.innerHTML,
                        message_id: (Object.keys(messages.value.messages)).length,
                        time: Math.floor(Date.now() / 1000),
                        type: 'text',
                        is_sending:true,
                        request_uid:uidRandom,
                    });
                    
                    socketSend('send_message', {type: 'text', data: div.innerHTML, dialog_id: selectedDialog.value, request_uid:uidRandom, message_uid : null})
                    value.value = '';
                    textarea.value.innerHTML = '';
                }
            }
            const input = ($event) => {
                value.value = $event.target.innerHTML
            }
            const wrapTab = (text) => {
                return text.replace(/\n/g, '<br>')
            }
            
            const smiles = reactive({
                isOpened: false,
                toggle: () => {
                    smiles.isOpened = !smiles.isOpened;
                },
                open: (boolean) => {
                    smiles.isOpened = boolean;
                },
                addEmoji: (emoji) => {
                    if (!textarea.value.innerHTML.length
                        || !window.getSelection()
                        || !window.getSelection().anchorNode.classList
                        || (!window.getSelection().anchorNode.classList.contains('messages-container-input__input')
                            && !window.getSelection().anchorNode.parentElement.classList.contains('messages-container-input__input'))) {
                        if (!textarea.value.innerHTML.length) {
                            textarea.value.innerHTML = emojiToHtml(emoji);
                            value.value = textarea.value.innerHTML;
                            textarea.value.focus();
                            setCaretToPos(textarea.value, textarea.value.childNodes.length)
                        } else {
                            textarea.value.focus();
                            setCaretToPos(textarea.value, textarea.value.childNodes.length);
                            value.value = textarea.value.innerHTML;
                        }
                    } else {
                        pasteHtmlAtCaret(emojiToHtml(emoji))
                        value.value = textarea.value.innerHTML

                    }

                },
                paste: ($event) => {
                     let paste = ($event.clipboardData || window.clipboardData ).getData('text');
                     pasteHtmlAtCaret(wrapEmoji(wrapTab(paste)));
                     value.value = textarea.value.innerHTML
    
                    $event.preventDefault();
                },
            })
            const setCaretToPos = (elem, pos) => {
                let range = document.createRange();
                let sel = window.getSelection();
                range.setStart(elem, pos);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
            const pasteHtmlAtCaret = (html) => {
                let sel, range;
                if (window.getSelection) {
                    // IE9 and non-IE
                    sel = window.getSelection();
                    if (sel.getRangeAt && sel.rangeCount) {
                        range = sel.getRangeAt(0);
                        range.deleteContents();
                        let el = document.createElement("div");
                        el.innerHTML = html;
                        let frag = document.createDocumentFragment(), node, lastNode;
                        while ( (node = el.firstChild) ) {
                            lastNode = frag.appendChild(node);
                        }
                        range.insertNode(frag);
                        // Preserve the selection
                        if (lastNode) {
                            range = range.cloneRange();
                            range.setStartAfter(lastNode);
                            range.collapse(true);
                            sel.removeAllRanges();
                            sel.addRange(range);
                        }
                    }
                } else if (document.selection && document.selection.type != "Control") {
                    // IE < 9
                    document.selection.createRange().pasteHTML(html);
                }
            }
            const attachment = reactive({
                isOpened: false,
                toggle: () => {
                    attachment.isOpened = !attachment.isOpened;
                },
                open: (boolean) => {
                    attachment.isOpened = boolean;
                },
                addPhoto: () => {
                    document.getElementById('messages-container-input__attachment').click()
                },
                addDocs: () => {
                    document.getElementById('messages-container-input__attachment-docs').click()
                },
                addVideo: () => {
                    document.getElementById('messages-container-input__attachment-video').click()
                },
                change: ($event) => {
                    if ($event.target.files[0]) {
                        
                        replaceImages([]);
                        toggleModalSendImages(true);
                        $event.target.files.forEach(item => {
                            let fr = new FileReader();
                            fr.addEventListener("load", function () {
                                createImage(item)
                                    .then((r) => {
                                        if (r.status === 'ok') {
                                            addImage({
                                                name: item.name,
                                                size: item.size,
                                                type: item.type,
                                                id: r.files[0],
                                                src: fr.result,
                                            })
                                        }
                                    })
                            }, false);
                            fr.readAsDataURL(item);
                        })
                    } 
                },
                 changeDocs: ($event) => {
                    if ($event.target.files[0]) {
                        replaceFile([]);
                        toggleModalSendFiles(true);
                        $event.target.files.forEach(item => {
                            let fr = new FileReader();
                            fr.addEventListener("load", function () {
                                createFile(item)
                                    .then((r) => {
                                        if (r.status === 'ok') {
                                            addFiles({
                                                name: item.name,
                                                size: item.size,
                                                type: item.type,
                                                id: r.files[0],
                                                src: fr.result,
                                            })
                                            
                                        }
                                      
                                    })
                            }, false);
                            fr.readAsDataURL(item);
                        })
                    }
                    
                },
                changeVideo: ($event) => {
                    if ($event.target.files[0]) {
                         replaceVideo([]);
                         toggleModalSendVideos(true);
                         $event.target.files.forEach(item => {
                             let fr = new FileReader();
                             fr.addEventListener("load", function () {
                                 createVideo(item)
                                    .then((r) => {
                                         if (r.status === 'ok') {
                                            addVideo({
                                                name: item.name,
                                                size: item.size,
                                                type: item.type,
                                                id: r.files[0],
                                                src: fr.result,
                                            }) 
                                        }
                                      
                                    })
                            }, false);
                            fr.readAsDataURL(item);
                     })
                    }
                 // document.getElementById('messages-container-input__attachment-video').click()
                },  
            })

            return {  
                emojiIndex,
                value,
                textarea,
                isEnter,
                send,
                input,
                smiles,
                attachment,
                openedModalSendFiles,
                openedModalSendImages,
                openedModalSendVideos,
                token,
                isActiveDialog
            }
        }
    }
</script>

<style lang="scss">
    .messages-container-input {
        position: relative;
        width: 100%;
    }
    .messages-container-input__container {
        position: relative;
        display: flex;
        align-items: flex-end;
        width: 100%;
    }
    .messages-container-input__input {
        -webkit-appearance: none;
        -webkit-box-shadow: none;
        -moz-appearance: none;
        -moz-box-shadow: none;
        box-shadow: none;
        outline: none;
        resize: none;
        border: none;
        padding-left: 57px;
        /*display: flex;*/
        /*align-items: center;*/
        width: 100%;

        overflow-y: auto;
        overflow-x: hidden;
        word-wrap: break-word;

        font-family: Segoe UI;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;


        max-height: 150px;


        // padding: 13px 50px 16px 63px;
        border-radius: 31px;

        background: var(--messages-input-wrapper-bg);
        color: var(--font-color);
        caret-color: var(--cursor-input-active);
        text-align: left;
        &::-webkit-scrollbar {
            display: none;
        }
        &[contentEditable=true]:empty:not(:focus):before{
            content:attr(placeholder);
            color: var(--placeholder-color);

            pointer-events: none;
        }
    }
    .messages-container-input__icon {
        background: transparent;
        padding: 0;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .messages-container-input__icon_include {
        position: absolute;
        left: 17px;
        top: 21px;
        transform: translateY(-21px);
    }

    .messages-container-input__icon_smile {
        position: relative;
         top: 21px;
        transform: translateY(-21px);
        margin-left: 21px;
        min-width: 22px;
        min-height: 22px;
    }

    .messages-container-input__icon_micro {
        position: relative;
        bottom: 14px;
        margin-left: 20px;
        margin-right: 4px;
        min-width: 15px;
        min-height: 22px;
    }

    .messages-container-input__icon_airplane {
        position: relative;
     
        margin-left: 16px;
        min-width: 23px;
        min-height: 22px;
        cursor: pointer;
        top: 21px;
        transform: translateY(-21px);
    }
    .messages-container-input__attachments {
        position: absolute;
        bottom: 200%;
        left: -17px;
        width: 192px;
        border-radius: 8px;
        border: 1px solid var(--context-background-color);
        background: var(--context-background-color);
        overflow: hidden;
        text-align: left;
    }
    .messages-container-input__attachment {
        display: flex;
        align-items: center;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;

        padding: 10px 12px;
        cursor: pointer;
        color: var(--user-info-settings-default-svg-fill);
        svg path {
            fill: var(--user-info-settings-default-svg-fill);
        }
        &:hover {
            background: var(--user-info-settings-hover-setting-bg);
            color: var(--font-color);
            svg path {
                fill: var(--font-color);
            }
        }
    }
    .messages-container-input__attachment-icon {
        width: 20px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 13px;
    }
</style>