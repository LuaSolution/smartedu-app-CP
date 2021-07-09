import React, { useEffect, useState } from 'react'
import axios from 'helpers/axios'
import { Spin } from 'antd'
import { NoData } from 'atoms'
import CourseCard from 'components/processCourseCard'
import 'assets/user/ifa-course-list.css'

const pageSize = 8

const WishListPage = ({ id }) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        fetchData()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const fetchData = () => {
        setLoading(true)
        axios
            .get('courses/my-courses/paging/' + Math.ceil(data.length / pageSize) + '/' + id)
            .then(res => {
                if (res.data.status === 200) {
                    setData(res.data.data)
                }
            })
            .finally(() => setLoading(false))
    }

    return <>
        <div className="list-course-content" style={{
            backgroundColor: '#fff',
            boxShadow: '2px 5px 20px rgb(42 44 49 / 13%)'
        }}>
            <Spin spinning={loading} size='large'>
                <div className="list-course-wrapper">
                    <div className="col-12">
                        <div className="row ifa-course-list-content" style={{ marginRight: -30, marginLeft: 0 }}>
                            {data.length > 0 ? data.map((item, index) =>
                                <CourseCard key={index} item={item} />
                            ) : <div style={{ width: '100%' }}><NoData /></div>}
                        </div>
                    </div>
                    {data.length > 0 && <div className='btn-load-more-expert'>
                        <button onClick={fetchData}>Xem thêm</button>
                    </div>}
                </div>
            </Spin>
        </div>
    </>
}

export default React.memo(WishListPage)
