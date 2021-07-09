import React from 'react'
import {
  Card as AntCard,
  Typography,
  List,
  Col,
  Row,
  Form,
  Input,
  Modal,
} from 'antd'
import { DeleteFilled } from '@ant-design/icons'
import { Button, Card, CardBody } from 'reactstrap'
import ReactDragListView from 'react-drag-listview'
import surveyType from 'helpers/surveyType'
import Questions from './subQuestionList'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import createSlug from 'helpers/createSlug'
import { NoData } from 'atoms'
import QRCode from 'react-qr-code'

const SurveyListinfo = ({
  title,
  slug,
  description,
  questions,
  setQuestions,
}) => {
  const onDragEnd = (fromIndex, toIndex) => {
    if (toIndex < 0) return // Ignores if outside designated area

    let items = [...questions]
    const item = items.splice(fromIndex, 1)[0]
    items.splice(toIndex, 0, item)
    setQuestions(items)
  }

  const removeQuestion = (id) => {
    setQuestions(questions.filter((item) => item.id !== id))
  }

  const addQuestion = () => {
    Modal.info({
      width: '100%',
      title: 'Danh sách câu hỏi khảo sát',
      content: <Questions questions={questions} setQuestions={setQuestions} />,
    })
  }

  return (
    <>
      <Form layout="horizontal" hideRequiredMark>
        <Row gutter={16}>
          {/* title */}
          <Col span={24}>
            <Form.Item label={'Tiêu đề bảng khảo sát'}>
              <Input
                allowClear
                {...title}
                onBlur={() => slug.setValue(createSlug(title.value))}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          {/* slug */}
          <Col span={12}>
            <Form.Item label={'Đường dẫn'}>
              <Input {...slug} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Typography.Paragraph
              copyable={{
                text: window.location.hostname + '/take-survey/' + slug.value,
              }}
            >
              Copy đường dẫn ở đây
            </Typography.Paragraph>
          </Col>
        </Row>
        <Row gutter={12}>
          {/* slug */}
          {/* <Col span={24}>
            <Form.Item label={'QR Code'}>
              <QRCode
                value={
                  window.location.protocol +
                  '//' +
                  window.location.hostname +
                  '/take-survey/' +
                  slug.value
                }
                size={140}
              />
            </Form.Item>
          </Col> */}
        </Row>
        <Row gutter={16}>
          {/* description */}
          <Col span={24}>
            <Form.Item label="Trang chào mừng">
              <ReactQuill
                theme="snow"
                modules={quillModules}
                formats={quillFormats}
                {...description}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <AntCard
        title={
          <h2>
            <b>Danh sách câu hỏi</b>
          </h2>
        }
        bordered={false}
        style={{ width: '100%' }}
        extra={
          <Button color="primary" onClick={addQuestion}>
            Thêm câu hỏi
          </Button>
        }
      >
        {questions && questions.length > 0 ? (
          <ReactDragListView
            nodeSelector=".ant-list-item.draggble"
            onDragEnd={onDragEnd}
          >
            <Card>
              <CardBody>
                <List
                  dataSource={questions}
                  style={{ cursor: 'pointer' }}
                  renderItem={(item, index) => {
                    return (
                      <List.Item
                        actions={[
                          <DeleteFilled
                            style={{ fontSize: 18 }}
                            onClick={() => removeQuestion(item.id)}
                          />,
                        ]}
                        className="draggble"
                      >
                        <List.Item.Meta
                          title={
                            <Typography.Paragraph>
                              {index + 1 + ') ' + item.title}
                            </Typography.Paragraph>
                          }
                        />
                        <List.Item.Meta title={surveyType(item.type)} />
                      </List.Item>
                    )
                  }}
                />
              </CardBody>
            </Card>
          </ReactDragListView>
        ) : (
          <NoData />
        )}
      </AntCard>
    </>
  )
}

export default SurveyListinfo

const quillModules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    ['clean'],
  ],
}

const quillFormats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
]
