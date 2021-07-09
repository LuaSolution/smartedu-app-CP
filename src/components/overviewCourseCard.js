import React from 'react'
import { Tooltip, Progress } from 'antd'
import 'assets/user/ifa-course-card.css'
import { COURSES_PATH } from 'defines'
import 'assets/user/courseCard.css'

export default React.memo(({ item }) => {
  return (
    <a
      href={'/course-details/' + item.slug || item.id}
      className="new-course-item"
    >
      <div className="col-1-img-style">
        <img src={COURSES_PATH + item.id + '.webp?' + Math.random()} />
      </div>
      <div className="col-2-content">
        <div className="row-21-name-course">
          <Tooltip title={item.title}>{item.title}</Tooltip>
        </div>
        <div className="row-22">
          <Progress
            size="default"
            percent={
              Math.round((item.process / item.total_lectures) * 100) || 0
            }
          />
        </div>
      </div>
    </a>
  )
})
