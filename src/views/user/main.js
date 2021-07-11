import React, { useState, useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import UserHeaderLayout from 'components/users/UserHeaderLayout'
import UserFooterLayout from 'components/users/UserFooterLayout'
import Modal from 'react-bootstrap/Modal'
import wrong from 'atoms/home/wrong.svg'
import bgVideoBlock from 'atoms/home/bgVideoBlock.svg'
import bgWhyChoose from 'atoms/home/bgWhyChoose.svg'
import bgMethod from 'atoms/home/bgMethod.svg'
import MethodItem from 'components/users/MethodItem'
import WhyItem from 'components/users/WhyItem'
import { Badge, Typography, notification, Alert, Rate, Button } from 'antd'
import detectMobile from 'helpers/detectMobile'
import 'assets/user/ifa-home.css'
import 'assets/user/ifa-form.css'
import { toCurrency } from 'helpers/Utils'
import useFormInput from 'helpers/useFormInput'
import axios from 'helpers/axios'
import knowledge from 'atoms/home/knowledge.svg'
import oppbase from 'atoms/home/1opp-base.svg'
import runsvg from 'atoms/home/2run.svg'
import medalsvg from 'atoms/home/3medal.svg'
import InfiniteCarousel from 'react-leaf-carousel'
import momentTime from 'helpers/moment'

import s8_1 from 'atoms/home/s8-1.svg'
import s8_2 from 'atoms/home/s8-2.svg'
import s8_3 from 'atoms/home/s8-3.svg'
import s8_4 from 'atoms/home/s8-4.svg'
import s8_5 from 'atoms/home/s8-5.svg'
import s8_6 from 'atoms/home/s8-6.svg'

import s2_1 from 'atoms/home/s2-1.jpg'
import s2_2 from 'atoms/home/s2-2.jpg'
import s2_3 from 'atoms/home/s2-3.jpg'
import s2_4 from 'atoms/home/s2-4.jpg'
import s2_5 from 'atoms/home/s2-5.jpg'
import s2_6 from 'atoms/home/s2-6.jpg'
import s2_7 from 'atoms/home/s2-7.jpg'
import s2_8 from 'atoms/home/s2-8.jpg'
import s1_1_cp from 'atoms/home/001-01.png'
import s1_2_cp from 'atoms/home/001-02.png'
import s1_3_cp from 'atoms/home/001-03.png'
import s1_4_cp from 'atoms/home/001-04.png'
import { NEWS_PATH, CATE_PATH, COURSES_PATH } from 'defines'
// import { Avatar } from 'atoms'
const { Paragraph } = Typography

const whyItemDatas = [
  {
    image: s2_1,
    title: 'Chủ động học tập',
    content:
      'Giúp học viên tiếp cận kiến thức một cách chủ động và có thể linh hoạt học mọi lúc mọi nơi',
  },
  {
    image: s2_2,
    title: 'Chứng chỉ Quốc tế',
    content:
      'Nâng cao trình độ chuyên môn, kỹ năng với đa dạng các khóa học và chứng chỉ Quốc tế với mã QR đảm bảo tính xác thực',
  },
  {
    image: s2_3,
    title: 'One-by-one live',
    content:
      'Trải nghiệm con đường tiếp cận kiến thức thông qua tương tác trực tuyến 1:1 với các chuyên gia đầu ngành',
  },
  {
    image: s2_4,
    title: 'Cộng đồng học tập',
    content:
      'Cộng đồng học tập built-in giúp học viên tương tác, hỗ trợ lẫn nhau trong quá trình học tậ',
  },
  {
    image: s2_5,
    title: 'Kiểm tra kiến thức',
    content:
      'Các bài kiểm tra, bài thi đánh giá năng lực, giúp học viên thực nghiệm lại những kiến thức đã học',
  },
  {
    image: s2_6,
    title: 'Kì thi thực tế',
    content:
      'Phòng thi trực tuyến được mô phỏng thực tế, kết quả đưa ra chính xác, công bằng và minh bạch',
  },
  {
    image: s2_7,
    title: 'Khen thưởng và quà tặng',
    content:
      'Hệ thống điểm thưởng, quà tặng phong phú dựa trên thành tích học tập của học viên',
  },
  {
    image: s2_8,
    title: 'Giao diện hiện đại',
    content:
      'Được thiết kế hiện đại mang tính thẩm mỹ cao có thể tiếp cận theo hướng dễ sử dụng và tiện lợi cho người học',
  },
]

const methodDatas = [
  {
    icon: knowledge,
    title: 'GAME-BASE',
    subTitle: 'Học qua trò chơi',
    content:
      'Biến trò chơi thành bài học có ý nghĩa không chỉ giúp gia tăng tương tác của người học và bài giảng mà còn kích thích mong muốn học tập trong mỗi người',
  },
  {
    icon: oppbase,
    title: 'OPERATION-BASE',
    subTitle: 'Học bằng tương tác',
    content:
      'Hỗ trợ trích xuất báo cáo tức thì giúp doanh nghiệp đánh giá được chất lượng người học để từ đó xây dựng nội dung đào tạo phù hợp',
  },
  {
    icon: runsvg,
    title: 'ACTIVITY-BASE',
    subTitle: 'Học qua hoạt động',
    content:
      'Thay đổi thói quen học thụ động thường thấy phương pháp giúp người học chủ động khám phá kiến thức nên ghi nhớ nội dung dễ dàng hơn',
  },
  {
    icon: medalsvg,
    title: 'LEADERBOARD-BASE',
    subTitle: 'Bảng xếp hạng',
    content:
      'Kích thích thi đua qua bảng xếp hạng là phương pháp giúp người học chủ động đánh giá được khả năng bản thân từ đó có động lực học tập để tiến lên',
  },
]

const partnerIcons = 23

const toMentorDatas = [
  {
    icon: s8_1,
    title: 'Xây dựng hình ảnh chuyên gia',
    content:
      'Trở thành chuyên gia của chúng tôi và được hỗ trợ hình ảnh chuyên nghiệp',
  },
  {
    icon: s8_2,
    title: 'Thu nhập linh động',
    content:
      'Tạo ra nguồn thu nhập và linh hoạt dựa theo thời gian của bạn. Không ràng buộc thời gian',
  },
  {
    icon: s8_3,
    title: 'Công cụ tiện lợi',
    content:
      'Dễ dàng hỗ trợ cộng đồng mọi lúc mọi nơi dựa trên nền tảng Platform',
  },
  {
    icon: s8_4,
    title: 'Gia nhập cộng đồng mentor CP Learning Center',
    content:
      'Tham gia làm mentor CP Learning Center không ràng buộc và có thể chia sẻ các giá trị chung cho cộng đồng',
  },
  {
    icon: s8_5,
    title: 'Cơ hội hợp tác trong cộng đồng',
    content:
      'Mỗi thành viên đều có cơ hội mở rộng quan hệ với đồng nghiệp, học hỏi từ nhiều người, đồng thời dạy và kèm cặp các học viên có mong muốn được học',
  },
  {
    icon: s8_6,
    title: 'Không ràng buộc về thời gian, địa điểm',
    content:
      'Các chuyên gia có thể tham gia vào bất kì thời gian nào và bất kỳ nơi đâu',
  },
]

const MainPage = () => {
  const [show, setShow] = useState(false)
  const [_err, setErr] = useState(false)

  const [data, setData] = useState(null)

  const companyName = useFormInput()
  const name = useFormInput()
  const phone = useFormInput()
  const email = useFormInput()
  const content = useFormInput()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(() => {
    axios.get('homepage-info').then((res) => {
      setData(res?.data?.data)
      document.getElementById('myvideo').src =
        'https://www.youtube.com/embed/ybUUlBClmFM'
    })
  }, [])

  const openNotificationWithIcon = (type = 'success') => {
    notification[type]({
      message: 'Thông báo từ CP Learning Center',
      description:
        'Đã gửi thông tin đến Smart Edu, chúng tôi sẽ phản hồi cho bạn thông qua email hoặc số điện thoại, xin cảm ơn !',
    })
  }

  const submitConsulting = (e) => {
    e.preventDefault()
    if (
      name.value === '' ||
      phone.value === '' ||
      email.value === '' ||
      content.value === ''
    ) {
      setErr(true)
    } else {
      const params = {
        company_name: companyName.value,
        name: name.value,
        phone: phone.value,
        email: email.value,
        content: content.value,
      }

      axios.post('add-form-consulting', params)

      setErr(false)
      handleClose()
      openNotificationWithIcon()
    }
  }

  // const renderPrice = item => {
  //   if (item.old_price > 0) {
  //     if (item.new_price > 0) {
  //       return <div className="price">
  //         <span className="sell">
  //           <span className="number">{toCurrency(item.new_price)}</span>
  //         </span>
  //         <span className="origin">
  //           <span className="number">{toCurrency(item.old_price)}</span>
  //         </span>
  //       </div>
  //     } else {
  //       return <div className="price">
  //         <span className="sell">
  //           <span className="number">{toCurrency(item.old_price)}</span>
  //         </span>
  //       </div>
  //     }
  //   }
  //   return <div className="price">
  //     <span className="sell">
  //       <span className="number">Được tài trợ</span>
  //     </span>
  //   </div>
  // }

  return (
    <>
      <UserHeaderLayout />
      <div className="ifa-body-wrapper ">
        <div
          className="ifa-container ifa-video-block bg-banner "
        >
          <div className="row ifa-block-content ifa-video-block-content container">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12 img">
              <iframe
                title="myvideo"
                id="myvideo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            {/* <div className="col-xl-4 col-lg-12 col-md-12 col-12"> */}
              {/* <img src={s1_1_cp} className="img-banner-people"/> */}


              {/* <p className="header-title">
                Cung cấp giải pháp đào tạo trực tuyến
              </p>
              <p className="header-content">
                CP Learning Center là một hệ thống Quản lý đào tạo trực tuyến nhằm hỗ trợ
                Quản lý và thực hiện Đào tạo trực tuyến một cách toàn diện. Giúp
                người học vừa hứng thú với khoá học, vừa có thể đạt được kết quả
                tương tự như học truyền thống với chi phí thấp nhất mà không cần
                phải đến lớp.
              </p> */}
            {/* </div> */}

            <div className="col-lg-12 col-md-12 col-12 btn-dang-ky-tu-van-block">
              <div className="btn-dang-ky-tu-van" onClick={handleShow}>
                Đăng ký tư vấn
              </div>
            </div>
          </div>
        </div>

        <div
          className="ifa-container ifa-why-block"
          style={{ backgroundImage: `url(${bgWhyChoose})` }}
        >
          {/* <div className="ifa-block-content ifa-why-block-content container">
            <p className="top-small-text">Tại sao chọn CP Learning Center</p>
            <p className="top-lg-text">
              CP Learning Center không chỉ là một nền tảng đào tạo
            </p>
            <div className="row ifa-list-item">
              {whyItemDatas.map((item, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-12 why-item"
                  key={index}
                >
                  <WhyItem
                    item={{
                      img: item.image,
                      title: item.title,
                      content: item.content,
                    }}
                  />
                </div>
              ))}
              <div className="col-lg-12 col-md-12 btn-dang-ky-tu-van-why-block">
                <div className="btn-dang-ky-tu-van" onClick={handleShow}>
                  Đăng ký tư vấn
                </div>
              </div>
            </div>
          </div> */}
        </div>

        {/* <div className="ifa-container ifa-elearning-block">
          <div className="ifa-block-content ifa-elearning-block-content container">
            <p className="top-small-text">Tìm hiểu về CP Learning Center</p>
            <p className="top-lg-text">
              Cung cấp Giải pháp đào tạo Nhân sự toàn diện
            </p>
            <div className="row ifa-list-item">
              <div className="col-lg-6 col-md-6 col-sm-6 col-12s item-wrapper">
                <div className="item ifa-item">
                  <div className="item-img-block">
                    <img
                      src={
                        process.env.PUBLIC_URL + '/assets/img/web/home/38.webp'
                      }
                      alt="video"
                    />
                  </div>
                  <div className="item-content-block">
                    <div className="title">
                      Chương trình E-Learning và hệ thống LMS CP Learning Center
                    </div>
                    <div className="item-content-block-wrapper">
                      <div className="item-content-block">
                        Cung cấp các chương trình đào tạo theo hình thức{' '}
                        <b>Blended Learning</b>, học viên học tập Online trên hệ
                        thống LMS CP Learning Center kết hợp các buổi workshop (Offline)
                        hoặc trên nền tảng Webinar của hệ thống. Học viên được
                        cấp <b>mã QR </b>
                        để quản lý các khóa học của mình
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-md-6 col-sm-6 col-12 item-wrapper">
                <div className="item ifa-item">
                  <div className="item-img-block">
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        '/assets/img/web/home/38-2.webp'
                      }
                      alt="video"
                    />
                  </div>
                  <div className="item-content-block">
                    <div className="title">
                      Cung cấp dịch vụ số hóa bài giảng
                    </div>
                    <div className="item-content-block-wrapper">
                      <div className="item-content-block">
                        Dịch vụ số hóa mọi nội dung đào tạo theo nhu cầu riêng
                        của doanh nghiệp (Quy trình, quy định, kĩ năng, nghiệp
                        vụ, thông tin sản phẩm, ...) và hỗ trợ báo cáo kết quả
                        người học. Tất cả những nội dung số hóa sẽ được đưa lên
                        hệ thống LMS CP Learning Center được cấp quyền riêng cho Doanh
                        nghiệp tự quản lý và đánh giá kết quả nhân viên thông
                        qua hệ thống
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="btn-dang-ky-tu-van-block container" style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
          <div className="btn-dang-ky-tu-van t-css" onClick={() => {
            window.open('/coming-soon', '_blank')
          }} >Tìm hiểu thêm</div>
        </div>
        </div> */}

{/* SAU NAY LA SILDER */}
        <div className="ifa-container ifa-method-block">
          <div className="container ifa-block-content">
            <div className="top-small-text">Giới thiệu về các khóa học</div>
            <div className="title-home"> Các khóa đào tạo HRD - CPV - Learning Center</div>
            <div className="row list-cat-course-home">
            <div className=" col-lg-3 col-md-6 col-sm-6 col-12  ">
                <div className="card cat-course-home">
                  <div className="imgstyle-cat">
                    <img src={s1_1_cp} />
                  </div>
                  <div className="cat-name-home bg-blue  cut-text-2-line t-cap"> CPV Concept Learning</div>
                </div>
              </div>
              <div className=" col-lg-3 col-md-6 col-sm-6 col-12  ">
                <div className="card cat-course-home">
                  <div className="imgstyle-cat">
                    <img src={s1_2_cp} />
                  </div>
                  <div className="cat-name-home bg-green cut-text-2-line t-cap">CPF Way Course</div>
                </div>
              </div>
              <div className=" col-lg-3 col-md-6 col-sm-6 col-12  ">
                <div className="card cat-course-home">
                  <div className="imgstyle-cat">
                    <img src={s1_3_cp} />
                  </div>
                  <div className="cat-name-home bg-blue cut-text-2-line t-cap"> SD1,2,3 - Standard Course</div>
                </div>
              </div>
              
              <div className=" col-lg-3 col-md-6 col-sm-6 col-12 ">
                <div className="card cat-course-home">
                  <div className="imgstyle-cat">
                    <img src={s1_4_cp} />
                  </div>
                  <div className="cat-name-home bg-green cut-text-2-line t-cap"> 7 Habits</div>
                </div>
              </div>
            </div>


          </div>
          {/* <div className="ifa-container">
            <div className="ifa-block-content ifa-method-block-content container">
              <p className="top-small-text">Khóa học có gì nổi bật?</p>
              <p className="top-lg-text">
                Tạo hứng thú với mỗi bài học thông qua
              </p>
              <div className="row ifa-list-item">
                {methodDatas.map((item, index) => (
                  <div
                    className="col-lg-3 col-md-6 col-sm-6 col-12 item-wrapper"
                    key={index}
                  >
                    <MethodItem item={item} />
                  </div>
                ))}
              </div>
            </div>
          </div> */}

          {/* <div className="ifa-container ifa-course-block container-fluid">
          <div className="ifa-block-content ifa-course-block-content">
            <p className="top-small-text">
              Hệ thống CP Learning Center có những khóa học nào?
            </p>
            <p className="top-lg-text">
              Khóa học trực tuyến
            </p>
            <div className="list-course-block">
              {data && data.pinned_course &&
                <div className="container-fluid big-item ifa-item">
                  <a href="/course-details/2" className="row">
                    <Avatar src={COURSES_PATH + data.pinned_course.id + '.webp?' + Math.random()}
                      height={300}
                      borderRadius={'5px 0 0 0'} />
                    <div className="col-lg-6 content ">
                      <p className="title">
                        <Paragraph ellipsis={{ rows: 3 }} >{data.pinned_course.title}</Paragraph>
                      </p>
                      <div className="description-wrapper">
                        <p className="description">{data.pinned_course.s_des}</p>
                      </div>
                      {renderPrice(data.pinned_course)}
                      <div className="rate-wrapper">
                        <Rate disabled defaultValue={Math.round(data.pinned_course.rating)} />
                      </div>
                    </div>
                  </a>
                </div>
              }
              {detectMobile() ? <Carousel className="list-small-item-mobile">
                {data && data.courses && data.courses.map((item, index) =>
                  <Carousel.Item interval={3000}>
                    <Badge.Ribbon text="Best Seller" color="#F88417">
                      <div className="item">
                        <a href="/">
                          <Avatar src={COURSES_PATH + item.id + '.webp?' + Math.random()}
                            height={50}
                            width={100}
                            borderRadius={'5px 0 0 0'} />
                          <div className="like-icon"></div>
                          <div className="content ">
                            <p className="title">Graphic Designer & Visual Thinking 2021</p>
                            <p className="description">Maven Analytics, Chris Dutton</p>
                            <div className="price">
                              <span className="sell"><span className="number">{toCurrency(130000)}</span></span>
                              <span className="origin"><span className="number">{toCurrency(130000)}</span></span>
                            </div>
                            <div className="rate-wrapper">
                              <div className="rate">4.5</div>
                            </div>
                          </div>
                        </a>
                      </div>
                    </Badge.Ribbon>
                  </Carousel.Item>
                )}
              </Carousel>
                :
                <div className="list-small-item">
                  {data && data.courses && data.courses.map((item, index) =>
                    <div className="item ifa-item">
                      <a href="/">
                        <Avatar src={COURSES_PATH + item.id + '.webp?' + Math.random()}
                          height={200}
                          width={270}
                          borderRadius={5} />
                        <div className="like-icon"></div>
                        <div className="content offline-class">
                          <p className="title">
                            <Paragraph ellipsis={{ rows: 2 }} >{item.title}</Paragraph>
                          </p>
                          <p className="description">
                            <Paragraph ellipsis={{ rows: 2 }} >{item.s_des}</Paragraph>
                          </p>
                          {renderPrice(item)}
                          <div className="rate-wrapper" style={{ paddingBottom: 15 }}>
                            <Rate disabled defaultValue={Math.round(item.rating)} />
                          </div>
                        </div>
                      </a>
                    </div>
                  )}
                </div>
              }
            </div>
          </div>
        </div> */}

          {/* <div className="ifa-container ifa-category-block">
          <div className="ifa-block-content">
            <p className="top-lg-text">Đa dạng thể loại</p>
            <div className="row ifa-list-item">
              {data && data.course_groups && data.course_groups.map((item, index) =>
                <div className="col-lg-3 col-md-6 col-sm-6 col-6 item-wrapper" key={index}>
                  <div className="item" style={{ backgroundImage: `url(${CATE_PATH + item.id + '.svg'})`, border: '1px solid #eee' }}>
                    <p className="title">
                      <a href={'/the-loai/' + item.id}>{item.name}</a>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div> */}

          {/* <div className="ifa-container ifa-connect-pro-block ">
            <div className="ifa-block-content container">
              <p className="top-small-text">Kết nối với chuyên gia cực dễ</p>
              <p className="top-lg-text">One - by - One Live</p>
              <div className="row ifa-list-item t-css">
                <div
                  className="col-lg-6 col-md-6 col-sm-12 col-12 item-wrapper "
                  style={{
                    borderRadius: 5,
                    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/img/web/home/43.webp'
                      })`,
                  }}
                ></div>

                <div className="col-lg-6 col-md-6 col-sm-12 col-12 item-wrapper">
                  <ul>
                    <li>Kết nối mọi lúc mọi nơi</li>
                    <li>Biết trước chi phí tư vấn</li>
                    <li>
                      Chuyên gia uy tín, chứng chỉ, bằng cấp được chứng nhận
                    </li>
                    <li>Giải quyết nhanh vấn đề của bạn</li>
                    <li>Linh hoạt thời gian tương tác</li>
                  </ul>
                  <div className="btn-dang-ky-tu-van-why-block">
                    <a href="/onebyone-live" className="btn-dang-ky-tu-van">
                      Tìm hiểu thêm
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          {/* <div className="ifa-container ifa-our-pro-block">
          <div className="ifa-block-content">
            <p className="top-lg-text">
              Đội ngũ chuyên gia
            </p>
            {detectMobile() ? <Carousel className="list-our-pro-mobile">
              <Carousel.Item interval={3000}>
                <div className="item">
                  <div className="image">
                    <img src={process.env.PUBLIC_URL + '/assets/img/web/home/44.png'} alt="video" />
                  </div>
                  <div className="content">
                    <div className="line">
                      <p className="name">Julio.R</p>
                    </div>
                    <div className="line">
                      <p className="position">Web Deverloper</p>
                    </div>
                    <div className="line">
                      <p className="company">Tập đoàn Vingroup</p>
                    </div>
                    <div className="line">
                      <p className="description">Tiến sĩ Chuck đã sống và làm việc tại Việt Nam khoảng 20 năm. Kinh nghiệm của ông đến từ việc kinh doanh xuất nhập khẩu, nơi ông có thể truyền cảm hứng cho những người trẻ trong tương lai</p>
                    </div>
                  </div>
                </div>
              </Carousel.Item>
            </Carousel>
              :
              <Carousel className="list-our-pro">
                <Carousel.Item interval={3000}>
                  <div className="item">
                    <div className="image">
                      <img src={process.env.PUBLIC_URL + '/assets/img/web/home/44.png'} alt="video" />
                    </div>
                    <div className="content">
                      <div className="line">
                        <p className="name">Julio.R</p>
                      </div>
                      <div className="line">
                        <p className="position">Web Deverloper</p>
                      </div>
                      <div className="line">
                        <p className="company">Tập đoàn Vingroup</p>
                      </div>
                      <div className="line">
                        <p className="description">Tiến sĩ Chuck đã sống và làm việc tại Việt Nam khoảng 20 năm. Kinh nghiệm của ông đến từ việc kinh doanh xuất nhập khẩu, nơi ông có thể truyền cảm hứng cho những người trẻ trong tương lai</p>
                      </div>
                    </div>
                  </div>
                </Carousel.Item>
              </Carousel>}
          </div>
        </div> */}
          {/*         
          <div className="ifa-container ifa-share-block">
            <div className=" ifa-block-content container">
              <p className="top-small-text">Chia sẻ kiến thức với cộng đồng</p>
              <p className="top-lg-text">Trở thành chuyên gia cùng CP Learning Center</p>
              <div className="row">
                {toMentorDatas.map((item, index) => (
                  <div className="col-lg-4 col-md-6 item" key={index}>
                    <div className="icon">
                      <img src={item.icon} alt="video" />
                    </div>
                    <p className="title">{item.title}</p>
                    <p className="description">{item.content}</p>
                  </div>
                ))}
              </div>
              <div className="btn-dang-ky-tu-van-block">
                <div
                  className="btn-dang-ky-tu-van"
                  onClick={() => {
                    window.open('/expert-about', '_blank')
                  }}
                >
                  Tìm hiểu thêm
                </div>
              </div>
            </div>
          </div>
        */}
        </div>

        <div className="ifa-container ifa-news-elearning mt-80">
          {/* <div className="ifa-container ifa-news-elearning" style={{ backgroundImage: `url(${bgNewsElearning})` }}> */}
          <div className="container ifa-container ifa-news-block ">
            <div className="ifa-block-content container ">
              {/* <p className="top-small-text">Liên tục những hoạt động sôi nổi</p> */}
              <p className="top-lg-text title-home">Tin tức - Sự kiện</p>
              <div className="row list-news">
                {data &&
                  data.news &&
                  data.news.map((item, index) => (
                    <div
                      className=" col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12"
                      key={index}
                    >
                      <div
                        className="item ifa-item item-tintuc-home card mb-20"

                      >
                        <a href={'/news?p=' + item.id}>
                          <div
                            className="img"
                            style={{
                              borderTopLeftRadius: 5,
                              borderTopRightRadius: 5,
                              height: 200,
                              backgroundImage: `url(${NEWS_PATH + item.id + '.webp?' + Math.random()
                                })`,
                              backgroundSize: 'cover',
                              backgroundRepeat: 'no-repeat',
                            }}
                          ></div>
                          <div className="content">
                            <div className="status-wrapper">
                              {/* <span className="pos">Đã đăng | </span> */}
                              {/* <span className="status live">
                                {momentTime(item.created_at)}
                              </span> */}
                            </div>
                            <div className="title t-cap">
                              <Paragraph ellipsis={{ rows: 3 }}>
                                {item.title}
                              </Paragraph>
                            </div>
                            <div className="description">{item.s_des}</div>
                          </div>
                        </a>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="btn-dang-ky-tu-van-block">
                <a href="/news" className="btn-dang-ky-tu-van">
                  Xem tất cả
                </a>
              </div>
            </div>
          </div>
          {/* <div className="ifa-partner-block ifa-block-content container">
            <p className="top-small-text">Đối tác của CP Learning Center</p>
            <p className="top-lg-text" style={{ marginBottom: 50 }}>
              200+ công ty và doanh nghiệp danh tiếng
            </p>
            <InfiniteCarousel
              scrollOnDevice={true}
              breakpoints={[
                {
                  breakpoint: 500,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                  },
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                  },
                },
              ]}
              dots={false}
              showSides={true}
              sidesOpacity={1}
              sideSize={0.1}
              slidesToScroll={1}
              slidesToShow={6}
              scrollOnDevice={true}
              autoCycle={true}
              pauseOnHover={true}
              cycleInterval={2000}
              animationDuration={1000}
            >
              {[...Array(partnerIcons)].map(
                (item, index) =>
                  index > 0 && (
                    <div key={index}>
                      <img
                        style={{ width: 120 }}
                        src={
                          process.env.PUBLIC_URL +
                          '/assets/img/web/home/' +
                          index +
                          '.jpg'
                        }
                        alt="video"
                      />
                    </div>
                  )
              )}
            </InfiniteCarousel>
          </div> */}
        </div>
      </div>

      <Modal show={show} onHide={handleClose} className="ifa-modal">
        <Modal.Body>
          <button
            className="ifa-popup-close-btn"
            onClick={handleClose}
            style={{ backgroundImage: `url(${wrong})` }}
          ></button>
          <div className="form-page">
            <div className="form-wrapper">
              <p className="title">Nhận tư vấn dịch vụ đào tạo từ CP Learning Center</p>
              <p className="sub-title">
                Chúng tôi sẵn sàng tư vấn, hoàn toàn miễn phí
              </p>
              {_err && (
                <Alert
                  message="Vui lòng nhập đầy đủ thông tin"
                  type="error"
                  showIcon
                />
              )}
              <form onSubmit={submitConsulting}>
                <div className="ifa-form-control">
                  <p className="label">Tên công ty</p>
                  <div className="input-group">
                    <input {...companyName} placeholder="Nhập tên công ty" />
                  </div>
                </div>
                <div className="ifa-form-control">
                  <p className="label">Họ tên*</p>
                  <div className="input-group">
                    <input {...name} placeholder="Nhập họ và tên" />
                  </div>
                </div>
                <div className="ifa-form-control">
                  <p className="label">Số điện thoại*</p>
                  <div className="input-group">
                    <input {...phone} placeholder="Nhập số điện thoại" />
                  </div>
                </div>
                <div className="ifa-form-control">
                  <p className="label">Email*</p>
                  <div className="input-group">
                    <input {...email} placeholder="Nhập email của bạn" />
                  </div>
                </div>
                <div className="ifa-form-control ifa-form-control-no-title">
                  <div className="input-group">
                    <textarea placeholder="Nội dung cần tư vấn" {...content} />
                  </div>
                </div>
                <div className="ifa-submit-btn">
                  <input type="submit" value="Gửi thông tin" />
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <UserFooterLayout />
    </>
  )
}

export default MainPage
