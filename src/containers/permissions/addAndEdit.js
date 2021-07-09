import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap'
import IntlMessages from 'helpers/IntlMessages'
import axios from 'helpers/axios'
import {
  Form,
  Input,
  Spin,
  Table
} from 'antd'
import useFormInput from 'helpers/useFormInput'

const layout = {
  labelCol: {
    sm: { span: 5 }
  }
}

const columns = [
  { title: 'Nhóm phân quyền', dataIndex: 'name', key: 'name' },
];

const subColumns = [
  { title: 'Phân quyền', dataIndex: 'name', key: 'name' },
  { title: 'Key', dataIndex: 'key', key: 'key' }
];

const AddNewModal = ({ modalOpen, toggleModal, editId, addNewFlag }) => {
  const name = useFormInput()
  const description = useFormInput()
  const created_at = useFormInput()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetch = () => {
      if (!addNewFlag && editId) {
        setLoading(true)
        axios
          .get('admin/permissions/get-info/' + editId)
          .then(res => {
            return res.data
          })
          .then(data => {
            if (data.status === 200) {
              const { data: _data } = data
              name.setValue(_data.name)
              description.setValue(_data.description)
              created_at.setValue(_data.created_at)
              setData(_data.role_table)
            }
          })
          .finally(() => setLoading(false))
      } else {
        name.setValue(null)
        description.setValue(null)
      }
    }

    fetch()

  }, [editId, addNewFlag])// eslint-disable-line react-hooks/exhaustive-deps

  // const onSubmit = () => {
  //   setLoading(true)
  //   const params = {
  //     name: name.value,
  //     description: description.value,
  //   }

  //   if (!addNewFlag && editId) {
  //     axios
  //       .post('admin/permissions/update', { id: editId, ...params })
  //       .then(res => {
  //         if (res.data.failed) {
  //           errorMessage('Cập nhật chức vụ thất bại')
  //         } else {
  //           successMessage('Cập nhật chức vụ thành công')
  //           editPartner({ id: editId, ...params })
  //         }
  //       })
  //       .finally(() => {
  //         setLoading(false)
  //         toggleModal()
  //       })
  //   } else {
  //     axios
  //       .post('admin/permissions/create', { ...params })
  //       .then(res => {
  //         if (res.data.failed) {
  //           errorMessage('Tạo chức vụ thất bại')
  //         } else {
  //           successMessage('Tạo chức vụ thành công')
  //           addNew({
  //             created_at: null,
  //             ...params
  //           })
  //         }
  //       })
  //       .finally(() => {
  //         setLoading(false)
  //         toggleModal()
  //       })
  //   }
  // }

  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
      style={{ maxWidth: '1000px' }}
    >
      <ModalHeader toggle={toggleModal}>
        {!addNewFlag && editId ? 'Thay đổi thông tin' : <IntlMessages id="pages.add-new-modal-title" />}
      </ModalHeader>
      <Spin spinning={loading}>
        <ModalBody>
          <Form
            layout="horizontal"
            size="medium"
            {...layout}
          >
            <Form.Item label={'Tên chức vụ'}>
              <Input {...name} />
            </Form.Item>
            <Form.Item label={'Alias'}>
              <Input {...description} />
            </Form.Item>
            <Form.Item>
              <Table
                bordered
                pagination={false}
                columns={columns}
                expandable={{
                  expandedRowRender: record =>
                    <Table
                      bordered
                      columns={subColumns}
                      dataSource={record['sub']}
                      pagination={false}
                    />
                }}
                dataSource={data}
              />
            </Form.Item>
          </Form>
        </ModalBody>
        {/* <ModalFooter>
          {!addNewFlag && editId
            && <Typography.Text code>Ngày tạo: {momentTime(created_at.value)}</Typography.Text>}
          {' '}
          <Button color="secondary" outline onClick={toggleModal}>
            <IntlMessages id="user.cancel" />
          </Button>
          <Button color="primary" onClick={onSubmit}>
            <IntlMessages id="user.submit" />
          </Button>
        </ModalFooter> */}
      </Spin>
    </Modal >
  )
}

export default AddNewModal
