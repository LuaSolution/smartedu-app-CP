import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from 'reactstrap'
import IntlMessages from 'helpers/IntlMessages'
import axios from 'helpers/axios'
import {
  Form,
  Input,
  Spin,
  Typography,
  message
} from 'antd'
import moment from 'moment'
import momentTime from 'helpers/moment'
import useFormInput from 'helpers/useFormInput'

const layout = {
  labelCol: {
    sm: { span: 5 }
  }
}

const AddNewModal = ({ modalOpen, toggleModal, editId, addNewFlag, addNew, editData }) => {
  const title = useFormInput()
  const content = useFormInput()
  const created_at = useFormInput()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetch = () => {
      if (!addNewFlag && editId) {
        setLoading(true)
        axios
          .get('admin/systemNotifications/get-info/' + editId)
          .then((res) => {
            return res.data
          })
          .then((data) => {
            title.setValue(data.title)
            content.setValue(data.content)
            created_at.setValue(data.created_at)
          })
          .finally(() => setLoading(false))
      } else {
        title.setValue('')
        content.setValue('')
      }
    }

    fetch()
  }, [editId, addNewFlag]) // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = () => {
    setLoading(true)

    const params = {
      title: title.value,
      content: content.value,
    }

    if (!addNewFlag && editId) {
      axios
        .post('admin/systemNotifications/update', { id: editId, ...params })
        .then(res => {
          if (res.data.failed) {
            message.errorr('Cập nhật thông báo thất bại')
          } else {
            message.success('Cập nhật thông báo thành công')
            editData({ id: editId, ...params })
          }
        })
        .finally(() => {
          setLoading(false)
          toggleModal()
        })
    } else {
      axios
        .post('admin/systemNotifications/create', params)
        .then(res => {
          if (res.data.failed) {
            message.errorr('Tạo thông báo thất bại')
          } else {
            message.success('Tạo thông báo thành công')
            addNew({
              id: res.data,
              title: title.value,
              created_at: null,
            })
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
        {!addNewFlag && editId ? 'Cập nhật thông báo' : 'Thêm mới thông báo'}
      </ModalHeader>
      <ModalBody>
        <Spin spinning={loading}>
          <Form
            {...layout}
            layout="horizontal"
            size="medium"
          >
            <Form.Item label='Tiêu đề thông báo'>
              <Input {...title} />
            </Form.Item>
            <Form.Item label='Nội dung thông báo'>
              <Input.TextArea {...content} rows={6} showCount />
            </Form.Item>
          </Form>
        </Spin>
      </ModalBody>
      <ModalFooter>
        {!addNewFlag && editId
          && <Typography.Text code>Ngày tạo: {momentTime(created_at.value)}</Typography.Text>}
        {' '}
        <Button color="secondary" outline onClick={toggleModal}>
          <IntlMessages id="user.cancel" />
        </Button>
        <Button color="primary" onClick={onSubmit}>
          <IntlMessages id="user.submit" />
        </Button>
      </ModalFooter>
    </Modal >
  )
}

export default AddNewModal