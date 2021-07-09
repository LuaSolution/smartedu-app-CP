import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from 'reactstrap'
import IntlMessages from 'helpers/IntlMessages'
import axios from 'helpers/axios'
import {
  Form,
  Input,
  Spin,
  Typography,
  message,
  Select,
  DatePicker,
  TimePicker
} from 'antd'
import momentTime from 'helpers/moment'
import useFormInput from 'helpers/useFormInput'
import useFormDatePicker from 'helpers/useFormDatePicker'
import useFormNumber from 'helpers/useFormNumber'
import moment from 'moment'
import SubUserList from './usersRegistered'
import ReactExport from 'react-data-export'

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const format = 'HH:mm';
const layout = {
  labelCol: {
    sm: { span: 5 }
  }
}

const AddNewModal = ({ modalOpen, toggleModal, editId, addNewFlag, courses }) => {
  const course = useFormInput()
  const date = useFormDatePicker()
  const timeFrom = useFormInput()
  const timeTo = useFormInput()
  const location = useFormInput()
  const limit = useFormNumber(0)
  const created_at = useFormInput()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const multiDataSet = [
    {
      columns: [
        { title: "Ho", style: { fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } } } },
        { title: "Ten", style: { fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } } } },
        { title: "Username", style: { fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } } } },
        { title: "Email", style: { fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } } } },
        { title: "NgaySinh", style: { fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } } } },
        { title: "SoDienThoai", style: { fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } } } }
      ],
      data: data
    }
  ];

  useEffect(() => {
    const fetch = () => {
      if (!addNewFlag && editId) {
        setLoading(true)
        axios
          .get('admin/offline-schedules/get-info/' + editId)
          .then(res => {
            return res.data
          })
          .then(data => {
            if (data.status === 200) {
              const _data = data.data
              course.setValue(_data.course_id)
              date.setValue(_data.date)
              timeFrom.setValue(_data.time_from)
              timeTo.setValue(_data.time_to)
              location.setValue(_data.location)
              limit.setValue(_data.limit)
              const users = _data.users.map(item => {
                return [item.first_name, item.last_name, item.username, item.email, item.birthday, item.phone]
              })
              setData(users)
              created_at.setValue(_data.created_at)
            }
          })
          .finally(() => setLoading(false))
      } else {
        course.setValue(null)
        date.setValue(null)
        location.setValue(null)
        timeFrom.setValue(null)
        timeTo.setValue(null)
        limit.setValue(0)
        setData([])
      }
    }

    fetch()
  }, [editId, addNewFlag]) // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = () => {
    setLoading(true)

    const params = {
      course_id: course.value,
      date: moment(date.value).format('YYYY-MM-DD'),
      time_from: timeFrom.value,
      time_to: timeTo.value,
      location: location.value,
      limit: limit.value
    }

    if (!addNewFlag && editId) {
      axios
        .post('admin/offline-schedules/update', { id: editId, ...params })
        .then(res => {
          if (res.data.status === 200) {
            message.success('Cập nhật lịch học thành công')
          } else {
            message.errorr('Cập nhật lịch học thất bại')
          }
        })
        .finally(() => {
          setLoading(false)
          toggleModal()
        })
    } else {
      axios
        .post('admin/offline-schedules/create', params)
        .then(res => {
          if (res.data.status === 200) {
            message.success('Tạo lịch học thành công')
          } else {
            message.errorr('Tạo lịch học thất bại')
          }
        })
        .finally(() => {
          setLoading(false)
          toggleModal()
        })
    }
  }

  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
      style={{ maxWidth: '700px' }}
    >
      <ModalHeader toggle={toggleModal}>
        {!addNewFlag && editId ? 'Cập nhật lịch học offline' : 'Thêm mới lịch học offline'}
      </ModalHeader>
      <Spin spinning={loading}>
        <ModalBody>
          <Form
            {...layout}
            layout="horizontal"
            size="medium"
          >
            <Form.Item label="Khóa học">
              <Select
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                {...course}>
                {courses && courses.map(item =>
                  <Select.Option key={item.id} value={item.id}>
                    {item.title}
                  </Select.Option>)}
              </Select>
            </Form.Item>
            <Form.Item label='Ngày'>
              <DatePicker {...date} />
            </Form.Item>
            <Form.Item label='Từ'>
              <TimePicker value={timeFrom.value ? moment(timeFrom.value, format) : null} format={format}
                onChange={(time, timeStr) => timeFrom.onChange(timeStr)} />
              {' '}đến <TimePicker value={timeTo.value ? moment(timeTo.value, format) : null} format={format}
                onChange={(time, timeStr) => timeTo.onChange(timeStr)} />
            </Form.Item>
            <Form.Item label='Số HV tối đa'>
              <Input {...limit} allowClear />
            </Form.Item>
            <Form.Item label='Địa điểm học'>
              <Input {...location} allowClear />
            </Form.Item>
            {!addNewFlag && editId ? <Form.Item label='Danh sách đăng ký'>
              <SubUserList id={editId} />
            </Form.Item>
              : null}
          </Form>
        </ModalBody>
        <ModalFooter>
          {!addNewFlag && editId
            && <Typography.Text code>Ngày tạo: {momentTime(created_at.value)}</Typography.Text>}
          {' '}
          <Button color="secondary" outline onClick={toggleModal}>
            <IntlMessages id="user.cancel" />
          </Button>
          {data.length > 0 && <ExcelFile element={<Button color="danger">
            Xuất excel danh sách
          </Button>}>
            <ExcelSheet dataSet={multiDataSet} name="Danh sách học viên" />
          </ExcelFile>}
          <Button color="primary" onClick={onSubmit}>
            <IntlMessages id="user.submit" />
          </Button>
        </ModalFooter>
      </Spin>
    </Modal >
  )
}

export default AddNewModal