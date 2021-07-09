import React, { useState, useEffect } from 'react'
import axios from 'helpers/axios'
import momentTime from 'helpers/moment'
import { CommentContent, CommentWrapper, CommentReadmore, rating } from 'atoms'
import { Skeleton, Spin } from 'antd'
import { AVATAR_PATH } from 'defines'

const CommentSection = ({ courseId }) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  const fetchData = () => {
    setLoading(true)
    axios
      .get('courses/get-comment-ratings/' + courseId + '/' + data.length)
      .then(res => {
        const { data } = res
        if (data.status === 200) {
          setData(oldData => [...oldData, ...data.data])
        }
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (courseId) {
      fetchData()
    }
  }, [courseId]) // eslint-disable-line react-hooks/exhaustive-deps

  const showHide = (e) => {
    e.preventDefault()
    e.target.parentElement
      .querySelector('.content')
      .classList.toggle('show-all')
    e.target.classList.toggle('rotate')
  }

  return <>
    {data.length > 0 && data.map((item, index) => <CommentWrapper key={index}
      avatar={AVATAR_PATH + item.id + '.webp'}>
      <CommentContent>
        <div className="name">{item.first_name + ' ' + item.last_name}</div>
        <div className="list-star">
          {rating(item.rate)}
        </div>
        <div className="comment-time">
          Đã đánh giá {momentTime(item.created_at)}
        </div>
        <div className={item.rating_content.split(' ').length > 40 ? 'content hard-height' : 'content'}>
          {item.rating_content}
        </div>
        <a href="#" className={
          item.rating_content.split(' ').length > 40 ? 'show-more show' : 'show-more'}
          onClick={showHide}>
          Xem thêm
          </a>
      </CommentContent>
    </CommentWrapper>
    )}
    {loading && <Skeleton active avatar />}
    {data.length > 0 ? <Spin spinning={loading}>
      <CommentReadmore onClick={fetchData}>
        <span>Xem thêm nhận xét</span>
      </CommentReadmore>
    </Spin> : 'Chưa có nhận xét'}
  </>
}

export default React.memo(CommentSection)
