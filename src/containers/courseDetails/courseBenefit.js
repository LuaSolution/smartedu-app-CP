import React, { useEffect, useState } from 'react'
import { Skeleton } from 'antd'
import { initCourseBenefits } from 'redux/actions'
import { connect } from 'react-redux'
import { CourseDetailsLearnWhat as LearnWhat } from 'atoms'
import axios from 'helpers/axios'

const CourseBenefit = ({ courseId, courseBenefits, initCourseBenefits }) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios
      .get('admin/courses/benefits/paging/' + courseId)
      .then((res) => {
        return res.data
      })
      .then((data) => {
        initCourseBenefits(data)
      })
      .finally(() => setLoading(false))
  }, [courseId]) // eslint-disable-line react-hooks/exhaustive-deps

  return <LearnWhat id="intro" className="course-details-content">
    <div className="details-block-title">
      <p>Bạn sẽ học được gì ?</p>
    </div>
    {loading ? <Skeleton active /> : <div className="list-learn-what">{courseBenefits.map((item, index) => <div key={index}>{item.name}</div>)}</div>}
  </LearnWhat>
}

const mapStateToProps = ({ courses }) => {
  const { courseBenefits } = courses
  return { courseBenefits }
}

const mapActionsToProps = {
  initCourseBenefits
}

export default connect(mapStateToProps, mapActionsToProps)(CourseBenefit)