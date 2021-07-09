import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import {
  CourseContentModalForm as ModalForm,
  CourseContentModalCloseBtn as ModalCloseButton
} from 'atoms'
import { Rate, Input, message, Spin } from 'antd'
import useFormInput from 'helpers/useFormInput'
import axios from 'helpers/axios'

const { TextArea } = Input

const RatingModal = ({ courseId, show, handleClose, setRated }) => {
  const rate = useFormInput(5)
  const content = useFormInput('')
  const [loading, setLoading] = useState(false)

  const submitRating = () => {
    if (rate.value && content.value) {
      setLoading(true)
      const params = {
        rate: rate.value,
        content: content.value
      }

      axios
        .post('courses/rating/' + courseId, params)
        .then((res) => {
          if (res.data.status === 200) {
            message.success('Cảm ơn bạn đã đánh giá khóa học')
            setRated(1)
          } else {
            message.error('Không thể đánh giá khóa học')
          }
        })
        .finally(() => {
          setLoading(false)
          handleClose()
        })
    }
  }

  return <Modal
    show={show}
    onHide={handleClose}
    animation={false}
  >
    <Modal.Body>
      <ModalCloseButton onClick={handleClose}></ModalCloseButton>
      <ModalForm>
        <Spin spinning={loading}>
          <div className="form-wrapper">
            <p className="title">Đánh giá khóa học</p>
            <form>
              <div className="ifa-form-control">
                <p className="label">Đánh giá</p>
                <Rate style={{ fontSize: 32 }} {...rate} />
              </div>
              <div className="ifa-form-control">
                <p className="label">Nội dung góp ý</p>
                <div className="input-group">
                  <TextArea {...content}
                    placeholder="Nhập nội dung bạn muốn chia sẻ"
                    rows={3} showCount maxLength={200}
                    style={{ width: '100%' }} />
                </div>
              </div>

              <div className="ifa-form-control">
                <button type="button" onClick={submitRating}>Gửi đi</button>
              </div>
            </form>
          </div>
        </Spin>
      </ModalForm>
    </Modal.Body>
  </Modal>
}

export default RatingModal