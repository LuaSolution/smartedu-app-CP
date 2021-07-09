import { useState } from "react"

const useFormInput = (init = "") => {
    const [value, setValue] = useState(init)

    /* for Antd */
    const handleChange = e => typeof e == "object" ? setValue(e.target.value) : setValue(e)

    return {
        value: value || '',
        setValue,
        onChange: handleChange
    }
}

export default useFormInput