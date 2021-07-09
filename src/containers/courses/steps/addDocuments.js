import React, { useState, useEffect } from 'react'
import {
    Col,
    Row,
    Spin,
    List,
    Popconfirm
} from 'antd'
import { connect } from 'react-redux'
import { initCourseResources } from 'redux/actions'
import axios from 'helpers/axios'
import FileResource from 'components/fileCourseResources'
import { Card, CardBody } from 'reactstrap'

const AddDocument = ({ editId, addNewFlag, courseResources, initCourseResources }) => {
    // const [downloadList, setDownloadList] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => { setLoading(false) }, [courseResources])

    useEffect(() => {
        const fetch = () => {
            if (!addNewFlag && editId) {
                setLoading(true)
                axios
                    .get('admin/courses/resources/paging/' + editId)
                    .then(res => {
                        return res.data
                    })
                    .then(data => {
                        initCourseResources(data.data)
                    })
            } else {
                initCourseResources([])
            }
        }

        fetch()
    }, [addNewFlag, editId]) // eslint-disable-line react-hooks/exhaustive-deps

    const confirm = (e, id) => {
        initCourseResources(courseResources.filter(i => i.id !== id))
    }

    const cancel = e => {
        console.log(e)
    }

    return <Spin spinning={loading} tip="Đang tải thông tin..." size="large">
        <Row gutter={16}>
            <Col span={10}>
                <Card>
                    <CardBody>
                        <List
                            style={{ minHeight: 350 }}
                            itemLayout="horizontal"
                            dataSource={courseResources}
                            renderItem={item => <List.Item
                                actions={[<a>{item.size}MB</a>,
                                <Popconfirm
                                    title="Bạn có muốn xóa file này khỏi khóa học?"
                                    onConfirm={e => confirm(e, item.id)}
                                    onCancel={cancel}
                                    okText="Xóa"
                                    cancelText="Hủy"
                                >
                                    <a>xóa</a>
                                </Popconfirm>]}
                            >
                                <List.Item.Meta
                                    title={item.fileName}
                                />
                            </List.Item>}
                        />
                    </CardBody>
                </Card>
            </Col>
            <Col span={14}>
                <Card>
                    <CardBody>
                        <FileResource downloadList={courseResources}
                            setDownloadList={initCourseResources} />
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </Spin>
}

const mapStateToProps = ({ courses }) => {
    const { courseResources } = courses
    return { courseResources }
}

const mapActionsToProps = {
    initCourseResources
}

export default connect(mapStateToProps, mapActionsToProps)(React.memo(AddDocument))