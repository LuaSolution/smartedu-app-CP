import React from 'react'
import Pagination from 'containers/pages/Pagination'
import ContextMenuContainer from 'containers/pages/ContextMenuContainer'
import { Row, Card, CustomInput } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import classnames from 'classnames'
import { ContextMenuTrigger } from 'react-contextmenu'
import { Colxx } from 'components/common/CustomBootstrap'
import { Typography, Tooltip, Image } from 'antd'
import momentTime from 'helpers/moment'
import { IMG_ERROR, NEWS_PATH } from 'defines'

const { Text } = Typography

const collect = props => { return { data: props.data } }

const News = ({
  items,
  selectedItems,
  onCheckItem,
  currentPage,
  totalPage,
  onContextMenuClick,
  onContextMenu,
  onChangePage,
}) => {
  return (
    <Row>
      {items.map(item => {
        return (
          <Colxx xxs="12" className="mb-3">
            <ContextMenuTrigger id="menu_id" data={item.id} collect={collect}>
              <Card
                onClick={(event) => onCheckItem(event, item.id)}
                className={classnames('d-flex flex-row', {
                  active: selectedItems.includes(item.id),
                })}
              >
                <Image
                  height={110}
                  className="list-thumbnail responsive border-0 card-img-left"
                  src={NEWS_PATH + item.id + '.webp?' + Math.random()}
                  fallback={IMG_ERROR}
                />
                <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                  <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                    <NavLink to={`?p=${item.id}`} className="w-80 w-sm-100">
                      <p className="list-item-heading mb-1 truncate">
                        <Tooltip title={item.title} color={'#2db7f5'}>
                          {item.title}
                        </Tooltip>
                      </p>
                    </NavLink>
                    <div className="text-medium w-20 w-sm-100">
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
        )
      })}
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
  )
}

export default React.memo(News)
