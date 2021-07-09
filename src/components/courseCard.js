import React from 'react'
import { Badge, Rate, Tooltip, Progress } from 'antd'
import 'assets/user/ifa-course-card.css'
import { COURSES_PATH } from 'defines'
import { toCurrency } from 'helpers/Utils'
import { Avatar } from 'atoms'
import {
  CalendarOutlined,
  TeamOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
import 'assets/user/courseCard.css'

export default React.memo(({ item }) => {
  const renderPrice = () => {
    if (item.old_price > 0) {
      if (item.new_price > 0) {
        return (
          <div className="course-price">
            <div className="old-price">{toCurrency(item.old_price)}</div>
            <div className="new-price">{toCurrency(item.new_price)}</div>
          </div>
        )
      } else {
        return (
          <div className="course-price">
            <div className="new-price">{toCurrency(item.old_price)}</div>
          </div>
        )
      }
    }
    return (
      <div className="course-price">
        <div className="new-price">Được tài trợ</div>
      </div>
    )
  }

  return (
    <a
      href={'/course-details/' + item.slug || item.id}
      className="new-course-item"
    >
      <Badge.Ribbon
        text="Có lớp offline"
        color="#F88417"
        placement="start"
        style={item.is_offline ? { display: 'block' } : { display: 'none' }}
      >
        <div className="col-1-img-style">
          <img src={COURSES_PATH + item.id + '.webp?' + Math.random()} />
        </div>
      </Badge.Ribbon>
      <div className="col-2-content">
        <div className="row-21-name-course">
          <Tooltip title={item.title}>{item.title}</Tooltip>
        </div>
        <div className="row-22">
          <div className="number-student-curriculum">
            <div className="number-student">
              {/* <TeamOutlined />{Math.round(item.rating) || 0} */}
            </div>
            {item.total_lectures && (
              <div className="number-curriculum">
                <FileTextOutlined />
                {item.total_lectures}
              </div>
            )}
          </div>
        </div>
        <div className="row-23">
          <Rate disabled defaultValue={Math.round(item.rating)} />
          {renderPrice()}
        </div>
      </div>
    </a>
  )
})
