import React, { useState, forwardRef, useImperativeHandle } from 'react'

const MissingWords = forwardRef((props, ref) => {
    const [choices, setChoices] = useState([
        { char: 'A', value: '' },
        { char: 'B', value: '' },
        { char: 'C', value: '' },
        { char: 'D', value: '' },
    ])
    const [value, setValue] = useState("A")

    useImperativeHandle(ref, () => (
        { getState: () => { return { choices, value } } }
    ), [choices, value])

    // const gennerateChoice = (char = 'X') => {
    //     return null
    // }

    return <h3>
        <b>{props.title}</b>
    </h3>
})

export default MissingWords