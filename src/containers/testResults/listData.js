import React from 'react'
import Pagination from 'containers/pages/Pagination'
import { Row, Card, Badge } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import { ContextMenuTrigger } from 'react-contextmenu'
import { Colxx } from 'components/common/CustomBootstrap'
import { Tooltip } from 'antd'

const collect = props => { return { data: props.data } }

const TestResults = ({
  items,
  currentPage,
  totalPage,
  onChangePage,
}) => <Row>
    {items.map((item, index) => <Colxx xxs="12" className="mb-3" key={index}>
      <ContextMenuTrigger id="menu_id" data={item.id} collect={collect}>
        <Card
          className='d-flex flex-row' >
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink to={`?course_id=${item.course_id}&user_id=${item.user_id}&lecture_id=${item.id}`} className="w-80 w-sm-100">
                <p className="list-item-heading mb-2 truncate">
                  <b>Bài kiểm tra: </b><Tooltip title={item.name} color={'#2db7f5'}>
                    {item.name}
                  </Tooltip>
                </p>
                <p className="list-item-heading mb-2 truncate">
                  <b>{item.title}</b>
                </p>
                <p className="list-item-heading mb-2 truncate">
                  <b>Người làm bài: </b>
                  {item.first_name + ' ' + item.last_name + ' - ' + item.partner + ' - ' + item.department}
                </p>
              </NavLink>
              {item.result ? <Badge color='info' pill style={{ fontSize: 10 }}>
                Đã chấm điểm
                    </Badge> :
                <Badge color='danger' pill style={{ fontSize: 10 }}>
                  Chưa chấm bài
                  </Badge>}
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
  </Row>

export default React.memo(TestResults)
