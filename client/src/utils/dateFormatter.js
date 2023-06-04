import moment from 'moment'
import 'moment/locale/uk'

const dateFormatter = (date) => {
    const _date = moment(date).locale('uk')
    const dayOfWeek = _date.format('dddd')

    const now = moment()
    const diffMinutes = now.diff(_date, 'minutes')
  
    if (diffMinutes < 1) {
        return 'Щойно'
    } else if (diffMinutes < 60) {
        return `${diffMinutes} хвилин тому`
    }

    const formattedDate = _date.calendar({
        sameDay: '[Сьогодні в] HH:mm',
        lastDay: '[Вчора в] HH:mm',
        lastWeek: dayOfWeek.charAt(0).toUpperCase() + 
        dayOfWeek.slice(1) + ' [в] HH:mm',
        sameElse: 'DD MMMM YYYY'
    })

    return formattedDate
}

export default dateFormatter