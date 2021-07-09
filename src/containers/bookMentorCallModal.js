import React, { useState, useEffect } from 'react'
import {
  Avatar,
  Input,
  message,
  TimePicker,
  DatePicker,
  Row,
  Col,
  Button,
} from 'antd'
import { ClockCircleOutlined } from '@ant-design/icons'
import useFormInput from 'helpers/useFormInput'
import moment from 'moment'
import locale from 'antd/es/date-picker/locale/vi_VN'
import axios from 'helpers/axios'
import 'assets/user/book-mentor.css'

const format = 'HH:mm'
const { TextArea } = Input

const BookMentorCallModal = ({ mentorId, show, setShow }) => {
  const [selected, setSelected] = useState(1)
  const [isRegistered, setRegistered] = useState(false)
  const [bookDate, setDate] = useState()
  const bookTime = useFormInput()
  const question = useFormInput()

  useEffect(() => {
    question.setValue(null)
  }, [])

  const changePack = (index) => {
    setSelected(index)
  }

  const bookMentorCall = () => {
    axios
      .post('mentor-call/booking', {
        package_id: selected,
        book_date: bookDate,
        book_time: bookTime.value,
        question: question.value,
        mentor_id: mentorId,
      })
      .then((res) => {
        if (res.data.status === 200) {
          message.success(
            'Đã đăng ký gói live với chuyên gia thành công, vui lòng đợi xác nhận từ chuyên gia'
          )
          setRegistered(true)
        }
      })
  }

  const onChange = (date, dateString) => {
    setDate(moment(dateString).format('DD/MM/YYYY'))
  }

  return (
    show && (
      <div id="myModal" className="modal">
        <div className="modal-content container dk-goi-live">
          <div className="title-modal">Đăng ký gói LIVE với chuyên gia</div>
          <div className="title-Choice-Live"> Chọn gói Live</div>
          <div className="box-list-pack-live">
            <a className="item-live" onClick={() => changePack(1)}>
              <div className="col-img-style-live">
                <Avatar
                  size={70}
                  style={{
                    backgroundColor: selected === 1 ? '#1890ff' : '#ccc',
                  }}
                >
                  5
                </Avatar>
              </div>
              <div className="col-content-live">
                <div className="row-name-pack-live">Gói 5 phút</div>
                <div className="row-time-cost">
                  <div className="time-live">
                    <ClockCircleOutlined /> <span> 5 phút</span>
                  </div>
                  {/* <div className="cost-live">5.000.000 đ</div> */}
                </div>
              </div>
            </a>
            <a className="item-live" onClick={() => changePack(2)}>
              <div className="col-img-style-live">
                <Avatar
                  size={70}
                  style={{
                    backgroundColor: selected === 2 ? '#1890ff' : '#ccc',
                  }}
                >
                  10
                </Avatar>
              </div>
              <div className="col-content-live">
                <div className="row-name-pack-live">Gói 10 phút</div>
                <div className="row-time-cost">
                  <div className="time-live">
                    <ClockCircleOutlined /> <span> 10 phút</span>
                  </div>
                  {/* <div className="cost-live">5.000.000 đ</div> */}
                </div>
              </div>
            </a>
            <a className="item-live" onClick={() => changePack(3)}>
              <div className="col-img-style-live">
                <Avatar
                  size={70}
                  style={{
                    backgroundColor: selected === 3 ? '#1890ff' : '#ccc',
                  }}
                >
                  15
                </Avatar>
              </div>
              <div className="col-content-live">
                <div className="row-name-pack-live">Gói 15 phút</div>
                <div className="row-time-cost">
                  <div className="time-live">
                    <ClockCircleOutlined /> <span> 15 phút</span>
                  </div>
                  {/* <div className="cost-live">5.000.000 đ</div> */}
                </div>
              </div>
            </a>
            <a className="item-live" onClick={() => changePack(4)}>
              <div className="col-img-style-live">
                <Avatar
                  size={70}
                  style={{
                    backgroundColor: selected === 4 ? '#1890ff' : '#ccc',
                  }}
                >
                  20
                </Avatar>
              </div>
              <div className="col-content-live">
                <div className="row-name-pack-live">Gói 20 phút</div>
                <div className="row-time-cost">
                  <div className="time-live">
                    <ClockCircleOutlined /> <span> 20 phút</span>
                  </div>
                  {/* <div className="cost-live">5.000.000 đ</div> */}
                </div>
              </div>
            </a>
          </div>
          <div className="title-Choice-Live">Chọn thời gian gọi chuyên gia</div>
          <Row gutter={16}>
            <Col span={8}>
              Chọn ngày:{' '}
              <DatePicker
                locale={locale}
                size="large"
                onChange={onChange}
                bordered={false}
              />
            </Col>
            <Col span={8}>
              Chọn giờ:{' '}
              <TimePicker
                bordered={false}
                locale={locale}
                size="large"
                format={format}
                value={bookTime.value ? moment(bookTime.value, format) : null}
                onChange={(time, timeStr) => bookTime.onChange(timeStr)}
              />
            </Col>
          </Row>
          {/* <div className="title-Choice-Live"> Chọn lĩnh vực (nếu có)</div>
          <div className="select">
            <select name="slct" id="slct">
              <option selected>Không chọn lĩnh vực</option>
              <option value="1">Kỹ năng quản lý thời gian</option>
              <option value="2">Kỹ năng mềm</option>
              <option value="3">Sales</option>
            </select>
          </div>
          </div>
           */}
          <div className="title-Choice-Live">
            Đặt trước câu hỏi để chuyên gia chuẩn bị đáp án (nếu có)
          </div>
          <TextArea
            placeholder="Nhập nội dung câu hỏi"
            rows={4}
            showCount
            maxLength={100}
            {...question}
          />
          <div className="btn-dk-goi-live">
            <Button
              danger
              size="large"
              style={{ marginRight: 15 }}
              onClick={() => setShow(false)}
            >
              Đóng
            </Button>
            <Button
              type="primary"
              disabled={isRegistered}
              size="large"
              color="#0B46A9"
              onClick={bookMentorCall}
            >
              Xác nhận
            </Button>
          </div>
        </div>
      </div>
    )
  )
}

export default BookMentorCallModal
