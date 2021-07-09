import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import UserHeaderLayout from 'components/users/UserHeaderLayout'
import UserFooterLayout from 'components/users/UserFooterLayout'
import CourseBrief from 'containers/courseDetails/courseBrief'
import Teacher from 'components/users/Teacher'
import StudentRate from 'components/users/studentRate'
import CourseSumaryInfo from 'containers/courseDetails/courseSummaryInfo'
import RelatedCourseCategories from 'containers/courseDetails/relatedCourseCategories'
import CommentSection from 'components/users/commentSection'
import { connect } from 'react-redux'
import axios from 'helpers/axios'
import { updateCourseInfo, initCourseBenefits } from 'redux/actions'
import {
    COURSE_TITLE,
    COURSE_LONG_DES,
    COURSE_SHORT_DES,
    COURSE_MENTOR,
    COURSE_OLD_PRICE,
    COURSE_NEW_PRICE,
    COURSE_REVIEW_COUNT,
    COURSE_BUY_COUNT,
    COURSE_IS_OFFLINE,
    COURSE_GROUP,
    COURSES_PATH
} from 'defines'
import { message, Skeleton } from 'antd'
import CourseBenefit from 'containers/courseDetails/courseBenefit'
import CourseChapters from 'containers/courseDetails/courseChapters'
import {
    CourseDetailsDescription as Description,
    CourseDetailsLeftBlock as LeftBlock,
    CourseDetailsListTab as ListTab,
    CourseDetailsRightBlock as RightBlock,
    CourseDetailsWrapper as Wrapper
} from 'atoms'
import 'assets/user/ifa-course-details.css'

const CourseDetails = ({
    courseInfo,
    updateCourseInfo,
}) => {
    let { slug } = useParams()
    const [loadingInfo, setLoadingInfo] = useState(false)
    const [mentorName, setMentorName] = useState(null)

    useEffect(() => {
        setLoadingInfo(true)
        axios
            .get('courses/get-info/' + slug)
            .then(res => {
                if (res.data && res.data.status === 200) {
                    return res.data
                } else {
                    message.error('Khóa học không tồn tại hoặc bị ẩn, vui lòng liên hệ quản trị viên')
                    window.location.replace("/error")
                }
            })
            .then(data => {
                updateCourseInfo(data.data)
            })
            .finally(() => setLoadingInfo(false))
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const changeTab = e => {
        e.preventDefault()
        let listChild = e.target.parentElement.childNodes
        for (let i = 0; i < listChild.length; i++) {
            listChild[i].classList.remove('active')
        }
        e.target.classList.add('active')
        document.getElementById(e.target.dataset.id).scrollIntoView({ behavior: "smooth" })
    }

    const showAllContent = e => {
        e.preventDefault()
        e.target.parentElement.classList.toggle("show-all")
    }

    return <>
        <UserHeaderLayout title={courseInfo[COURSE_TITLE]} />
        <CourseBrief
            loadingInfo={loadingInfo}
            mentorName={mentorName}
            item={{
                id: courseInfo.id,
                video_path: courseInfo.video_path,
                breadcrumbs: [
                    { "title": "Trang chủ", "url": "/" },
                    { "title": "Khóa học của tôi", "url": "/dashboards/my-courses" }
                ],
                isRated: courseInfo.relational,
                isLiked: courseInfo.isLiked,
                title: courseInfo[COURSE_TITLE],
                content: courseInfo[COURSE_SHORT_DES],
                rating: courseInfo.rating,
                totalRate: courseInfo[COURSE_REVIEW_COUNT],
                totalStudent: courseInfo[COURSE_BUY_COUNT],
            }}
        />
        {/* </Spin> */}
        <Wrapper className="ifa-body-wrapper">
            <div className="ifa-container course-content">
                <div className="ifa-block-content t-css container ">

                    <LeftBlock>
                        <ListTab className="course-detail-tab-t-css">
                            <a href="#intro" data-id="intro" className="active" onClick={changeTab}>Giới thiệu</a>
                            <a href="#curriculum" data-id="curriculum" onClick={changeTab}>Nội dung</a>
                            <a href="#teacher" data-id="teacher" onClick={changeTab}>Giảng viên</a>
                            <a href="#rate" data-id="rate" onClick={changeTab}>Đánh giá</a>
                        </ListTab>
                        {courseInfo && courseInfo.id && <CourseBenefit courseId={courseInfo.id} />}
                        <Description className="course-details-content ">
                            <div className="details-block-title">
                                <p>Mô tả</p>
                            </div>
                            {loadingInfo ? <Skeleton active /> :
                                <>
                                    <div className="details-block-content">
                                        {courseInfo[COURSE_LONG_DES]}
                                    </div>
                                    <span onClick={showAllContent}>Xem thêm</span>
                                </>
                            }
                        </Description>
                        {courseInfo && courseInfo.id && <CourseChapters courseId={courseInfo.id} lCount={courseInfo.total_lectures} />}
                        <div id="teacher" className="course-details-content">
                            <div className="details-block-title">
                                <p>Thông tin giảng viên</p>
                            </div>
                            {courseInfo && courseInfo.id && <Teacher mentorId={courseInfo[COURSE_MENTOR]} setMentorName={setMentorName} />}
                        </div>
                        <div id="rate" className="course-details-content">
                            <div className="details-block-title">
                                <p>Đánh giá của học viên</p>
                            </div>
                            {courseInfo && courseInfo.id && <StudentRate courseId={courseInfo.id} courseRating={courseInfo.rating} countRate={courseInfo[COURSE_REVIEW_COUNT]} />}
                        </div>
                        <div className="course-details-content  cmt-mobile">
                            {courseInfo && courseInfo.id && <CommentSection courseId={courseInfo.id} />}
                        </div>
                    </LeftBlock>

                    {courseInfo &&
                        <RightBlock>
                            <CourseSumaryInfo
                                linkToContent={courseInfo && "/course-contents/" + courseInfo.slug + '/' + courseInfo.first_lecture_id}
                                totalLesson={courseInfo.total_lectures}
                                item={courseInfo}
                                isBought={courseInfo.relational ? true : false}
                                mentorName={mentorName}
                            />
                        </RightBlock>
                    }
                </div>
            </div>
            <div className="ifa-container same-course-block">
                <div className="ifa-block-content">
                    {courseInfo
                        && courseInfo[COURSE_GROUP]
                        && courseInfo.id
                        && <RelatedCourseCategories
                            courseId={courseInfo.id}
                            cateId={courseInfo[COURSE_GROUP]} />}
                </div>
            </div>
        </Wrapper>
        <UserFooterLayout />
    </>
}

const mapStateToProps = ({ courses }) => {
    const { courseInfo, courseBenefits } = courses
    return { courseInfo, courseBenefits }
}

const mapActionsToProps = {
    updateCourseInfo,
    initCourseBenefits,
}

export default connect(mapStateToProps, mapActionsToProps)(React.memo(CourseDetails))