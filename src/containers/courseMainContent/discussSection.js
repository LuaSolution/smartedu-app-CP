import React, { useState, useEffect } from 'react'
import { CourseContentCommentTab as CommentTab } from 'atoms'
import momentTime from 'helpers/moment'
import axios from 'helpers/axios'
import { Skeleton } from 'antd'
// import DiscussModal from './discussModal'
import { AVATAR_PATH } from 'defines'
import { connect } from 'react-redux'
import {
    initDiscussList,
    addReplyToDiscuss,
    addToDiscussList
} from 'redux/actions'

const suspenseComponent = <div key={'comment-wrapper'}
    style={{ marginBottom: 20 }}
    className={'comment-wrapper first-item'}>
    <div className="comment-top">
        <div className="user-info">
            <div className="avatar" ></div>
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

const _user = JSON.parse(localStorage.getItem('@current_user'))
const randomize = Math.random()

const Discuss = ({ courseId, data, initDiscussList, addReplyToDiscuss, addToDiscussList }) => {
    const [loading, setLoading] = useState(false)

    const fetchData = () => {
        if (courseId) {
            setLoading(true)
            const skip = data.length > 0 ? data.length : 0
            axios.get('discuss/paging/' + courseId + '/' + skip)
                .then(res => {
                    if (res.data.status === 200) {
                        if (data.length > 0) {
                            initDiscussList([...res.data.data.reverse(), ...data])
                        } else {
                            initDiscussList(res.data.data.reverse())
                        }
                    }
                })
                .finally(() => setLoading(false))
        }
    }

    useEffect(() => {
        fetchData()
    }, [courseId])

    const showMoreReply = e => {
        e.preventDefault()
        fetchData()
    }

    const sendReply = (event, parentId) => {
        var code = event.keyCode || event.which
        if (code === 13) {
            const content = document.getElementById('reply-' + parentId)
            if (content.value !== '') {
                const params = {
                    parent_id: parentId,
                    course_id: courseId,
                    content: content.value
                }
                addReplyToDiscuss(parentId, {
                    content: content.value,
                    user_id: _user.id,
                    first_name: _user.first_name,
                    last_name: _user.last_name,
                    created_at: null
                })
                content.value = ''

                axios.post('discuss/add-reply', params)
                    .then(res => {
                        if (res.data && res.data.status === 200) {
                            console.log('Đã reply')
                        }
                    })
            }
        }
    }

    const sendQuestion = event => {
        var code = event.keyCode || event.which
        if (code === 13) {
            const content = document.getElementById('add-new-discuss').value
            document.getElementById('add-new-discuss').value = ''
            if (content !== '') {
                axios.post('discuss/add', {
                    course_id: courseId,
                    content: content
                })
                    .then(res => {
                        if (res.data.status === 200) {
                            addToDiscussList({
                                id: res.data.data,
                                content: content,
                                user_id: _user.id,
                                first_name: _user.first_name,
                                last_name: _user.last_name,
                                replies: [],
                                created_at: null
                            })
                        }
                    })
            }
        }
    }

    return <div className="wrapper-content box-list-comment-course">
        <CommentTab className="comment-id tab-item-content">
            {data.length > 0 ? <a href="#" className="old-question" onClick={showMoreReply}>Xem thêm bình luận cũ hơn</a>
                : <a href="#" className="old-question">Chưa có cuộc thảo luận nào</a>}
            {loading && suspenseComponent}
            {data.length > 0 && data.map((i, index) => (
                <div className={index == 0 ? 'comment-wrapper first-item' : 'comment-wrapper'}
                    key={'comment-wrapper' + index} >
                    <div className="comment-top">
                        <div className="user-info">
                            <div className="avatar"
                                style={{ backgroundImage: `url(${AVATAR_PATH + i.user_id + '.webp?' + randomize})` }}
                            ></div>
                            <div className="name">{i.first_name + ' ' + i.last_name}</div>
                            <div className="date">{momentTime(i.created_at)}</div>
                        </div>
                        <div className="comment-content">{i.content}</div>
                    </div>
                    <div className="comment-bottom">
                        {i.replies.map((j, indexReplies) => (
                            <div className="reply" key={'comment-reply' + indexReplies}>
                                <div className="reply-avatar"
                                    style={{ backgroundImage: `url(${AVATAR_PATH + j.user_id + '.webp?' + randomize})` }}>
                                </div>
                                <div className="reply-body">
                                    <div className="reply-name">
                                        {j.first_name + ' ' + j.last_name}
                                    </div>
                                    <div className="reply-date">
                                        {momentTime(j.created_at)}
                                    </div>
                                    <div className="reply-content">
                                        {j.content}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="reply">
                            <div className="reply-avatar"
                                style={{ backgroundImage: `url(${AVATAR_PATH + _user.id + '.webp?' + randomize})` }}></div>
                            <div className="my-reply">
                                <input type="text" id={"reply-" + i.id} placeholder="Nhập câu trả lời của bạn (nhấn Enter để gửi)" onKeyPress={e => sendReply(e, i.id)} />
                            </div>
                        </div>
                        {/* <div className="reply">
                            <a href="" className="show-more-reply" onClick={showMoreReply} >Hiện thêm 24 trả lời</a>
                        </div> */}
                    </div>
                </div>
            ))}
            <div className='comment-wrapper first-item' style={{ marginTop: 40, borderTop: '1px solid #eee' }} >
                <div className="comment-bottom">
                    <div className="reply" style={{ marginLeft: 0 }}>

                        {_user && <div className="reply-avatar"
                            style={{ backgroundImage: `url(${AVATAR_PATH + _user.id + '.webp?' + randomize})` }}
                        ></div>}
                        <div className="my-reply">
                            <input type="text" id="add-new-discuss"
                                placeholder="Nhập câu trả lời của bạn (nhấn Enter để gửi)"
                                onKeyPress={sendQuestion}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </CommentTab>
    </div>

}

const mapStateToProps = ({ discusses, courseContents }) => {
    const { courseId } = courseContents
    return { courseId, data: discusses }
}

const mapActionToProps = { initDiscussList, addReplyToDiscuss, addToDiscussList }

export default connect(mapStateToProps, mapActionToProps)(React.memo(Discuss))