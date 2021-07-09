import React, { useEffect, useState } from 'react'
import ProcessCourseCard from 'components/processCourseCard'
import CourseCard from 'components/courseCard'
import CountUp from 'react-countup'
import { Col, Row, Spin, Typography } from 'antd'
import axios from 'helpers/axios'
import { AVATAR_PATH } from 'defines'
import { CalendarOutlined } from '@ant-design/icons'
import { NoData } from 'atoms'
import { Badge } from 'reactstrap'
import { toCurrency } from 'helpers/Utils'
import moment from 'moment'
import 'assets/user/ifa-dashboard.css'
import 'assets/user/dashboard-mobile.css'

const { Paragraph } = Typography
const _user = JSON.parse(localStorage.getItem('@current_user'))

const DashboardPage = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    //lấy 4 khóa học đã yêu thích
    setLoading(true)
    axios
      .get('courses/get-list-in-dashboard')
      .then((res) => {
        if (res.data.status === 200) {
          setData(res.data)
        }
      })
      .finally(() => setLoading(false))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="ifa-dashboard-block ifa-dashboard-content">
      <div className="balance-course">
        <Row>
          <Col span={12}>
            <div className="balance">
              <p className="balance-course-title">Số dư</p>
              <p className="number">
                <CountUp
                  end={0}
                  duration={0.75}
                  separator=","
                  decimal=","
                  suffix="SE"
                />
              </p>
            </div>
          </Col>
          <Col span={12}>
            <div className="course">
              <p className="balance-course-title">Số khóa học</p>
              <p className="number">
                <CountUp end={data && data.count ? data.count : 0} />
              </p>
            </div>
          </Col>
        </Row>
      </div>
      {/* Bảng tin nội bộ */}
      <div className="internal-board">
        <div className="board-header">
          <p className="title">Bảng tin nội bộ</p>
          <a href="#" className="read-more">
            Xem thêm
          </a>
        </div>
        <div className="list-board">
          <Spin spinning={loading}>
            {data && data.newest_notifs.length > 0 ? (
              data.newest_notifs.map((item, index) => (
                <div className="item" key={index}>
                  <a href="#" className="item-title">
                    {item.title}
                  </a>
                  <Paragraph ellipsis={{ rows: 2 }} className="item-content">
                    {item.content}
                  </Paragraph>
                </div>
              ))
            ) : (
              <NoData title="Không có thông báo nội bộ" />
            )}
          </Spin>
        </div>
      </div>
      {/* Thông báo từ hệ thống */}
      <div className="internal-board">
        <div className="board-header">
          <p className="title">Bảng tin từ hệ thống</p>
          <a href="/notify" className="read-more">
            Xem thêm
          </a>
        </div>
        <div className="list-board">
          <Spin spinning={loading}>
            {data && data.newest_sys_notifs.length > 0 ? (
              data.newest_sys_notifs.map((item, index) => (
                <div className="item" key={index}>
                  <a href="#" className="item-title">
                    {item.title}
                  </a>
                  <Paragraph ellipsis={{ rows: 2 }} className="item-content">
                    {item.content}
                  </Paragraph>
                </div>
              ))
            ) : (
              <NoData title="Không có thông báo hệ thống" />
            )}
          </Spin>
        </div>
      </div>
      {/* Khóa học của tôi */}
      <section id="box-list-my-course" className="container">
        <div className="row-title">
          <div className="title-section">Khóa học của tôi</div>
          <a href="#">
            <div className="read-more">
              Xem thêm
              <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </div>
          </a>
        </div>
        <div className="row-list-course-items">
          {data && data.continue_courses && data.continue_courses.length > 0 ? (
            data.continue_courses.slice(0, 2).map((item, index) => {
              return <ProcessCourseCard key={index} item={item} />
            })
          ) : (
            <NoData />
          )}
        </div>
      </section>
      {/* Khóa học yêu thích */}
      <section id="box-list-my-course" className="container">
        <div className="row-title">
          <div className="title-section">Khóa học yêu thích</div>
          <a href="#">
            <div className="read-more">
              Xem thêm
              <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </div>
          </a>
        </div>
        <div className="row-list-course-items">
          {data && data.wishlist && data.wishlist.length > 0 ? (
            data.wishlist.slice(0, 2).map((item, index) => {
              return <CourseCard key={index} item={item} />
            })
          ) : (
            <NoData />
          )}
        </div>
      </section>

      {/* Lịch live của tôi */}
      <section id="box-list-lich-live-cua-toi" className="container">
        <div className="row-title">
          <div className="title-list-lich-live">Lịch live của tôi</div>
          <a href="#">
            <div className="read-more">Xem thêm</div>
          </a>
        </div>
        <div className="list-card">
          <div className="list-card-item">
            {data && data.live1by1 && data.live1by1.length > 0 ? (
              data.live1by1.map((item, index) => {
                return (
                  <div className="card-item-lich-live" key={index}>
                    <a href="https://smarte.edu.vn/bonus">
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
                              <span>{item.book_time}</span>
                            </div>
                            <div className="thoi-gian">
                              <i
                                className="fa fa-clock-o"
                                aria-hidden="true"
                              ></i>
                              <span>
                                {item.price > 0
                                  ? toCurrency(item.price)
                                  : 'Tư vấn miễn phí'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                )
              })
            ) : (
              <NoData title="Bạn chưa đăng ký lịch live one-by-one" />
            )}
          </div>
        </div>
      </section>

      {/* Lịch học offline */}
      <section id="box-list-lich-hoc-offline" className="container">
        <div className="row-title ">
          <div className="title-list-lich-live title-section">
            Lịch học offline
          </div>
          <a href="/dashboards/offline-schedule">
            <div className="read-more">Xem thêm</div>
          </a>
        </div>

        <div className="list-card-lich-hoc ">
          {data && data.schedule_ofline && data.schedule_ofline.length > 0 ? (
            data.schedule_ofline.map((item, index) => {
              return (
                <a href="#" className="card-item-lich-hoc" key={index}>
                  <div className="card-item-left bd-10">
                    <CalendarOutlined style={{ fontSize: 24 }} />
                    <div className="day">{moment(item.date).format('DD')}</div>
                    <div className="month">
                      Tháng {moment(item.date).format('M')}
                    </div>
                    <div className="year">
                      {moment(item.date).format('YYYY')}
                    </div>
                  </div>
                  <div className="card-item-right">
                    <div className="lich-hoc-title-course">{item.title}</div>
                    <div className="style-day-place">
                      <div className="time">
                        <i
                          className="fa fa-clock-o mr-8"
                          aria-hidden="true"
                        ></i>
                        <div>
                          Từ: {item.time_from + ' đến: ' + item.time_to}
                        </div>
                      </div>
                      <div className="place">
                        <i
                          className="fa fa-map-marker mr-8"
                          aria-hidden="true"
                        ></i>
                        <span>
                          Tại: <span>{item.location}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              )
            })
          ) : (
            <NoData title="Bạn chưa đăng ký khóa học offline" />
          )}
        </div>
      </section>
    </div>
  )
}

export default DashboardPage
