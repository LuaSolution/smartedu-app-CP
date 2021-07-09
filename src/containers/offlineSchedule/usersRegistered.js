import React, { useState, useEffect } from 'react'
import axios from 'helpers/axios'
import {
  Spin
} from 'antd'
import {
  Row,
  Button,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Collapse,
  Card,
  Badge
} from 'reactstrap'
import { Colxx, Separator } from 'components/common/CustomBootstrap'
import Pagination from 'containers/pages/Pagination'
import { NavLink } from 'react-router-dom'
import { genderColor, GENDER, IMG_ERROR, AVATAR_PATH } from 'defines'
import { NoData } from 'atoms'
import { connect } from 'react-redux'

const orderOptions = [
  { column: 'name', label: 'Tên người dùng' },
  { column: 'id-desc', label: 'Ngày tạo mới nhất' },
  { column: 'id-asc', label: 'Ngày tạo cũ nhất' },
]
const pageSizes = [4, 8, 12, 20]

const SubUserList = ({ id }) => {
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPageSize, setSelectedPageSize] = useState(8)
  const [selectedOrderOption, setSelectedOrderOption] = useState({ column: 'id', label: 'Ngày tạo' })

  const [totalItemCount, setTotalItemCount] = useState(0)
  const [totalPage, setTotalPage] = useState(1)
  const [search, setSearch] = useState('')
  const [selectedItems, setSelectedItems] = useState([])
  const [items, setItems] = useState([])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedPageSize, selectedOrderOption])

  useEffect(() => {
    const fetchData = () => {
      let params = {
        id: id,
        pageSize: selectedPageSize,
        currentPage,
        orderBy: selectedOrderOption.column,
        search
      }

      setLoading(true)
      axios
        .get('admin/offline-schedules/users-registered', {
          params: params
        })
        .then(res => {
          return res.data
        })
        .then(data => {
          if (data.status === 200) {
            setTotalPage(Math.ceil(data.totalItem / selectedPageSize))
            setItems(data.data)
            setSelectedItems([])
            setTotalItemCount(data.totalItem)
          }
        })
        .finally(() => setLoading(false))
    }
    fetchData()
  }, [selectedPageSize, currentPage, selectedOrderOption, search, id])

  const startIndex = (currentPage - 1) * selectedPageSize
  const endIndex = currentPage * selectedPageSize

  return <Spin spinning={loading}>
    <div className="disable-text-selection">
      <ListPageHeading
        hideViewType={true}
        heading="survey.questions"
        changeOrderBy={column => setSelectedOrderOption(orderOptions.find(x => x.column === column))}
        changePageSize={setSelectedPageSize}
        selectedPageSize={selectedPageSize}
        totalItemCount={totalItemCount}
        selectedOrderOption={selectedOrderOption}
        startIndex={startIndex}
        endIndex={endIndex}
        selectedItemsLength={selectedItems ? selectedItems.length : 0}
        itemsLength={items ? items.length : 0}
        onSearchKey={e => e.key === 'Enter' && setSearch(e.target.value.toLowerCase())}
        orderOptions={orderOptions}
        pageSizes={pageSizes}
      />
      <Row>
        {items.length > 0 ? items.map(user =>
          <Colxx xxs="12" key={user.id} className="mb-3">
            <Card className='d-flex flex-row' >
              <NavLink to={`/app/users/list?p=${user.id}`} className="d-flex" target='_blank'>
                <img src={AVATAR_PATH + user.id + '.webp?' + Math.random()}
                  className="list-thumbnail responsive border-0 card-img-left"
                  onError={e => {
                    e.target.onerror = null
                    e.target.src = IMG_ERROR
                  }}
                />
              </NavLink>
              <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                  <NavLink to={`/app/users/list?p=${user.id}`} className="w-40 w-sm-100" target='_blank' >
                    <p className="list-item-heading mb-1 truncate">
                      {user.first_name + ' ' + user.last_name}
                      {' '}
                      <Badge color={genderColor[user.gender || 0]} pill style={{ fontSize: 10 }}>
                        {GENDER[user.gender || 0]}
                      </Badge>
                    </p>
                  </NavLink>
                  <p className="mb-1 text-muted text-medium w-25 w-sm-100">
                    {user.username}
                  </p>
                </div>
              </div>
            </Card>
          </Colxx>)
          :
          <NoData title='Không có người dùng' />
        }
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          onChangePage={setCurrentPage}
        />
      </Row>
    </div>
  </Spin>
}

const mapStateToProps = ({ courses }) => {
  const { courseInfo } = courses
  return { courseInfo }
}
export default connect(mapStateToProps, null)(React.memo(SubUserList))

const ListPageHeading = ({
  changeOrderBy,
  changePageSize,
  selectedPageSize,
  totalItemCount,
  selectedOrderOption,
  startIndex,
  endIndex,
  onSearchKey,
  orderOptions,
  pageSizes,
}) => {
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false)

  return <Row>
    <Colxx xxs="12">
      <div className="mb-2">
        <Button
          color="empty"
          className="pt-0 pl-0 d-inline-block d-md-none"
          onClick={() => setDisplayOptionsIsOpen(!displayOptionsIsOpen)}>
          Tùy chọn hiển thị
            <i className="simple-icon-arrow-down align-middle" />
        </Button>
        <Collapse
          isOpen={displayOptionsIsOpen}
          className="d-md-block"
          id="displayOptions">
          <div className="d-block d-md-inline-block pt-1">
            <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
              <DropdownToggle caret color="outline-dark" size="xs">
                Sắp xếp theo{' '}
                {selectedOrderOption.label}
              </DropdownToggle>
              <DropdownMenu>
                {orderOptions.map((order, index) => <DropdownItem
                  key={index}
                  onClick={() => changeOrderBy(order.column)}  >
                  {order.label}
                </DropdownItem>)}
              </DropdownMenu>
            </UncontrolledDropdown>
            <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
              <input
                type="text"
                name="keyword"
                id="search"
                placeholder='Tìm kiếm'
                onKeyPress={onSearchKey}
              />
            </div>
          </div>
          {endIndex
            && totalItemCount
            && selectedPageSize
            && pageSizes
            && changePageSize
            ? <div className="float-md-right pt-1">
              <span className="text-muted text-small mr-1">
                {`${startIndex}-${endIndex} of ${totalItemCount} `}
              </span>
              <UncontrolledDropdown className="d-inline-block">
                <DropdownToggle caret color="outline-dark" size="xs">
                  {selectedPageSize}
                </DropdownToggle>
                <DropdownMenu right>
                  {pageSizes.map((size, index) =>
                    <DropdownItem key={index} onClick={() => changePageSize(size)}>
                      {size}
                    </DropdownItem>
                  )}
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
            : null
          }
        </Collapse>
      </div>
      <Separator className="mb-5" />
    </Colxx>
  </Row>
}