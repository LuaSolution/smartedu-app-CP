import React, { useEffect, useState } from 'react'
import {
    Card as AntCard,
    Typography,
    Spin,
    List
} from 'antd'
import { DeleteFilled } from '@ant-design/icons'
import {
    Button,
    Card,
    CardBody,
} from 'reactstrap'
import axios from 'helpers/axios'
import { connect } from 'react-redux'
import {
    initCourseBenefits,
    addCourseBenefit,
    updateCourseBenefits,
    removeCourseBenefits
} from 'redux/actions'
import ReactDragListView from "react-drag-listview"
import { NoData } from 'atoms'

const CourseBenefits = ({
    editId,
    addNewFlag,
    courseBenefits,
    initCourseBenefits,
    addCourseBenefit,
    updateCourseBenefits,
    removeCourseBenefits
}) => {

    const [loading, setLoading] = useState(false)

    useEffect(() => { setLoading(false) }, [courseBenefits])

    useEffect(() => {
        const fetch = () => {
            if (!addNewFlag && editId) {
                setLoading(true)
                axios
                    .get('admin/courses/benefits/paging/' + editId)
                    .then((res) => {
                        return res.data
                    })
                    .then((data) => {
                        initCourseBenefits(data)
                    })
            } else {
                initCourseBenefits([])
            }
        }

        fetch()
    }, [addNewFlag, editId]) // eslint-disable-line react-hooks/exhaustive-deps

    const onDragEnd = (fromIndex, toIndex) => {
        if (toIndex < 0) return // Ignores if outside designated area

        let items = [...courseBenefits]
        const item = items.splice(fromIndex, 1)[0]
        items.splice(toIndex, 0, item)
        initCourseBenefits(items)
        
    }

    return <Spin spinning={loading} tip="Đang tải lợi ích khóa học..." size="large">
        <AntCard title={<h2><b>Lợi ích khóa học</b></h2>} bordered={false} style={{ width: '100%' }}
            extra={<Button color="primary" onClick={addCourseBenefit}>Thêm lợi ích khóa học</Button>}>
            {courseBenefits
                && courseBenefits.length > 0
                ? <ReactDragListView
                    nodeSelector=".ant-list-item.draggble"
                    onDragEnd={onDragEnd}
                >
                    <Card>
                        <CardBody>
                            <List dataSource={courseBenefits}
                                style={{ cursor: 'pointer' }}
                                renderItem={(item, index) => {
                                    return <List.Item
                                        actions={[<DeleteFilled style={{ fontSize: 18 }}
                                            onClick={() => {
                                                removeCourseBenefits(index)
                                            }
                                            } />]}
                                        className="draggble"
                                    >
                                        <List.Item.Meta title={<Typography.Paragraph
                                            editable={{
                                                onChange: e => {
                                                    updateCourseBenefits(index, { name: e })
                                                }
                                            }}>
                                            {item.name}
                                        </Typography.Paragraph>} />
                                    </List.Item>
                                }}
                            />
                        </CardBody>
                    </Card>
                </ReactDragListView>
                : <NoData />}
        </AntCard>
    </Spin>
}

const mapStateToProps = ({ courses }) => {
    const { courseBenefits } = courses
    return { courseBenefits }
}

const mapActionsToProps = {
    initCourseBenefits,
    addCourseBenefit,
    updateCourseBenefits,
    removeCourseBenefits
}

export default connect(mapStateToProps, mapActionsToProps)(React.memo(CourseBenefits))