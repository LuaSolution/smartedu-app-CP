import React from 'react'
import { Row } from 'reactstrap'
import Pagination from 'containers/pages/Pagination'
import ContextMenuContainer from 'containers/pages/ContextMenuContainer'
import { Card, CustomInput, Badge } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import classnames from 'classnames'
import { ContextMenuTrigger } from 'react-contextmenu'
import { Colxx } from 'components/common/CustomBootstrap'
import { badgeColor, question } from 'defines'
import momentTime from 'helpers/moment'

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
  return (
    <Row>
      {items.map(user => {
        return (
          <Colxx xxs="12" className="mb-3" key={user.id}>
            <ContextMenuTrigger id="menu_id" data={user.id} collect={collect}>
              <Card
                onClick={(event) => onCheckItem(event, user.id)}
                className={classnames('d-flex flex-row', {
                  active: selectedItems.includes(user.id),
                })}
              >
                <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                  <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                    <NavLink to={`?p=${user.id}`} className="w-80 w-sm-100">
                      <p className="list-item-heading mb-1 truncate">
                        {user.name}
                      </p>
                    </NavLink>
                    <div className="text-medium w-20 w-sm-100">
                      <Badge color={badgeColor[user.level]} pill>
                        {question[user.level]}
                      </Badge>
                      {' '}
                      {momentTime(user.created_at)}
                    </div>
                  </div>
                  <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                    <CustomInput
                      className="item-check mb-0"
                      type="checkbox"
                      id={`check_${user.id}`}
                      checked={selectedItems.includes(user.id)}
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

export default React.memo(ListData)
