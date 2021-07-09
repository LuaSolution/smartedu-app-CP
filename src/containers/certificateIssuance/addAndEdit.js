import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardBody,
  CardTitle,
  Badge,
} from 'reactstrap'
import IntlMessages from 'helpers/IntlMessages'
import { Row, Col, Table, Spin } from 'antd'
import CourseList from './subCourseList'
import CertificateModal from './certificateModal'
import axios from 'helpers/axios'
import { badgeColor, lectureType } from 'defines'
import momentTime from 'helpers/moment'

const AddNewModal = ({ modalOpen, toggleModal, editId, addNewFlag }) => {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [certificateModal, setCertificateModal] = useState(false)
  const [selectedCourseName, setSelectedCourseName] = useState(null)
  const [resultLoading, setResultLoading] = useState(false)
  const [lectureFinished, setLectureFinished] = useState([])
  const [lectures, setLectures] = useState([])

  const columns = [
    {
      dataIndex: 'name',
      key: 'name',
      render: (item, row) =>
        row.finish_at ? (
          <span style={{ color: '#52c41a', fontWeight: 'bold' }}>{item}</span>
        ) : (
          item
        ),
    },
    {
      dataIndex: 'type',
      key: 'type',
      render: (item) => (
        <Badge color={badgeColor[item]} pill>
          {lectureType[item]}
        </Badge>
      ),
    },
    {
      dataIndex: 'result',
      key: 'result',
      render: (item) => <Badge color="danger">{item}</Badge>,
    },
    {
      dataIndex: 'finish_at',
      key: 'finish_at',
    },
  ]

  useEffect(() => {
    if (selectedCourse) {
      setResultLoading(true)
      axios
        .post('/admin/certificates/detail-lecture-finished', {
          user_id: editId,
          course_id: selectedCourse,
        })
        .then((res) => {
          if (res.data.status === 200) {
            setLectures(res.data.data.lectures)
            setLectureFinished(res.data.data.lecture_finished)
          }
        })
        .finally(() => setResultLoading(false))
    } else {
      setLectures([])
      setLectureFinished([])
    }
  }, [selectedCourse])

  const issuingCertificates = (id) => {
    setCertificateModal(true)
  }

  return (
    <>
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-right"
        backdrop="static"
        style={{ maxWidth: '100%' }}
      >
        <ModalHeader toggle={toggleModal}>
          {!addNewFlag && editId && 'Cấp phát chứng chỉ'}
        </ModalHeader>
        <ModalBody style={{ overflow: 'auto' }} className="scrollbar">
          <Row gutter={8}>
            <Col span={12}>
              <Card>
                <CardBody>
                  <CardTitle>Danh sách khóa học</CardTitle>
                  <CourseList
                    id={editId}
                    selectedItems={selectedCourse}
                    setSelectedItems={setSelectedCourse}
                    issuingCertificates={issuingCertificates}
                    setSelectedCourseName={setSelectedCourseName}
                  />
                </CardBody>
              </Card>
            </Col>
            <Col span={12}>
              <Spin spinning={resultLoading}>
                <Card>
                  <CardBody>
                    <CardTitle>
                      Kết quả học tập{' '}
                      {selectedCourseName &&
                        'của khóa học ' + selectedCourseName}
                    </CardTitle>
                    {lectures &&
                      lectures.map((item, index) => {
                        const renderList = item.lectures.map((i, idx) => {
                          const rIndex = lectureFinished.findIndex(
                            (k) => k.lecture_id === i.id
                          )
                          return rIndex === -1
                            ? i
                            : {
                                ...i,
                                result: lectureFinished[rIndex].result,
                                finish_at: momentTime(
                                  lectureFinished[rIndex].created_at
                                ),
                              }
                        })

                        return (
                          <Card style={{ marginBottom: 10 }}>
                            <CardBody>
                              <CardTitle>Chương: {item.name}</CardTitle>
                              <Table
                                showHeader={false}
                                columns={columns}
                                dataSource={renderList}
                                pagination={false}
                              />
                            </CardBody>
                          </Card>
                        )
                      })}
                  </CardBody>
                </Card>
              </Spin>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" outline onClick={toggleModal}>
            <IntlMessages id="user.cancel" />
          </Button>
          {/* <Button color="primary" onClick={onSubmit}>
            <IntlMessages id="user.submit" />
          </Button> */}
        </ModalFooter>
      </Modal>
      <CertificateModal
        userId={editId}
        courseId={selectedCourse}
        certificateModal={certificateModal}
        setCertificateModal={setCertificateModal}
      />
    </>
  )
}

export default AddNewModal
