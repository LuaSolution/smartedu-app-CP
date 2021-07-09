import React, { useState, useEffect } from 'react'
import axios from 'helpers/axios'
import {
  Spin,
  Tooltip,
  Typography,
  message
} from 'antd'
import {
  Row,
  Button,
  ButtonDropdown,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  CustomInput,
  Collapse,
  Card
} from 'reactstrap'
import { Colxx, Separator } from 'components/common/CustomBootstrap'
import Pagination from 'containers/pages/Pagination'
import classnames from 'classnames'
import {
  ContextMenuTrigger,
  ContextMenu,
  MenuItem
} from 'react-contextmenu'
import momentTime from 'helpers/moment'
import surveyType from 'helpers/surveyType'

const { Text } = Typography

const collect = props => { return { data: props.data } }

const getIndex = (value, arr, prop) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][prop] === value) {
      return i
    }
  }
  return -1
}

const orderOptions = [
  { column: 'title-asc', label: 'Tiêu đề câu hỏi (A-Z)' },
  { column: 'title-desc', label: 'Tiêu đề câu hỏi (Z-A)' },
  { column: 'id-desc', label: 'Ngày tạo mới nhất' },
  { column: 'id-asc', label: 'Ngày tạo cũ nhất' },
]
const pageSizes = [4, 8, 12, 20]

const SurveyQuestionsPage = ({ match, questions, setQuestions }) => {
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPageSize, setSelectedPageSize] = useState(8)
  const [selectedOrderOption, setSelectedOrderOption] = useState({ column: 'id', label: 'Ngày tạo' })

  const [totalItemCount, setTotalItemCount] = useState(0)
  const [totalPage, setTotalPage] = useState(1)
  const [search, setSearch] = useState('')
  const [selectedItems, setSelectedItems] = useState([])
  const [items, setItems] = useState([])
  const [lastChecked, setLastChecked] = useState(null)

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedPageSize, selectedOrderOption])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      axios
        .get('admin/surveys/questions/paging', {
          params: {
            pageSize: selectedPageSize,
            currentPage,
            orderBy: selectedOrderOption.column,
            search
          }
        })
        .then(res => {
          return res.data
        })
        .then(data => {
          setTotalPage(Math.ceil(data.totalItem / selectedPageSize))
          setItems(data.data.map((x, index) => { return { ...x, seq: index } }))
          setSelectedItems([])
          setTotalItemCount(data.totalItem)

        })
        .finally(() => setLoading(false))
    }
    fetchData()
  }, [selectedPageSize, currentPage, selectedOrderOption, search])

  const onCheckItem = (event, id) => {
    if (event.target.tagName === 'A' || (event.target.parentElement && event.target.parentElement.tagName === 'A')) {
      return true
    }
    if (lastChecked === null) {
      setLastChecked(id)
    }

    let selectedList = [...selectedItems]
    if (selectedList.includes(id)) {
      selectedList = selectedList.filter(x => x !== id)
    } else {
      selectedList.push(id)
    }
    setSelectedItems(selectedList)

    if (event.shiftKey) {
      let newItems = [...items]
      const start = getIndex(id, newItems, 'id')
      const end = getIndex(lastChecked, newItems, 'id')
      newItems = newItems.slice(Math.min(start, end), Math.max(start, end) + 1)
      selectedItems.push(...newItems.map(item => { return item.id }))
      selectedList = Array.from(new Set(selectedItems))
      setSelectedItems(selectedList)
    }
    document.activeElement.blur()
    return false
  }

  const addSurveyQuestions = () => {
    const filtered = items.filter(el => ~selectedItems.indexOf(el.id))
    setQuestions([...questions, ...filtered])
    message.success('Đã thêm câu hỏi vào danh sách')
  }

  const handleChangeSelectAll = isToggle => {
    if (selectedItems.length >= items.length) {
      isToggle && setSelectedItems([])
    } else {
      setSelectedItems(items.map(x => x.id))
    }
    document.activeElement.blur()
    return false
  }

  const onContextMenuClick = (e, data) => data.action === 'add' && addSurveyQuestions()

  const onContextMenu = (e, data) => {
    const clickedProductId = data.data
    !selectedItems.includes(clickedProductId) && setSelectedItems([clickedProductId])
    return true
  }

  const startIndex = (currentPage - 1) * selectedPageSize
  const endIndex = currentPage * selectedPageSize

  return <Spin spinning={loading}>
    <div className="disable-text-selection">
      <ListPageHeading
        hideViewType={true}
        heading="survey.questions"
        handleChangeSelectAll={handleChangeSelectAll}
        changeOrderBy={column => setSelectedOrderOption(orderOptions.find(x => x.column === column))}
        changePageSize={setSelectedPageSize}
        selectedPageSize={selectedPageSize}
        totalItemCount={totalItemCount}
        selectedOrderOption={selectedOrderOption}
        match={match}
        startIndex={startIndex}
        endIndex={endIndex}
        selectedItemsLength={selectedItems ? selectedItems.length : 0}
        itemsLength={items ? items.length : 0}
        onSearchKey={e => e.key === 'Enter' && setSearch(e.target.value.toLowerCase())}
        removeSelected={addSurveyQuestions}
        orderOptions={orderOptions}
        pageSizes={pageSizes}
      />
      <Row>
        {items.map(item =>
          <Colxx xxs="12" className="mb-3">
            <ContextMenuTrigger id="sub_question_list" data={item.id} collect={collect}>
              <Card onClick={event => onCheckItem(event, item.id)}
                className={classnames('d-flex flex-row', { active: selectedItems.includes(item.id) })}
              >
                <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                  <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                    <p className="list-item-heading mb-1 truncate">
                      <Tooltip title={item.title} color={'#2db7f5'}>
                        {item.title}
                        <br />
                        {surveyType(item.type)}
                      </Tooltip>
                    </p>
                    <div className="text-medium w-10 w-sm-100">
                      <Text code>{momentTime(item.created_at)}</Text>
                    </div>
                  </div>
                  <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                    <CustomInput
                      className="item-check mb-0"
                      type="checkbox"
                      id={`check_${item.id}`}
                      checked={selectedItems.includes(item.id)}
                    />
                  </div>
                </div>
              </Card>
            </ContextMenuTrigger>
          </Colxx>
        )}
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          onChangePage={i => setCurrentPage(i)}
        />
        <ContextMenuContainer
          onContextMenuClick={onContextMenuClick}
          onContextMenu={onContextMenu}
        />
      </Row>
    </div>
  </Spin>
}

export default SurveyQuestionsPage

const ListPageHeading = ({
  handleChangeSelectAll,
  changeOrderBy,
  changePageSize,
  selectedPageSize,
  totalItemCount,
  selectedOrderOption,
  startIndex,
  endIndex,
  selectedItemsLength,
  itemsLength,
  onSearchKey,
  orderOptions,
  pageSizes,
  removeSelected
}) => {
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false)
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false)

  return <Row>
    <Colxx xxs="12">
      <div className="mb-2">
        <div className="text-zero top-right-button-container">
          <ButtonDropdown
            isOpen={dropdownSplitOpen}
            toggle={() => setDropdownSplitOpen(!dropdownSplitOpen)}  >
            <div className="btn btn-primary btn-lg pl-4 pr-0 check-button check-all">
              <Tooltip title="Chọn tất cả">
                <CustomInput
                  className="custom-checkbox mb-0 d-inline-block"
                  type="checkbox"
                  id="checkAll"
                  checked={selectedItemsLength >= itemsLength}
                  onChange={() => handleChangeSelectAll(true)}
                  label={<span
                    className={`custom-control-label ${selectedItemsLength > 0
                      && selectedItemsLength < itemsLength ? 'indeterminate' : ''}`} />} />
              </Tooltip>
            </div>

            <DropdownToggle caret color="primary" className="dropdown-toggle-split btn-lg" />
            <DropdownMenu right>
              <DropdownItem onClick={removeSelected}>
                Thêm vào bảng khảo sát khảo sát
                </DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </div>
      </div>

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
                onKeyPress={e => onSearchKey(e)}
              />
            </div>
          </div>
          {endIndex
            && totalItemCount
            && selectedPageSize
            && pageSizes
            && changePageSize
            ? <div className="float-md-right pt-1">
              <span className="text-muted text-small mr-1">{`${startIndex}-${endIndex} of ${totalItemCount} `}</span>
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

const ContextMenuContainer = ({ onContextMenu, onContextMenuClick }) =>
  <ContextMenu id="sub_question_list" onShow={e => onContextMenu(e, e.detail.data)}>
    <MenuItem onClick={onContextMenuClick} data={{ action: 'add' }}>
      <i className="simple-icon-docs" /><span>Thêm vào bảng khảo sát khảo sát</span>
    </MenuItem>
  </ContextMenu>