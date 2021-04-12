<template>
    <table class="settings-mailings-table">
        <tr>
            <th>Название</th>
            <th>Статус</th>
            <th>Кол-во отправленных</th>
            <th>Дата создания</th>
            <th>Дата обновления</th>
        </tr>
        <tr>
            <td>Название</td>
            <td>Название</td>
            <td>7</td>
            <td>23 апреля 2021</td>
            <td>27 апреля 2021</td>
        </tr>
        <tr>
            <td>Название</td>
            <td>Название</td>
            <td>7</td>
            <td>23 апреля 2021</td>
            <td>27 апреля 2021</td>
        </tr>
    </table>
</template>

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
</style>