import React, { useEffect, useState } from 'react'
import UserHeaderLayout from 'components/users/UserHeaderLayout'
import UserFooterLayout from 'components/users/UserFooterLayout'
import CourseCard from 'components/processCourseCard'
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap'
import search from 'atoms/course-list/search.svg'
import sliders from 'atoms/course-list/sliders.svg'
import axios from 'helpers/axios'
import 'assets/user/ifa-course-list.css'
import { Spin } from 'antd'
import { NoData } from 'atoms'
import 'assets/user/ifa-course-list.css'

const WishListPage = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {
    fetchData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = () => {
    setLoading(true)
    axios
      .get('courses/public-courses/paging/' + data.length)
      .then((res) => {
        if (res.data.status === 200) {
          setData([...data, ...res.data.data])
        }
      })
      .finally(() => setLoading(false))
  }

  return (
    <>
      <UserHeaderLayout />
      <div className="list-course-content">
        <Spin spinning={loading} size="large">
          <div className="list-course-wrapper">
            <div className="list-course-filter-wrapper">
              <form className="search-form">
                <div className="course-name-wrapper">
                  <input
                    type="text"
                    className="course-name"
                    placeholder="Tìm theo tên khóa học"
                    style={{ backgroundImage: `url(${search})` }}
                  />
                </div>
                <UncontrolledDropdown>
                  <DropdownToggle
                    caret
                    style={{ backgroundImage: `url(${sliders})` }}
                  >
                    Sắp xếp từ A-Z
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Tiến trình hoàn thành tăng</DropdownItem>
                    <DropdownItem>Tiến trình hoàn thành giảm</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </form>
            </div>
            <div className="col-12">
              <div
                className="row ifa-course-list-content"
                style={{ marginRight: -30, marginLeft: 0 }}
              >
                {data.length > 0 ? (
                  data.map((item, index) => (
                    <CourseCard key={index} item={item} />
                  ))
                ) : (
                  <div style={{ width: '100%' }}>
                    <NoData />
                  </div>
                )}
              </div>
            </div>
            {data.length > 0 && (
              <div className="btn-load-more-expert">
                <button onClick={fetchData}>Xem thêm</button>
              </div>
            )}
          </div>
        </Spin>
      </div>

      <UserFooterLayout />
    </>
  )
}

export default React.memo(WishListPage)
