import React, { useState, useEffect } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import IntlMessages from 'helpers/IntlMessages'
import { AVATAR_PATH, userLevelVN } from 'defines'
import {
  personalInfo,
  personalPage,
  personalPageActive,
  personalReward,
  logout,
  cart,
  cartActive,
  bell,
  bellHover,
  bellActive,
} from 'atoms'
import styled from 'styled-components'
import 'assets/user/ifa-header.css'
import { Avatar } from 'atoms'
import UserNotification from 'components/users/userNotification'
import axios from 'helpers/axios'
import { notification, Popover } from 'antd'

const _user = JSON.parse(localStorage.getItem('@current_user'))
const notifications = localStorage.getItem('@notifications')
  ? JSON.parse(localStorage.getItem('@notifications')).filter(
      (i) => i.status === 0
    )
  : []
const cartList = JSON.parse(localStorage.getItem('@cart')) || []
const path = window.location.pathname
const rand = Math.random()

const UserHeaderLayout = ({ title }) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(() => {
    if (title) {
      document.querySelector('title').innerText =
        'CP Learning Center | ' + title
    }
  }, [title])

  const showDropDownProfile = () => {
    var rotate = document.getElementById('user-info-dropdown-img')
    rotate.classList.toggle('over')
    rotate.classList.toggle('out')
    document.getElementById('user-info-dropdown').classList.toggle('active')
    var content = document.getElementById('ifa-menu-dropdown-content')
    content.classList.toggle('active')
  }

  const logoutUser = () => {
    axios.get('logout').then((res) => {
      if (res.data.status === 200) {
        console.log(res.data)
        localStorage.removeItem('@notifications')
        localStorage.removeItem('@current_user')
        localStorage.removeItem('@token')
        window.location.href = '/'
      }
    })
  }

  const subMenu = _user && (
    <>
      <div className="info">
        <a href={'/dashboards'}>
          <div className="img">
            <Avatar
              src={AVATAR_PATH + _user.id + '.webp?' + rand}
              height={70}
              borderRadius={70}
              style={{ border: '1px solid #eee' }}
            />
          </div>
          <div className="name-pos">
            <p className="name">
              {_user && _user.first_name + ' ' + _user.last_name}
            </p>
            <p className="pos">{userLevelVN[_user.level]}</p>
          </div>
        </a>
      </div>
      <ListLink>
        <a
          href={'/profile/' + _user.id + '/overview'}
          className="link-item dashboard-link"
        >
          Hồ sơ học tập
        </a>
        <a href="/dashboards" className="link-item dashboard-link">
          Trang tổng quan
        </a>
        <a href="/edit-profile" className="link-item dashboard-link">
          Thông tin cá nhân
        </a>
        {_user.level !== 3 && (
          <a href="/app/dashboards/default" className="link-item profile-link">
            Trang quản trị
          </a>
        )}
        <div
          className="link-item logout-link"
          style={{ cursor: 'pointer' }}
          onClick={logoutUser}
        >
          <IntlMessages id="user.logout" />
        </div>
      </ListLink>
    </>
  )

  return (
    <header className="ifa-header ">
      <Navbar bg="" expand="lg">
        <Navbar.Brand href="/" style={{ height: 80 }}>
          <img
            style={{ height: '100%' }}
            src={`${process.env.PUBLIC_URL}/assets/img/web/static/LogoHeaderCp.png`}
            alt="logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ifa-mr-auto">
            {/* <Nav.Link href="/" className={path === '/' && "active"}>
            Trang chủ
          </Nav.Link> */}
            {_user ? (
              <Nav.Link
                href="/courses"
                className={
                  path.includes('course-details') || path.includes('courses')
                    ? 'active'
                    : ''
                }
              >
                Khóa học
              </Nav.Link>
            ) : (
              <Nav.Link
                href="#"
                onClick={() =>
                  notification.info({
                    description:
                      'Hiện tại các khóa học chỉ được cung cấp riêng cho Doanh nghiệp, vui lòng đăng ký tài khoản để trải nghiệm hệ thống CP Learning Center',
                  })
                }
                className={
                  path.includes('course-details') || path.includes('courses')
                    ? 'active'
                    : ''
                }
              >
                Khóa học
              </Nav.Link>
            )}
            <Nav.Link
              href="/experts"
              className={path.includes('experts') ? 'active' : ''}
            >
              Tìm chuyên gia
            </Nav.Link>
            <Nav.Link
              href="/coming-soon"
              className={path.includes('bonus') ? 'active' : ''}
            >
              Lịch đào tạo
            </Nav.Link>
            <Nav.Link
              href="/news"
              className={path.includes('news') ? 'active' : ''}
            >
              Sự kiện
            </Nav.Link>
          </Nav>
          {localStorage.getItem('@token') ? (
            <Nav className="ifa-mr-auto">
              <UserCart href="/carts">
                {cartList && cartList.length > 0 && (
                  <span>{cartList.length}</span>
                )}
              </UserCart>
              <div className="user-info">
                <a href={'/dashboards'}>
                  <div className="img">
                    <Avatar
                      src={AVATAR_PATH + _user.id + '.webp'}
                      height={30}
                      borderRadius={30}
                    />
                  </div>
                  <div className="name">{_user.username}</div>
                </a>
              </div>
              <Popover
                placement="bottomRight"
                content={
                  <UserNotification
                    show={show}
                    onClose={handleClose}
                    notifications={notifications}
                  />
                }
                trigger="click"
              >
                <NotificationStyle>
                  {notifications && notifications.length > 0 && (
                    <span
                      onClick={handleShow}
                      className={`notification-number ${show && 'active'}`}
                    >
                      <small
                        style={
                          notifications.length < 10
                            ? { paddingLeft: 4, paddingRight: 4 }
                            : {}
                        }
                      >
                        {notifications.length}
                      </small>
                    </span>
                  )}
                </NotificationStyle>
              </Popover>
              <div
                className="user-info-dropdown"
                id="user-info-dropdown"
                onClick={showDropDownProfile}
              >
                <div
                  alt="logo"
                  className="arrow out"
                  id="user-info-dropdown-img"
                ></div>
                <div
                  className="ifa-menu-dropdown-content"
                  id="ifa-menu-dropdown-content"
                  style={{ border: '1px solid #eee', zIndex: 999 }}
                >
                  {subMenu}
                </div>
              </div>
              <div
                className="ifa-menu-dropdown-content-mobile"
                id="ifa-menu-dropdown-content-mobile"
              >
                {subMenu}
              </div>
            </Nav>
          ) : (
            <Nav className="ifa-mr-auto">
              <Nav.Link href="/register" className="ifa-register-link">
                <IntlMessages id="user.register" />
              </Nav.Link>
              <Nav.Link href="/login" className="ifa-login-link">
                <IntlMessages id="user.login-title" />
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}

export default React.memo(UserHeaderLayout)

const ListLink = styled.div`
  .link-item {
    display: block;
    text-align: left;
    background-size: 31px 31px;
    background-repeat: no-repeat;
    width: 100%;
    height: 31px;
    margin-top: 15px;
    padding-left: 46px;
    font-weight: 600;
    font-size: 16px;
    line-height: 31px;
    letter-spacing: 0.01em;
    color: #363e57;
    height: 36px;
    border-radius: 10px;
    line-height: 36px;
    background-position: 0 center;
  }
  .link-item.dashboard-link {
    background-image: url(${personalPage});
  }
  .link-item.profile-link {
    background-image: url(${personalInfo});
  }
  .link-item.reward-link {
    background-image: url(${personalReward});
  }
  .link-item.logout-link {
    background-image: url(${logout});
  }
  .link-item:hover {
    background-color: #e1e5f1;
    color: #091230;
    transition: ease-in 0.2s;
  }
  .link-item.dashboard-link.active {
    background-image: url(${personalPageActive});
    background-color: #0b46a9;
    color: #fff;
  }
`

const UserCart = styled.a`
  width: 45px;
  height: 45px;
  background-image: url(${cart});
  background-repeat: no-repeat;
  background-size: 21.36px 22px;
  background-position: 8px 12.5px;
  background-color: #e1e5f1;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  position: relative;
  span {
    background-color: #ff0000;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    color: #fff;
    position: absolute;
    right: 9px;
    top: 10px;
    width: 12px;
    height: 12px;
    font-weight: 600;
    font-size: 7px;
    line-height: 12px;
    letter-spacing: 0.01em;
    text-align: center;
  }
  &:hover {
    background-color: #b8bec8;
  }
  &:active {
    background-image: url(${cartActive});
    background-color: #0b46a9;
  }
  @media (max-width: 991px) {
    margin-left: 30px;
  }
`

const NotificationStyle = styled.span`
  cursor: pointer;
  width: 45px;
  height: 45px;
  background-image: url(${bell});
  background-repeat: no-repeat;
  background-size: 21.88px 23.09px;
  background-position: center;
  background-color: #e1e5f1;
  border-radius: 50%;
  margin-left: 10px;
  &:hover {
    background-image: url(${bellHover});
    background-color: #b8bec8;
  }
  .notification-number {
    display: inline-block;
    border-radius: 50%;
    position: relative;
    width: 100%;
    height: 100%;

    small {
      padding: 1px;
      background-color: #ff0000;
      border-radius: 50%;
      color: #fff;
      position: relative;
      z-index: 1;
      left: 26px;
      top: 1px;

      font-weight: 600;
      font-size: 8px;
      line-height: 12px;
      letter-spacing: 0.01em;
      text-align: center;
    }
  }
  .notification-number.active {
    background-color: #0b46a9;
    width: 45px;
    height: 45px;
    background-image: url(${bellActive});
    background-repeat: no-repeat;
    background-size: 21.88px 23.09px;
    background-position: center;
    border-radius: 50%;

    small {
      &::after {
        background-color: #0b46a9;
      }
    }
  }

  @media (max-width: 991px) {
    margin-left: 30px;
    margin-top: 20px;
  }
`
