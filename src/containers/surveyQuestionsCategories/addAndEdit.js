import React, { useEffect, Suspense, useState } from 'react'
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
  Typography
} from 'antd'
import momentTime from 'helpers/moment'
import moment from 'moment'
import useFormInput from 'helpers/useFormInput'
import { successMessage, errorMessage } from 'helpers/globalMessage'

const AddNewModal = ({ modalOpen, toggleModal, editId, addNewFlag, addNew, editData }) => {
  const [loading, setLoading] = useState(false)
  const title = useFormInput()
  const created_at = useFormInput()

  useEffect(() => {
    const fetch = () => {
      if (!addNewFlag && editId) {
        setLoading(true)
        axios
          .get('admin/surveys/question-categories/get-info/' + editId)
          .then((res) => {
            return res.data
          })
          .then((data) => {
            title.setValue(data.title)
            created_at.setValue(data.created_at)
          })
          .finally(() => setLoading(false))
      } else {
        title.setValue(null)
      }
    }

    fetch()
  }, [editId, addNewFlag])// eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = () => {
    setLoading(true)
    const params = {
      title: title.value
    }

    if (!addNewFlag && editId) {
      axios
        .post('admin/surveys/question-categories/update', { id: editId, ...params })
        .then(res => {
          if (res.data.failed) {
            errorMessage('Cập nhật nhóm năng lực khảo sát thất bại')
          } else {
            successMessage('Cập nhật nhóm năng lực khảo sát thành công')
            editData({ id: editId, ...params })
          }
        })
        .finally(() => {
          setLoading(false)
          toggleModal()
        })
    } else {
      axios
        .post('admin/surveys/question-categories/create', params)
        .then(res => {
          if (res.data && res.data.failed) {
            errorMessage('Tạo nhóm năng lực khảo sát thất bại')
          } else {
            successMessage('Tạo nhóm năng lực khảo sát thành công')
            addNew({
              id: res.data,
              created_at: moment().format(),
              ...params
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
      style={{ maxWidth: '500px' }}
    >
      <ModalHeader toggle={toggleModal}>
        {!addNewFlag && editId ? 'Sửa nhóm năng lực khảo sát' : 'Thêm nhóm năng lực khảo sát'}
      </ModalHeader>
      <Spin spinning={loading}>
        <ModalBody>
          <Form
            layout="vertical"
            size="medium"
          >
            <Form.Item label="Tiêu đề nhóm năng lực">
              <Input {...title} allowClear />
            </Form.Item>
          </Form>
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
      </Spin>
    </Modal >
  )
}

export default AddNewModal
