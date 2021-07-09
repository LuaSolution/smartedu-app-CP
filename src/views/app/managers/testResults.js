import React, { useState, useEffect } from 'react'
import axios from 'helpers/axios'
import ListPageHeading from 'containers/ListPageHeading'
import AddNewModal from 'containers/testResults/addAndEdit'
import ListData from 'containers/testResults/listData'
import { Spin } from 'antd'
import { errorMessage, successMessage } from 'helpers/globalMessage'

const orderOptions = [
  { column: 'lectures.name-desc', label: 'Tiêu đề (Z-A)' },
  { column: 'lectures.name-asc', label: 'Tiêu đề (A-Z)' },
  { column: 'lectures.id-desc', label: 'Ngày tạo mới nhất' },
  { column: 'lectures.id-asc', label: 'Ngày tạo cũ nhất' },
]
const pageSizes = [4, 8, 12, 20]

const TestResultPage = ({ match, deleteUsers, loading, ...props }) => {
  const [isLoading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPageSize, setSelectedPageSize] = useState(8)
  const [selectedOrderOption, setSelectedOrderOption] = useState({ column: 'id', label: 'Ngày tạo' })

  const [modalOpen, setModalOpen] = useState(false)
  const [addNewFlag, setAddNewFlag] = useState(false)
  const [courseId, setCourseId] = useState(null)
  const [userId, setUserId] = useState(null)
  const [lectureId, setLectureId] = useState(null)
  const [totalItemCount, setTotalItemCount] = useState(0)
  const [totalPage, setTotalPage] = useState(1)
  const [search, setSearch] = useState('')
  const [selectedItems, setSelectedItems] = useState([])
  const [items, setItems] = useState([])

  useEffect(() => {
    const courseId = new URLSearchParams(props.location.search).get("course_id")
    const userId = new URLSearchParams(props.location.search).get("user_id")
    const lectureId = new URLSearchParams(props.location.search).get("lecture_id")

    if (courseId && userId && lectureId) {
      setCourseId(courseId)
      setUserId(userId)
      setLectureId(lectureId)
      setModalOpen(true)
    }
  }, [props.location.search])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedPageSize, selectedOrderOption])

  useEffect(() => {
    const fetchData = () => {
      setLoading(true)
      axios
        .get('admin/test-results/paging', {
          params: {
            pageSize: selectedPageSize,
            currentPage,
            search
          }
        })
        .then(res => {
          return res.data
        })
        .then(data => {
          setTotalPage(Math.ceil(data.totalItem / selectedPageSize))
          setItems(data.data)
          setSelectedItems([])
          setTotalItemCount(data.totalItem)
        })
        .finally(() => setLoading(false))
    }
    fetchData()
  }, [selectedPageSize, currentPage, selectedOrderOption, search])

  const toggleModal = () => {
    if (modalOpen) {
      props.history.push('/app/managers/test-result')
    }
    setAddNewFlag(!modalOpen)
    setModalOpen(!modalOpen)
  }

  const startIndex = (currentPage - 1) * selectedPageSize
  const endIndex = currentPage * selectedPageSize

  return <Spin spinning={isLoading}>
    <div className="disable-text-selection">
      <ListPageHeading
        hideAddMore={true}
        hideViewType={true}
        heading="managers.test-result"
        changeOrderBy={column => {
          setSelectedOrderOption(
            orderOptions.find(x => x.column === column)
          )
        }}
        changePageSize={setSelectedPageSize}
        selectedPageSize={selectedPageSize}
        totalItemCount={totalItemCount}
        selectedOrderOption={selectedOrderOption}
        match={match}
        startIndex={startIndex}
        endIndex={endIndex}
        selectedItemsLength={selectedItems ? selectedItems.length : 0}
        itemsLength={items ? items.length : 0}
        onSearchKey={e => {
          if (e.key === 'Enter') {
            setSearch(e.target.value.toLowerCase())
          }
        }}
        orderOptions={orderOptions}
        pageSizes={pageSizes}
        toggleModal={toggleModal}
      />
      <AddNewModal
        modalOpen={modalOpen}
        toggleModal={toggleModal}
        courseId={courseId}
        userId={userId}
        lectureId={lectureId}
        addNewFlag={addNewFlag}
      />
      <ListData
        items={items}
        selectedItems={selectedItems}
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={setCurrentPage}
      />
    </div>
  </Spin>
}

export default TestResultPage