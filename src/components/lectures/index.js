import React, { useState, useEffect } from 'react'
import { Button, Card, CardBody } from 'reactstrap'
import { VIDEO, DOCUMENT, SCORM, EXAM } from 'defines'
import UploadVideo from './uploadVideo'
import UploadDocument from './uploadDocument'
import UploadScorm from './uploadScorm'
import AddExam from './addExam'
import {
    Modal,
    Input,
    Spin,
    Select,
    Alert,
    message,
} from 'antd'
import { connect } from 'react-redux'
import axios from 'helpers/axios'
import useFormInput from 'helpers/useFormInput'

const Lecture = ({ chapterIndex,
    lectureIndex,
    type,
    handleOk,
    handleCancel,
    courseChapters }) => {
    const [data, setData] = useState({
        name: 'Bài học mới',
        time_to_skip: 0
    })

    const minutes = useFormInput(0)
    const seconds = useFormInput(0)
    const [selectedQuestions, setSelectedQuestions] = useState()
    const [questions, setQuestions] = useState(null)
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState(null)

    useEffect(() => {
        const fetch = () => {
            setLoading(true)
            axios
                .get('admin/questions/get-all')
                .then(res => {
                    return res.data
                })
                .then(data => {
                    if (data.status === 200) {
                        setQuestions(data.data)
                    }
                })
                .finally(() => setLoading(false))
        }
        fetch()
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (lectureIndex !== undefined) {
            setData(courseChapters[chapterIndex].lectures[lectureIndex])
        }
    }, [chapterIndex, lectureIndex])

    useEffect(() => {
        if (data) {
            if(data.time_to_skip > 0) {
            const _m = Math.floor(data.time_to_skip / 60)
            minutes.setValue(_m)
            seconds.setValue(data.time_to_skip - (_m * 60))
            }
            if (data.questions_to_skip && typeof data.questions_to_skip === 'string') {
                setSelectedQuestions(data.questions_to_skip.split(',').map(Number))
            }
        
            setFile(data.file)
        }
    }, [data])

    const content = () => {
        switch (type) {
            case VIDEO:
                return <UploadVideo data={data} setData={setData} />
            case DOCUMENT:
                return <UploadDocument data={data} setData={setData} />
            case SCORM:
                return <UploadScorm data={data} setData={setData} />
            case EXAM:
                return <AddExam setSelectedQuestions={setSelectedQuestions} selectedQuestions={selectedQuestions} />
            default:
                return null
        }
    }

    const saveLecture = () => {
        if (type === 'EXAM' && (!selectedQuestions || selectedQuestions.length <= 0)) {
            message.error('Danh sách câu hỏi không được để trống !')
            return
        }
        let list = ''
        if (selectedQuestions) {
            if (selectedQuestions.length > 0) {
                selectedQuestions.map(i => list += i + ',')
                list = list.replace(/,\s*$/, "")
            } else {
                list = selectedQuestions
            }
        }

        const _data = {
            ...data,
            type: type,
            time_to_skip: parseInt(minutes.value * 60) + parseInt(seconds.value),
            questions_to_skip: list
        }
        if (lectureIndex !== undefined) {
            handleOk(_data, true)
        } else {
            handleOk(_data)
        }
    }

    return <Modal title='Nội dung bài học' width={800} height={600}
        visible={true} onCancel={handleCancel}
        footer={[<Button outline color='danger' onClick={handleCancel}>Đóng</Button>,
        <Button color="primary" onClick={saveLecture}>Lưu bài học</Button>]}
    >
        <Spin spinning={loading}>
            {type !== EXAM && <Card style={{ marginBottom: 15 }}>
                <CardBody>
                    <Input.Group compact>
                        Thời gian chờ qua bài
                    <Input style={{ marginLeft: 15, width: 100, textAlign: 'center' }}
                            placeholder="phút" type="number"
                            {...minutes}
                        />
                        <Input
                            className="site-input-split"
                            style={{
                                width: 30,
                                borderLeft: 0,
                                borderRight: 0,
                                pointerEvents: 'none'
                            }}
                            placeholder=":"
                            disabled
                        />
                        <Input
                            className="site-input-right"
                            style={{ width: 100, textAlign: 'center' }}
                            placeholder="giây"
                            type="number"
                            {...seconds}
                        />
                    </Input.Group>
                    <Select
                        showSearch
                        style={{ width: 500, marginTop: 20, marginBottom: 20 }}
                        value={selectedQuestions}
                        onChange={value => setSelectedQuestions(value)}
                        placeholder="Chọn câu hỏi"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {questions && questions.map(item =>
                            <Select.Option key={item.id} value={item.id}>
                                {item.content}
                            </Select.Option>
                        )}
                    </Select>
                    {file && <Alert message="Đã tải file lên hệ thống" type="info" showIcon />}
                </CardBody>
            </Card>}
            {content()}
        </Spin>
    </Modal>
}

const mapStateToProps = ({ courses }) => {
    const { courseChapters } = courses
    return { courseChapters }
}

export default connect(mapStateToProps, null)(Lecture)