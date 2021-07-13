import React, { useState } from 'react'
import UserHeaderLayout from 'components/users/UserHeaderLayout'
import UserFooterLayout from 'components/users/UserFooterLayout'
import Banner1 from 'atoms/home/banner1.jpg'
import ItemUuDai from 'atoms/home/item-uu-dai.png'
import { Carousel } from 'antd';
import 'assets/user/bouns.scss'
import { ArrowRightOutlined, DownOutlined } from "@ant-design/icons";
import { toCurrency } from 'helpers/Utils'
import CountUp from 'react-countup'

const LuckyWheel = () => {
  const [activeMenu, setActiveMenu] = useState(1);

  return <>
    <UserHeaderLayout />
    <div className="box-list-uu-dai">
      <div className="slide-uu-dai-top">
        <Carousel className="box-slide" autoplay>
          <div className="item-slide-uu-dai">
            <img className="style-image-slide-1" src={Banner1} alt={""} />
          </div>
          <div className="item-slide-uu-dai">
            <img className="style-image-slide-1" src={Banner1} alt={""} />
          </div>
          <div className="item-slide-uu-dai">
            <img className="style-image-slide-1" src={Banner1} alt={""} />
          </div>
        </Carousel>
      </div>
      <div className="row-total-uu-dai">
        <button className="btn-total-uu-dai">Bạn nhận được
        {' '}{<CountUp end={8} duration={1.5} />}{' '}
        ưu đãi</button>
        <a>
          <button className="btn-xem-ngay">Xem ngay <ArrowRightOutlined /></button>
        </a>
      </div>
      {/* <div className="link-shortcut">
        <a href="#"><div className="item-shortcut highlight-item">Trang chủ <div className="highlight-item"><RightOutlined /></div></div></a>
        <a href="#"><div className="item-shortcut highlight-item">Ưu đãi <div className=""><RightOutlined /></div></div></a>
        <a href="#"><div className="item-shortcut">Qùa của tôi</div></a>
      </div> */}
      <div className="popup-title-top-uu-dai">
        Những phần quà hấp dẫn mà bạn đã đủ điều kiện nhận, hãy sử dụng ngay nhé !
      </div>
      <div className="box-list-uu-dai-item">
        <div className="title-list-uu-dai">
          Ưu đãi mới nhất
        </div>
        <div className="item-list-uu-dai">
          {[...Array(4)].map((x, i) =>
            <div className="item-uu">
              <a href="#">
                <div className="image-ud">
                  <img src={ItemUuDai} className="style-item-ud" alt={""} />
                </div>
                <div className="title-ud">
                  {'Ưu đãi ' + i}
                </div>
                <div className="description-ud">
                  {'Mô tả ngắn ' + i}
                </div>
                <div className="number-ud">
                  {toCurrency(i + 1000)}
                </div>
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="box-list-uu-dai-item">
        <div className="title-list-uu-dai">
          Tất cả các ưu đãi
        </div>
        <div className="list-filter-all-uu-dai">
          <div className={`item-filter ${activeMenu === 1 ? 'active' : ''}`} onClick={() => setActiveMenu(1)}>Tất cả</div>
          <div className={`item-filter ${activeMenu === 2 ? 'active' : ''}`} onClick={() => setActiveMenu(2)}>Khóa học Free</div>
          <div className={`item-filter ${activeMenu === 3 ? 'active' : ''}`} onClick={() => setActiveMenu(3)}>Live cùng chuyên gia</div>
          <div className={`item-filter ${activeMenu === 4 ? 'active' : ''}`} onClick={() => setActiveMenu(4)}>Trà sữa</div>
        </div>
        <div className="item-list-uu-dai">
          {[...Array(4)].map((x, i) =>
            <div className="item-uu">
              <a href="#">
                <div className="image-ud">
                  <img src={ItemUuDai} className="style-item-ud" alt={""} />
                </div>
                <div className="title-ud">
                  {'Ưu đãi ' + i}
                </div>
                <div className="description-ud">
                  {'Mô tả ngắn ' + i}
                </div>
                <div className="number-ud">
                  {toCurrency(i + 1000)}
                </div>
              </a>
            </div>
          )}
        </div>
        <button className="btn-load-more-uu-dai">
          Xem thêm <DownOutlined />
        </button>
      </div>
    </div>
    <UserFooterLayout />
  </>
}

export default LuckyWheel
