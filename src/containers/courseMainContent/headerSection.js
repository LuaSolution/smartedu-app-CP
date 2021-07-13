import React, { useEffect, useState } from 'react'
import { Navbar, Nav, Modal } from 'react-bootstrap'
import logo from 'atoms/course-contents/LogoCp.png'
import { Skeleton, Button, Tooltip } from 'antd'
import { connect } from 'react-redux'
import {
  initFinishedLectures,
  addLectureToFinishedCourses,
  updateCourseContents,
} from 'redux/actions'
import { useParams } from 'react-router-dom'
import { Test } from 'components/lectureContents'
import {
  CourseContentHeader,
  TrueAnswerModal,
  WrongAnswerModal,
  CourseContentModalForm as ModalForm,
} from 'atoms'
import useAudio from 'helpers/useAudio'
import 'assets/user/course-main-content.css'

const suspense = (
  <CourseContentHeader>
    <Navbar bg="" expand="lg">
      <Skeleton.Avatar active size="large" style={{ margin: '0 50px' }} />
      <Skeleton.Input style={{ width: 500 }} active size="large" />
    </Navbar>
  </CourseContentHeader>
)

const HeaderSection = ({
  courseTitle,
  lectureTitle,
  courseId,
  lectureType,
  timeToSkip,
  questionsToSkipBak,
  questionsToSkip,
  finishedLectures,
  initFinishedLectures,
  updateCourseContents,
}) => {
  const [loop, setLoop] = useState()
  const [flag, setFlag] = useState(false)
  const [btnDoTest, setBtnDoTest] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  let { lesson } = useParams()
  const [toggleModal, setToggleModal] = useState(false)
  const [toggleFailedModal, setToggleFailedModal] = useState(false)
  const [playingTrue, toggleTrue] = useAudio('/assets/TrlCauDung.mp3')
  const [playingFalse, toggleFalse] = useAudio('/assets/TrlSai.mp3')

  useEffect(() => {
    clearInterval(loop)
    setBtnDoTest(false)
    setFlag(false)
    clearInterval(loop)
    const demo = document.getElementById('demo')
    if (demo) demo.innerHTML = ''
  }, [lesson])

  useEffect(() => {
    if (flag && finishedLectures) {
      initFinishedLectures([...finishedLectures, parseInt(lesson)])
      addLectureToFinishedCourses(courseId, lesson)
    }
  }, [flag])

  useEffect(() => {
    const demo = document.getElementById('demo')
    const clock = document.getElementById('clock')
    if (finishedLectures !== null) {
      const isFinished = finishedLectures.includes(parseInt(lesson))
      // Xét trường hợp là có thời gian chờ qua bài thì bật đồng hồ
      if (isFinished) {
        demo.innerHTML = 'Bạn có thể qua bài'
        updateCourseContents('allowToNext', true)
      } else if (questionsToSkip && questionsToSkip != '') {
        demo.innerHTML = ''
        setBtnDoTest(true)
        // setFlag(true)
      } else if (timeToSkip !== null) {
        clock.style.display = 'block'
        const countDownDate = timeToSkip * 1000
        let now = 0
        // Update the count down every 1 second
        const loop = setInterval(() => {
          // Find the distance between now and the count down date
          const distance = countDownDate - now

          // Time calculations for  minutes and seconds
          const minutes = Math.floor((distance % 3600000) / 60000)
          const seconds = Math.floor((distance % 60000) / 1000)

          // Display the result in the element with id="demo"
          demo.innerHTML = minutes + 'phút ' + seconds + 'giây '
          now += 1000
          // If the count down is finished, write some text
          if (distance < 0) {
            clearInterval(loop)
            demo.innerHTML = 'Bạn có thể qua bài'
            setFlag(true)
            clock.style.display = 'none'
          }
        }, 1000)
        setLoop(loop)
      }
    }

    updateCourseContents('timeToSkip', null)
    updateCourseContents('questionsToSkip', null)
    return () => {
      clearInterval(loop)
      if (demo && clock) {
        demo.innerHTML = ''
        clock.style.display = 'none'
      }
    }
  }, [timeToSkip, questionsToSkip, lesson])

  const openDoTestModal = () => setModalVisible(true)
  const closeDoTestModal = () => setModalVisible(false)
  const submitResult = (flag) => {
    if (flag) {
      setToggleModal(true)
      setFlag(true)
      //audio đúng
      toggleTrue()
    } else {
      setToggleFailedModal(true)
      //audio sai
      toggleFalse()
    }
    closeDoTestModal()
  }

  return courseTitle ? (
    <CourseContentHeader>
      <Navbar bg="" expand="lg">
        <Navbar.Brand href="/">
          <img src={logo} alt="logo" style={{ height: 80 }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="title">
            <Tooltip title={lectureTitle}>
              <p className="lecture-title ">{lectureTitle}</p>
            </Tooltip>
          </Nav>
          <Nav className="ifa-mr-auto">
            <Nav.Link
              href="#"
              className="ifa-process-link"
              style={{ marginRight: 32 }}
            >
              <div>
                {btnDoTest && lectureType !== 4 && (
                  <Button onClick={openDoTestModal}>{'Câu hỏi qua bài'}</Button>
                )}
                {!btnDoTest && (
                  <>
                    <div id="clock" className="box" style={{ display: 'none' }}>
                      <div className="clock"></div>
                    </div>
                  </>
                )}
                <p id="demo"></p>
              </div>
            </Nav.Link>
            {/* <Tooltip title="50%">
                        <Nav.Link href="#" className="ifa-process-link">Tiến trình <CircularProgressbar value={50} /></Nav.Link>
                    </Tooltip> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Modal
        show={modalVisible}
        onHide={closeDoTestModal}
        animation={false}
        className="new-question-modal"
      >
        <Modal.Body>
          <ModalForm>
            <Test testId={parseInt(questionsToSkipBak)} onOk={submitResult} />
          </ModalForm>
        </Modal.Body>
      </Modal>
      <TrueAnswerModal
        modal={toggleModal}
        closeModal={() => {
          setToggleModal(false)
          setBtnDoTest(false)
        }}
      />
      <WrongAnswerModal
        modal={toggleFailedModal}
        closeModal={() => {
          setToggleFailedModal(false)
        }}
      />
    </CourseContentHeader>
  ) : (
    suspense
  )
}

const mapStateToProps = ({ courseContents }) => {
  const {
    courseId,
    courseTitle,
    lectureTitle,
    timeToSkip,
    questionsToSkip,
    lectureType,
    allowToNext,
    questionsToSkipBak,
    finishedLectures,
  } = courseContents
  return {
    courseId,
    allowToNext,
    courseTitle,
    lectureTitle,
    lectureType,
    timeToSkip,
    questionsToSkip,
    questionsToSkipBak,
    allowToNext,
    finishedLectures,
  }
}

const mapActionToProps = { initFinishedLectures, updateCourseContents }

export default connect(mapStateToProps, mapActionToProps)(HeaderSection)
