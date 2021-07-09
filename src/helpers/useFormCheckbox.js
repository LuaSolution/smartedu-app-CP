import { useState } from "react"

const useFormCheckbox = (init = false) => {
    const [value, setValue] = useState(init)

    /* for Antd */
    const handleChange = e => setValue(e.target.checked)

    return {
        value,
        setValue,
        onChange: handleChange
    }
}

export default useFormCheckbox