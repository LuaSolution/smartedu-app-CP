import React from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'

export default ({ id, options, index, answer, setAnswer }) => {
  return (
    <form style={{ textAlign: 'center' }}>
      {options.map((x, i) => (
        <div style={{ marginBottom: 10 }}>
          <span>{x}: </span>
          <DatePicker
            placeholder="Điền câu trả lời tại đây"
            value={answer[index] ? moment(answer[index].data[i]) : ''}
            onChange={(date, dateStr) => {
              const value = dateStr
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
        </div>
      ))}
    </form>
  )
}
