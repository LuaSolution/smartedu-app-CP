import React, { useEffect, useState } from 'react'
import { Skeleton } from 'antd'
import { initCourseChapters } from 'redux/actions'
import { connect } from 'react-redux'
import axios from 'helpers/axios'
import Lesson from 'components/users/Lesson'
import { CourseDetailsCurriculumn as Curriculum } from 'atoms'

const CourseChapters = ({ courseId, courseChapters, initCourseChapters, lCount }) => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (courseId) {
      setLoading(true)
      axios
        .get('admin/courses/chapters/paging/' + courseId)
        .then((res) => {
          return res.data
        })
        .then((data) => {
          initCourseChapters(data)
        })
        .finally(() => setLoading(false))
    }
  }, [courseId]) // eslint-disable-line react-hooks/exhaustive-deps

  return <Curriculum id="curriculum" className="course-details-content">
    {loading ?
      <>
        <div className="details-block-title">
          <p>Nội dung bài học</p>
          {/* <a href="">Mở rộng</a> */}
          <div className="total-lesson">
            <Skeleton.Button active={true} size={'small'} shape={'default'} />
          </div>
        </div>
        <div className="content">
          <Skeleton active />
        </div>
      </>
      :
      <>
        <div className="details-block-title">
          <p>Nội dung bài học</p>
          {/* <a href="">Mở rộng</a> */}
          <div className="total-lesson">
            {lCount} bài giảng
          </div>
        </div>
        <div className="content">
          {courseChapters.map((item, index) => <Lesson
            key={index}
            item={{
              title: item.name,
              list: item.lectures,
              isActive: false
            }} />
          )}
        </div>
      </>
    }
  </Curriculum>
}

const mapStateToProps = ({ courses }) => {
  const { courseChapters } = courses
  return { courseChapters }
}

const mapActionsToProps = {
  initCourseChapters
}

export default connect(mapStateToProps, mapActionsToProps)(CourseChapters)