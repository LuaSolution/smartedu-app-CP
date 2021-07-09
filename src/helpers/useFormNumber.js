import { useState } from "react"

const regExp = new RegExp("^[0-9]+$")

const useFormNumber = (init = "") => {
    const [value, setValue] = useState(init)

    /* for Antd */
    const handleChange = e => {
        const _value = typeof e == "object" ? e.target.value : e
        const isValid = regExp.test(_value)
        if (_value === '' || isValid === true) {
            setValue(_value)
        }
    }

    return {
        value,
        setValue,
        onChange: handleChange
    }
}

export default useFormNumber