import React from 'react'
import Rate from 'atoms/rateOption'

export default ({ id, index, answer, setAnswer }) => (
  <Rate
    onChange={(value) => {
      const _answer = [...answer]
      _answer[index] = {
        id: id,
        data: value,
      }
      setAnswer(_answer)
    }}
    rate={answer[index] && answer[index].data}
  />
)
