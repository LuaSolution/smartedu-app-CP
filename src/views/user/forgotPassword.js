import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Result, Button, message } from 'antd'
import UserFooterLayout from 'components/users/UserFooterLayout'
import useFormInput from 'helpers/useFormInput'
import axios from 'helpers/axios'

import 'assets/user/ifa-forgot-password.css'
import 'assets/user/ifa-form.css'

const ForgotPassword = () => {
  const history = useHistory()
  const [isFinish, setFinish] = useState(false)
  const [err, setErr] = useState(false)
  const email = useFormInput('')

  useEffect(() => {
    if (localStorage.getItem('@token')) {
      history.push("/")
    }
  }, [history])

  const errClassname = err ? "ifa-form-control error" : "ifa-form-control"

  const resetPassword = () => {
    if (email.value !== '') {
      axios.post('reset-password/' + email.value)
        .then(res => {
          if (res.data.status === 200) {
            setFinish(true)
          } else {
            message.error(res.data.msg)
            setErr(true)
          }
        })
    } else {
      message.error('Vui lòng nhập email')
      setErr(true)
    }
  }

  return <>
    <div className="ifa-container form-page forgot-password-page">
      <div className="img">
        <img src={process.env.PUBLIC_URL + '/assets/img/web/forgot-password/1.webp'} alt="forgot-pass" />
      </div>
      <div className="form">
        <div className="comeback-link">
          <a href="/">Quay lại</a>
        </div>
        <div className="form-wrapper">
          {isFinish ? <Result
            status="success"
            title="Đã reset mật khẩu!"
            subTitle="Vui lòng kiểm tra hộp thư đến của bạn để lấy mật khẩu mới."
            extra={[
              <Button key="buy" onClick={() => window.location.href = '/login'}>Quay về trang đăng nhập</Button>,
            ]}
          />
            :
            <>
              <p className="title">Quên mật khẩu</p>
              <p className="sub-title">Nhập email của bạn để tiến hành khôi phục mật khẩu.</p>
              <div className={errClassname}>
                <p className="label">
                  Email*
                </p>
                <div className="input-group">
                  <input type="email" placeholder="Email của bạn" {...email} />
                </div>
              </div>
              <div className="ifa-submit-btn">
                <input type="submit" onClick={resetPassword} value="Khôi phục mật khẩu" />
              </div>
              <div className="register-link">
                <a href="/register">Đăng ký tài khoản mới</a>
              </div>
            </>}
        </div>
      </div>
    </div>
    <UserFooterLayout />
  </>
}

export default ForgotPassword
