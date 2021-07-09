import React, { useState, useEffect } from 'react'
import {
    Form,
    Switch,
    Col,
    Row,
    Select,
    Spin
} from 'antd'
import { connect } from 'react-redux'
import { updateCourseInfo } from 'redux/actions'
import { COURSE_PUBLIC_ALL } from 'defines'
import axios from 'helpers/axios'
import { SELECTED_PARTNER } from 'defines'
import SubUserList from 'containers/subUserList'

const AddLearner = ({ courseInfo, updateCourseInfo }) => {
    const [partners, setPartners] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => { setLoading(false) }, [partners])

    useEffect(() => {
        const fetch = () => {
            setLoading(true)
            axios
                .get('admin/partners/course/' + courseInfo.id)
                .then(res => {
                    return res.data
                })
                .then(data => {
                    setPartners(data.partners)
                    const _arr = data.selected_partners.length > 0 ? data.selected_partners.map(i => { return i.id }) : []
                    updateCourseInfo(_arr, SELECTED_PARTNER)
                })
        }
        fetch()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const onChangePublic = checked => updateCourseInfo(checked, COURSE_PUBLIC_ALL)

    const handleChange = value => {
        updateCourseInfo(value, SELECTED_PARTNER)
    }

    return <>
        <Spin spinning={loading} tip="Đang tải dữ liệu..." size="large">
            <Row gutter={16}>
                <Col span={10}>
                    <Form.Item label={'Hiển thị cho tất cả học viên'}>
                        <Switch
                            checkedChildren="Có"
                            unCheckedChildren="Không"
                            checked={courseInfo[COURSE_PUBLIC_ALL]}
                            onChange={onChangePublic}
                        />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item label='Phân phối khóa học cho nhóm người dùng'>
                        <Select
                            // disabled={courseInfo[COURSE_PUBLIC_ALL]}
                            mode="multiple"
                            showSearch
                            placeholder="Chọn nhóm người dùng"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            value={courseInfo[SELECTED_PARTNER]}
                            onChange={handleChange}>
                            {partners.map(item =>
                                <Select.Option key={item.id} value={item.id}>
                                    {item.name}
                                </Select.Option>
                            )}
                        </Select>
                    </Form.Item>
                </Col>
                {courseInfo.id &&
                    <Col span={24}>
                        <Form.Item label='Danh sách học viên'>
                            <SubUserList courseId={courseInfo.id} />
                        </Form.Item>
                    </Col>
                }
            </Row>
        </Spin>
    </>
}

const mapStateToProps = ({ courses }) => {
    const { courseInfo } = courses
    return { courseInfo }
}

const mapActionsToProps = {
    updateCourseInfo
}

export default connect(mapStateToProps, mapActionsToProps)(React.memo(AddLearner))