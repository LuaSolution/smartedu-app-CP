import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import {
  CourseContentModalForm as ModalForm,
  CourseContentModalCloseBtn as ModalCloseButton
} from 'atoms'
import useFormInput from 'helpers/useFormInput'
import axios from 'helpers/axios'
import { message, Alert, Spin } from 'antd'
import { connect } from 'react-redux'
import {
  addToQAList
} from 'redux/actions'

const _user = JSON.parse(localStorage.getItem('@current_user'))

const ChatModal = ({ courseId, addToQAList }) => {
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [_err, setErr] = useState('')
  const title = useFormInput('')
  const content = useFormInput('')

  const handleClose = () => setShow(false)

  const handleShow = () => setShow(true)

  const sendQuestion = e => {
    e.preventDefault()
    const params = {
      course_id: courseId,
      title: title.value,
      content: content.value
    }

    if (!title.value || title.value == '') {
      setErr('thiếu tiêu đề ')
    } else if (!content.value || content.value == '') {
      setErr('thiếu nội dung')
    } else {
      setLoading(true)
      axios.post('qanda/add-question', params)
        .then(res => {
          if (res.data.status === 200) {
            handleClose()
            message.success('Đã gửi câu hỏi cho giảng viên')
            addToQAList({
              question_title: title.value,
              question_content: content.value,
              questioner_id: _user.id,
              first_name: _user.first_name,
              last_name: _user.last_name,
              status: 0,
              created_at: null
            })
            window.scrollTo(0, document.body.scrollHeight)
          }
        })
        .finally(() => setLoading(false))
    }
  }

  return <>
    <button
      variant="primary"
      onClick={handleShow}
      className="create-new-question">Tạo câu hỏi mới</button>
    <Modal
      show={show}
      onHide={handleClose}
      animation={false}
      className="new-question-modal"
    >
      <Modal.Body>
        <ModalCloseButton onClick={handleClose}></ModalCloseButton>
        <ModalForm>
          <Spin spinning={loading}>
            <div className="form-wrapper">
              <p className="title">Đặt câu hỏi cho giảng viên</p>
              {_err !== '' && <Alert message={_err} type="error" showIcon style={{ marginTop: 15 }} />}
              <form onSubmit={sendQuestion}>
                <div className="ifa-form-control">
                  <p className="label">Tiêu đề*</p>
                  <div className="input-group">
                    <input placeholder="Nhập tiêu đề" {...title} />
                  </div>
                </div>
                <div className="ifa-form-control">
                  <p className="label">Nội dung câu hỏi*</p>
                  <div className="input-group">
                    <textarea
                      placeholder="Câu hỏi cần tư vấn"
                      onChange={content.onChange}
                    >{content.value}</textarea>
                  </div>
                </div>

                <div className="ifa-form-control">
                  <button type="submit">Gửi đi</button>
                </div>
              </form>
            </div>
          </Spin>
        </ModalForm>
      </Modal.Body>
    </Modal>
  </>
}

const mapActionToProps = { addToQAList }

export default connect(null, mapActionToProps)(React.memo(ChatModal))