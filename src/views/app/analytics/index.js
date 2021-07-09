import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

const WeekReport = React.lazy(() =>
  import(/* webpackChunkName: "analytics-week-report" */ './weekReport')
)
const DetailReport = React.lazy(() =>
  import(/* webpackChunkName: "analytics-detail-report" */ './detailReport')
)
const ScoreBoardReport = React.lazy(() =>
  import(/* webpackChunkName: "analytics-scoreboard-report" */ './scoreBoardReport')
)
const AnalyticChart = React.lazy(() =>
  import(/* webpackChunkName: "analytics-chart" */ './chart')
)

const Dashboards = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}/bao-cao-tuan`}
        render={props => <WeekReport {...props} />}
      />
      <Route
        path={`${match.url}/bao-cao-chi-tiet`}
        render={props => <DetailReport {...props} />}
      />
      <Route
        path={`${match.url}/bang-diem-cuoi-khoa`}
        render={props => <ScoreBoardReport {...props} />}
      />
      <Route
        path={`${match.url}/chart`}
        render={props => <AnalyticChart {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
)
export default Dashboards
