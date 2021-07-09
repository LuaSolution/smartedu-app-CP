import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardBody,
  Badge,
} from 'reactstrap'
import IntlMessages from 'helpers/IntlMessages'
import axios from 'helpers/axios'
import { Form, Input, Spin, Typography, message, Avatar } from 'antd'
import momentTime from 'helpers/moment'
import { AVATAR_PATH } from 'defines'
import Countdown from 'react-countdown'

const layout = {
  labelCol: {
    sm: { span: 5 },
  },
}
const { TextArea } = Input

const AddNewModal = ({
  modalOpen,
  toggleModal,
  editId,
  addNewFlag,
  editqanda,
}) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetch = () => {
      if (!addNewFlag && editId) {
        setLoading(true)
        axios
          .get('admin/mentor-calls/get-info/' + editId)
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

  const renderer = ({
    total,
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
    completed,
  }) => {
    if (completed) {
      // Render a completed state
      return (
        <Badge color="danger" pill style={{ fontSize: 16 }}>
          Đã diễn ra
        </Badge>
      )
    } else {
      // Render a countdown
      return (
        <span>{`${days} ngày ${hours} giờ ${minutes} phút ${seconds}`}</span>
      )
    }
  }

  const onSubmit = () => {
    if (!addNewFlag && editId) {
      setLoading(true)
      axios
        .get('admin/mentor-calls/confirm/' + editId)
        .then((res) => {
          if (res.data.status === 200) {
            message.success('Cập nhật lịch hẹn thành công')
          } else {
            message.errorr('Cập nhật lịch hẹn thất bại')
          }
        })
        .finally(() => {
          setLoading(false)
          toggleModal()
        })
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
        {!addNewFlag && editId
          ? 'Nội dung đặt lịch one by one'
          : 'Thêm mới câu hỏi'}
      </ModalHeader>
      <Spin spinning={loading}>
        <ModalBody>
          {data && (
            <Form {...layout} layout="horizontal" size="medium">
              <Form.Item label="Gói live">
                <b>{data.title}</b>
              </Form.Item>

              <Card>
                <CardBody>
                  <Form.Item label="Người hỏi">
                    {data.first_name + ' ' + data.last_name}
                    <Avatar
                      src={AVATAR_PATH + data.booker_id + '.webp'}
                      height={70}
                    />
                  </Form.Item>
                  <Form.Item label="Thời gian">
                    <Countdown date={data.book_time} renderer={renderer} />
                  </Form.Item>
                  <Form.Item label="Trạng thái">
                    <Badge color={data.status === 1 ? 'primary' : 'danger'}>
                      {data.status === 1 ? 'Đã xác nhận' : 'Chưa xác nhận'}
                    </Badge>
                  </Form.Item>
                  <Form.Item label="Nội dung câu hỏi">
                    {data.question}
                  </Form.Item>
                </CardBody>
              </Card>
            </Form>
          )}
        </ModalBody>
        <ModalFooter>
          {!addNewFlag && editId && (
            <Typography.Text code>
              Ngày tạo: {momentTime(data ? data.created_at : null)}
            </Typography.Text>
          )}{' '}
          <Button color="secondary" outline onClick={toggleModal}>
            <IntlMessages id="user.cancel" />
          </Button>
          {data && data.status !== 1 && (
            <Button color="primary" onClick={onSubmit}>
              Xác nhận lịch hẹn
            </Button>
          )}
        </ModalFooter>
      </Spin>
    </Modal>
  )
}

export default React.memo(AddNewModal)
