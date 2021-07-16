import React, { useState, useEffect } from 'react'
import UserHeaderLayout from 'components/users/UserHeaderLayout'
import UserFooterLayout from 'components/users/UserFooterLayout'
import bgNewsElearning from 'atoms/home/bgNewsElearning.svg'
import axios from 'helpers/axios'
import momentTime from 'helpers/moment'
import { Skeleton, Typography, Drawer, Card } from 'antd'
import { IMG_ERROR, NEWS_PATH } from 'defines'
import detectMobile from 'helpers/detectMobile'
import { NyanCatSpinner as Spin } from 'atoms'
import 'assets/user/news.css'
import 'assets/user/ifa-home.css'

const { Paragraph } = Typography
const pageSize = 8
const rand = Math.random()

const NewsPage = (props) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [detail, setDetail] = useState(null)
  const [loadingDetail, setLoadingDetail] = useState(false)

  useEffect(() => {
    const editId = new URLSearchParams(props.location.search).get('p')
    if (editId) {
      onOpenDrawer(editId)
    }
  }, [props.location.search])

  const fetchData = () => {
    setLoading(true)
    axios
      .get('tin-tuc/paging/' + data.length)
      .then((res) => {
        if (res.data.status === 200) {
          setData([...data, ...res.data.data])
        }
      })
      .finally(() => setLoading(false))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onOpenDrawer = (id) => {
    setVisible(true)
    setLoadingDetail(true)
    axios
      .get('tin-tuc/get-info/' + id)
      .then((res) => {
        return res.data
      })
      .then((data) => {
        setDetail(data)
      })
      .finally(() => setLoadingDetail(false))
  }

  const onCloseDrawer = () => {
    setDetail(null)
    setVisible(false)
  }

  const renderDetail = (item) => {
    return (
      <Card>
        <div
          style={{
            borderRadius: 5,
            width: '100%',
            height: 300,
            backgroundImage: `url(${NEWS_PATH + item.id + '.webp?' + rand})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            marginBottom: 15,
          }}
        ></div>
        <h3
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            margin: '50px 0',
          }}
        >
          {item.title}
        </h3>
        <div
          dangerouslySetInnerHTML={{ __html: item.content }}
          style={{ margin: 0 }}
        />
      </Card>
    )
  }

  return (
    <>
      <UserHeaderLayout />
      <div className="ifa-body-wrapper">
        <div
          className="ifa-container ifa-news-elearning"
          style={{
            backgroundImage: `url(${bgNewsElearning})`,
            marginTop: 0,
            paddingTop: 50,
          }}
        >
          <div className="container ifa-container ifa-news-block">
            <div className="ifa-block-content container">
              <p className="top-small-text">Liên tục những hoạt động sôi nổi</p>
              <p className="top-lg-text">Tin tức - Sự kiện</p>
              <Spin spinning={loading}>
                <div className="row list-news">
                  {data &&
                    data.map((item, index) => (
                      <div
                        className="col-lg-4 col-md-12"
                        key={index}
                        style={{ marginBottom: 15 }}
                      >
                        <div
                          className="item ifa-item"
                          style={{ border: '1px solid #eee' }}
                        >
                          <a href={'/news?p=' + item.id}>
                            <div
                              className="img"
                              style={{
                                borderTopLeftRadius: 5,
                                borderTopRightRadius: 5,
                                height: 200,
                                backgroundImage: `url(${
                                  NEWS_PATH + item.id + '.webp?' + rand
                                })`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                              }}
                            ></div>
                            <div className="content">
                              <div className="status-wrapper">
                                <span className="pos">Đã đăng | </span>
                                <span className="status comming">
                                  {momentTime(item.created_at)}
                                </span>
                              </div>
                              <div className="title">
                                <Paragraph ellipsis={{ rows: 3 }}>
                                  {item.title}
                                </Paragraph>
                              </div>
                              <div className="description">{item.s_des}</div>
                            </div>
                          </a>
                        </div>
                      </div>
                    ))}
                </div>
              </Spin>
              {!loading && (
                <div className="btn-load-more-expert" style={{ marginTop: 40 }}>
                  <button onClick={fetchData}>Xem thêm</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Drawer
        width={'100%'}
        placement="right"
        closable={true}
        onClose={onCloseDrawer}
        visible={visible}
      >
        {loadingDetail ? <Skeleton /> : detail ? renderDetail(detail) : null}
      </Drawer>
      <UserFooterLayout />
    </>
  )
}

export default NewsPage
