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
          .get('admin/form-consultings/get-info/' + editId)
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

  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
      style={{ maxWidth: '700px' }}
    >
      <ModalHeader toggle={toggleModal}>
        Thông tin tư vấn
      </ModalHeader>
      <Spin spinning={loading}>
        <ModalBody>
          {data && <Form
            {...layout}
            layout="horizontal"
            size="medium"
          >
            <Card>
              <CardBody>
                <Form.Item label='Công ty'>
                  {data.company_name}
                </Form.Item>
                <Form.Item label='Người gửi'>
                  {data.name}
                </Form.Item>
                <Form.Item label='Email'>
                  {data.email}
                </Form.Item>
                <Form.Item label='Số điện thoại'>
                  {data.phone}
                </Form.Item>
                {data.type === 2 ?
                  <>
                    <Form.Item label='Học hàm'>
                      {data.hocham}
                    </Form.Item>
                    <Form.Item label='Học vị'>
                      {data.hocvi}
                    </Form.Item>
                    <Form.Item label='Lĩnh vực tư vấn'>
                      {data.tuvan}
                    </Form.Item>
                    <Form.Item label='Lĩnh vực giảng dạy'>
                      {data.giangday}
                    </Form.Item>
                    <Form.Item label='Lĩnh vực khác'>
                      {data.khac}
                    </Form.Item>
                    <Form.Item label='Kinh nghiệm'>
                      {data.content}
                    </Form.Item>
                  </>
                  : <Form.Item label='Nội dung tư vấn'>
                    {data.content}
                  </Form.Item>}
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
        </ModalFooter>
      </Spin>
    </Modal >
  )
}

export default React.memo(AddNewModal)