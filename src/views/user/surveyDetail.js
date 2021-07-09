import React, { useState, useEffect } from 'react'
import { Steps, message, Form, Spin, Result } from 'antd'
import { Button } from 'reactstrap'
import Survey from 'containers/surveys'
import UserHeaderLayout from 'components/users/UserHeaderLayout'
import UserFooterLayout from 'components/users/UserFooterLayout'
import axios from 'helpers/axios'
import detectMobile from 'helpers/detectMobile'
import { useParams } from 'react-router-dom'
import { Card, CardBody } from 'reactstrap'
import 'assets/user/survey-detail.css'
const { Step } = Steps
const tempId = 'user_' + Math.random().toString(36).substr(2, 9)

const SurveyDetailPage = () => {
  let { id } = useParams()
  const [currentId, setCurrentId] = useState(null)
  const [current, setCurrent] = useState(0)
  const [answer, setAnswer] = useState([])
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    if (id) {
      setLoading(true)
      axios
        .get('survey/get-info/' + id)
        .then((res) => {
          console.log(res);
          if (res?.data?.status === 200) {
            const { id, title, description, questions } = res.data.data
            setCurrentId(id)
            setData([
              {
                type: 1,
                title,
                content: description,
              },
              ...questions,
            ])
          }
        })
        .finally(() => setLoading(false))
    }
  }, [id])

  const next = () => setCurrent(current + 1)

  const prev = () => setCurrent(current - 1)

  const submitSurvey = () => {
    setLoading(true)
    const filtered = answer.filter((el) => {
      return el !== undefined
    })
    filtered.map((item, i) => {
      const index = data.findIndex((e) => e.id === item.id)
      if (
        data[index].type === 2 ||
        data[index].type === 7 ||
        data[index].type === 9
      ) {
        filtered[i] = {
          ...filtered[i],
          data: filtered[i].data ? filtered[i].data.join('//') : null,
        }
      } else if (data[index].type === 4) {
        filtered[i] = {
          ...filtered[i],
          data: filtered[i].data
            ? filtered[i].data.note
              ? filtered[i].data.note
              : filtered[i].data.selected
            : null,
        }
      }
    })

    axios
      .post('survey/upload-result', {
        survey_list_id: currentId,
        temp_user: tempId,
        result: filtered,
      })
      .then((res) => {
        if (!res || !res.data || res.data.failed) {
          message.error('Cập nhật bài khảo sát thất bại')
        } else {
          message.success('Chúc mừng bạn đã hoàn thành bài khảo sát')
        }
      })
      .finally(() => {
        setLoading(false)
        setStatus(true)
      })
  }

  return (
    <>
      <UserHeaderLayout />
      <Spin spinning={loading}>
        {status ? (
          <Result title="Chúc mừng bạn đã hoàn thành bài khảo sát" />
        ) : (
          data && (
            <Card
              style={{
                width: detectMobile() ? '100%' : '70%',
                margin: '20px auto',
                boxShadow: '2px 6px 30px rgb(78 82 92 / 10%)',
                border: 'none',
              }}
            >
              <CardBody ResContainerThu>
                {!detectMobile() && (
                  <Steps
                    current={current}
                    size="small"
                    onChange={(c) => setCurrent(c)}
                  >
                    {data.map((item, index) => (
                      <Step key={index} title={null} />
                    ))}
                  </Steps>
                )}
                <div
                  style={{
                    marginTop: 30,
                    boxShadow: '2px 6px 30px rgb(78 82 92 / 10%)',
                  }}
                >
                  <Survey
                    data={data[current]}
                    index={current + 1}
                    answer={answer}
                    setAnswer={setAnswer}
                  />
                </div>
                <div style={{ marginTop: 15 }}>
                  <Form.Item>
                    {current > 0 && (
                      <Button
                        style={{ margin: '0 8px' }}
                        outline
                        onClick={prev}
                      >
                        Quay lại
                      </Button>
                    )}
                    {current === data.length - 1 && (
                      <Button color="danger" onClick={submitSurvey}>
                        Gửi khảo sát
                      </Button>
                    )}
                    {current < data.length - 1 && (
                      <Button
                        style={{ backgroundColor: '#193769' }}
                        onClick={next}
                      >
                        Tiếp theo
                      </Button>
                    )}
                  </Form.Item>
                </div>
              </CardBody>
            </Card>
          )
        )}
      </Spin>
      <UserFooterLayout />
    </>
  )
}

export default SurveyDetailPage
