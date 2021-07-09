import React from 'react'
import { Badge, Rate, Tooltip } from 'antd'
import 'assets/user/ifa-course-card.css'
import { COURSES_PATH } from 'defines'
import { toCurrency } from 'helpers/Utils'
import { Avatar } from 'atoms'

export default React.memo(({ item }) => {
  const renderPrice = () => {
    if (item.old_price > 0) {
      if (item.new_price > 0) {
        return <div className="price">
          <span className="sell">
            <span className="number">{toCurrency(item.new_price)}</span>
          </span>
          <span className="origin">
            <span className="number">{toCurrency(item.old_price)}</span>
          </span>
        </div>
      } else {
        return <div className="price">
          <span className="sell">
            <span className="number">{toCurrency(item.old_price)}</span>
          </span>
        </div>
      }
    }
    return <div className="price">
      <span className="sell">
        <span className="number">Được tài trợ</span>
      </span>
    </div>
  }

  return <div className="course-item ifa-item" >
    <a href={"/course-details/" + item.slug || item.id} className="course-item-link">
      <Badge.Ribbon text="Có lớp offline" color="#F88417" style={item.is_offline ? { display: 'block' } : { display: 'none' }}>
        <div className="image">
          <Avatar src={COURSES_PATH + item.id + '.webp?' + Math.random()} height={203}
            style={{ width: '100%' }}
            borderRadius={'5px 5px 0 0'} />
        </div>
        <div className="like-icon liked"></div>
      </Badge.Ribbon>
      <div className="like-icon liked"></div>
      <div className="content">
        <p className="course-title">
          <Tooltip title={item.title}>
            {item.title}
          </Tooltip>
        </p>
        <p className="description">{item.s_des}</p>
        {renderPrice()}
        <div className="rate-wrapper" style={{ paddingBottom: 15 }}>
          <Rate disabled defaultValue={Math.round(item.rating)} />
        </div>
      </div>
    </a>
  </div>
})