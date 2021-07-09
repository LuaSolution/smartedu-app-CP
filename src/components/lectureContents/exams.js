import React, { useState, useEffect } from 'react'
import { QuestionBlock, RadioInput, ConfettiModal } from 'atoms'
import axios from 'helpers/axios'
import { Steps, Input, Spin } from 'antd'
import { connect } from 'react-redux'
import { updateCourseContents } from 'redux/actions'
import { Button } from 'reactstrap'
import './style.css'
import detectMobile from 'helpers/detectMobile'
import FileUpload from 'atoms/fileUpload'
import { useParams } from "react-router-dom"

const { Step } = Steps
const { TextArea } = Input

const Exams = ({ data, updateCourseContents }) => {
    const [loading, setLoading] = useState(false)
    const [finish, setFinish] = useState(false)
    const [isSubmitted, setSubmitted] = useState(false)
    const [questions, setQuestions] = useState([])
    const [current, setCurrent] = useState(0)
    const [answer, setAnswer] = useState([]);
    let { slug, lesson } = useParams()

    const next = () => {
        setCurrent(current + 1)
    }

    const prev = () => {
        setCurrent(current - 1)
    }

    useEffect(() => {
        if (data && data.questions_to_skip) {
            console.log(data)
            setLoading(true)
            const list = data.questions_to_skip.split(',')
            axios.post('admin/questions/get-list-question', { list })
                .then(res => {
                    if (res.data.status === 200) {
                        setQuestions(res.data.data)
                        updateCourseContents('allowToNext', false)
                    }
                })
                .finally(() => setLoading(false))
        }
    }, [data])

    const renderContent = (item, index) => {
        if (item.type === 0) {
            return <>
                <QuestionBlock
                    question={item.content}
                    index={parseInt(index) + 1}
                >
                    <TextArea showCount value={answer[current] && answer[current].text}
                        onChange={e => {
                            const _input = [...answer]
                            _input[current] = {
                                ..._input[current],
                                id: item.id,
                                text: e.target.value
                            }
                            setAnswer(_input)
                        }}
                        placeholder='Gõ nội dung bài tự luận vào khung này đây hoặc upload tài liệu vào ô bên dưới đều được.'
                        autoSize={{ minRows: 5, maxRows: 20 }} />
                </QuestionBlock>
                {!isSubmitted && <FileUpload uploadedFile={(id, fileName, fileSize) => {
                    const _input = [...answer]
                    _input[current] = {
                        ..._input[current],
                        id: item.id,
                        file: id
                    }
                    setAnswer(_input)
                }} fileType='document' />}
            </>
        } else if (item.type === 1 || item.type === 2) {
            return <QuestionBlock
                index={parseInt(index) + 1}
                question={item.content}
            >
                {item.choices.map((i, j) =>
                    <RadioInput
                        key={j}
                        checked={answer[current] && answer[current].selected === i.id}
                        content={i.content}
                        onClick={() => {
                            const _input = [...answer]
                            _input[current] = {
                                id: item.id,
                                selected: i.id
                            }
                            setAnswer(_input)
                        }}
                    />)}
            </QuestionBlock>
        }
    }

    const submitAnswers = () => {
        if (slug && lesson) {
            setLoading(true)
            axios.post('lectures/post-lecture-test-result', {
                id: lesson,
                course_id: slug,
                answers: answer
            })
                .then(res => {
                    if (res.data.status === 200) {
                        setFinish(true)
                        updateCourseContents('allowToNext', true)
                        setSubmitted(true)
                    }
                })
                .finally(() => setLoading(false))
        }
    }

    return <Spin spinning={loading}>
        {questions && <div style={{ paddingTop: 15 }}>
            {detectMobile() ?
                <p style={{ textAlign: 'center' }}>Câu {parseInt(current) + 1} /  {questions.length}</p>
                : <Steps current={current} size="small">
                    {questions.map((item, index) => (
                        <Step key={index} title={'Câu ' + parseInt(index + 1)} />
                    ))}
                </Steps>}
            <div className="steps-content">
                {questions[current] && renderContent(questions[current], current)}
            </div>
            <div className="steps-action">
                {current > 0 && (
                    <Button style={{ backgroundColor: '#4063E0' }}
                        onClick={prev}>
                        {'Câu trước'}
                    </Button>
                )}
                {current < questions.length - 1 && (
                    <Button style={{ backgroundColor: '#193769' }} onClick={next}>
                        {'Câu tiếp theo'}
                    </Button>
                )}
                {current === questions.length - 1 && !isSubmitted && (
                    <Button style={{ backgroundColor: '#193769' }}
                        onClick={submitAnswers}>
                        Nộp bài
                    </Button>
                )}
            </div>
        </div>}
        <ConfettiModal modal={finish} closeModal={() => {
            setFinish(false)
        }} />
    </Spin>
}

const mapActionToProps = { updateCourseContents }

export default connect(null, mapActionToProps)(Exams)