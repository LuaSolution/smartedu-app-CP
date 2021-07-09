import React, { useState } from 'react'
import { Input } from 'antd'
import detectMobile from 'helpers/detectMobile'

export default ({ id, row_number, index, answer, setAnswer }) => {
  const [data, setData] = useState(answer[index] ? answer[index].data : [])

  const updateSelected = (value, i) => {
    const _data = [...data]
    _data[i] = {
      ..._data[i],
      selected: value,
    }

    setData(_data)
    const _answer = [...answer]
    _answer[index] = {
      id: id,
      data: _data,
    }

    setAnswer(_answer)
  }

  return detectMobile() ? (
    <table className="table">
      <thead style={{ backgroundColor: '#193769', color: '#fff' }}>
        <tr>
          <th style={{ width: '75%', padding: 0,}}>Công việc</th>
          <th style={{ width: '5%', padding: 0 }}>Rất ít</th>
          <th style={{ width: '5%', padding: 0 }}>Thỉnh thoảng</th>
          <th style={{ width: '5%', padding: 0 }}>Nhiều lần</th>
        </tr>
      </thead>
      <tbody>
        {[...Array(row_number)].map((x, i) => (
          <tr key={i}>
            <td style={{ width: '75%', padding: 0 }}>
              <Input
                allowClear
                style={{ width: '100%' }}
                placeholder="Điền câu trả lời tại đây"
                value={data[i] && data[i].note}
                onChange={(e) => {
                  const { value } = e.target
                  const _data = [...data]
                  _data[i] = {
                    ..._data[i],
                    note: value,
                  }

                  setData(_data)
                  const _answer = [...answer]
                  _answer[index] = {
                    id: id,
                    data: _data,
                  }

                  setAnswer(_answer)
                }}
              />
            </td>
            <td
              style={{ width: '15%', padding: 0, textAlign: 'center',verticalAlign: 'middle'}}
              onClick={() => updateSelected(1, i)}
            >
              <input
                name={i}
                type="radio"
                checked={
                  answer[index] &&
                  answer[index].data[i] &&
                  answer[index].data[i].selected === 1
                }
                style={{ width: 24, height: 24 }}
              />
            </td>
            <td
              style={{ width: '15%', padding: 0,textAlign: 'center', verticalAlign: 'middle'}}
              onClick={() => updateSelected(2, i)}
            >
              <input
                name={i}
                type="radio"
                checked={
                  answer[index] &&
                  answer[index].data[i] &&
                  answer[index].data[i].selected === 2
                }
                style={{ width: 24, height: 24}}
              />
            </td>
            <td
              style={{ width: '15%', padding: 0,textAlign: 'center' ,verticalAlign: 'middle'}}
              onClick={() => updateSelected(3, i)}
            >
              <input
                name={i}
                type="radio"
                checked={
                  answer[index] &&
                  answer[index].data[i] &&
                  answer[index].data[i].selected === 3
                }
                style={{ width: 24, height: 24 }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <table className="table">
      <thead style={{ backgroundColor: '#193769', color: '#fff' }}>
        <tr>
          <th>Công việc</th>
          <th>Rất ít</th>
          <th>Thỉnh thoảng</th>
          <th>Nhiều lần</th>
        </tr>
      </thead>
      <tbody>
        {[...Array(row_number)].map((x, i) => (
          <tr key={i}>
            <td>
              <Input
                allowClear
                style={{ width: '100%', marginBottom:0 }}
                placeholder="Điền câu trả lời tại đây"
                value={data[i] && data[i].note}
                onChange={(e) => {
                  const { value } = e.target
                  const _data = [...data]
                  _data[i] = {
                    ..._data[i],
                    note: value,
                  }

                  setData(_data)
                  const _answer = [...answer]
                  _answer[index] = {
                    id: id,
                    data: _data,
                  }

                  setAnswer(_answer)
                }}
              />
            </td>
            <td style={{ width: '7%' }} onClick={() => updateSelected(1, i)}>
              <input
                name={i}
                type="radio"
                checked={
                  answer[index] &&
                  answer[index].data[i] &&
                  answer[index].data[i].selected === 1
                }
                style={{ width: 24, height: 24 }}
              />
            </td>
            <td style={{ width: '7%' }} onClick={() => updateSelected(2, i)}>
              <input
                name={i}
                type="radio"
                checked={
                  answer[index] &&
                  answer[index].data[i] &&
                  answer[index].data[i].selected === 2
                }
                style={{ width: 24, height: 24 }}
              />
            </td>
            <td style={{ width: '7%' }} onClick={() => updateSelected(3, i)}>
              <input
                name={i}
                type="radio"
                checked={
                  answer[index] &&
                  answer[index].data[i] &&
                  answer[index].data[i].selected === 3
                }
                style={{ width: 24, height: 24}}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
