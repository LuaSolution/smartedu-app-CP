import React, { useState, useEffect } from 'react'
import axios from 'helpers/axios'
import ListPageHeading from 'containers/ListPageHeading'
import AddNewModal from 'containers/users/addAndEdit'
import UserList from 'containers/users'
import { Spin, message, Drawer } from 'antd'
import { Button } from 'reactstrap'
import UploadByExcel from './usersExcel'

const getIndex = (value, arr, prop) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][prop] === value) {
      return i
    }
  }
  return -1
}

const orderOptions = [
  { column: 'name', label: 'Tên người dùng' },
  { column: 'id-desc', label: 'Ngày tạo mới nhất' },
  { column: 'id-asc', label: 'Ngày tạo cũ nhất' },
]
const pageSizes = [4, 8, 12, 20]

const UsersPages = ({ match, ...props }) => {
  const [loading, setLoading] = useState(false)
  const [displayMode, setDisplayMode] = useState('thumblist')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPageSize, setSelectedPageSize] = useState(8)
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: 'id',
    label: 'Ngày tạo',
  })

  const [modalOpen, setModalOpen] = useState(false)
  const [modalExcelUpload, setModalExcelUpload] = useState(false)
  const [addNewFlag, setAddNewFlag] = useState(false)
  const [editId, setEditId] = useState(null)
  const [totalItemCount, setTotalItemCount] = useState(0)
  const [totalPage, setTotalPage] = useState(1)
  const [search, setSearch] = useState('')
  const [selectedItems, setSelectedItems] = useState([])
  const [items, setItems] = useState([])
  const [lastChecked, setLastChecked] = useState(null)

  useEffect(() => {
    const editId = new URLSearchParams(props.location.search).get('p')
    if (editId) {
      setEditId(editId)
      setModalOpen(true)
    } else {
      setEditId(null)
    }
  }, [props.location.search])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedPageSize, selectedOrderOption])

  useEffect(() => {
    const fetchData = () => {
      setLoading(true)
      axios
        .get('admin/user/paging', {
          params: {
            pageSize: selectedPageSize,
            currentPage,
            orderBy: selectedOrderOption.column,
            search,
          },
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
      selectedItems.push(
        ...newItems.map(item => {
          return item.id
        })
      )
      selectedList = Array.from(new Set(selectedItems))
      setSelectedItems(selectedList)
    }
    document.activeElement.blur()
    return false
  }

  const removeSelected = () => {
    const _selectedItems = selectedItems.filter(
      user => user !== JSON.parse(localStorage.getItem('@current_user')).id
    )
    setSelectedItems(_selectedItems)
    axios
      .post('admin/user/delete', {
        selected: _selectedItems
      })
      .then(res => {
        const newItems = items.filter(i => !selectedItems.some(j => i.id === j))
        setItems(newItems)
        message.success('Xóa người dùng thành công')
      })
      .catch(error => {
        message.error('Xóa người dùng thất bại')
        return error.message
      })

  }

  const handleChangeSelectAll = (isToggle) => {
    if (selectedItems.length >= items.length) {
      if (isToggle) {
        setSelectedItems([])
      }
    } else {
      setSelectedItems(items.map(x => x.id))
    }
    document.activeElement.blur()
    return false
  }

  const onContextMenuClick = (e, data) => {
    if (data.action === 'delete') {
      removeSelected()
    } else if (data.action === 'edit') {
      props.history.push('/app/users/list?p=' + selectedItems[0])
    }
  }

  const onContextMenu = (e, data) => {
    const clickedProductId = data.data
    if (!selectedItems.includes(clickedProductId)) {
      setSelectedItems([clickedProductId])
    }
    return true
  }

  const toggleModal = () => {
    if (modalOpen) {
      props.history.push('/app/users/list')
    }
    setAddNewFlag(!modalOpen)
    setModalOpen(!modalOpen)
  }

  const toggleModalExcelUpload = () => {
    setModalExcelUpload(!modalExcelUpload)
  }

  const appendNew = (user) => {
    setTotalItemCount(totalItemCount + 1)
    setTotalPage(Math.ceil(totalItemCount / selectedPageSize))
    setItems([user, ...items])
  }

  const editUser = item => {
    const newItems = [...items]
    var foundIndex = newItems.findIndex(x => parseInt(x.id) === parseInt(item.id))
    newItems[foundIndex] = item
    setItems(newItems)
  }

  return <Spin spinning={loading} tip="Loading...">
    <div className="disable-text-selection">
      <ListPageHeading
        heading="managers.users"
        displayMode={displayMode}
        changeDisplayMode={setDisplayMode}
        handleChangeSelectAll={handleChangeSelectAll}
        changeOrderBy={column => { setSelectedOrderOption(orderOptions.find(x => x.column === column)) }}
        changePageSize={setSelectedPageSize}
        selectedPageSize={selectedPageSize}
        totalItemCount={totalItemCount}
        selectedOrderOption={selectedOrderOption}
        match={match}
        startIndex={(currentPage - 1) * selectedPageSize}
        endIndex={currentPage * selectedPageSize}
        selectedItemsLength={selectedItems ? selectedItems.length : 0}
        itemsLength={items ? items.length : 0}
        onSearchKey={e => {
          if (e.key === 'Enter') {
            setSearch(e.target.value.toLowerCase())
          }
        }}
        removeSelected={removeSelected}
        orderOptions={orderOptions}
        pageSizes={pageSizes}
        toggleModal={toggleModal}
        customButton={<Button
          color="warning"
          size="lg"
          className="top-right-button"
          onClick={toggleModalExcelUpload} >
          THÊM TỪ FILE
      </Button>}
      />
      <AddNewModal
        modalOpen={modalOpen}
        toggleModal={toggleModal}
        editId={editId}
        addNewFlag={addNewFlag}
        addNew={appendNew}
        editUser={editUser}
      />
      <Drawer
        width='100%'
        title='Thêm người dùng từ Excel'
        closable={true}
        onClose={toggleModalExcelUpload}
        visible={modalExcelUpload}
      >
        <UploadByExcel />
      </Drawer>
      <UserList
        items={items}
        displayMode={displayMode}
        selectedItems={selectedItems}
        onCheckItem={onCheckItem}
        currentPage={currentPage}
        totalPage={totalPage}
        onContextMenuClick={onContextMenuClick}
        onContextMenu={onContextMenu}
        onChangePage={setCurrentPage}
      />
    </div>
  </Spin>

}

export default UsersPages
