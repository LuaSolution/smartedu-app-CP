import React from 'react'
import { Tooltip } from 'antd'
import styled from 'styled-components'

const Option = styled.span`
  font-size: 16px;
  border: 1px solid lightgrey;
  padding: 5px;
  margin: 0 1px;
  cursor: pointer;
`

const desc = ['KÉM', 'TRUNG BÌNH', 'KHÁ', 'TỐT', 'XUẤT SẮC']

const Rate = ({ onChange, rate = 1 }) => {
  return (
    <>
      <Tooltip title={desc[0]}>
        <Option
          style={
            rate === 1
              ? { color: '#fff', backgroundColor: '#1890ff' }
              : { color: '#1890ff', backgroundColor: '#fff' }
          }
          onClick={() => onChange(1)}
        >
          1
        </Option>
      </Tooltip>
      <Tooltip title={desc[1]}>
        <Option
          style={
            rate === 2
              ? { color: '#fff', backgroundColor: '#1890ff' }
              : { color: '#1890ff', backgroundColor: '#fff' }
          }
          onClick={() => onChange(2)}
        >
          2
        </Option>
      </Tooltip>
      <Tooltip title={desc[2]}>
        <Option
          style={
            rate === 3
              ? { color: '#fff', backgroundColor: '#1890ff' }
              : { color: '#1890ff', backgroundColor: '#fff' }
          }
          onClick={() => onChange(3)}
        >
          3
        </Option>
      </Tooltip>
      <Tooltip title={desc[3]}>
        <Option
          style={
            rate === 4
              ? { color: '#fff', backgroundColor: '#1890ff' }
              : { color: '#1890ff', backgroundColor: '#fff' }
          }
          onClick={() => onChange(4)}
        >
          4
        </Option>
      </Tooltip>
      <Tooltip title={desc[4]}>
        <Option
          style={
            rate === 5
              ? { color: '#fff', backgroundColor: '#1890ff' }
              : { color: '#1890ff', backgroundColor: '#fff' }
          }
          onClick={() => onChange(5)}
        >
          5
        </Option>
      </Tooltip>
    </>
  )
}

export default Rate
