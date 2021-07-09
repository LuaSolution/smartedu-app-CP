import React, { useState, useEffect } from 'react'
import HeaderSection from 'containers/courseMainContent/headerSection'
import CourseMainContent from 'containers/courseMainContent'
import UserFooterLayout from 'components/users/UserFooterLayout'
import { useParams } from "react-router-dom"
import axios from 'helpers/axios'
import { connect } from 'react-redux'
import { updateCourseContents } from 'redux/actions'
import { NyanCatSpinner  as Spin} from 'atoms'

const CourseContents = ({ updateCourseContents }) => {
    let { slug } = useParams()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (slug) {
            axios.get('courses/verify/' + slug)
                .then(res => {
                    if (res.data.status === 200) {
                        //lưu course id ở đây
                        updateCourseContents('courseId', res.data.data.id)
                        updateCourseContents('courseTitle', res.data.data.title)
                        updateCourseContents('mentorId', res.data.data.mentor_id)
                        updateCourseContents('supportId', res.data.data.support_id)
                        updateCourseContents('mentorName', res.data.data.f_name_1 + ' ' + res.data.data.l_name_1)
                        updateCourseContents('supportName', res.data.data.f_name_2 + ' ' +res.data.data.l_name_2)
                    } else {
                        // window.location.replace("/error")
                    }
                })
                .finally(() => setLoading(false))
        }
    }, [slug])

    return <>
        <HeaderSection />
        <div className="ifa-body-wrapper" style={{ backgroundColor: '#fff' }}>
            <Spin spinning={loading}>
                <CourseMainContent />
            </Spin>
        </div>
        <UserFooterLayout />
    </>
}

const mapActionsToProps = { updateCourseContents }

export default connect(null, mapActionsToProps)(React.memo(CourseContents))