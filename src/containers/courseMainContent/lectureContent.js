import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'helpers/axios'
import { Button, Result } from 'antd'
import { ROOT } from 'defines'
import { connect } from 'react-redux'
import { updateCourseContents, initFinishedLectures } from 'redux/actions'
import { useParams } from "react-router-dom"
import { DocumentViewer, ScormViewer, VideoPlayer, Exams, Presentation } from 'components/lectureContents'
import { FinishCourseModal } from 'atoms'
import useAudio from 'helpers/useAudio'
import ChapterList from "./chapterList";
import BoxChatUser from "./boxChatSection";
import { NyanCatSpinner as Spin } from 'atoms'

const _user = JSON.parse(localStorage.getItem('@current_user'))

const LectureContent = ({
    finishedLectures,
    courseId,
    allowToNext,
    updateCourseContents,
    initFinishedLectures }) => {
    const [lectures, setLectures] = useState([])
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const [prev, setPrev] = useState(null)
    const [next, setNext] = useState(null)
    let { lesson: currentLesson } = useParams()
    const [toggleModal, setToggleModal] = useState(false)
    const [surveyPath, setSurveyPath] = useState(null)
    const [playing, toggle] = useAudio()

    const addLectureToFinishedCourses = (courseId, lectureId) => {
        const params = {
            courseId: courseId,
            lectureId: lectureId
        }

        axios.post('courses/add-finished-lecture', params)
            .then(res => {
                if (res.data.status === 200) {
                    console.log('ok')
                }
            })
    }

    useEffect(() => {
        if (lectures && currentLesson && courseId) {
            if (currentLesson !== 'end') {
                console.log('tai bai hoc')
                updateCourseContents('allowToNext', false)
                setLoading(true)
                axios
                    .get('lectures/get/' + currentLesson)
                    .then(res => {
                        if (res.data.status === 200) {
                            const data = res.data.data
                            setData(data)
                            if (lectures) {
                                const index = lectures.findIndex(item => item.id === parseInt(currentLesson))
                                setPrev(index > 0 ? lectures[index - 1].id : null)
                                setNext(index < lectures.length - 1 ? lectures[index + 1].id : 'end')

                                updateCourseContents('lectureType', data.type)
                                updateCourseContents('lectureTitle', data.name)

                                if (data.is_finish && data.is_finish > 0) {
                                    console.log('có thể qua bài')
                                    updateCourseContents('timeToSkip', 0)
                                    updateCourseContents('allowToNext', true)
                                } else if (data.time_to_skip && data.time_to_skip > 0) {
                                    console.log('bài này  có thời gian chờ')
                                    updateCourseContents('timeToSkip', data.time_to_skip)
                                } else if (data.questions_to_skip && data.questions_to_skip !== '') {
                                    console.log('bài này  có câu hỏi qua bài')
                                    updateCourseContents('questionsToSkip', data.questions_to_skip)
                                    updateCourseContents('questionsToSkipBak', data.questions_to_skip)
                                } else {
                                    console.log('bài này không có ràng buộc', finishedLectures)
                                    updateCourseContents('timeToSkip', 0)
                                    // finishedLectures ? initFinishedLectures([...finishedLectures, parseInt(currentLesson)])
                                    //     : initFinishedLectures([parseInt(currentLesson)])

                                    //addLectureToFinishedCourses(courseId, currentLesson)
                                }
                            }
                        }
                    })
                    .finally(() => setLoading(false))
            } else {
                //get survey path
                setLoading(true)
                axios.get('courses/get-survey-path/' + courseId)
                    .then(res => {
                        if (res.data.status === 200) {
                            setSurveyPath(res.data.data)
                        }
                    })
                    .finally(() => {
                        toggle()
                        setToggleModal(true)
                        setLoading(false)
                    })
            }
        }
    }, [currentLesson, lectures, courseId])

    const fullScreen = e => {
        // e.preventDefault()
        // e.target.parentElement
        //     .querySelector('.ifa-block-content')
        //     .classList.toggle('full-screen')
        // document
        //     .getElementById('full-wrapper')
        //     .classList.remove('show-left-menu')
        // e.target.classList.toggle('maximize')
        // e.target.classList.toggle('minimize')

        // toggleFullScreen(window.document.body)
    }

    const toggleLeftMenu = (e, type) => {
        e.preventDefault()
        type === 'show' ? document.getElementById('full-wrapper').classList.add('show-left-menu')
            : document.getElementById('full-wrapper').classList.remove('show-left-menu')
    }

    const activeNext = () => {
        finishedLectures ? initFinishedLectures([...finishedLectures, parseInt(currentLesson)]) : initFinishedLectures([parseInt(currentLesson)])
        addLectureToFinishedCourses(courseId, currentLesson)
    }

    const renderNextBtn = () => {
        if (courseId && next && allowToNext === true) {
            return <Link to={"/course-contents/" + courseId + "/" + next} className="hide-before next"></Link>
        }
    }

    const renderLecturContent = () => {
        if (data) {
            if (data.type === 1) {
                if (data.video_url && data.video_url !== '') {
                    return <VideoPlayer src={data.video_url} isYoutube={true} />
                } else if (data.file_path && data.file_path !== '') {
                    return <VideoPlayer src={data.file_path} isLocal={true} courseId={courseId} />
                }
            } else if (data.type === 2) {
                if (data.file && data.file_path && data.file_path !== '') {
                    return <DocumentViewer src={ROOT + "storage/app/public/" + data.file_path} type='pdf' />
                } else if (data.text_document && data.text_document !== '') {
                    return <DocumentViewer type='text' src={data.text_document} />
                }
            } else if (data.type === 3) {
                console.log(ROOT + 'scorm/' + courseId + '/' + currentLesson + '/' + _user.id)
                return <ScormViewer src={ROOT + 'scorm/' + courseId + '/' + currentLesson + '/' + _user.id} />
            } else if (data.type === 4) {
                if (data.is_finish && data.is_finish > 0 && data.result !== null) {
                    return <Result
                        status="success"
                        title="Bài kiểm tra đã hoàn thành !"
                        subTitle="Bài kiểm tra đã chấm điểm, không thể nộp lại"
                    />
                }
                return <Exams data={data} activeNext={activeNext} />
            } else if (data.type === 5) {
                return <Presentation data={data} />
            }
        }

        return <img src={'/assets/img/web/course-contents/1.webp'} />
    }

    return <>

        <div className="top top-make-v2">
            <ChapterList toggleLeftMenu={toggleLeftMenu} setLectures={setLectures} />

            {/* <p className="hide-before title title-overlay">{data && data.name}</p> */}
            <button
                className="curriculum-btn"
                onClick={e => toggleLeftMenu(e, 'show')}>
                Nội dung</button>
            {courseId && prev && <Link to={"/course-contents/" + courseId + "/" + prev} className="hide-before previous"></Link>}

            <div className="ifa-block-content">
                {courseId && prev && <Link to={"/course-contents/" + courseId + "/" + prev} className="hide-before previous"></Link>}
                <Spin spinning={loading}>
                    {renderLecturContent()}
                </Spin>
                {renderNextBtn()}
                {/* <div className="tooltip-exit">Nhấn <span>Esc</span> để thu nhỏ màn hình</div> */}
                <button
                    className="hide-before maximize"
                    style={{ backgroundColor: 'transparent' }}
                    onClick={fullScreen} />
            </div>
            {/* <button className="group-user-btn"></button> */}

            <BoxChatUser />
        </div>


        <FinishCourseModal modal={toggleModal}
            customBtn={surveyPath ?
                <div className='btn-load-more-expert' >
                    <button onClick={() => {
                        window.location.href = 'http://smarte.edu.vn/take-survey/' + surveyPath
                    }}>Làm khảo sát sau khóa học</button>
                </div> : null}
            closeModal={() => {
                window.location.href = '/course-details/' + courseId
            }}
            type={2} />
    </>
}

const mapStateToProps = ({ courseContents }) => {
    const { courseId, allowToNext, finishedLectures } = courseContents
    return { courseId, allowToNext, finishedLectures }
}

const mapActionToProps = { updateCourseContents, initFinishedLectures, }

export default connect(mapStateToProps, mapActionToProps)(LectureContent)