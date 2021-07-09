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
  Typography
} from 'antd'
import momentTime from 'helpers/moment'
import moment from 'moment'
import useFormInput from 'helpers/useFormInput'
import { errorMessage, successMessage } from 'helpers/globalMessage'

const layout = {
  labelCol: {
    sm: { span: 5 }
  }
}

const AddNewModal = ({ modalOpen, toggleModal, editId, addNewFlag, addNew, editData }) => {
  const name = useFormInput()
  const created_at = useFormInput()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetch = () => {
      if (!addNewFlag && editId) {
        setLoading(true)
        axios
          .get('admin/course-groups/get-info/' + editId)
          .then((res) => {
            return res.data
          })
          .then((data) => {
            name.setValue(data.name)
            created_at.setValue(data.created_at)
          })
          .finally(() => setLoading(false))
      } else {
        name.setValue(null)
      }
    }

    fetch()
  }, [editId, addNewFlag])// eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = () => {
    setLoading(true)
    const params = {
      name: name.value
    }
    if (!addNewFlag && editId) {
      axios
        .post('admin/course-groups/update', { id: editId, ...params })
        .then(res => {
          if (res.data.failed) {
            errorMessage('Cập nhật danh mục thất bại')
          } else {
            successMessage('Cập nhật danh mục thành công')
            editData({ id: editId, ...params })
          }
        })
        .finally(() => {
          setLoading(false)
          toggleModal()
        })
    } else {
      axios
        .post('admin/course-groups/create', params)
        .then(res => {
          if (res.data.failed) {
            errorMessage('Tạo danh mục thất bại')
          } else {
            successMessage('Tạo danh mục thành công')
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
      style={{ maxWidth: '700px' }}
    >
      <ModalHeader toggle={toggleModal}>
        {!addNewFlag && editId ? 'Sửa danh mục' : <IntlMessages id="pages.add-new-modal-title" />}
      </ModalHeader>
      <Spin spinning={loading}>
        <ModalBody>
          <Form
            {...layout}
            layout="horizontal"
            size="medium"
          >
            <Form.Item label={<IntlMessages id="course-group.name" />}>
              <Input {...name} />
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
