import React from 'react'
import Rate from 'atoms/rateOptionSmall'

export default ({ id, data, index, answer, setAnswer }) => {
  const getRate = id => {
    const _index = answer[index] ? answer[index].data.findIndex(value => value.id === id) : -1
    if (_index === -1) {
      return null
    } else {
      return answer[index].data[_index].rate
    }

  }

  return <table className="table">
    <thead style={{ backgroundColor: '#193769', color: '#fff' }}>
      <tr>
        <th>Nhóm năng lực</th>
        <th>Hành vi năng lực</th>
        <th>Đánh giá</th>
      </tr>
    </thead>
    <tbody style={{ textAlign: 'left' }}>
      {data.data.map((x, i) =>
        x.options.map((item, _index) => <tr key={Math.random()}>
          {_index === 0 && <td rowSpan={x.options.length}
            style={{ textAlign: 'center', verticalAlign: 'middle', width: '10%' }}><b>{x.group_name}</b></td>}
          <td>{item.option}</td>
          <td style={{ width: '15%' }}>
            <Rate
              rate={getRate(item.id)}
              onChange={value => {
                const _answer = [...answer]
                const currentResult = _answer[index] !== undefined ? _answer[index] : { id: id, data: [] }
                const _i = currentResult.data.findIndex(value => value.id === item.id)
                if (_i === -1) {
                  currentResult.data.push({ id: item.id, rate: value })
                } else {
                  currentResult.data[_i] = { id: item.id, rate: value }
                }
                _answer[index] = { ...currentResult }

                setAnswer(_answer)
              }} />
          </td>
        </tr>)
      )}
    </tbody>
  </table>
}