import React, { useEffect, useState } from 'react'
import ProcessCourseCard from 'components/processCourseCard'
import CourseCard from 'components/courseCard'
import CountUp from 'react-countup'
import { Badge } from 'reactstrap'
import { Col, message, Row, Spin, Typography } from 'antd'
import axios from 'helpers/axios'
import { AVATAR_PATH } from 'defines'
import { CalendarOutlined } from '@ant-design/icons'
import { NoData } from 'atoms'
import moment from 'moment'
import { toCurrency } from 'helpers/Utils'
import Countdown from 'react-countdown'
import 'assets/user/ifa-dashboard.css'
import 'assets/user/dashboard-mobile.css'

const _user = JSON.parse(localStorage.getItem('@current_user'))

const DashboardPage = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  const fetchData = () => {
    setLoading(true)
    axios
      .get(`mentor-call/booking-list/${data.length}`)
      .then((res) => {
        if (res.data.status === 200) {
          setData([...data, ...res.data.data])
        }
      })
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    fetchData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const redirectToCallScreen = (index) => {
    if (data[index].status !== 1) {
      message.error('Cuộc gọi chưa xác nhận từ chuyên gia, vui lòng thử lại')
    } else {
      window.open(
        `/video-call/MC${data[index].id}`,
        'winname',
        'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no'
      )
    }
  }

  const renderer = (
    { total, days, hours, minutes, seconds, milliseconds, completed },
    index
  ) => {
    if (completed) {
      // Render a completed state
      return (
        <Badge
          color="danger"
          pill
          style={{ fontSize: 16 }}
          onClick={() => redirectToCallScreen(index)}
        >
         Đến cuộc gọi
        </Badge>
      )
    } else {
      // Render a countdown
      return (
        <span>{`${days} ngày ${hours} giờ ${minutes} phút ${seconds}`}</span>
      )
    }
  }

  return (
    <div className="ifa-dashboard-block ifa-dashboard-content">
      <section
        id="box-list-lich-live-cua-toi"
        className="container"
        style={{ marginTop: -30, marginBottom: 0 }}
      >
        <Spin spinning={loading} size="large">
          <div className="list-card">
            <div className="list-card-item">
              {data && data.length > 0 ? (
                data.map((item, index) => {
                  return (
                    <div className="card-item-lich-live" key={index}>
                      <div className="row1-lichlive">
                        <CalendarOutlined
                          style={{ fontSize: 24, marginRight: 8 }}
                        />
                        <div className="ten-linh-vuc">
                          {item.title}{' '}
                          <Badge
                            color={item.status === 1 ? 'success' : 'dark'}
                            pill
                          >
                            {item.status === 1
                              ? 'Đã xác nhận'
                              : 'Chưa xác nhận'}
                          </Badge>
                        </div>
                      </div>
                      <div className="row2-lichlive">
                        <div className="image-avatar">
                          <img
                            src={`${AVATAR_PATH}${item.mentor_id}.webp`}
                            className="style-image-avatar"
                          />
                        </div>
                        <div className="thong-tin-giang-vien">
                          <div className="ten-chuyen-gia">
                            {item.gender ? 'thầy' : 'cô'}{' '}
                            {item.first_name + ' ' + item.last_name}
                          </div>
                          <div className="thoi-gian-ket-noi">
                            <div className="ngay-thang">
                              <i
                                className="fa fa-calendar-minus-o"
                                aria-hidden="true"
                              ></i>
                              <span>
                                <Countdown
                                  date={item.book_time}
                                  renderer={({
                                    total,
                                    days,
                                    hours,
                                    minutes,
                                    seconds,
                                    milliseconds,
                                    completed,
                                  }) =>
                                    renderer(
                                      {
                                        total,
                                        days,
                                        hours,
                                        minutes,
                                        seconds,
                                        milliseconds,
                                        completed,
                                      },
                                      index
                                    )
                                  }
                                />
                              </span>
                            </div>
                            <div className="thoi-gian">
                              <i
                                className="fa fa-clock-o"
                                aria-hidden="true"
                              ></i>
                              <span>
                                {item.price > 0 ? (
                                  toCurrency(item.price)
                                ) : (
                                  <Badge color={'secondary'} pill>
                                    Tư vấn miễn phí
                                  </Badge>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <NoData title="Bạn chưa đăng ký lịch live one-by-one" />
              )}
              <div className="btn-load-more-expert" style={{ marginTop: 30 }}>
                <button onClick={fetchData}>Xem thêm</button>
              </div>
            </div>
          </div>
        </Spin>
      </section>
    </div>
  )
}

export default DashboardPage
