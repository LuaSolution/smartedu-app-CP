import React from 'react'
import { connect } from 'react-redux'
import { changeLocale } from 'redux/actions'
// import { localeOptions } from 'defines'
// import {
//   UncontrolledDropdown,
//   DropdownItem,
//   DropdownToggle,
//   DropdownMenu
// } from 'reactstrap'
import 'assets/user/ifa-footer.css'
import { FacebookFilled, YoutubeFilled } from '@ant-design/icons'

const UserFooterLayout = ({ locale, changeLocale }) => {
  // const handleChangeLocale = _locale => {
  //   changeLocale(_locale)
  //   setTimeout(() => {
  //     window.location.reload()
  //   }, 500)
  // }

  return (
    <footer className="ifa-footer ">
      <div className="ifa-block-content container">
        <div className="block-1">
          <div className="list-logo">
            <div className="logo-1">
              <div className="smart-edu-logo">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/img/web/static/${
                    process.env.REACT_APP_BUILD_CODE === 'CP'
                      ? 'logo-cp.svg'
                      : 'logo.svg'
                  }`}
                  alt="logo"
                />
              </div>
              {process.env.REACT_APP_BUILD_CODE === 'IFA' && (
                <>
                  <p className="txt-1">
                    Thành viên của Viện Quản trị và Tài chính (IFA)
                  </p>
                  <p className="txt-2">
                    Hơn 15 năm dẫn đầu trong lĩnh vực Đào tạo - Huấn luyện - Tư
                    vấn
                  </p>
                </>
              )}
            </div>
            {process.env.REACT_APP_BUILD_CODE === 'IFA' && (
              <div className="logo-2">
                <img
                  src={process.env.PUBLIC_URL + '/assets/img/web/home/52.png'}
                  alt="logo"
                />
              </div>
            )}
          </div>
        </div>
        {/* <div className="block-2">
          <UncontrolledDropdown className={localStorage.getItem('currentLanguage') ? localStorage.getItem('currentLanguage') : 'vi'}>
            <DropdownToggle caret>
              <span className="name">
                {localeOptions.find(x => x.id === locale).name}
              </span>
            </DropdownToggle>
            <DropdownMenu >
              {localeOptions.map((l) => (
                <DropdownItem
                  onClick={() => handleChangeLocale(l.id)}
                  key={l.id}
                >
                  {l.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div> */}
      </div>
      <div className="ifa-block-content container ">
        <div className="block-3">
          {process.env.REACT_APP_BUILD_CODE === 'CP' ? (
            <div className="block-3a">
              <div className="main-place">
                <p className="title">Địa chỉ</p>
                <p className="content">
                  Số 2 đường 2A, KCN Biên Hòa II, P. Long Bình Tân, TP.Biên Hòa,
                  Tỉnh Đồng Nai, Việt Nam
                </p>
              </div>
            </div>
          ) : (
            <div className="block-3a">
              <div className="place">
                <p className="title">Trung tâm đào tạo</p>
                <p className="content">
                  307A Nguyễn Trọng Tuyển, P.10, Quận Phú Nhuận, TP.HCM
                </p>
              </div>
              <div className="main-place">
                <p className="title">Trụ sở chính</p>
                <p className="content">
                  60 Nguyễn Văn Thủ, Phường Đakao, Quận 1, TP.HCM
                </p>
              </div>
            </div>
          )}
          <div className="block-3b">
            <p className="email">
              {process.env.REACT_APP_BUILD_CODE === 'CP' ? (
                <a href="mailto:web-info@cp.com.vn">web-info@cp.com.vn</a>
              ) : (
                <a href="mailto:elearning@ifa.net.vn">elearning@ifa.edu.vn</a>
              )}
            </p>
            <p className="home-phone">
              {process.env.REACT_APP_BUILD_CODE === 'CP' ? (
                <a href="#">+84-0251 3836 251,252,...259</a>
              ) : (
                <a href="tel:+842866814320">028 66814320</a>
              )}
            </p>
            <p className="phone">
              {process.env.REACT_APP_BUILD_CODE === 'CP' ? (
                <a href="tel:+84-02513836086">+84-0251 3836 086</a>
              ) : (
                <a href="tel:+84942993979">094 2993979</a>
              )}
            </p>
          </div>
        </div>
        <div className="block-4">
          <div className="block-4a">
            <div className="txt">Liên hệ</div>
            <div className="list-social">
              <a
                href="https://www.facebook.com/vienquantrivataichinh"
                className="fb"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookFilled style={{ color: '#3b5998', fontSize: 36 }} />
              </a>
              <a
                href="https://www.youtube.com/channel/UCerbLbAYMvQPFAht1sieDCw"
                className="yt"
                target="_blank"
                rel="noopener noreferrer"
              >
                <YoutubeFilled style={{ color: '#c4302b ', fontSize: 36 }} />
              </a>
            </div>
          </div>
          {/* <div className="block-4b">
            <LazyImage
              src={process.env.PUBLIC_URL + '/assets/img/web/home/congthuong.png'} alt="logo" />
          </div> */}
        </div>
      </div>
      <div className="ifa-block-content copy-right">
        Copyright Ⓒ 2021{' '}
        <a href="/">
          <b>CP Learning Center Learning</b>
        </a>{' '}
        All Rights Reserved
      </div>
    </footer>
  )
}

const mapStateToProps = ({ settings }) => {
  const { locale } = settings
  return { locale }
}

const mapActionToProps = { changeLocale }

export default connect(mapStateToProps, mapActionToProps)(UserFooterLayout)
