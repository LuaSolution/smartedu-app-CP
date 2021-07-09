import React, { useState, useEffect } from 'react'
import UserHeaderLayout from 'components/users/UserHeaderLayout'
import UserFooterLayout from 'components/users/UserFooterLayout'
import { notification, Rate, Spin, Timeline } from 'antd'
// import { StarFilled, ArrowRightOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";
import iconGroupUser from 'atoms/home/group-user.svg'
import iconTime from 'atoms/home/icon-time.svg'
import iconMu from 'atoms/home/icon-mu.svg'
import 'assets/user/expert.scss'
// import iconList from "atoms/home/icon-list.png";
// import iconSchool from "atoms/home/icon-truong.png";
// import itemCourse from "atoms/home/item-course.png";
// import orangeIcon from "atoms/home/orange-icon.png";
// import greenIcon from "atoms/home/green-icon.png";
import { Avatar, NoData } from 'atoms'
import { useParams } from 'react-router-dom'
import axios from 'helpers/axios'
import { AVATAR_PATH } from 'defines'
import BookMentorCallModal from 'containers/bookMentorCallModal'

const ExpertDetail = () => {
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState('tdcm')
  const [data, setData] = useState()
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      setLoading(true)
      axios
        .get('get-mentor-info/' + id)
        .then((res) => {
          setData(res.data)
        })
        .finally(() => setLoading(false))
    }
  }, [id])

  const bookMentorCall = () => {
    setShowModal(true)
  }

  return (
    <>
      <UserHeaderLayout />
      <Spin spinning={loading}>
        {data && (
          <>
            <div className="box-expert-user">
              <div className="box-filter-linh-vuc-left-expert">
                <Avatar
                  src={AVATAR_PATH + data.id + '.webp'}
                  width={160}
                  height={160}
                  className="avatar-chuyen-gia "
                />
                <div className="fullname-chuyen-gia">
                  {data.gender === 2 ? 'Cô' : 'Thầy'}{' '}
                  {data.first_name + ' ' + data.last_name}
                </div>
                <div className="star-chuyen-gia">
                  <Rate allowHalf defaultValue={5} disabled={true} />
                </div>
                <div className="description-detail-cg">
                  <div className="box-icon-detail-cg">
                    <img src={iconMu} alt={''} className="icon-mu-style-cg" />
                  </div>
                  <div className="text-color">
                    <div>{data.job}</div>
                  </div>
                </div>
                <div className="description-detail-cg">
                  <div className="box-icon-detail-cg">
                    <img src={iconTime} alt={''} className="icon-mu-style-cg" />
                  </div>
                  <div className="text-color">
                    Đã chia sẻ <span className="blue-color">0 phút</span>
                  </div>
                </div>
                <div className="description-detail-cg">
                  <div className="box-icon-detail-cg">
                    <img
                      src={iconGroupUser}
                      alt={''}
                      className="icon-mu-style-cg"
                    />
                  </div>
                  <div className="text-color">
                    Đã kết nối với <span className="blue-color">0 người</span>
                  </div>
                </div>
                {/* <div className="box-list-tag-skill">
              <div className="item-tag blue-color">English</div>
              <div className="item-tag green-color">France</div>
            </div> */}
                <a href="#" onClick={bookMentorCall}>
                  <div className="btn-booking-now">Đặt lịch live</div>
                </a>
              </div>
              <div className="box-list-chuyen-gia">
                <div className="header-row-tab">
                  <div
                    onClick={() => setActiveTab('tdcm')}
                    className={`item-row-tab ${
                      activeTab === 'tdcm' ? 'active-item-tab' : ''
                    }`}
                  >
                    Trình độ chuyên môn
                  </div>
                  <div
                    onClick={() => setActiveTab('knlv')}
                    className={`item-row-tab ${
                      activeTab === 'knlv' ? 'active-item-tab' : ''
                    }`}
                  >
                    Kinh nghiệm làm việc
                  </div>
                  <div
                    onClick={() => setActiveTab('kngd')}
                    className={`item-row-tab ${
                      activeTab === 'kngd' ? 'active-item-tab' : ''
                    }`}
                  >
                    Kinh nghiệm giảng dạy
                  </div>
                  <div
                    onClick={() => setActiveTab('lvtv')}
                    className={`item-row-tab ${
                      activeTab === 'lvtv' ? 'active-item-tab' : ''
                    }`}
                  >
                    Lĩnh vực tư vấn
                  </div>
                </div>
                <div className="box-list-tab-control">
                  <div
                    className={`box-tab-timeline-chuyen-gia ${
                      activeTab === 'tdcm' ? 'show-tab' : ''
                    }`}
                  >
                    <div className="title-tab">Trình độ chuyên môn</div>
                    <Timeline className="time-style-box">
                      {data.qualifications.length > 0 ? (
                        data.qualifications.map((item, index) => (
                          <Timeline.Item key={index}>
                            <div className="title-time-line">
                              {item.content}
                            </div>
                          </Timeline.Item>
                        ))
                      ) : (
                        <NoData />
                      )}
                    </Timeline>
                  </div>
                  <div
                    className={`box-tab-timeline-chuyen-gia ${
                      activeTab === 'knlv' ? 'show-tab' : ''
                    }`}
                  >
                    <div className="title-tab">Kinh nghiệm làm việc</div>
                    <Timeline className="time-style-box">
                      {data.workExperience.length > 0 ? (
                        data.workExperience.map((item, index) => (
                          <Timeline.Item key={index}>
                            <div className="title-time-line">
                              {item.content}
                            </div>
                          </Timeline.Item>
                        ))
                      ) : (
                        <NoData />
                      )}
                    </Timeline>
                  </div>
                  <div
                    className={`box-tab-timeline-chuyen-gia ${
                      activeTab === 'kngd' ? 'show-tab' : ''
                    }`}
                  >
                    <div className="title-tab">Kinh nghiệm giảng dạy</div>
                    <Timeline className="time-style-box">
                      {data.teachingExperience.length > 0 ? (
                        data.teachingExperience.map((item, index) => (
                          <Timeline.Item key={index}>
                            <div className="title-time-line">
                              {item.content}
                            </div>
                          </Timeline.Item>
                        ))
                      ) : (
                        <NoData />
                      )}
                    </Timeline>
                  </div>
                  <div
                    className={`box-tab-timeline-chuyen-gia ${
                      activeTab === 'lvtv' ? 'show-tab' : ''
                    }`}
                  >
                    <div className="title-tab">Lĩnh vực tư vấn</div>
                    <Timeline className="time-style-box">
                      {data.fieldConsulting &&
                      data.fieldConsulting.length > 0 ? (
                        data.fieldConsulting.map((item, index) => (
                          <Timeline.Item key={index}>
                            <div className="title-time-line">
                              {item.content}
                            </div>
                          </Timeline.Item>
                        ))
                      ) : (
                        <NoData />
                      )}
                    </Timeline>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="bg-contain-list">
              <div className="container-list-chuyen-gia">
                <div className="title-list-header">
                  Các gói tư vấn one-by-one Live
                </div>
                <div className="list-item-chuyen-gia">
                  <NoData />

                  <div className="item-chuyen-gia-25">
                    <div className="row-1-chuyen-gia">
                      <div className="image-avatar">
                        <img
                          src={null}
                          alt={''}
                          className="style-image-avatar"
                        />
                      </div>
                      <div className="box-title-header">
                        <div className="title-name">Thầy Trương Minh Hạnh</div>
                        <div className="description-name">
                          <img
                            src={iconMu}
                            alt={''}
                            className="style-image-mu"
                          />
                          Tiến sĩ Kinh Tế
                        </div>
                      </div>
                    </div>
                    <div className="row-2-chuyen-gia">
                      <div className="total-people-connect">
                        458 người đã kết nối
                      </div>
                    </div>
                    <div className="row-3-chuyen-gia">
                      <div className="faculty-chuyen-gia">
                        <div className="box-icon-list">
                          <img src={iconList} className="icon-list" alt={''} />
                        </div>
                        Trưởng khoa tài chính
                      </div>
                    </div>
                    <div className="row-4-chuyen-gia">
                      <div className="school-chuyen-gia">
                        <div className="box-icon-school">
                          <img
                            src={iconSchool}
                            className="icon-school"
                            alt={''}
                          />
                        </div>
                        Trường ĐH Ngân hàng
                      </div>
                    </div>
                    <div className="row-5-chuyen-gia">
                      <div className="school-chuyen-gia">
                        <span className="discount-number">15.000 đ</span>
                        <span className="price-number">5.000 đ/ phút</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button className="btn-load-more-bottom">
                Đăng ký kết nối ngay <ArrowRightOutlined />
              </button>
            </div> */}

            <div className="bg-contain-list">
              <div className="container-list-chuyen-gia">
                <div className="title-list-header">
                  <div className="title-row">
                    Khóa học của {data.gender === 2 ? 'cô' : 'thầy'}{' '}
                    {data.first_name + ' ' + data.last_name}
                  </div>
                  {/* <a href="#"><div className="text-link">Xem thêm <ArrowRightOutlined /></div></a> */}
                </div>
                <div className="list-course">
                  <NoData />
                  {/*               
              <div className="item-course">
                <div className="image-item">
                  <img src={itemCourse} alt={""} className="style-image-item" />
                  <div className="icon-heath">
                    <div className=""><HeartOutlined /></div>
                    <div className="active"><HeartFilled /></div>
                  </div>
                  <div className="best-seller">
                    Best Seller
              </div>
                  <img src={orangeIcon} alt={""} className="icon-orange" />
                </div>
                <div className="title-1">
                  Marketing quốc tếMarketing quốc tếMarketing quốc tếMarketing quốc tếMarketing quốc tế
            </div>
                <div className="description-1">
                  Bãn sẽ nâng cao trunfh độ chuyên môn với khóa học ngắn ngày
            </div>
                <div className="price-row-1">
                  <span className="price-amount">130.000 đ</span>
                  <span className="price-discount">130.000đ</span>
                </div>
                <div className="start-box">
                  4.5 <StarFilled />
                </div>
                <div className="box-class-offline">
                  Có lớp Offline
            </div>
                <img src={greenIcon} alt={""} className="icon-green" />
              </div>
             */}
                </div>
              </div>
            </div>
          </>
        )}
      </Spin>
      <BookMentorCallModal
        show={showModal}
        setShow={setShowModal}
        mentorId={id}
      />
      <UserFooterLayout />
    </>
  )
}

export default ExpertDetail
