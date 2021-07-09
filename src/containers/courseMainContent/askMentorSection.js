import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { CourseContentCommentTab as CommentTab } from 'atoms'
import momentTime from 'helpers/moment'
import axios from 'helpers/axios'
import ChatModal from './askMentorModal'
import { Skeleton } from 'antd'
import { AVATAR_PATH } from 'defines'
import { connect } from 'react-redux'
import { initQAList, addToQAList } from 'redux/actions'

// const ALL = 0
const ONLYME = 1
// const pageSize = 4

const suspenseComponent = <div key={'comment-wrapper'}
    style={{ marginBottom: 20 }}
    className={'comment-wrapper first-item'}>
    <div className="comment-top">
        <div className="user-info">
            <div className="avatar"></div>
            <div className="date"><Skeleton.Input style={{ width: 200 }} active size='small' /></div>
        </div>
        <div className="comment-title"><Skeleton active size='small' /></div>
    </div>
    <div className="comment-bottom">
        <div className="reply"
            key={'comment-reply'}>
            <div className="reply-avatar" ></div>
            <div className="reply-body">
                <div className="reply-name">
                    <Skeleton.Input style={{ width: 200 }} active size='small' />
                </div>
                <div className="reply-content">
                    <Skeleton active size='small' title={false} paragraph={{ rows: 2 }} />
                </div>
            </div>
        </div>
    </div>
</div>

const AskMentor = ({ courseId, data, initQAList }) => {
    const [loading, setLoading] = useState(false)

    const fetchData = () => {
        if (courseId) {
            setLoading(true)
            const skip = data.length > 0 ? data.length : 0
            axios
                .get('qanda/paging/' + courseId + '/' + skip)
                .then((res) => {
                    if (res.data.status === 200) {
                        if (data.length > 0) {
                            initQAList([...res.data.data.reverse(), ...data])
                        } else {
                            initQAList(res.data.data.reverse())
                        }
                    }
                })
                .finally(() => setLoading(false))
        }
    }

    useEffect(() => {
        fetchData()
    }, [courseId])

    // const showMoreReply = (e) => {
    //     e.preventDefault()
    // }

    const loadOldQuestion = (e) => {
        e.preventDefault()
        fetchData()
    }

    return <div className="wrapper-content box-list-comment-course">
        <Select courseId={courseId} />
        <CommentTab className="qa-id tab-item-content">
            {data.length > 0 ? <a href="#" className="old-question" onClick={loadOldQuestion}>Câu hỏi cũ hơn</a>
                : <a href="#" className="old-question">Bạn chưa đặt câu hỏi</a>}
            {loading && suspenseComponent}
            {data.length > 0 && data.map((i, index) => (
                <div key={'comment-wrapper' + index}
                    className={index == 0 ? 'comment-wrapper first-item' : 'comment-wrapper'}>
                    <div className="comment-top">
                        <div className="user-info">
                            <div className="avatar"
                                style={{ backgroundImage: `url(${AVATAR_PATH + i.questioner_id + '.webp?' + Math.random()})` }}
                            ></div>
                            <div className="name">{i.first_name + ' ' + i.last_name}</div>
                            <div className="date">{momentTime(i.created_at)}</div>
                        </div>
                        <div className="comment-title">{i.question_title}</div>
                        <div className="comment-content">{i.question_content}</div>
                    </div>
                    <div className="comment-bottom">
                        {i.answer_content && i.status !== 0 && <div className="reply" >
                            <div className="reply-avatar"
                                style={{ backgroundImage: `url(${AVATAR_PATH + i.responder_id + '.webp?' + Math.random()})` }}></div>
                            <div className="reply-body">
                                <div className="reply-name">
                                    {i.responder_name}
                                </div>
                                <div className="reply-date">
                                    {momentTime(i.updated_at)}
                                </div>
                                <div className="reply-content">
                                    {i.answer_content}
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            ))}
        </CommentTab>
    </div>
}

const mapStateToProps = ({ QandA, courseContents }) => {
    const { courseId } = courseContents
    return { courseId, data: QandA }
}

const mapActionToProps = { initQAList, addToQAList }

export default connect(mapStateToProps, mapActionToProps)(React.memo(AskMentor))

const Select = ({ courseId }) => {
    const [option, setOption] = useState(ONLYME)

    // const chooseRadio = (e, optional = ONLYME) => {
    //     e.preventDefault()
    //     if (option !== optional) {
    //         if (!e.target.classList.contains('disabled')) {
    //             e.target.classList.toggle('active')
    //         }
    //         setOption(optional)
    //     }
    // }

    return <QATop className="qa-id tab-item-content">
        {/* <div className={option === ALL ? 'radio active' : 'radio'} onClick={e => chooseRadio(e, ALL)}
        >Xem tất cả</div> */}
        {/* <div className={option === ONLYME ? 'radio active' : 'radio'} onClick={e => chooseRadio(e, ONLYME)}>Chỉ câu hỏi của tôi</div> */}
        {courseId && <ChatModal courseId={courseId} />}
    </QATop>
}

const QATop = styled.div`
  position: relative;
  height: 53px;
  &.tab-item-content {
    display: none;
  }
  &.tab-item-content.active {
    display: block;
  }
  .radio {
    display: inline-block;
    padding-left: 44px;
    position: relative;
    line-height: 24px;
    cursor: pointer;
    margin-left: 50px;
    line-height: 53px;
  }
  .radio:first-child {
    margin-left: 0;
  }
  .radio::after,
  .radio.active::before {
    content: '';
    position: absolute;
    display: inline-block;
    border: 1px solid #0b46a9;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }
  .radio::after {
    width: 24px;
    height: 24px;
    top: calc(50% - 12px);
    left: 0;
  }
  .radio.active::before {
    width: 12px;
    height: 12px;
    top: calc(50% - 6px);
    left: 6px;
    background-color: #0b46a9;
  }
  .radio.disabled {
    color: #676e86;
  }
  .radio.disabled::after {
    border: 1px solid #676e86;
  }
  .radio.active.disabled::before {
    background-color: #676e86;
  }
  .create-new-question {
    background-color: #0b46a9;
    font-weight: 600;
    font-size: 18px;
    text-align: center;
    letter-spacing: 0.01em;
    color: #f7f7f7;
    width: 217px;
    height: 53px;
    border: 2px solid #0b46a9;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    position: absolute;
    right: 0;
    top: 0;
  }
`