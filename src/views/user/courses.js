import React, { useEffect, useState } from 'react'
import UserHeaderLayout from 'components/users/UserHeaderLayout'
import UserFooterLayout from 'components/users/UserFooterLayout'
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap'
import { COURSES_PATH } from 'defines'
import {
  SearchOutlined,
  MenuOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons'
import axios from 'helpers/axios'
import { Spin, Rate, Progress, Drawer } from 'antd'
import { NoData } from 'atoms'
import 'assets/user/khoahoc-cp.css'

const rand = Math.random()

const CoursesPage = () => {
  const [loading, setLoading] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const [data, setData] = useState([])
  const [categories, setCategories] = useState([
    { id: 1, title: 'CPF Way Course' },
    { id: 2, title: 'Standard Course' },
    { id: 3, title: '7 Hatbits Cours' },
    { id: 4, title: 'Essensial Skills' },
  ])
  const [objective, setObjective] = useState([
    { id: 1, title: 'Tất cả mọi người' },
    { id: 2, title: 'Staff' },
    { id: 3, title: 'DM/SM' },
    { id: 4, title: 'AVP/GM' },
    { id: 5, title: 'AVP/VP' },
  ])

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
      <div
        className="btn-show-menu-mobile-left"
        onClick={() => setShowFilter(!showFilter)}
      >
        <MenuFoldOutlined />
      </div>
      <Drawer
        width="80%"
        placement={'left'}
        closable={true}
        onClose={() => setShowFilter(false)}
        visible={showFilter}
      >
        <div className="box-course container">
          <div className="box-course-container box-expert-user  ">
            <div className="box-filter" style={{ display: 'block' }}>
              <div className="box-filter-linh-vuc-left-expert box-fixed-expert col-lg-3 col-xl-3 col-md-6">
                <div className="title-linh-vuc">Danh mục khóa học</div>
                <div className="list-linh-vuc-filter">
                  {categories &&
                    categories.map((item, index) => {
                      return (
                        <div className="input-check-box-filter" key={index}>
                          <input
                            type="checkbox"
                            className="input-checkbox-filter"
                            onClick={(e) => {
                              console.log(e.target.checked)
                            }}
                          />
                          <label
                            htmlFor="checkbox-1"
                            className="label-input-check"
                          >
                            {item.title}
                          </label>
                        </div>
                      )
                    })}
                </div>
              </div>
              <div className="box-filter-linh-vuc-left-expert box-fixed-expert col-lg-3 col-xl-3 col-md-6 mt-30 ">
                <div className="title-linh-vuc">Khóa học dành cho</div>
                <div className="list-linh-vuc-filter">
                  {objective &&
                    objective.map((item, index) => {
                      return (
                        <div className="input-check-box-filter" key={index}>
                          <input
                            type="checkbox"
                            className="input-checkbox-filter"
                            onClick={(e) => {
                              console.log(e.target.checked)
                            }}
                          />
                          <label
                            htmlFor="checkbox-1"
                            className="label-input-check"
                          >
                            {item.title}
                          </label>
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
      <div className="box-course container">
        <div className="box-course-container box-expert-user  ">
          <div className="box-filter">
            <div className="box-filter-linh-vuc-left-expert box-fixed-expert col-lg-3 col-xl-3 col-md-6">
              <div className="title-linh-vuc">Danh mục khóa học</div>
              <div className="list-linh-vuc-filter">
                {categories &&
                  categories.map((item, index) => {
                    return (
                      <div className="input-check-box-filter" key={index}>
                        <input
                          type="checkbox"
                          className="input-checkbox-filter"
                          onClick={(e) => {
                            console.log(e.target.checked)
                          }}
                        />
                        <label
                          htmlFor="checkbox-1"
                          className="label-input-check"
                        >
                          {item.title}
                        </label>
                      </div>
                    )
                  })}
              </div>
            </div>
            <div className="box-filter-linh-vuc-left-expert box-fixed-expert col-lg-3 col-xl-3 col-md-6 mt-30 ">
              <div className="title-linh-vuc">Khóa học dành cho</div>
              <div className="list-linh-vuc-filter">
                {objective &&
                  objective.map((item, index) => {
                    return (
                      <div className="input-check-box-filter" key={index}>
                        <input
                          type="checkbox"
                          className="input-checkbox-filter"
                          onClick={(e) => {
                            console.log(e.target.checked)
                          }}
                        />
                        <label
                          htmlFor="checkbox-1"
                          className="label-input-check"
                        >
                          {item.title}
                        </label>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
          <div className="box-list-chuyen-gia col-lg-9 col-xl-9 col-md-12 col-12">
            <div className="box-select-filter-price ">
              <div className="row-header-filter">
                <div className="box-input-search-name">
                  <input
                    placeholder="Tìm tên khóa học"
                    className="input-search-name"
                  />
                  <div className="icon-search">
                    <SearchOutlined />
                  </div>
                </div>
                <div className="box-select-filter-price">
                  <select className="select-option-filter">
                    <option>Sắp xếp</option>
                    <option>Từ A - Z</option>
                    <option>Từ Z- A</option>
                  </select>
                  <label className="icon-filter" htmlFor="select-filter">
                    <MenuOutlined />
                  </label>
                </div>
              </div>
            </div>
            <hr />
            <Spin spinning={loading}>
              <div className="box-list-course">
                {data.length > 0 ? (
                  data.map((item, index) => {
                    return (
                      <div
                        className="col-xl-4 col-lg-4 col-md-6 col-12"
                        key={index}
                      >
                        <div className="course-item card">
                          <div className="imgstyle">
                            <img
                              src={COURSES_PATH + item.id + '.webp?' + rand}
                              alt=""
                            />
                          </div>
                          <div className="title-course">{item.title}</div>
                          <hr />
                          <div className="row-star-process">
                            <div className="star">
                              <Rate
                                defaultValue={item.rating}
                                readOnly
                                style={{ fontSize: 14 }}
                              />
                            </div>
                            <div className="process" style={{ width: '50%' }}>
                              <Progress percent={0} size="small" />
                            </div>
                          </div>
                          <div className="hasgtag">
                            <span>{`#${item.tags}`}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div style={{ width: '100%' }}>
                    <NoData />
                  </div>
                )}
              </div>
            </Spin>
            <div className="btn-load-more-expert">
              <button
                type="button"
                className="btn-readmore"
                onClick={fetchData}
              >
                Xem thêm
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserFooterLayout />
    </>
  )
}

export default React.memo(CoursesPage)
