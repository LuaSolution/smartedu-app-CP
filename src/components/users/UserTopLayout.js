import React from 'react'
import styled from 'styled-components'
import { AVATAR_PATH, userLevelVN } from 'defines'
import { Avatar } from 'atoms'

const _user = JSON.parse(localStorage.getItem('@current_user'))

const UserTopLayout = ({ pageName, urlList }) => {
  const openNav = () => {
    document.getElementById('user-sidebar').style.width = '100%'
    document.getElementById('user-sidebar').style.zIndex = 999
  }

  const closeNav = () => {
    document.getElementById('user-sidebar').style.width = '0'
  }

  // const openFileSelector = () => {
  //   document.getElementById('avatar-selector').click()
  // }

  const getTitle = () => {
    const i = urlList.filter(i => i.url.includes(pageName))
    return i && i[0] ? i[0].title : 'Trang tổng quan'
  }

  const linkTo = (title, url, index) => <a key={index} href={"/dashboards/" + url} className={pageName === url ? 'link active' : 'link'}>{title}</a>

  return <>
    <PCWrapper>{getTitle()}</PCWrapper>
    <MobileWrapprer>
      <Title>{getTitle()}</Title>
      <Menu>
        <div id="user-sidebar">
          <span onClick={closeNav} className="close-btn">
            &times;
              </span>
          {_user && <Avatar className="avatar" src={AVATAR_PATH + _user.id + '.webp?' + Math.random()} height={100} />}
          {/* <div className="ifa-file-input">
              <input type="file" id="avatar-selector" />
              <span
                className="file-selector"
                onClick={openFileSelector}
              ></span>
            </div> */}
          {_user && <div className="info">
            <p className="name"> {_user && _user.first_name + ' ' + _user.last_name}</p>
            <p className="pos">{userLevelVN[_user.level]}</p>
          </div>}
          <div className="btn-user-info">
            <button className="btn-thong-tin-ca-nhan">
              <a href="/edit-profile">
                Thông tin cá nhân
                  </a>
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
              className={pageName == 'dashboards' ? 'link active' : 'link'}
            >Trang tổng quan</a>
            {urlList.map((item, index) => linkTo(item.title, item.url, index))}
          </div>
        </div>

        <span onClick={openNav}>&#9776;</span>
      </Menu>
    </MobileWrapprer>
  </>
}

export default UserTopLayout

const PCWrapper = styled.div`
  width: 1078px;
  max-width: 100%;
  height: 140px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  background: #193769;
  font-weight: bold;
  font-size: 50px;
  line-height: 130%;
  letter-spacing: 0.01em;
  color: #fff;
  padding: 55px 40px 20px 40px;
  position: relative;
  display: block;
  &::after {
    background-image: url(/assets/img/web/dashboard/3.png);
    content: '';
    background-repeat: no-repeat;
    right: 20px;
    bottom: 32px;
    position: absolute;
    width: 117px;
    height: 75px;
  }
  @media (max-width: 991px) {
    display: none;
  }
`
const MobileWrapprer = styled.div`
  display: none;
  @media (max-width: 991px) {
    display: block;
    max-width: 100%;
    height: 82px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    background: #193769;
    position: relative;
  }
`
const Title = styled.span`
  @media (max-width: 991px) {
    font-weight: bold;
    font-size: 25px;
    line-height: 82px;
    letter-spacing: 0.01em;
    color: #fff;
    text-align: center;
    display: block;
    text-align: center;
    margin-left: 30px;
  }
`
const Menu = styled.div`
  position: absolute;
  top: calc(50% - 25px);
  left: 20px;
  color: #193769;
  width: 50px;
  height: 50px;
  font-size: 25px;
  line-height: 50px;
  background: #fff;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  text-align: center;
  & #user-sidebar {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #fff;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
  }
  & #user-sidebar a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
  }
  & #user-sidebar a:hover {
    color: #f1f1f1;
  }
  & .close-btn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
  }
  #user-sidebar .avatar {
    width: 170px;
    height: 170px;
    border-radius: 50%;
    border: 4px solid #25a131;
    text-align: center;
    position: relative;
    margin: auto;
  }
  #user-sidebar .avatar img {
    max-width: 100%;
    max-height: 100%;
    border-radius: 50%;
  }
  #user-sidebar .avatar .ifa-file-input {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  #user-sidebar .avatar .ifa-file-input input {
    display: none;
  }
  #user-sidebar .avatar .ifa-file-input span {
    background-image: url('https://github.com/LuaSolution/ifa-lms-app/blob/master/public/assets/img/web/dashboard/2.webp?raw=true');
    width: 52px;
    height: 50px;
    display: block;
    cursor: pointer;
  }
  #user-sidebar .info {
    margin-top: 15px;
    text-align: center;
  }
  #user-sidebar .info .name {
    font-weight: bold;
    font-size: 20px;
    line-height: 140%;
    text-align: center;
    letter-spacing: 0.01em;
    color: #193769;
  }
  #user-sidebar .info .pos {
    font-weight: 600;
    font-size: 16px;
    line-height: 160%;
    letter-spacing: 0.01em;
    color: #676e86;
  }
  #user-sidebar .btn-user-info .btn-thong-tin-ca-nhan {
    font-weight: bold;
    font-size: 18px;
    line-height: 150%;
    letter-spacing: 0.01em;
    color: #363e57;
    border-radius: 30px;
    width: 100%;
    height: 49px;
    background: #ffffff;
    border: 1px solid #bad4ff;
    margin-top: 15px;
    padding: 11px 15px;
    width: fit-content;
  }
  #user-sidebar .list-link {
    margin-top: 28px;
    padding: 10px 10px 20px 10px;
    background-color: #fff;
    box-shadow: 2px 6px 30px rgba(78, 82, 92, 0.1);
    border-radius: 5px;
  }
  #user-sidebar .list-link .link {
    display: block;
    background: #e1e5f1;
    padding: 9px 10px;
    font-weight: 600;
    font-size: 16px;
    line-height: 140%;
    letter-spacing: 0.01em;
    color: #363e57;
    border-radius: 5px;
    width: 100%;
    height: 38px;
    margin-top: 10px;
  }
  #user-sidebar .list-link .link.active {
    background: #4063e0;
    color: #fff;
  }
  @media (max-width: 375px) {
    #user-sidebar .avatar {
      width:100px;
      height:100px;
    }

     #user-sidebar .avatar .ifa-file-input {
      bottom: -10px;
    right: -14px;
    }
    #user-sidebar .btn-user-info .btn-thong-tin-ca-nhan {
      line-height: 0px;
    }
     #user-sidebar a {
      padding: 8px 8px 8px 8px;
      font-size: 18px;
    }
    #user-sidebar .list-link {
      margin-top: 16px;
    }
    .ifa-user-left .list-link .link
    {
      padding-top: 48px;
    }
  }
`
