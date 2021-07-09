import React, { useState, useEffect } from 'react'
import RatingModal from './ratingModal'
import { Skeleton, Space, message, Rate } from 'antd'
import { COURSES_PATH, ROOT } from 'defines'
import {
  CourseDetailsListCourseButton as ListCourseButton,
  CourseDetailsBreadcrumb as Breadcrumbs,
  CourseDetailsBriefTeacher as Teacher,
  CourseDetailsBriefTitle as Title,
  CourseDetailsBriefWrapper as Wrapper,
  CourseDetailsBriefWrapperLeft as BriefWrapperLeft,
  CourseDetailsBriefWrapperRight as BriefWrapperRight,
  CourseDetailsCourseContent as Content,
  CourseDetailsCourseEvalute as CourseEvaluate,
  CourseDetailsBriefTotalRate as TotalStudentRate,
  Avatar
} from 'atoms'
import axios from 'helpers/axios'
import { FacebookFilled, HeartOutlined, StarFilled } from '@ant-design/icons'
import ReactJWPlayer from "react-jw-player"

const rand = Math.random()

const CourseBrief = ({ item, mentorName, loadingInfo }) => {
  const [liked, setLiked] = useState(null)
  const [rated, setRated] = useState(null)

  useEffect(() => {
    setLiked(item.isLiked)
  }, [item.isLiked])

  useEffect(() => {
    setRated(item.isRated)
  }, [item.isRated])

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)

  const handleShow = () => setShow(true)

  const addToWishList = () => {
    axios.get('courses/add-wishlist/' + item.id)
      .then(res => {
        if (res.data.status === 200) {
          message.success('Đã thêm khóa học vào danh sách yêu thích')
          setLiked(1)
        }
      })
  }

  const removeToWishList = () => {
    axios.get('courses/remove-from-wishlist/' + item.id)
      .then(res => {
        if (res.data.status === 200) {
          message.success('Đã xóa khóa học khỏi danh sách yêu thích')
          setLiked(null)
        }
      })
  }

  const wallpaper = (
    <BriefWrapperRight >
      {item.video_path ?
        <ReactJWPlayer
          playerId="jw-player"
          playerScript="https://content.jwplatform.com/libraries/jvJ1Gu3c.js"
          file={ROOT + "storage/app/public/" + item.video_path}
          image={COURSES_PATH + item.id + '.webp'}
        />
        :
        <Avatar src={COURSES_PATH + item.id + '.webp?' + rand} height={280}
          style={{ width: '100%' }} />
      }
    </BriefWrapperRight>)

  return <>
    {loadingInfo ? <Wrapper className="ifa-body-wrapper">
      <div className="ifa-container top">
        <div className="row ifa-block-content">
          <BriefWrapperLeft>
            <Skeleton active />
            <Space>
              <Skeleton.Button active size='large' shape='default' />
              <Skeleton.Button active size='large' shape='default' />
              <Skeleton.Button active size='large' shape='default' />
            </Space>
          </BriefWrapperLeft>
          <BriefWrapperRight>
            <Skeleton.Image style={{ margin: 20, width: window.innerWidth / 4, height: 100 }} />
          </BriefWrapperRight>
        </div>
      </div>
    </Wrapper>
      :
      <Wrapper className="ifa-body-wrapper">
        <div className="ifa-container top">
          <div className="row ifa-block-content container">
            <BriefWrapperLeft>
              <Breadcrumbs>
                {item.breadcrumbs.map((i, index) => (
                  <a key={index} href={i.url}>
                    {i.title}
                  </a>
                ))}
              </Breadcrumbs>
              <Title>
                {item.title}
              </Title>
              <Content>
                {item.content}
              </Content>
              <CourseEvaluate>
                {item && item.rating > 0 ? <Rate defaultValue={Math.round(item.rating)} disabled /> : null}
                <TotalStudentRate>
                  {item && item.totalRate > 0 ? '(' + item.totalRate + ' đánh giá)' : null} {item.totalStudent} người học
                </TotalStudentRate>
              </CourseEvaluate>
              {mentorName && <Teacher>Giảng viên <a href="#teacher" data-id="teacher" >
                <span>{mentorName}</span>
              </a>
              </Teacher>}
              <ListCourseButton className="course-detail-header-t-css">
                {liked === 0 || liked === null ? <a href="#" className="wishlist" onClick={addToWishList}>
                  Yêu thích <HeartOutlined style={{ color: 'red', float: 'right', fontSize: 24, verticalAlign: 'text-bottom' }} />
                </a>
                  :
                  <a href="#" className="wishlist" onClick={removeToWishList}>
                    Bỏ thích <HeartOutlined style={{ color: 'red', float: 'right', fontSize: 24, verticalAlign: 'text-bottom' }} />
                  </a>}
                <a onClick={() => fbShare(window.location.href, 'Fb Share', 'Facebook share popup', 'http://goo.gl/dS52U', 520, 350)}
                  target="_blank">Chia sẻ <FacebookFilled style={{ color: '#3b5998', float: 'right', fontSize: 24, verticalAlign: 'text-bottom' }} /></a>
                {rated && rated.rate === null ? <a href="#" className="rate" onClick={handleShow}>
                  Đánh giá <StarFilled style={{ color: '#fadb14', float: 'right', fontSize: 24, verticalAlign: 'text-bottom' }} />
                </a> : null}
              </ListCourseButton>
            </BriefWrapperLeft>
            {wallpaper}
          </div>
        </div>
      </Wrapper>}
    <RatingModal show={show} handleClose={handleClose} courseId={item.id} setRated={setRated} />
  </>
}

export default CourseBrief

const fbShare = (url, title, descr, image, winWidth, winHeight) => {
  var winTop = (window.screen.height / 2) - (winHeight / 2)
  var winLeft = (window.screen.width / 2) - (winWidth / 2)
  window.open('http://www.facebook.com/sharer.php?s=100&p[title]=' + title + '&p[summary]=' + descr + '&p[url]=' + url + '&p[images][0]=' + image, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight)
}