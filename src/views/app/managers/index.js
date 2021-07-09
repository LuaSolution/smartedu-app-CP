import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

const Courses = React.lazy(() =>
  import(/* webpackChunkName: "managers-courses" */ './courses')
)
const CourseGroup = React.lazy(() =>
  import(/* webpackChunkName: "managers-course-groups" */ './courseGroups')
)
const News = React.lazy(() =>
  import(/* webpackChunkName: "managers-news" */ './news')
)
const Qanda = React.lazy(() =>
  import(/* webpackChunkName: "managers-qanda" */ './qanda')
)
const TestResult = React.lazy(() =>
  import(/* webpackChunkName: "managers-test-results" */ './testResults')
)
const CertificateIssuance = React.lazy(() =>
  import(/* webpackChunkName: "managers-certificate-issuance" */ './certificateIssuance')
)
const OfflineSchedule = React.lazy(() =>
  import(/* webpackChunkName: "managers-offline-schedule" */ './offlineSchedule')
)

export default ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}/courses`}
        render={props => <Courses {...props} />}
      />
      <Route
        path={`${match.url}/course-groups`}
        render={props => <CourseGroup {...props} />}
      />
      <Route
        path={`${match.url}/news`}
        render={props => <News {...props} />}
      />
      <Route
        path={`${match.url}/qanda`}
        render={props => <Qanda {...props} />}
      />
      <Route
        path={`${match.url}/test-result`}
        render={props => <TestResult {...props} />}
      />
      <Route
        path={`${match.url}/certificate-issuance`}
        render={props => <CertificateIssuance {...props} />}
      />
      <Route
        path={`${match.url}/offline-schedule`}
        render={props => <OfflineSchedule {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
)
