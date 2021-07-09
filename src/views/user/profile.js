import React, { useState, useEffect } from 'react'
import UserHeaderLayout from 'components/users/UserHeaderLayout'
import UserFooterLayout from 'components/users/UserFooterLayout'
import { UserProfileWrapper as Wrapper } from 'atoms'
import { Spin } from 'antd'
import 'assets/user/ifa-profile.css'
import { AVATAR_PATH } from 'defines'
import axios from 'helpers/axios'
import ProfileDetail from 'containers/profileDetail'
import ProfileDetailWithoutLogin from 'containers/profileDetail/indexWithoutLogin'
import { useParams } from 'react-router'

const randomize = Math.random()
const _user = JSON.parse(localStorage.getItem('@current_user'))

const ProfilePage = (props) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [certificates, setCertificates] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      setLoading(true)
      axios
        .get('get-user-info/' + id)
        .then((res) => {
          if (res.data.status === 200) {
            const data = res.data.data
            setData(data)
            setCertificates(res.data.certificates)
          }
        })
        .finally(() => setLoading(false))
    }
  }, [id])

  const chooseProfileAvatar = (e) => {
    e.preventDefault()
    document.getElementsByClassName('avatar-img-picker')[0].click()
  }
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })

  const finishChooseAvatar = async (e) => {
    e.preventDefault()
    const img = await toBase64(e.target.files[0])
    document.getElementsByClassName(
      'avatar-img'
    )[0].style.backgroundImage = `url(${img})`

    axios
      .post('users/upload-avatar', {
        image: img,
        type: 1,
      })
      .then((res) => {
        if (res.data.status === 200) {
          console.log('uploaded')
        }
      })
  }
  const chooseProfileCover = (e) => {
    e.preventDefault()
    document.getElementsByClassName('cover-img-picker')[0].click()
  }
  const finishChooseCover = async (e) => {
    e.preventDefault()
    const img = await toBase64(e.target.files[0])
    document.getElementsByClassName(
      'profile-cover'
    )[0].style.backgroundImage = `url(${img})`
    axios
      .post('users/upload-avatar', {
        image: img,
        type: 2,
      })
      .then((res) => {
        if (res.data.status === 200) {
          console.log('uploaded')
        }
      })
  }

  return _user ? (
    <>
      <UserHeaderLayout />
      <Spin
        spinning={loading}
        size="large"
        tip="Đang tải thông tin người dùng..."
      >
        <Wrapper className="ifa-body-wrapper">
          <div className="ifa-container user-profile">
            <div className="">
              <div
                className="profile-cover"
                style={{
                  backgroundImage: `url(${
                    AVATAR_PATH + id + '-cover.webp?' + randomize
                  })`,
                }}
              >
                <div className="avatar-block">
                  <input
                    type="file"
                    name="avatar"
                    className="avatar-img-picker"
                    accept="image/*"
                    onChange={finishChooseAvatar}
                  />
                  {parseInt(_user.id) === parseInt(id) ? (
                    <div
                      className="avatar-img"
                      onClick={chooseProfileAvatar}
                      style={{
                        backgroundImage: `url(${
                          AVATAR_PATH + id + '.webp?' + randomize
                        })`,
                      }}
                    ></div>
                  ) : (
                    <div
                      className="avatar-img-none"
                      style={{
                        backgroundImage: `url(${
                          AVATAR_PATH + id + '.webp?' + randomize
                        })`,
                      }}
                    ></div>
                  )}
                </div>
                {parseInt(_user.id) === parseInt(id) && (
                  <div className="cover-block">
                    <input
                      type="file"
                      name="cover"
                      className="cover-img-picker"
                      accept="image/*"
                      onChange={finishChooseCover}
                    />
                    <button
                      className="change-cover-button"
                      onClick={chooseProfileCover}
                    >
                      Đổi ảnh bìa
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <ProfileDetail id={id} userData={data} certificates={certificates} />
        </Wrapper>
      </Spin>
      <UserFooterLayout />
    </>
  ) : (
    <Spin
      spinning={loading}
      size="large"
      tip="Đang tải thông tin người dùng..."
    >
      <Wrapper className="ifa-body-wrapper">
        <div className="ifa-container user-profile">
          <div className="">
            <div
              className="profile-cover"
              style={{
                backgroundImage: `url(${
                  AVATAR_PATH + id + '-cover.webp?' + randomize
                })`,
              }}
            >
              <div className="avatar-block">
                <div
                  className="avatar-img-none"
                  style={{
                    backgroundImage: `url(${
                      AVATAR_PATH + id + '.webp?' + randomize
                    })`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <ProfileDetailWithoutLogin
          id={id}
          userData={data}
          certificates={certificates}
        />
      </Wrapper>
    </Spin>
  )
}

export default ProfilePage
