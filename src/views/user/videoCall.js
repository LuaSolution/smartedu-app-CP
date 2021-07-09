import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import Peer from 'simple-peer'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { VIDEO_SOCKET } from 'defines'
import { Row, Col } from 'antd'
import {
  PhoneOutlined,
  AudioMutedOutlined,
  SendOutlined,
} from '@ant-design/icons'
import 'assets/user/video-call.css'

const _user = JSON.parse(localStorage.getItem('@current_user'))

const StyledVideo = styled.video`
  background-color: #000;
  height: 100%;
  width: 100%;
`

const Video = (props) => {
  const ref = useRef()

  useEffect(() => {
    props.peer.on('stream', (stream) => {
      ref.current.srcObject = stream
    })
  }, [])

  return <StyledVideo playsInline autoPlay ref={ref} />
}

const videoConstraints = {
  height: window.innerHeight,
  width: window.innerWidth,
}

const VideoCall = ({}) => {
  const [peers, setPeers] = useState([])
  const [activeScreen, setActiveScreen] = useState(1)
  const [mode, setMode] = useState(1)
  const socketRef = useRef()
  const userVideo = useRef()
  const peersRef = useRef([])
  let { roomID } = useParams()

  useEffect(() => {
    socketRef.current = io.connect(VIDEO_SOCKET)
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream
        socketRef.current.emit('join room', roomID)
        socketRef.current.on('all users', (users) => {
          const peers = []
          users.forEach((userID) => {
            const peer = createPeer(userID, socketRef.current.id, stream)
            peersRef.current.push({
              peerID: userID,
              peer,
            })
            peers.push(peer)
          })
          setPeers(peers)
        })

        socketRef.current.on('user joined', (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream)
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          })

          setPeers((users) => [...users, peer])
        })

        socketRef.current.on('receiving returned signal', (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id)
          item.peer.signal(payload.signal)
        })
      })
  }, [])

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    })

    peer.on('signal', (signal) => {
      socketRef.current.emit('sending signal', {
        userToSignal,
        callerID,
        signal,
      })
    })

    return peer
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    })

    peer.on('signal', (signal) => {
      socketRef.current.emit('returning signal', { signal, callerID })
    })
    peer.signal(incomingSignal)
    return peer
  }

  function handleSuccess(stream) {
    const video = document.getElementById('video')
    video.srcObject = stream

    // demonstrates how to detect that the user has stopped
    // sharing the screen via the browser UI.
    stream.getVideoTracks()[0].addEventListener('ended', () => {})
  }

  return (
    <>
      <div className="app-container">
        <div className="app-main">
          <div className="video-call-wrapper">
            <Row>
              <Col
                span={activeScreen === 1 ? 18 : 6}
                onClick={() => setActiveScreen(1)}
              >
                <div className="video-participant">
                  {/* <a href="#" className="name-tag">
                    Chuyên gia
                  </a> */}
                  <StyledVideo
                    ref={userVideo}
                    autoPlay
                    playsInline
                    id="video"
                  />
                </div>
              </Col>
              <Col
                span={activeScreen === 2 ? 18 : 6}
                onClick={() => setActiveScreen(2)}
              >
                <div className="video-participant">
                  {/* <a href="#" className="name-tag">
                    Học viên
                  </a> */}
                  {peers.length > 0 && <Video peer={peers[0]} />}
                </div>
              </Col>
            </Row>
          </div>
          <div className="video-call-actions ">
            <button className="video-action-button">
              <AudioMutedOutlined style={{ fontSize: 24 }} />
            </button>
            <button
              className="video-action-button camera"
              onClick={() => {
                navigator.mediaDevices
                  .getDisplayMedia({ video: true })
                  .then(handleSuccess, () => {})
              }}
            ></button>
            <button className="video-action-button">
              <PhoneOutlined style={{ fontSize: 24 }} />
            </button>
          </div>
        </div>
        <div className="right-side">
          <button className="btn-close-right">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="feather feather-x-circle"
              viewBox="0 0 24 24"
            >
              <defs></defs>
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M15 9l-6 6M9 9l6 6"></path>
            </svg>
          </button>
          <div className="chat-container">
            <div className="chat-area scrollbar">
              <div className="message-wrapper">
                <div className="profile-picture">
                  <img
                    src="https://images.unsplash.com/photo-1581824283135-0666cf353f35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1276&q=80"
                    alt="pp"
                  />
                </div>
                <div className="message-content">
                  <p className="name">Ryan Patrick</p>
                  <div className="message">Helloo team!😍</div>
                </div>
              </div>
              <div className="message-wrapper reverse">
                <div className="profile-picture">
                  <img
                    src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                    alt="pp"
                  />
                </div>
                <div className="message-content">
                  <p className="name">Emmy Lou</p>
                  <div className="message">Good morning!🌈</div>
                </div>
              </div>
            </div>
            <div className="chat-typing-area-wrapper">
              <div className="chat-typing-area">
                <input
                  type="text"
                  placeholder="Type your meesage..."
                  className="chat-input"
                />
                <button className="send-button">
                  <SendOutlined />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default VideoCall
