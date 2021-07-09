import React, { useState, useEffect } from 'react'
import axios from 'helpers/axios'
import { Spin, Tooltip, Progress, Badge } from 'antd'
import { Row, Button, Card } from 'reactstrap'
import { Colxx } from 'components/common/CustomBootstrap'
import classnames from 'classnames'
import { ContextMenuTrigger, ContextMenu, MenuItem } from 'react-contextmenu'

const collect = (props) => {
  return { data: props.data }
}
const pageSize = 8

const SubCourseList = ({
  id,
  setSelectedCourseName,
  issuingCertificates,
  selectedItems,
  setSelectedItems,
}) => {
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    setLoading(true)
    axios
      .get(
        'courses/my-courses/paging/' +
          Math.ceil(items.length / pageSize) +
          '/' +
          id
      )
      .then((res) => {
        if (res.data.status === 200) {
          setItems(res.data.data)
        }
      })
      .finally(() => setLoading(false))
  }

  const onCheckItem = (event, id) => {
    setSelectedItems(id)
    const item = items.filter((i) => i.id === id)
    setSelectedCourseName(item && item[0].title)
  }

  const addSurveyQuestions = () => {
    issuingCertificates(selectedItems)
    setSelectedItems(selectedItems)
  }

  const onContextMenuClick = (e, data) =>
    data.action === 'add' && addSurveyQuestions()

  const onContextMenu = (e, data) => {
    const clickedProductId = data.data
    setSelectedItems(clickedProductId)
    return true
  }

  return (
    <Spin spinning={loading}>
      <div className="disable-text-selection">
        <Row>
          {items.map((item) => (
            <Colxx xxs="12" className="mb-3">
              <ContextMenuTrigger
                id="sub_question_list"
                data={item.id}
                collect={collect}
              >
                <Card
                  onClick={(event) => onCheckItem(event, item.id)}
                  className={classnames('d-flex flex-row', {
                    active: selectedItems === item.id,
                  })}
                >
                  <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                    <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                      <p
                        className="list-item-heading mb-1 truncate"
                        style={{ width: '100%' }}
                      >
                        <Tooltip title={item.title}>{item.title}</Tooltip>
                        <br />
                        <Badge
                          count={
                            item.release_date
                              ? 'Đã cấp chứng chỉ'
                              : 'Chưa cấp chứng chỉ'
                          }
                          style={{
                            backgroundColor: item.release_date
                              ? '#52c41a'
                              : '#ff4d4f',
                          }}
                        />
                        <br />
                        <Progress
                          percent={
                            Math.round(
                              (item.process / item.total_lectures) * 100
                            ) || 0
                          }
                          style={{ width: '80%' }}
                          size="small"
                        />
                      </p>
                    </div>
                  </div>
                </Card>
              </ContextMenuTrigger>
            </Colxx>
          ))}
          <ContextMenuContainer
            onContextMenuClick={onContextMenuClick}
            onContextMenu={onContextMenu}
          />
        </Row>
      </div>
      <Button style={{ margin: '0 auto', display: 'flex' }} onClick={fetchData}>
        Xem thêm
      </Button>
    </Spin>
  )
}

export default SubCourseList

const ContextMenuContainer = ({ onContextMenu, onContextMenuClick }) => (
  <ContextMenu
    id="sub_question_list"
    onShow={(e) => onContextMenu(e, e.detail.data)}
  >
    <MenuItem onClick={onContextMenuClick} data={{ action: 'add' }}>
      <i className="simple-icon-docs" />
      <span>Cấp chứng chỉ</span>
    </MenuItem>
  </ContextMenu>
)
