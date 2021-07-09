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
  Upload,
  message
} from 'antd'
import moment from 'moment'
import momentTime from 'helpers/moment'
import useFormInput from 'helpers/useFormInput'
import { PlusOutlined } from '@ant-design/icons'
import { getBase64 } from 'helpers/Utils'
import { NEWS_PATH } from 'defines'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const layout = {
  labelCol: {
    sm: { span: 5 }
  }
}

const AddNewModal = ({ modalOpen, toggleModal, editId, addNewFlag, addNew, editNews }) => {
  const title = useFormInput()
  const content = useFormInput()
  const created_at = useFormInput()
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fileList, setFileList] = useState([])

  useEffect(() => {
    const fetch = () => {
      if (!addNewFlag && editId) {
        setLoading(true)
        axios
          .get('admin/news/get-info/' + editId)
          .then((res) => {
            return res.data
          })
          .then((data) => {
            title.setValue(data.title)
            content.setValue(data.content)
            setFileList([{ url: NEWS_PATH + data.id + '.webp?' + Math.random() }])
            created_at.setValue(data.created_at)
          })
          .finally(() => setLoading(false))
      } else {
        title.setValue(null)
        content.setValue(null)
        setFileList([])
      }
    }

    fetch()
  }, [editId, addNewFlag]) // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = () => {
    setLoading(true)

    const params = {
      title: title.value,
      content: content.value,
      image: image || null
    }

    if (!addNewFlag && editId) {
      axios
        .post('admin/news/update', { id: editId, ...params })
        .then(res => {
          if (res.data.failed) {
            message.errorr('Cập nhật bài viết thất bại')
          } else {
            message.success('Cập nhật bài viết thành công')
            editNews({ id: editId, ...params })
          }
        })
        .finally(() => {
          setLoading(false)
          toggleModal()
        })
    } else {
      axios
        .post('admin/news/create', params)
        .then(res => {
          if (res.data.failed) {
            message.errorr('Tạo bài viết thất bại')
          } else {
            message.success('Tạo bài viết thành công')
            addNew({
              id: res.data,
              title: title.value,
              created_at: moment().format(),
            })
          }
        })
        .finally(() => {
          setLoading(false)
          toggleModal()
        })
    }
  }

  const handleChangeAvatar = async ({ fileList }) => {
    fileList.length > 1 ? setFileList([fileList[1]]) : setFileList(fileList)

    if (fileList[0] && 'originFileObj' in fileList[0]) {
      setImage(await getBase64(fileList[0].originFileObj))
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
        {!addNewFlag && editId ? 'Cập nhật bài viết' : 'Thêm mới bài viết'}
      </ModalHeader>
      <Spin spinning={loading}>
        <ModalBody>
          <Form
            {...layout}
            layout="horizontal"
            size="medium"
          >
            <Form.Item label='Tiêu đề bài viết'>
              <Input {...title} />
            </Form.Item>
            <Form.Item label='Nội dung bài viết'>
              <ReactQuill
                theme="snow"
                {...content}
                modules={quillModules}
                formats={quillFormats}
              />
            </Form.Item>
            <Form.Item label={<IntlMessages id="user.avatar" />}>
              <Upload
                action={''}
                accept="image/*"
                listType="picture-card"
                fileList={fileList}
                onChange={handleChangeAvatar}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>{<IntlMessages id="user.upload-avatar" />}</div>
                </div>
              </Upload>
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

const quillModules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' },
    { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}

const quillFormats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]