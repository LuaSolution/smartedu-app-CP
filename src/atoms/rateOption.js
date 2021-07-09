import React from 'react'
import { Tooltip } from 'antd'
import styled from 'styled-components'

const Option = styled.span`
  font-size: 48px;
  margin: 0 10px;
  cursor: pointer;
  opacity: 50%;
`

const desc = ['KÉM', 'TRUNG BÌNH', 'KHÁ', 'TỐT', 'XUẤT SẮC']
const activated = { color: '#007BFE', opacity: '100%' }

const Rate = ({ onChange, rate = 1 }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Tooltip title={desc[0]}>
        <Option style={rate === 1 ? activated : {}} onClick={() => onChange(1)}>
          1
        </Option>
      </Tooltip>
      <Tooltip title={desc[1]}>
        <Option style={rate === 2 ? activated : {}} onClick={() => onChange(2)}>
          2
        </Option>
      </Tooltip>
      <Tooltip title={desc[2]}>
        <Option style={rate === 3 ? activated : {}} onClick={() => onChange(3)}>
          3
        </Option>
      </Tooltip>
      <Tooltip title={desc[3]}>
        <Option style={rate === 4 ? activated : {}} onClick={() => onChange(4)}>
          4
        </Option>
      </Tooltip>
      <Tooltip title={desc[4]}>
        <Option style={rate === 5 ? activated : {}} onClick={() => onChange(5)}>
          5
        </Option>
      </Tooltip>
      <br />
      <span>
        <b>{desc[rate - 1]}</b>
      </span>
    </div>
  )
}

export default Rate
