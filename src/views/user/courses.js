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
import renderEmpty from 'antd/lib/config-provider/renderEmpty'

const rand = Math.random()

const CoursesPage = () => {
  const [loading, setLoading] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const [data, setData] = useState([])
  const [orderBy, setOrderBy] = useState('asc')
  const [search, setSearch] = useState('')
  const [cgSelected, setCGSelected] = useState([])
  const [courseGroups, setCourseGroups] = useState([])
  const [objective, setObjective] = useState([
    { id: 1, name: 'Tất cả mọi người' },
    { id: 2, name: 'Staff' },
    { id: 3, name: 'DM/SM' },
    { id: 4, name: 'AVP/GM' },
    { id: 5, name: 'AVP/VP' },
  ])

  useEffect(() => {
    fetchCourseGroup()
    fetchData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchData(true)
  }, [cgSelected, orderBy, search]) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchCourseGroup = () => {
    axios.get('admin/course-groups/all').then((res) => {
      setCourseGroups(res.data)
    })
  }

  const fetchData = (reset = false) => {
    setLoading(true)
    axios
      .post(
        `courses/public-courses/paging-by-filter/${reset ? 0 : data.length}`,
        {
          course_groups: cgSelected,
          order_by: orderBy,
          search,
        }
      )
      .then((res) => {
        if (res.data.status === 200) {
          if (reset) {
            setData(res.data.data)
          } else {
            setData([...data, ...res.data.data])
          }
        }
      })
      .finally(() => setLoading(false))
  }

  const renderFilter = () => {
    return (
      <>
        <div className="box-filter-linh-vuc-left-expert box-fixed-expert col-lg-3 col-xl-3 col-md-6">
          <div className="title-linh-vuc">Danh mục khóa học</div>
          <div className="list-linh-vuc-filter">
            {courseGroups &&
              courseGroups.map((item, index) => {
                return (
                  <div className="input-check-box-filter" key={index}>
                    <input
                      type="checkbox"
                      className="input-checkbox-filter"
                      onChange={(e) => {
                        if (e.target.checked) {
                          //checked
                          setCGSelected([...cgSelected, item.id])
                        } else {
                          //unchecked
                          const _cgSelected = cgSelected.filter(
                            (i) => i !== item.id
                          )
                          setCGSelected([..._cgSelected])
                        }
                      }}
                      checked={cgSelected.includes(item.id)}
                    />
                    <label htmlFor="checkbox-1" className="label-input-check">
                      {item.name}
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
                    <label htmlFor="checkbox-1" className="label-input-check">
                      {item.name}
                    </label>
                  </div>
                )
              })}
          </div>
        </div>
      </>
    )
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
              {renderFilter()}
            </div>
          </div>
        </div>
      </Drawer>
      <div className="box-course container">
        <div className="box-course-container box-expert-user  ">
          <div className="box-filter">{renderFilter()}</div>
          <div className="box-list-chuyen-gia col-lg-9 col-xl-9 col-md-12 col-12">
            <div className="box-select-filter-price ">
              <div className="row-header-filter">
                <div className="box-input-search-name">
                  <input
                    placeholder="Tìm tên khóa học"
                    className="input-search-name"
                    id="search-box"
                    onKeyDown={(e) => {
                      if (e.key == 'Enter' && !e.shiftKey) {
                        setSearch(document.getElementById('search-box').value)
                      }
                    }}
                  />
                  <div className="icon-search">
                    <SearchOutlined />
                  </div>
                </div>
                <div className="box-select-filter-price">
                  <select
                    className="select-option-filter"
                    onChange={(e) => {
                      setOrderBy(e.target.value)
                    }}
                  >
                    <option value="asc">Từ A - Z</option>
                    <option value="desc">Từ Z- A</option>
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
                              src={`COURSES_PATH${item.id}.webp?${rand}`}
                              alt=""
                            />
                          </div>
                          <div
                            className="title-course"
                            onClick={() => {
                              window.open(
                                `/course-details/${item.slug}`,
                                '_blank'
                              )
                            }}
                          >
                            {item.title}
                          </div>
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
                            <span>{`#${
                              item.tags ? item.tags : 'NoTags'
                            }`}</span>
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
            {data.length > 0 && (
              <div className="btn-load-more-expert">
                <button
                  type="button"
                  className="btn-readmore"
                  onClick={fetchData}
                >
                  Xem thêm
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <UserFooterLayout />
    </>
  )
}

export default React.memo(CoursesPage)
