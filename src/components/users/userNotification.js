import React, { memo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import styled from 'styled-components'
import momentTime from 'helpers/moment'
import { dot, dotActive, wrong, check, NoData } from 'atoms'
import IntlMessages from 'helpers/IntlMessages'
import axios from 'helpers/axios'

const NotificationItem = memo(({ item }) => (
  <NotificationItemStyle href={'/notify?p=' + item.id}>
    <h5 className="notification__title">{item.title}</h5>
    <p className="notification__content">{item.content}</p>
    <time className="notification__time" >
      {momentTime(item.created_at)}
    </time>
    {!item.status && <span className="notification__status" />}
  </NotificationItemStyle>
))

const UserNotification = ({ show, onClose, notifications }) => {
  const [checkAll, setCheckAll] = useState(false)

  const readAll = () => {
    setCheckAll(!checkAll)
  }

  return <div style={{ padding: 15 }}>
    <div className="notification__header">
      {/* <h4 className="notification__title">
        <IntlMessages id="user.notification-title" />
      </h4> */}
      <div className="notification__button">
        <span
          className={`notification__button--setting ${checkAll && 'active'}`}
          onClick={readAll}
        />
      </div>
    </div>
    <div style={{ overflowY: 'scroll' }} className="scrollbar">
      {notifications && notifications.length > 0 ?
        notifications.map((item, index) => <NotificationItem key={index} item={item} />)
        : <NoData title='Không có thông báo mới' />}
    </div>
    <NavLink to="/notify">
      <NotificationFooter>
        <IntlMessages id="user.all-notification" />
      </NotificationFooter>
    </NavLink>
  </div>
}

export default React.memo(UserNotification)
const NotificationFooter = styled.div`
  text-align: center;
  position: relative;
  padding: 10px;
  font-size: 16px;
  line-height: 140%;
  font-weight: 600;

  &:before {
    background-color: #d8d8d8;
    width: calc(100% + 70px);
    height: 1px;
    content: '';
    position: absolute;
    top: 0;
    left: -35px;
  }
`

const NotificationItemStyle = styled.a`
  position: relative;
  display: block;

  &:not(:first-child) {
    margin-top: 12px;
  }

  .notification__title {
    font-weight: bold;
    font-size: 20px;
    line-height: 140%;
    letter-spacing: 0.01em;
    color: #193769;
  }

  .notification__content {
    margin-top: 4px;
    padding-right: 18px;
    font-size: 16px;
    line-height: 160%;
    letter-spacing: 0.01em;
    color: #676e86;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 40ch;
  }

  .notification__time {
    font-weight: bold;
    font-size: 14px;
    line-height: 140%;
    color: #4063e0;
  }

  .notification__status {
    position: absolute;
    display: flex;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    background-color: #e1e5f1;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    justify-content: center;

    &:before {
      content: '';
      background-color: #078723;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      align-self: center;
    }
  }
`
