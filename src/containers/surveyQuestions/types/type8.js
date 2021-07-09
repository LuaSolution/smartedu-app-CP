import React from 'react'
import { Button } from 'reactstrap'
import { Input } from 'antd'

const Type8 = ({ type, setType }) => <>
    {type.map((item, index) => <Input style={{ marginBottom: 15 }}
        key={index} value={item}
        allowClear
        onChange={e => {
            const options = [...type]
            options[index] = e.target.value
            setType(options)
        }} />)}
    <Button onClick={() => {
        const options = [...type, '']
        setType(options)
    }}>Thêm lựa chọn</Button>
</>

export default Type8