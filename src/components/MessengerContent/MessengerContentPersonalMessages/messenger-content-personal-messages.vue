<template>
    <div class="messenger-content-personal-messages">
        <div class="messenger-content-personal-messages__header"
             :class="{'messenger-content-personal-messages__header_header': selectedGroupDialogs.length}"
        >
            <DialogSelections
                    v-if="selectedGroupDialogs.length"
                :length="selectedGroupDialogs.length"
                :is-full-length="selectedGroupDialogs.length === dialogs.length"
                @del="del"
                @move="move"
            ></DialogSelections>
            <template v-else>
                <template v-if="selectedDialog">
                    <BaseCircleIcon
                            v-if="messages.avatar"
                            class="base-circle-icon__52"
                            :src="messages.avatar"
                    ></BaseCircleIcon>
                    <div class="messenger-content-personal-messages__name-container">
                        <div class="messenger-content-personal-messages__name">{{messages.name}}</div>
                        <div class="messenger-content-personal-messages__date">{{messages.is_online? 'В сети' : 'Не в сети'}}</div>
                    </div>
                    <button class="messenger-content-personal-messages__info-button pointer"
                            @click="toggleOpenedActions(true)"
                            @blur="toggleOpenedActions(false)"
                    >
                        <svg width="5" height="24" viewBox="0 0 5 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.56323 4.97015C3.6678 4.97015 4.56323 4.07472 4.56323 2.97015C4.56323 1.86558 3.6678 0.970154 2.56323 0.970154C1.45866 0.970154 0.563232 1.86558 0.563232 2.97015C0.563232 4.07472 1.45866 4.97015 2.56323 4.97015ZM2.56323 14C3.6678 14 4.56323 13.1046 4.56323 12C4.56323 10.8954 3.6678 9.99999 2.56323 9.99999C1.45866 9.99999 0.563232 10.8954 0.563232 12C0.563232 13.1046 1.45866 14 2.56323 14ZM4.56323 21.0299C4.56323 22.1344 3.6678 23.0299 2.56323 23.0299C1.45866 23.0299 0.563232 22.1344 0.563232 21.0299C0.563232 19.9253 1.45866 19.0299 2.56323 19.0299C3.6678 19.0299 4.56323 19.9253 4.56323 21.0299Z"
                                  fill="var(--sub-text-font-color)"/>
                        </svg>
                        <div class="messenger-content-personal-messages__info-container" v-if="openedActions">
                            <ul class="messenger-content-personal-messages__info-list">
                                <li class="messenger-content-personal-messages__info-element" @click.stop="delDialog">
                                    Удалить
                                </li>
                                <li class="messenger-content-personal-messages__info-element" @click.stop="moveChat">
                                    Переместить в папку
                                </li>
                            </ul>
                        </div>
                    </button>
                </template>
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
    import BaseCircleIcon from '../../Base/BaseCircleIcon'
    import MessagesContainer from '../../MessagesContainer/messages-container.vue'
    import DialogSelections from './DialogSelections/dialogSelections.vue'
    import { useMessages } from "../../../composition/useMessages";
    import { useDialogs } from "../../../composition/useDialogs";
    import {useFolder} from "../../../composition/useFolder";
    import {useModals} from "../../../composition/useModals";
    import { ref } from 'vue'
    import {useModalConfirmDelete} from "../../../composition/useModalConfirmDelete";
    export default {
        components: { BaseCircleIcon, MessagesContainer, DialogSelections },
        setup() {
            const { messages } = useMessages();

            const { selectedFolder } = useFolder();

            const { selectedDialog, selectedGroupDialogs, toggleAllSelectedGroupDialogs, dialogs, deleteDialog, getDialogs, selectDialog } = useDialogs()

            const { toggleModalMoveChat, setSelectedDialogsToMove, setCloseCallbackMoveModal } = useModals()

            const { toggleModalConfirmDelete, setSaveCallbackModalConfirmDelete, setTextModalConfirmDelete } = useModalConfirmDelete()

            const openedActions = ref(false);
            const toggleOpenedActions = (boolean) => {
                openedActions.value = boolean;
            }
            const del = async () => {
                let callback = async () => {
                    await deleteDialog(selectedGroupDialogs.value);
                    getDialogs(selectedFolder.value);
                    toggleAllSelectedGroupDialogs(false);
                }
                setTextModalConfirmDelete(`Вы точно хотите удалить ${selectedGroupDialogs.value.length} чата?`)
                setSaveCallbackModalConfirmDelete(callback);
                toggleModalConfirmDelete(true);
            }

            const move = () => {
                setSelectedDialogsToMove(selectedGroupDialogs.value);
                setCloseCallbackMoveModal(() => {
                    toggleAllSelectedGroupDialogs(false);
                })
                toggleModalMoveChat(true);
            }
            const delDialog = () => {
                let callback = () => deleteDialog([selectedDialog.value])
                    .then(() => {
                        selectDialog(null);
                        getDialogs(selectedFolder.value);
                    })
                setTextModalConfirmDelete(`Вы точно хотите удалить чат с ${messages.value.name}?`)
                setSaveCallbackModalConfirmDelete(callback);
                toggleOpenedActions(false)
                toggleModalConfirmDelete(true);
            }
            const moveChat = () => {
                setSelectedDialogsToMove([selectedDialog.value]);
                toggleModalMoveChat(true);
                toggleOpenedActions(false);
            }

            return {
                messages,
                selectedDialog,

                selectedGroupDialogs,
                dialogs,
                del,
                move,

                delDialog,
                moveChat,
                openedActions,
                toggleOpenedActions,

            }
        }
    }
</script>

<style lang="scss" src="./messenger-content-personal-messages.scss"></style>