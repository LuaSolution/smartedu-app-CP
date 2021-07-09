import React from 'react'
import { Button } from 'reactstrap'
import { Input, Row, Col, Select } from 'antd'

const Type6 = ({ type, setType, surveyGroups }) => <>
    <Row gutter={8}>
        {type.map((item, index) => <>
            <Col span={12}>
                <Select
                    showSearch
                    placeholder="Chọn nhóm năng lực"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    value={item.group_id}
                    onChange={e => {
                        const options = [...type]
                        options[index] = { ...options[index], group_id: e }
                        setType(options)
                    }}
                >
                    {surveyGroups && surveyGroups.map(item =>
                        <Select.Option key={item.id} value={item.id}>
                            {item.title}
                        </Select.Option>
                    )}
                </Select>
            </Col>
            <Col span={12}>
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
            group_id: 1,
            option: ''
        }]
        setType(options)
    }}>Thêm lựa chọn</Button>
</>

export default Type6
