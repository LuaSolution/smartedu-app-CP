import React, { useState, useEffect } from 'react'
import UserHeaderLayout from 'components/users/UserHeaderLayout'
import UserFooterLayout from 'components/users/UserFooterLayout'
import { SearchOutlined, SlidersOutlined, MenuFoldOutlined } from "@ant-design/icons";
import iconMu from 'atoms/home/icon-mu.svg'
import iconList from 'atoms/home/icon-position.svg'
import iconSchool from 'atoms/home/icon-truong.svg'
import { Carousel, message, Spin } from "antd";
import Banner1 from 'atoms/home/banner-1.webp'
import Banner2 from 'atoms/home/banner-2.webp'
import Banner3 from 'atoms/home/banner-3.webp'
import axios from 'helpers/axios';
import { NoData } from 'atoms';
import { AVATAR_PATH } from 'defines'
import 'assets/user/expert.scss'
import 'assets/user/bouns.scss'

const Expert = () => {
  const [loading, setLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [data, setData] = useState([]);
  const [fields, setFields] = useState([
    { id: 1, title: 'Kinh tế' },
    { id: 2, title: 'Tài chính' },
    { id: 3, title: 'Kế toán' },
    { id: 4, title: 'Nhân sự' }]);

  const fetchData = () => {
    setLoading(true)
    axios.get('get-mentors/paging/' + data.length)
      .then(res => {
        if (res.data.status === 200) {
          if (res.data.data.length > 0) {
            setData(oldData => [...oldData, ...res.data.data])
          } else {
            message.info('Đã hết dữ liệu!')
          }
        }
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchData()
  }, []);

  return <>
    <UserHeaderLayout />
    <div className="btn-show-menu-mobile-left" onClick={() => setShowFilter(!showFilter)}><MenuFoldOutlined /></div>
    <div className="slide-uu-dai-top">
      <Carousel className="box-slide" autoplay>
      <div className="item-slide-uu-dai">
          <img className="style-image-slide-1" src={Banner1} alt={""} />
        </div>
        <div className="item-slide-uu-dai">
          <img className="style-image-slide-1" src={Banner2} alt={""} />
        </div>
        <div className="item-slide-uu-dai">
          <img className="style-image-slide-1" src={Banner3} alt={""} />
        </div>
      </Carousel>
    </div>
    <div className="box-expert-user container">
      <div className={`box-filter-linh-vuc-left-expert box-fixed-expert ${showFilter ? 'show-menu-left' : ''}`}>
        <div className="title-linh-vuc">
          Lĩnh vực
        </div>
        <div className='list-linh-vuc-filter'>
          {fields.map((item, index) => {
            return <div className="input-check-box-filter" key={index}>
              <input type="checkbox" className="input-checkbox-filter" />
              <label htmlFor="checkbox-1" className="label-input-check">{item.title}</label>
            </div>
          })}
        </div>
      </div>
      <div className="box-list-chuyen-gia">
        <div className="row-header-filter">
          <div className="box-input-search-name">
            <input placeholder="Tìm chuyên gia" className="input-search-name" />
            <div className="icon-search">
              <SearchOutlined />
            </div>
          </div>
          <div className="box-select-filter-price">
            <select className="select-option-filter" id="select-filter">
              <option>Phí tư vấn: Thấp - Cao</option>
              <option>Phí tư vấn: Cao - Thấp</option>
            </select>
            <label className="icon-filter" htmlFor="select-filter">
              <SlidersOutlined />
            </label>
          </div>
        </div>
        <Spin spinning={loading}>
          <div className="list-item-chuyen-gia">

            {data.length > 0 ? data.map((item, i) =>
              <div className="item-chuyen-gia" key={i} onClick={() => {
                window.open('/expert-detail/' + item.id, '_blank')
              }}>
                <div className="row-1-chuyen-gia">
                  <div className="image-avatar">
                    <img src={AVATAR_PATH + item.id + '.webp'} alt="" className="style-image-avatar" />
                  </div>
                  <div className="box-title-header">
                    <div className="title-name">{item.first_name + ' ' + item.last_name}</div>
                    {item.position && <div className="description-name">
                      <img src={iconMu} alt="image" className="style-image-mu" />
                      {' ' + item.position}
                    </div>
                    }
                  </div>
                </div>
                <div className="row-2-chuyen-gia">
                  <div className="total-people-connect">0 người đã kết nối</div>
                </div>
                <div className="row-3-chuyen-gia">
                  <div className="faculty-chuyen-gia">
                    <div className="box-icon-list">
                      <img src={iconList} className="icon-list" alt={""} />
                    </div>
                    {item.department}
                  </div>
                </div>
                <div className="row-4-chuyen-gia">
                  <div className="school-chuyen-gia">
                    <div className="box-icon-school">
                      <img src={iconSchool} className="icon-school" alt={""} />
                    </div>
                    {item.partner}
                  </div>
                </div>
                <div className="row-5-chuyen-gia">
                  <div className="school-chuyen-gia">
                    {/* <span className="discount-number">0.000 đ</span> */}
                    <span className="price-number">Tư vấn miễn phí</span>
                  </div>
                </div>
              </div>)
              : <NoData />}
            <div className="item-chuyen-gia display-visibility" />
            <div className="item-chuyen-gia display-visibility" />
            <div className="item-chuyen-gia display-visibility" />
          </div>
          <div className='btn-load-more-expert'>
            <button onClick={fetchData}>Xem thêm</button>
          </div>
        </Spin>
      </div>
    </div>
    <UserFooterLayout />
  </>
}

export default Expert
