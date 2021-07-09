import React, { useState, useEffect } from 'react'
import {
    Card,
    CardBody
} from 'reactstrap'
import {
    Form,
    Input,
    Col,
    Row,
    Typography,
    Spin,
    Select,
    List
} from 'antd'
import axios from 'helpers/axios'
import { NoData } from 'atoms'
import ReactDragListView from "react-drag-listview"

const { Paragraph } = Typography

const AddExam = ({ setSelectedQuestions, selectedQuestions }) => {
    const [questions, setQuestions] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetch = () => {
            setLoading(true)
            axios
                .get('admin/questions/get-all-for-exam')
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

    const onDragEnd = (fromIndex, toIndex) => {
        if (toIndex < 0) return // Ignores if outside designated area

        let items = [...selectedQuestions]
        const item = items.splice(fromIndex, 1)[0]
        items.splice(toIndex, 0, item)
        setSelectedQuestions(items)
    }

    return <Card style={{ marginBottom: 15 }}>
        <CardBody>
            <Spin spinning={loading}>
                <Form layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Chọn câu hỏi">
                                <Select
                                    showSearch
                                    mode="multiple"
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
                                            {item.alias || `Câu hỏi số ${item.id}`}
                                        </Select.Option>
                                    )}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Câu hỏi đã chọn">
                                {questions && selectedQuestions
                                    && selectedQuestions.length > 0
                                    ? <ReactDragListView
                                        nodeSelector=".ant-list-item.draggble"
                                        onDragEnd={onDragEnd}
                                    >
                                        <Card>
                                            <CardBody>
                                                <List dataSource={selectedQuestions}
                                                    style={{ cursor: 'pointer' }}
                                                    renderItem={item => {
                                                        const content = questions.filter(i => i.id === item)
                                                        return content.length > 0 && <List.Item className="draggble" >
                                                            <Paragraph ellipsis={{ rows: 2 }}>
                                                                <div dangerouslySetInnerHTML={{ __html: content[0].content }} />
                                                            </Paragraph>
                                                        </List.Item>
                                                    }}
                                                />
                                            </CardBody>
                                        </Card>
                                    </ReactDragListView>
                                    : <NoData />}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label={'Thời gian làm bài'}>
                                <Input type="number" addonAfter="giây" />
                            </Form.Item>
                        </Col>
                        {/* <Col span={12}>
                        <Form.Item label={'Điểm đạt'}>
                            <Input type="number" addonAfter="%" />
                        </Form.Item>
                    </Col> */}
                    </Row>
                </Form>
            </Spin>
        </CardBody>
    </Card>
}

export default AddExam