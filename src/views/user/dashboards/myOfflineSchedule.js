import React, { useState, useEffect } from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { Calendar, message, Modal, Spin } from 'antd';
import moment from 'moment'
import 'assets/user/user-dashboard.scss'
import axios from 'helpers/axios'

moment.updateLocale('en', {
  weekdaysMin: ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"],
  monthsShort: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',]
});

const MyOfflineSchedule = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalSuccess, setIsModalSuccess] = useState(false);
  const [selected, setSelected] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true)
    axios.get('offline-schedules/get-list')
      .then(res => {
        if (res.data.status === 200) {
          setData(res.data.data)
        }
      })
      .finally(() => setLoading(false))
  }, []);

  const getListData = value => {
    const month = moment(value).format("M")
    let listData;
    listData = data.filter(item => {
      const day = moment(item.date, "YYYY-MM-DD").format("DD")
      const mon = moment(item.date, "YYYY-MM-DD").format("MM")
      if (parseInt(day) === parseInt(value.date()) && parseInt(month) === parseInt(mon)) {
        return item
      }
    })
    return listData || [];
  }

  const dateCellRender = value => {
    const listData = getListData(value);
    return <ul className="events-offline-schedule">
      {listData.map(item => (
        <li key={item.content}
          className={`item-event-li 
          ${!item.status ? 'item-error-event' : 'item-primary-event'}
          `}>
          <div>{item.content}</div>
        </li>
      ))}
    </ul>
  }

  const onSelect = value => {
    const listData = getListData(value);
    if (listData.length > 0) {
      setSelected(listData[0])
      setIsModalVisible(true)
    }
  }

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const submitRegister = () => {
    setLoading(true)
    axios.post('offline-schedules/join-offline', { id: selected.id })
      .then(res => {
        if (res.data.status === 200) {
          message.success('Bạn đã đăng ký buổi học offline thành công !')
          setSubmitted(true)
        } else {
          message.error(res.data.message || 'Đăng ký buổi học offline thất bại !')
        }
      }).finally(() => setLoading(false))
  }

  return <>
    <Spin spinning={loading}>
      <div className="box-learing-offline-schedule">
        <div className="box-search-input-schedule">
          <div className="input-style-with-icon">
            <input className="style-input-search" placeholder="Tìm tên khóa học" />
            <div className="icon-input">
              <SearchOutlined />
            </div>
          </div>
        </div>
        <div className="timeline-schedule">
          <Calendar
            className="calendar-style-offline"
            onSelect={onSelect}
            dateCellRender={dateCellRender} />
        </div>
      </div>
    </Spin>
    <Modal footer={false} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      {selected &&
        <div className="box-modal-offline-schedule">
          <div className="title-offline-schedule">Khóa học <b>{selected.content}</b></div>
          {/* <div className="title-lich-hoc-start">Lịch học offline sẽ bắt đầu vào</div> */}
          <div className="text-modal-offline-1">
            <div className="title-style">Thời gian: {selected.time_from} - {selected.time_to}</div>
          </div>
          <div className="text-modal-offline-1">
            <div className="title-style">Ngày: {moment(selected.date).format('DD/MM/YYYY')}</div>
          </div>
          <div className="text-modal-offline-1">
            <div className="title-style">Địa điểm: {selected.location}</div>
          </div>
          {selected.status && !submitted ? <>
            <div className="text-bottom-style">
              Chúng tôi rất mong sự có mặt của bạn
            </div>
            <div className="box-bottom-btn-modal">
              {/* <button className="btn-sangkhoa">Sang khóa Online</button> */}
              <button className="btn-dangky-thamgia" onClick={submitRegister}>Đăng ký tham gia</button>
            </div>
          </> : null}
        </div>
      }

    </Modal>
    <Modal title="" width={796} footer={false} visible={isModalSuccess}
      onOk={handleOk}
      onCancel={handleCancel}>
      <div className="success-modal-offline-schedule">
        <div className="image-popup-success">
          <img className="style-image-success-schedule" src={null} />
        </div>
        <div className="title-1">Chúc mừng! Bạn đã được ghi danh thành công lớp học Offline</div>
        <div className="title-2">Bạn nhớ đến đúng giờ và sử dụng mã QR code của mình để nhận ưu đãi nhé!</div>
        <a>
          <div className="style-qr-code">Đến mã QR code của tôi</div>
        </a>
        <div className="button-ok-close-modal" onClick={() => setIsModalSuccess(false)}>Ok</div>
      </div>
    </Modal>
  </>
}

export default React.memo(MyOfflineSchedule)
