import React, { useState, useEffect } from 'react'
import { CourseContentMenuLeft as MenuLeft } from 'atoms'
import axios from 'helpers/axios'
import { Skeleton, Tooltip, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom"
import { connect } from 'react-redux'
import { initFinishedLectures } from 'redux/actions'
import styled from 'styled-components'

const ChapterName = styled.span`
display:inline-block;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
max-width: 28ch;
`

const ChapterList = ({ toggleLeftMenu, courseId, setLectures, finishedLectures, initFinishedLectures }) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    let { lesson } = useParams()

    useEffect(() => {
        if (courseId) {
            console.log('course id = ',courseId)
            setLoading(true)
            axios
                .get('courses/chapter-list/paging/' + courseId)
                .then(res => {
                    return res.data
                })
                .then(data => {
                    const list = data.data
                    setData(list)
                    getLectureList(list)
                    //lấy danh sách các bài đã học xong
                    const finished_lectures = data.finished_lectures.map(i => { return i.id })

                    finishedLectures && finishedLectures.length > 0 ? initFinishedLectures([...finishedLectures, ...finished_lectures]) : initFinishedLectures(finished_lectures)
                })
                .finally(() => setLoading(false))
        }
    }, [courseId]) // eslint-disable-line react-hooks/exhaustive-deps

    const getCurriculumItemClassName = item => {
        let className = item.questions_to_skip ? ' exam ' : ''
        className += item.time_to_skip > 0 ? ' time ' : ''
        className += parseInt(lesson) === parseInt(item.id) ? ' current-lecture ' : ''
        className += finishedLectures.includes(item.id) ? ' finish ' : ''
        className += !finishedLectures.includes(item.id) ? ' processing ' : ''
        return className
    }

    const getLectureList = chapters => {
        let lectures = []
        chapters.map(chapter => chapter.lectures.map(lecture => lectures = [...lectures, lecture]))
        setLectures(lectures)
    }

    const showLessons = e => {
        e.preventDefault()
        e.target.parentElement.classList.toggle('active')
    }

    return <MenuLeft className="menu-left scrollbar">
        <p>Nội dung bài học</p>
        <a href="" className="hide-menu-left" onClick={e => toggleLeftMenu(e, 'hide')}></a>
        <div className="list box-giao-trinh-left">
            {loading ? <Skeleton active />
                : courseId && data && data.map((chapter, index) => (
                    <div className="curriculum-item" key={'chapter' + index}>
                        <div className="curriculum-item-header"
                            onClick={showLessons}>
                            <Tooltip title={chapter.name}>
                                <ChapterName>
                                    {chapter.name}
                                </ChapterName>
                            </Tooltip>
                        </div>
                        <div className="curriculum-item-body">
                            {chapter.lectures.map((lecture, indexLession) => (
                                <Link to={"/course-contents/" + courseId + "/" + lecture.id} key={'lession' + indexLession}
                                    className={getCurriculumItemClassName(lecture)}>
                                    <Tooltip title={lecture.name}>
                                        <Typography.Paragraph ellipsis={{ rows: 2 }}>
                                            {lecture.name}
                                        </Typography.Paragraph>
                                    </Tooltip>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))
            }
        </div>
    </MenuLeft>
}

const mapStateToProps = ({ courseContents }) => {
    const { courseId, finishedLectures } = courseContents
    return { courseId, finishedLectures }
}

const mapActionToProps = { initFinishedLectures }

export default connect(mapStateToProps, mapActionToProps)(ChapterList)