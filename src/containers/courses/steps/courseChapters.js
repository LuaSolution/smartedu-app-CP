import React, { useState, useEffect } from 'react'
import {
    Card as AntCard,
    Typography,
    Spin,
    Row,
    Col,
    Modal
} from 'antd'
import { DeleteFilled, ExclamationCircleOutlined } from '@ant-design/icons'
import Lecture from 'components/lectures'
import {
    Card,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    CardBody,
} from 'reactstrap'
import axios from 'helpers/axios'
import { VIDEO, DOCUMENT, SCORM, EXAM } from 'defines'
import { connect } from 'react-redux'
import {
    clearCourse,
    initCourseChapters,
    addCourseChapter,
    updateCourseChapters,
    removeCourseChapter,
    updateLectures,

    addLecture,
    updateLecture,
    removeLecture,
    updateLectureName
} from 'redux/actions'
import LectureList from 'components/lectures/list'
import { NoData } from 'atoms'

const { confirm } = Modal;

const CourseChapters = ({
    editId,
    addNewFlag,
    courseChapters,
    clearCourse,

    initCourseChapters,
    addCourseChapter,
    updateCourseChapters,
    updateLectures,
    removeCourseChapter,

    addLecture,
    updateLecture,
    removeLecture,
    updateLectureName
}) => {

    const [loading, setLoading] = useState(false)
    const [currentSelected, setCurrentSelected] = useState({
        modalVisible: false
    })

    useEffect(() => { setLoading(false) }, [courseChapters])

    useEffect(() => {
        const fetch = () => {
            if (!addNewFlag && editId) {
                setLoading(true)
                axios.get('admin/courses/chapters/paging/' + editId)
                    .then(res => {
                        return res.data
                    })
                    .then(data => {
                        initCourseChapters(data)
                    })
            } else {
                clearCourse()
            }
        }

        fetch()
    }, [addNewFlag, editId]) // eslint-disable-line react-hooks/exhaustive-deps

    const toggle = (chapter, index) => {
        updateCourseChapters({
            ...chapter,
            toggleOpen: !chapter.toggleOpen
        }, index, chapter.id)
    }

    const addChapter = () => {
        addCourseChapter({
            name: 'Chương mới'
        })
    }

    const changeChapterName = (value, index, chapter) => {
        updateCourseChapters({ ...chapter, name: value }, index)
    }

    const openModalLecture = (index, type) => setCurrentSelected({
        chapterIndex: index,
        modalVisible: true,
        lectureType: type
    })

    const actionButtons = (value, index) => {
        return <>
            <ButtonDropdown size="xs"
                isOpen={value.toggleOpen} toggle={() => toggle(value, index)}>
                <DropdownToggle style={{ height: 25 }} caret>Thêm</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem
                        onClick={() => openModalLecture(index, VIDEO)}>
                        Bài giảng video
                    </DropdownItem>
                    <DropdownItem
                        onClick={() => openModalLecture(index, DOCUMENT)}>
                        Bài giảng tài liệu
                    </DropdownItem>
                    <DropdownItem
                        onClick={() => openModalLecture(index, SCORM)}>
                        Bài giảng SCORM
                    </DropdownItem>
                    <DropdownItem onClick={() => openModalLecture(index, EXAM)}>
                        Bài kiểm tra
                    </DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>
            <DeleteFilled style={{ fontSize: 18 }}
                onClick={() => {
                    confirm({
                        title: 'Xác nhận xóa chương này?',
                        icon: <ExclamationCircleOutlined />,
                        content: 'Hành động này không thể hoàn tác',
                        onOk() {
                            removeCourseChapter(index)
                        },
                        onCancel() {
                            console.log('Cancel');
                        },
                    });

                }} />
        </>
    }

    const lectureModal = currentSelected.modalVisible && <Lecture
        chapterIndex={currentSelected.chapterIndex}
        lectureId={currentSelected.lectureId}
        lectureIndex={currentSelected.lectureIndex}
        type={currentSelected.lectureType}
        handleOk={(data, isEdit = false) => {
            if (isEdit) {
                updateLecture(currentSelected.chapterIndex, currentSelected.lectureIndex, data)
            } else {
                addLecture(currentSelected.chapterIndex, data)
            }
            setCurrentSelected({
                ...currentSelected,
                modalVisible: false
            })
        }}

        handleCancel={() => {
            setCurrentSelected({
                ...currentSelected,
                modalVisible: false
            })
        }}
    />

    return <Spin spinning={loading} tip="Đang tải chương mục khóa học..." size="large">
        <AntCard
            title={
                <h2>
                    <b>Quản lý giáo trình</b>
                </h2>
            }
            bordered={false}
            style={{ width: '100%' }}
            extra={<Button color="primary" onClick={addChapter}>Tạo chương mới</Button>}>
            {courseChapters && courseChapters.length > 0
                ? courseChapters.map((value, index) => {
                    return <Card style={{ marginBottom: 15 }} key={index}>
                        <CardBody>
                            <Row wrap={false} gutter={16}>
                                <Col flex="none">
                                    <Typography.Paragraph
                                        editable={{ onChange: e => changeChapterName(e, index, value) }}>
                                        {value.name}
                                    </Typography.Paragraph>
                                </Col>
                                <Col flex="auto">{actionButtons(value, index)}</Col>
                            </Row>

                            <LectureList lectures={value.lectures}
                                updateLectures={data => updateLectures(index, data)}
                                removeLecture={data => removeLecture(index, data)}
                                changeLectureName={(lec_index, data) => updateLectureName(index, lec_index, data)}
                                setCurrentSelected={setCurrentSelected}
                                chapterIndex={index}
                            />
                        </CardBody>
                    </Card>
                }) : <NoData />}
        </AntCard>
        {lectureModal}
    </Spin>
}

const mapStateToProps = ({ courses }) => {
    const { courseChapters } = courses
    return { courseChapters }
}

const mapActionsToProps = {
    clearCourse,
    initCourseChapters,
    addCourseChapter,
    updateCourseChapters,
    removeCourseChapter,
    updateLectures,
    addLecture,
    updateLecture,
    removeLecture,
    updateLectureName
}

export default connect(mapStateToProps, mapActionsToProps)(React.memo(CourseChapters))