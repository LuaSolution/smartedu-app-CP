import React from 'react'
import { Form, Input } from 'antd'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
}

export default ({ id, options, index, answer, setAnswer, isPercent = true }) => {
  return <Form
    {...layout}
  >
    {options.map((x, i) => <Form.Item
      key={i}
      label={x}
    >
      <Input size="large" allowClear placeholder={isPercent ? "Điền số % tại đây" : "Điền số thứ tự tại đây"}
        value={answer[index] ? answer[index].data[i] : ''}
        onChange={e => {
          const { value } = e.target
          const _ans = answer[index] ? [...answer[index].data] : []
          _ans[i] = value
          const _answer = [...answer]
          _answer[index] = {
            id: id,
            data: _ans
          }
          setAnswer(_answer)
        }} />
    </Form.Item>
    )}
  </Form>
}