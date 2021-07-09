import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Input } from 'antd'
import { ABC } from 'defines'
/*
Tạo ra các pairing đánh số từ 0 -> n
*/

const MergingQuestion = forwardRef((props, ref) => {
    const [choices, setChoices] = useState([
        { left: '', right: '' },
        { left: '', right: '' },
        { left: '', right: '' },
        { left: '', right: '' },
    ])

    useImperativeHandle(ref, () => (
        { getState: () => { return choices } }
    ), [choices])

    const gennerateChoice = (item, index) => {
        return <>
            <Input.Group compact style={{ marginBottom: 10 }}>
                <Input addonBefore={ABC[index]}
                    style={{ width: '50%' }} />
                <Input
                    className="site-input-right"
                    addonBefore={'~'}
                    style={{ width: '50%' }} />
            </Input.Group>
        </>
    }

    return <>
        <h3>
            <b>{props.title}</b>
        </h3>
        {choices.map((value, index) => gennerateChoice(value, index))}
    </>
})

export default MergingQuestion