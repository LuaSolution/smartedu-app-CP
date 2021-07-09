import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Spin, Drawer, Button, message, Alert } from 'antd'
import UserFooterLayout from 'components/users/UserFooterLayout'
import useFormInput from 'helpers/useFormInput'
import useFormNumber from 'helpers/useFormNumber'
import axios from 'helpers/axios'
import { LazyImage } from 'atoms/lazyImg'

import 'assets/user/ifa-register.css'
import 'assets/user/ifa-form.css'

const Register = () => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(null)
  const [checked, setCheck] = useState(false)
  const [visible, setVisible] = useState(false)

  const firstName = useFormInput()
  const lastName = useFormInput()
  const phone = useFormNumber()
  const email = useFormInput()
  const username = useFormInput()
  const password = useFormInput()

  const onClose = () => {
    setVisible(false)
  }

  useEffect(() => {
    if (localStorage.getItem('@token')) {
      history.push("/")
    }
  }, [history])

  const onRegisterUser = () => {
    if (username.value
      && password.value
      && firstName.value
      && lastName.value
      && phone.value
      && email.value
      && checked) {
      setLoading(true)
      axios
        .post('register', {
          first_name: firstName.value,
          last_name: lastName.value,
          phone: phone.value,
          email: email.value,
          username: username.value,
          password: password.value
        })
        .then(res => {
          if (res.data.status === 200) {
            message.success('Đăng ký tài khoản thành công !')
            history.push("/login")
          } else {
            message.error(res.data.msg)
            setErr(res.data.msg)
          }
        })
        .finally(() => setLoading(false))
    } else {
      setErr("Vui lòng nhập đầy đủ thông tin")
    }

    if (!checked) {
      setErr("Vui lòng đồng ý với các điều khoản")
    }
  }

  return <>
    <Spin spinning={loading} tip="Loading...">
      <div className="ifa-container form-page register-page">
        <div className="img">
          <LazyImage src={process.env.PUBLIC_URL + '/assets/img/web/login/1.webp'} alt="register" />
        </div>
        <div className="form">
          <div className="comeback-link">
            <a href="/">Quay lại</a>
          </div>
          <div className="form-wrapper">
            <p className="title">Đăng ký tài khoản cá nhân! </p>
            <p className="sub-title">Đối với mục đích học tập quy định, thông tin chi tiết của bạn là bắt buộc.</p>
            {err && <Alert message={err} type="error" showIcon style={{ marginTop: 15 }} />}
            <div className="ifa-form-control ifa-form-control-50">
              <p className="label">
                Họ*
                </p>
              <div className="input-group">
                <input placeholder="Họ và tên lót của bạn" {...firstName} />
              </div>
            </div>
            <div className="ifa-form-control ifa-form-control-50">
              <p className="label">
                Tên*
                </p>
              <div className="input-group">
                <input placeholder="Tên của bạn" {...lastName} />
              </div>
            </div>
            <div className="clearfix"></div>
            <div className="ifa-form-control">
              <p className="label">
                Số điện thoại*
                </p>
              <div className="input-group">
                <input placeholder="Số điện thoại của bạn" {...phone} />
              </div>
            </div>
            <div className="ifa-form-control">
              <p className="label">
                Email*
                </p>
              <div className="input-group">
                <input placeholder="Email của bạn" type="email" {...email} />
              </div>
            </div>
            <div className="ifa-form-control">
              <p className="label">
                Tên đăng nhập*
                </p>
              <div className="input-group">
                <input placeholder="Tên đăng nhập của bạn" {...username} />
              </div>
            </div>
            <div className="ifa-form-control">
              <p className="label">
                Mật khẩu*
                </p>
              <div className="input-group">
                <input type="password" placeholder="Mật khẩu" {...password} />
              </div>
            </div>
            <div className="custom-control custom-checkbox" onClick={() => setCheck(!checked)}>
              <input type="checkbox" className="custom-control-input" checked={checked} readOnly />
              <label className="custom-control-label" htmlFor="policy">
                Tôi đồng ý với
                    <span onClick={() => setVisible(true)}> điều khoản & chính sách</span>
              </label>
            </div>
            <div className="ifa-submit-btn">
              <input type="submit" value="Đăng ký" onClick={onRegisterUser} />
            </div>
            <div className="register-link">
              Bạn đã có tài khoản ?<a href="/login">Đăng nhập ngay</a>
            </div>
          </div>
        </div>
      </div>
    </Spin>
    <Drawer
      width={700}
      title={<h3><b>Điều khoản & chính sách</b></h3>}
      placement="left"
      onClose={onClose}
      visible={visible}
      footer={
        <div
          style={{
            textAlign: 'left',
          }}
        >
          <Button onClick={onClose} type="primary">
            Đồng ý
          </Button>
        </div>
      }
    >
      <p>
        Đối với mục đích học tập quy định, thông tin chi tiết của bạn là bắt buộc.
      </p>
    </Drawer>
    <UserFooterLayout />
  </>
}

export default Register
