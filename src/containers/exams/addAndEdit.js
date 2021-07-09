import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardBody
} from 'reactstrap'
import axios from 'helpers/axios'
import {
  Form,
  Typography,
  Spin,
  Input,
  Select,
  List,
  Alert
} from 'antd'
import momentTime from 'helpers/moment'
import useFormInput from 'helpers/useFormInput'
import { errorMessage, successMessage } from 'helpers/globalMessage'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { NoData } from 'atoms'
import ReactDragListView from "react-drag-listview"

const { Paragraph } = Typography
const layout = {
  labelCol: {
    sm: { span: 5 }
  }
}

const AddNewModal = ({ modalOpen, toggleModal, editId, addNewFlag, addNew, editData }) => {
  const title = useFormInput()
  const description = useFormInput()
  const created_at = useFormInput()
  const [loading, setLoading] = useState(false)
  const [selectedQuestions, setSelectedQuestions] = useState()
  const [questions, setQuestions] = useState(null)
  const [err, setErr] = useState(false)

  useEffect(() => {
    const fetch = () => {
      if (!addNewFlag && editId) {
        setLoading(true)
        axios
          .get('admin/exams/get-info/' + editId)
          .then((res) => {
            return res.data
          })
          .then((data) => {
            if (data.status === 200) {
              title.setValue(data.data.title)
              description.setValue(data.data.description)
              created_at.setValue(data.data.created_at)
              setQuestions(data.data.questions)
              setSelectedQuestions(data.data.question_list.split(',').map(Number))
            }
          })
          .finally(() => setLoading(false))
      } else {
        title.setValue(null)
        description.setValue(null)
      }
    }

    fetch()
  }, [editId, addNewFlag])// eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = () => {

    let list = ''
    selectedQuestions && selectedQuestions.map(i => list += i + ',')
    list = list.replace(/,\s*$/, "")

    if (list != '') {
      setLoading(true)
      const params = {
        title: title.value,
        description: description.value,
        question_list: list
      }

      if (!addNewFlag && editId) {
        axios
          .post('admin/exams/update', { id: editId, ...params })
          .then(res => {
            if (res.data.status === 200) {
              successMessage('Cập nhật đề thi thành công')
              editData({ id: editId, created_at: null, ...params })
            } else {
              errorMessage('Cập nhật đề thi thất bại')
            }
          })
          .finally(() => {
            setLoading(false)
            toggleModal()
          })

      } else {
        axios
          .post('admin/exams/create', params)
          .then(res => {
            if (res.data.status === 200) {
              successMessage('Tạo đề thi thành công')
              addNew({
                id: res.data.data,
                created_at: null,
                ...params
              })
            } else {
              errorMessage('Tạo đề thi thất bại')
            }
          })
          .finally(() => {
            setLoading(false)
            toggleModal()
          })
      }
    } else {
      setErr(true)
    }
  }

  const onDragEnd = (fromIndex, toIndex) => {
    if (toIndex < 0) return // Ignores if outside designated area

    let items = [...selectedQuestions]
    const item = items.splice(fromIndex, 1)[0]
    items.splice(toIndex, 0, item)
    setSelectedQuestions(items)
  }

  return <Modal
    isOpen={modalOpen}
    toggle={toggleModal}
    wrapClassName="modal-right"
    backdrop="static"
    style={{ maxWidth: '700px' }}
  >
    <ModalHeader toggle={toggleModal}>
      {!addNewFlag && editId ? 'Thay đổi nội dung đề thi' : 'Tạo mới đề thi'}
    </ModalHeader>
    <Spin spinning={loading} size='large'>
      <ModalBody>
        {err && <Alert message='Vui lòng chọn câu hỏi' type="error" showIcon style={{ marginBottom: 20 }} />}
        <Form
          {...layout}
          layout="horizontal"
          size="medium"
        >
          <Form.Item label="Tên đề thi">
            <Input {...title} allowClear />
          </Form.Item>
          <Form.Item label="Nội dung đề thi">
            <ReactQuill
              theme="snow"
              {...description}
              modules={quillModules}
              formats={quillFormats}
            />
          </Form.Item>
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
            {selectedQuestions
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
                          <Paragraph ellipsis={{ rows: 1 }}>
                            {content[0].alias || `Câu hỏi số ${content[0].id}`}
                          </Paragraph>
                        </List.Item>
                      }}
                    />
                  </CardBody>
                </Card>
              </ReactDragListView>
              : <NoData />}
          </Form.Item>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Typography.Text code>Ngày tạo: {momentTime(created_at.value || null)}</Typography.Text>
        <Button color="secondary" outline onClick={toggleModal}>
          Hủy
          </Button>
        <Button color="primary" onClick={onSubmit}>
          Cập nhật
          </Button>
      </ModalFooter>
    </Spin>
  </Modal >
}

export default React.memo(AddNewModal)

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