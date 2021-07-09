import React from 'react'
import { Button } from 'reactstrap'
import { Input, Row, Col } from 'antd'

const Type10 = ({ type, setType }) => <>
    <Row gutter={8}>
        {type.map((item, index) => <>
            <Col span={24}>
                <Input style={{ marginBottom: 15 }}
                    key={index} value={item.option}
                    allowClear
                    onChange={e => {
                        const options = [...type]
                        options[index] = { ...options[index], option: e.target.value }
                        setType(options)
                    }} />
            </Col>
        </>
        )}
    </Row>
    <Button onClick={() => {
        const options = [...type, {
            option: ''
        }]
        setType(options)
    }}>Thêm câu hỏi</Button>
</>

export default Type10