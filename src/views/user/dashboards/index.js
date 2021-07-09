import React, { Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import UserHeaderLayout from 'components/users/UserHeaderLayout'
import UserFooterLayout from 'components/users/UserFooterLayout'
import UserLeftLayout from 'components/users/UserLeftLayout'
import UserTopLayout from 'components/users/UserTopLayout'

const Main = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-main" */ './dashboard')
)
const MyCourses = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-my-courses" */ './myCourseList')
)
const MyContributedCourses = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-my-contributed-courses" */ './myContributedCourses')
)
const MyLearningProcess = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-my-myLearningProcess" */ './myLearningProcess')
)
const MyWishlist = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-my-wishlist" */ './myWishlist')
)
const MyCertificate = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-my-myCertificate" */ './myCertificate')
)
const MyOfflineSchedule = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-my-myOfflineSchedule" */ './myOfflineSchedule')
)
const MyExams = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-my-MyExams" */ './comingSoon')
)
const MyMentorCall = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-my-mentor-call" */ './myMentorCall')
)
const MyTransactions = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-my-MyTransactions" */ './comingSoon')
)
const MyStreamingCourses = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-my-MyStreamingCourses" */ './comingSoon')
)
const ViewError = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ 'views/404')
)
const ViewUnauthorized = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ 'views/unauthorized')
)

const urlList = [
  { title: 'Khóa học của tôi', url: 'my-courses' },
  { title: 'Khóa học yêu thích', url: 'wishlist' },
  { title: 'Lịch live của tôi', url: 'mentor-call' },
  { title: 'Khóa học đóng góp', url: 'contributed-courses' },
  { title: 'Lịch học offline', url: 'offline-schedule' },
  { title: 'Kỳ thi của tôi', url: 'exams' },
  { title: 'Chứng chỉ của tôi', url: 'certificates' },
  { title: 'Lớp học trực tuyến', url: 'streaming-courses' },
  { title: 'Lịch sử giao dịch', url: 'transactions' },
  { title: 'Quá trình học tập', url: 'learning-process' },
]

const DashboardsRoute = ({ match, ...props }) => {
  return <>
    <UserHeaderLayout />
    <div className="ifa-body-wrapper ifa-user-inside">
      <div className="ifa-container">
        <UserLeftLayout urlList={urlList} pageName={props.location.pathname.split('/').slice(-1)[0]} />
        <div className="ifa-user-right">
          <UserTopLayout urlList={urlList} pageName={props.location.pathname.split('/').slice(-1)[0]} />
          <Suspense fallback={<div className="loading" />}>
            <Switch>
              <Route exact path={`${match.url}`}
                render={props => <Main {...props} />}
              />
              <Route
                path={`${match.url}/my-courses`}
                render={props => <MyCourses {...props} />}
              />
              <Route
                path={`${match.url}/contributed-courses`}
                render={props => <MyContributedCourses {...props} />}
              />
              <Route
                path={`${match.url}/wishlist`}
                render={props => <MyWishlist {...props} />}
              />
              <Route
                path={`${match.url}/mentor-call`}
                render={props => <MyMentorCall {...props} />}
              />
              <Route
                path={`${match.url}/certificates`}
                render={props => <MyCertificate {...props} />}
              />
              <Route
                path={`${match.url}/exams`}
                render={props => <MyExams {...props} />}
              />
              <Route
                path={`${match.url}/streaming-courses`}
                render={props => <MyStreamingCourses {...props} />}
              />
              <Route
                path={`${match.url}/transactions`}
                render={props => <MyTransactions {...props} />}
              />
              <Route
                path={`${match.url}/learning-process`}
                render={props => <MyLearningProcess {...props} />}
              />
              <Route
                path={`${match.url}/offline-schedule`}
                render={props => <MyOfflineSchedule {...props} />}
              />
              <Route
                path="/error"
                exact
                render={props => <ViewError {...props} />}
              />
              <Route
                path="/unauthorized"
                exact
                render={props => <ViewUnauthorized {...props} />}
              />
              <Redirect to="/error" />
            </Switch>
          </Suspense>
        </div>
      </div>
    </div>
    <UserFooterLayout />
  </>
}

export default DashboardsRoute
