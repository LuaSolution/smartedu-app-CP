import React, { useState } from 'react';
import UserHeaderLayout from 'components/users/UserHeaderLayout'
import UserFooterLayout from 'components/users/UserFooterLayout'
import useFormInput from 'helpers/useFormInput'
import axios from 'helpers/axios'
import { Alert, notification } from 'antd'

import obobg from 'atoms/home/obobg.svg'
import pic1Obo from 'atoms/home/pic1-obo.webp'
import men1 from 'atoms/home/men-1.jpg'
import men2 from 'atoms/home/men-2.jpg'
import men3 from 'atoms/home/men-3.jpg'
import men4 from 'atoms/home/men-4.jpg'
import men5 from 'atoms/home/men-5.jpg'
import men6 from 'atoms/home/men-6.jpg'
import joinnow from 'atoms/home/obo-join-now.webp'
import Modal from 'react-bootstrap/Modal'
import wrong from 'atoms/home/wrong.svg'
import 'assets/user/ifa-home.css'
import 'assets/user/ifa-form.css'
import 'assets/user/expert-about.css'

const ExpertAbout = () => {
    const [show, setShow] = useState(false)
    const [_err, setErr] = useState(false)
    const name = useFormInput()
    const phone = useFormInput()
    const email = useFormInput()
    const content = useFormInput()
    const hocham = useFormInput()
    const hocvi = useFormInput()
    const tuvan = useFormInput()
    const giangday = useFormInput()
    const khac = useFormInput()

    const handleClose = () => setShow(false)

    const handleShow = () => setShow(true)

    const openNotificationWithIcon = (type = 'success') => {
        notification[type]({
            message: 'Thông báo từ CP Learning Center',
            description:
                'Đã gửi thông tin đến CP Learning Center, chúng tôi sẽ phản hồi cho bạn thông qua email hoặc số điện thoại, xin cảm ơn !',
        })
    }

    const submitConsulting = e => {
        e.preventDefault()
        if (name.value === ''
            || phone.value === ''
            || email.value === ''
            || content.value === '') {
            setErr(true)
        } else {
            const params = {
                name: name.value,
                phone: phone.value,
                email: email.value,
                content: content.value,
                hocham: hocham.value,
                hocvi: hocvi.value,
                tuvan: tuvan.value,
                giangday: giangday.value,
                khac: khac.value,
                type: 2
            }

            axios.post('add-form-consulting', params)

            setErr(false)
            handleClose()
            openNotificationWithIcon()
        }
    }

    return <>
        <UserHeaderLayout />
        <section id="banner-mentor">
            <div className="mentor-Intro-container" style={{ backgroundImage: `url(${obobg})` }}>
                <div className="container">
                    <div className=" mentor-wapper">
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="mentor-Intro-left">
                                    <div className="title"> Đăng ký trở thành chuyên gia với CP Learning Center </div>
                                    <div className="cnt"> Kính chào Quý Thầy Cô/Chuyên gia đến với trang đăng ký trở thành giảng viên và chuyên
                  gia của CP Learning Center, hệ thống giáo dục trực tuyến thuộc Viện Quản trị và Tài chính (IFA). </div>
                                    <div className="col-12 ">
                                        <div className="row btn" onClick={handleShow}> Trở thành chuyên gia</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="mentor-Intro-right">
                                    <img src={pic1Obo} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="main-mentor">
            <div className="mentor-Intro-container">
                <div className="container">
                    <div className=" mentor-main">
                        <div className="row" style={{ marginRight: 0, marginLeft: 0 }}>
                            <div className="col-12">
                                <div className="top-small-text"> Chia sẻ kiến thức đến cộng đồng </div>
                                <div className="top-lg-text"> Trở thành giảng viên/ chuyên gia của CP Learning Center thật đơn giản</div>
                                <div className="des col-12">Chỉ một vài thao tác đơn giản để đăng ký tạo tài khoản, Quý Thầy Cô/Chuyên gia sẽ
                                trở thành người chia sẻ và dẫn dắt sự thành công của cộng đồng doanh nghiệp, khởi nghiệp và sinh viên.
              </div>
                            </div>
                        </div>
                        <section>
                            <div className="row">
                                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                                    <div className="col-12 step-wapper ">
                                        <div className="pic-step ">
                                            <img src={men1} />
                                        </div>
                                        <div className="step num-step">
                                            Lợi ích 01
                  </div>
                                        <div className="mentor-main-left">
                                            <div className="title-step"> Chủ động, linh hoạt</div>
                                            <div className="row">
                                                <div className=" des-step col-12">
                                                    Chia sẻ những khóa học chuyên môn và kỹ năng của bạn một cách chủ động và linh hoạt dưới nhiều định dạng tài liệu</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                                    <div className="col-12 step-wapper ">
                                        <div className="pic-step">
                                            <img src={men2} />
                                        </div>
                                        <div className="step num-step">
                                            Lợi ích 02
                  </div>
                                        <div className="mentor-main-left">
                                            <div className="title-step"> Mọi lúc, mọi nơi
                    </div>
                                            <div className="row">
                                                <div className=" des-step col-12">
                                                    Quản lý số lượng và kết nối cùng học viên mỗi ngày, mỗi giờ, bất kỳ nơi đâu- không bị
                        ràng buộc bởi vị trí địa lý.</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                                    <div className="col-12 step-wapper ">
                                        <div className="pic-step">
                                            <img src={men3} />
                                        </div>
                                        <div className="step num-step">
                                            Lợi ích 03
                  </div>
                                        <div className="mentor-main-left">
                                            <div className="title-step">Hệ thống sẵn sàng
                    </div>
                                            <div className="row">
                                                <div className=" des-step col-12">
                                                    Thông qua hệ thống One-by-One Live, bạn có thể tư vấn, chia sẻ kinh nghiệm, kiến thức của mình
                        cho cộng đồng doanh nghiệp, khởi nghiệp và sinh viên.</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                                    <div className="col-12 step-wapper ">
                                        <div className="pic-step">
                                            <img src={men4} />
                                        </div>
                                        <div className="step num-step">
                                            Lợi ích 04
                  </div>
                                        <div className="mentor-main-left">
                                            <div className="title-step">Tăng thu nhập
                    </div>
                                            <div className="row">
                                                <div className=" des-step col-12">
                                                    Tạo ra thu nhập Thụ động thông qua việc chia sả các khóa học, các buổi học trực tuyến (Webinar)
                        và tư vấn qua hệ thống One-by-One Live.</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                                    <div className="col-12 step-wapper ">
                                        <div className="pic-step">
                                            <img src={men5} />
                                        </div>
                                        <div className="step num-step">
                                            Lợi ích 05
                  </div>
                                        <div className="mentor-main-left">
                                            <div className="title-step">Giờ giấc linh hoạt
                    </div>
                                            <div className="row">
                                                <div className=" des-step col-12">
                                                    Tận dụng tối đa và chủ động sắp xếp lịch với thời gian rảnh để tạo cơ hội cho học viên được đăng
                        ký tư vấn cùng giảng viên / chuyên gia. </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                                    <div className="col-12 step-wapper ">
                                        <div className="pic-step">
                                            <img src={men6} />
                                        </div>
                                        <div className="step num-step">
                                            Lợi ích 06
                  </div>
                                        <div className="mentor-main-left">
                                            <div className="title-step">Phụng sự
                    </div>
                                            <div className="row">
                                                <div className=" des-step col-12">
                                                    Chia sẻ kiến thức là một cách có ý nghĩa nhất nhằm giúp cho cộng đồng tìm ra giải pháp cho
                        sự phát triển bản thân, doanh nghiệp và xã hội.</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 ">
                        <div className="join-now">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div className="des">
                                        Trân trọng kính mời Quý Thầy Cô/Chuyên gia tham gia cộng đồng giáo dục trực tuyến trên hệ thống CP Learning Center để góp phần xây dựng hệ thống học tập MỌI NƠI, MỌI LÚC, MỌI LĨNH VỰC VÀ CHO MỌI NGƯỜI.
                  </div>
                                        <div className="btn" style={{ textAlign: 'center' }} onClick={handleShow}> Trở thành chuyên gia</div>

                                    </div>


                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 join-now-pic">
                                        <img src={joinnow} />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </section>
        <Modal show={show} onHide={handleClose} className="ifa-modal">
            <Modal.Body>
                <button className="ifa-popup-close-btn" onClick={handleClose} style={{ backgroundImage: `url(${wrong})` }}></button>
                <div className="form-page">
                    <div className="form-wrapper">
                        <p className="title">Đăng ký làm giảng viên / chuyên gia </p>
                        <p className="sub-title">Hãy để lại các thông tin cần thiết để tạo hồ sơ</p>
                        {_err && <Alert message="Vui lòng nhập đầy đủ thông tin" type="error" showIcon />}
                        <form onSubmit={submitConsulting}>
                            <div className="ifa-form-control">
                                <p className="label">
                                    Họ tên*
                </p>
                                <div className="input-group">
                                    <input {...name} placeholder="Nhập họ và tên" />
                                </div>
                            </div>
                            <div className="ifa-form-control">
                                <p className="label">
                                    Số điện thoại*
                </p>
                                <div className="input-group">
                                    <input {...phone} placeholder="Nhập số điện thoại" />
                                </div>
                            </div>
                            <div className="ifa-form-control">
                                <p className="label">Email*</p>
                                <div className="input-group">
                                    <input {...email} placeholder="Nhập email của bạn" />
                                </div>
                            </div>


                            <div className="ifa-form-control">
                                <p className="label">Học hàm*</p>
                                <div className="input-group">
                                    <input {...hocham} placeholder="Nhập học hàm của bạn" />
                                </div>
                            </div>
                            <div className="ifa-form-control">
                                <p className="label">Học vị*</p>
                                <div className="input-group">
                                    <input {...hocvi} placeholder="Nhập học vị của bạn" />
                                </div>
                            </div>
                            <div className="ifa-form-control">
                                <p className="label">Lĩnh vực tư vấn*</p>
                                <div className="input-group">
                                    <input {...tuvan} placeholder="Nhập lĩnh vực tư vấn" />
                                </div>
                            </div>
                            <div className="ifa-form-control">
                                <p className="label">Lĩnh vực giảng dạy*</p>
                                <div className="input-group">
                                    <input {...giangday} placeholder="Nhập Lĩnh vực giảng dạy" />
                                </div>
                            </div>
                            <div className="ifa-form-control">
                                <p className="label">Lĩnh vực khác</p>
                                <div className="input-group">
                                    <input {...khac} placeholder="Nhập lĩnh vực khác" />
                                </div>
                            </div>

                            <div className="ifa-form-control ifa-form-control-no-title">
                                <p className="label">
                                    Kinh nghiệm*
                </p>
                                <div className="input-group">
                                    <textarea placeholder="Kinh nghiệm giảng dạy" {...content} />
                                </div>
                            </div>
                            <div className="ifa-submit-btn">
                                <input type="submit" value="Gửi thông tin" />
                            </div>
                        </form>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
        <UserFooterLayout />
    </>
};

export default ExpertAbout
