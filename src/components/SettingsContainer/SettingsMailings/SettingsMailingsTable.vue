<template>
    <table class="settings-mailings-table">
        <tr>
            <th>Название</th>
            <th>Статус</th>
            <th>Кол-во отправленных</th>
            <th>Дата создания</th>
            <th>Дата обновления</th>
            <th></th>
        </tr>
        <tr v-for="mailing in mailings"
            :key="mailing.mass_sending_id"
        >
            <td>{{mailing.name}}</td>
            <td>{{mailing.status}}</td>
            <td>{{mailing.sent_count}}</td>
            <td>{{validDate(mailing.created_at, true)}}</td>
            <td>{{validDate(mailing.updated_at, true)}}</td>
            <td>
                <div class="settings-mailings-table__actions-container">
                    <div v-if="mailing.is_enabled"
                         class="settings-mailings-table__action pointer"
                         @click="stop(mailing.mass_sending_id)"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 6C5 5.44772 5.44772 5 6 5H10C10.5523 5 11 5.44772 11 6V10C11 10.5523 10.5523 11 10 11H6C5.44772 11 5 10.5523 5 10V6Z" fill="#EDEDEF"/>
                            <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" stroke="#EDEDEF"/>
                        </svg>
                    </div>
                    <div v-else
                         class="settings-mailings-table__action pointer"
                         @click="restore(mailing.mass_sending_id)"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" stroke="url(#paint0_linear)"/>
                            <path d="M11.5 7.13397C12.1667 7.51887 12.1667 8.48113 11.5 8.86603L7 11.4641C6.33333 11.849 5.5 11.3679 5.5 10.5981L5.5 5.40192C5.5 4.63212 6.33333 4.151 7 4.5359L11.5 7.13397Z" fill="url(#paint1_linear)"/>
                            <defs>
                                <linearGradient id="paint0_linear" x1="-6.61729" y1="22.321" x2="19.358" y2="-3.06173" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#00BF6D"/>
                                    <stop offset="1" stop-color="#98D730"/>
                                </linearGradient>
                                <linearGradient id="paint1_linear" x1="-0.950617" y1="-1.1358" x2="14.9136" y2="15.0988" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#00BF6D"/>
                                    <stop offset="1" stop-color="#98D730"/>
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div class="settings-mailings-table__action pointer"
                        @click="edit(mailing.mass_sending_id)"
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.0383 8.26474C12.7431 8.26474 12.5039 8.50395 12.5039 8.79909V12.9314H1.06871V1.49632H5.20107C5.49622 1.49632 5.73542 1.25711 5.73542 0.961964C5.73542 0.666815 5.49622 0.427612 5.20107 0.427612H0.534356C0.239205 0.427612 0 0.666815 0 0.961964V13.4658C0 13.7609 0.239232 14.0001 0.534356 14.0001H13.0383C13.3334 14.0001 13.5726 13.7609 13.5726 13.4658V8.79909C13.5726 8.50397 13.3334 8.26474 13.0383 8.26474Z" fill="#EDEDEF"/>
                            <path d="M13.8435 2.06243L11.9379 0.15657C11.8377 0.0562734 11.7018 0 11.5601 0C11.4183 0 11.2826 0.0562734 11.1823 0.15657L4.87687 6.4619C4.81204 6.52657 4.7652 6.60671 4.74026 6.69471L3.99216 9.34866C3.9398 9.53479 3.992 9.73465 4.12877 9.87145C4.2303 9.97297 4.36675 10.028 4.50656 10.028C4.55482 10.028 4.60363 10.0214 4.65137 10.0081L7.30535 9.25996C7.3935 9.23502 7.47368 9.18799 7.53832 9.12335L13.8435 2.81802C14.0523 2.60941 14.0523 2.27098 13.8435 2.06243ZM6.88141 8.26908L5.2796 8.72041L5.73113 7.11897L11.5601 1.29011L12.7102 2.44021L6.88141 8.26908Z" fill="#EDEDEF"/>
                        </svg>
                    </div>
                    <div class="settings-mailings-table__action settings-mailings-table__action_red pointer"
                        @click="del(mailing.mass_sending_id)"
                    >
                        <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.6293 1.40432H8.12855V0.456531C8.12855 0.204422 7.92415 0 7.67201 0H4.32809C4.07598 0 3.87156 0.204395 3.87156 0.456531V1.40432H1.37084C1.11873 1.40432 0.914307 1.60871 0.914307 1.86085V3.26514C0.914307 3.51725 1.1187 3.72168 1.37084 3.72168H1.50953L1.92679 13.5629C1.93713 13.8072 2.1383 14 2.38288 14H9.61717C9.86178 14 10.0629 13.8072 10.0733 13.5628L10.4905 3.72165H10.6292C10.8813 3.72165 11.0857 3.51725 11.0857 3.26512V1.86085C11.0858 1.60869 10.8814 1.40432 10.6293 1.40432ZM4.78462 0.913035H7.21548V1.40432H4.78462V0.913035ZM9.17964 13.087H2.82047L2.42338 3.72168H9.57667L9.17964 13.087ZM10.1727 2.80861C9.75793 2.80861 2.07587 2.80861 1.82737 2.80861V2.31736H10.1727V2.80861Z" fill="#EDEDEF"/>
                        </svg>
                    </div>
                </div>
            </td>
        </tr>
    </table>
</template>

<script>
    import {useMailings} from "../../../composition/useMailings";
    import {useDate} from "../../../composition/useDate";

    export default {
        setup(props, {emit}) {
            const { getMailings, mailings, deleteMailing, restoreMailing, stopMailing } = useMailings();

            const { validDate } = useDate();
            getMailings();

            const del = (id) => {
                deleteMailing([id])
                    .then(() => {
                        getMailings();
                    })
            }

            const stop = (id) => {
                stopMailing([id])
                    .then(() => {
                        getMailings();
                    })
            }
            const restore = (id) => {
                restoreMailing([id])
                    .then(() => {
                        getMailings();
                    })
            }

            const edit = (id) => {
                emit('gotoCreate', id);
            }

            return {
                getMailings,
                restore,
                stop,
                mailings,
                validDate,

                del,
                edit,
            }
        }
    }
</script>

<style lang="scss">
    .settings-mailings-table {
        width: 100%;
        border-spacing: 0;
        th {
            font-style: normal;
            font-weight: normal;
            font-size: 18px;
            line-height: 24px;
            color: var(--create-folder-header-color);
            text-align: left;
            padding: 12px;
            &:first-of-type {
                padding-left: 16px;
            }
            &:last-of-type {
                padding-right: 16px;
            }
            border-bottom: 1px solid var(--create-folder-border-color);
        }
        td {
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 21px;
            color: var(--create-folder-border-color);
            text-align: left;
            padding: 26px 16px;
            &:first-of-type {
                padding-left: 16px;
            }
            &:last-of-type {
                padding-right: 16px;
            }
            border-bottom: 1px solid var(--create-folder-border-color);
        }
    }
    .settings-mailings-table__actions-container {
        display: flex;
        .settings-mailings-table__action {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 22px;
            height: 22px;

            background: var(--default-svg-fill);
            border-radius: 2px;
            margin-right: 5px;
            &:last-of-type {
                margin-right: 0;
            }
            &.settings-mailings-table__action_red {
                background: var(--red-color);
            }
        }

    }
</style>