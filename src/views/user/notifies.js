import React, { useState, useEffect } from 'react'
import UserHeaderLayout from 'components/users/UserHeaderLayout'
import UserFooterLayout from 'components/users/UserFooterLayout'
import styled from 'styled-components'
import { RestOutlined } from '@ant-design/icons'
import { Button, Drawer, Skeleton } from 'antd'
import momentTime from 'helpers/moment'
import { Badge } from 'reactstrap'
import { NoData } from 'atoms'
import axios from 'helpers/axios'

const NotifyList = (props) => {
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState(null)
  const [loadingDetail, setLoadingDetail] = useState(false)
  const [notifications, setNotifications] = useState([])

  const fetch = () => {
    axios.get('notifies/paging/' + notifications.length)
      .then(res => {
        if (res.data.status === 200) return res.data
      })
      .then(data => {
        setNotifications([...notifications, ...data.data])
      })
  }

  useEffect(() => {
    const editId = new URLSearchParams(props.location.search).get("p")
    if (editId) {
      onOpenDrawer(editId)
    }
  }, [props.location.search])

  useEffect(() => {
    fetch()
  }, [])

  const onOpenDrawer = id => {
    setVisible(true)
    setLoadingDetail(true)
    axios.get('notifies/get-info/' + id)
      .then(res => {
        if (res.data.status === 200) {
          const data = res.data.data
          setSelected({
            title: data.title,
            content: data.content,
            created_at: data.created_at
          })
        } else {
          setVisible(false)
        }
      })
      .finally(() => setLoadingDetail(false))
  }

  const onOpenDrawerLocal = (title, content, created_at) => {
    setSelected({
      title: title,
      content: content,
      created_at: created_at,
    })
    setVisible(true)
  }

  const onCloseDrawer = () => {
    setSelected(null)
    setVisible(false)
  }

  const removeNotify = id => {
    axios.get('notifies/remove/' + id)
      .then(res => {
        if (res.data.status === 200) {
          const notifications = JSON.parse(localStorage.getItem('@notifications'))
          localStorage.setItem('@notifications', JSON.stringify(notifications.filter(i => i.id !== id)))
        } else {
          setVisible(false)
        }
      })
  }

  const markAllAsRead = () => {
    const params = notifications.map(i => { return i.id })
    axios.post('notifies/mark-as-read', params)
      .then(res => {
        if (res.data.status === 200) {
          const notifications = JSON.parse(localStorage.getItem('@notifications'))
          notifications.map(i => i.status = 1)
          localStorage.setItem('@notifications', JSON.stringify(notifications))
          window.location.reload()
        }
      })
  }

  return <>
    <UserHeaderLayout />
    {/* <CenterNav>
      <div className={visible ? 'center' : ''}>
        <UserNavLayout />
      </div>
    </CenterNav> */}
    <NotificationContainer>
      <div className="filter">
        <div className="filter--item checked">
          {/* <input type="radio" name="type" id="all" value="1" checked />
          <label htmlFor="all">Tất cả</label> */}
          <Button type='primary' shape="round" style={{ marginLeft: 10 }}
            onClick={markAllAsRead}>Đánh dấu tất cả là đã đọc</Button>
        </div>
        {/* <div className="filter--item">
          <input type="radio" name="type" id="inner" value="2" />
          <label htmlFor="inner">Bảng tin nội bộ</label>
        </div>
        <div className="filter--item">
          <input type="radio" name="type" id="noti" value="3" />
          <label htmlFor="noti">Thông báo hệ thống</label>
        </div> */}
      </div>
      <div className="notifications">
        {notifications.length > 0 ?
          notifications.map((item, index) =>
            <div className="notifications--item" key={index}>
              <div className="notifications--item-left">
                <div className="notifications--item-left-title">
                  <h2 onClick={() => onOpenDrawerLocal(item.title, item.content, item.created_at)}>{item.title} {item.status === 0 && <Badge color="success" pill>Chưa đọc</Badge>}</h2>
                </div>
                <div className="notifications--item-left-desc">
                  <p>{item.content}</p>
                  <div className="action">
                    <RestOutlined onClick={() => removeNotify(item.id)} />
                  </div>
                </div>
                <div className="notifications--item-left-public">
                  <span>{momentTime(item.created_at)}</span>
                </div>
              </div>
            </div>)
          :
          <NoData title='Không có thông báo' />
        }
      </div>
    </NotificationContainer>
    <Drawer
      width={500}
      placement="right"
      closable={true}
      onClose={onCloseDrawer}
      visible={visible}
    >
      {loadingDetail ? <Skeleton />
        :
        <DetailNotification>
          {selected && <div className="detail">
            <div className="detail-title">
              <h2>{selected.title}</h2>
            </div>
            <div className="detail-desc">
              <div className="html">
                {selected.content}
              </div>
            </div>
            <div className="detail-docs">
              <h6>{momentTime(selected.created_at)}</h6>
            </div>
            {/* <div className="detail-docs">
            <h6>Tài liệu đính kèm</h6>
            <span onClick={downloadDocs}>01.04.2021.pdf</span>
          </div> */}
          </div>}
        </DetailNotification>}
    </Drawer>
    <UserFooterLayout />
  </>
}

const CenterNav = styled.div`
  .center{
    display: flex;
    justify-content: center;
  }
`

const DetailNotification = styled.div`
  .detail{
    padding: 6px 16px;
    &-title{
      h2{
          color: #091230;
          margin-bottom: 30px;
          font-weight: bold;
          font-size: 24px;
      }
    }
    &-desc{
      margin-bottom: 30px;
      .html{
        p{
          font-size: 16px;
          color: #676E86;
          margin-bottom: 5px;
          letter-spacing: 1px;
        }
      }
    }
    &-docs{
      h6{
        font-size: 20px;
        color: #091230;
        line-height: 28px;
        font-weight: bold;
        margin-bottom: 16px;
      }
      span{
        font-weight: bold;
        color: #0B46A9;
        line-height: 140%;
        font-size: 20px;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
`

const NotificationContainer = styled.div`
  max-width: 1440px;
  margin: auto;
  .filter{
    margin-right: 40px;
    margin-top: 42px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    &--item{
      color: #676E86;
      letter-spacing: 0.01em;
      font-weight: bold;
      line-height: 23px;
      font-size: 15.5px;
      margin-left: 40px;
      display: flex;
      align-items: center;
      &:hover{
        input{
          border: 1px solid #0B46A9;
        }
        label{
          color: #0B46A9;
        }
      }
      *{
        cursor: pointer;
      }
      input{
        background: #F7F7F7;
        border: 1px solid #B8BEC8;
        width: 20px;
        height: 20px;
        &:hover{
          border: 1px solid #0B46A9;
        }
        &:checked:{
          color: #0B46A9;
        }
      }
      label{
        margin-bottom: 0;
        margin-left: 10px;
      }
    }
    .checked{
      color: #0B46A9;
    }
  }
  .notifications{
    margin: 40px;
    background: #FFFFFF;
    box-shadow: 2px 5px 20px rgba(42, 44, 49, 0.13);
    border-radius: 10px;
    padding: 40px 50px 16px;
    @media (max-width: 375px) {
      margin: 0px;
    }
    &--item{
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      &-left{
        width: 100%;
        &-title{
          color: #091230;
          margin-bottom: 8px;
          h2{
            cursor: pointer;
            font-weight: bold;
            font-size: 24px;
            &:hover{
              color: #4063E0;
            }
          }
        }
        &-desc{
          display: flex;
          color: #676E86;
          margin-bottom: 8px;
          font-size: 16px;
          align-items: flex-start;
          p{
            width: 100%;
            font-weight: 400;
            line-height: 26px;
          }
          .action{
            color: #676E86;
            width: 65px;
            text-align: right;
            font-size: 28px;
            display: flex;
            justify-content: flex-end;
            span{
              cursor: pointer;
            }
          }
        }
        &-public{
          font-weight: bold;
          color: #4063E0;
          font-size: 14px;
        }
      }
    }
  }
`

export default NotifyList
