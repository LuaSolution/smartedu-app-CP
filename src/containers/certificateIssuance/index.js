import React from 'react'
import { Row } from 'reactstrap'
import Pagination from 'containers/pages/Pagination'
import ImageListView from './imageView'
import ThumbListView from './thumbView'

const collect = props => { return { data: props.data } }

const UserList = ({
  items,
  displayMode,
  selectedItems,
  onCheckItem,
  currentPage,
  totalPage,
  onChangePage,
}) => {
  return <Row>
    {items.map(user => {
      return displayMode === 'imagelist' ? <ImageListView
        key={user.id}
        user={user}
        isSelect={selectedItems.includes(user.id)}
        collect={collect}
        onCheckItem={onCheckItem}
      /> :
        <ThumbListView
          key={user.id}
          user={user}
          isSelect={selectedItems.includes(user.id)}
          collect={collect}
          onCheckItem={onCheckItem}
        />
    })}
    <Pagination
      currentPage={currentPage}
      totalPage={totalPage}
      onChangePage={onChangePage}
    />
  </Row>
}

export default React.memo(UserList)