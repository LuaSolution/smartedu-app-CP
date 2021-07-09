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
import IntlMessages from 'helpers/IntlMessages'
import axios from 'helpers/axios'
import {
  Form,
  Input,
  Spin,
  Typography,
  message,
  Avatar
} from 'antd'
import momentTime from 'helpers/moment'
import { AVATAR_PATH } from 'defines'

const layout = {
  labelCol: {
    sm: { span: 5 }
  }
}
const { TextArea } = Input

const AddNewModal = ({ modalOpen, toggleModal, editId, addNewFlag, editqanda }) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetch = () => {
      if (!addNewFlag && editId) {
        setLoading(true)
        axios
          .get('admin/qanda/get-info/' + editId)
          .then((res) => {
            return res.data
          })
          .then((data) => {
            const { data: _data } = data
            setData(_data)
          })
          .finally(() => setLoading(false))
      } else {
      }
    }

    fetch()
  }, [editId, addNewFlag]) // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = () => {
    setLoading(true)

    const params = {
      content: data.answer_content
    }

    if (!addNewFlag && editId) {
      axios
        .post('admin/qanda/update', { id: editId, ...params })
        .then(res => {
          if (res.data.status === 200) {
            message.success('Cập nhật hỏi đáp thành công')
            // editqanda({ id: editId, ...params })
          } else {
            message.errorr('Cập nhật hỏi đáp thất bại')
          }
        })
        .finally(() => {
          setLoading(false)
          toggleModal()
        })
    } else {
      axios
        .post('admin/qanda/update', params)
        .then(res => {
          if (res.data.failed) {
            message.errorr('Tạo hỏi đáp thất bại')
          } else {
            message.success('Tạo hỏi đáp thành công')
          }
        })
        .finally(() => setLoading(false))
    }
  }

  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
      style={{ maxWidth: '700px' }}
    >
      <ModalHeader toggle={toggleModal}>
        {!addNewFlag && editId ? 'Giái đáp thắc mắc trong khóa học' : 'Thêm mới câu hỏi'}
      </ModalHeader>
      <Spin spinning={loading}>
        <ModalBody>
          {data && <Form
            {...layout}
            layout="horizontal"
            size="medium"
          >
            <Form.Item label='Khóa học'>
              <b>{data.title}</b>
            </Form.Item>

            <Card>
              <CardBody>
                <Form.Item label='Người hỏi'>
                  {data.first_name + ' ' + data.last_name}
                  <Avatar src={AVATAR_PATH + data.questioner_id + '.webp'}
                    height={70} />
                </Form.Item>
                <Form.Item label='Tiêu đề câu hỏi'>
                  {data.question_title}
                </Form.Item>
                <Form.Item label='Nội dung câu hỏi'>
                  {data.question_content}
                </Form.Item>
              </CardBody>
            </Card>

            <Card style={{ marginTop: 15 }}>
              <CardBody>
                <Form.Item label='Người trả lời'>
                  {data.responder_id && <>
                    {data.responder_first_name + ' ' + data.responder_last_name}
                    <Avatar src={AVATAR_PATH + data.responder_id + '.webp'}
                      height={70} />
                  </>}
                </Form.Item>
                <Form.Item label='Câu trả lời'>
                  <TextArea rows={4} value={data.answer_content} onChange={e => setData({ ...data, answer_content: e.target.value })} />
                </Form.Item>
              </CardBody>
            </Card>
          </Form>}
        </ModalBody>
        <ModalFooter>
          {!addNewFlag && editId
            && <Typography.Text code>Ngày tạo: {momentTime(data ? data.created_at : null)}</Typography.Text>}
          {' '}
          <Button color="secondary" outline onClick={toggleModal}>
            <IntlMessages id="user.cancel" />
          </Button>
          <Button color="primary" onClick={onSubmit}>
            <IntlMessages id="user.submit" />
          </Button>
        </ModalFooter>
      </Spin>
    </Modal >
  )
}

export default React.memo(AddNewModal)