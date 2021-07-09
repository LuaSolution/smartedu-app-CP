import React from 'react'
import { Input, Radio } from 'antd'

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
}

export default ({ id, options, index, answer, setAnswer }) => (
  <div style={{ textAlign: 'center', border: '1px solid #eee', padding: 16 }}>
  <Radio.Group style={{ textAlign: 'left' }}
    onChange={e => {
      console.log(options[e.target.value])
      const _answer = [...answer]
      _answer[index] = {
        id: id,
        data: {
          note: options[e.target.value],
          selected: e.target.value
        }
      }

      setAnswer(_answer)
    }}
    value={answer[index] && answer[index].data.selected}
    size="large"
  >
    {options.map((item, i) => <Radio style={radioStyle} key={i} value={i}>{item}</Radio>)}
    <Radio style={radioStyle} value={options.length}>
      Khác (vui lòng ghi thêm ở dưới)
      <br />
      <Input placeholder="Điền câu trả lời vào ô này" style={{ width: '80%', marginLeft: 10 }}
        allowClear
        value={answer[index] && answer[index].data.note}
        onChange={e => {
          const _answer = [...answer]
          _answer[index] = {
            id: id,
            data: {
              selected: options.length,
              note: e.target.value
            }
          }

          setAnswer(_answer)
        }}
      />
    </Radio>
  </Radio.Group>
  </div>
)