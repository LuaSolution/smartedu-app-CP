import { useState } from "react"
import moment from 'moment'

const useFormDatePicker = (init) => {
    const [value, setStateValue] = useState(moment(init))

    /* for Antd */
    const handleChange = (date, dateString) => {
        setStateValue(date)
    }

    const setValue = date => {
        date != null ? setStateValue(moment(date)) : setStateValue()
    }

    const getValue = () => { return moment(value).format('YYYY-MM-DD') }

    return {
        value,
        setValue,
        getValue,
        onChange: handleChange
    }
}

export default useFormDatePicker