import React, { useEffect, useRef, useState } from "react"
import { AVATAR_PATH, FBIcons } from "defines"
import { Avatar, NoData } from "atoms"
import { Popover } from "antd"
import { FacebookSelector, SlackSelector } from 'react-reactions';
import { SmileOutlined, StarOutlined, SendOutlined } from "@ant-design/icons";

const renderAvatar = id => {
    return <Avatar src={AVATAR_PATH + id + '.webp'} height={40} borderRadius={40} />
}

const LiveChat = ({ myId,
    users,
    messages,
    sendMessage,
    pressSendMessage,
    sendReaction }) => {

    const [usersDistinct, setUsers] = useState([])
    const [rPopup, setReactionPopup] = useState(false)
    const [iconPopup, setIconPopup] = useState(false)
    const messageEl = useRef(null);

    useEffect(() => {
        messageEl.current.addEventListener('DOMNodeInserted', event => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
        });
    }, [])

    useEffect(() => {
        if (users) {
            const unique = [];
            users.map(x => unique.filter(a => a.id == x.id && a.name == x.name).length > 0 ? null : unique.push(x));
            setUsers(unique)
        }
    }, [users]);

    const getNameById = id => {
        const res = usersDistinct.find(i => i.id === id)
        return res ? res.name : ''
    }

    const renderMyAvatar = index => {
        if (index > 0 && messages[index - 1].sender === messages[index].sender) {
            return null
        }
        return <div className="box-image-right-chat">
            {renderAvatar(myId)}
        </div>
    }

    const renderMessage = msg => {
        return msg.substring(0, 2) === '//' ?
            <div className="row-chat">
                <Avatar src={FBIcons[msg.substring(2)]} height={40} />
            </div>
            :
            <div className="row-chat">{msg}</div>
    }

    return <div className="content-box-live-chat">
        <div className="list-content-chat-detail-user scrollbar" ref={messageEl}>
            {messages && messages.length > 0 ? messages.map((msg, index) => {
                if (msg.sender !== myId) {
                    if (index > 0 && messages[index - 1].sender === messages[index].sender) {
                        return <div className="item-detail-chat" key={index}>
                            <div className="box-image-left-chat" />
                            <div className="box-content-right-chat">
                                <div className="header-detail-user-time">
                                    {/* <div className="date-header">7:49 PM</div> */}
                                    {/* <Badge count='Khách mời' /> */}
                                </div>
                                <div className="list-content-bottom-chat-detail">
                                    {renderMessage(msg.message)}
                                </div>
                            </div>
                        </div>
                    }
                    return <div className="item-detail-chat" key={index}>
                        {renderAvatar(msg.sender)}
                        <div className="box-content-right-chat">
                            <div className="header-detail-user-time">
                                <div className="name-header">{getNameById(msg.sender)}</div>
                                {/* <div className="date-header">7:49 PM</div> */}
                                {/* <Badge count='Khách mời' /> */}
                            </div>
                            <div className="list-content-bottom-chat-detail">
                                {renderMessage(msg.message)}
                            </div>
                        </div>
                    </div>
                } else {
                    return <div className="my-item-detail-chat" key={index}>
                        {/* <div className="my-date-header">7:49 PM</div> */}
                        <div className="row-my-content">
                            <div className="box-content-left-chat">
                                <div className="list-content-bottom-chat-detail">
                                    {renderMessage(msg.message)}
                                </div>
                            </div>
                            {renderMyAvatar(index)}
                        </div>
                    </div>
                }
            }) : <NoData title='Hãy nói gì đó với mọi người' />}
        </div>
        <div className="input-chat-write">
            <div className="input-write-chat">
                {/* <Popover
                    visible={rPopup}
                    onVisibleChange={() => setReactionPopup(!rPopup)}
                    content={<FacebookSelector onSelect={e => {
                        sendReaction('//' + e)
                        setReactionPopup(false)
                    }} />}
                >
                    <StarOutlined className='style-reaction1-input' />
                </Popover>
                <Popover
                    visible={iconPopup}
                    onVisibleChange={() => setIconPopup(!iconPopup)}
                    content={<SlackSelector onSelect={e => {
                        const msg = document.getElementById('my-message').value
                        document.getElementById('my-message').value = msg + e
                    }} />}
                    trigger="click">
                    <SmileOutlined className='style-reaction2-input' />
                </Popover> */}
                <textarea
                    id='my-message'
                    className="style-input-chat"
                    maxLength="1000"
                    placeholder="Nhập tin nhắn"
                    onKeyDown={pressSendMessage}
                    style={{ width: '100%' }}
                ></textarea>
                <button className="style-send-input" onClick={sendMessage}>
                    <SendOutlined style={{ fontSize: 24 }} />
                </button>
            </div>
        </div>
    </div>
}

export default LiveChat