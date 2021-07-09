import React from 'react'
import Rate from 'atoms/rateOptionSmall'

export default ({ id, data, index, answer, setAnswer }) => {
  const getPreRate = (id) => {
    const _index = answer[index]
      ? answer[index].data.findIndex((value) => value.id === id)
      : -1
    if (_index !== -1) {
      return answer[index].data[_index].preRate
    }
    return null
  }

  const getPostRate = (id) => {
    const _index = answer[index]
      ? answer[index].data.findIndex((value) => value.id === id)
      : -1
    if (_index !== -1) {
      return answer[index].data[_index].postRate
    }
    return null
  }

  return (
    <table className="table">
      <thead style={{ backgroundColor: '#193769', color: '#fff' }}>
        <tr>
          <th>TRƯỚC ĐÀO TẠO</th>
          <th>TỰ ĐÁNH GIÁ KIẾN THỨC VÀ KỸ NĂNG CỦA BẠN LIÊN QUAN ĐẾN</th>
          <th>SAU ĐÀO TẠO</th>
        </tr>
      </thead>
      <tbody style={{ textAlign: 'left' }}>
        {data.data.options.map((item, i) => (
          <tr key={i}>
            <td style={{ width: '15%' }}>
              <Rate
                rate={getPreRate(item.id)}
                onChange={(value) => {
                  const _answer = [...answer]
                  const currentResult =
                    _answer[index] !== undefined
                      ? _answer[index]
                      : { id: id, data: [] }
                  const _i = currentResult.data.findIndex(
                    (value) => value.id === item.id
                  )
                  if (_i === -1) {
                    currentResult.data.push({
                      id: item.id,
                      preRate: value,
                      postRate: null,
                    })
                  } else {
                    currentResult.data[_i] = {
                      id: item.id,
                      preRate: value,
                      postRate: currentResult.data[_i].postRate,
                    }
                  }
                  _answer[index] = { ...currentResult }

                  setAnswer(_answer)
                }}
              />
            </td>
            <td>{item.option}</td>
            <td style={{ width: '15%' }}>
              <Rate
                rate={getPostRate(item.id)}
                onChange={(value) => {
                  const _answer = [...answer]
                  const currentResult =
                    _answer[index] !== undefined
                      ? _answer[index]
                      : { id: id, data: [] }
                  const _i = currentResult.data.findIndex(
                    (value) => value.id === item.id
                  )
                  if (_i === -1) {
                    currentResult.data.push({
                      id: item.id,
                      preRate: null,
                      postRate: value,
                    })
                  } else {
                    currentResult.data[_i] = {
                      id: item.id,
                      preRate: currentResult.data[_i].preRate,
                      postRate: value,
                    }
                  }
                  _answer[index] = { ...currentResult }

                  setAnswer(_answer)
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
