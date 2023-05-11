const moment = require('moment')

const dateFormatter = (date) => {
    const _date = moment(date).locale('uk')
    const dayOfWeek = _date.format('dddd')

    const formattedDate = _date.calendar({
        sameDay: '[Сьогодні в] HH:mm',
        lastDay: '[Вчора в] HH:mm',
        lastWeek: dayOfWeek.charAt(0).toUpperCase() + 
        dayOfWeek.slice(1) + ' [в] HH:mm',
        sameElse: 'DD MMMM YYYY'
    })


    return formattedDate
}

module.exports = dateFormatter