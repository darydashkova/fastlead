<template>
    <div class="modal-edit-folders-new" @mousedown.self="close">
        <div class="modal-edit-folders-new__body">
            <div class="modal-edit-folders-new__header">
                <div class="modal-edit-folders-new__header_title">Редактировать папки</div>
                <div class="modal-edit-folders-new__header_close pointer" @click="closeModalFoldersEditNew">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.6278 0.372265C15.3894 0.133933 15.0661 4.57764e-05 14.729 4.57764e-05C14.3919 4.57764e-05 14.0686 0.133933 13.8302 0.372265L8 6.20243L2.16983 0.372265C1.93143 0.133933 1.60813 4.57764e-05 1.27103 4.57764e-05C0.933923 4.57764e-05 0.610622 0.133933 0.372219 0.372265C0.133887 0.610668 0 0.933969 0 1.27107C0 1.60817 0.133887 1.93148 0.372219 2.16988L6.20239 8.00005L0.372219 13.8302C0.133887 14.0686 0 14.3919 0 14.729C0 15.0661 0.133887 15.3894 0.372219 15.6278C0.610622 15.8662 0.933923 16 1.27103 16C1.60813 16 1.93143 15.8662 2.16983 15.6278L8 9.79766L13.8302 15.6278C14.0686 15.8662 14.3919 16 14.729 16C15.0661 16 15.3894 15.8662 15.6278 15.6278C15.8661 15.3894 16 15.0661 16 14.729C16 14.3919 15.8661 14.0686 15.6278 13.8302L9.79761 8.00005L15.6278 2.16988C15.8661 1.93148 16 1.60817 16 1.27107C16 0.933969 15.8661 0.610668 15.6278 0.372265Z" fill="#9797BB"/>
                    </svg>
                </div>
            </div>
            <div class="modal-edit-folders-new__body_title">
                Мои папки
            </div>
                <div class="modal-edit-folders-new__search">
                    <BaseSearchInput @handler="getValueSearch" :placeholder="'Поиск'"></BaseSearchInput>
                </div>
            <div class="modal-edit-folders-new__folders-list">
                <div class="modal-edit-folders-new__container scroll-poiner" ref="content">
                    <template v-for="(folder, index) in newFoldersArray" :key="index">
                        <div class="modal-edit-folders-new__folder pointer" :class="{'folderActive': countArrayFolder[index].isFolderActive}" v-if="!folder.is_default"
                             @click="clickParentFolder(index, folder.folder_id)"> <!--v-if="!folder.is_default && folder.editing_possible" "toggleModalCreateFolder(true, folder.folder_id)"-->
                            <div class="modal-edit-folders-new__folder-container">
                                <div class="modal-edit-folders-new__name">
                                    {{folder.name}}
                                </div>
                                <div v-if="!folder.folders" class="modal-edit-folders-new__count">
                                    {{folder.dialogues_count}} чатов, 0 папок
                                </div>
                                <div v-else class="modal-edit-folders-new__count">
                                    {{folder.dialogues_count}} чатов, {{folder.folders.length}} папок :
                                    <template v-for="(nameFolder, kindex) in folder.folders">
                                            {{nameFolder.name}},
                                    </template>
                                </div>
                            </div>
                            <svg v-if="folder.folders" class="modal-edit-folders-new__arrov" :class="{'arrov-active': countArrayFolder[index].isFolderActive}" width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.7508 0.247421C11.6711 0.169022 11.5763 0.106794 11.4719 0.0643287C11.3674 0.0218632 11.2554 0 11.1423 0C11.0291 0 10.9171 0.0218632 10.8127 0.0643287C10.7082 0.106794 10.6134 0.169022 10.5338 0.247421L6.6085 4.07837C6.52883 4.15677 6.43404 4.219 6.3296 4.26146C6.22516 4.30393 6.11314 4.32579 6 4.32579C5.88686 4.32579 5.77484 4.30393 5.6704 4.26146C5.56596 4.219 5.47117 4.15677 5.3915 4.07837L1.46623 0.247421C1.38655 0.169022 1.29176 0.106794 1.18732 0.0643287C1.08289 0.0218632 0.970865 0 0.857725 0C0.744585 0 0.632564 0.0218632 0.528125 0.0643287C0.423686 0.106794 0.328896 0.169022 0.249222 0.247421C0.0895969 0.404141 0 0.616141 0 0.837119C0 1.0581 0.0895969 1.2701 0.249222 1.42682L4.18306 5.26613C4.66515 5.73605 5.31865 6 6 6C6.68135 6 7.33485 5.73605 7.81694 5.26613L11.7508 1.42682C11.9104 1.2701 12 1.0581 12 0.837119C12 0.616141 11.9104 0.404141 11.7508 0.247421Z" fill="#9797BB"/>
                            </svg>
                            <div v-if="deletingIds.find(i => i === folder.folder_id)" @click.stop="removeFromDel(folder.folder_id)" class="modal-edit-folders-new__cancel-delete pointer">
                               Отмена
                            </div>
                            <svg v-else @click.stop="addToDel(folder.folder_id)" class="modal-edit-folders-new__delete pointer" width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.4167 3.66667H14.575C14.3622 2.63213 13.7993 1.70257 12.9812 1.03466C12.163 0.366749 11.1395 0.00133331 10.0833 0L8.25 0C7.19381 0.00133331 6.17038 0.366749 5.35219 1.03466C4.534 1.70257 3.97109 2.63213 3.75833 3.66667H0.916667C0.673552 3.66667 0.440394 3.76324 0.268485 3.93515C0.0965771 4.10706 0 4.34022 0 4.58333C0 4.82645 0.0965771 5.05961 0.268485 5.23151C0.440394 5.40342 0.673552 5.5 0.916667 5.5H1.83333V17.4167C1.83479 18.6318 2.31814 19.7967 3.17737 20.656C4.0366 21.5152 5.20154 21.9985 6.41667 22H11.9167C13.1318 21.9985 14.2967 21.5152 15.156 20.656C16.0152 19.7967 16.4986 18.6318 16.5 17.4167V5.5H17.4167C17.6598 5.5 17.8929 5.40342 18.0649 5.23151C18.2368 5.05961 18.3333 4.82645 18.3333 4.58333C18.3333 4.34022 18.2368 4.10706 18.0649 3.93515C17.8929 3.76324 17.6598 3.66667 17.4167 3.66667ZM8.25 1.83333H10.0833C10.6519 1.83403 11.2064 2.01059 11.6706 2.33882C12.1349 2.66705 12.4863 3.13087 12.6766 3.66667H5.65675C5.84704 3.13087 6.19841 2.66705 6.66269 2.33882C7.12697 2.01059 7.68142 1.83403 8.25 1.83333ZM14.6667 17.4167C14.6667 18.146 14.3769 18.8455 13.8612 19.3612C13.3455 19.8769 12.646 20.1667 11.9167 20.1667H6.41667C5.68732 20.1667 4.98785 19.8769 4.47212 19.3612C3.9564 18.8455 3.66667 18.146 3.66667 17.4167V5.5H14.6667V17.4167Z" fill="#EB5757"/>
                                <path d="M7.33329 16.4998C7.57641 16.4998 7.80956 16.4032 7.98147 16.2313C8.15338 16.0594 8.24996 15.8263 8.24996 15.5832V10.0832C8.24996 9.84005 8.15338 9.6069 7.98147 9.43499C7.80956 9.26308 7.57641 9.1665 7.33329 9.1665C7.09018 9.1665 6.85702 9.26308 6.68511 9.43499C6.5132 9.6069 6.41663 9.84005 6.41663 10.0832V15.5832C6.41663 15.8263 6.5132 16.0594 6.68511 16.2313C6.85702 16.4032 7.09018 16.4998 7.33329 16.4998Z" fill="#EB5757"/>
                                <path d="M10.9999 16.4998C11.243 16.4998 11.4762 16.4032 11.6481 16.2313C11.82 16.0594 11.9166 15.8263 11.9166 15.5832V10.0832C11.9166 9.84005 11.82 9.6069 11.6481 9.43499C11.4762 9.26308 11.243 9.1665 10.9999 9.1665C10.7568 9.1665 10.5236 9.26308 10.3517 9.43499C10.1798 9.6069 10.0833 9.84005 10.0833 10.0832V15.5832C10.0833 15.8263 10.1798 16.0594 10.3517 16.2313C10.5236 16.4032 10.7568 16.4998 10.9999 16.4998Z" fill="#EB5757"/>
                            </svg>
                        </div>
                        <div v-if="countArrayFolder[index].isFolderActive" class="modal-edit-folders-new__folder-child pointer" :class="{'folderActive': countArrayFolder[index].isFolderActive}"
                             @click="openModalEditSelectFolder(folder.folder_id)"> <!--v-if="!folder.is_default && folder.editing_possible" "toggleModalCreateFolder(true, folder.folder_id)"-->
                            <div class="modal-edit-folders-new__folder-container">
                                <div class="modal-edit-folders-new__name">
                                    {{folder.name}}
                                </div>
                                <div class="modal-edit-folders-new__count">
                                    {{folder.dialogues_count}} чатов
                                </div>
                            </div>
                            <div v-if="deletingIds.find(i => i === folder.folder_id)" @click.stop="removeFromDel(folder.folder_id)" class="modal-edit-folders-new__cancel-delete pointer">
                               Отмена
                            </div>
                            <svg v-else @click.stop="addToDel(folder.folder_id)" class="modal-edit-folders-new__delete pointer" width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.4167 3.66667H14.575C14.3622 2.63213 13.7993 1.70257 12.9812 1.03466C12.163 0.366749 11.1395 0.00133331 10.0833 0L8.25 0C7.19381 0.00133331 6.17038 0.366749 5.35219 1.03466C4.534 1.70257 3.97109 2.63213 3.75833 3.66667H0.916667C0.673552 3.66667 0.440394 3.76324 0.268485 3.93515C0.0965771 4.10706 0 4.34022 0 4.58333C0 4.82645 0.0965771 5.05961 0.268485 5.23151C0.440394 5.40342 0.673552 5.5 0.916667 5.5H1.83333V17.4167C1.83479 18.6318 2.31814 19.7967 3.17737 20.656C4.0366 21.5152 5.20154 21.9985 6.41667 22H11.9167C13.1318 21.9985 14.2967 21.5152 15.156 20.656C16.0152 19.7967 16.4986 18.6318 16.5 17.4167V5.5H17.4167C17.6598 5.5 17.8929 5.40342 18.0649 5.23151C18.2368 5.05961 18.3333 4.82645 18.3333 4.58333C18.3333 4.34022 18.2368 4.10706 18.0649 3.93515C17.8929 3.76324 17.6598 3.66667 17.4167 3.66667ZM8.25 1.83333H10.0833C10.6519 1.83403 11.2064 2.01059 11.6706 2.33882C12.1349 2.66705 12.4863 3.13087 12.6766 3.66667H5.65675C5.84704 3.13087 6.19841 2.66705 6.66269 2.33882C7.12697 2.01059 7.68142 1.83403 8.25 1.83333ZM14.6667 17.4167C14.6667 18.146 14.3769 18.8455 13.8612 19.3612C13.3455 19.8769 12.646 20.1667 11.9167 20.1667H6.41667C5.68732 20.1667 4.98785 19.8769 4.47212 19.3612C3.9564 18.8455 3.66667 18.146 3.66667 17.4167V5.5H14.6667V17.4167Z" fill="#EB5757"/>
                                <path d="M7.33329 16.4998C7.57641 16.4998 7.80956 16.4032 7.98147 16.2313C8.15338 16.0594 8.24996 15.8263 8.24996 15.5832V10.0832C8.24996 9.84005 8.15338 9.6069 7.98147 9.43499C7.80956 9.26308 7.57641 9.1665 7.33329 9.1665C7.09018 9.1665 6.85702 9.26308 6.68511 9.43499C6.5132 9.6069 6.41663 9.84005 6.41663 10.0832V15.5832C6.41663 15.8263 6.5132 16.0594 6.68511 16.2313C6.85702 16.4032 7.09018 16.4998 7.33329 16.4998Z" fill="#EB5757"/>
                                <path d="M10.9999 16.4998C11.243 16.4998 11.4762 16.4032 11.6481 16.2313C11.82 16.0594 11.9166 15.8263 11.9166 15.5832V10.0832C11.9166 9.84005 11.82 9.6069 11.6481 9.43499C11.4762 9.26308 11.243 9.1665 10.9999 9.1665C10.7568 9.1665 10.5236 9.26308 10.3517 9.43499C10.1798 9.6069 10.0833 9.84005 10.0833 10.0832V15.5832C10.0833 15.8263 10.1798 16.0594 10.3517 16.2313C10.5236 16.4032 10.7568 16.4998 10.9999 16.4998Z" fill="#EB5757"/>
                            </svg>
                        </div>
                         <template v-for="(childFolder, jindex) in folder.folders" :key="jindex">
                            <div @click="openModalEditSelectFolderChild(folder.folder_id, childFolder.folder_id)" v-if="countArrayFolder[index].isFolderActive" class="modal-edit-folders-new__folder-child pointer"
                                >
                                <div class="modal-edit-folders-new__folder-container">
                                    <div class="modal-edit-folders-new__name">
                                        {{childFolder.name}}
                                    </div>
                                    <div v-if="childFolder.dialogues_count == 1, 21, 31, 41, 51" class="modal-edit-folders-new__count">
                                        {{childFolder.dialogues_count}} чат
                                    </div>
                                    <div v-else-if="childFolder.dialogues_count > 21 && childFolder.dialogues_count < 24" class="modal-edit-folders-new__count">
                                        {{childFolder.dialogues_count}} чата
                                    </div>
                                    <div v-else class="modal-edit-folders-new__count">
                                        {{childFolder.dialogues_count}} чатов
                                    </div>
                                </div>
                                <div v-if="deletingIds.find(i => i === childFolder.folder_id)" @click.stop="removeFromDel(childFolder.folder_id)" class="modal-edit-folders-new__cancel-delete pointer">
                                Отмена
                                </div>
                                <svg v-else @click.stop="addToDel(childFolder.folder_id)" class="modal-edit-folders-new__delete pointer" width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.4167 3.66667H14.575C14.3622 2.63213 13.7993 1.70257 12.9812 1.03466C12.163 0.366749 11.1395 0.00133331 10.0833 0L8.25 0C7.19381 0.00133331 6.17038 0.366749 5.35219 1.03466C4.534 1.70257 3.97109 2.63213 3.75833 3.66667H0.916667C0.673552 3.66667 0.440394 3.76324 0.268485 3.93515C0.0965771 4.10706 0 4.34022 0 4.58333C0 4.82645 0.0965771 5.05961 0.268485 5.23151C0.440394 5.40342 0.673552 5.5 0.916667 5.5H1.83333V17.4167C1.83479 18.6318 2.31814 19.7967 3.17737 20.656C4.0366 21.5152 5.20154 21.9985 6.41667 22H11.9167C13.1318 21.9985 14.2967 21.5152 15.156 20.656C16.0152 19.7967 16.4986 18.6318 16.5 17.4167V5.5H17.4167C17.6598 5.5 17.8929 5.40342 18.0649 5.23151C18.2368 5.05961 18.3333 4.82645 18.3333 4.58333C18.3333 4.34022 18.2368 4.10706 18.0649 3.93515C17.8929 3.76324 17.6598 3.66667 17.4167 3.66667ZM8.25 1.83333H10.0833C10.6519 1.83403 11.2064 2.01059 11.6706 2.33882C12.1349 2.66705 12.4863 3.13087 12.6766 3.66667H5.65675C5.84704 3.13087 6.19841 2.66705 6.66269 2.33882C7.12697 2.01059 7.68142 1.83403 8.25 1.83333ZM14.6667 17.4167C14.6667 18.146 14.3769 18.8455 13.8612 19.3612C13.3455 19.8769 12.646 20.1667 11.9167 20.1667H6.41667C5.68732 20.1667 4.98785 19.8769 4.47212 19.3612C3.9564 18.8455 3.66667 18.146 3.66667 17.4167V5.5H14.6667V17.4167Z" fill="#EB5757"/>
                                    <path d="M7.33329 16.4998C7.57641 16.4998 7.80956 16.4032 7.98147 16.2313C8.15338 16.0594 8.24996 15.8263 8.24996 15.5832V10.0832C8.24996 9.84005 8.15338 9.6069 7.98147 9.43499C7.80956 9.26308 7.57641 9.1665 7.33329 9.1665C7.09018 9.1665 6.85702 9.26308 6.68511 9.43499C6.5132 9.6069 6.41663 9.84005 6.41663 10.0832V15.5832C6.41663 15.8263 6.5132 16.0594 6.68511 16.2313C6.85702 16.4032 7.09018 16.4998 7.33329 16.4998Z" fill="#EB5757"/>
                                    <path d="M10.9999 16.4998C11.243 16.4998 11.4762 16.4032 11.6481 16.2313C11.82 16.0594 11.9166 15.8263 11.9166 15.5832V10.0832C11.9166 9.84005 11.82 9.6069 11.6481 9.43499C11.4762 9.26308 11.243 9.1665 10.9999 9.1665C10.7568 9.1665 10.5236 9.26308 10.3517 9.43499C10.1798 9.6069 10.0833 9.84005 10.0833 10.0832V15.5832C10.0833 15.8263 10.1798 16.0594 10.3517 16.2313C10.5236 16.4032 10.7568 16.4998 10.9999 16.4998Z" fill="#EB5757"/>
                                </svg>
                            </div>
                        </template>
                    </template>
                </div>
            </div>
            <BaseModalText class="padding-modals base-modal-text_uppercase base-modal-text_hovered pointer" @click="openCreateNewFolder()">
                Создать новую папку
            </BaseModalText>
            <div class="modal-edit-folders-new__text">
                Вы можете создать папки с нужными чатами и переключаться между ними
            </div>
            <div class="modal-edit-folders-new__buttons">
                <BaseButton
                        class="base-button_enter modal-edit-folders-new__buttons_enter"
                        @click="save"
                >
                    Сохранить
                </BaseButton>
                <BaseButton
                        class="base-button_cancel modal-edit-folders-new__buttons_cancel"
                        @click="closeModalFoldersEditNew"
                >
                    Отмена
                </BaseButton>
            </div>
        </div>
    </div>
    <ModalEditSelectFolder v-if="toggleModalEditSelectFolder" :id="foldersSendId" @closeModalEditSelect="closeModalEditSelect()"></ModalEditSelectFolder>
    <ModalCreateFolderNew v-if="toggleModalCreateNewFolder" @closeCreateNewFolder="closeCreateNewFolder()" @updateFolders="isGetFolders=true"></ModalCreateFolderNew>
    <ModalEditSelectFolderChild v-if="toggleModalEditSelectFolderChild" :id="foldersSendId" :child="foldersChildSendId" @closeModalEditSelectChild="closeModalEditSelectChild()"></ModalEditSelectFolderChild>
</template>

<script>
    import {ref, watch, onUpdated} from 'vue'

    import BaseModalText from '@/components/Base/BaseModalText.vue'
    import BaseModalHint from '@/components/Base/BaseModalHint.vue'
    import BaseModalHeader from '@/components/Base/BaseModalHeader.vue'
    import BaseButton from '@/components/Base/BaseButton.vue'
    import ModalConfirmDelete from '@/components/Modals/ModalConfirmDelete.vue'
    import BaseSearchInput from '@/components/Base/BaseSearchInput.vue'

    import {useFolder} from "@/composition/useFolder";
    import {useModals} from "@/composition/useModals";
    import {useDialogs} from "@/composition/useDialogs";

    import { reactive, computed, onMounted } from 'vue';
    import {useModalConfirmDelete} from "@/composition/useModalConfirmDelete";

    import ModalEditSelectFolder from "@/components/Modals/dialogs/ModalEditSelectFolder.vue"
    import ModalEditSelectFolderChild from '@/components/Modals/dialogs/ModalEditSelectFolderChild.vue'
    import ModalCreateFolderNew from "@/components/Modals/dialogs/ModalCreateFolderNew.vue" 

    export default {
        emits: [],
        components: {
            BaseModalText,
            BaseModalHint,
            BaseModalHeader,
            BaseButton,
            BaseSearchInput,

            ModalConfirmDelete,

            ModalEditSelectFolder,
            ModalEditSelectFolderChild,
            ModalCreateFolderNew,
        },
        props:{},
        setup(props, {emit}) {
            const { folders, deleteFolder, getAllFolders, selectedParentFolder, foldersInSelectedFolder, getAllFoldersInFolder } = useFolder();
            const { toggleModalEditFolders, toggleModalCreateFolder, setCloseCallbackCreateFolder, createFolderParentId } = useModals();
            const { toggleModalConfirmDelete, openedModalConfirmDelete, setSaveCallbackModalConfirmDelete, setTextModalConfirmDelete } = useModalConfirmDelete()


            const deletingIds = reactive({
                data: [],
            })

            const toggleModalCreateNewFolder = ref(false)

            const openCreateNewFolder = () => {
                toggleModalCreateNewFolder.value = true
            }

            const closeCreateNewFolder = () => {
                toggleModalCreateNewFolder.value = false
            }

            const addToDel = (id) => {
                if (!deletingIds.data.find(i => i === id)) {
                    deletingIds.data.push(id);
                }
            }

            const removeFromDel = (id) => {
                deletingIds.data = deletingIds.data.filter(i => i !== id);
            }

            const close = () => {
                toggleModalEditFolders(false);
            }

            const save = () => {
                if (deletingIds.data.length) {
                    setSaveCallbackModalConfirmDelete(saveCallback);
                    setTextModalConfirmDelete(`Вы точно хотите удалить ${deletingIds.data.length} папок?`)
                    toggleModalConfirmDelete(true);
                } else {
                    toggleModalEditFolders(false);
                }
                getAllFolders()
            }
            const saveCallback = () => {
                deleteFolder(deletingIds.data)
                    .then(() => {
                        toggleModalEditFolders(false);
                        if (selectedParentFolder.value) {
                            getAllFoldersInFolder(selectedParentFolder.value, true);
                        } else {
                            getAllFolders();
                        }
                    })
            }
            const createNewFolder = () => {
                if (selectedParentFolder.value) {
                    setCloseCallbackCreateFolder(() => getAllFoldersInFolder(selectedParentFolder.value, true))
                    createFolderParentId.value = selectedParentFolder.value;
                }
                toggleModalCreateFolder(true);
            }

            const newFoldersArray = ref()
            const newFolderChildArray = ref()

            const getValueSearch = (value) => {
                if(value){
                    newFoldersArray.value = newFoldersArray.value.filter(item => item.name.includes(value))
                    newFolderChildArray.value = newFolderChildArray.value.filter(item => item.name.includes(value))

                } else{
                    newFoldersArray.value = folders.value
                }
            }

            const isGetFolders = ref(true)

            const folderActiveChildList = ref(true)

            const countArrayFolder = ref([])

            const isActiveParentFolder = (index) => {
                if(!countArrayFolder.value[index].isFolderActive){
                    countArrayFolder.value[index].isFolderActive = true;
                } else{
                    countArrayFolder.value[index].isFolderActive = false
                }
            }

            const clickParentFolder = (index, folder_id) => {
                    if (folders.value[index].folders){
                        isActiveParentFolder(index)
                    } else {
                        /* toggleModalCreateFolder(true, folder_id) */
                        toggleModalEditSelectFolder.value = true
                        foldersSendId.value = folder_id
                    }
            }

            const foldersSendId = ref(1)
            const foldersChildSendId = ref(1)


            const toggleModalEditSelectFolder = ref(false)
            const toggleModalEditSelectFolderChild = ref(false)

            const closeModalEditSelect = () => {
                toggleModalEditSelectFolder.value = false
            }
            const closeModalEditSelectChild = () => {
                toggleModalEditSelectFolderChild.value = false
            }

            const openModalEditSelectFolder = (id) => {
                toggleModalEditSelectFolder.value = true
                foldersSendId.value = id
            }
            const openModalEditSelectFolderChild = (parent_id, child_id) => {
                toggleModalEditSelectFolderChild.value = true
                foldersSendId.value = parent_id
                foldersChildSendId.value = child_id
            }

            const closeModalFoldersEditNew = () => {
                emit('closeModalEditFoldersNew')
            }

            watch(() => {
                if(isGetFolders.value){
                    getAllFolders()
                    .then((r)=> {
                        newFoldersArray.value = folders.value
                        isGetFolders.value = false

                        for(i=0; i < folders.value.length; i++){
                            countArrayFolder.value.push({isFolderActive: false})
                        }
                    })
                } 
             
            })

            /* onUpdated(() => {
                getAllFolders()
            }) */

            

            return {
                
                folders: selectedParentFolder.value? foldersInSelectedFolder : folders,
                toggleModalEditFolders,
                createNewFolder,

                addToDel,
                removeFromDel,
                deletingIds: computed(() => deletingIds.data),

                close,
                save,
                saveCallback,
                toggleModalCreateFolder,
                openedModalConfirmDelete,

                getValueSearch,
                newFoldersArray,
                newFolderChildArray,
                isGetFolders,
                folderActiveChildList,
                countArrayFolder,
                isActiveParentFolder,

                clickParentFolder,

                toggleModalEditSelectFolder,
                openModalEditSelectFolder,
                closeModalEditSelect,

                foldersSendId,

                toggleModalCreateNewFolder,
                openCreateNewFolder,
                closeCreateNewFolder,

                foldersChildSendId,

                toggleModalEditSelectFolderChild,
                openModalEditSelectFolderChild,
                closeModalEditSelectChild,

                closeModalFoldersEditNew,
            }
        }
    }
</script>

<style lang="scss">

    .modal-edit-folders-new {
        
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.39);
        z-index: 999;
        display: flex;
        justify-content: center;
        align-items: center;

        &__body{
            width: 520px;
            background: #252544;
            border-radius: 6px;
            padding: 27px 0 20px;
            text-align: left;
            &_title{
                font-size: 14px;
                color: #CFCFE4;
                padding: 22px 24px;
            }
        }
        &__header{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 24px 26px;
            border-bottom: 1px solid #1D1D35;
            &_title{
                color: #F0F0FA;
                font-size: 24px;
                font-weight: 700;
            }
        }
        &__folders-list {
            position: relative;
            display: flex;
            justify-content: center;
            height: 276px;
            
            &_scroll {
                height: 276px;
                &::-webkit-scrollbar {
                    display: none;
                }
            }
        }
        &__container{
            overflow-y: auto;
            height: 100%;
            background: #1D1D35;
            width: 472px;
            border-radius: 0px 0px 6px 6px;
            border: 1px solid #1D1D35;
        }
        &__folder{
            border: 1px solid #1D1D35;
            padding: 12px 20px;
            position: relative;
            display: flex;
            align-items: center;
            transition: .2s ease;
            border-top: 1px solid #252544;
            &:first-child{
                border-top: none;
            }
            &:hover {
                background: var(--modal-element-hover-bg-color);
                border-top: 1px solid none;
            }
        }
        &__folder-child{
            padding: 12px 20px;
            position: relative;
            display: flex;
            align-items: center;
            transition: .2s ease;
            background: #252544;
            border-left: 1px solid #1D1D35;
            border-right: 1px solid #1D1D35;
            cursor: pointer;
            &:hover {
                background: var(--modal-element-hover-bg-color);
            }
        }
        &__search{
            margin: 8px auto 0;
            width: 472px;
            height: 69px;
            background: #1D1D35;
            display: flex;
            justify-content: center;
            border-radius: 6px 6px 0px 0px;
            padding: 16px;
            &_input{
                width: 410px;
            }
        }
        &__delete{
            position: absolute;
            right: 19px;
        }
        &__arrov{
            position: absolute;
            right: 80px;
            transition: all 0.3s;
        }
        &__cancel-delete{
            position: absolute;
            right: 19px;
            padding: 6px 7px;
            background: var(--button-cancel-color);
            border-radius: 5px;
            color: #5EC075;
        }
        &__btn-text{
            font-style: normal;
            font-weight: normal;
            font-size: 18px;
            line-height: 24px;
            background: #252544;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        &__text{
            color: #9797BB;
            padding-left: 26px;
            width: 347px;
            font-size: 14px;
        }
        &__name{
            color: var(--modal-font-color);
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 21px;

            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            max-width: 235px;
        }
        &__count{
            color: var(--modal-sub-font-color);
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            line-height: 16px;

            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            max-width: 235px;
        }
        &__buttons{
            padding: 18px 20px 0px;
            width: 100%;
            display: flex;
            justify-content: flex-start;
            margin-top: 22px;
            border-top: 1px solid #1D1D35;
            align-items: center;
            &_cancel{
                margin-left: 22px;
                padding-top: 7px;
            }
        }
    }

    .padding-modals{
        margin: 30px 26px 0px;
    }

    .folderActive{
        background: #252544;
    }
    .arrov-active{
        transform: rotate(180deg);
        transition: all 0.3s;
    }
</style>