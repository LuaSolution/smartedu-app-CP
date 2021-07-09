import React, { useEffect, useState } from 'react'
import IntlMessages from 'helpers/IntlMessages'
import {
    Col,
    Row,
    Form,
    Input,
    Select,
    Upload,
    Switch,
    Button,
    Spin,
    message,
    Alert
} from 'antd'
import { Card, CardBody, CardTitle } from 'reactstrap'
import { PlusOutlined, CalendarOutlined } from '@ant-design/icons'
import AddTag from 'components/addTags'
import axios from 'helpers/axios'
import { getBase64 } from 'helpers/Utils'
import { connect } from 'react-redux'
import { updateCourseInfo, clearCourse, initCourseGroup, initUserList } from 'redux/actions'
import {
    COURSES_PATH,
    COURSE_TITLE,
    COURSE_SLUG,
    COURSE_LONG_DES,
    COURSE_SHORT_DES,
    COURSE_OLD_PRICE,
    COURSE_NEW_PRICE,
    COURSE_IS_OFFLINE,
    COURSE_TAGS,
    COURSE_GROUP,
    COURSE_MENTOR,
    COURSE_SUPPORTER,
    COURSE_REVIEW_COUNT,
    COURSE_BUY_COUNT,
    COURSE_STATUS,
    COURSE_SURVEY_ID,
    COURSE_VIDEO_ID,
    COURSE_CERT_TITLE,
    COURSE_CERT_CLASS,
    COURSE_CERT_ID,
    COURSE_CERT_TIME_FROM,
    COURSE_CERT_TIME_TO,
} from 'defines'
import { InputNumber } from 'atoms'
import createSlug from 'helpers/createSlug'
import FileManager from 'components/fileManager'

const CourseInfo = ({
    addNewFlag,
    editId,
    courseInfo,
    clearCourse,
    updateCourseInfo,
    courseGroups,
    users,
    initUserList,
    initCourseGroup,
}) => {

    const [fileList, setFileList] = useState([])
    const [surveyList, setSurveyList] = useState([])
    const [loading, setLoading] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)

    useEffect(() => { setLoading(false) }, [courseInfo])

    useEffect(() => {
        const fetch = () => {
            axios
                .get('admin/course-groups/all')
                .then(res => {
                    return res.data
                })
                .then(data => {
                    initCourseGroup(data)
                })

            axios
                .get('admin/user/all-mentor')
                .then(res => {
                    return res.data
                })
                .then(data => {
                    initUserList(data)
                })

            axios
                .get('admin/surveys/all-survey')
                .then(res => {
                    return res.data
                })
                .then(data => {
                    if (data.status === 200) {
                        setSurveyList(data.data)
                    }
                })
        }

        fetch()
    }, [])// eslint-disable-line react-hooks/exhaustive-deps


    useEffect(() => {
        const fetch = () => {
            if (!addNewFlag && editId) {
                setLoading(true)
                axios
                    .get('admin/courses/get-info/' + editId)
                    .then(res => {
                        if (res.data.status === 200) {
                            return res.data.data
                        } else {
                            message.error('Lỗi truy vấn thông tin khóa học !')
                        }
                    })
                    .then(data => {
                        if (data) {
                            updateCourseInfo(data)
                            setFileList([{
                                url: COURSES_PATH + data.id + '.webp?' + Math.random()
                            }])
                        } else {
                            window.location.replace("/404")
                        }
                    })
            } else {
                clearCourse()
                setFileList([])
            }
        }

        fetch()
    }, [addNewFlag, editId]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleChangeAvatar = async ({ fileList }) => {
        fileList.length > 1 ? setFileList([fileList[1]]) : setFileList(fileList)

        if (fileList[0] && 'originFileObj' in fileList[0]) {
            updateCourseInfo(await getBase64(fileList[0].originFileObj), 'image')

        }
    }

    const updateField = (value, field) => {
        updateCourseInfo(value, field)
    }

    return <Spin spinning={loading} tip="Đang tải thông tin khóa học..." size="large">
        <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
                {/* title */}
                <Col span={8}>
                    <Form.Item label={'Tên khóa học'}>
                        <Input allowClear
                            value={courseInfo[COURSE_TITLE]}
                            onChange={e => {
                                updateField(e.target.value, COURSE_TITLE)
                                updateField(createSlug(e.target.value), COURSE_SLUG)
                            }} />
                    </Form.Item>
                </Col>
                {/* groups */}
                <Col span={6}>
                    <Form.Item label={'Danh mục môn học'} >
                        <Select
                            showSearch
                            placeholder="Chọn danh mục môn học"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            value={courseInfo[COURSE_GROUP]}
                            onChange={e => updateField(e, COURSE_GROUP)}>
                            {courseGroups.list.map(item =>
                                <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)}
                        </Select>
                    </Form.Item>
                </Col>
                {/* Mentors */}
                <Col span={5}>
                    <Form.Item label={'Giảng viên'} >
                        <Select
                            showSearch
                            placeholder="Chọn giảng viên"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            value={courseInfo[COURSE_MENTOR]}
                            onChange={e => updateField(e, COURSE_MENTOR)}>
                            {users.list.map(item =>
                                <Select.Option key={item.id} value={item.id}>
                                    {item.first_name + ' ' + item.last_name}
                                </Select.Option>)}
                        </Select>
                    </Form.Item>
                </Col>
                {/* Supporter */}
                <Col span={5}>
                    <Form.Item label={'Trợ giảng'} >
                        <Select
                            showSearch
                            placeholder="Chọn trợ giảng"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            value={courseInfo[COURSE_SUPPORTER]}
                            onChange={e => updateField(e, COURSE_SUPPORTER)}>
                            <Select.Option key={-1} value={null}>
                                Không chọn trợ giảng
                            </Select.Option>
                            {users.list.map(item =>
                                <Select.Option key={item.id} value={item.id}>
                                    {item.first_name + ' ' + item.last_name}
                                </Select.Option>)}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item label={'Đường dẫn (slug)'}>
                        <Input allowClear
                            value={courseInfo[COURSE_SLUG]}
                            onChange={e => updateField(e.target.value, COURSE_SLUG)}
                        />
                    </Form.Item>
                </Col>
                {/* old price */}
                <Col span={4}>
                    <Form.Item label={'Giá hiện tại'}>
                        <InputNumber
                            value={courseInfo[COURSE_OLD_PRICE]}
                            handleChange={e => updateField(e, COURSE_OLD_PRICE)} />
                    </Form.Item>
                </Col>
                {/* new price */}
                <Col span={4}>
                    <Form.Item label={'Giá đã giảm'}>
                        <InputNumber
                            value={courseInfo[COURSE_NEW_PRICE]}
                            handleChange={e => updateField(e, COURSE_NEW_PRICE)} />
                    </Form.Item>
                </Col>
                {/* is offline ? */}
                {!addNewFlag && editId ? <Col span={4}>
                    <Form.Item label={'Có dạy offline ?'}>
                        <Switch
                            checkedChildren="Có"
                            unCheckedChildren="Không"
                            checked={courseInfo[COURSE_IS_OFFLINE]}
                            onChange={e => updateField(e, COURSE_IS_OFFLINE)}
                        />
                    </Form.Item>
                </Col> : null}
                <Col span={4}>
                    <Form.Item label={'Xuất bản khóa học'}>
                        <Switch
                            checkedChildren="Xuất bản"
                            unCheckedChildren="Nháp"
                            checked={courseInfo[COURSE_STATUS]}
                            onChange={e => updateField(e, COURSE_STATUS)}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={4}>
                    <Form.Item label={'Số lượt mua'} >
                        <Input defaultValue={0}
                            type="number"
                            value={courseInfo[COURSE_BUY_COUNT]}
                            onChange={e => updateField(e.target.value, COURSE_BUY_COUNT)} />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item label={'Số lượt đánh giá'} >
                        <Input defaultValue={0}
                            readOnly
                            value={courseInfo[COURSE_REVIEW_COUNT]}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label={'Từ khóa'}>
                        <AddTag
                            tags={courseInfo[COURSE_TAGS] && courseInfo[COURSE_TAGS].split(',')}
                            updateTags={value => updateField(value, COURSE_TAGS)}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label='Khảo sát sau khóa học' >
                        <Select
                            showSearch
                            placeholder="Chọn bài khảo sát"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            value={courseInfo[COURSE_SURVEY_ID]}
                            onChange={e => updateField(e, COURSE_SURVEY_ID)}>
                            {surveyList.map(item =>
                                <Select.Option key={item.id} value={item.id}>
                                    {item.title}
                                </Select.Option>)}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label="Mô tả ngắn" >
                        <Input.TextArea showCount maxLength={150}
                            allowClear
                            rows={4} placeholder="Nhập nội dung mô tả ngắn"
                            value={courseInfo[COURSE_SHORT_DES]}
                            onChange={e => updateField(e.target.value, COURSE_SHORT_DES)} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={<IntlMessages id="user.avatar" />}>
                        <Upload listType="picture-card"
                            accept="image/*"
                            fileList={fileList}
                            onChange={handleChangeAvatar}>
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>
                                    {<IntlMessages id="user.upload-avatar" />}
                                </div>
                            </div>
                        </Upload>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label="Mô tả đầy đủ"  >
                        <Input.TextArea showCount allowClear
                            rows={6} placeholder="Nhập nội dung mô tả đầy đủ"
                            value={courseInfo[COURSE_LONG_DES]}
                            onChange={e => updateField(e.target.value, COURSE_LONG_DES)} />
                    </Form.Item>
                    <Card>
                        <CardBody>
                            <CardTitle>
                                Cấu hình dành cho phần chứng chỉ
                            </CardTitle>
                            <Row gutter={16}>
                                <Col span={24}>
                                    <Form.Item label="Tên khóa học tiếng Anh (hiện trong chứng chỉ)"  >
                                        <Input value={courseInfo[COURSE_CERT_TITLE]}
                                            onChange={e => updateField(e.target.value, COURSE_CERT_TITLE)}
                                            allowClear />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Khóa/Class (hiện trong chứng chỉ)"  >
                                        <Input value={courseInfo[COURSE_CERT_CLASS]}
                                            onChange={e => updateField(e.target.value, COURSE_CERT_CLASS)}
                                            allowClear />
                                    </Form.Item>
                                </Col>
                                <Col span={12} >
                                    <Form.Item label="Từ/From (hiện trong chứng chỉ)"  >
                                        <Input value={courseInfo[COURSE_CERT_TIME_FROM]}
                                            onChange={e => updateField(e.target.value, COURSE_CERT_TIME_FROM)}
                                            allowClear />
                                    </Form.Item>
                                </Col>
                                <Col span={12} >
                                    <Form.Item label="Đến/To (hiện trong chứng chỉ)"  >
                                        <Input value={courseInfo[COURSE_CERT_TIME_TO]}
                                            onChange={e => updateField(e.target.value, COURSE_CERT_TIME_TO)}
                                            allowClear />
                                    </Form.Item>
                                </Col>
                                <Col span={12} >
                                    <Form.Item label="Mã số KH (hiện trong chứng chỉ)"  >
                                        <Input value={courseInfo[COURSE_CERT_ID]}
                                            onChange={e => updateField(e.target.value, COURSE_CERT_ID)}
                                            allowClear />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col span={12} >
                    <Form.Item label="Chọn video cho khóa học"  >
                        {courseInfo[COURSE_VIDEO_ID] &&
                            <Alert message="Đã tải file lên hệ thống" type="info" showIcon />}
                        <FileManager attachFile={id => {
                            updateField(id, COURSE_VIDEO_ID)
                        }}
                            fileId={{
                                id: courseInfo[COURSE_VIDEO_ID],
                                file_path: null
                            }}
                            fileType='video' />
                    </Form.Item>
                </Col>
            </Row>
        </Form >
    </Spin>
}

const mapStateToProps = ({ courses, courseGroups, users }) => {
    const { courseInfo } = courses
    return { courseInfo, courseGroups, users }
}

const mapActionsToProps = {
    clearCourse,
    updateCourseInfo,
    initCourseGroup,
    initUserList
}

export default connect(mapStateToProps, mapActionsToProps)(React.memo(CourseInfo))