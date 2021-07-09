import React, { useState, useEffect } from 'react'
import History from 'atoms/home/History.svg'
import Sexual from 'atoms/home/Sexual.svg'
import Map from 'atoms/home/Map.svg'
import lecture from 'atoms/home/lecture.svg'
import Group from 'atoms/home/Company.svg'
import Job from 'atoms/home/Job.svg'
import {
  ArrowRightOutlined,
  ClockCircleOutlined,
  FormOutlined,
} from '@ant-design/icons'
import profileImage from 'atoms/home/profile-image-1.png'
import { Badge, Typography } from 'antd'
import iconAchi1 from 'atoms/home/icon-achi-1.svg'
import iconAchi2 from 'atoms/home/icon-achi-2.png'
import axios from 'helpers/axios'
import QRCode from 'react-qr-code'
import { GENDER } from 'defines'
import { NoData } from 'atoms'
import { useParams } from 'react-router-dom'
import CourseCard from 'components/overviewCourseCard'
import moment from 'moment'
import chungchi from 'assets/mau-chung-chi-cp.png'

const _user = JSON.parse(localStorage.getItem('@current_user')) || null

const Overview = ({ id, userData, certificates, clickChangeTabMenu }) => {
  const [loading, setLoading] = useState(false)
  const [myCourses, setMyCourses] = useState([])

  useEffect(() => {
    console.log(id)
    if (id) {
      fetchDataMyCourses()
    }
  }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchDataMyCourses = () => {
    setLoading(true)
    axios
      .get('courses/my-courses/paging/0/' + id)
      .then((res) => {
        if (res.data.status === 200) {
          setMyCourses(res.data.data)
        }
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className="box-feed-user">
      <div className="profile-info-left">
        {userData && (
          <div className="box-top-intro-1">
            <div className="title-intro">Giới thiệu</div>
            <div className="item-row-info">
              <div className="show-info-left">
                <img src={History} alt={''} />
                Ngày sinh
              </div>
              <div className="show-info-right">
                {userData.birthday
                  ? moment(userData.birthday).format('DD/MM/YYYY')
                  : ''}
              </div>
            </div>
            <div className="item-row-info">
              <div className="show-info-left">
                <img src={Sexual} alt={''} />
                Giới tính
              </div>
              <div className="show-info-right">{GENDER[userData.gender]}</div>
            </div>
            <div className="item-row-info">
              <div className="show-info-left">
                <img src={Map} alt={''} />
                Sống tại
              </div>
              <div className="show-info-right">{userData.address}</div>
            </div>
            <div className="item-row-info">
              <div className="show-info-left">
                <img src={lecture} alt={''} />
                Giữ chức vụ
              </div>
              <div className="show-info-right">{userData.position}</div>
            </div>
            <div className="item-row-info">
              <div className="show-info-left">
                <img src={lecture} alt={''} />
                Thuộc bộ phận
              </div>
              <div className="show-info-right">{userData.department}</div>
            </div>
            <div className="item-row-info">
              <div className="show-info-left">
                <img src={Group} alt={''} />
                Công ty
              </div>
              <div className="show-info-right">{userData.partner}</div>
            </div>
            <div className="item-row-info">
              <div className="show-info-left">
                <img src={Job} alt={''} />
                Hiện tại
              </div>
              <div className="show-info-right">{userData.job}</div>
            </div>
            <div className="row-qr-code">
              <QRCode value={window.location.href} size={140} />
            </div>
            {_user && (
              <div className="copy-address-info">
                {/* Copy link giới thiệu tại đây <BlockOutlined /> */}
                <Typography.Paragraph copyable={{ text: window.location.href }}>
                  Copy link profile tại đây
                </Typography.Paragraph>
              </div>
            )}
            {_user && parseInt(_user.id) === parseInt(id) && (
              <div
                className="btn-primary-100-profile"
                onClick={() => (window.location.href = '/edit-profile')}
              >
                <FormOutlined /> Sửa thông tin
              </div>
            )}
          </div>
        )}

        <div className="box-top-intro-2">
          <div className="title-friend-2">
            <div className="text-left">Bạn bè</div>
            <div
              className="text-right"
              style={{ cursor: 'pointer' }}
              onClick={() => clickChangeTabMenu('friends')}
            >
              Xem tất cả <ArrowRightOutlined />
            </div>
          </div>
          <div className="total-friend-2">20 người bạn</div>
          <div className="box-list-friend-2">
            {process.env.REACT_APP_LOCAL === 'false' ? (
              <NoData />
            ) : (
              [...Array(3)].map((x, i) => (
                <div
                  className="item-friend-2"
                  key={i}
                  onClick={() => {
                    window.open('/profile/' + i + '/overview', '_blank')
                  }}
                >
                  <div className="image-friend">
                    <img src={null} className="style-avatar" alt="" />
                  </div>
                  <div className="full-name-freind-2">Thùy Dương</div>
                </div>
              ))
            )}
          </div>
        </div>

        <div
          className="box-top-intro-3"
          style={{ cursor: 'pointer' }}
          onClick={() => clickChangeTabMenu('learning-path')}
        >
          <div className="lo-trinh-box-content">
            <div className="title-lt-top">
              {userData.last_name} đã học tập rất chăm chỉ
            </div>
            <div className="description-lt-top">
              Xem lộ trình học tập của{' '}
              {userData.gender === null
                ? 'bạn'
                : userData.gender === 1
                ? 'anh'
                : 'cô'}{' '}
              ấy{' '}
            </div>
          </div>
        </div>
      </div>
      <div className="profile-feed-right">
        <div className="box-list-feed">
          <div className="row-header-feed">
            <div className="title-feed">Chứng chỉ</div>
            <div
              className="more-feed"
              onClick={() => clickChangeTabMenu('certificates')}
            >
              Xem tất cả <ArrowRightOutlined />
            </div>
          </div>
          <div className="list-feed">
            {certificates && certificates.length > 0 ? (
              certificates.map((x, i) => (
                <div className="item-feed" key={i}>
                  <div className="image-feed">
                    <img src={chungchi} className="style-image-feed" alt={''} />
                  </div>
                  <div className="title-feed">{x.title}</div>
                  <div className="date-feed">
                    <ClockCircleOutlined /> Đã nhận vào:{' '}
                    {moment(x.release_date).format('DD/MM/YYYY')}
                  </div>
                </div>
              ))
            ) : (
              <NoData />
            )}
          </div>
        </div>

        <div className="box-list-feed">
          <div className="row-header-feed">
            <div className="title-feed">Các khóa đang học</div>
            <div
              className="more-feed"
              onClick={() => clickChangeTabMenu('wishlist')}
            >
              Xem tất cả <ArrowRightOutlined />
            </div>
          </div>
          <div className="list-feed">
            {myCourses.length > 0 ? (
              myCourses.map(
                (item, index) => <CourseCard key={index} item={item} />
                // <div className="item-feed" key={i}>
                //   <div className="image-feed">
                //     <img src={COURSES_PATH + item.id + '.webp?' + Math.random()}
                //       className="style-image-feed" alt={""} />
                //   </div>
                //   <div className="title-feed">
                //     {item.title}
                //   </div>
                //   <div className="description-feed">
                //     {item.s_des}
                //   </div>
                // </div>
              )
            ) : (
              <NoData />
            )}
          </div>
        </div>

        <div className="box-list-feed">
          <div className="row-header-feed">
            <div className="title-feed">Đóng góp cộng đồng</div>
            <div
              className="more-feed"
              onClick={() => clickChangeTabMenu('courses')}
            >
              Xem tất cả <ArrowRightOutlined />
            </div>
          </div>
          <div className="list-feed">
            {process.env.REACT_APP_LOCAL === 'false' ? (
              <NoData />
            ) : (
              [...Array(4)].map((x, i) => (
                <div className="item-feed" key={i}>
                  <Badge.Ribbon text="Đã xuất bản" color="#F88417">
                    <div className="image-feed">
                      <img
                        src={profileImage}
                        className="style-image-feed"
                        alt={''}
                      />
                    </div>
                    <div className="title-feed">
                      Xây dựng thương hiệu bản thân và quản lý thời gian...hân
                      và quản lý thời gian...hân và quản lý thời gian...hân và
                      quản lý thời gian...hân và quản lý thời gian...
                    </div>
                    <div className="description-feed">
                      Maven Analytics, Chris Dutton
                    </div>
                  </Badge.Ribbon>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="box-list-achievements">
          <div className="row-header-feed">
            <div className="title-feed">Khen thưởng</div>
            {/* <div className="more-feed"><FormOutlined /> Chỉnh sửa</div> */}
          </div>
          <div className="list-achievements">
            {process.env.REACT_APP_LOCAL === 'false' ? (
              <NoData />
            ) : (
              [...Array(3)].map((x, i) => (
                <div className="item-achievements" key={i}>
                  <div className="image-achievements">
                    <img
                      src={iconAchi1}
                      className="style-image-achievements"
                      alt={''}
                    />
                  </div>
                  <div className="description-achievements">
                    Nhân viên xuất sắc nhất quý {i}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="box-list-achievements">
          <div className="row-header-feed">
            <div className="title-feed">Thành tích nổi bật</div>
            {/* <div className="more-feed"><FormOutlined /> Chỉnh sửa</div> */}
          </div>
          <div className="list-achievements">
            {process.env.REACT_APP_LOCAL === 'false' ? (
              <NoData />
            ) : (
              [...Array(2)].map((x, i) => (
                <div className="item-achievements" key={i}>
                  <div className="image-achievements">
                    <img
                      src={iconAchi2}
                      className="style-image-achievements"
                      alt={''}
                    />
                  </div>
                  <div className="description-achievements">
                    Giải nhất cuộc thi nét đẹp công sở {i}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview
