<template>
    <div class="messenger-content-personal-messages">
        <div class="messenger-content-personal-messages__header"
             :class="{'messenger-content-personal-messages__header_header': selectedGroupDialogs.length}"
        >
            <template v-if="selectedGroupDialogs.length">
                <div class="dialogs-selections">
                    <div class="dialogs-selections__actions-container">
                        <div class="dialogs-selections__checkbox">
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 4.79564L3.10726 6.42235L7.50682 1" stroke="#141427" stroke-width="0.954545" stroke-linecap="round"/>
                            </svg>
                        </div>
                        <div class="dialogs-selections__container">
                            <div class="dialogs-selections__number">
                                {{selectedGroupDialogs.length}}
                            </div>
                            <div v-if="selectedGroupDialogs.length === dialogs.length" class="dialogs-selections__button"
                                 @click="toggleAllSelectedGroupDialogs(false)">
                                Снять выделение
                            </div>
                            <div v-else class="dialogs-selections__button"
                                 @click="toggleAllSelectedGroupDialogs(true)">
                                Выделить все
                            </div>

                        </div>
                    </div>
                    <div class="dialogs-selections__actions-container">
                        <div class="dialogs-selections__button dialogs-selections__button_mr" @click="del">
                            <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.8276 3.8881H0.827637V2.85104C0.827637 2.56459 1.13547 2.33252 1.51512 2.33252H11.1402C11.5198 2.33252 11.8276 2.56459 11.8276 2.85104V3.8881Z" fill="#EDEDEF"/>
                                <path d="M10.0501 14.0001H2.60389C2.09064 14.0001 1.67322 13.6156 1.67322 13.1429V3.14258H10.9809V13.1429C10.9809 13.6156 10.5634 14.0001 10.0501 14.0001ZM2.29371 3.714V13.1429C2.29371 13.3007 2.43276 13.4287 2.60389 13.4287H10.0501C10.2214 13.4287 10.3604 13.3007 10.3604 13.1429V3.714H2.29371Z" fill="#EDEDEF"/>
                                <path d="M7.93483 2.00005H4.21173V0.857197C4.21173 0.38453 4.62928 0 5.14254 0H7.00403C7.51728 0 7.93483 0.38453 7.93483 0.857197V2.00005ZM4.83223 1.42862H7.31434V0.857197C7.31434 0.699601 7.17529 0.571424 7.00403 0.571424H5.14254C4.97128 0.571424 4.83223 0.699601 4.83223 0.857197V1.42862Z" fill="#EDEDEF"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6338 3.15332H2.06696V13.0112C2.06696 13.3314 2.34094 13.5911 2.67885 13.5911H10.0219C10.3598 13.5911 10.6338 13.3314 10.6338 13.0112V3.15332ZM7.87802 11.7134C7.87802 11.8713 8.01694 11.9991 8.18864 11.9991C8.36033 11.9991 8.49911 11.8713 8.49911 11.7134V5.42737C8.49911 5.26953 8.36033 5.1416 8.18864 5.1416C8.01694 5.1416 7.87802 5.26953 7.87802 5.42737V11.7134ZM6.32757 11.9991C6.15601 11.9991 6.01709 11.8713 6.01709 11.7134V5.42737C6.01709 5.26953 6.15601 5.1416 6.32757 5.1416C6.49926 5.1416 6.63818 5.26953 6.63818 5.42737V11.7134C6.63818 11.8713 6.49926 11.9991 6.32757 11.9991ZM4.15417 11.7134C4.15417 11.8713 4.29309 11.9991 4.46478 11.9991C4.63647 11.9991 4.77526 11.8713 4.77526 11.7134V5.42737C4.77526 5.26953 4.63647 5.1416 4.46478 5.1416C4.29309 5.1416 4.15417 5.26953 4.15417 5.42737V11.7134Z" fill="#EDEDEF"/>
                            </svg>
                            Удалить
                        </div>
                        <div class="dialogs-selections__button dialogs-selections__button_mr" @click="move">
                            <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.3432 3.79795H10.5753C10.4669 3.79813 10.3585 3.78898 10.2515 3.77051C10.2141 3.78504 10.1745 3.79293 10.1345 3.79347H0.827637V12.4845C0.828515 13.3211 1.49254 13.999 2.31206 13.9999H15.3432C16.1627 13.999 16.8268 13.3211 16.8276 12.4845V5.31341C16.8268 4.47675 16.1627 3.79885 15.3432 3.79795Z" fill="#EDEDEF"/>
                                <path d="M8.69959 2.63592L7.77287 0.817474C7.51897 0.313936 7.00975 -0.00196406 6.45503 9.1909e-06H2.31206C1.49254 0.000906121 0.828515 0.678808 0.827637 1.51547V3.15488H9.06841C8.92169 3.00097 8.79763 2.82606 8.69959 2.63592Z" fill="#EDEDEF"/>
                            </svg>
                            В папку
                        </div>
                        <div class="dialogs-selections__button dialogs-selections__button_mr">
                            <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0)">
                                    <path d="M13.3137 3.36355L4.98173 0.218902C4.61392 0.0800902 4.20427 0.101899 3.85031 0.272246L0.86835 1.71106C0.340509 1.9654 0.10503 2.58962 0.333436 3.12895L1.62312 6.17369C1.77638 6.53589 2.07227 6.81529 2.44008 6.9538L10.7718 10.0984C11.5136 10.3781 12.3459 10.015 12.6258 9.27324L14.1545 5.22292C14.4342 4.48141 14.0552 3.64323 13.3137 3.36355ZM4.87387 4.03433C4.65401 4.61698 4.00327 4.91052 3.4212 4.69096C2.83854 4.4708 2.54441 3.82065 2.76427 3.238C2.98413 2.65534 3.63457 2.3615 4.21723 2.58107C4.7996 2.80122 5.09373 3.45167 4.87387 4.03433Z" fill="#EDEDEF"/>
                                    <path d="M2.17592 7.65266C1.9985 7.58546 1.83346 7.49439 1.68109 7.38623L4.73142 13.1035C5.10454 13.8028 5.96983 14.0787 6.6692 13.7056L10.4887 11.6673C10.7976 11.5026 11.013 11.2361 11.1339 10.9329C10.9199 10.9175 10.7101 10.8736 10.507 10.7967L2.17592 7.65266Z" fill="#EDEDEF"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0">
                                        <rect width="14" height="14" fill="white" transform="translate(0.246582)"/>
                                    </clipPath>
                                </defs>
                            </svg>
                            Добавить тег
                        </div>
                        <div class="dialogs-selections__button">
                            <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.6706 5.88064H9.83327V3.81442C9.83327 1.71111 8.09756 0 5.96436 0C3.831 0 2.09544 1.71111 2.09544 3.81442V5.88064H1.25814C1.09597 5.88064 0.964355 6.01041 0.964355 6.17029V13.7103C0.964355 13.8702 1.09597 14 1.25814 14H10.6706C10.8327 14 10.9644 13.8702 10.9644 13.7103V6.17029C10.9644 6.01026 10.833 5.88064 10.6706 5.88064ZM5.32154 10.7461C5.13029 10.5697 5.02482 10.3303 5.02482 10.0718C5.02482 9.5611 5.44626 9.14545 5.96436 9.14545C6.48231 9.14545 6.90389 9.56095 6.90389 10.0718C6.90389 10.3303 6.79857 10.5697 6.60717 10.7461C6.54782 10.8008 6.51403 10.8774 6.51403 10.9576V11.9399C6.51403 12.2386 6.2674 12.4818 5.96421 12.4818C5.66102 12.4818 5.41438 12.2386 5.41438 11.9399V10.9576C5.41453 10.8774 5.38089 10.8008 5.32154 10.7461ZM5.96436 2.05609C6.94767 2.05609 7.74766 2.84481 7.74766 3.81442V5.88064H4.18105V3.81442C4.18105 2.84495 4.98104 2.05609 5.96436 2.05609Z" fill="#EDEDEF"/>
                            </svg>
                            Заблокировать
                        </div>
                    </div>

                </div>
            </template>
            <template v-else>
                <template v-if="selectedDialog">
                    <BaseSquareIcon
                            :src="messages.avatar"
                    ></BaseSquareIcon>
                    <div class="messenger-content-personal-messages__name-container">
                        <div class="messenger-content-personal-messages__name">{{messages.name}}</div>
                        <div class="messenger-content-personal-messages__date">{{messages.is_online? 'В сети' : 'Не в сети'}}</div>
                    </div>
                </template>
                <router-link to="/settings" class="settings-button">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.9998 7.54688C9.5443 7.54688 7.54663 9.54454 7.54663 12C7.54663 14.4554 9.5443 16.4531 11.9998 16.4531C14.4552 16.4531 16.4529 14.4554 16.4529 12C16.4529 9.54454 14.4552 7.54688 11.9998 7.54688ZM11.9998 15.0469C10.3197 15.0469 8.95288 13.68 8.95288 12C8.95288 10.3199 10.3197 8.95312 11.9998 8.95312C13.6798 8.95312 15.0466 10.3199 15.0466 12C15.0466 13.68 13.6798 15.0469 11.9998 15.0469Z" fill="#1D1D35"/>
                        <path d="M23.4348 9.77206L20.542 9.19362C20.4008 8.76373 20.2277 8.3457 20.0247 7.94403L21.661 5.49065C21.847 5.21188 21.8104 4.84063 21.5736 4.60354L19.3974 2.42634C19.1603 2.18925 18.7888 2.15259 18.51 2.33859L16.056 3.9757C15.6558 3.77306 15.2378 3.59981 14.8064 3.45773L14.2279 0.565171C14.1622 0.236578 13.8736 0 13.5384 0H10.4616C10.1264 0 9.8378 0.236578 9.77208 0.565218L9.19359 3.45777C8.76216 3.59985 8.34417 3.77306 7.944 3.97574L5.49 2.33864C5.21109 2.15259 4.83961 2.18929 4.60261 2.42639L2.42653 4.60354C2.18972 4.84058 2.15311 5.21183 2.33906 5.49065L3.97542 7.94403C3.77236 8.34575 3.59934 8.76373 3.45806 9.19362L0.565313 9.77206C0.236578 9.83778 0 10.1264 0 10.4615V13.5384C0 13.8736 0.236578 14.1622 0.565266 14.2279L3.45802 14.8063C3.5993 15.2362 3.77231 15.6542 3.97537 16.0559L2.33902 18.5093C2.15306 18.7881 2.18967 19.1593 2.42648 19.3964L4.60261 21.5736C4.8397 21.8107 5.21114 21.8474 5.49 21.6614L7.94405 20.0243C8.34422 20.2269 8.7622 20.4001 9.19364 20.5422L9.77217 23.4348C9.83789 23.7634 10.1265 24 10.4617 24H13.5385C13.8736 24 14.1622 23.7634 14.228 23.4348L14.8065 20.5422C15.2379 20.4001 15.6559 20.2269 16.0561 20.0243L18.5101 21.6614C18.789 21.8474 19.1605 21.8107 19.3975 21.5736L21.5737 19.3964C21.8105 19.1594 21.8471 18.7881 21.6611 18.5093L20.0248 16.0559C20.2278 15.6542 20.4008 15.2362 20.5421 14.8063L23.4349 14.2279C23.7634 14.1622 24 13.8736 24 13.5384V10.4615C24 10.1264 23.7634 9.83778 23.4348 9.77206ZM22.5938 12.9619L19.8531 13.51C19.5926 13.562 19.3837 13.7565 19.3131 14.0126C19.1454 14.6209 18.9037 15.2045 18.5947 15.7473C18.463 15.9784 18.4731 16.264 18.6208 16.4853L20.1713 18.8102L18.8108 20.1714L16.4851 18.62C16.2635 18.4721 15.9773 18.4622 15.7461 18.5944C15.2077 18.9021 14.6241 19.1442 14.0117 19.314C13.756 19.3848 13.562 19.5935 13.51 19.8536L12.962 22.5937H11.038L10.4901 19.8537C10.438 19.5935 10.244 19.3848 9.98836 19.314C9.37599 19.1443 8.79239 18.9022 8.25398 18.5945C8.02261 18.4623 7.73653 18.4722 7.51491 18.62L5.18925 20.1715L3.8287 18.8102L5.37928 16.4854C5.52689 16.2641 5.53697 15.9785 5.40539 15.7473C5.09639 15.2046 4.85466 14.6209 4.68698 14.0126C4.61634 13.7565 4.40747 13.5621 4.14698 13.51L1.40625 12.9619V11.038L4.14694 10.49C4.40742 10.4379 4.6163 10.2435 4.68694 9.9874C4.85461 9.37906 5.09634 8.79542 5.40534 8.25266C5.53697 8.02152 5.52689 7.73591 5.37923 7.51461L3.82866 5.1898L5.1892 3.82851L7.51486 5.37997C7.73648 5.52782 8.02266 5.53771 8.25394 5.40552C8.79234 5.09783 9.37594 4.85573 9.98831 4.68599C10.244 4.61516 10.438 4.40643 10.49 4.14632L11.0381 1.40625H12.9621L13.51 4.14627C13.5621 4.40643 13.7561 4.61512 14.0117 4.68594C14.6241 4.85568 15.2077 5.09774 15.7461 5.40547C15.9775 5.53766 16.2636 5.52777 16.4852 5.37993L18.8108 3.82846L20.1714 5.18976L18.6208 7.51456C18.4732 7.73581 18.4631 8.02147 18.5947 8.25261C18.9037 8.79537 19.1454 9.37901 19.3131 9.98736C19.3838 10.2434 19.5926 10.4379 19.8531 10.4899L22.5938 11.038V12.9619Z" fill="#1D1D35"/>
                    </svg>
                </router-link>
            </template>
        </div>
        <template v-if="selectedDialog">
            <hr class="separator"/>
            <MessagesContainer
            ></MessagesContainer>
        </template>
    </div>
</template>

<script>
    import BaseSquareIcon from '../../Base/BaseSquareIcon'
    import MessagesContainer from '../../MessagesContainer/messages-container.vue'
    import { useMessages } from "../../../composition/useMessages";
    import { useDialogs } from "../../../composition/useDialogs";
    import {useFolder} from "../../../composition/useFolder";
    import {useModals} from "../../../composition/useModals";
    export default {
        components: { BaseSquareIcon, MessagesContainer },
        setup() {
            const { messages } = useMessages();

            const { selectedFolder } = useFolder();

            const { selectedDialog, selectedGroupDialogs, toggleAllSelectedGroupDialogs, dialogs, deleteDialog, getDialogs } = useDialogs()

            const { toggleModalMoveChat, setSelectedDialogsToMove, setCloseCallbackMoveModal } = useModals()

            const del = async () => {
                await deleteDialog(selectedGroupDialogs.value);

                getDialogs(selectedFolder.value);
                toggleAllSelectedGroupDialogs(false);
            }

            const move = () => {
                setSelectedDialogsToMove(selectedGroupDialogs.value);
                setCloseCallbackMoveModal(() => {
                    toggleAllSelectedGroupDialogs(false);
                })
                toggleModalMoveChat(true);
            }

            return {
                messages,
                selectedDialog,

                selectedGroupDialogs,
                toggleAllSelectedGroupDialogs,
                dialogs,
                del,
                move,
            }
        }
    }
</script>

<style lang="scss" src="./messenger-content-personal-messages.scss"></style>