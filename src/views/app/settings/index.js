import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

const SettingDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ './default')
)
const FormConsultingDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-form-consulting" */ './formConsultings')
)

const Dashboards = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/default`} />
      <Route
        path={`${match.url}/default`}
        render={props => <SettingDefault {...props} />}
      />
       <Route
        path={`${match.url}/form-consultings`}
        render={props => <FormConsultingDefault {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
)
export default Dashboards
