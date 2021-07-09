import React, { useEffect, useRef, useState } from "react"
import io from "socket.io-client"
import { Input, message as SystemMessage, notification, } from "antd"
import { CommentOutlined, MinusSquareOutlined, TeamOutlined } from "@ant-design/icons"
import BoxChatListUserOnline from './listUserOnline'
import BoxChatListUser from './liveChat'
import { connect } from 'react-redux'
import { AVATAR_PATH, CHAT_SOCKET } from "defines"
import { Avatar } from "atoms"
import './styleBoxChatUser.scss'
import useFormInput from "helpers/useFormInput"

const { Search } = Input

const _user = localStorage.getItem('@current_user') && JSON.parse(localStorage.getItem('@current_user'))
const id = _user && _user.id
const name = _user && _user.first_name + ' ' + _user.last_name
const socketServer = CHAT_SOCKET
const renderAvatar = id => {
  return <Avatar src={AVATAR_PATH + id + '.webp'} height={40} borderRadius={40} />
}

const BoxChatSection = ({ courseId, mentorId }) => {
  const [boxShowLeft, setBoxShowLeft] = useState(false)
  const [tabChatListUser, setTabChatListUser] = useState(1)
  const [conversationId, setConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  const notifyAll = useFormInput()
  const socketRef = useRef()

  useEffect(() => {
    if (courseId) {
      console.log('live chat rendered')
      setConversation(courseId)

      //define all socket event
      socketRef.current = io.connect(socketServer)

      socketRef.current.on('get_data_list', data => {
        setUsers(data)
      })
      socketRef.current.emit('subscribe', {
        id: id,
        name: name,
        room: courseId
      })

      socketRef.current.on('private_channel', data => {
        console.log(data)
        receivedMessage(data)
      })

      socketRef.current.on('receive_notify', data => {
        console.log(data)
        receivedNortify(data)
      })

      socketRef.current.on('add_new_user', data => {
        console.log(data)
        addUser(data)
      })

      socketRef.current.on('remove_user', data => {
        console.log(data) //socket id
        removeUser(data)
        // setUsers(_users)
      })
    }
  }, [courseId]);

  const addUser = user => {
    setUsers(oldState => [user, ...oldState])
    SystemMessage.success(user.name + ' đã tham gia')
  }

  const removeUser = socket => {
    setUsers(oldState => [...oldState.filter(i => i.socket !== socket)])
  }

  const receivedMessage = data => {
    setMessages(oldMsgs => [...oldMsgs, { sender: data.sender, message: data.message }])
  }

  const receivedNortify = data => {
    notification.open({
      duration: null,
      message: 'Thông báo từ giảng viên',
      description: data.message,
      icon: renderAvatar(data.sender)
    })
  }

  const sendMessage = () => {
    const message = document.getElementById('my-message').value.trim()
    if (message !== '') {
      socketRef.current.emit("send_message", {
        sender: id,
        room: conversationId,
        message: message
      })
      setMessages(oldMsgs => {
        const _oldMsgs = [...oldMsgs]
        if (oldMsgs.length > 1000) {
          _oldMsgs.splice(0, 500)
        }
        return [..._oldMsgs, { sender: id, message }]
      })
    }
    document.getElementById('my-message').value = ''
  }

  const pressSendMessage = e => {
    if (e.key == 'Enter' && !e.shiftKey) {
      sendMessage()
    }
  }

  const sendReaction = reaction => {
    if (reaction) {
      socketRef.current.emit("send_message", {
        sender: id,
        room: conversationId,
        message: reaction
      })
      setMessages(oldMsgs => {
        const _oldMsgs = [...oldMsgs]
        if (oldMsgs.length > 1000) {
          _oldMsgs.splice(0, 500)
        }
        return [..._oldMsgs, { sender: id, message: reaction }]
      })
    }
  }

  const sendNotify = () => {
    notifyAll.setValue(notifyAll.value.trim())
    if (notifyAll.value !== '') {

      socketRef.current.emit("send_notify", {
        sender: id,
        room: conversationId,
        message: notifyAll.value
      })

      notifyAll.setValue(null)
    }
  }

  return <>
    <div className={`box-chat-user ${boxShowLeft ? 'active-list-user' : ''}`}>
      <div className="box-main-center-chat">
        <div className="list-icon-top">
          <div className="item-style-chat item-list-user">
            <div className="image-box-icon" onClick={() => {
              setBoxShowLeft(true);
              setTabChatListUser(1)
            }}>
              <div className="style-icon-box-chat">
                <TeamOutlined />
              </div>
              <div className="icon-notification" />
            </div>
            {/* <div className="item-left-sider item-sider-1">
            <div className="content-message-sider">
              <div className="header-row box-tro-giang">
                <Avatar src={Avatar1} height={40} borderRadius={40} />
                <div className="name-1">Trợ giảng</div>
              </div>
              <div className="description-1">
                có gì không hiểu chat liền nhé có gì không hiểu chat liền nhé
              </div>
            </div>
          </div>
          <div className="item-left-sider item-sider-2">
            <div className="content-message-sider">
              <div className="header-row box-giang-vien">
                <Avatar src={Avatar1} height={40} borderRadius={40} />
                <div className="name-1">Giảng viên</div>
              </div>
              <div className="description-1">
                có gì không hiểu chat liền nhé có gì không hiểu chat liền nhé
              </div>
            </div>
          </div>
          <div className="item-left-sider item-sider-3">
            <div className="content-message-sider">
              <div className="header-row box-hoc-vien">
                <Avatar src={Avatar1} height={40} borderRadius={40} />
                <div className="name-1">Nguyễn Trần Văn Công</div>
              </div>
              <div className="description-1">
                có gì không hiểu chat liền nhé có gì không hiểu chat liền nhé
              </div>
            </div>
          </div>
        */}
          </div>
          <div className="item-style-chat item-chat-user">
            <div className="image-box-icon"
              onClick={() => {
                setBoxShowLeft(true);
                setTabChatListUser(2)
              }}
            >
              <div className="style-icon-box-chat">
                <CommentOutlined />
              </div>
              <div className="icon-notification" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className={`list-content-bottom ${boxShowLeft ? 'active-list-user' : ''}`}>
      <div className="close-popup">
        <MinusSquareOutlined onClick={() => setBoxShowLeft(false)} />
      </div>
      <div className="header-popup-list">
        <div className={`item-menu-top-popup icon-list-user ${tabChatListUser === 1 ? 'active-box' : ''}`}
          onClick={() => setTabChatListUser(1)}>
          <TeamOutlined />
          <div className="icon-notification-v2" />
        </div>
        <div className={`item-menu-top-popup icon-list-chat ${tabChatListUser === 2 ? 'active-box' : ''}`}
          onClick={() => setTabChatListUser(2)}>
          <CommentOutlined />
          <div className="icon-notification-v2" />
        </div>
      </div>

      {tabChatListUser === 1 ?
        <>
          <div className="box-search-content">
            <Search placeholder="Tìm bạn cùng học" enterButton="Tìm" />
          </div>
          <BoxChatListUserOnline users={users} />
        </> : <>
          {mentorId === id && <div className="box-search-content">
            <Search placeholder="Gửi thông báo cho học viên"
              {...notifyAll}
              enterButton="Gửi"
              onSearch={sendNotify} />
          </div>}
          <BoxChatListUser
            myId={id}
            users={users}
            messages={messages}
            sendMessage={sendMessage}
            pressSendMessage={pressSendMessage}
            sendReaction={sendReaction} />
        </>}
    </div>
  </>
}

const mapStateToProps = ({ courseContents }) => {
  const { courseId, mentorId } = courseContents
  return { courseId, mentorId }
}

export default connect(mapStateToProps, null)(BoxChatSection)