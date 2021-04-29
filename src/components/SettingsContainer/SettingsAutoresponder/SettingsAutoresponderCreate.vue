<template>
    <div class="settings-autoresponder-create">
        <template v-if="!isSecondStep">
            <div class="settings-autoresponder-create__input-column">
                <BaseInputGroup
                    :error="!!errors.find(i => i === 'name')"
                    :value="infoToSend.name"
                    :placeholder="'Название автоответчика не отображается у получателей'"
                    :dynamic-id="'settings-autoresponder-create__name'"

                    @inputValue="inputName"
                >
                    Название
                </BaseInputGroup>

                <div class="settings-autoresponder-create__row">
                    <div class="settings-autoresponder-create__input-group">
                        <label class="settings-autoresponder-create__label">
                            Дата запуска
                        </label>
                        <div class="settings-autoresponder-create__iconed-input">
                            <button class="settings-autoresponder-create__input settings-autoresponder-create__input_selector"
                                    @click="toggleOpenedDatepicker(true)"
                                    @blur="toggleOpenedDatepicker(false)"
                            >
                                <div class="settings-autoresponder-create__select-item pointer">
                                    {{time? `${validDate(time, true)} ${validTime(time)}` : 'Выбрать дату'}}
                                </div>
                                <BaseCalendar
                                        :time="time"
                                        @selectDate="selectDate"
                                        v-if="isOpenedDatepicker"
                                ></BaseCalendar>
                            </button>
                            <svg class="settings-autoresponder-create__input-icon" width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 8.30967V5.17684V4.83368C22 3.03846 20.3773 1.57591 18.3609 1.52539V2.32059V3.12036V3.12194V3.57588C18.3609 4.74104 17.3901 5.68888 16.197 5.68888C15.0038 5.68888 14.0331 4.74104 14.0331 3.57588V3.11128V2.31576V1.52023H7.89704V2.31576V3.11128V3.57588C7.89704 4.74104 6.92626 5.68888 5.73298 5.68888C4.53979 5.68888 3.56909 4.74104 3.56909 3.57588V3.12876V3.12602V2.32441V1.52897C1.58609 1.61096 0 3.05926 0 4.83326V5.17642V8.30925V19.3435C0 21.3592 1.68012 23 3.74478 23H18.2551C20.3195 23 21.9997 21.3592 21.9997 19.3435L22 8.30967ZM20.3703 19.3439C20.3703 20.4828 19.4215 21.409 18.2551 21.409H3.74521C2.57887 21.409 1.63008 20.4828 1.63008 19.3439V8.30967H20.3703V19.3439Z" fill="#404054"/>
                                <path d="M4.7915 0.919624V1.52014V2.31566V3.11119V3.57579C4.7915 4.08383 5.21305 4.49541 5.73339 4.49541C6.25356 4.49541 6.67527 4.08383 6.67527 3.57579V3.11119V2.31566V1.52014V0.919624C6.67536 0.411579 6.25365 0 5.73347 0C5.21305 0.000416157 4.7915 0.411995 4.7915 0.919624Z" fill="#404054"/>
                                <path d="M16.1974 0.000427246C15.6771 0.000427246 15.2554 0.412006 15.2554 0.920051V1.52057V2.31609V3.11162V3.57621C15.2554 4.08426 15.677 4.49584 16.1974 4.49584C16.7179 4.49584 17.1396 4.08426 17.1396 3.57621V3.1112V2.31568V1.52015V0.919635C17.1388 0.412006 16.7175 0.000427246 16.1974 0.000427246Z" fill="#404054"/>
                                <path d="M4.68867 14.2523H7.56359C7.94409 14.2523 8.25221 13.9441 8.25221 13.5635V10.688C8.25221 10.3075 7.94405 10 7.56359 10H4.68867C4.30821 10 4 10.3075 4 10.688V13.5635C4.00005 13.9441 4.30821 14.2523 4.68867 14.2523Z" fill="#404054"/>
                                <path d="M4.68867 19.4709H7.56359C7.94409 19.4709 8.25221 19.1627 8.25221 18.7828V15.9067C8.25221 15.5268 7.94405 15.2186 7.56359 15.2186H4.68867C4.30821 15.2186 4 15.5268 4 15.9067V18.7828C4.00005 19.1627 4.30821 19.4709 4.68867 19.4709Z" fill="#404054"/>
                                <path d="M9.94023 19.4709H12.8158C13.1956 19.4709 13.5045 19.1627 13.5045 18.7828V15.9067C13.5045 15.5268 13.1956 15.2186 12.8158 15.2186H9.94023C9.55977 15.2186 9.2522 15.5268 9.2522 15.9067V18.7828C9.25224 19.1627 9.55977 19.4709 9.94023 19.4709Z" fill="#404054"/>
                                <path d="M15.193 14.2523H18.0679C18.4491 14.2523 18.7566 13.9441 18.7566 13.5635V10.688C18.7566 10.3075 18.4491 10 18.0679 10H15.193C14.8125 10 14.5044 10.3075 14.5044 10.688V13.5635C14.5044 13.9441 14.8125 14.2523 15.193 14.2523ZM15.3444 10.9292C15.3444 10.8799 15.3843 10.8386 15.4343 10.8386H17.8267C17.8766 10.8386 17.9172 10.8799 17.9172 10.9292V13.3223C17.9172 13.3723 17.8766 13.4122 17.8267 13.4122H15.4343C15.3843 13.4122 15.3444 13.3723 15.3444 13.3223V10.9292Z" fill="#404054"/>
                                <path d="M15.193 19.4709H18.0679C18.4491 19.4709 18.7566 19.1627 18.7566 18.7828V15.9067C18.7566 15.5268 18.4491 15.2186 18.0679 15.2186H15.193C14.8125 15.2186 14.5044 15.5268 14.5044 15.9067V18.7828C14.5044 19.1627 14.8125 19.4709 15.193 19.4709Z" fill="#404054"/>
                                <path d="M9.94082 14.2523H12.8157C13.1955 14.2523 13.5044 13.9441 13.5044 13.5635V10.688C13.5044 10.3075 13.1956 10 12.8157 10H9.94082C9.55964 10 9.2522 10.3075 9.2522 10.688V13.5635C9.2522 13.9441 9.55964 14.2523 9.94082 14.2523Z" fill="#404054"/>
                            </svg>
                        </div>
                    </div>
                    <div class="settings-autoresponder-create__input-group">
                        <label class="settings-autoresponder-create__label">
                            Активация автоответчика от:
                        </label>
                        <div class="settings-autoresponder-create__iconed-input">
                            <button class="settings-autoresponder-create__input settings-autoresponder-create__input_selector pointer"
                                    @click="toggleOpenedSelectEvents"
                                    @blur="toggleOpenedSelectEvents(false)"
                            >
                                <div class="settings-autoresponder-create__select-item">
                                    <template v-if="selectedEvent === 'OnMessage'">
                                        <svg class="settings-autoresponder-create__select-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.3333 0H2.66667C1.95942 0 1.28115 0.280952 0.781049 0.781049C0.280952 1.28115 0 1.95942 0 2.66667L0 10.6667C0 11.3739 0.280952 12.0522 0.781049 12.5523C1.28115 13.0524 1.95942 13.3333 2.66667 13.3333H4.6L7.56733 15.842C7.68771 15.9439 7.8403 15.9998 7.998 15.9998C8.1557 15.9998 8.30829 15.9439 8.42867 15.842L11.4 13.3333H13.3333C14.0406 13.3333 14.7189 13.0524 15.219 12.5523C15.719 12.0522 16 11.3739 16 10.6667V2.66667C16 1.95942 15.719 1.28115 15.219 0.781049C14.7189 0.280952 14.0406 0 13.3333 0V0ZM14.6667 10.6667C14.6667 11.0203 14.5262 11.3594 14.2761 11.6095C14.0261 11.8595 13.687 12 13.3333 12H11.4C11.0849 12.0001 10.7799 12.1118 10.5393 12.3153L8 14.46L5.462 12.3153C5.22104 12.1115 4.9156 11.9998 4.6 12H2.66667C2.31304 12 1.97391 11.8595 1.72386 11.6095C1.47381 11.3594 1.33333 11.0203 1.33333 10.6667V2.66667C1.33333 2.31304 1.47381 1.97391 1.72386 1.72386C1.97391 1.47381 2.31304 1.33333 2.66667 1.33333H13.3333C13.687 1.33333 14.0261 1.47381 14.2761 1.72386C14.5262 1.97391 14.6667 2.31304 14.6667 2.66667V10.6667Z"
                                                  fill="var(--settings-dropdown-font-color)"/>
                                            <path d="M4.66667 4.66732H8C8.17681 4.66732 8.34638 4.59708 8.4714 4.47206C8.59643 4.34703 8.66667 4.17746 8.66667 4.00065C8.66667 3.82384 8.59643 3.65427 8.4714 3.52925C8.34638 3.40422 8.17681 3.33398 8 3.33398H4.66667C4.48986 3.33398 4.32029 3.40422 4.19526 3.52925C4.07024 3.65427 4 3.82384 4 4.00065C4 4.17746 4.07024 4.34703 4.19526 4.47206C4.32029 4.59708 4.48986 4.66732 4.66667 4.66732Z"
                                                  fill="var(--settings-dropdown-font-color)"/>
                                            <path d="M11.3333 6H4.66667C4.48986 6 4.32029 6.07024 4.19526 6.19526C4.07024 6.32029 4 6.48986 4 6.66667C4 6.84348 4.07024 7.01305 4.19526 7.13807C4.32029 7.2631 4.48986 7.33333 4.66667 7.33333H11.3333C11.5101 7.33333 11.6797 7.2631 11.8047 7.13807C11.9298 7.01305 12 6.84348 12 6.66667C12 6.48986 11.9298 6.32029 11.8047 6.19526C11.6797 6.07024 11.5101 6 11.3333 6Z"
                                                  fill="var(--settings-dropdown-font-color)"/>
                                            <path d="M11.3333 8.66602H4.66667C4.48986 8.66602 4.32029 8.73625 4.19526 8.86128C4.07024 8.9863 4 9.15587 4 9.33268C4 9.50949 4.07024 9.67906 4.19526 9.80409C4.32029 9.92911 4.48986 9.99935 4.66667 9.99935H11.3333C11.5101 9.99935 11.6797 9.92911 11.8047 9.80409C11.9298 9.67906 12 9.50949 12 9.33268C12 9.15587 11.9298 8.9863 11.8047 8.86128C11.6797 8.73625 11.5101 8.66602 11.3333 8.66602Z"
                                                  fill="var(--settings-dropdown-font-color)"/>
                                        </svg>
                                        <span>Полученного сообщения</span>
                                    </template>
                                    <template v-else>
                                        <svg class="settings-autoresponder-create__select-icon" width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16 5.2744L16.6 5.2744L16 5.2744ZM16 12L15.4 12L16 12ZM13 13.4C12.6686 13.4 12.4 13.6686 12.4 14C12.4 14.3314 12.6686 14.6 13 14.6V13.4ZM7.49997 14.6C7.83134 14.6 8.09997 14.3314 8.09997 14C8.09997 13.6686 7.83134 13.4 7.49997 13.4V14.6ZM0.4 2.7058V12H1.6V2.7058H0.4ZM2.7058 1.6H4.96479V0.4H2.7058V1.6ZM15.4 5.2744L15.4 12L16.6 12L16.6 5.2744L15.4 5.2744ZM7.23919 3.87441H12.25V2.67441H7.23919V3.87441ZM14.0001 2.67441H12.25V3.87441H14.0001V2.67441ZM14 13.4H13V14.6H14V13.4ZM3 14.6H7.49997V13.4H3V14.6ZM16.6 5.2744C16.6 3.83849 15.436 2.67441 14.0001 2.67441V3.87441C14.7732 3.87441 15.4 4.50118 15.4 5.2744L16.6 5.2744ZM6.18431 2.81952C6.18431 3.40212 6.6566 3.87441 7.23919 3.87441V2.67441C7.31934 2.67441 7.38431 2.73938 7.38431 2.81952H6.18431ZM4.96479 1.6C5.63831 1.6 6.18431 2.146 6.18431 2.81952H7.38431C7.38431 1.48326 6.30106 0.4 4.96479 0.4V1.6ZM1.6 2.7058C1.6 2.09509 2.09509 1.6 2.7058 1.6V0.4C1.43234 0.4 0.4 1.43234 0.4 2.7058H1.6ZM15.4 12C15.4 12.7732 14.7732 13.4 14 13.4V14.6C15.436 14.6 16.6 13.4359 16.6 12L15.4 12ZM0.4 12C0.4 13.4359 1.56406 14.6 3 14.6V13.4C2.2268 13.4 1.6 12.7732 1.6 12H0.4Z"
                                                  fill="var(--settings-dropdown-font-color)"/>
                                            <path d="M8.15034 11.5814C8.19924 11.6319 8.25742 11.672 8.32151 11.6994C8.38561 11.7268 8.45436 11.7408 8.5238 11.7408C8.59323 11.7408 8.66198 11.7268 8.72608 11.6994C8.79018 11.672 8.84835 11.6319 8.89725 11.5814L9.81646 10.6168L9.81646 14.0539C9.81646 14.1968 9.87187 14.3339 9.97051 14.435C10.0692 14.536 10.2029 14.5928 10.3424 14.5928C10.4819 14.5928 10.6157 14.536 10.7144 14.435C10.813 14.3339 10.8684 14.1968 10.8684 14.0539L10.8684 10.6168L11.7876 11.5814C11.8365 11.6319 11.8947 11.672 11.9588 11.6994C12.0229 11.7268 12.0917 11.7408 12.1611 11.7408C12.2305 11.7408 12.2993 11.7268 12.3634 11.6994C12.4275 11.672 12.4856 11.6319 12.5345 11.5814C12.6325 11.4805 12.6875 11.3439 12.6875 11.2015C12.6875 11.0591 12.6325 10.9225 12.5345 10.8216L10.9679 9.31796C10.7716 9.11555 10.621 9.0012 10.3424 9C10.0657 9.00262 9.94294 9.11686 9.74785 9.31796L8.1556 10.8216C8.05693 10.9218 8.001 11.058 8.00001 11.2004C7.99903 11.3428 8.05307 11.4797 8.15034 11.5814Z"
                                                  fill="var(--settings-dropdown-font-color)"/>
                                        </svg>
                                        <span>Переместить в папку</span>
                                    </template>
                                </div>
                                <div class="settings-autoresponder-create__select-list" v-if="isOpenedSelectEvents">
                                    <div @click.stop="selectEvent('OnMessage')" class="settings-autoresponder-create__select-item">
                                        <svg class="settings-autoresponder-create__select-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.3333 0H2.66667C1.95942 0 1.28115 0.280952 0.781049 0.781049C0.280952 1.28115 0 1.95942 0 2.66667L0 10.6667C0 11.3739 0.280952 12.0522 0.781049 12.5523C1.28115 13.0524 1.95942 13.3333 2.66667 13.3333H4.6L7.56733 15.842C7.68771 15.9439 7.8403 15.9998 7.998 15.9998C8.1557 15.9998 8.30829 15.9439 8.42867 15.842L11.4 13.3333H13.3333C14.0406 13.3333 14.7189 13.0524 15.219 12.5523C15.719 12.0522 16 11.3739 16 10.6667V2.66667C16 1.95942 15.719 1.28115 15.219 0.781049C14.7189 0.280952 14.0406 0 13.3333 0V0ZM14.6667 10.6667C14.6667 11.0203 14.5262 11.3594 14.2761 11.6095C14.0261 11.8595 13.687 12 13.3333 12H11.4C11.0849 12.0001 10.7799 12.1118 10.5393 12.3153L8 14.46L5.462 12.3153C5.22104 12.1115 4.9156 11.9998 4.6 12H2.66667C2.31304 12 1.97391 11.8595 1.72386 11.6095C1.47381 11.3594 1.33333 11.0203 1.33333 10.6667V2.66667C1.33333 2.31304 1.47381 1.97391 1.72386 1.72386C1.97391 1.47381 2.31304 1.33333 2.66667 1.33333H13.3333C13.687 1.33333 14.0261 1.47381 14.2761 1.72386C14.5262 1.97391 14.6667 2.31304 14.6667 2.66667V10.6667Z"
                                                  fill="var(--settings-dropdown-font-color)"/>
                                            <path d="M4.66667 4.66732H8C8.17681 4.66732 8.34638 4.59708 8.4714 4.47206C8.59643 4.34703 8.66667 4.17746 8.66667 4.00065C8.66667 3.82384 8.59643 3.65427 8.4714 3.52925C8.34638 3.40422 8.17681 3.33398 8 3.33398H4.66667C4.48986 3.33398 4.32029 3.40422 4.19526 3.52925C4.07024 3.65427 4 3.82384 4 4.00065C4 4.17746 4.07024 4.34703 4.19526 4.47206C4.32029 4.59708 4.48986 4.66732 4.66667 4.66732Z"
                                                  fill="var(--settings-dropdown-font-color)"/>
                                            <path d="M11.3333 6H4.66667C4.48986 6 4.32029 6.07024 4.19526 6.19526C4.07024 6.32029 4 6.48986 4 6.66667C4 6.84348 4.07024 7.01305 4.19526 7.13807C4.32029 7.2631 4.48986 7.33333 4.66667 7.33333H11.3333C11.5101 7.33333 11.6797 7.2631 11.8047 7.13807C11.9298 7.01305 12 6.84348 12 6.66667C12 6.48986 11.9298 6.32029 11.8047 6.19526C11.6797 6.07024 11.5101 6 11.3333 6Z"
                                                  fill="var(--settings-dropdown-font-color)"/>
                                            <path d="M11.3333 8.66602H4.66667C4.48986 8.66602 4.32029 8.73625 4.19526 8.86128C4.07024 8.9863 4 9.15587 4 9.33268C4 9.50949 4.07024 9.67906 4.19526 9.80409C4.32029 9.92911 4.48986 9.99935 4.66667 9.99935H11.3333C11.5101 9.99935 11.6797 9.92911 11.8047 9.80409C11.9298 9.67906 12 9.50949 12 9.33268C12 9.15587 11.9298 8.9863 11.8047 8.86128C11.6797 8.73625 11.5101 8.66602 11.3333 8.66602Z"
                                                  fill="var(--settings-dropdown-font-color)"/>
                                        </svg>
                                        <span>Полученного сообщения</span>
                                    </div>
                                    <div @click.stop="selectEvent('OnDialogMove')" class="settings-autoresponder-create__select-item settings-autoresponder-create__select-item_arrow">
                                        <svg class="settings-autoresponder-create__select-icon" width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16 5.2744L16.6 5.2744L16 5.2744ZM16 12L15.4 12L16 12ZM13 13.4C12.6686 13.4 12.4 13.6686 12.4 14C12.4 14.3314 12.6686 14.6 13 14.6V13.4ZM7.49997 14.6C7.83134 14.6 8.09997 14.3314 8.09997 14C8.09997 13.6686 7.83134 13.4 7.49997 13.4V14.6ZM0.4 2.7058V12H1.6V2.7058H0.4ZM2.7058 1.6H4.96479V0.4H2.7058V1.6ZM15.4 5.2744L15.4 12L16.6 12L16.6 5.2744L15.4 5.2744ZM7.23919 3.87441H12.25V2.67441H7.23919V3.87441ZM14.0001 2.67441H12.25V3.87441H14.0001V2.67441ZM14 13.4H13V14.6H14V13.4ZM3 14.6H7.49997V13.4H3V14.6ZM16.6 5.2744C16.6 3.83849 15.436 2.67441 14.0001 2.67441V3.87441C14.7732 3.87441 15.4 4.50118 15.4 5.2744L16.6 5.2744ZM6.18431 2.81952C6.18431 3.40212 6.6566 3.87441 7.23919 3.87441V2.67441C7.31934 2.67441 7.38431 2.73938 7.38431 2.81952H6.18431ZM4.96479 1.6C5.63831 1.6 6.18431 2.146 6.18431 2.81952H7.38431C7.38431 1.48326 6.30106 0.4 4.96479 0.4V1.6ZM1.6 2.7058C1.6 2.09509 2.09509 1.6 2.7058 1.6V0.4C1.43234 0.4 0.4 1.43234 0.4 2.7058H1.6ZM15.4 12C15.4 12.7732 14.7732 13.4 14 13.4V14.6C15.436 14.6 16.6 13.4359 16.6 12L15.4 12ZM0.4 12C0.4 13.4359 1.56406 14.6 3 14.6V13.4C2.2268 13.4 1.6 12.7732 1.6 12H0.4Z"
                                                  fill="var(--settings-dropdown-font-color)"/>
                                            <path d="M8.15034 11.5814C8.19924 11.6319 8.25742 11.672 8.32151 11.6994C8.38561 11.7268 8.45436 11.7408 8.5238 11.7408C8.59323 11.7408 8.66198 11.7268 8.72608 11.6994C8.79018 11.672 8.84835 11.6319 8.89725 11.5814L9.81646 10.6168L9.81646 14.0539C9.81646 14.1968 9.87187 14.3339 9.97051 14.435C10.0692 14.536 10.2029 14.5928 10.3424 14.5928C10.4819 14.5928 10.6157 14.536 10.7144 14.435C10.813 14.3339 10.8684 14.1968 10.8684 14.0539L10.8684 10.6168L11.7876 11.5814C11.8365 11.6319 11.8947 11.672 11.9588 11.6994C12.0229 11.7268 12.0917 11.7408 12.1611 11.7408C12.2305 11.7408 12.2993 11.7268 12.3634 11.6994C12.4275 11.672 12.4856 11.6319 12.5345 11.5814C12.6325 11.4805 12.6875 11.3439 12.6875 11.2015C12.6875 11.0591 12.6325 10.9225 12.5345 10.8216L10.9679 9.31796C10.7716 9.11555 10.621 9.0012 10.3424 9C10.0657 9.00262 9.94294 9.11686 9.74785 9.31796L8.1556 10.8216C8.05693 10.9218 8.001 11.058 8.00001 11.2004C7.99903 11.3428 8.05307 11.4797 8.15034 11.5814Z"
                                                  fill="var(--settings-dropdown-font-color)"/>
                                        </svg>
                                        <span>Переместить в папку</span>
                                    </div>
                                </div>
                            </button>
                            <svg class="settings-autoresponder-create__input-icon" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.6647 7.3332C13.214 7.3332 11.7958 7.7633 10.5895 8.5691C9.3832 9.3749 8.44302 10.5202 7.88783 11.8602C7.33264 13.2002 7.18738 14.6747 7.47041 16.0973C7.75345 17.5198 8.45206 18.8265 9.47792 19.8521C10.5038 20.8777 11.8108 21.5761 13.2337 21.8591C14.6566 22.142 16.1315 21.9968 17.4718 21.4418C18.8122 20.8867 19.9578 19.9468 20.7638 18.7408C21.5698 17.5348 22 16.117 22 14.6666C21.9978 12.7223 21.2243 10.8583 19.8491 9.48351C18.474 8.10871 16.6095 7.33538 14.6647 7.3332ZM17.4155 15.5833H15.5816V17.4166C15.5816 17.6597 15.485 17.8929 15.3131 18.0648C15.1411 18.2367 14.9079 18.3333 14.6647 18.3333C14.4216 18.3333 14.1883 18.2367 14.0164 18.0648C13.8444 17.8929 13.7478 17.6597 13.7478 17.4166V15.5833H11.914C11.6708 15.5833 11.4376 15.4867 11.2657 15.3148C11.0937 15.1429 10.9971 14.9097 10.9971 14.6666C10.9971 14.4235 11.0937 14.1903 11.2657 14.0184C11.4376 13.8465 11.6708 13.7499 11.914 13.7499H13.7478V11.9166C13.7478 11.6735 13.8444 11.4403 14.0164 11.2684C14.1883 11.0965 14.4216 10.9999 14.6647 10.9999C14.9079 10.9999 15.1411 11.0965 15.3131 11.2684C15.485 11.4403 15.5816 11.6735 15.5816 11.9166V13.7499H17.4155C17.6586 13.7499 17.8919 13.8465 18.0638 14.0184C18.2358 14.1903 18.3324 14.4235 18.3324 14.6666C18.3324 14.9097 18.2358 15.1429 18.0638 15.3148C17.8919 15.4867 17.6586 15.5833 17.4155 15.5833ZM4.57874 10.9999H4.56132C4.38832 10.9965 4.2198 10.9443 4.07524 10.8493C3.93067 10.7542 3.81596 10.6202 3.74435 10.4627L0.128068 2.51058C-0.00283151 2.17801 -0.0342146 1.81458 0.0377385 1.46451C0.109692 1.11444 0.281878 0.792822 0.533342 0.538808C0.775154 0.295361 1.08074 0.125025 1.41501 0.0473568C1.74927 -0.030311 2.09867 -0.0121616 2.42309 0.0997211C2.45119 0.109519 2.47874 0.120841 2.50561 0.133638L10.4598 3.749C10.6162 3.82118 10.7492 3.93597 10.8434 4.08021C10.9376 4.22444 10.9892 4.3923 10.9924 4.56453C10.9955 4.73675 10.9501 4.90639 10.8612 5.05398C10.7724 5.20158 10.6437 5.32116 10.49 5.39902L7.09749 7.09487L5.40121 10.4866C5.3258 10.6404 5.20877 10.7701 5.0634 10.8608C4.91802 10.9515 4.75012 10.9997 4.57874 10.9999Z" fill="#404054"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div class="settings-autoresponder-create__input-group settings-autoresponder-create__input-group_m-48">
                <label class="settings-autoresponder-create__label"
                       :class="{'settings-autoresponder-create__label_error': errors.find(i => i === 'recipients')}"
                >
                    Клиенты
                </label>
                <div class="settings-autoresponder-create__row settings-autoresponder-create__row_m-0">
                    <div class="settings-autoresponder-create__iconed-input settings-autoresponder-create__iconed-input_w-80">
                        <button class="settings-autoresponder-create__input settings-autoresponder-create__input_selector pointer"
                                @click="recipients.toggleOpenedSelectRecipient(true)"
                                @blur="recipients.toggleOpenedSelectRecipient(false)"
                        >
                            <div class="settings-autoresponder-create__select-item">
                                {{recipients.selectedMessage}}
                            </div>
                            <div class="settings-autoresponder-create__select-list settings-autoresponder-create__select-list_w-24"
                                 v-if="recipients.isOpenedSelectRecipient"
                            >
                                <div class="settings-autoresponder-create__select-item pointer"
                                    :class="{'settings-autoresponder-create__select-item_active': recipients.selectedAction === 'folder'}"
                                     @click.stop="recipients.selectAction('folder')"
                                >
                                    <svg class="settings-autoresponder-create__select-icon" width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path class="settings-autoresponder-create_svg-path_need-fill" d="M0.25 2.95652V14H1.75V2.95652H0.25ZM3 16.75H16V15.25H3V16.75ZM2.95652 1.75H5.55556V0.25H2.95652V1.75ZM6.80556 3V3.1087H8.30556V3H6.80556ZM8.05556 4.3587H16V2.8587H8.05556V4.3587ZM17.25 5.6087V14H18.75V5.6087H17.25ZM16 4.3587C16.6904 4.3587 17.25 4.91834 17.25 5.6087H18.75C18.75 4.08991 17.5188 2.8587 16 2.8587V4.3587ZM6.80556 3.1087C6.80556 3.79905 7.3652 4.3587 8.05556 4.3587V2.8587C8.19363 2.8587 8.30556 2.97062 8.30556 3.1087H6.80556ZM5.55556 1.75C6.24591 1.75 6.80556 2.30964 6.80556 3H8.30556C8.30556 1.48122 7.07434 0.25 5.55556 0.25V1.75ZM1.75 2.95652C1.75 2.29018 2.29018 1.75 2.95652 1.75V0.25C1.46175 0.25 0.25 1.46175 0.25 2.95652H1.75ZM16 16.75C17.5188 16.75 18.75 15.5188 18.75 14H17.25C17.25 14.6904 16.6904 15.25 16 15.25V16.75ZM0.25 14C0.25 15.5188 1.48122 16.75 3 16.75V15.25C2.30964 15.25 1.75 14.6904 1.75 14H0.25Z"
                                              fill="var(--settings-dropdown-font-color)"/>
                                    </svg>
                                    <span>Папку</span>
                                    <svg class="settings-autoresponder-create__select-pseudo-icon" width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.999838 10L5.66651 5.29253L0.999841 0.857141"
                                              stroke="#B7B7BE" stroke-linecap="round"/>
                                    </svg>
                                </div>
                                <div class="settings-autoresponder-create__select-item pointer"
                                    :class="{'settings-autoresponder-create__select-item_active': recipients.selectedAction === 'dialog'}"
                                     @click.stop="recipients.selectAction('dialog')"
                                >
                                    <svg class="settings-autoresponder-create__select-icon" width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path class="settings-autoresponder-create_svg-path_need-stroke" d="M16.1599 1H2.84013C1.82387 1 1 1.92603 1 3.0683V11.3064C1 12.4487 1.82387 13.3747 2.84013 13.3747H14.4845C15.0186 13.3747 15.5348 13.5916 15.9379 13.9854L17.4904 15.5021C17.6803 15.6877 18 15.5531 18 15.2875V3.0683C18 1.92603 17.1761 1 16.1599 1Z"
                                              stroke="var(--settings-dropdown-font-color)" stroke-width="1.5"/>
                                    </svg>
                                    <span>Диалог</span>
                                    <svg class="settings-autoresponder-create__select-pseudo-icon" width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.999838 10L5.66651 5.29253L0.999841 0.857141" stroke="#B7B7BE" stroke-linecap="round"/>
                                    </svg>
                                </div>
                                <div class="settings-autoresponder-create__select-item">
                                    <svg class="settings-autoresponder-create__select-icon" width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path   class="settings-autoresponder-create_svg-path_need-fill"
                                                d="M10.9687 0.675874C10.5891 0.246126 10.0433 0 9.46984 0H2.51751C1.12938 0 0 1.14384 0 2.54973V15.4503C0 16.8562 1.12938 18 2.51751 18H12.4827C13.8706 18 15 16.8564 15 15.4503V5.9961C15 5.50839 14.8218 5.03749 14.4989 4.67197L10.9687 0.675874ZM10.7383 2.4308L12.8527 4.82419H11.7383C11.186 4.82419 10.7383 4.37648 10.7383 3.82419V2.4308ZM12.4823 16.6562H2.51751C1.86093 16.6562 1.32687 16.1153 1.32687 15.4503V2.54973C1.32687 1.88475 1.86093 1.34385 2.51751 1.34385H9.41168V4.16782C9.41168 5.27239 10.3071 6.16782 11.4117 6.16782H13.6731V15.4503C13.6729 16.1153 13.1389 16.6562 12.4823 16.6562Z"
                                              fill="var(--settings-dropdown-font-color)"/>
                                        <path   class="settings-autoresponder-create_svg-path_need-fill"
                                                d="M10.577 13.2632H4.42339C4.0523 13.2632 3.75146 13.564 3.75146 13.9351C3.75146 14.3062 4.0523 14.607 4.42339 14.607H10.577C10.9481 14.607 11.249 14.3062 11.249 13.9351C11.249 13.564 10.9481 13.2632 10.577 13.2632Z"
                                              fill="var(--settings-dropdown-font-color)"/>
                                        <path   class="settings-autoresponder-create_svg-path_need-fill"
                                                d="M10.577 9.47369H4.42339C4.0523 9.47369 3.75146 9.77452 3.75146 10.1456C3.75146 10.5167 4.0523 10.8175 4.42339 10.8175H10.577C10.9481 10.8175 11.249 10.5167 11.249 10.1456C11.249 9.77452 10.9481 9.47369 10.577 9.47369Z"
                                              fill="var(--settings-dropdown-font-color)"/>
                                    </svg>
                                    <span>Файл</span>
                                    <svg class="settings-autoresponder-create__select-pseudo-icon" width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.999838 10L5.66651 5.29253L0.999841 0.857141" stroke="#B7B7BE" stroke-linecap="round"/>
                                    </svg>
                                </div>
                            </div>
                            <table class="settings-autoresponder-create__select-list settings-autoresponder-create__select-list_w-74 settings-autoresponder-create__select-list_table"
                                   v-if="recipients.isOpenedSelectRecipient && recipients.selectedAction === 'folder'"
                            >
                                <tr class="pointer" v-for="folder in folders"
                                    :key="folder.folder_id+'SettingsMailingsCreate'"
                                    @click.stop="recipients.selectFolder(folder.folder_id)"
                                >
                                    <td>
                                        <svg class="settings-autoresponder-create__folder-icon" width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M28.745 7.83673H27V4.76669C27 4.02857 26.387 3.42857 25.634 3.42857H13.2575L10.7575 0H1.366C0.613 0 0 0.60049 0 1.33812V22.7358H0.003C0.0005 23.0116 0.088 23.2815 0.264 23.5073C0.509 23.8207 0.88 24 1.2825 24H23.662C24.24 24 24.749 23.6185 24.887 23.112L30 9.3791V9.29241C30 8.44898 29.472 7.83673 28.745 7.83673ZM1 1.33812C1 1.14025 1.1645 0.979592 1.366 0.979592H10.2425L12.7425 4.40816H25.6335C25.8355 4.40816 25.9995 4.56882 25.9995 4.76669V7.83673H6.3655C6.2935 7.83673 6.222 7.84261 6.1525 7.85437C5.666 7.9342 5.2615 8.28196 5.141 8.72425L1 19.7873V1.33812ZM23.9345 22.8162C23.9015 22.9362 23.789 23.0204 23.662 23.0204H1.2825C1.161 23.0204 1.09 22.9523 1.0585 22.9117C1.027 22.8715 0.9785 22.7863 0.997 22.7118L6.0925 9.02057C6.1255 8.90057 6.238 8.81633 6.365 8.81633H27H28.745C28.935 8.81633 28.9835 9.08376 28.996 9.21747L23.9345 22.8162Z"
                                                  fill="var(--folder-color)"/>
                                        </svg>
                                    </td>
                                    <td class="settings-autoresponder-create__folder-name">
                                        {{folder.name}}
                                    </td>
                                    <td class="settings-autoresponder-create__folder-count">
                                        {{folder.dialogues_count}} чата
                                    </td>
                                    <td>
                                        <BaseCircleIcon
                                                v-for="i in 3"
                                                class="base-circle-icon_little base-circle-icon_ml-negative"
                                                src="/img/icon_inactive.png"
                                        ></BaseCircleIcon>
                                    </td>
                                    <td>
                                        <div class="settings-autoresponder-create__folder-checkbox"
                                             :class="{'settings-autoresponder-create__folder-checkbox_active': recipients.folder_ids.find(i => i === folder.folder_id) }"
                                        >
                                            <div class="modal-add-to-folder__inner-checkbox" >
                                                <svg v-if="recipients.folder_ids.find(i => i === folder.folder_id)" width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1.5 5.08281L3.98355 7L9.16875 0.609375" stroke="url(#paint0_linear)" stroke-width="1.125" stroke-linecap="round"/>
                                                    <defs>
                                                        <linearGradient id="paint0_linear" x1="-1.67164" y1="9.52469" x2="8.57582" y2="-2.49172" gradientUnits="userSpaceOnUse">
                                                            <stop stop-color="#00BF6D"/>
                                                            <stop offset="1" stop-color="#98D730"/>
                                                        </linearGradient>
                                                    </defs>
                                                </svg>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table class="settings-autoresponder-create__select-list settings-autoresponder-create__select-list_w-74 settings-autoresponder-create__select-list_table"
                                   v-if="recipients.isOpenedSelectRecipient && recipients.selectedAction === 'dialog'"
                            >
                                <tr class="pointer"
                                    v-for="dialog in recipients.allDialogs"
                                    :key="dialog.dialog_id+'SettingsMailingsCreateDialogs'"
                                    @click.stop="recipients.selectDialog(dialog.dialog_id)"
                                >
                                    <td class="settings-autoresponder-create__folder-name">
                                        <div class="settings-autoresponder-create__dialog-cont">
                                            <BaseCircleIcon
                                                    :src="dialog.avatar"
                                            ></BaseCircleIcon>
                                            <div>
                                                {{dialog.name}}
                                            </div>
                                        </div>
                                    </td>
                                    <td class="settings-autoresponder-create__folder-count">
                                        {{dialog.folder.name}}
                                    </td>
                                    <td>
                                        <div class="settings-autoresponder-create__folder-checkbox"
                                             :class="{'settings-autoresponder-create__folder-checkbox_active': recipients.dialog_ids.find(i => i === dialog.dialog_id) }"
                                        >
                                            <div class="modal-add-to-folder__inner-checkbox" >
                                                <svg v-if="recipients.dialog_ids.find(i => i === dialog.dialog_id)" width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1.5 5.08281L3.98355 7L9.16875 0.609375" stroke="url(#paint0_linear)" stroke-width="1.125" stroke-linecap="round"/>
                                                    <defs>
                                                        <linearGradient id="paint0_linear" x1="-1.67164" y1="9.52469" x2="8.57582" y2="-2.49172" gradientUnits="userSpaceOnUse">
                                                            <stop stop-color="#00BF6D"/>
                                                            <stop offset="1" stop-color="#98D730"/>
                                                        </linearGradient>
                                                    </defs>
                                                </svg>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </button>
                        <svg class="settings-autoresponder-create__input-icon" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.875 11.9167C6.05915 11.9167 5.26163 11.6747 4.58327 11.2215C3.90492 10.7682 3.37621 10.124 3.064 9.37024C2.75179 8.61649 2.6701 7.78709 2.82926 6.98692C2.98842 6.18675 3.38129 5.45174 3.95818 4.87485C4.53508 4.29796 5.27008 3.90509 6.07025 3.74593C6.87042 3.58677 7.69982 3.66845 8.45357 3.98067C9.20731 4.29288 9.85155 4.82159 10.3048 5.49994C10.7581 6.17829 11 6.97582 11 7.79167C10.9988 8.88531 10.5638 9.93382 9.79048 10.7071C9.01715 11.4805 7.96865 11.9155 6.875 11.9167ZM12.8333 22H0.916667C0.673552 22 0.440394 21.9034 0.268485 21.7315C0.0965771 21.5596 0 21.3265 0 21.0833V20.625C0 18.8016 0.724328 17.053 2.01364 15.7636C3.30295 14.4743 5.05164 13.75 6.875 13.75C8.69836 13.75 10.447 14.4743 11.7364 15.7636C13.0257 17.053 13.75 18.8016 13.75 20.625V21.0833C13.75 21.3265 13.6534 21.5596 13.4815 21.7315C13.3096 21.9034 13.0764 22 12.8333 22ZM16.0417 8.25C15.2258 8.25 14.4283 8.00807 13.7499 7.55481C13.0716 7.10155 12.5429 6.45732 12.2307 5.70357C11.9185 4.94983 11.8368 4.12043 11.9959 3.32025C12.1551 2.52008 12.548 1.78508 13.1249 1.20819C13.7017 0.631295 14.4367 0.238427 15.2369 0.0792626C16.0371 -0.0799015 16.8665 0.0017873 17.6202 0.313999C18.374 0.62621 19.0182 1.15492 19.4715 1.83327C19.9247 2.51163 20.1667 3.30915 20.1667 4.125C20.1655 5.21865 19.7305 6.26715 18.9571 7.04048C18.1838 7.8138 17.1353 8.24879 16.0417 8.25ZM14.7391 10.1026C13.8853 10.2171 13.0644 10.5067 12.3278 10.9533C11.5912 11.3998 10.9547 11.9937 10.4583 12.6977C12.5124 13.6305 14.1264 15.3214 14.9628 17.4167H21.0833C21.3264 17.4167 21.5596 17.3201 21.7315 17.1482C21.9034 16.9763 22 16.7431 22 16.5V16.4652C21.9991 15.5514 21.8032 14.6484 21.4255 13.8164C21.0478 12.9844 20.497 12.2425 19.8097 11.6403C19.1225 11.0382 18.3147 10.5895 17.4403 10.3243C16.5659 10.0591 15.645 9.98354 14.7391 10.1026Z" fill="#404054"/>
                        </svg>
                    </div>
                    <BaseButton class="base-button_enter base-button_p5-15"
                        @click="toggleModalCreateChat(true)"
                    >Добавить новых</BaseButton>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="settings-autoresponder-create__parameters" v-if="actions.isOpenedEdit">
                <SettingsAutoresponderCreateParameters
                        ref="autoresponderEdit"
                    :index="actions.indexToEdit"
                    :action="actions.data[actions.indexToEdit - 1]"
                    :error="!!errors.find(item => item.name === 'actions') && (actions.data[actions.indexToEdit - 1].id === errors.find(item => item.name === 'actions').data.find(item => item === actions.data[actions.indexToEdit - 1].id))"
                ></SettingsAutoresponderCreateParameters>
            </div>
            <draggable v-else v-model="actionsData"
                       item-key="id"
                       class="settings-autoresponder-create__parameters"
                       ghost-class="settings-autoresponder-create-parameters-card_opacity"
            >
                    <template #item="{i, index}">
                        <SettingsAutoresponderCreateParametersCard
                                :key="`SettingsAutoresponderCreateParameters${index}`"
                                :action="actionsData[index]"
                                :index="index + 1"
                                :error="!!errors.find(item => item.name === 'actions') && ( actionsData[index].id === errors.find(item => item.name === 'actions').data.find(item => item === actionsData[index].id))"
                                @changeProperty="actions.actions.changeProperty"
                                @edit="actions.actions.edit"
                                @del="actions.actions.del"
                        ></SettingsAutoresponderCreateParametersCard>
                    </template>
                    <template #footer>
                        <SettingsAutoresponderCreateParametersCard
                                @add="addAction"
                                :isEmpty="true"
                        ></SettingsAutoresponderCreateParametersCard>
                    </template>
                </draggable>
        </template>

        <div class="settings-autoresponder-create__footer">
            <div class="settings-autoresponder-create__steps">
                <div class="settings-autoresponder-create__step pointer"
                     :class="{'settings-autoresponder-create__step_active': !isSecondStep}"
                     @click="gotoStep(false)">
                    Шаг 1
                </div>
                <div class="settings-autoresponder-create__step pointer"
                     :class="{'settings-autoresponder-create__step_active': isSecondStep}"
                     @click="gotoStep(true)">
                    Шаг 2
                </div>
            </div>
            <BaseButton v-if="!isSecondStep" class="base-button_enter base-button_p5-15" @click="gotoStep(true)">Продолжить</BaseButton>
            <BaseButton v-else-if="actions.isOpenedEdit" class="base-button_enter base-button_p5-15" @click="saveChanges()">Сохранить изменения</BaseButton>
            <BaseButton v-else class="base-button_enter base-button_p5-15" @click="create">Создать</BaseButton>
        </div>
    </div>
</template>

<script>
    import BaseRangedButtons from '../../Base/BaseRangedButtons.vue'
    import BaseButton from '../../Base/BaseButton.vue'
    import BaseCircleIcon from '../../Base/BaseCircleIcon.vue'
    import BaseCalendar from '../../Base/BaseCalendar.vue'
    import BaseTimepicker from '../../Base/BaseTimepicker.vue'
    import BaseInputGroup from '../../Base/BaseInputGroup.vue'
    import ModalMoveChat from '../../Modals/ModalMoveChat.vue'
    import ModalCreateChat from '../../Modals/ModalCreateChat.vue'
    import SettingsAutoresponderCreateParameters from './SettingsAutoresponderCreateParameters/SettingsAutoresponderCreateParameters.vue'
    import SettingsAutoresponderCreateParametersCard from './SettingsAutoresponderCreateParameters/SettingsAutoresponderCreateParametersCard.vue'

    import draggable from 'vuedraggable'

    import { ref, reactive, computed, onMounted } from 'vue'
    import { useModals } from "../../../composition/useModals";
    import { useFolder } from "../../../composition/useFolder";
    import { useSearch } from "../../../composition/useSearch";
    import { useDate } from "../../../composition/useDate";
    import { useAutoresponders } from "../../../composition/useAutoresponder";

    export default {
        props: {
            selectedAutoresponderToEdit: {
                name: String,
            }
        },
        components: {
            BaseRangedButtons,
            BaseButton,
            BaseCircleIcon,
            BaseCalendar,
            BaseTimepicker,
            BaseInputGroup,
            ModalMoveChat,
            ModalCreateChat,
            SettingsAutoresponderCreateParameters,
            SettingsAutoresponderCreateParametersCard,

            draggable,
        },
        setup(props, {emit}) {
            const { toggleModalMoveChat, toggleModalCreateChat } = useModals();

            const { getAllFolders, folders } = useFolder();

            const { search, selectParameter } = useSearch();

            const { validDate, validTime } = useDate();

            const { autorespondersActions, createAutoresponder, updateAutoresponder } = useAutoresponders();

            const autoresponderEdit = ref(null);

            const saveChanges = () => {
                autoresponderEdit.value.save();
            }
            const cancelEdit = () => {
                autoresponderEdit.value.cancel();
            }


            const isSecondStep = ref(false);

            const gotoStep = (boolean) => {
                isSecondStep.value = boolean;
            }

            const selectedEvent = ref('OnMessage');
            const selectEvent = (event) => {
                selectedEvent.value = event;
                toggleOpenedSelectEvents(false);
            }


            const isOpenedSelectEvents = ref(false);
            const toggleOpenedSelectEvents = (boolean) => {
                isOpenedSelectEvents.value = boolean;
            }

            const recipients = reactive({
                isOpenedSelectRecipient: false,
                toggleOpenedSelectRecipient: (boolean) => {
                    recipients.isOpenedSelectRecipient = boolean;
                },
                selectedAction: null,
                selectAction: (action) => {
                    recipients.selectedAction = action;
                    if (action === 'folder') {
                        getAllFolders();
                    } else if (action === 'dialog') {
                        selectParameter('name');
                        search('')
                            .then(r => {
                                recipients.allDialogs = [...r.dialogues];
                            })
                    }
                },
                folder_ids: [],
                dialog_ids: [],

                allDialogs: [],

                selectedMessage: computed(() => {
                    return recipients.selectedAction
                        ? `Выбрано ${recipients.selectedAction === 'dialog'
                            ? recipients.dialog_ids.length + ' чата'
                            : recipients.folder_ids.length + ' папки'}`
                        : 'Выбрать'
                }),

                selectFolder: (id) => {
                    recipients.folder_ids.find(i => i === id)
                        ? recipients.folder_ids = recipients.folder_ids.filter(i => i !== id)
                        : recipients.folder_ids.push(id)
                },
                selectDialog: (id) => {
                    recipients.dialog_ids.find(i => i === id)
                        ? recipients.dialog_ids = recipients.dialog_ids.filter(i => i !== id)
                        : recipients.dialog_ids.push(id)
                }
            })

            const isOpenedDatepicker = ref(false);
            const toggleOpenedDatepicker = (boolean) => {
                isOpenedDatepicker.value = boolean;
            }
            const selectDate = (time) => {
                infoToSend.time_start = Math.floor(time / 1000);
            }

            const inputName = ($event) => {
                infoToSend.name = $event;
            }

            const infoToSend = reactive({
                name: '',
                time_start: null,
            })

            const addAction = () => {
                autorespondersActions.actions.addAction();
            }

            const errors = ref([]);

            const create = () => {
                let body = {
                    name: infoToSend.name,
                }
                infoToSend.time_start && (body.time_start = +infoToSend.time_start);

                errors.value = [];
                if (selectedEvent.value) {
                    body.event = selectedEvent.value;
                }

                if (recipients.selectedAction === 'dialog') {
                    body.send = {
                        dialog_ids: [...recipients.dialog_ids]
                    }
                    if (!body.send.dialog_ids.length) {
                        errors.value.push('recipients')
                    }
                } else if (recipients.selectedAction === 'folder') {
                    body.send = {
                        folder_ids: [...recipients.folder_ids]
                    }
                    if (!body.send.folder_ids.length) {
                        errors.value.push('recipients')
                    }
                }

                (!body.name.length) && errors.value.push('name');
                (!recipients.selectedAction) && errors.value.push('recipients');

                body.actions = autorespondersActions.data.map(i => {
                    let newObj = {
                        action_data: i.action_data,
                        action_type: i.action_type,
                        disable_dialog: i.disable_dialog,
                    }
                    i.else_action_type && (newObj.else_action_type = i.else_action_type);
                    if (i.start_condition.length < 2) {
                        if (i.start_condition[0].type) {
                            newObj.start_condition =  [...i.start_condition]
                        }
                    } else {
                        newObj.start_condition =  [...i.start_condition]
                    }

                    if (typeof i.else_action_data === "string" || i.else_action_data === "number") {
                        newObj.else_action_data = i.else_action_data
                    } else {
                        i.else_action_data.data && (newObj.else_action_data = i.else_action_data)
                    }
                    return newObj;
                });

                let errsActions = autorespondersActions.data
                    .filter(i => {
                        return !i.action_type && ((typeof i.action_data === "string") || (typeof i.action_data === "number")? !i.action_data : !i.action_data.data)
                    })
                    .map(i => i.id);

                (errsActions.length) && errors.value.push({
                    name: 'actions',
                    data: errsActions,
                })


                if (errors.value.length) {
                    if (errors.value.find(i => i === 'recipients') || errors.value.find(i => i === 'name')) {
                        gotoStep(false)
                    } else if (errors.value.find(i => i.name === 'actions')) {
                        gotoStep(true);
                    }
                    return;
                }
                if (props.selectedAutoresponderToEdit) {
                    body.autoresponder_id = props.selectedAutoresponderToEdit.autoresponder_id;
                    updateAutoresponder(body)
                        .then((r) => {
                            if (r.error) {
                                errors.value.push('name');
                                gotoStep(false)
                                return;
                            }
                            emit('gotoTable')
                        })
                } else {
                    createAutoresponder(body)
                        .then((r) => {
                            if (r.error) {
                                errors.value.push('name');
                                gotoStep(false)
                                return;
                            }
                            emit('gotoTable')
                        })
                }
            };

            onMounted(() => {
                if (props.selectedAutoresponderToEdit) {
                    let toEdit = props.selectedAutoresponderToEdit;
                    infoToSend.name = toEdit.name;
                    toEdit.time_start && (infoToSend.time_start = toEdit.time_start);
                    toEdit.send_day && (infoToSend.send_day = toEdit.send_day);

                    getAllFolders()

                    if (toEdit.event) {
                        selectedEvent.value = toEdit.event;
                    }
                    if (toEdit.send.folder_ids) {
                        recipients.selectAction('folder');
                        recipients.folder_ids = [...toEdit.send.folder_ids];
                    } else if (toEdit.send.dialog_ids) {
                        recipients.selectAction('dialog');
                        recipients.dialog_ids = [...toEdit.send.dialog_ids];
                    }

                    if (toEdit.actions.length) {
                        let newArrActions = toEdit.actions.map((item, superIndex) => {
                            let actions = {
                                disable_dialog: item.disable_dialog,
                                action_type: item.action_type,
                                else_action_type: item.else_action_type,
                            }
                            if (item.start_condition.length) {
                                actions.start_condition = item.start_condition;
                            } else {
                                actions.start_condition = [
                                    {
                                        type: null,
                                        data: {
                                            count: 0,
                                            text: ''
                                        }
                                    },
                                ]
                            }
                            if (item.action_type === 'SendMessage') {
                                actions.action_data = {
                                    type: item.action_data.type,
                                    data: item.action_data.message,
                                }
                            } else {
                                actions.action_data = item.action_data
                            }
                            if (item.else_action_type === 'SendMessage') {
                                actions.else_action_data = {
                                    type: item.else_action_data.type,
                                    data: item.else_action_data.message,
                                }
                            } else {
                                (item.else_action_data === null)
                                    ? (actions.else_action_data = {
                                        type: null,
                                        data: null,
                                    })
                                    : (actions.else_action_data = item.else_action_data)
                            }

                            actions.id = superIndex;

                            return actions;
                        });

                        autorespondersActions.actions.setNewActions(newArrActions);
                        autorespondersActions.actions.setIdsCount(newArrActions.length);

                    } else {
                        autorespondersActions.actions.setNewActions([]);
                        autorespondersActions.actions.setIdsCount(0);
                    }

                } else {
                    autorespondersActions.actions.setNewActions([]);
                    autorespondersActions.actions.setIdsCount(0);
                }
            })

            return {
                isSecondStep,
                gotoStep,

                isOpenedSelectEvents,
                toggleOpenedSelectEvents,

                selectedEvent,
                selectEvent,

                toggleModalMoveChat,
                toggleModalCreateChat,

                recipients,
                folders,

                infoToSend: infoToSend,

                time: computed(() => infoToSend.time_start),

                create,
                errors,

                selectDate,
                validDate,
                validTime,
                toggleOpenedDatepicker,
                isOpenedDatepicker,

                inputName,
                actions: computed(() =>  autorespondersActions),
                actionsData: computed({
                    get() {
                        return autorespondersActions.data;
                    },
                    set(newValue) {
                        autorespondersActions.actions.setNewActions(newValue)
                    }
                }),

                saveChanges,
                addAction,


                autoresponderEdit,
                cancelEdit,


            }
        }
    }
</script>

<style lang="scss">
    .settings-autoresponder-create {
        width: 100%;
        padding: 33px 16px 28px;
        height: calc(100vh - 30px - 80px);
        display: flex;
        flex-direction: column;
    }

    .settings-autoresponder-create__input-column {
        width: 100%;
        max-width: 100%;
    }
    .settings-autoresponder-create__input-group {
        text-align: left;
        width: 100%;
        &.settings-autoresponder-create__input-group_m-48 {
            margin-top: 48px;
        }
    }
    .settings-autoresponder-create__parameters {
        width: 100%;
        height: calc(100% - 32px - 29px);
        text-align: left;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        overflow-y: auto;
    }
    .settings-autoresponder-create__label {
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 24px;
        color: var(--font-color);
        display: block;
        margin-bottom: 8px;
        &.settings-autoresponder-create__label_error {
            color: var(--red-color);
        }
    }
    .settings-autoresponder-create__iconed-input {
        width: 100%;
        position: relative;
        .settings-autoresponder-create__input-icon {
            position: absolute;
            right: 6px;
            top: 6px;
            path {
                fill: var(--default-svg-fill);
            }
        }
        &.settings-autoresponder-create__iconed-input_w-80 {
            width: 80%;
        }
    }
    .settings-autoresponder-create__ranged-input {
        display: flex;
        width: 100%;
        align-items: center;
        .settings-autoresponder-create__input {
            margin-right: 8px;
        }
    }
    .settings-autoresponder-create__input, .settings-autoresponder-create__textarea {
        padding: 6px 10px;
        background: transparent;
        font-family: Segoe UI;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        color: var(--font-color);
        border: 0.7px solid var(--separator-color);
        border-radius: 3px;
        width: 100%;
        text-align: left;
        &::placeholder {
            color: var(--default-svg-fill);
        }
        &.settings-autoresponder-create__input_selector {
            position: relative;
        }
    }
    .settings-autoresponder-create__select-item {
        display: flex;
        align-items: center;
        position: relative;
        .settings-autoresponder-create__select-icon {
            margin-right: 16px;
            width: 16px;
            min-width: 16px;
        }

    }
    .settings-autoresponder-create__textarea {
        height: 100%;
        width: 100%;
        ::-webkit-scrollbar {
            display: none;
        }
    }
    .settings-autoresponder-create__iconed-input {
        .settings-autoresponder-create__input {
            padding: 6px 30px 6px 10px;
        }
    }
    .settings-autoresponder-create__row {
        display: flex;
        width: 100%;
        justify-content: space-between;
        margin-top: 48px;
        &.settings-autoresponder-create__row_m-0 {
            margin-top: 0;
        }
        .settings-autoresponder-create__input-group {
            width: 45%;
            &.settings-autoresponder-create__input-group_w-50 {
                width: 50%;
            }
            &.settings-autoresponder-create__input-group_w-30 {
                width: 30%;
            }
            &.settings-autoresponder-create__input-group_w-80 {
                width: 80%;
            }
        }
    }


    .settings-autoresponder-create__footer {
        display: flex;
        width: 100%;
        justify-content: space-between;

        margin-top: auto;
    }
    .settings-autoresponder-create__steps {
        background: var(--messages-color);
        border: 0.74px solid var(--settings-active-background-color);
        box-sizing: border-box;
        border-radius: 3px;

        display: flex;
        height: 34px;
        width: 191px;
    }
    .settings-autoresponder-create__step {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50%;
        position: relative;

        font-style: normal;
        font-weight: normal;
        font-size: 22px;
        line-height: 29px;
        color: var(--settings-active-background-color);

        &:last-of-type {
            &:before {
                content: '';
                border-left: 0px solid transparent;
                border-top: 17px solid transparent;
                border-bottom: 17px solid transparent;
                border-right: 9px solid var(--messages-color);
                position: absolute;
                left: -9px;
            }
        }
        &.settings-autoresponder-create__step_active {
            color: var(--settings-active-font-color);
            background: var(--settings-active-background-color);
            &:before {
                border-right: 9px solid var(--settings-active-background-color);
            }
        }
    }

    .settings-autoresponder-create__message-container {
        //30px отступ и 34px высота степов
        height: calc(100% - 30px - 34px);
        ::-webkit-scrollbar {
            display: none;
        }
    }
    .settings-autoresponder-create__select-list {
        position: absolute;
        width: 100%;
        left: 0;
        top: calc(100% + 5px);
        background: var(--settings-nav-color);
        padding: 6px 12px;
        border-radius: 3px;
        .settings-autoresponder-create__select-item {
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 21px;
            color: var(--settings-dropdown-font-color);
            margin-bottom: 15px;
            &:last-of-type {
                margin-bottom: 0;
            }
            &.settings-autoresponder-create__select-item_active {
                color: var(--settings-active-font-color);
                background: var(--settings-active-background-color);

                .settings-autoresponder-create_svg-path_need-fill {
                    fill: var(--settings-active-font-color);
                }
                .settings-autoresponder-create_svg-path_need-stroke {
                    stroke: var(--settings-active-font-color);
                }
            }
        }
        &.settings-autoresponder-create__select-list_w-74 {
            width: 74%;
            left: auto;
            right: 0;
        }
        &.settings-autoresponder-create__select-list_w-24 {
            width: 24%;
            padding: 0;
            .settings-autoresponder-create__select-item {
                margin-bottom: 0;
                padding: 9px 20px;
                .settings-autoresponder-create__select-pseudo-icon {
                    right: 20px;
                }
            }
        }
        &.settings-autoresponder-create__select-list_table {
            background: transparent;
            border: 0.7px solid var(--settings-dropdown-border-color);
            border-spacing: 0px;
            padding: 0;
            tr {
                height: 56px;
                padding: 0 25px;
                color: var(--folder-color);
                background: transparent;
                td {
                    &:first-of-type {
                        padding-left: 25px;
                    }
                    &:last-of-type {
                        padding-right: 25px;
                    }
                }
                .settings-autoresponder-create__folder-name {
                    font-style: normal;
                    font-weight: normal;
                    font-size: 18px;
                    line-height: 24px;
                }
                .settings-autoresponder-create__folder-count {
                    font-style: normal;
                    font-weight: normal;
                    font-size: 16px;
                    line-height: 21px;
                }
                &:hover {
                    color: var(--settings-recipients-active-font-color);
                    background: var(--settings-nav-color);
                    .settings-autoresponder-create__folder-icon {
                        path{
                            fill: var(--settings-recipients-active-font-color);
                        }
                    }
                }
            }
        }
    }
    .settings-autoresponder-create__select-pseudo-icon {
        position: absolute;
        right: 0;
    }

    .modal-add-to-folder__inner-checkbox {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: var(--create-folder-color);
        display: flex;
        align-items: center;
        justify-content: center;

    }
    .settings-autoresponder-create__folder-checkbox {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: var(--font-color);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: auto;

        &.settings-autoresponder-create__folder-checkbox_active {
            background: var(--green-color);
        }
    }
    .settings-autoresponder-create__dialog-cont {
        display: flex;
        align-items: center;
        div {
            margin-left: 10px;
        }
    }

</style>