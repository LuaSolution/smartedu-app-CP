import moment from 'moment'
import 'moment/locale/vi'
moment.locale('vi')

const momentTime = (time, format = "YYYY-MM-DD h:mm:ss") => {
    if (time === null)
        return moment().fromNow()
    return moment(time, format).fromNow()
}

export default momentTime