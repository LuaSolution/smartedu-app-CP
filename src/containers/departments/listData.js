import React from 'react'
import Pagination from 'containers/pages/Pagination'
import ContextMenuContainer from 'containers/pages/ContextMenuContainer'
import { Row, Card, CustomInput } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import classnames from 'classnames'
import { ContextMenuTrigger } from 'react-contextmenu'
import { Colxx } from 'components/common/CustomBootstrap'
import { Tooltip } from 'antd'

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
}) => <Row>
    {items.map((item, index) => <Colxx xxs="12" className="mb-3" key={index}>
      <ContextMenuTrigger id="menu_id" data={item.id} collect={collect}>
        <Card
          onClick={event => onCheckItem(event, item.id)}
          className={classnames('d-flex flex-row', {
            active: selectedItems.includes(item.id),
          })}
        >
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <Tooltip title={item.name}>
                <NavLink to={`?p=${item.id}`} className="w-80 w-sm-100">
                  <p className="list-item-heading mb-2 truncate">
                    {item.name}
                  </p>
                  {item.slug && <>({item.slug})</>}
                </NavLink>
              </Tooltip>
            </div>
            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
              <CustomInput
                className="item-check mb-0"
                type="checkbox"
                id={`check_${item.id}`}
                checked={selectedItems.includes(item.id) || false}
                onChange={() => { }}
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
      onChangePage={onChangePage}
    />
    <ContextMenuContainer
      onContextMenuClick={onContextMenuClick}
      onContextMenu={onContextMenu}
    />
  </Row >

export default React.memo(ListData)
