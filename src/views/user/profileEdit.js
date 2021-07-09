import React, { useState, useEffect } from 'react'
import UserHeaderLayout from 'components/users/UserHeaderLayout'
import UserFooterLayout from 'components/users/UserFooterLayout'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import {
  UserProfileWrapper as Wrapper
} from 'atoms'
import { Modal, Form, DatePicker, Spin, message, } from 'antd'
import 'assets/user/ifa-profile.css'
import { LockOutlined } from '@ant-design/icons'
import { AVATAR_PATH, userLevelVN } from 'defines'
import moment from 'moment'
import axios from 'helpers/axios'
import useFormInput from 'helpers/useFormInput'
import useFormNumber from 'helpers/useFormNumber'
import detectMobile from 'helpers/detectMobile'

const randomize = Math.random()

const ProfilePage = props => {
  const [loading, setLoading] = useState(false)
  const [modalLoading, setModalLoading] = useState(false)
  const [id, setId] = useState(null)

  const name = useFormInput()
  const description = useFormInput()
  const username = useFormInput()
  const phone = useFormNumber()
  const email = useFormInput()
  const birthday = useFormInput()
  const gender = useFormInput()
  const address = useFormInput()
  const job = useFormInput()
  const level = useFormInput()
  const partner = useFormInput()
  const position = useFormInput()
  const staffId = useFormInput()
  const department = useFormInput()

  const passwd = useFormInput()
  const confirmPasswd = useFormInput()

  useEffect(() => {
    setLoading(true)
    const _user = JSON.parse(localStorage.getItem('@current_user'))
    setId(_user.id)
    axios.get('get-user-info/' + _user.id)
      .then(res => {
        if (res.data.status === 200) {
          const data = res.data.data
          name.setValue(data.first_name + ' ' + data.last_name)
          description.setValue(data.description)
          username.setValue(data.username)
          phone.setValue(data.phone)
          email.setValue(data.email)
          birthday.setValue(data.birthday)
          gender.setValue(data.gender)
          address.setValue(data.address)
          job.setValue(data.job)
          level.setValue(data.level)
          partner.setValue(data.partner)
          position.setValue(data.position)
          staffId.setValue(data.staff_id)
          department.setValue(data.department)
        }
      })
      .finally(() => setLoading(false))

  }, [props.location.search])

  const chooseProfileAvatar = e => {
    e.preventDefault()
    document.getElementsByClassName('avatar-img-picker')[0].click()
  }
  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })

  const finishChooseAvatar = async e => {
    e.preventDefault()
    const img = await toBase64(e.target.files[0])
    document.getElementsByClassName('avatar-img')[0].style.backgroundImage = `url(${img})`

    axios.post('users/upload-avatar', {
      image: img,
      type: 1
    })
      .then(res => {
        if (res.data.status === 200) {
          console.log('uploaded')
        }
      })
  }
  const chooseProfileCover = e => {
    e.preventDefault()
    document.getElementsByClassName('cover-img-picker')[0].click()
  }
  const finishChooseCover = async e => {
    e.preventDefault()
    const img = await toBase64(e.target.files[0])
    document.getElementsByClassName('profile-cover')[0].style.backgroundImage = `url(${img})`
    axios.post('users/upload-avatar', {
      image: img,
      type: 2
    })
      .then(res => {
        if (res.data.status === 200) {
          console.log('uploaded')
        }
      })
  }
  const changeToTextbox = e => {
    e.preventDefault()
    e.target.classList.add('d-none')
    e.target.closest(".change-to-textbox").querySelector('.textbox-area').classList.remove('d-none')
  }
  const closeDescriptionForm = e => {
    e.target.closest(".textbox-area").classList.add('d-none')
    e.target.closest(".description").querySelector('.description-link').classList.remove('d-none')
  }
  const cancelDescription = e => {
    e.preventDefault()
    closeDescriptionForm(e)
  }
  const saveDescription = e => {
    e.preventDefault()
    updateInfo('description', description.value)
    closeDescriptionForm(e)
  }

  const showInput = e => {
    e.preventDefault()
    e.target.closest(".info-value-block").querySelector("span").classList.add('d-none')
    e.target.closest(".info-value-block").querySelector(".info-value-input").classList.add('active')
    e.target.closest(".info-value-block").querySelector(".info-value-input").focus()
  }

  const updateInfo = (field, value) => {
    axios.post('users/update-by-field', { field, value })
      .then(res => {
        if (res.data.status === 200) {
          console.log('updated !')
        } else {
          message.error(res.data.msg)
        }
      })
  }

  const hideInput = (e, field, value) => {
    e.preventDefault()
    if (e.target.value === '') return
    e.target.closest(".info-value-block").querySelector("span").innerHTML = e.target.value
    e.target.closest(".info-value-block").querySelector("span").classList.remove('d-none')
    e.target.classList.remove('active')

    updateInfo(field, value)
  }

  const changePassWord = () => {
    setVisible(true)
  }

  const hideModal = () => {
    setVisible(false)
    passwd.setValue(null)
    confirmPasswd.setValue(null)
  }

  const saveModal = () => {
    if (passwd.value.length < 6) {
      message.error('Mật khẩu tối thiểu 6 ký tự')
    } else if (passwd.value !== confirmPasswd.value) {
      message.error('Mật khẩu xác nhận không trùng khớp')
    }
    else {
      setModalLoading(true)
      axios.post('users/update-by-field', { field: 'password', value: passwd.value })
        .then(res => {
          if (res.data.status === 200) {
            message.success('Thay đổi mật khẩu thành công !')
            hideModal()
          }
        })
        .finally(() => setModalLoading(false))
    }
  }

  const [visible, setVisible] = useState(false)

  return <>
    <UserHeaderLayout />
    <Spin spinning={loading} size='large' tip="Đang tải thông tin người dùng...">
      <Wrapper className="ifa-body-wrapper">
        <div className="ifa-container user-profile">
          <div className="ifa-block-content">
            <div className="profile-cover" style={{ backgroundImage: `url(${AVATAR_PATH + id + '-cover.webp?' + randomize})` }}>
              <div className="avatar-block">
                <input type="file" name="avatar" className="avatar-img-picker" accept="image/*"
                  onChange={finishChooseAvatar} />
                <div className="avatar-img" onClick={chooseProfileAvatar}
                  style={{ backgroundImage: `url(${AVATAR_PATH + id + '.webp?' + randomize})` }}>
                </div>
              </div>
             <div className="cover-block">
                <input type="file" name="cover" className="cover-img-picker" accept="image/*"
                  onChange={finishChooseCover} />
                <button className="change-cover-button" onClick={chooseProfileCover}>Đổi ảnh bìa</button>
              </div>}
            </div>
            <div className="user-information">
              <div className="fullname info-block">
                <div className="info-value-block" onClick={showInput}>
                  <span>{name.value}</span>
                  <input type="text" className="info-value-input" {...name}
                    onBlur={e => hideInput(e, 'name', name.value)} />
                </div>
              </div>
              <div className="description change-to-textbox">
                <a href="#!" onClick={changeToTextbox} className="description-link">{description.value || 'Thêm mô tả cá nhân'}</a>
                <div className="textbox-area d-none">
                  <textarea placeholder="Mô tả về bạn" {...description}></textarea>
                  <div className="list-button">
                    <DropdownButton id="dropdown-item-button" title="Công khai">
                      <Dropdown.Item as="button">Công khai</Dropdown.Item>
                      {/* <Dropdown.Item as="button">Cá nhân</Dropdown.Item> */}
                    </DropdownButton>
                    <div className="right-button cancel-description" onClick={cancelDescription}>Hủy</div>
                    <div className="right-button save-description" onClick={saveDescription}>Lưu</div>
                  </div>
                </div>
              </div>
              {/* <div className="barcode" >
                <QRCode value={window.location.href} size={140} />
              </div> */}
              {/* <div className="invite-block">
                <Typography.Paragraph className="invite-txt" copyable={{ text: window.location.href + '?p=' + id }}>Copy link profile tại đây</Typography.Paragraph>
              </div> */}
              <div className="list-info">
                <div className="list-info-change-pw info-block">
                  <div className="info-value-block">
                    <span className="info-value-block" onClick={changePassWord}>Đổi mật khẩu</span>
                  </div>
                </div>
                <div>
                  <div className="info-block hide-icon user">
                    <div className="info-label">Tên đăng nhập*</div>
                    <div className="info-value-block">
                      <span>{username.value}</span>
                    </div>
                  </div>
                  <div className="info-block hide-icon user">
                    <div className="info-label">Mã nhân viên*</div>
                    <div className="info-value-block" >
                      <span>{staffId.value}</span>
                    </div>
                  </div>
                  <div className="info-block phone">
                    <div className="info-label">Số điện thoại*</div>
                    <div className="info-value-block" onClick={showInput}>
                      <span>{phone.value || 'Thêm số điện thoại'}</span>
                      <input type="text" className="info-value-input" {...phone} onBlur={e => hideInput(e, 'phone', phone.value)} />
                    </div>
                  </div>
                  <div className="info-block mail">
                    <div className="info-label">Email*</div>
                    <div className="info-value-block" onClick={showInput}>
                      <span>{email.value}</span>
                      <input type="text" className="info-value-input" {...email} onBlur={e => hideInput(e, 'email', email.value)} />
                    </div>
                  </div>
                  <div className="info-block birthday">
                    <div className="info-label">Ngày sinh*</div>
                    <DatePicker
                      style={{ backgroundColor: '#eee', fontWeight: 'bold' }}
                      value={birthday.value ? moment(birthday.value) : null}
                      onChange={(date, dateStr) => {
                        birthday.setValue(dateStr)
                        updateInfo('birthday', dateStr)
                      }}
                      placeholderText="Chọn ngày sinh"
                    />
                  </div>
                  <div className="info-block hide-icon gender">
                    <div className="info-label">Giới tính*</div>
                    <div className="info-value-block">
                      <input type="radio" checked={gender.value == 1}
                        onChange={e => {
                          if (gender.value !== 1) {
                            gender.setValue(1)
                            updateInfo('gender', 1)
                          }
                        }} />
                      {' '}<span >Nam</span>
                      <input type="radio" checked={gender.value == 2}
                        onChange={e => {
                          if (gender.value !== 2) {
                            gender.setValue(2)
                            updateInfo('gender', 2)
                          }
                        }}
                        style={{ marginLeft: 10 }} />
                      {' '}<span >Nữ</span>
                    </div>
                  </div>
                  <div className="info-block address">
                    <div className="info-label">Địa chỉ hiện tại*</div>
                    <div className="info-value-block" onClick={showInput}>
                      <span>{address.value || 'Thêm địa chỉ'}</span>
                      <input {...address} className="info-value-input" onBlur={e => hideInput(e, 'address', address.value)} />
                    </div>
                  </div>
                  <div className="info-block pro">
                    <div className="info-label">Nghề nghiệp*</div>
                    <div className="info-value-block" onClick={showInput}>
                      <span>{job.value || 'Thêm nghề nghiệp'}</span>
                      <input type="text" className="info-value-input" {...job} onBlur={e => hideInput(e, 'job', job.value)} />
                    </div>
                  </div>
                  <div className="info-block company">
                    <div className="info-label">Tên công ty*</div>
                    <div className="info-value-block" onClick={showInput}>
                      <span>{partner.value}</span>
                      <input type="text" className="info-value-input"
                        {...partner} onBlur={e => hideInput(e, 'partner', partner.value)} />
                    </div>
                  </div>
                  <div className="info-block pos">
                    <div className="info-label">Chức vụ*</div>
                    <div className="info-value-block" onClick={showInput}>
                      <span>{position.value}</span>
                      <input type="text" className="info-value-input" {...position}
                        onBlur={e => hideInput(e, 'position', position.value)} />
                    </div>
                  </div>
                  <div className="info-block department">
                    <div className="info-label">Bộ phận*</div>
                    <div className="info-value-block" onClick={showInput}>
                      <span>{department.value}</span>
                      <input type="text" className="info-value-input" {...department}
                        onBlur={e => hideInput(e, 'department', department.value)} />
                    </div>
                  </div>
                  <div className="info-block hide-icon department">
                    <div className="info-label hide-icon">Phân quyền*</div>
                    <div className="info-value-block" >
                      <span>{userLevelVN[level.value]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </Spin>
    <Modal
      visible={visible}
      centered
      onCancel={hideModal}
    >
      <Spin spinning={modalLoading}>
        <div className="modalinfo" id="modalinfo">
          <h2>Thay đổi mật khẩu</h2>
          <Form
            name="info"
          >
            <div className="modalinfo--info">
              {/* <div className="modalinfo--info-field">
              <div>
                <UserOutlined />
                <span className="text">Tên đăng nhập</span>
              </div>
              <input />
            </div> */}

              <div className="modalinfo--info-field">
                <div>
                  <LockOutlined />
                  <span className="text">Mật khẩu mới</span>
                </div>
                <input type="password" {...passwd} />
              </div>
              <div className="modalinfo--info-field">
                <div>
                  <LockOutlined />
                  <span className="text">Nhập lại mật khẩu</span>
                </div>
                <input type="password" {...confirmPasswd} />
              </div>
            </div>
            <div className="modalinfo--action">
              <button type="button" className="cancel" onClick={hideModal}>Hủy</button>
              <button onClick={saveModal}>Lưu</button>
            </div>
          </Form>
        </div>
      </Spin>
    </Modal>
    <UserFooterLayout />
  </>
}

export default ProfilePage