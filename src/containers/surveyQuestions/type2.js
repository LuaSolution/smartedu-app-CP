import React from 'react'
import { Form, Input } from 'antd'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
}

export default ({ id, row_number, index, answer, setAnswer }) => {
  return (
    <div className="type2">
      {[...Array(row_number)].map((x, i) => (
        <Input
          key={i}
          size="large"
          allowClear
          style={{ width: '100%' }}
          placeholder="Điền câu trả lời tại đây"
          value={answer[index] ? answer[index].data[i] : ''}
          onChange={(e) => {
            const { value } = e.target
            const _ans = answer[index] ? [...answer[index].data] : []
            _ans[i] = value
            const _answer = [...answer]
            _answer[index] = {
              id: id,
              data: _ans,
            }
            setAnswer(_answer)
          }}
        />
      ))}
    </div>
  )
}
