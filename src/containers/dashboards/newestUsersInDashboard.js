/* eslint-disable react/no-array-index-key */
import React from 'react'
import { NavLink } from 'react-router-dom'
import { Card, CardBody, CardTitle } from 'reactstrap'
import momentTime from 'helpers/moment'
import { AVATAR_PATH, IMG_ERROR } from 'defines'
import { Avatar } from 'atoms'

const randomize = Math.random()

const Tickets = ({ data }) => {
  return <Card style={{ height: '100%' }}>
    <CardBody>
      <CardTitle>
        Người dùng đã tạo gần đây
      </CardTitle>
      {data.map((item, index) =>
        <div
          key={index}
          className="d-flex flex-row mb-3 pb-3 border-bottom"
        >
          <Avatar
            src={AVATAR_PATH + item.id + '.webp?' + randomize}
            height={40}
            borderRadius={40}
          />
          <div className="pl-3 pr-2">
            <NavLink to={'/app/users/list?p=' + item.id}>
              <p className="font-weight-medium mb-0 ">{item.first_name + ' ' + item.last_name}</p>
              <p className="text-muted mb-0 text-small">
                đã tạo vào {momentTime(item.created_at)}
              </p>
            </NavLink>
          </div>
        </div>)}
    </CardBody>
  </Card>
}
export default Tickets
