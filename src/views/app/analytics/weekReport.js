import React, { useRef, useEffect, useState } from 'react'
import { Card, CardBody, Row, Button } from 'reactstrap'
import { Colxx, Separator } from 'components/common/CustomBootstrap'
import Breadcrumb from 'containers/navs/Breadcrumb'
import { HotTable } from '@handsontable/react'
import "handsontable/dist/handsontable.full.css"
import {
  Form,
  Select,
  DatePicker,
  Spin,
  message,
  Drawer
} from 'antd'
import axios from 'helpers/axios'
import useFormInput from 'helpers/useFormInput'

const header02 = ['STT', 'Họ tên', 'Tên đăng nhập', 'Phòng ban', 'Email', 'Ngày sinh', 'Ngày bắt đầu học', 'Trạng thái hoàn thành', 'Ngày hoàn thành', 'Kết quả', 'Phần trăm hoàn thành']
const metadataWeek = () => { return ['', 'Tuần', '', '', '', '', '', '', '', '', ''] }
const metadata1 = value => { return ['', 'Tên khóa học', value, '', '', '', '', '', '', '', ''] }
const metadata2 = value => { return ['', 'nhóm người dùng', value, '', '', '', '', '', '', '', ''] }
const metadata3 = value => { return ['', 'Phòng ban', value, '', '', '', '', '', '', '', ''] }
const metadata4 = value => { return ['', 'Từ ngày', value, '', '', '', '', '', '', '', ''] }
const metadata5 = value => { return ['', 'Đến ngày', value, '', '', '', '', '', '', '', ''] }
const breakLine = ['', '', '', '', '', '', '', '', '', '', '']

const AnalyticsPage = ({ match }) => {
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [data, setData] = useState([metadata1(1),
  metadata1(1),
  metadata1(1),
  metadata1(1),
  metadata1(1)])
  const [selectData, setSelectData] = useState(null)
  const hot = useRef(null)
  const course = useFormInput()
  const company = useFormInput()
  const department = useFormInput(-1)
  const [from, setFromDate] = useState(null)
  const [to, setToDate] = useState(null)

  useEffect(() => {
    setLoading(true)
    axios.get('admin/analytics/get-data-report/' + 1)
      .then(res => {
        if (res.data.status === 200) {
          setSelectData(res.data)
        }
      })
      .finally(() => setLoading(false))
  }, [])

  const onClose = () => setVisible(false)

  const exportReport = () => {
    if (course === '' || company === '' || department === '' || from === null || to === null) {
      message.error('Vui lòng chọn đầy đủ thông tin')
    } else {
      setLoading(true)

      const params = {
        course_id: course.value,
        partner_id: company.value,
        department: department.value,
        date_from: from,
        date_to: to
      }

      axios.post('admin/analytics/export-report/1', params)
        .then(res => {
          if (res.data.status === 200 && res.data.report.length > 0) {
            const rows = res.data.report.map((item, index) =>
              [
                parseInt(index + 1),
                item.first_name + ' ' + item.last_name,
                item.username,
                item.department || '',
                item.email,
                item.birthday,
                item.course_start_date,
                item.finish_status,
                item.finish_date,
                item.result,
                item.finish_percent
              ])

            const row1 = metadata2(selectData.companies[selectData.companies.findIndex(i => i.id === company.value)].name)
            const row2 = metadata3(department.value !== -1 ? selectData.departments[selectData.departments.findIndex(i => i.id === department.value)].name : 'chọn tất cả')
            const row3 = metadata1(selectData.courses[selectData.courses.findIndex(i => i.id === course.value)].title)
            const row4 = metadataWeek()
            const row5 = metadata4(from)
            const row6 = metadata5(to)

            setData([row1,
              row2,
              row3,
              row4,
              row5,
              row6,
              metadata5,
              breakLine,
              header02,
              ...rows
            ])

            setVisible(true)
          } else {
            message.error('Không có dữ liệu để tổng hợp báo cáo, vui lòng thử lại !')
          }
        })
        .finally(() => setLoading(false))
    }
  }

  return <Card>
    <CardBody>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.analytics" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Spin spinning={loading} size="large">
        <Card>
          <CardBody>
            <Form
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
              initialValues={{ size: 'medium' }}
            >
              <Form.Item label="Khóa học">
                <Select
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  {...course}>
                  {selectData && selectData.courses.map(item =>
                    <Select.Option key={item.id} value={item.id}>
                      {item.title}
                    </Select.Option>)}
                </Select>
              </Form.Item>
              <Form.Item label="nhóm người dùng">
                <Select
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  {...company}>
                  {selectData && selectData.companies.map(item =>
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>)}
                </Select>
              </Form.Item>
              <Form.Item label="Phòng ban">
                <Select
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  {...department}>
                  <Select.Option key={-1} value={-1}>
                    Chọn tất cả
                      </Select.Option>
                  {selectData && selectData.departments.map(item =>
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>)}
                </Select>
              </Form.Item>
              <Form.Item label="Từ ngày - đến ngày">
                <DatePicker.RangePicker style={{ width: '100%' }} onCalendarChange={(date, dateStrings) => {
                  setFromDate(dateStrings[0])
                  setToDate(dateStrings[1])
                }} />
              </Form.Item>
              <Form.Item label="Xuất báo cáo">
                <Button outline onClick={exportReport}>Xuất báo cáo</Button>
              </Form.Item>
            </Form>
          </CardBody>
        </Card>
      </Spin>
      <Drawer
        title={<Button outline color="danger" onClick={() => {
          const exportPlugin = hot.current.hotInstance.getPlugin('exportFile')
          exportPlugin.downloadFile('csv', { filename: 'Báo cáo CP' })
        }}>
          <i className="simple-icon-cloud-download" />{' '}Tải báo cáo
    </Button>}
        height='100%'
        placement={'bottom'}
        closable={true}
        onClose={onClose}
        visible={visible}
      >
        <HotTable ref={hot}
          data={data}
          colHeaders={true}
          rowHeaders={true}
          licenseKey='non-commercial-and-evaluation' />
      </Drawer>
    </CardBody>
  </Card>
}

export default AnalyticsPage
