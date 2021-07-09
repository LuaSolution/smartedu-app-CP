import React, { useState, useEffect } from 'react'
import 'assets/user/profile.scss'
import Overview from './overview'
import { useParams } from 'react-router'
import LearningPath from './learningPath'
import Certificates from './certificates'
import Wishlist from './myCourse'
import ContributedCourses from './contributedCoursesWithoutLogin'
import MenuFoldOutlined from '@ant-design/icons/lib/icons/MenuFoldOutlined'

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
      case 'learning-path':
        return <LearningPath id={id} />
      case 'certificates':
        return <Certificates userId={id} />
      case 'courses':
        return <ContributedCourses />
      default:
        return (
          <Overview id={id} userData={userData} certificates={certificates} />
        )
    }
  }

  const changeMenuActive = (menu) => {
    const nextURL = '/profile/' + userData.id + '/' + menu
    window.history.replaceState(null, null, nextURL)
    setMenuActive(menu)
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
              {/* <div className={`item-menu-1 ${menuActive === 'certificates' ? 'active' : ''}`} onClick={() => clickChangeTabMenu('certificates')}>Chứng chỉ</div> */}
              <div
                className={`item-menu-1 ${
                  menuActive === 'learning-path' ? 'active' : ''
                }`}
                onClick={() => clickChangeTabMenu('learning-path')}
              >
                Lộ trình học tập
              </div>
              <div
                className={`item-menu-1 ${
                  menuActive === 'courses' ? 'active' : ''
                }`}
                onClick={() => clickChangeTabMenu('courses')}
              >
                Đóng góp khóa học
              </div>
            </div>
          </div>
        </div>
        {renderContent()}
      </div>
    )
  )
}

export default ProfileDetail
