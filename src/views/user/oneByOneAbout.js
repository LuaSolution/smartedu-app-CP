import React from 'react';
import UserHeaderLayout from 'components/users/UserHeaderLayout'
import UserFooterLayout from 'components/users/UserFooterLayout'
import 'assets/user/1by1-about.css'
import obobg from 'atoms/home/obobg.svg'
import pic1Obo from 'atoms/home/pic1-obo.webp'
import obo1 from 'atoms/home/obo1.webp'
import obo2 from 'atoms/home/obo2.webp'
import obo3 from 'atoms/home/obo3.webp'
import joinnow from 'atoms/home/obo-join-now.webp'

const OneByOneAbout = () => {
    return <>
        <UserHeaderLayout />
        <section id="banner-obo">
            <div className="obo-Intro-container" style={{ backgroundImage: `url(${obobg})` }}>
                <div className="container">
                    <div className=" obo-wapper">
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="obo-Intro-left">
                                    <div className="title">
                                        <span style={{ color: '#CC001B' }}>One-by-One </span>Live </div>
                                    <div className="subtitle"> Chào mừng các bạn đến với dịch vụ kết nối chuyên gia qua hệ thống One-by-One Live
                  của CP Learning Center </div>
                                    <div className="cnt"> Cơ hội gặp gỡ và thu nhận được những lời tư vấn có giá trị đến từ các chuyên gia hàng
                                    đầu Việt Nam và trên thế giới - những người luôn sẵn sàng chia sẻ kiến thức, kỹ năng và kinh nghiệm
                  cho bạn. </div>
                                    <div className="col-12 " onClick={() => {
                                        window.open('/experts', '_blank')
                                    }}>
                                        <div className="row btn"> Tìm chuyên gia ngay </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="obo-Intro-right">
                                    <img src={pic1Obo} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="main-obo">
            <div className="obo-Intro-container">
                <div className="container">
                    <div className=" obo-main">
                        <div className="row">
                            <div className="col-12">
                                <div className="top-small-text"> Kết nối với chuyên gia cực dễ </div>
                                <div className="top-lg-text"> Hãy bắt đầu với One-by-One Live của CP Learning Center </div>
                                <div className="des col-12">Chỉ cần làm vài thao tác đơn giản, có thể đặt lịch cho việc gặp gỡ và tư vấn trực
                                tiếp bằng hệ thống One-by-One Live của CP Learning Center cho dù bạn ở đâu hay chuyên gia mà bạn muốn ở bất kỳ nơi
                nào trên thế giới đều có thể kết nối cùng bạn </div>
                            </div>
                        </div>
                        <section>
                            <div className="row">
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                    <div className="obo-main-left">
                                        <div className="row step-wapper">
                                            <div className="col-4 ">
                                                <div className="step"> Bước 01 </div>
                                            </div>
                                            <div className="col-8"> Tạo tài khoản
                                            <span style={{ color: '#CC001B' }}> miễn phí</span> trên hệ thống </div>
                                        </div>
                                        <div className="row">
                                            <div className=" des-step col-12">Hệ thống CP Learning Center cho phép bạn tạo tài khoản miễn phí một cách nhanh
                      chóng, hãy tham gia ngay với chúng tôi. Tạo tài khoản ngay <a
                                                    href="https://smarte.edu.vn/register">tại đây</a> </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
                                    <div className="obo-main-right">
                                        <div className="row">
                                            <div className="col-12">
                                                <img src={obo1} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section>
                            <div className="row" style={{
                                display: 'flex',
                                flexDirection: 'row-reverse'
                            }}>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                    <div className="obo-main-left">
                                        <div className="row step-wapper">
                                            <div className="col-4 ">
                                                <div className="step"> Bước 02 </div>
                                            </div>
                                            <div className="col-8"> Tìm và chọn chuyên gia
                                            <span style={{ color: '#CC001B' }}> nhanh chóng </span> </div>
                                        </div>
                                        <div className="row">
                                            <div className=" des-step col-12">Vào "Tìm chuyên gia" trên menu để lựa chọn cho mình những chuyên gia
                      trong lĩnh vực mà mình cần</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
                                    <div className="obo-main-right">
                                        <div className="row">
                                            <div className="col-12">
                                                <img src={obo2} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section>
                            <div className="row">
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                    <div className="obo-main-left">
                                        <div className="row step-wapper">
                                            <div className="col-4 ">
                                                <div className="step"> Bước 03 </div>
                                            </div>
                                            <div className="col-8"> Đặt lịch tư vấn với
                                            <span style={{ color: '#CC001B' }}> thời gian linh hoạt</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className=" des-step col-12">
                                                Chuyên gia công khai lịch hỗ trợ, bạn có thể chọn khung thời gian phù hợp với bản thân để đặt lịch
                    </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
                                    <div className="obo-main-right">
                                        <div className="row">
                                            <div className="col-12">
                                                <img src={obo3} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section>
                            <div className="row" style={{
                                display: 'flex',
                                flexDirection: 'row-reverse'
                            }}>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                    <div className="obo-main-left">
                                        <div className="row step-wapper">
                                            <div className="col-4 ">
                                                <div className="step"> Bước 04 </div>
                                            </div>
                                            <div className="col-8"> Chờ
                                            <span style={{ color: '#CC001B' }}> xác nhận lịch </span>từ chuyên gia </div>
                                        </div>
                                        <div className="row">
                                            <div className=" des-step col-12">
                                                Chờ xác nhận từ chuyên gia và theo dõi thời gian hẹn đếm ngược
                    </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
                                    <div className="obo-main-right">
                                        <div className="row">
                                            <div className="col-12">
                                                <img src={obo2} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section>
                            <div className="row">
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                    <div className="obo-main-left">
                                        <div className="row step-wapper">
                                            <div className="col-4 ">
                                                <div className="step"> Bước 05 </div>
                                            </div>
                                            <div className="col-8"> Kết nối trực tuyến,
                                            <span style={{ color: '#CC001B' }}> trải nghiệm dịch vụ</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className=" des-step col-12">
                                                Hệ thống tự động kết nối trực tuyến bạn và chuyên gia qua hệ thống One-by-One Live của CP Learning Center
                      khi đến thời gian đã hẹn.</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
                                    <div className="obo-main-right">
                                        <div className="row">
                                            <div className="col-12">
                                                <img src={obo3} />
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
                                <div className="row" style={{ marginRight: 0, marginLeft: 0 }}>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div className="des">
                                            Bất kỳ khó khăn hay rắc rối nào của bạn đều có thể được giải quyết thông qua việc kết nối với những
                  chuyên gia trong nhiều lĩnh vựa khác nhau <b>MỌI NƠI, MỌI LÚC </b>đó là giải pháp không thể thiếu
                  trong nền kinh tế số 4.0.
                </div>
                                        <div className="btn" onClick={() => {
                                            window.open('/experts', '_blank')
                                        }}> Tìm chuyên gia ngay </div>

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
        <UserFooterLayout />
    </>
}

export default OneByOneAbout
