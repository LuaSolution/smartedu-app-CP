import React from 'react'
import {
    Typography,
    List,
    Modal
} from 'antd'
import { DeleteFilled, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import {
    Card,
    CardBody,
    NavLink,
    Badge
} from 'reactstrap'
import ReactDragListView from "react-drag-listview"
import momentTime from 'helpers/moment'
import { VIDEO, DOCUMENT, SCORM, EXAM } from 'defines'
import styled from 'styled-components'

const CardContent = styled(CardBody)`
padding: 0 10px !important
`
const { confirm } = Modal;

const LectureList = ({
    lectures,
    updateLectures,
    setIsChapterChange,
    removeLecture,
    changeLectureName,
    setCurrentSelected,
    chapterIndex
}) => {

    const onDragEnd = (fromIndex, toIndex) => {
        if (toIndex < 0) return // Ignores if outside designated area

        let items = [...lectures]
        const item = items.splice(fromIndex, 1)[0]
        items.splice(toIndex, 0, item)
        updateLectures(items)

    }

    const content = type => {
        switch (type) {
            case VIDEO:
                return <Badge color="primary" pill>VIDEO</Badge>
            case DOCUMENT:
                return <Badge color="secondary" pill>TÀI LIỆU</Badge>
            case SCORM:
                return <Badge color="warning" pill>SCORM</Badge>
            case EXAM:
                return <Badge color="danger" pill>KIỂM TRA</Badge>
            default:
                return <Badge color="primary" pill>VIDEO</Badge>
        }
    }

    return lectures
        && lectures.length > 0
        && <ReactDragListView
            nodeSelector=".ant-list-item.draggble"
            onDragEnd={onDragEnd}
        >
            <Card>
                <CardContent>
                    <List dataSource={lectures}
                        style={{ cursor: 'pointer' }}
                        renderItem={(item, index) => {
                            return <List.Item
                                actions={[
                                    <EditOutlined
                                        style={{ fontSize: 18 }}
                                        onClick={() => setCurrentSelected({
                                            chapterIndex: chapterIndex,
                                            lectureId: item.id || null,
                                            lectureIndex: index,
                                            modalVisible: true,
                                            lectureType: item.type
                                        })} />,
                                    <DeleteFilled
                                        style={{ fontSize: 18 }}
                                        onClick={() => {
                                            confirm({
                                                title: 'Xác nhận xóa bài học này?',
                                                icon: <ExclamationCircleOutlined />,
                                                content: 'Hành động này không thể hoàn tác',
                                                onOk() {
                                                    removeLecture(index)
                                                },
                                                onCancel() {
                                                    console.log('Cancel');
                                                },
                                            });
                                        }} />]}
                                className="draggble"
                            >
                                <NavLink to="#" location={{}} className="w-40 w-sm-100">
                                    <Typography.Paragraph
                                        editable={{
                                            onChange: e => {
                                                changeLectureName(index, e)
                                            }
                                        }}
                                    >
                                        {item.name}
                                    </Typography.Paragraph>
                                </NavLink>
                                <p className="mb-1 text-muted text-small w-15 w-sm-100">
                                    {item.created_at && momentTime(item.created_at)}
                                </p>
                                <div className="w-15 w-sm-100">
                                    {content(item.type)}
                                </div>
                            </List.Item>
                        }}
                    />
                </CardContent>
            </Card>
        </ReactDragListView>
}

export default (React.memo(LectureList))