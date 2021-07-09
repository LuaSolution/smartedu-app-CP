import React, { useEffect, useState } from 'react'
import UserTopLayout from 'components/users/UserTopLayout'
import axios from 'helpers/axios'
import { Spin } from 'antd'
import { NoData } from 'atoms'
import CourseCard from 'components/processCourseCard'
import 'assets/user/ifa-course-list.css'

const pageSize = 8
const _user = JSON.parse(localStorage.getItem('@current_user'))

const MyCourseList = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {
    fetchData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = () => {
    setLoading(true)
    axios
      .get('courses/my-courses/paging/' + Math.ceil(data.length / pageSize) + '/' + _user.id)
      .then(res => {
        if (res.data.status === 200) {
          setData(res.data.data)
        }
      })
      .finally(() => setLoading(false))
  }

  return <div className="list-course-content">
    <Spin spinning={loading} size='large'>
      {data.length > 0 ? <>
        <div className="col-12" style={{ margin: 10 }}>
          <div className="row ifa-course-list-content">
            {data.map((item, index) => <CourseCard item={item} key={index} />)}
          </div>
        </div>
        <div className='btn-load-more-expert'>
          <button onClick={fetchData}>Xem thêm</button>
        </div>
      </>
        :
        <div className="col-12" >
          <NoData />
        </div>}
      <br />
    </Spin>
  </div>
}

export default React.memo(MyCourseList)
