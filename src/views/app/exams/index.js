import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

const Default = React.lazy(() =>
  import(/* webpackChunkName: "exams-default" */ './default')
)

const Questions = React.lazy(() =>
  import(/* webpackChunkName: "exams-questions" */ './questions')
)

const Dashboards = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/default`} />
      <Route
        path={`${match.url}/default`}
        render={props => <Default {...props} />}
      />
      <Route
        path={`${match.url}/questions`}
        render={props => <Questions {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
)
export default Dashboards
