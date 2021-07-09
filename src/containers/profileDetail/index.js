import React, { useState, useEffect } from 'react'
import 'assets/user/profile.scss'
import {
  DownloadOutlined,
  DownOutlined,
  MessageOutlined,
  UserAddOutlined,
} from '@ant-design/icons'
import MessageInvite from './MessageInvite'
import Overview from './overview'
import FriendFeed from './FriendFeed'
import { useParams } from 'react-router'
import LearningPath from './learningPath'
import Certificates from './certificates'
import Wishlist from './myCourse'
import ContributedCourses from './contributedCourses'
import MenuFoldOutlined from '@ant-design/icons/lib/icons/MenuFoldOutlined'
import { notification } from 'antd'

const _user = JSON.parse(localStorage.getItem('@current_user'))

const ProfileDetail = ({ userData, certificates }) => {
  const [menuActive, setMenuActive] = useState('overview')
  const { id, section } = useParams()
  const [showMenuMobile, setShowMenuMobile] = useState(false)

  useEffect(() => {
    if (section) {
      setMenuActive(section)
    }
  }, [section])

  const renderContent = () => {
    switch (menuActive) {
      case 'wishlist':
        return <Wishlist id={id} />
      case 'friends':
        return <FriendFeed />
      case 'learning-path':
        return <LearningPath id={id} />
      case 'certificates':
        return <Certificates userId={id}/>
      case 'courses':
        return <ContributedCourses />
      default:
        return (
          <>
            {/* {parseInt(_user.id) === parseInt(id) && <MessageInvite />} */}
            <Overview
              id={id}
              userData={userData}
              clickChangeTabMenu={clickChangeTabMenu}
              certificates={certificates}
            />
          </>
        )
    }
  }

  const changeMenuActive = (menu) => {
    const nextURL = '/profile/' + userData.id + '/' + menu
    window.history.replaceState(null, null, nextURL)
    setMenuActive(menu)
  }

  const _exportPdf = () => {
    notification.success({
      description: 'Chức năng sẽ sớm ra mắt !',
    })
  }

  const clickChangeTabMenu = (tab = '') => {
    changeMenuActive(tab)
    setShowMenuMobile(false)
  }

  return (
    userData && (
      <div className="box-detail-profile-user" name="capture" id="capture">
        <div className="bg-top-1">
          <div className="fullname-profile">
            {userData.first_name + ' ' + userData.last_name}
          </div>
          <div className="description-profile">{userData.description}</div>
          <div className="line-middle-full-width" />
          <div className="box-menu-profile-1">
            <div
              className="show-menu-profile-mobile"
              onClick={() => setShowMenuMobile(!showMenuMobile)}
            >
              <MenuFoldOutlined />
            </div>
            <div
              className={`box-left-menu-1 ${showMenuMobile ? 'show-menu' : ''}`}
            >
              <div
                className={`item-menu-1 ${
                  menuActive === 'overview' ? 'active' : ''
                }`}
                onClick={() => clickChangeTabMenu('overview')}
              >
                Giới thiệu
              </div>
              <div
                className={`item-menu-1 ${
                  menuActive === 'wishlist' ? 'active' : ''
                }`}
                onClick={() => clickChangeTabMenu('wishlist')}
              >
                Khóa học
              </div>
              <div
                className={`item-menu-1 ${
                  menuActive === 'certificates' ? 'active' : ''
                }`}
                onClick={() => clickChangeTabMenu('certificates')}
              >
                Chứng chỉ
              </div>
              <div
                className={`item-menu-1 ${
                  menuActive === 'learning-path' ? 'active' : ''
                }`}
                onClick={() => clickChangeTabMenu('learning-path')}
              >
                Lộ trình học tập
              </div>
              {showMenuMobile ? (
                <>
                  <div
                    className={`item-menu-1 ${
                      menuActive === 'friends' ? 'active' : ''
                    }`}
                    onClick={() => clickChangeTabMenu('friends')}
                  >
                    Bạn bè
                  </div>
                  <div
                    className={`item-menu-1 ${
                      menuActive === 'courses' ? 'active' : ''
                    }`}
                    onClick={() => clickChangeTabMenu('courses')}
                  >
                    Đóng góp khóa học
                  </div>
                </>
              ) : (
                <div
                  className={`item-menu-1 ${
                    ['friends', 'courses'].indexOf(menuActive) > -1
                      ? 'active'
                      : ''
                  }`}
                >
                  <div className="item-menu-parent">
                    Xem thêm <DownOutlined />
                  </div>
                  <div className="list-menu-children">
                    <div
                      className={`item-menu-children ${
                        menuActive === 'friends' ? 'active' : ''
                      }`}
                      onClick={() => clickChangeTabMenu('friends')}
                    >
                      Bạn bè
                    </div>
                    <div
                      className={`item-menu-children ${
                        menuActive === 'courses' ? 'active' : ''
                      }`}
                      onClick={() => clickChangeTabMenu('courses')}
                    >
                      Đóng góp khóa học
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* {parseInt(_user.id) === parseInt(id) ?
            <div className="box-right-menu-1">
              <div className="down-load-user">
                <div className="down-load-parent" ><DownloadOutlined /></div>
                <div className="down-load-children">
                  <div className="item-down-children" onClick={_exportPdf}>Tải hồ sơ học tập</div>
                </div>
              </div>
            </div>
            :
            <div className="box-right-menu-1">
              <div className="btn-primary-profile add-friend-btn"><UserAddOutlined /> Thêm bạn bè</div>
              <div className="btn-default-profile message-user"><MessageOutlined /> Nhắn tin</div>
            </div>
          } */}
          </div>
        </div>
        {renderContent()}
      </div>
    )
  )
}

export default ProfileDetail
