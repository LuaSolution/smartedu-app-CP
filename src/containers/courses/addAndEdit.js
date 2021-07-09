import React, { useRef, useEffect, useState } from 'react'
import IntlMessages from 'helpers/IntlMessages'
import { Drawer, Typography, message, Spin, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Button } from 'reactstrap'
import Steps from './steps'
import momentTime from 'helpers/moment'
import { connect } from 'react-redux'
import { initCourseGroup, initUserList, updateCourseInfo } from 'redux/actions'
import axios from 'helpers/axios'
import {
  COURSE_CREATED_AT,
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
  COURSE_BUY_COUNT,
  COURSE_STATUS,
  SELECTED_PARTNER,
  COURSE_SURVEY_ID,
  COURSE_VIDEO_ID,
  COURSE_CERT_CLASS,
  COURSE_CERT_ID,
  COURSE_CERT_TIME_FROM,
  COURSE_CERT_TIME_TO,
  COURSE_CERT_TITLE,
  COURSE_PUBLIC_ALL
} from 'defines'

const _user = JSON.parse(localStorage.getItem('@current_user'))
const { confirm } = Modal;

const AddAndEdit = ({
  modalOpen,
  toggleModal,
  editId,
  addNewFlag,
  courseInfo,
  courseBenefits,
  courseChapters,
  courseResources,
  updateCourseInfo
}) => {
  const [loading, setLoading] = useState(false)
  const [courseId, setCourseId] = useState(null)
  const refStep = useRef()

  const title = !addNewFlag && editId ? 'Thay đổi thông tin khóa học' : 'Thêm mới khóa học'

  useEffect(() => {
    if (!addNewFlag && editId) {
      setCourseId(editId)
    }
  }, [editId])

  const submitCourseInfo = () => {
    setLoading(true)
    const params = {
      group_id: courseInfo[COURSE_GROUP],
      mentor_id: courseInfo[COURSE_MENTOR],
      support_id: courseInfo[COURSE_SUPPORTER],
      title: courseInfo[COURSE_TITLE],
      slug: courseInfo[COURSE_SLUG],
      old_price: courseInfo[COURSE_OLD_PRICE],
      new_price: courseInfo[COURSE_NEW_PRICE],
      s_desc: courseInfo[COURSE_SHORT_DES],
      l_desc: courseInfo[COURSE_LONG_DES],
      tags: courseInfo[COURSE_TAGS],
      is_offline: courseInfo[COURSE_IS_OFFLINE],
      buy_count: courseInfo[COURSE_BUY_COUNT],
      status: courseInfo[COURSE_STATUS],
      survey_id: courseInfo[COURSE_SURVEY_ID],
      video_id: courseInfo[COURSE_VIDEO_ID],
      cert_title: courseInfo[COURSE_CERT_TITLE],
      cert_class: courseInfo[COURSE_CERT_CLASS],
      cert_id: courseInfo[COURSE_CERT_ID],
      cert_time_from: courseInfo[COURSE_CERT_TIME_FROM],
      cert_time_to: courseInfo[COURSE_CERT_TIME_TO],
      image: courseInfo['image'] || null
    }

    if (!addNewFlag && editId) {
      axios
        .post('admin/courses/update', { id: editId, ...params })
        .then(res => {
          if (res.data && res.data.failed) {
            message.error('Cập nhật thông tin khóa học thất bại')
          } else {
            message.success('Cập nhật thông tin khóa học thành công')
            // editNews({ id: editId, ...params })
          }
        })
        .finally(() => setLoading(false))
    } else {
      axios
        .post('admin/courses/create', params)
        .then(res => {
          if (res.data.failed) {
            message.error('Tạo thông tin khóa học thất bại')
          } else {
            message.success('Tạo thông tin khóa học thành công')
            setCourseId(res.data)
            // addNew({
            //   id: res.data,
            //   title: title.value,
            //   created_at: null
            // })
          }
        })
        .finally(() => setLoading(false))
    }
  }

  const submitCourseBenefit = () => {
    setLoading(true)
    const params = {
      course_id: courseId,
      benefits: courseBenefits
    }
    axios
      .post('admin/courses/benefits/create', params)
      .then(res => {
        if (res.data.failed) {
          message.error('Cập nhật lợi ích khóa học thất bại')
        } else {
          message.success('Cập nhật lợi ích khóa học thành công')
        }
      })
      .finally(() => setLoading(false))
  }


  const submitCourseChapter = () => {
    setLoading(true)
    const params = {
      course_id: courseId,
      chapters: courseChapters
    }

    if (!addNewFlag && editId) {
      axios
        .post('admin/courses/chapters/update', params)
        .then(res => {
          if (res.data.failed) {
            message.error('Cập nhật giáo trình khóa học thất bại')
          } else {
            message.success('Cập nhật giáo trình khóa học thành công')
          }
        })
        .finally(() => setLoading(false))
    } else {
      axios
        .post('admin/courses/chapters/create', params)
        .then(res => {
          if (res.data.failed) {
            message.error('Cập nhật giáo trình khóa học thất bại')
          } else {
            message.success('Cập nhật giáo trình khóa học thành công')
          }
        })
        .finally(() => setLoading(false))
    }
  }

  const submitCourseLearner = () => {
    setLoading(true)
    const params = {
      course_id: courseId,
      selected_partner: courseInfo[SELECTED_PARTNER],
      public_for_all: courseInfo[COURSE_PUBLIC_ALL]
    }
    axios
      .post('admin/courses/update-learner', params)
      .then(res => {
        if (!res.data || res.data.failed) {
          message.error('Cập nhật người dùng cho khóa học thất bại')
        } else {
          message.success('Cập nhật người dùng cho khóa học thành công')
          updateCourseInfo(Math.random(), 'refresh')
        }
      })
      .finally(() => setLoading(false))
  }

  const submitCourseResources = () => {
    setLoading(true)
    const params = {
      course_id: courseId,
      resources: courseResources.map(i => i.id)
    }
    console.log(params)
    axios
      .post('admin/courses/resources/update', params)
      .then(res => {
        if (res.data.status === 200) {
          message.success('Cập nhật file đính kèm cho khóa học thành công')
        } else {
          message.error('Cập nhật file đính kèm cho khóa học thất bại')
        }
      })
      .finally(() => setLoading(false))
  }

  const updateData = () => {
    const { id } = refStep.current.context.wizard.step

    if (id == 1) {
      submitCourseInfo()
    } else if (id == 2) {
      submitCourseBenefit()
    } else if (id == 3) {
      if (!courseInfo[COURSE_STATUS] && (_user.id === 13 || _user.id === 1)) {
        submitCourseChapter()
      } else {
        message.error('Không thể cập nhật khóa học đang hoạt động')
        message.error('Tài khoản ADMIN mới có quyền cập nhật nhóm người dùng')
      }
    } else if (id == 4) {
      if (!courseInfo[COURSE_STATUS] && (_user.id === 13 || _user.id === 1)) {
        submitCourseLearner()
      } else {
        message.error('Không thể cập nhật khóa học đang hoạt động')
        message.error('Tài khoản ADMIN mới có quyền cập nhật nhóm người dùng')
      }
    } else if (id == 5) {
      submitCourseResources()
    }
  }

  return <Drawer
    title={title}
    placement="right"
    onClose={toggleModal}
    visible={modalOpen}
    width={'100%'}
    footer={
      <div style={{ textAlign: 'right' }}  >
        {!addNewFlag && editId && <Typography.Text code>
          Ngày tạo: {momentTime(courseInfo[COURSE_CREATED_AT])}
        </Typography.Text>}
        {' '}
        <Spin spinning={loading} >
          <Button color="danger" outline onClick={toggleModal}>
            <IntlMessages id="user.cancel" />
          </Button>
          {/* <Button color="secondary" onClick={toggleModal}>
            <IntlMessages id="user.draft" />
          </Button>
           */}
          {' '}
          <Button color="primary" onClick={() => {
            confirm({
              title: 'Xác nhận cập nhật thông tin khóa học này?',
              icon: <ExclamationCircleOutlined />,
              content: 'Hành động này không thể hoàn tác',
              onOk() {
                updateData()
              },
              onCancel() {
                console.log('Cancel');
              },
            });
          }}>
            {!addNewFlag && editId ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </Spin>
      </div>
    }
  >
    <Spin spinning={loading} size='large' tip='Đang cập nhật..'>
      <Steps refStep={refStep}
        addNewFlag={addNewFlag}
        editId={editId}
        close={toggleModal} />
    </Spin>
  </Drawer>
}

const mapStateToProps = ({ courses }) => {
  const { courseInfo, courseBenefits, courseChapters, courseResources } = courses
  return { courseInfo, courseBenefits, courseChapters, courseResources }
}

const mapActionsToProps = {
  initCourseGroup,
  initUserList,
  updateCourseInfo
}

export default connect(mapStateToProps, mapActionsToProps)(React.memo(AddAndEdit))