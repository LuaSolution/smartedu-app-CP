import React, { useState, useEffect } from 'react'
import { QuestionBlock, RadioInput } from 'atoms'
import axios from 'helpers/axios'
import { Spin } from 'antd'

const Exams = ({ testId, onOk }) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (testId) {
            setData(true)
            axios.get('admin/questions/get-info/' + testId)
                .then(res => {
                    if (res.data.status === 200) {
                        console.log(res.data.data)
                        setData(res.data.data)
                    }
                })
                .finally(() => setLoading(false))
        }
    }, [testId])

    return <Spin spinning={loading}>
        {data && <QuestionBlock
            index={1}
            question={data.content}
        >
            {data.choices && data.choices.map((item, index) =>
                <RadioInput
                    key={index}
                    content={item.content}
                    onClick={() => onOk(item.is_true)}
                />)}
        </QuestionBlock>}
    </Spin>
}

export default Exams