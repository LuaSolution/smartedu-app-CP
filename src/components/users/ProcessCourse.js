import React from 'react'
import { Badge, Typography, Tooltip, Progress } from 'antd'
import 'assets/user/ifa-process-course.css'
import { COURSES_PATH } from 'defines'
import { Avatar } from 'atoms'

const { Paragraph } = Typography

export default React.memo(({ item }) => (
  <div className="ifa-item process-item">
    <a href={'/course-details/' + item.slug} className="process-item-link">
      <Badge.Ribbon
        text="Có lớp offline"
        color="#F88417"
        style={item.is_offline ? { display: 'block' } : { display: 'none' }}
      >
        <div className="img-block">
          <Avatar
            src={COURSES_PATH + item.id + '.webp?' + Math.random()}
            height={203}
            style={{ width: '100%' }}
            borderRadius={'5px 5px 0 0'}
          />
        </div>
      </Badge.Ribbon>
      <div className="process-item-title">
        <Tooltip title={item.title}>
          <Paragraph ellipsis={{ rows: 3 }}>{item.title}</Paragraph>
        </Tooltip>
      </div>
      <div className="process-bar">
        <Progress
          size="default"
          percent={Math.round((item.process / item.total_lectures) * 100) || 0}
        />
      </div>
    </a>
  </div>
))
