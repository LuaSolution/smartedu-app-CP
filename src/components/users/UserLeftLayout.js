import React from 'react'
import { AVATAR_PATH, userLevelVN, IMG_ERROR } from 'defines'
import 'assets/user/ifa-user-left.css'
import { Avatar } from 'atoms'
const _user = JSON.parse(localStorage.getItem('@current_user'))

const UserLeftLayout = ({ pageName, urlList }) => {
  // const openFileSelector = () => {
  //   document.getElementById('avatar-selector').click()
  // }

  const linkTo = (title, url, index) => <a key={index} href={pageName !== url ? "/dashboards/" + url : '#'} className={pageName === url ? 'link active' : 'link'}>{title}</a>

  return (
    <div className="ifa-user-left">
      {_user && <Avatar className="avatar" src={AVATAR_PATH + _user.id + '.webp'} height={170} />}
      {/* <div className="ifa-file-input">
          <input type="file" id="avatar-selector" />
          <span className="file-selector" onClick={openFileSelector}></span>
        </div> */}
      {_user && <div className="info">
        <p className="name">{_user.first_name + ' ' + _user.last_name}</p>
        <p className="pos">{userLevelVN[_user.level]}</p>
      </div>}
      <div className="btn-user-info">
        <button className="btn-thong-tin-ca-nhan">
          <a href="/edit-profile">Thông tin cá nhân</a>
        </button>
      </div>
      <div className="btn-user-info">
        <button className="btn-thong-tin-ca-nhan">
          <a href={'/profile/' + _user.id + '/overview'}>Hồ sơ học tập</a>
        </button>
      </div>
      <div className="list-link">
        <a
          href="/dashboards"
          className={pageName === 'dashboards' ? 'link active' : 'link'}
        >Trang tổng quan</a>
        {urlList.map((item, index) => linkTo(item.title, item.url, index))}
      </div>
    </div >
  )
}

export default UserLeftLayout
