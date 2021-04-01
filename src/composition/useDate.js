export function useDate() {
    const areSameDate = (d1, d2) => {
        return d1.getFullYear() == d2.getFullYear()
            && d1.getMonth() == d2.getMonth()
            && d1.getDate() == d2.getDate();
    }


    const validDate = (date, withToday = false) => {
        let vDate = new Date(date * 1000);
        let vDateNow = new Date();
        let result;
        let yesterday = ( d => new Date(d.setDate(d.getDate()-1)) )(new Date);
        areSameDate(vDate, vDateNow)
            ? (result = withToday? 'Сегодня' : `${vDate.getHours()}:${vDate.getMinutes() < 10? '0'+vDate.getMinutes() : vDate.getMinutes()}`)
            : areSameDate(vDate, yesterday)
                ? result = 'Вчера'
                : result = `${
                        vDate.getDate() < 10
                            ? '0'+vDate.getDate() 
                            : vDate.getDate()
                        }.${
                        vDate.getMonth() + 1 < 10
                            ? '0'+(vDate.getMonth() + 1) 
                            : vDate.getMonth() + 1
                        }.${
                        vDate.getFullYear()
                        }`
        return result;
    }

    const validTime = (date) => {
        let d = new Date(date * 1000);
        return `${d.getHours()}:${d.getMinutes() < 10? '0'+d.getMinutes() : d.getMinutes()}`
    }


    return {
        validDate,
        validTime
    }
}