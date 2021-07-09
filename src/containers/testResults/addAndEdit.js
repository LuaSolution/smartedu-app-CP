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
  message,
  Alert,
  Popconfirm
} from 'antd'
import { SingleChoice } from 'components/questions'
import { ROOT } from 'defines'

const layout = {
  labelCol: {
    sm: { span: 5 }
  }
}
const { TextArea } = Input

const AddNewModal = ({ modalOpen, toggleModal, courseId, userId, lectureId, addNewFlag }) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [score, setScore] = useState(null)

  useEffect(() => {
    const fetch = () => {
      if (!addNewFlag && courseId && userId && lectureId) {
        setLoading(true)
        axios
          .get('admin/test-results/get-info/' + courseId + '/' + userId + '/' + lectureId)
          .then(res => {
            return res.data
          })
          .then(data => {
            const { data: _data } = data
            setData(_data)
            setScore(_data.result)
          })
          .finally(() => setLoading(false))
      } else {
      }
    }

    fetch()
  }, [courseId, userId, lectureId, addNewFlag]) // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = () => {

    if (!addNewFlag && courseId && userId && lectureId && score) {
      setLoading(true)
      axios
        .post('admin/test-results/update', {
          courseId: courseId,
          userId: userId,
          lectureId: lectureId,
          score: score
        })
        .then(res => {
          if (res.data.status === 200) {
            message.success('chấm bài thành công')
          } else {
            message.errorr('Chấm bài thất bại')
          }
        })
        .finally(() => {
          setLoading(false)
          toggleModal()
        })
    }
  }

  const removeData = () => {
    axios
      .post('admin/test-results/delete', {
        course_id: courseId,
        user_id: userId,
        lecture_id: lectureId
      })
      .then(res => {
        message.success('Xóa bài viết thành công')
      })
      .catch(err => {
        message.errorr('Xóa bài viết thất bại')
      })
      .finally(() => {
        setLoading(false)
        toggleModal()
      })
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
        Chấm bài kiểm tra
      </ModalHeader>
      <Spin spinning={loading}>
        <ModalBody>
          {data && <Form
            {...layout}
            layout="horizontal"
            size="medium"
          >
            <Form.Item>
              <h1>
                <b>{data.name}</b>
              </h1>
            </Form.Item>
            {!score && <Alert message="Vui lòng nhập điểm" type="error" showIcon />}
            <br />
            <Form.Item label='Điểm số'>
              <Input placeholder="Nhập điểm tại đây" type="number" value={score}
                onChange={e => setScore(e.target.value)} />
            </Form.Item>
            {data.answers.length > 0 ? data.answers.map((ans, index) => {
              if (ans.type === 0) {
                return <Card style={{ marginTop: 15 }} key={index}>
                  <CardBody>
                    <Form.Item >
                      <div dangerouslySetInnerHTML={{ __html: ans.title }} style={{ margin: 0 }} />
                    </Form.Item>
                    <Form.Item >
                      <TextArea rows={2} value={ans.answer.text} />
                    </Form.Item>
                    {ans.answer.file && <Form.Item label='File đính kèm'>
                      <a href={ROOT + "storage/app/public/" + ans.answer.file} target="_blank">
                        Tải xuống file đính kèm
                      </a>
                    </Form.Item>}
                  </CardBody>
                </Card>
              } else if (ans.type === 1 || ans.type === 2) {
                return <Card style={{ marginTop: 15 }} key={index}>
                  <CardBody>
                    <Form.Item >
                      <SingleChoice choices={ans.options} setChoices={() => { }}
                        title={ans.title}
                        selected={ans.answer.selected} />
                    </Form.Item>
                  </CardBody>
                </Card>
              }
            }) : null}
          </Form>}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" outline onClick={toggleModal}>
            <IntlMessages id="user.cancel" />
          </Button>
          <Popconfirm
            title="Bạn muốn hủy kết quả nộp bài của học viên ?"
            onConfirm={removeData}
            okText="Yes"
            cancelText="No"
          >
            <Button color="danger" >
              Hủy nộp bài
          </Button>
          </Popconfirm>
          <Button color="primary" onClick={onSubmit}>
            Cập nhật điểm
          </Button>
        </ModalFooter>
      </Spin>
    </Modal >
  )
}

export default React.memo(AddNewModal)