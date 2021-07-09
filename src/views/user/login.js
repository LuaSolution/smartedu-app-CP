import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Spin, message, Alert } from 'antd'
import UserFooterLayout from 'components/users/UserFooterLayout'
import axios from 'helpers/axios'
import useFormInput from 'helpers/useFormInput'
import { setCurrentUser } from 'helpers/Utils'
import { LazyImage } from 'atoms/lazyImg'
import { getNewToken } from 'helpers/Firebase'
import firebase from 'firebase/app'
import 'assets/user/ifa-login.css'
import 'assets/user/ifa-form.css'

const Login = () => {
  const history = useHistory()
  const username = useFormInput(null)
  const password = useFormInput(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(null)

  useEffect(() => {
    if (localStorage.getItem('@token')) {
      history.push('/')
    }
  }, [history])

  const onUserLogin = () => {
    if (username.value && password.value) {
      setLoading(true)
      axios
        .post('login', {
          username: username.value,
          password: password.value,
        })
        .then((res) => {
          if (res.data.status === 200) {
            if (firebase.messaging.isSupported()) {
              getNewToken()
            }
            setCurrentUser(res.data)
            //load danh sách thông báo
            localStorage.setItem(
              '@notifications',
              JSON.stringify(res.data.notifications)
            )
            history.push('/dashboards')
          } else {
            message.error(res.data.message)
            setErr(res.data.message)
          }
        })
        .catch((error) => {
          message.error(error.message)
        })
        .finally(() => setLoading(false))
    } else {
      setErr('Vui lòng nhập đầy đủ username/password')
    }
  }

  const errClassname = err ? 'ifa-form-control error' : 'ifa-form-control'

  return (
    <>
      <Spin spinning={loading} tip="Đang đăng nhập...">
        <div className="ifa-container form-page login-page">
          <div className="img">
            <LazyImage
              src={process.env.PUBLIC_URL + '/assets/img/web/login/1.webp'}
              alt="login"
            />
          </div>
          <div className="form">
            <div className="comeback-link">
              <a href="/">Quay lại</a>
            </div>
            <div className="form-wrapper">
              <p className="title">Đăng nhập</p>
              <p className="sub-title">Chào mừng bạn quay lại SmartEdu !</p>
              {err && <Alert message={err} type="error" showIcon />}
              <div className={errClassname}>
                <p className="label">Tên đăng nhập*</p>
                <div className="input-group">
                  <input {...username} placeholder="Tên đăng nhập của bạn" />
                </div>
              </div>
              <div className={errClassname}>
                <p className="label">Mật khẩu*</p>
                <div className="input-group">
                  <input
                    type="password"
                    {...password}
                    placeholder="Mật khẩu của bạn"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        onUserLogin()
                      }
                    }}
                  />
                </div>
              </div>
              <div className="ifa-submit-btn">
                <input type="submit" value="Đăng nhập" onClick={onUserLogin} />
              </div>
              <div className="forgot-password-wrapper">
                <a className="forgot-password" href="/forgot-password">
                  Quên mật khẩu
                </a>
              </div>
              <div className="register-link">
                Bạn chưa có tài khoản ?
                <a href="/register">Đăng ký tài khoản mới</a>
              </div>
            </div>
          </div>
        </div>
      </Spin>
      <UserFooterLayout />
    </>
  )
}

export default React.memo(Login)
