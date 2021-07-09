import React from 'react'
import {
    InputNumber
} from 'antd'

export default ({ value, handleChange }) => (
    <InputNumber
        style={{ width: '100%' }}
        value={value}
        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        parser={value => value.replace(/\$\s?|(,*)/g, '')}
        onChange={handleChange} />
)