import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardTitle } from 'reactstrap'
import Type1 from 'containers/surveyQuestions/type1'
import Type2 from 'containers/surveyQuestions/type2'
import Type3 from 'containers/surveyQuestions/type3'
import Type4 from 'containers/surveyQuestions/type4'
import Type5 from 'containers/surveyQuestions/type5'
import Type6 from 'containers/surveyQuestions/type6'
import Type7 from 'containers/surveyQuestions/type7'
import Type8 from 'containers/surveyQuestions/type8'
import Type9 from 'containers/surveyQuestions/type9'
import Type10 from 'containers/surveyQuestions/type10'

const Survey = ({ data, index, answer, setAnswer }) => {
  const [rate6, setRate6] = useState([])
  const [rate10, setRate10] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [index])

  const renderContent = () => {
    switch (data.type) {
      case 1:
        return <Type1 content={data.content} />
      case 2:
        return (
          <Type2
            row_number={data.row_number}
            id={data.id}
            index={index}
            answer={answer}
            setAnswer={setAnswer}
          />
        )
      case 3:
        return (
          <Type3
            index={index}
            id={data.id}
            answer={answer}
            setAnswer={setAnswer}
          />
        )
      case 4:
        return (
          <Type4
            options={data.options}
            id={data.id}
            index={index}
            answer={answer}
            setAnswer={setAnswer}
          />
        )
      case 5:
        return (
          <Type5
            row_number={data.row_number}
            id={data.id}
            index={index}
            answer={answer}
            setAnswer={setAnswer}
          />
        )
      case 6:
        return (
          <Type6
            data={data}
            rate={rate6}
            id={data.id}
            setRate={setRate6}
            index={index}
            answer={answer}
            setAnswer={setAnswer}
          />
        )
      case 7:
        return (
          <Type7
            options={data.options}
            id={data.id}
            index={index}
            answer={answer}
            setAnswer={setAnswer}
            isPercent={true}
          />
        )
      case 71:
        return (
          <Type7
            options={data.options}
            id={data.id}
            index={index}
            answer={answer}
            setAnswer={setAnswer}
            isPercent={false}
          />
        )
      case 8:
        return (
          <Type8
            options={data.options}
            id={data.id}
            index={index}
            answer={answer}
            setAnswer={setAnswer}
          />
        )
      case 9:
        return (
          <Type9
            options={data.options}
            id={data.id}
            index={index}
            answer={answer}
            setAnswer={setAnswer}
          />
        )
      case 10:
        return (
          <Type10
            data={data}
            rate={rate10}
            id={data.id}
            setRate={setRate10}
            index={index}
            answer={answer}
            setAnswer={setAnswer}
          />
        )
      default:
        return null
    }
  }

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5" style={data.type === 1 ? { color: '#4063E0' } : {}}>
          <b>
            <div dangerouslySetInnerHTML={{ __html: data.title }} />
          </b>
        </CardTitle>
        {renderContent()}
      </CardBody>
    </Card>
  )
}

export default Survey
