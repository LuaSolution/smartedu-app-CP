import { useState } from "react"

const useFormSelect = (init = "") => {
    const [value, setValue] = useState(init)

    /* for Antd */
    const handleChange = item => setValue(item)

    return {
        value,
        setValue,
        onChange: handleChange
    }
}

export default useFormSelect