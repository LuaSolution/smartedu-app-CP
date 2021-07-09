import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle
} from 'reactstrap'
import IntlMessages from 'helpers/IntlMessages'
import axios from 'helpers/axios'
import {
  Input,
  Typography,
  Switch,
  Spin
} from 'antd'
import momentTime from 'helpers/moment'
import useFormInput from 'helpers/useFormInput'
import { errorMessage, successMessage } from 'helpers/globalMessage'
import { PARTNER_TYPE } from 'defines'
import SubUserList from 'containers/subUserList'
import createSlug from 'helpers/createSlug'

const AddNewModal = ({ modalOpen, toggleModal, editId, addNewFlag, addNew, editPartner }) => {
  const [loading, setLoading] = useState(false)
  const name = useFormInput()
  const slug = useFormInput()
  const created_at = useFormInput()
  const [type, setType] = useState(true)

  useEffect(() => {
    const fetch = () => {
      if (!addNewFlag && editId) {
        setLoading(true)
        axios
          .get('admin/partners/get-info/' + editId)
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
      slug: slug.value,
      type: type === true ? 0 : 1
    }

    if (!addNewFlag && editId) {
      axios
        .post('admin/partners/update', { id: editId, ...params })
        .then(res => {
          if (res.data.failed) {
            errorMessage('Cập nhật nhóm người dùng thất bại')
          } else {
            successMessage('Cập nhật nhóm người dùng thành công')
            editPartner({ id: editId, ...params })
          }
        })
        .finally(() => {
          setLoading(false)
          toggleModal()
        })
    } else {
      axios
        .post('admin/partners/create', { ...params })
        .then(res => {
          if (res.data.failed) {
            errorMessage('Tạo nhóm người dùng thất bại')
          } else {
            successMessage('Tạo nhóm người dùng thành công')
            addNew({
              id: res.data,
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

  const typeName = type === true ? PARTNER_TYPE[0] : PARTNER_TYPE[1]

  return <Modal
    isOpen={modalOpen}
    toggle={toggleModal}
    wrapClassName="modal-right"
    backdrop="static"
    style={{ maxWidth: '700px' }}
  >
    <ModalHeader toggle={toggleModal}>
      {!addNewFlag && editId ? 'Thay đổi thông tin' : <IntlMessages id="pages.add-new-modal-title" />}
    </ModalHeader>
    <Spin spinning={loading}>
      <ModalBody>
        <Card style={{ marginBottom: 15 }}>
          <CardBody>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col span={14}>
                <Input value={name.value} allowClear
                  onChange={e => {
                    name.onChange(e)
                    slug.setValue(createSlug(e.target.value))
                  }} />
              </Col>
              <Col span={6}>
                <Input {...slug} allowClear />
              </Col>
              <Col span={4}>
                <Switch checkedChildren="Công ty" unCheckedChildren="Trường học"
                  checked={type} onChange={setType} />
              </Col>
            </Row>
          </CardBody>
        </Card>
        {!addNewFlag && editId ?
          <Card>
            <CardBody>
              <CardTitle>Danh sách người dùng</CardTitle>
              <SubUserList partnerId={editId} />
            </CardBody>
          </Card>
          : null}
      </ModalBody>
      <ModalFooter>
        {!addNewFlag && editId
          && <Typography.Text code>Ngày tạo: {momentTime(created_at.value || null)}</Typography.Text>}
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
}

export default AddNewModal
