import React from 'react'
import Pagination from 'containers/pages/Pagination'
import ContextMenuContainer from 'containers/pages/ContextMenuContainer'
import {
  Row,
  Card,
  CustomInput,
  Badge
} from 'reactstrap'
import { NavLink } from 'react-router-dom'
import classnames from 'classnames'
import { ContextMenuTrigger } from 'react-contextmenu'
import { Colxx } from 'components/common/CustomBootstrap'
import momentTime from 'helpers/moment'
import { COURSES_PATH, IMG_ERROR } from 'defines'
import {
  Tooltip,
  Image,
  Rate
} from 'antd'

const collect = props => { return { data: props.data } }

const ListData = ({
  items,
  selectedItems,
  onCheckItem,
  currentPage,
  totalPage,
  onContextMenuClick,
  onContextMenu,
  onChangePage,
}) => {
  return <Row>
    {items.map(item =>
      <Colxx xxs="12" className="mb-3" key={item.id}>
        <ContextMenuTrigger id="menu_id" data={item.id} collect={collect}>
          <Card
            onClick={event => onCheckItem(event, item.id)}
            className={classnames('d-flex flex-row', {
              active: selectedItems.includes(item.id),
            })}
          >
            <Image
              className="list-thumbnail responsive border-0 card-img-left"
              height={120}
              src={COURSES_PATH + item.id + '.webp?' + Math.random()}
              fallback={IMG_ERROR}
            />
            <div className="pl-2 d-flex flex-grow-1 min-width-zero">
              <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                <Tooltip title={item.title}>
                  <NavLink to={`?p=${item.id}`} className="w-80 w-sm-100">
                    {item.title}
                    <br />
                    <div style={{ marginTop: 10 }}>
                      <Badge color={'info'} pill style={{ fontSize: 12 }}>
                        {item.name}
                      </Badge>{' '}
                      <Badge color={item.status === 1 ? 'success' : 'secondary'} pill style={{ fontSize: 12 }}>
                        {item.status === 1 ? 'Đã xuất bản' : 'Nháp'}
                      </Badge>
                    </div>
                  </NavLink>
                </Tooltip>
                <div className="text-medium w-20 w-sm-100">
                  {/* <Badge color={itemColor[item.level]} pill>
                        {question[item.level]}
                      </Badge>{' '} */}
                  <Rate disabled defaultValue={Math.round(item.rating)} />
                  <br />
                  {momentTime(item.created_at)}
                </div>
              </div>
              <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                <CustomInput
                  className="item-check mb-0"
                  type="checkbox"
                  id={`check_${item.id}`}
                  checked={selectedItems.includes(item.id)}
                  onChange={e => { }}
                />
              </div>
            </div>
          </Card>
        </ContextMenuTrigger>
      </Colxx>)}
    <Pagination
      currentPage={currentPage}
      totalPage={totalPage}
      onChangePage={onChangePage}
    />
    <ContextMenuContainer
      onContextMenuClick={onContextMenuClick}
      onContextMenu={onContextMenu}
    />
  </Row>
}

export default React.memo(ListData)
