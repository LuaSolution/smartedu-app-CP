import React, { useState, useEffect } from 'react'
import { NoData, SameCourse } from 'atoms'
import axios from 'helpers/axios'
import { Skeleton } from 'antd'
import CourseCard from 'components/users/CourseCard'

const RelatedCourseCategories = ({ cateId, courseId }) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        if (cateId && courseId) {
            setLoading(true)
            axios
                .get('courses/related-course/' + cateId + '/' + courseId)
                .then((res) => {
                    setData(res.data)
                })
                .finally(() => setLoading(false))
        }
    }, [cateId, courseId]) // eslint-disable-line react-hooks/exhaustive-deps

    return <SameCourse>
        <p className="title">Khóa học cùng thể loại</p>
        {loading ? <Skeleton active /> : <>
            {/* <a href="/courses" className="read-more">Xem thêm</a> */}
            <div className="list-wish-list">
                {data.length > 0 ? data.map((item, index) =>
                    <CourseCard key={index} item={item} />
                ) : <NoData title='Không tìm thấy khóa học cùng thể loại'/>}
            </div>
        </>}
    </SameCourse>
}

export default RelatedCourseCategories