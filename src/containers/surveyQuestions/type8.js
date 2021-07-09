import React, { useState } from 'react'
import { Input, message } from 'antd'
import detectMobile from 'helpers/detectMobile'

export default ({ id, options, index, answer, setAnswer }) => {
  const updateSelected = (_selectedId, i) => {
    const _data = answer[index] ? [...answer[index].data] : []
    const _selected =
      answer[index] &&
      answer[index].data[i] &&
      answer[index].data[i].selected === 1
        ? 0
        : 1
    _data[i] = {
      ..._data[i],
      id: _selectedId,
      selected: _selected,
    }

    // setData(_data)
    const _answer = [...answer]
    _answer[index] = {
      id: id,
      data: _data,
    }

    setAnswer(_answer)
  }

  return (
    <table className="table ">
      {!detectMobile() && (
        <thead
          style={{
            border: '1px solid #193769',
            backgroundColor: '#193769',
            color: '#fff',
          }}
        >
          <tr>
            <th>Các kỹ năng</th>
            <th style={{ textAlign: 'center' }}>Lựa chọn</th>
            {/* <th >Ghi chú</th> */}
          </tr>
        </thead>
      )}
      <tbody>
        {options.map((x, i) => (
          <tr key={i}>
            <td style={detectMobile() ? { width: '100%' } : {}}>{x.text}</td>
            <td
              onClick={(e) => {
                if (
                  answer[index] &&
                  answer[index].data &&
                  answer[index].data.filter((i) => i && i.selected === 1)
                    .length > 2
                ) {
                  if (
                    answer[index].data[i] &&
                    answer[index].data[i].selected === 1
                  ) {
                    updateSelected(x.id, i)
                  } else {
                    message.error('Không thể chọn thêm, tối đa 3 lựa chọn!')
                    e.preventDefault()
                  }
                } else {
                  updateSelected(x.id, i)
                }
              }}
              style={
                detectMobile()
                  ? {
                      width: '5%',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                    }
                  : { textAlign: 'center' }
              }
            >
              <input
                name={i}
                type="checkbox"
                checked={
                  answer[index] &&
                  answer[index].data[i] &&
                  answer[index].data[i].selected === 1
                }
                style={
                  detectMobile()
                    ? { width: 20, height: 20 }
                    : { width: 24, height: 24 }
                }
              />
            </td>
            {/* <td style={detectMobile() ? { width: '50%' } : {}}>
            <Input allowClear placeholder="Ghi chú thêm"
              value={answer[index] ? answer[index].data[i] ? answer[index].data[i].note : '' : ''}
              onChange={e => {
                if (answer[index] && answer[index].data[i] && answer[index].data[i].selected === 1) {
                  const { value } = e.target
                  const _data = answer[index] ? [...answer[index].data] : []
                  _data[i] = {
                    ..._data[i],
                    note: value
                  }

                  // setData(_data)
                  const _answer = [...answer]
                  _answer[index] = {
                    id: id,
                    data: _data
                  }

                  setAnswer(_answer)
                }
              }}
            />
          </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
