import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'reactstrap'
import IntlMessages from 'helpers/IntlMessages'
import axios from 'helpers/axios'
import {
  Form,
  Input,
  Spin,
  Typography,
} from 'antd'
import momentTime from 'helpers/moment'
import useFormInput from 'helpers/useFormInput'
import { errorMessage, successMessage } from 'helpers/globalMessage'
import createSlug from 'helpers/createSlug'

const layout = {
  labelCol: {
    sm: { span: 10 }
  }
}

const AddNewModal = ({ modalOpen, toggleModal, editId, addNewFlag, addNew, editPartner }) => {
  const [loading, setLoading] = useState(false)
  const name = useFormInput()
  const slug = useFormInput()
  const created_at = useFormInput()

  useEffect(() => {
    const fetch = () => {
      if (!addNewFlag && editId) {
        setLoading(true)
        axios
          .get('admin/departments/get-info/' + editId)
          .then(res => {
            return res.data
          })
          .then(data => {
            name.setValue(data.name)
            slug.setValue(data.slug)
            created_at.setValue(data.created_at)
          })
          .finally(() => setLoading(false))
      } else {
        name.setValue(null)
        slug.setValue(null)
      }
    }

    fetch()

  }, [editId, addNewFlag])// eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = () => {
    setLoading(true)
    const params = {
      name: name.value,
      slug: slug.value
    }

    if (!addNewFlag && editId) {
      axios
        .post('admin/departments/update', { id: editId, ...params })
        .then(res => {
          if (res.data.failed) {
            errorMessage('Cập nhật bộ phận thất bại')
          } else {
            successMessage('Cập nhật bộ phận thành công')
            editPartner({ id: editId, ...params })
          }
        })
        .finally(() => {
          setLoading(false)
          toggleModal()
        })
    } else {
      axios
        .post('admin/departments/create', { ...params })
        .then(res => {
          if (res.data.failed) {
            errorMessage('Tạo bộ phận thất bại')
          } else {
            successMessage('Tạo bộ phận thành công')
            addNew({
              created_at: null,
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
        {!addNewFlag && editId ? 'Thay đổi thông tin' : <IntlMessages id="pages.add-new-modal-title" />}
      </ModalHeader>
      <Spin spinning={loading}>
        <ModalBody>
          <Form
            {...layout}
            layout="horizontal"
            size="medium"
          >
            <Form.Item label={'Tên bộ phận/phòng ban'}>
              <Input value={name.value} allowClear
                onChange={e => {
                  name.onChange(e)
                  slug.setValue(createSlug(e.target.value))
                }} />
            </Form.Item>
            <Form.Item label={'Alias'}>
              <Input {...slug} allowClear />
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
