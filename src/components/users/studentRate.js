import React, { useState, useEffect } from 'react'
import {
    BlockSum,
    BlockProcess,
    CurrentProcess,
    Wrapper,
    rating
} from 'atoms'
import axios from 'helpers/axios'
import { Skeleton } from 'antd'

const MAX_STAR = 5

const StudentRate = ({ countRate, courseId, courseRating }) => {
    const [rates, setRates] = useState([0, 0, 0, 0, 0])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios
            .get('courses/get-ratings/' + courseId)
            .then((res) => {
                setRates(res.data.data.reverse())
            })
            .finally(() => setLoading(false))
    }, [courseId])

    return <Wrapper>{loading ? <Skeleton active title={false} paragraph={{ rows: 5 }} /> :
        countRate ? <>
            <BlockSum>
                <div className="avg-number">{Math.round(courseRating)}</div>
                <div className="list-star">
                    {rating(courseRating)}
                </div>
                <div className="total-rate">{countRate} đánh giá</div>
            </BlockSum>
            <BlockProcess>
                {rates.map((i, index) => <div className="item" key={index}>
                    <div className="process-wrapper">
                        <CurrentProcess
                            percent={Math.round(i / countRate * 100)}
                        />
                    </div>
                    <div className="list-star">
                        {rating(MAX_STAR - index)}
                    </div>
                    <div className="process-number">
                        {Math.round(i / countRate * 100) + '%'}
                    </div>
                </div>
                )}
            </BlockProcess>
        </> : 'Chưa có đánh giá'}
    </Wrapper>
}

export default StudentRate