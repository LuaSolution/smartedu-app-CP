import React, { useEffect, useState } from 'react'
import { Separator } from 'components/common/CustomBootstrap'
import Breadcrumb from 'containers/navs/Breadcrumb'
import DashboardCarousel from 'containers/dashboards/dashboardCarousel'
import NewestCoursesInDashboard from 'containers/dashboards/newestCoursesInDashboard'
import NewestUsersInDashboard from 'containers/dashboards/newestUsersInDashboard'
import { Row, Col } from 'antd'
import axios from 'helpers/axios'

const DefaultDashboard = ({ match }) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    axios.get('admin/get-dashboard')
      .then(res => {
        if (res.data.status === 200) {
          setData(res.data.data)
        }
      })
  }, [])

  return <div style={{ paddingBottom: 50 }}>
    <Row>
      <Col>
        <Breadcrumb heading="menu.default" match={match} />
        <Separator className="mb-5" />
      </Col>
    </Row>
    {data && <DashboardCarousel data={[
      {
        title: 'Khóa học đang hoạt động',
        icon: 'simple-icon-layers',
        value: data.sumCourses
      },
      {
        title: 'Tổng số người dùng',
        icon: 'simple-icon-people',
        value: data.sumUsers,
      },
      {
        title: 'Tổng số chuyên gia',
        icon: 'simple-icon-user-following',
        value: data.sumMentors,
      },
      {
        title: 'Tổng số nhóm người dùng',
        icon: 'simple-icon-organization',
        value: data.sumPartners
      },
    ]} />
    }
    <Row gutter={16}>
      {data && <>
        <Col className="gutter-row" span={12}>
          <NewestCoursesInDashboard data={data.newestCourses} />
        </Col>
        <Col className="gutter-row" span={12}>
          <NewestUsersInDashboard data={data.newestUsers} />
        </Col>
      </>}
    </Row>
  </div>
}
export default DefaultDashboard
